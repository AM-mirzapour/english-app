import { useQuery } from "@tanstack/react-query";
import { publicService } from "@/services/publicService";

export const useCourses = () => {
  return useQuery({
    queryKey: ["publicCourses"],
    queryFn: () => publicService.getCourses(),
  });
};

export const useTutors = () => {
  return useQuery({
    queryKey: ["publicTutors"],
    queryFn: () => publicService.getTutors(),
  });
};

export const useBlogs = () => {
  return useQuery({
    queryKey: ["publicBlogs"],
    queryFn: () => publicService.getBlogs(),
  });
};