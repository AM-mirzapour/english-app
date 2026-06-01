import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tutorService } from "@/services/tutorService";

export const useTutorDashboard = () => {
  return useQuery({
    queryKey: ["tutorDashboard"],
    queryFn: () => tutorService.getDashboard(),
    retry: false, 
  });
};

export const useTutorCourses = () => {
  return useQuery({
    queryKey: ["tutorCourses"],
    queryFn: () => tutorService.getCourses(),
  });
};

export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => tutorService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorCourses"] });
    },
    onError: (error: any) => {
      alert(JSON.stringify(error.response?.data) || "خطا در ثبت اطلاعات دوره");
    }
  });
};

export const useTutorEducations = () => {
  return useQuery({
    queryKey: ["tutorEducations"],
    queryFn: () => tutorService.getEducations(),
  });
};

export const useAddEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => tutorService.createEducation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorEducations"] });
    },
    onError: (error: any) => {
      alert(JSON.stringify(error.response?.data) || "خطا در ثبت سابقه تحصیلی");
    }
  });
};

export const useTutorExperiences = () => {
  return useQuery({
    queryKey: ["tutorExperiences"],
    queryFn: () => tutorService.getExperiences(),
  });
};

export const useAddExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => tutorService.createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorExperiences"] });
    },
    onError: (error: any) => {
      alert(JSON.stringify(error.response?.data) || "خطا در ثبت سابقه کاری");
    }
  });
};

export const useTutorCertificates = () => {
  return useQuery({
    queryKey: ["tutorCertificates"],
    queryFn: () => tutorService.getCertificates(),
  });
};

export const useAddCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => tutorService.createCertificate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorCertificates"] });
    },
    onError: (error: any) => {
      alert(JSON.stringify(error.response?.data) || "خطا در ثبت گواهینامه");
    }
  });
};

export const useCreateTutorProfile = () => {
  return useMutation({
    mutationFn: (formData: FormData) => tutorService.createProfile(formData),
  });
};