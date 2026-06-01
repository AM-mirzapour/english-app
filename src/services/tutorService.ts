import { api } from "./api";

export const tutorService = {
  getDashboard: async () => {
    const response = await api.get("/api/tutors/me/dashboard/");
    return response.data;
  },

  createProfile: async (formData: FormData) => {
    const response = await api.post("/api/create-tutor-profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getCourses: async () => {
    const response = await api.get("/api/courses/");
    return response.data;
  },

createCourse: async (data: any) => {
    const response = await api.post("/api/tutor-courses/", data); 
    return response.data;
  },

  getEducations: async () => {
    const response = await api.get("/api/tutor-educations/");
    return response.data;
  },

  createEducation: async (data: any) => {
    const response = await api.post("/api/tutor-educations/", data);
    return response.data;
  },

  getExperiences: async () => {
    const response = await api.get("/api/tutor-experiences/");
    return response.data;
  },

  createExperience: async (data: any) => {
    const response = await api.post("/api/tutor-experiences/", data);
    return response.data;
  },

  getCertificates: async () => {
    const response = await api.get("/api/tutor-certificates/");
    return response.data;
  },
  deleteCourse: async (id: number) => {
    return await api.delete(`/api/courses/${id}/`);
  },
  createCertificate: async (formData: FormData) => {
    const response = await api.post("/api/tutor-certificates/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
