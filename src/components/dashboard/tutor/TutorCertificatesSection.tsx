"use client";

import { useForm } from "react-hook-form";
import { useTutorCertificates, useAddCertificate } from "@/hooks/useTutor";
import { Award } from "lucide-react";

export default function TutorCertificatesSection({ tutorId }: { tutorId: number }) {
  const { data: certs, isLoading } = useTutorCertificates();
  const addCertificate = useAddCertificate();
  const { register, handleSubmit, reset } = useForm();

  if (isLoading) return <div className="p-10 text-center font-bold text-slate-500">در حال بارگذاری...</div>;

  const onSubmit = (data: any) => {
    if (!tutorId) return alert("خطای سیستم: آیدی استاد دریافت نشد.");
    const formData = new FormData();
    formData.append("tutor", String(tutorId));
    formData.append("title", data.title);
    
    if (data.issued_by) formData.append("issued_by", data.issued_by);
    if (data.issue_date) formData.append("issue_date", data.issue_date);
    if (data.certificate_image && data.certificate_image.length > 0) {
      formData.append("certificate_image", data.certificate_image[0]);
    }
    
    addCertificate.mutate(formData, { onSuccess: () => reset() });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">عنوان مدرک</label>
          <input {...register("title", { required: true })} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">صادرکننده مرجع</label>
          <input {...register("issued_by")} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">تاریخ صدور</label>
          <input type="date" {...register("issue_date")} className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 bg-white" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">آپلود تصویر یا فایل مدرک</label>
          <input type="file" accept="image/*,application/pdf" {...register("certificate_image")} className="p-3 border border-slate-200 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer bg-white" />
        </div>
        <button type="submit" disabled={addCertificate.isPending} className="md:col-span-2 py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-colors disabled:bg-slate-300">
          {addCertificate.isPending ? "در حال آپلود..." : "ثبت و تایید گواهینامه"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs?.map((c: any) => (
          <div key={c.id} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-base">{c.title}</h4>
              <p className="text-xs font-bold text-slate-500 mt-1">{c.issued_by}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}