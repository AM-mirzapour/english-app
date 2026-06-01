"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  KeyRound,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { authService } from "@/services/authService";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email: data.email });
      setIsSubmitted(true);
    } catch (error: any) {
      alert(JSON.stringify(error.response?.data) || "خطا در ارسال درخواست.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col-reverse lg:flex-row overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-500">
        <div className="hidden lg:flex flex-col justify-between w-5/12 bg-slate-900 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
          <div className="relative z-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowRight size={16} /> بازگشت به صفحه ورود
            </Link>
            <div className="mt-24">
              <h2 className="text-4xl font-black leading-tight">
                بازیابی
                <br />
                <span className="text-blue-500">رمز عبور</span>
              </h2>
              <p className="text-sm font-medium text-slate-400 mt-4 leading-relaxed">
                نگران نباشید! با وارد کردن ایمیل خود، لینک تغییر رمز عبور را
                دریافت خواهید کرد و به سرعت به مسیر یادگیری باز می‌گردید.
              </p>
            </div>
          </div>
          <div className="relative z-10 text-xs font-bold text-slate-500">
            © {new Date().getFullYear()} LangPath. All rights reserved.
          </div>
        </div>

        <div className="w-full lg:w-7/12 p-8 sm:p-12 flex flex-col justify-center">
          {isSubmitted ? (
            <div className="text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                لینک بازیابی ارسال شد
              </h2>
              <p className="text-sm font-bold text-slate-500 leading-relaxed mb-8">
                دستورالعمل بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق
                ورودی (و پوشه اسپم) خود را بررسی کنید.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-blue-600 transition-colors"
              >
                بازگشت به صفحه ورود
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-900">
                  فراموشی رمز عبور
                </h1>
                <p className="text-sm font-bold text-slate-500 mt-1">
                  ایمیل متصل به حساب کاربری خود را وارد کنید.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    dir="ltr"
                    {...register("email", {
                      required: "وارد کردن ایمیل الزامی است",
                    })}
                    placeholder="Email Address"
                    className={`w-full p-4 pl-12 pr-4 bg-slate-50 border ${errors.email ? "border-red-400 bg-red-50/30" : "border-slate-200"} rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all text-left`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {String(errors.email.message)}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm transition-all shadow-lg shadow-blue-600/20 disabled:bg-slate-300 flex items-center justify-center gap-2"
                >
                  <KeyRound size={18} />
                  {isLoading ? "در حال ارسال..." : "ارسال لینک بازیابی"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
