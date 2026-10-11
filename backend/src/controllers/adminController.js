import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import { logAuditEvent } from '../utils/auditLogger.js';

// @desc Get admin dashboard stats
// @route GET /api/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});

    const orders = await Order.find({});
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
    const pendingOrders = orders.filter((o) => ['Order Placed', 'Order Confirmed', 'Shipped', 'Out for Delivery'].includes(o.status)).length;

    res.json({
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      deliveredOrders,
      pendingOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all orders for admin with pagination & filtering
// @route GET /api/admin/orders
export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Order.countDocuments(filter)
    ]);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update order status
// @route PUT /api/admin/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, description } = req.body;
    const { id } = req.params;

    let order = await Order.findOne({ orderId: id });
    if (!order && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const prevStatus = order.status;
    order.status = status;
    order.timeline.push({
      status,
      time: new Date(),
      description: description || `Order updated to ${status}`
    });

    if (status === 'Delivered') {
      order.paymentStatus = 'paid';
    }

    await order.save();

    await logAuditEvent({
      userId: req.user._id,
      userEmail: req.user.email,
      action: 'ORDER_STATUS_UPDATED',
      entityType: 'Order',
      entityId: order.orderId,
      metadata: { prevStatus, newStatus: status, description },
      req
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create new product (Admin)
// @route POST /api/admin/products
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      id: req.body.id || `custom-${Date.now()}`
    });
    const saved = await product.save();

    await logAuditEvent({
      userId: req.user._id,
      userEmail: req.user.email,
      action: 'PRODUCT_CREATED',
      entityType: 'Product',
      entityId: saved.id,
      metadata: { name: saved.name, category: saved.category },
      req
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update product
// @route PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await logAuditEvent({
      userId: req.user._id,
      userEmail: req.user.email,
      action: 'PRODUCT_UPDATED',
      entityType: 'Product',
      entityId: product.id,
      metadata: { name: product.name },
      req
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete product
// @route DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await logAuditEvent({
      userId: req.user._id,
      userEmail: req.user.email,
      action: 'PRODUCT_DELETED',
      entityType: 'Product',
      entityId: product.id,
      metadata: { name: product.name },
      req
    });

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get system-wide audit logs with pagination & action filtering (Admin only)
// @route GET /api/admin/audit-logs
export const getSystemAuditLogs = async (req, res) => {
  try {
    const { action, entityType, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (action) filter.action = action;
    if (entityType) filter.entityType = entityType;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      AuditLog.countDocuments(filter)
    ]);

    res.json({
      logs,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
