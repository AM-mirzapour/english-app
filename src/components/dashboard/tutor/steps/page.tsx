"use client";

import { useForm } from "react-hook-form";
import { useCreateTutorProfile } from "@/hooks/useTutor";
import { UserCircle, MapPin, Phone, BookOpen, AlertCircle, Sparkles } from "lucide-react";

export default function TutorSetupPage() {
  const createProfile = useCreateTutorProfile();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    const fd = new FormData();

    if (data.subjects) {
      const subjectsArray = data.subjects.split("،").map((s: string) => s.trim());
      subjectsArray.forEach((subject: string) => {
        if (subject) fd.append("subjects", subject);
      });
    }

    if (data.phone_number) fd.append("phone_number", data.phone_number);
    if (data.country) fd.append("country", data.country);
    if (data.bio) fd.append("bio", data.bio);
    if (data.teaching_style) fd.append("teaching_style", data.teaching_style);
    
    if (data.profile_picture && data.profile_picture.length > 0) {
      fd.append("profile_picture", data.profile_picture[0]);
    }

    createProfile.mutate(fd, {
      onSuccess: () => {
        window.location.href = "/dashboard/tutor";
      },
      onError: (err: any) => {
        alert(JSON.stringify(err.response?.data) || "خطا در ایجاد پروفایل");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-8 font-sans selection:bg-blue-100">
      <div className="w-full max-w-3xl bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="bg-slate-900 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl mx-auto flex items-center justify-center mb-5 backdrop-blur-sm border border-blue-500/30">
              <Sparkles size={32} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">تکمیل پروفایل استادی</h1>
            <p className="text-slate-400 text-sm font-medium mt-3 max-w-lg mx-auto leading-relaxed">
              به جمع اساتید LangPath خوش آمدید. برای دسترسی به داشبورد مدیریت، لطفاً اطلاعات پایه خود را تکمیل کنید.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                <BookOpen size={14} /> تخصص‌های آموزشی (الزامی)
              </label>
              <input 
                {...register("subjects", { required: "ثبت حداقل یک تخصص الزامی است" })} 
                placeholder="مثال: آیلتس، تافل، مکالمه (با ویرگول جدا کنید)" 
                className={`w-full p-4 border ${errors.subjects ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-slate-50'} rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all`} 
              />
              {errors.subjects && <span className="text-red-500 text-xs font-bold mt-2 px-1 flex items-center gap-1"><AlertCircle size={12} /> {String(errors.subjects.message)}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                  <Phone size={14} /> شماره تماس
                </label>
                <input 
                  {...register("phone_number")} 
                  dir="ltr"
                  placeholder="+98 912 000 0000" 
                  className="w-full p-4 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                  <MapPin size={14} /> کشور محل اقامت
                </label>
                <input 
                  {...register("country")} 
                  placeholder="مثال: ایران" 
                  className="w-full p-4 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                <UserCircle size={14} /> بیوگرافی کوتاه
              </label>
              <textarea 
                {...register("bio")} 
                placeholder="یک معرفی کوتاه از خودتان بنویسید..." 
                className="w-full p-4 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all h-24 resize-none" 
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 mb-2 px-1">تصویر پروفایل</label>
              <input 
                type="file" 
                accept="image/*" 
                {...register("profile_picture")} 
                className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer transition-all" 
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button 
                type="submit" 
                disabled={createProfile.isPending} 
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
              >
                {createProfile.isPending ? "در حال ایجاد پروفایل..." : "ثبت اطلاعات و ورود به داشبورد"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}   