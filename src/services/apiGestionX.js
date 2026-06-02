import axiosInstance from './axiosConfig';

export const apiGestionX = {
    // ==================== RESTAURANT ====================
    getRestaurantByManagerId: async (managerId) => {
        try {
            const response = await axiosInstance.get(`../manager/manager-restaurant/${managerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateRestaurantInfo: async (restaurantId, data) => {
        try {
            const config = {};
            if (data instanceof FormData) {
                config.headers = { 'Content-Type': 'multipart/form-data' };
            }
            const response = await axiosInstance.put(`../manager/restaurant-info/${restaurantId}`, data, config);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllRestaurants: async () => {
        try {
            const response = await axiosInstance.get('restaurants');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getRestaurantById: async (restaurantId) => {
        try {
            const response = await axiosInstance.get(`restaurant/${restaurantId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getWorkersByRestaurant: async (restaurantId) => {
        try {
            const response = await axiosInstance.get(`workers/restaurant/${restaurantId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== TABLES ====================
    getTablesByRestaurant: async (restaurantId) => {
        try {
            const response = await axiosInstance.get(`tables/restaurant/${restaurantId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addMultipleTables: async (managerId, restaurantId, count) => {
        try {
            const response = await axiosInstance.post(`tables/batch/${managerId}/${restaurantId}`, { count });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteSingleTable: async (tableId) => {
        try {
            const response = await axiosInstance.delete(`table/${tableId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteMultipleTables: async (restaurantId, tableIds) => {
        try {
            const response = await axiosInstance.delete(`tables/batch/${restaurantId}`, { data: { tableIds } });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== GROUPS ====================
    getGroupesByRestaurant: async (restaurantId) => {
        try {
            const response = await axiosInstance.get(`groupes/${restaurantId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addGroupe: async (restaurantId, name, description = '') => {
        try {
            const response = await axiosInstance.post(`groupe/${restaurantId}`, { nomgroupe: name, description });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    assignTablesToGroup: async (groupeId, start, end) => {
        try {
            const response = await axiosInstance.put(`groupe/add-tables/${groupeId}`, { startNumber: start, endNumber: end });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteGroupe: async (groupeId) => {
        try {
            const response = await axiosInstance.delete(`groupe/${groupeId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    assignWorkerToGroupe: async (managerId, groupeId, workerId) => {
        try {
            const response = await axiosInstance.put(`../manager/manager/${managerId}/groupe/${groupeId}/assign-worker/${workerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    fireWorker: async (managerId, workerId) => {
        try {
            const response = await axiosInstance.delete(`../manager/manager/${managerId}/fire-worker/${workerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== PRODUCTS / CATEGORIES ====================
    getRestaurantCategories: async (restaurantId) => {
        try {
            const response = await axiosInstance.get(`restaurant/${restaurantId}/categories`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getProductsByCategory: async (restaurantId, categorie) => {
        try {
            const response = await axiosInstance.get(`products/category/${restaurantId}/${categorie}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addProduct: async (restaurantId, productData) => {
        try {
            const response = await axiosInstance.post(`../manager/product/${restaurantId}`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateProduct: async (productId, productData) => {
        try {
            const response = await axiosInstance.put(`../manager/product/${productId}`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteProduct: async (productId) => {
        try {
            const response = await axiosInstance.delete(`../manager/product/${productId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== COMMENTS & EVALUATIONS ====================
    getCommentsByWorker: async (workerId) => {
        try {
            const response = await axiosInstance.get(`comments/worker/${workerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addComment: async (tableId, commentData) => {
        try {
            const response = await axiosInstance.post(`comment/table/${tableId}`, commentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getEvaluationsByWorker: async (workerId) => {
        try {
            const response = await axiosInstance.get(`evaluations/worker/${workerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addEvaluation: async (managerId, workerId, evalData) => {
        try {
            const response = await axiosInstance.post(`evaluation/${managerId}/${workerId}`, evalData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== CV ====================
    getWorkerCV: async (workerId) => {
        try {
            const response = await axiosInstance.get(`cv/worker/${workerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateCV: async (workerId, cvData) => {
        try {
            const response = await axiosInstance.put(`cv/worker/${workerId}`, cvData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== WORK HISTORY ====================
    getWorkHistoryByWorker: async (workerId) => {
        try {
            const response = await axiosInstance.get(`work-history/worker/${workerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== TABLES (additional) ====================
    updateTableStatus: async (tableId, etat) => {
        try {
            const response = await axiosInstance.put(`table/${tableId}/status`, { etat });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getTableById: async (tableId) => {
        try {
            const response = await axiosInstance.get(`table/${tableId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getQRCodeImage: async (tableId) => {
        try {
            const response = await axiosInstance.get(`table/${tableId}/qr-code`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== GROUPS (additional) ====================
    getWorkerByGroupe: async (managerId, groupeId) => {
        try {
            const response = await axiosInstance.get(`../manager/manager/${managerId}/groupe/${groupeId}/worker`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    removeWorkerFromGroupe: async (managerId, groupeId, workerId) => {
        try {
            const response = await axiosInstance.delete(`../manager/manager/${managerId}/groupe/${groupeId}/remove-worker/${workerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    assignOwnerToRestaurant: async (managerId, restaurantId, ownerId) => {
        try {
            const response = await axiosInstance.put(`../manager/manager/${managerId}/restaurant/${restaurantId}/assign-owner/${ownerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== CART / ORDER ====================
    addToCart: async (tableId, productId, quantity = 1) => {
        try {
            const response = await axiosInstance.post(`cart/${tableId}/add`, { productId, quantity });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createOrderFromCart: async (tableId, workerId) => {
        try {
            const response = await axiosInstance.post(`cart/${tableId}/order`, { workerId });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== INVOICES / FACTURES ====================
    getInvoicesWithFilters: async (restaurantId, params = {}) => {
        try {
            const response = await axiosInstance.get(`factures/restaurant/${restaurantId}`, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getRestaurantRevenus: async (restaurantId, params = {}) => {
        try {
            const response = await axiosInstance.get(`factures/stats/restaurant/${restaurantId}`, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ==================== OWNERS ====================
    getAllOwners: async () => {
        try {
            const response = await axiosInstance.get('owners');
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

    getOwnerProfile: async (ownerId) => {
        try {
            const response = await axiosInstance.get(`owner/${ownerId}/profile`);
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
    }
};

export default apiGestionX;
