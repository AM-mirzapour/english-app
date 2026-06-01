import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { setAuth, clearAuth } from "@/store/slices/authSlice";
import { RootState } from "@/store";

export const useAuthSession = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth,
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: authService.getMe,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data && data.user) {
      dispatch(
        setAuth({
          user: data.user,
          role: data.user.is_teacher ? "tutor" : "student",
        }),
      );
    } else if (isError) {
      dispatch(clearAuth());
    }
  }, [data, isError, dispatch]);

  return { isLoading, isAuthenticated, role };
};
