"use client";

import { useForm } from "react-hook-form";
import { useTutorExperiences, useAddExperience } from "@/hooks/useTutor";
import { Briefcase } from "lucide-react";

export default function TutorExperiencesSection({ tutorId }: { tutorId: number }) {
  const { data: experiences, isLoading } = useTutorExperiences();
  const addExperience = useAddExperience();
  const { register, handleSubmit, reset } = useForm();

  if (isLoading) return <div className="p-10 text-center font-bold text-slate-500">در حال بارگذاری...</div>;

  const onSubmit = (data: any) => {
    if (!tutorId) return alert("خطای سیستم: آیدی استاد دریافت نشد.");
    const payload = {
      ...data,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      tutor: tutorId
    };
    addExperience.mutate(payload, { onSuccess: () => reset() });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">عنوان شغلی</label>
          <input {...register("title", { required: true })} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">نام سازمان یا شرکت</label>
          <input {...register("organization")} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">کشور</label>
          <input {...register("country")} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">شهر</label>
          <input {...register("city")} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">تاریخ شروع فعالیت</label>
          <input type="date" {...register("start_date")} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 bg-white" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">تاریخ پایان فعالیت</label>
          <input type="date" {...register("end_date")} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 bg-white" />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">توضیحات و شرح وظایف</label>
          <textarea {...register("description")} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 h-28 resize-none" />
        </div>
        <button type="submit" disabled={addExperience.isPending} className="md:col-span-2 py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-colors disabled:bg-slate-300">
          {addExperience.isPending ? "در حال پردازش..." : "ثبت سابقه کاری"}
        </button>
      </form>

      <div className="grid grid-cols-1 gap-6">
        {experiences?.map((exp: any) => (
          <div key={exp.id} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
              <Briefcase size={24} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-lg">{exp.title}</h4>
              <p className="text-sm font-bold text-slate-500 mt-1">{exp.organization}</p>
              <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}