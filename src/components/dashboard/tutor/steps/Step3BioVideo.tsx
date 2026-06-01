"use client";

import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { Video } from "lucide-react";

interface Step3Props {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

export default function Step3BioVideo({ register, watch }: Step3Props) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <Video size={20} className="text-blue-600" /> معرفی و بیوگرافی
      </h3>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">درباره شما (بیوگرافی کوتاه)</label>
        <textarea
          {...register("bio")}
          rows={3}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white text-slate-900 text-sm resize-none"
          placeholder="خودتان را در چند جمله کوتاه معرفی کنید..."
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">توضیحات جامع تدریس</label>
        <textarea
          {...register("description")}
          rows={5}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white text-slate-900 text-sm resize-none"
          placeholder="سوابق، روش کار و تجربیات خود را به طور کامل بنویسید..."
        />
      </div>

      <div className="pt-2">
        <label className="block text-sm font-bold text-slate-700 mb-2">ویدیوی معرفی (اختیاری)</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              <Video className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500 font-medium">آپلود فایل ویدیویی معرفی کوتاه</p>
              <p className="text-xs text-slate-400 mt-1">حداکثر حجم پیشنهادی: ۵۰ مگابایت</p>
            </div>
            <input type="file" className="hidden" accept="video/*" {...register("intro_video_file")} />
          </label>
        </div>
        {watch("intro_video_file")?.[0] && (
          <p className="text-xs text-green-600 mt-2 font-bold">
            ویدیو انتخاب شد: {watch("intro_video_file")[0].name}
          </p>
        )}
      </div>
    </div>
  );
}