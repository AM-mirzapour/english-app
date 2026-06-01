"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAvailableCourses, useCreateEnrollment } from "@/hooks/useStudent";
import {
  BookOpen,
  CreditCard,
  Search,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function AvailableCoursesSection() {
  const { data, isLoading } = useAvailableCourses();
  const createEnrollment = useCreateEnrollment();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const courses = Array.isArray(data) ? data : data?.results || [];

  useEffect(() => {
    if (courses.length > 0) {
      const pendingCourseId = localStorage.getItem("pendingCourseId");
      if (pendingCourseId) {
        const targetCourse = courses.find(
          (c: any) => String(c.id) === pendingCourseId,
        );
        if (targetCourse) {
          setSelectedCourse(targetCourse);
          localStorage.removeItem("pendingCourseId");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  }, [courses]);

  if (isLoading) {
    return (
      <div className="p-10 flex justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const onSubmit = (formData: any) => {
    if (!selectedCourse) return;

    const fd = new FormData();
    fd.append("course", String(selectedCourse.id));
    fd.append("payment_amount", String(formData.payment_amount));
    fd.append("currency", formData.currency);

    if (formData.payment_note) {
      fd.append("payment_note", formData.payment_note);
    }

    if (formData.payment_proof && formData.payment_proof.length > 0) {
      fd.append("payment_proof", formData.payment_proof[0]);
    }

    createEnrollment.mutate(fd, {
      onSuccess: () => {
        setSelectedCourse(null);
        reset();
        alert(
          "درخواست ثبت‌نام شما با موفقیت ارسال شد و پس از تایید مدیریت فعال می‌شود.",
        );
      },
      onError: (err: any) => {
        alert(
          JSON.stringify(err.response?.data) || "خطا در ارسال درخواست به سرور",
        );
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <Search className="text-slate-400" size={20} />
        <input
          type="text"
          placeholder="جستجو در دوره‌های فعال..."
          className="flex-1 bg-transparent text-sm outline-none font-medium text-slate-700"
        />
      </div>

      {selectedCourse && (
        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                <CreditCard className="text-blue-400" />
                تکمیل ثبت‌نام در دوره{" "}
                {selectedCourse.title || selectedCourse.course_title}
              </h3>
              <p className="text-xs font-medium text-slate-400 mt-1">
                لطفاً اطلاعات فیش واریزی خود را در این بخش وارد کنید.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCourse(null);
                reset();
              }}
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800 px-3 py-1.5 rounded-xl"
            >
              انصراف
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-300 mb-2 px-1">
                  مبلغ واریزی (الزامی)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("payment_amount", {
                    required: "وارد کردن مبلغ واریزی الزامی است",
                  })}
                  className={`p-4 bg-slate-800 border ${errors.payment_amount ? "border-red-500" : "border-slate-700"} rounded-xl text-sm outline-none focus:border-blue-500 text-white`}
                />
                {errors.payment_amount && (
                  <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />{" "}
                    {String(errors.payment_amount.message)}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-300 mb-2 px-1">
                  واحد ارز (الزامی)
                </label>
                <select
                  {...register("currency", {
                    required: "انتخاب واحد ارز الزامی است",
                  })}
                  className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 text-white"
                >
                  <option value="TOMAN">تومان</option>
                  <option value="USD">دلار</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-slate-300 mb-2 px-1">
                  بارگذاری تصویر فیش یا رسید پرداخت (الزامی)
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  {...register("payment_proof", {
                    required: "آپلود رسید پرداخت الزامی است",
                  })}
                  className={`p-3 border ${errors.payment_proof ? "border-red-500" : "border-slate-700"} bg-slate-800 rounded-xl text-sm text-slate-300 file:ml-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer`}
                />
                {errors.payment_proof && (
                  <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />{" "}
                    {String(errors.payment_proof.message)}
                  </span>
                )}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-slate-300 mb-2 px-1">
                  توضیحات پرداخت (اختیاری)
                </label>
                <textarea
                  {...register("payment_note")}
                  className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 text-white h-20 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={createEnrollment.isPending}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-500 transition-colors disabled:bg-slate-700 disabled:text-slate-500"
            >
              {createEnrollment.isPending
                ? "در حال پردازش و ارسال..."
                : "تایید و ارسال رسید ثبت‌نام"}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6 flex-1">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={20} />
              </div>
              <h4 className="font-black text-slate-800 text-lg leading-snug">
                {course.title || course.course_title}
              </h4>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
              <div className="flex gap-2 mt-4">
                <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                  {course.language}
                </span>
                <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2.5 py-1 rounded-lg">
                  {course.level}
                </span>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">
                  شهریه دوره
                </span>
                <span className="text-sm font-black text-slate-800">
                  {course.price_per_toman || course.price_per_hour}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedCourse(course);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-1"
              >
                ثبت‌نام و پرداخت
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
