"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { registerSchema, RegisterInput } from "@/schemas/auth.schema";
import { useRegisterMutation, useLoginMutation } from "@/hooks/useAuthMutation";
import { setAuth } from "@/store/slices/authSlice";
import InputField from "@/components/ui/InputField";
import PasswordInputField from "@/components/ui/PasswordInputField";
import RoleSelector from "./RoleSelector";

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      is_teacher: false,
    },
  });

  const isTeacherVal = watch("is_teacher");
  const registerMutation = useRegisterMutation();
  const loginMutation = useLoginMutation();

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof RegisterInput)[] = [];
    if (step === 2) fieldsToValidate = ["first_name", "last_name"];

    if (fieldsToValidate.length > 0) {
      const isStepValid = await trigger(fieldsToValidate);
      if (isStepValid) setStep((prev) => prev + 1);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: RegisterInput) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        loginMutation.mutate(
          { email: data.email, password: data.password },
          {
            onSuccess: (resData: any) => {
              dispatch(
                setAuth({
                  user: resData.user,
                  role: data.is_teacher ? "tutor" : "student",
                })
              );
              router.push(data.is_teacher ? "/dashboard/tutor" : "/dashboard/student");
            },
            onError: () => {
              router.push("/login");
            },
          }
        );
      },
      onError: (error: any) => {
        alert(error.response?.data?.detail || "خطا در ثبت‌نام");
      },
    });
  };

  const isLoading = registerMutation.isPending || loginMutation.isPending;

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">ایجاد حساب</h2>
          <p className="text-xs text-gray-500 mt-1">عضویت در سامانه آموزشی</p>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 py-1.5 px-3 rounded-xl shadow-sm border border-blue-100">
          مرحله {step} از ۳
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <RoleSelector
            isTeacher={isTeacherVal}
            onChange={(val) => setValue("is_teacher", val)}
          />
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
            <InputField
              label="نام"
              type="text"
              error={errors.first_name?.message}
              {...register("first_name")}
            />
            <InputField
              label="نام خانوادگی"
              type="text"
              error={errors.last_name?.message}
              {...register("last_name")}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <InputField
              label="ایمیل"
              type="email"
              error={errors.email?.message}
              {...register("email")}
              className="text-left"
            />
            <PasswordInputField
              label="رمز عبور"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
        )}

        <div className="flex gap-3 pt-3">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={isLoading}
              className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition w-1/3"
            >
              قبلی
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/10 transition-all duration-200"
            >
              بعدی
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/10 transition-all duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
            >
              {isLoading ? "در حال ایجاد حساب..." : "تکمیل ثبت‌نام"}
            </button>
          )}
        </div>

        <div className="text-center text-xs text-gray-600 pt-2">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            وارد شوید
          </Link>
        </div>
      </form>
    </div>
  );
}