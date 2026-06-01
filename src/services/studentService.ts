import { api } from "./api";

export const studentService = {
  getDashboard: async () => {
    const response = await api.get("/api/students/me/dashboard/");
    return response.data;
  },

  updateProfile: async (formData: FormData) => {
    const response = await api.patch("/api/students/me/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getAvailableCourses: async () => {
    const response = await api.get("/api/courses/");
    return response.data;
  },

  getMyEnrollments: async () => {
    const response = await api.get("/api/enrollments/my/");
    return response.data;
  },

  createEnrollment: async (formData: FormData) => {
    const response = await api.post("/api/enrollments/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getHomeworks: async () => {
    const response = await api.get("/api/homeworks/");
    return response.data;
  }
};