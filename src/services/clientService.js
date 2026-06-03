import axiosInstance from './axiosConfig';

export const clientService = {
  getMenuByTable: async (restaurantId, tableNumero) => {
    try {
      const response = await axiosInstance.get(`menu/${restaurantId}/${tableNumero}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addToCart: async (tableId, productId, quantity = 1) => {
    try {
      const response = await axiosInstance.post(`cart/${tableId}/add`, { productId, quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  removeFromCart: async (tableId, productId) => {
    try {
      const response = await axiosInstance.delete(`cart/${tableId}/remove/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateCartQuantity: async (tableId, productId, quantity) => {
    try {
      const response = await axiosInstance.put(`cart/${tableId}/update/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCartByTable: async (tableId) => {
    try {
      const response = await axiosInstance.get(`cart/${tableId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  clearCart: async (tableId) => {
    try {
      const response = await axiosInstance.delete(`cart/${tableId}/clear`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createOrder: async (tableId, workerId) => {
    try {
      const response = await axiosInstance.post(`cart/${tableId}/order`, workerId ? { workerId } : {});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getOrdersByWorker: async (workerId) => {
    try {
      const response = await axiosInstance.get(`worker/${workerId}/orders`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateItemStatus: async (orderId, itemIndex, status) => {
    try {
      const response = await axiosInstance.put(`order/${orderId}/item/${itemIndex}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateAllItemsStatus: async (orderId, status) => {
    try {
      const response = await axiosInstance.put(`order/${orderId}/items/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getOrdersByTable: async (tableId) => {
    try {
      const response = await axiosInstance.get(`table/${tableId}/orders`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getOrdersByOrderNumber: async (orderNumber) => {
    try {
      const response = await axiosInstance.get(`order-number/${orderNumber}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addCommentByWorker: async (workerId, { clientName, rating, comment, restaurantId }) => {
    try {
      const response = await axiosInstance.post(`comment/worker/${workerId}`, { clientName, rating, comment, restaurantId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCommentsByWorker: async (workerId) => {
    try {
      const response = await axiosInstance.get(`comments/worker/${workerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default clientService;
