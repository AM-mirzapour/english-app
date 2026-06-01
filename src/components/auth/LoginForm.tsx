"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSchema, LoginInput } from "@/schemas/auth.schema";
import { useLoginMutation } from "@/hooks/useAuthMutation";
import { setAuth } from "@/store/slices/authSlice";
import { authService } from "@/services/authService";
import InputField from "@/components/ui/InputField";
import PasswordInputField from "@/components/ui/PasswordInputField";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data, {
      onSuccess: async () => {
        try {
    
          const userData = await authService.getMe();
          
          const userInfo = userData.user || userData;
          const isTeacher = userInfo.is_teacher;

     
          dispatch(
            setAuth({
              user: userInfo,
              role: isTeacher ? "tutor" : "student",
            })
          );
          
   
          router.push(isTeacher ? "/dashboard/tutor" : "/dashboard/student");
          
        } catch (error) {
          alert("ورود موفق بود اما در دریافت اطلاعات کاربری خطایی رخ داد.");
        }
      },
      onError: (error: any) => {
        alert(error.response?.data?.detail || "اطلاعات ورود نادرست است");
      },
    });
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100" dir="rtl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-black text-gray-900">ورود به حساب</h2>
        <p className="text-xs text-gray-500 mt-1.5">خوش آمدید، لطفا اطلاعات خود را وارد کنید</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="ایمیل"
          type="email"
          error={errors.email?.message}
          {...register("email")}
          className="text-left"
        />

        <div>
          <PasswordInputField
            label="رمز عبور"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="flex justify-end mt-2">
            <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/10 transition-all duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
        >
          {loginMutation.isPending ? "در حال بررسی..." : "ورود به حساب"}
        </button>

        <div className="text-center text-xs text-gray-600 pt-2">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            ثبت‌نام کنید
          </Link>
        </div>
      </form>
    </div>
  );
}