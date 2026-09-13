import axiosInstance from "../lib/axios.js";

export const sessionApi = {
  createSession: async (data) => {
    try {
      const response = await axiosInstance.post("/sessions", data);
      return response.data;
    } catch (error) {
      console.log("Error in createSession api handling", error);
      throw error;
    }
  },

  getActiveSessions: async () => {
    try {
      const response = await axiosInstance.get("/sessions/active");
      return response.data;
    } catch (error) {
      console.log("Error while getActive session api handling", error);
      throw error;
    }
  },

  getMyRecentSessions: async () => {
    try {
      const response = await axiosInstance.get("/sessions/my-recent");
      return response.data;
    } catch (error) {
      console.log("Error while getRecent session api handling", error);
      throw error;
    }
  },

  getSessionById: async (id) => {
    try {
      const response = await axiosInstance.get(`/sessions/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error while getSessionBYid api handling", error);
      throw error;
    }
  },

  joinSession: async (id) => {
    try {
      const response = await axiosInstance.post(`/sessions/${id}/join`);
      return response.data;
    } catch (error) {
      console.log("Error while join session api handling", error);
      throw error;
    }
  },

  endSession: async (id) => {
    try {
      const response = await axiosInstance.post(`/sessions/${id}/end`);
      return response.data;
    } catch (error) {
      console.log("Error while end session api handling", error);
      throw error;
    }
  },

  getStreamToken: async () => {
    try {
      const response = await axiosInstance.get(`/chat/token`);
      return response.data;
    } catch (error) {
      console.log("Error while getStreamToken api handling", error);
      throw error;
    }
  },
};
