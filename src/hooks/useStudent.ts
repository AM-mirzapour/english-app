import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "@/services/studentService";

export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ["studentDashboard"],
    queryFn: () => studentService.getDashboard(),
  });
};

export const useAvailableCourses = () => {
  return useQuery({
    queryKey: ["availableCourses"],
    queryFn: () => studentService.getAvailableCourses(),
  });
};

export const useStudentEnrollments = () => {
  return useQuery({
    queryKey: ["myEnrollments"],
    queryFn: () => studentService.getMyEnrollments(),
  });
};

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => studentService.updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentDashboard"] });
    }
  });
};

export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => studentService.createEnrollment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myEnrollments"] });
    }
  });
};

export const useStudentHomeworks = () => {
  return useQuery({
    queryKey: ["studentHomeworks"],
    queryFn: () => studentService.getHomeworks(),
  });
};