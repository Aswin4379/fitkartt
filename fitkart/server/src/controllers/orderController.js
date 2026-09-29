import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc Create new order
// @route POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      coupon,
      paymentMethod,
      deliveryAddress,
      customerName,
      customerEmail,
      customerPhone
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const orderId = `FK${Date.now().toString().slice(-8)}`;

    const order = new Order({
      orderId,
      user: req.user ? req.user._id : null,
      customerName: customerName || (req.user ? req.user.name : 'FitKart Customer'),
      customerEmail: customerEmail || (req.user ? req.user.email : ''),
      items: [], // Will populate below
      subtotal: Number(subtotal || 0),
      discount: Number(discount || 0),
      deliveryFee: Number(deliveryFee || 0),
      total: Number(total || 0),
      coupon: coupon || null,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'Order Confirmed',
      deliveryAddress: deliveryAddress || {},
      timeline: [
        {
          status: 'Order Confirmed',
          time: new Date(),
          description: 'Your order has been received and verified.'
        }
      ]
    });

    // Populate items and calculate overall delivery
    let maxDays = 0;
    let minDays = 0;
    let hasMins = false;
    let maxMins = 0;
    let minMins = 0;

    for (const item of items) {
      const itemQty = Number(item.quantity || item.qty || 1);
      const itemPrice = Number(item.price ?? (item.variant?.price ?? (item.selectedVariant?.price ?? 0)));
      const itemMrp = Number(item.mrp || item.originalPrice || item.variant?.mrp || item.selectedVariant?.mrp || itemPrice);
      const itemSize = item.size || item.selectedVariant?.size || item.variant?.size || '';
      const itemFlavor = item.flavor || item.selectedVariant?.flavor || item.variant?.flavor || '';
      const itemUnit = item.unit || item.selectedVariant?.unit || item.variant?.unit || '';
      const itemVariantId = item.variantId || item.selectedVariant?.id || item.variant?.id || '';
      const prodId = item.productId || item.id || '';

      // Fetch real deliveryInfo from DB
      let deliveryInfo = { type: 'FITNESS_PRODUCTS', min: 1, max: 3, unit: 'days' };
      if (prodId) {
        const dbProd = await Product.findOne({ id: prodId });
        if (dbProd && dbProd.deliveryInfo) {
          deliveryInfo = dbProd.deliveryInfo;
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

      order.items.push({
        productId: prodId,
        name: item.name || 'FitKart Product',
        image: item.image || (item.product && item.product.image) || '',
        category: item.category || (item.product && item.product.category) || '',
        price: itemPrice,
        mrp: itemMrp,
        quantity: itemQty,
        size: itemSize,
        flavor: itemFlavor,
        unit: itemUnit,
        selectedVariant: {
          id: itemVariantId,
          size: itemSize,
          flavor: itemFlavor,
          unit: itemUnit,
          mrp: itemMrp
        },
        deliveryInfo: deliveryInfo
      });
    }

    // Set overall delivery estimate
    if (maxDays > 0) {
      order.deliveryEstimate = { min: minDays, max: maxDays, unit: 'days' };
    } else if (hasMins) {
      order.deliveryEstimate = { min: minMins, max: maxMins, unit: 'mins' };
    } else {
      order.deliveryEstimate = { min: 1, max: 3, unit: 'days' };
    }

    const savedOrder = await order.save();

    // Credit coins to logged in user
    if (req.user) {
      const coinsEarned = Math.round(Number(total || 0) / 20);
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { fitCoins: coinsEarned },
        $push: { orders: orderId }
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
    res.status(500).json({ message: error.message });
  }
};

// @desc Get logged-in user orders
// @route GET /api/orders/my-orders
export const getMyOrders = async (req, res) => {
  try {
    let orders = [];
    if (req.user) {
      orders = await Order.find({
        $or: [
          { user: req.user._id },
          { customerEmail: req.user.email }
        ]
      }).sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get order by ID (orderId or _id)
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
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Cancel an order
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
    if (['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status)) {
      return res.status(400).json({ message: `Cannot cancel an order that is already ${order.status}` });
    }

    order.status = 'Cancelled';
    order.timeline.push({
      status: 'Cancelled',
      time: new Date(),
      description: 'Order cancelled by user.'
    });
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
