import axiosInstance from './axiosConfig';

export const restaurantService = {
  getAllRestaurants: async () => {
    try {
      const response = await axiosInstance.get('restaurants');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRestaurantById: async (id) => {
    try {
      const response = await axiosInstance.get(`restaurant/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRestaurantsByLocation: async (location) => {
    try {
      const response = await axiosInstance.get(`restaurants/location/${location}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRestaurantProfile: async (id) => {
    try {
      const response = await axiosInstance.get(`restaurant/profile/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRestaurantCategories: async (id) => {
    try {
      const response = await axiosInstance.get(`restaurant/${id}/categories`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default restaurantService;
