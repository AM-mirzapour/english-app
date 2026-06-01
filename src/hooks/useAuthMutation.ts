import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "@/schemas/auth.schema";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      return await authService.login(data);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      return await authService.register(data);
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordInput) => {
      return await authService.forgotPassword(data);
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordInput) => {
      return await authService.resetPassword(data);
    },
  });
};
