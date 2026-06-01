"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { resetPasswordSchema, ResetPasswordInput } from "@/schemas/auth.schema";
import { useResetPasswordMutation } from "@/hooks/useAuthMutation";
import InputField from "@/components/ui/InputField";
import PasswordInputField from "@/components/ui/PasswordInputField";

export default function ResetPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPasswordMutation = useResetPasswordMutation();

  const onSubmit = (data: ResetPasswordInput) => {
    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        alert("رمز عبور شما با موفقیت تغییر کرد");
        router.push("/login");
      },
      onError: (error: any) => {
        alert(error.response?.data?.detail || "خطا در تغییر رمز عبور");
      },
    });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border border-gray-100" dir="rtl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        تغییر رمز عبور
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          label="ایمیل"
          type="email"
          error={errors.email?.message}
          {...register("email")}
          className="text-left"
        />

        <PasswordInputField
          label="رمز عبور جدید"
          error={errors.new_password?.message}
          {...register("new_password")}
        />

        <button
          type="submit"
          disabled={resetPasswordMutation.isPending}
          className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {resetPasswordMutation.isPending ? "در حال ثبت..." : "تغییر رمز عبور"}
        </button>
      </form>
    </div>
  );
}