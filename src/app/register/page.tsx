"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Link from "next/link";
import { GraduationCap, BookOpen, ArrowRight, UserCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { authService } from "@/services/authService";
import { setAuth } from "@/store/slices/authSlice";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [role, setRole] = useState<"student" | "tutor">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const registerPayload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      is_teacher: role === "tutor",
    };

    try {
      await authService.register(registerPayload);
      const loginData = await authService.login({ email: data.email, password: data.password });

      Cookies.set("access_token", loginData.access, { expires: 1 });
      Cookies.set("refresh_token", loginData.refresh, { expires: 7 });

      const userData = await authService.getMe();
      const userInfo = userData.user || userData;

      dispatch(setAuth({ user: userInfo, role: role }));

      if (role === "tutor") {
        router.push("/dashboard/tutor");
      } else {
        router.push("/dashboard/student");
      }
    } catch (error: any) {
      setIsLoading(false);
      alert(JSON.stringify(error.response?.data) || "خطا در فرآیند ثبت‌نام.");
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
            <div className="mt-20">
              <h2 className="text-4xl font-black leading-tight">شروع یک<br/><span className="text-blue-500">مسیر جدید</span></h2>
              <p className="text-sm font-medium text-slate-400 mt-4 leading-relaxed">
                با عضویت در پلتفرم ما، به هزاران دانش‌آموز و برترین اساتید زبان بپیوندید و تجربه جدیدی از یادگیری را آغاز کنید.
              </p>
            </div>
          </div>
          <div className="relative z-10 text-xs font-bold text-slate-500">
            © {new Date().getFullYear()} LangPath. All rights reserved.
          </div>
        </div>

        <div className="w-full lg:w-7/12 p-8 sm:p-12">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-900">ایجاد حساب کاربری</h1>
            <p className="text-sm font-bold text-slate-500 mt-1">لطفاً نقش خود را انتخاب کرده و اطلاعات را تکمیل کنید.</p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setRole("student")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all ${role === "student" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <BookOpen size={18} /> دانشجو
            </button>
            <button 
              onClick={() => setRole("tutor")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all ${role === "tutor" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <GraduationCap size={18} /> استاد
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <UserCircle size={18} />
                </div>
                <input type="text" {...register("first_name", { required: true })} placeholder="نام" className="w-full p-4 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all" />
              </div>
              <div className="relative">
                <input type="text" {...register("last_name", { required: true })} placeholder="نام خانوادگی" className="w-full p-4 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input type="email" dir="ltr" {...register("email", { required: true })} placeholder="Email Address" className="w-full p-4 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all text-left" />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input type={showPassword ? "text" : "password"} dir="ltr" {...register("password", { required: true })} placeholder="Password" className="w-full p-4 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all text-left" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" disabled={isLoading} className={`w-full py-4 mt-2 rounded-xl font-black text-sm text-white transition-all ${role === "tutor" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-blue-600 hover:bg-blue-700"} disabled:bg-slate-300`}>
              {isLoading ? "در حال پردازش..." : `ثبت‌نام به عنوان ${role === "tutor" ? "مدرس" : "زبان‌آموز"}`}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-slate-500 mt-8">
            از قبل حساب کاربری دارید؟ <Link href="/login" className={`${role === "tutor" ? "text-indigo-600" : "text-blue-600"} hover:underline`}>وارد شوید</Link>
          </p>
        </div>
      </div>
    </div>
  );
}