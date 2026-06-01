import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("ایمیل وارد شده معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export const registerSchema = z.object({
  first_name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  last_name: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل وارد شده معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  is_teacher: z.boolean().default(false),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("ایمیل وارد شده معتبر نیست"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("ایمیل وارد شده معتبر نیست"),
  new_password: z.string().min(6, "رمز عبور جدید باید حداقل ۶ کاراکتر باشد"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;