"use client";

import { PlayCircle, Clock, BookOpen } from "lucide-react";

interface StudentCoursesSectionProps {
  dashboardData: any;
}

export default function StudentCoursesSection({ dashboardData }: StudentCoursesSectionProps) {
  const courses = dashboardData.courses_list || [];

  if (courses.length === 0) {
    return (
      <div className="p-12 bg-white rounded-3xl shadow-sm border border-slate-100 text-center animate-in fade-in duration-500 flex flex-col items-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
          <BookOpen size={40} />
        </div>
        <h3 className="text-lg font-bold text-slate-700">هیچ دوره‌ای یافت نشد</h3>
        <p className="text-sm text-slate-500 mt-2">شما هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {courses.map((courseId: number) => (
        <div key={courseId} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group flex flex-col">
          <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-indigo-100 relative">
            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-black px-3 py-1.5 rounded-lg shadow-sm">
              دوره فعال
            </span>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="font-black text-slate-800 text-lg leading-tight">شناسه کلاسی دوره: {courseId}</h4>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-3 font-semibold">
                <Clock size={14} />
                <span>سطح آموزشی: در انتظار تایید</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
              <PlayCircle size={18} />
              شروع یادگیری
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}