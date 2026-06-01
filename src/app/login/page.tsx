"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Link from "next/link";
import { ArrowRight, LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { authService } from "@/services/authService";
import { setAuth } from "@/store/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const loginData = await authService.login({
        email: data.email,
        password: data.password,
      });

      Cookies.set("access_token", loginData.access, { expires: 1 });
      Cookies.set("refresh_token", loginData.refresh, { expires: 7 });

      const userData = await authService.getMe();
      const userInfo = userData.user || userData;
      const userRole = userInfo.is_teacher ? "tutor" : "student";

      dispatch(
        setAuth({
          user: userInfo,
          role: userRole,
        })
      );

      if (userRole === "tutor") {
        router.push("/dashboard/tutor");
      } else {
        router.push("/dashboard/student");
      }

    } catch (error: any) {
      setIsLoading(false);
      alert(JSON.stringify(error.response?.data) || "ایمیل یا رمز عبور اشتباه است.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col-reverse lg:flex-row overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-500">
        
        <div className="hidden lg:flex flex-col justify-between w-5/12 bg-slate-900 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
              <ArrowRight size={16} /> بازگشت به خانه
            </Link>
            <div className="mt-24">
              <h2 className="text-4xl font-black leading-tight">خوش آمدید<br/>به <span className="text-blue-500">LangPath</span></h2>
              <p className="text-sm font-medium text-slate-400 mt-4 leading-relaxed">
                ادامه مسیر حرفه‌ای یادگیری و تدریس زبان انگلیسی از همین‌جا جریان دارد. اطلاعات خود را وارد کرده و به پنل دسترسی پیدا کنید.
              </p>
            </div>
          </div>
          <div className="relative z-10 text-xs font-bold text-slate-500">
            © {new Date().getFullYear()} LangPath. All rights reserved.
          </div>
        </div>

        <div className="w-full lg:w-7/12 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-900">ورود به حساب کاربری</h1>
            <p className="text-sm font-bold text-slate-500 mt-1">خوشحالیم که شما را دوباره در کنار خود داریم.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                dir="ltr"
                {...register("email", { required: "وارد کردن ایمیل الزامی است" })} 
                placeholder="Email Address" 
                className={`w-full p-4 pl-12 pr-4 bg-slate-50 border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200'} rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all text-left`} 
              />
              {errors.email && (
                <span className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {String(errors.email.message)}</span>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                dir="ltr"
                {...register("password", { required: "وارد کردن رمز عبور الزامی است" })} 
                placeholder="Password" 
                className={`w-full p-4 pl-12 pr-12 bg-slate-50 border ${errors.password ? 'border-red-400 bg-red-50/30' : 'border-slate-200'} rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all text-left`} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <span className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {String(errors.password.message)}</span>
              )}
            </div>

            <div className="text-left">
              <Link href="/forgot-password" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                رمز عبور را فراموش کرده‌اید؟
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full py-4 mt-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-black text-sm transition-all shadow-lg shadow-slate-900/10 hover:shadow-blue-600/10 disabled:bg-slate-300 flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              {isLoading ? "در حال بررسی..." : "ورود به حساب کاربری"}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-slate-500 mt-8">
            هنوز ثبت‌نام نکرده‌اید؟ <Link href="/register" className="text-blue-600 hover:underline">حساب کاربری بسازید</Link>
          </p>
        </div>
      </div>
    </div>
  );
}