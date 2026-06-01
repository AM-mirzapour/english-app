"use client";

import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useTutorCourses, useAddCourse } from "@/hooks/useTutor";
import { BookOpen } from "lucide-react";

export default function TutorCoursesSection({ tutorId }: { tutorId: number }) {
  const { data: coursesData, isLoading } = useTutorCourses();
  const addCourse = useAddCourse();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const courses = Array.isArray(coursesData)
    ? coursesData
    : coursesData?.results || [];

  if (isLoading)
    return (
      <div className="p-10 text-center font-bold text-slate-500">
        در حال بارگذاری...
      </div>
    );

  const onSubmit = (data: any) => {
    if (!tutorId) return alert("خطای سیستم: آیدی استاد دریافت نشد.");

    const payload = {
      course_title: data.course_title,
      course_type: data.course_type,
      duration_minutes: Number(data.duration_minutes),
      price_per_hour: String(data.price_per_hour),
      language: data.language,
      lesson_package: data.lesson_package,
      start_date: data.start_date,
      description: data.description,
      tutor: tutorId,
      days_available: data.days_available ? [data.days_available] : [],
      time_slots:
        data.start_time && data.end_time
          ? [`${data.start_time} - ${data.end_time}`]
          : [],
    };

    addCourse.mutate(payload, {
      onSuccess: () => {
        alert("دوره با موفقیت ثبت شد!");
        reset();
        queryClient.invalidateQueries({ queryKey: ["tutorCourses"] });
      },
      onError: (err: any) => {
        const errorData = err.response?.data;
        if (typeof errorData === "object" && errorData !== null) {
          const errorMessages = Object.entries(errorData)
            .map(([field, msgs]) => `• ${field}: ${msgs}`)
            .join("\n");
          alert(`داده‌های شما رد شد:\n\n${errorMessages}`);
        } else {
          alert("خطا در برقراری ارتباط با سرور");
        }
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            عنوان دوره
          </label>
          <input
            {...register("course_title", { required: true })}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            نوع برگزاری
          </label>
          <select
            {...register("course_type", { required: true })}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 bg-white"
          >
            <option value="online">آنلاین (Online)</option>
            <option value="offline">آفلاین (Offline)</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            مدت زمان هر جلسه (دقیقه)
          </label>
          <input
            type="number"
            {...register("duration_minutes", { required: true })}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            قیمت هر ساعت تدریس
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price_per_hour", { required: true })}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            زبان آموزشی
          </label>
          <input
            {...register("language", { required: true })}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            بسته آموزشی (سطح)
          </label>
          <input
            {...register("lesson_package", { required: true })}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            زمان‌بندی کلاس (تاریخ، روز و ساعت)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">
                تاریخ شروع
              </label>
              <input
                type="date"
                {...register("start_date", { required: true })}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">
                روزهای برگزاری
              </label>
              <select
                {...register("days_available")}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:border-blue-500"
              >
                <option value="شنبه و چهارشنبه">شنبه و چهارشنبه</option>
                <option value="یکشنبه و سه‌شنبه">یکشنبه و سه‌شنبه</option>
                <option value="دوشنبه و پنجشنبه">دوشنبه و پنجشنبه</option>
                <option value="ایام هفته">طول هفته (هر روز)</option>
                <option value="آخر هفته">آخر هفته</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">
                ساعت شروع
              </label>
              <input
                type="time"
                {...register("start_time")}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">
                ساعت پایان
              </label>
              <input
                type="time"
                {...register("end_time")}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-xs font-bold text-slate-500 mb-2 px-1">
            توضیحات و سرفصل‌ها
          </label>
          <textarea
            {...register("description", { required: true })}
            className="p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 h-24 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={addCourse.isPending}
          className="md:col-span-2 py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-colors disabled:bg-slate-300"
        >
          {addCourse.isPending
            ? "در حال ثبت اطلاعات..."
            : "ثبت دوره آموزشی جدید"}
        </button>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses?.map((course: any) => (
          <div
            key={course.id}
            className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-5 hover:shadow-md transition-shadow"
          >
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-lg">
                {course.course_title}
              </h4>
              <p className="text-sm font-bold text-blue-600 mt-1">
                {course.price_per_hour}{" "}
                {course.course_type === "online" ? "(آنلاین)" : "(آفلاین)"}
              </p>
              <p className="text-xs font-bold text-slate-500 mt-2">
                شروع: {course.start_date}
              </p>
              <p className="text-xs font-medium text-slate-400 mt-1 line-clamp-2">
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
