import axiosInstance from './axiosConfig';

export const jobOfferService = {
  getAllWorkers: async () => {
    try {
      const response = await axiosInstance.get('workers/available', { timeout: 60000 });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMyWorkers: async (managerId) => {
    try {
      const response = await axiosInstance.get(`manager/${managerId}/workers`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getWorkerByUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`workers/by-user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createJobOffer: async (managerId, workerId) => {
    try {
      const response = await axiosInstance.post(`job-offer/${managerId}/${workerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMyJobOffers: async (workerId) => {
    try {
      const response = await axiosInstance.get(`job-offers/${workerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  acceptJobOffer: async (jobOfferId) => {
    try {
      const response = await axiosInstance.put(`job-offer/${jobOfferId}/accept`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  rejectJobOffer: async (jobOfferId) => {
    try {
      const response = await axiosInstance.put(`job-offer/${jobOfferId}/reject`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default jobOfferService;
