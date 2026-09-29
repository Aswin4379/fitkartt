import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

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

// @desc Get all orders for admin
// @route GET /api/admin/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
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
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
