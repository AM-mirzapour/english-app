"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tutorService } from "@/services/tutorService";

export default function TutorProfileSection({
  dashboardData,
  tutorId,
}: {
  dashboardData: any;
  tutorId: number;
}) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      phone_number: dashboardData?.phone_number || "",
      country: dashboardData?.country || "",
      bio: dashboardData?.bio || "",
      description: dashboardData?.description || "",
      teaching_style: dashboardData?.teaching_style || "",
      expectation: dashboardData?.expectation || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (fd: FormData) => tutorService.updateProfile(tutorId, fd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorDashboard"] });
      alert("اطلاعات پروفایل با موفقیت بروزرسانی شد");
    },
    onError: (error: any) => {
      alert(JSON.stringify(error.response?.data) || "خطا در ویرایش پروفایل");
    },
  });

  const onSubmit = (data: any) => {
    if (!tutorId) {
      alert("خطای سیستم: آیدی استاد دریافت نشد. لطفا صفحه را رفرش کنید.");
      return;
    }

    const fd = new FormData();
    const textFields = [
      "phone_number",
      "country",
      "bio",
      "description",
      "teaching_style",
      "expectation",
    ];

    textFields.forEach((field) => {
      if (
        data[field] !== undefined &&
        data[field] !== null &&
        data[field] !== ""
      ) {
        fd.append(field, data[field]);
      }
    });

    if (data.profile_picture && data.profile_picture.length > 0) {
      fd.append("profile_picture", data.profile_picture[0]);
    }

    mutation.mutate(fd);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 max-w-3xl animate-in fade-in duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            شماره تماس
          </label>
          <input
            {...register("phone_number")}
            dir="ltr"
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            کشور
          </label>
          <input
            {...register("country")}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            سبک تدریس
          </label>
          <input
            {...register("teaching_style")}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            انتظارات از زبان‌آموز
          </label>
          <input
            {...register("expectation")}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-500 mb-2 px-1">
          بیوگرافی کوتاه
        </label>
        <textarea
          {...register("bio")}
          className="w-full p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 h-24 resize-none"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-500 mb-2 px-1">
          توضیحات جامع تدریس
        </label>
        <textarea
          {...register("description")}
          className="w-full p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 h-32 resize-none"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-bold text-slate-500 mb-2 px-1">
          تغییر تصویر پروفایل
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("profile_picture")}
          className="p-3 border border-slate-200 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-blue-600 transition-colors disabled:bg-slate-300"
      >
        {mutation.isPending ? "در حال پردازش..." : "ذخیره تغییرات پروفایل"}
      </button>
    </form>
  );
}
