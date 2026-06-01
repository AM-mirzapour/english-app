import { api } from "./api";

export const publicService = {
  getCourses: async () => {
    const response = await api.get("/api/courses/");
    return response.data;
  },
  getTutors: async () => {
    const response = await api.get("/api/tutors/");
    return response.data;
  },
  getBlogs: async () => {
    const response = await api.get("/api/blogs/");
    return response.data;
  },
};