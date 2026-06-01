"use client";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateStudentProfile } from "@/hooks/useStudent";
import { RootState } from "@/store";
import { UserCircle, Mail, ShieldCheck, Activity, Settings2 } from "lucide-react";

interface StudentProfileSectionProps {
  dashboardData: any;
}

export default function StudentProfileSection({ dashboardData }: StudentProfileSectionProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const updateProfileMutation = useUpdateStudentProfile();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      student_active: dashboardData?.student_active ?? true,
    },
  });

  const onSubmit = (data: any) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        alert("تنظیمات پروفایل با موفقیت به‌روزرسانی شد");
      },
      onError: (error: any) => {
        alert(error.response?.data?.detail || "خطا در ذخیره تغییرات");
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
        
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <UserCircle size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800">اطلاعات هویتی</h3>
            <p className="text-xs font-medium text-slate-500 mt-1">مشخصات ثبت شده در سامانه یکپارچه</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
              <UserCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-1">نام و نام خانوادگی</p>
              <p className="text-sm font-black text-slate-800">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
              <Mail size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-400 mb-1">آدرس ایمیل</p>
              <p className="text-sm font-black text-slate-800 truncate" dir="ltr">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex items-center gap-4 md:col-span-2">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-1">سطح دسترسی</p>
              <p className="text-sm font-black text-slate-800">دانش‌آموز تایید شده</p>
            </div>
          </div>
        </div>
      </div>

    
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
            <Settings2 size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800">تنظیمات داشبورد</h3>
            <p className="text-xs font-medium text-slate-500 mt-1">مدیریت وضعیت حضور در سیستم</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <label 
            htmlFor="student_active" 
            className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 hover:border-blue-200 bg-slate-50/50 cursor-pointer transition-all duration-300 group"
          >
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                id="student_active"
                {...register("student_active")}
                className="peer sr-only"
              />
              <div className="w-6 h-6 border-2 border-slate-300 rounded bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200"></div>
              <Activity size={14} strokeWidth={3} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">وضعیت فعالیت حساب دانش‌آموزی</h4>
              <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">
                با غیرفعال کردن این گزینه، اطلاعات شما موقتاً از لیست دانش‌آموزان فعال پنهان می‌شود اما تاریخچه دوره‌های شما محفوظ خواهد ماند.
              </p>
            </div>
          </label>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-slate-900/10 hover:shadow-blue-600/20 transition-all duration-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              {updateProfileMutation.isPending ? "در حال پردازش..." : "ذخیره تنظیمات"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}