import { api } from "./api";

export const authService = {
  register: async (data: any) => {
    const response = await api.post("/api/register/", data);
    return response.data;
  },

  login: async (data: any) => {
    const response = await api.post("/api/login/", data);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/api/me/");
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await api.post("/api/forgot-password/", data);
    return response.data;
  },


  logout: async () => {
    try {
      const response = await api.post("/api/logout/");
      return response.data;
    } catch (error) {
      return null; 
    }
  },
};
