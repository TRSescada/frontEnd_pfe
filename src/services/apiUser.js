import axiosInstance from './axiosConfig';

export const apiUser = {
    getProfileInfo: async (userId) => {
        try {
            const response = await axiosInstance.get(`../auth/profile/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateProfileInfo: async (userId, data) => {
        try {
            const response = await axiosInstance.put(`../auth/profile/${userId}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getSocialLinks: async (userId) => {
        try {
            const response = await axiosInstance.get(`../auth/social-links/${userId}`);
            const links = { facebook: "", instagram: "", twitter: "", linkedin: "", tiktok: "", snapchat: "", whatsapp: "" };
            if (Array.isArray(response.data)) {
                response.data.forEach(item => {
                    const platformKey = item.platform.toLowerCase();
                    if (platformKey in links) {
                        links[platformKey] = item.url;
                    }
                });
            }
            return links;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    saveSocialLinks: async (userId, links) => {
        try {
            const response = await axiosInstance.post(`../auth/social-links/${userId}`, links);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateSocialLink: async (userId, links) => {
        try {
            const response = await axiosInstance.put(`../auth/social-link/${userId}`, links);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getOwnerDashboard: async (ownerId) => {
        try {
            const response = await axiosInstance.get(`owner/${ownerId}/dashboard`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getOwnerRestaurants: async (ownerId) => {
        try {
            const response = await axiosInstance.get(`owner/${ownerId}/restaurants`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getOwnerManagers: async (ownerId) => {
        try {
            const response = await axiosInstance.get(`owner/${ownerId}/managers`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axiosInstance.get(`../auth/user/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getManagerByUserId: async (userId) => {
        try {
            const response = await axiosInstance.get(`../manager/by-user/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllWorkers: async () => {
        try {
            const response = await axiosInstance.get(`../auth/users?role=WORKER&limit=100`);
            return response.data.users || response.data || [];
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getOwnerProfile: async (ownerId) => {
        try {
            const response = await axiosInstance.get(`owner/${ownerId}/profile`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getRestaurantDetails: async (ownerId, restaurantId) => {
        try {
            const response = await axiosInstance.get(`owner/${ownerId}/restaurant/${restaurantId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getManagerDetails: async (ownerId, managerId) => {
        try {
            const response = await axiosInstance.get(`owner/${ownerId}/manager/${managerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getOrdersByWorker: async (workerId) => {
        try {
            const response = await axiosInstance.get(`worker/${workerId}/orders`);
            return response.data.orders || [];
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

    updateItemStatus: async (orderId, itemIndex, status) => {
        try {
            const response = await axiosInstance.put(`order/${orderId}/item/${itemIndex}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteCompletedOrdersByTable: async (tableObjectId) => {
        try {
            const response = await axiosInstance.delete(`table/${tableObjectId}/completed-orders`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    releaseTable: async (tableObjectId) => {
        try {
            const response = await axiosInstance.post(`table/${tableObjectId}/release`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    uploadAvatar: async (userId, formData) => {
        try {
            const response = await axiosInstance.post(`../auth/upload-avatar/${userId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    uploadCoverImage: async (userId, formData) => {
        try {
            const response = await axiosInstance.post(`../auth/upload-cover/${userId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllUsers: async (params = {}) => {
        try {
            const response = await axiosInstance.get(`../auth/users`, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default apiUser;
