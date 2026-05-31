// src/services/categoryService.js
import axiosInstance from './axiosConfig';

export const categoryService = {
    getAllCategories: async () => {
        try {
            const response = await axiosInstance.get('categories');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCategoryById: async (id) => {
        try {
            const response = await axiosInstance.get(`category/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};