import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { logAuditEvent } from '../utils/auditLogger.js';

// @desc Create new order with server-side price validation & duplicate prevention
// @route POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      coupon,
      paymentMethod,
      deliveryAddress,
      customerName,
      customerEmail,
      customerPhone
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const userId = req.user ? req.user._id : null;
    const userEmail = customerEmail || (req.user ? req.user.email : '');
    const userName = customerName || (req.user ? req.user.name : 'FitKart Customer');
    const userPhone = customerPhone || (req.user ? req.user.phone : '');

    // 1. Duplicate check (Idempotency protection): prevent duplicate order on double-click or rapid retries within 15 seconds
    if (userId) {
      const recentOrder = await Order.findOne({
        user: userId,
        createdAt: { $gte: new Date(Date.now() - 15000) }
      }).sort({ createdAt: -1 });

      if (recentOrder && recentOrder.items?.length === items.length) {
        return res.status(200).json({
          success: true,
          duplicatePrevented: true,
          order: {
            id: recentOrder.orderId,
            orderId: recentOrder.orderId,
            _id: recentOrder._id.toString(),
            ...recentOrder.toObject()
          }
        });
      }
    }

    // 2. Server-side Price & Delivery Validation against MongoDB Product collection
    let serverSubtotal = 0;
    const verifiedItems = [];
    let maxDays = 0;
    let minDays = 0;
    let hasMins = false;
    let maxMins = 0;
    let minMins = 0;

    for (const item of items) {
      const prodId = item.productId || item.id || '';
      const itemVariantId = item.variantId || item.selectedVariant?.id || item.variant?.id || '';
      const itemQty = Math.max(1, parseInt(item.quantity || item.qty || 1));

      let dbProd = null;
      if (prodId) {
        dbProd = await Product.findOne({
          $or: [
            { id: prodId },
            { _id: prodId.match(/^[0-9a-fA-F]{24}$/) ? prodId : null }
          ]
        });
      }

      let verifiedPrice = Number(item.price || 0);
      let verifiedMrp = Number(item.mrp || verifiedPrice);
      let verifiedName = item.name || 'FitKart Product';
      let verifiedImage = item.image || (dbProd?.image || '');
      let verifiedCategory = item.category || (dbProd?.category || '');
      let verifiedSize = item.size || item.selectedVariant?.size || '';
      let verifiedFlavor = item.flavor || item.selectedVariant?.flavor || '';
      let verifiedUnit = item.unit || item.selectedVariant?.unit || '';

      let deliveryInfo = { type: 'FITNESS_PRODUCTS', min: 1, max: 3, unit: 'days' };

      if (dbProd) {
        verifiedName = dbProd.name || verifiedName;
        verifiedImage = dbProd.image || verifiedImage;
        verifiedCategory = dbProd.category || verifiedCategory;
        if (dbProd.deliveryInfo) {
          deliveryInfo = dbProd.deliveryInfo;
        }

        // Match variant in DB if applicable
        if (Array.isArray(dbProd.variants) && dbProd.variants.length > 0) {
          let matchedVariant = null;
          if (itemVariantId) {
            matchedVariant = dbProd.variants.find(v => v.id === itemVariantId || String(v._id) === itemVariantId);
          }
          if (!matchedVariant && verifiedSize) {
            matchedVariant = dbProd.variants.find(v => v.size === verifiedSize && (!verifiedFlavor || v.flavor === verifiedFlavor));
          }
          if (!matchedVariant) {
            matchedVariant = dbProd.variants[0];
          }

          if (matchedVariant) {
            verifiedPrice = Number(matchedVariant.price || dbProd.price || verifiedPrice);
            verifiedMrp = Number(matchedVariant.mrp || verifiedPrice);
            verifiedSize = matchedVariant.size || verifiedSize;
            verifiedFlavor = matchedVariant.flavor || verifiedFlavor;
            verifiedUnit = matchedVariant.unit || verifiedUnit;
          }
        } else if (dbProd.price) {
          verifiedPrice = Number(dbProd.price);
          verifiedMrp = Number(dbProd.mrp || dbProd.originalPrice || verifiedPrice);
        }
      }

      // Track overall estimate
      if (deliveryInfo.unit === 'days') {
        if (deliveryInfo.max > maxDays) {
          maxDays = deliveryInfo.max;
          minDays = deliveryInfo.min;
        }
      } else if (deliveryInfo.unit === 'mins') {
        hasMins = true;
        if (deliveryInfo.max > maxMins) {
          maxMins = deliveryInfo.max;
          minMins = deliveryInfo.min;
        }
      }

      serverSubtotal += verifiedPrice * itemQty;

      verifiedItems.push({
        productId: prodId,
        name: verifiedName,
        image: verifiedImage,
        category: verifiedCategory,
        price: verifiedPrice,
        mrp: verifiedMrp,
        quantity: itemQty,
        size: verifiedSize,
        flavor: verifiedFlavor,
        unit: verifiedUnit,
        selectedVariant: {
          id: itemVariantId,
          size: verifiedSize,
          flavor: verifiedFlavor,
          unit: verifiedUnit,
          mrp: verifiedMrp
        },
        deliveryInfo
      });
    }

    // 3. Server-side Coupon & Discount Calculation
    let serverDiscount = 0;
    const cleanCoupon = coupon ? String(coupon).trim().toUpperCase() : null;
    if (cleanCoupon === 'FIT50') {
      serverDiscount = Math.min(50, serverSubtotal);
    } else if (cleanCoupon === 'FIRST20') {
      serverDiscount = Math.round((serverSubtotal * 20) / 100);
    } else if (cleanCoupon === 'PROTEIN10') {
      serverDiscount = Math.round((serverSubtotal * 10) / 100);
    }

    const serverDeliveryFee = serverSubtotal === 0 || serverSubtotal >= 499 ? 0 : 29;
    const serverTotal = Math.max(0, serverSubtotal - serverDiscount + serverDeliveryFee);

    const orderId = `FK${Date.now().toString().slice(-8)}`;

    let deliveryEstimate = { min: 1, max: 3, unit: 'days' };
    if (maxDays > 0) {
      deliveryEstimate = { min: minDays, max: maxDays, unit: 'days' };
    } else if (hasMins) {
      deliveryEstimate = { min: minMins, max: maxMins, unit: 'mins' };
    }

    const order = new Order({
      orderId,
      user: userId,
      customerName: userName,
      customerEmail: userEmail,
      customerPhone: userPhone,
      items: verifiedItems,
      subtotal: serverSubtotal,
      discount: serverDiscount,
      deliveryFee: serverDeliveryFee,
      total: serverTotal,
      coupon: cleanCoupon,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'Order Confirmed',
      deliveryAddress: deliveryAddress || {},
      deliveryEstimate,
      timeline: [
        {
          status: 'Order Confirmed',
          time: new Date(),
          description: 'Your order has been received, verified, and confirmed.'
        }
      ]
    });

    const savedOrder = await order.save();

    // 4. Persistence side-effects: Credit coins, add order to user, and CLEAR CART in MongoDB
    if (userId) {
      const coinsEarned = Math.round(serverTotal / 20);
      await User.findByIdAndUpdate(userId, {
        $inc: { fitCoins: coinsEarned },
        $push: { orders: orderId },
        $set: { cart: [] } // Database is source of truth: cart cleared upon confirmed checkout
      });

      await logAuditEvent({
        userId,
        userEmail,
        action: 'ORDER_CREATED',
        entityType: 'Order',
        entityId: orderId,
        metadata: {
          itemsCount: verifiedItems.length,
          total: serverTotal,
          paymentMethod: paymentMethod || 'upi',
          coinsEarned
        },
        req
      });
    }

    res.status(201).json({
      success: true,
      order: {
        id: savedOrder.orderId,
        orderId: savedOrder.orderId,
        _id: savedOrder._id.toString(),
        ...savedOrder.toObject()
      }
    });
  } catch (error) {
    console.error('[Create Order Error]:', error);
    res.status(500).json({ message: error.message || 'Server error creating order' });
  }
};

