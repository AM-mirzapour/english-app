"use client";

import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import { UserCircle, UploadCloud } from "lucide-react";

interface Step1Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
}

export default function Step1PersonalInfo({ register, errors, watch }: Step1Props) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <UserCircle size={20} className="text-blue-600" /> اطلاعات پایه‌ای
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField
          label="نام"
          {...register("first_name", { required: "نام الزامی است" })}
          error={errors.first_name?.message as string}
        />
        <InputField
          label="نام خانوادگی"
          {...register("last_name", { required: "نام خانوادگی الزامی است" })}
          error={errors.last_name?.message as string}
        />
        <InputField
          label="شماره موبایل"
          type="tel"
          {...register("phone_number", { required: "شماره تماس الزامی است" })}
          error={errors.phone_number?.message as string}
          className="text-left"
          dir="ltr"
        />
        <InputField label="کشور محل سکونت" {...register("country")} />
      </div>

      <div className="pt-4">
        <label className="block text-sm font-bold text-slate-700 mb-2">تصویر پروفایل</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500 font-medium">برای آپلود عکس کلیک کنید</p>
            </div>
            <input type="file" className="hidden" accept="image/*" {...register("profile_picture")} />
          </label>
        </div>
        {watch("profile_picture")?.[0] && (
          <p className="text-xs text-green-600 mt-2 font-bold">
            عکس انتخاب شد: {watch("profile_picture")[0].name}
          </p>
        )}
      </div>
    </div>
  );
}