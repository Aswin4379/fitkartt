import { getLocalDateString } from '../utils/metabolicEngine.js';

// Dynamic API Base URL supporting localhost and Mobile LAN IP (e.g. 192.168.x.x:5000/api)
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    return `http://${window.location.hostname}:5000/api`;
  }
  return 'http://localhost:5000/api';
};

const getAuthToken = () => {
  try {
    return localStorage.getItem('fitkart_token') || '';
  } catch {
    return '';
  }
};

const customFetch = async (endpoint, options = {}) => {
  const url = `${getApiBaseUrl()}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    'x-client-date': getLocalDateString(),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    console.warn(`[API Fetch Error]: ${endpoint}`, err.message);
    throw err;
  }
};

// Auth API
export const authApi = {
  sendOtp: (data) => customFetch('/auth/send-otp', { method: 'POST', body: JSON.stringify(data) }),
  verifyOtp: (data) => customFetch('/auth/verify-otp', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => customFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => customFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  googleLogin: (data) => customFetch('/auth/google', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => customFetch('/auth/me'),
  updateProfile: (data) => customFetch('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
  addAddress: (data) => customFetch('/auth/addresses', { method: 'POST', body: JSON.stringify(data) }),
  deleteAddress: (id) => customFetch(`/auth/addresses/${id}`, { method: 'DELETE' }),
  toggleWishlist: (productId) => customFetch('/auth/wishlist/toggle', { method: 'POST', body: JSON.stringify({ productId }) }),
  resetPassword: (data) => customFetch('/auth/reset-password', { method: 'POST', body: JSON.stringify(data) }),
};

// Product API
export const productApi = {
  getProducts: (params = {}) => {
    const searchParams = new URLSearchParams(params).toString();
    return customFetch(`/products${searchParams ? `?${searchParams}` : ''}`);
  },
  getProductById: (id) => customFetch(`/products/${id}`),
  searchProducts: (q) => customFetch(`/products/search?q=${encodeURIComponent(q)}`),
};

// Order API
export const orderApi = {
  createOrder: (data) => customFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => customFetch('/orders/my-orders'),
  getOrderById: (id) => customFetch(`/orders/${id}`),
  cancelOrder: (id) => customFetch(`/orders/${id}/cancel`, { method: 'PUT' }),
};

// Review API
export const reviewApi = {
  getProductReviews: (productId) => customFetch(`/reviews/product/${productId}`),
  createReview: (data) => customFetch('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  voteReview: (id) => customFetch(`/reviews/${id}/vote`, { method: 'POST' }),
};

// Workout API
export const workoutApi = {
  getWorkouts: () => customFetch('/workouts'),
  getWorkoutById: (id) => customFetch(`/workouts/${id}`),
};

// Admin API
export const adminApi = {
  getStats: () => customFetch('/admin/stats'),
  getAllOrders: () => customFetch('/admin/orders'),
  updateOrderStatus: (id, status, description) =>
    customFetch(`/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, description })
    }),
  createProduct: (data) => customFetch('/admin/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id, data) => customFetch(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id) => customFetch(`/admin/products/${id}`, { method: 'DELETE' }),
};

// Nutrition API (Open Food Facts Backend Fallback)
export const nutritionApi = {
  searchFood: (query, limit = 10) =>
    customFetch(`/nutrition/search?query=${encodeURIComponent(query)}&limit=${limit}`),
};

// Exercise API (MongoDB 124 Exercise Library)
export const exerciseApi = {
  getExercises: (params = {}) => {
    const searchParams = new URLSearchParams(params).toString();
    return customFetch(`/exercises${searchParams ? `?${searchParams}` : ''}`);
  },
  getExerciseById: (id) => customFetch(`/exercises/${id}`),
};
