"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useCreateTutorProfile } from "@/hooks/useTutor";
import Step2Specialties from "../tutor/steps/Step2Specialties";
import Step3BioVideo from "../tutor/steps/Step3BioVideo";
import {
  ArrowLeft,
  ArrowRight,
  UserCircle,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

export default function CreateTutorProfileForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const createProfile = useCreateTutorProfile();

  const auth = useSelector((state: any) => state.auth);
  const currentUser = auth?.user;

  const { register, control, watch, handleSubmit } = useForm({
    defaultValues: {
      subjects: [{ name: "" }],
      languages_spoken: [{ language: "", level: "Intermediate" }],
      phone_number: "",
      country: "",
      bio: "",
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    const fd = new FormData();

    if (currentUser?.id) {
      fd.append("user", String(currentUser.id));
    } else {
      alert("خطا: اطلاعات کاربری یافت نشد.");
      return;
    }

    if (data.subjects && Array.isArray(data.subjects)) {
      const validSubjects = data.subjects
        .map((s: any) => s.name)
        .filter((s: string) => s && s.trim() !== "");
      if (validSubjects.length > 0) {
        fd.append("subjects", JSON.stringify(validSubjects));
      }
    }

    if (data.languages_spoken && data.languages_spoken.length > 0) {
      fd.append("languages_spoken", JSON.stringify(data.languages_spoken));
    }

    if (data.phone_number) fd.append("phone_number", data.phone_number);
    if (data.country) fd.append("country", data.country);
    if (data.bio) fd.append("bio", data.bio);
    if (data.description) fd.append("teaching_style", data.description);

    if (data.profile_picture?.[0]) {
      fd.append("profile_picture", data.profile_picture[0]);
    }
    if (data.intro_video_file?.[0]) {
      fd.append("intro_video_file", data.intro_video_file[0]);
    }

    createProfile.mutate(fd, {
      onSuccess: () => {
        router.push("/dashboard/tutor/pending");
      },
      onError: () => {
        alert("خطای ۵۰۰: مشکل در سمت سرور رخ داده است.");
      },
    });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-slate-900 px-8 py-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl mx-auto flex items-center justify-center mb-5 backdrop-blur-sm border border-blue-500/30">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            تکمیل پروفایل استادی
          </h1>

          <div className="flex justify-center items-center gap-4 mt-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 ${step >= num ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30" : "bg-slate-700 text-slate-400"}`}
                >
                  {num}
                </div>
                {num !== 3 && (
                  <div
                    className={`w-12 h-1 rounded-full transition-all duration-500 ${step > num ? "bg-blue-500" : "bg-slate-700"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 sm:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-8">
                <UserCircle size={24} className="text-blue-600" /> اطلاعات پایه
                و تماس
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-black text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                    <Phone size={14} /> شماره تماس فعال
                  </label>
                  <input
                    {...register("phone_number", { required: true })}
                    dir="ltr"
                    placeholder="+98 912 000 0000"
                    className="w-full p-4 border border-slate-200 bg-slate-50 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-black text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                    <MapPin size={14} /> کشور محل سکونت
                  </label>
                  <input
                    {...register("country", { required: true })}
                    placeholder="مثال: ایران"
                    className="w-full p-4 border border-slate-200 bg-slate-50 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-black text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                  تصویر پروفایل رسمی
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("profile_picture", { required: true })}
                    className="w-full p-3.5 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-blue-600 cursor-pointer transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <Step2Specialties register={register} control={control} />
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <Step3BioVideo register={register} watch={watch} />
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all disabled:opacity-0"
            >
              <ArrowRight size={18} /> مرحله قبل
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-blue-600 shadow-xl shadow-slate-900/10 transition-all"
              >
                مرحله بعد <ArrowLeft size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={createProfile.isPending}
                className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all disabled:bg-slate-300 disabled:shadow-none"
              >
                ارسال نهایی اطلاعات
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