// @desc Get logged-in user orders strictly from MongoDB
// @route GET /api/orders/my-orders
export const getMyOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const orders = await Order.find({
      $or: [
        { user: req.user._id },
        { customerEmail: req.user.email }
      ]
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get order by ID (orderId or _id) with user isolation
// @route GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order = await Order.findOne({ orderId: id });
    if (!order && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // User Isolation: If the order belongs to an authenticated user, only that user or an admin can access it
    if (order.user) {
      if (!req.user || (!order.user.equals(req.user._id) && req.user.role !== 'admin')) {
        return res.status(403).json({ message: 'Access denied to this order record.' });
      }
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Cancel an order with strict user ownership enforcement
// @route PUT /api/orders/:id/cancel
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let order = await Order.findOne({ orderId: id });
    if (!order && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ownership check: user can only cancel their OWN order
    if (order.user) {
      if (!order.user.equals(req.user._id) && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to cancel this order.' });
      }
    } else {
      // Guest order requires email match
      if (req.user.email !== order.customerEmail && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to cancel this order.' });
      }
    }

    if (['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status)) {
      return res.status(400).json({ message: `Cannot cancel an order that is already ${order.status}` });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'This order has already been cancelled.' });
    }

    order.status = 'Cancelled';
    order.timeline.push({
      status: 'Cancelled',
      time: new Date(),
      description: 'Order cancelled by user.'
    });
    await order.save();

    await logAuditEvent({
      userId: req.user._id,
      userEmail: req.user.email,
      action: 'ORDER_CANCELLED',
      entityType: 'Order',
      entityId: order.orderId,
      metadata: { total: order.total, cancelledAt: new Date() },
      req
    });

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
