"use client";

import Link from "next/link";
import { useCourses } from "@/hooks/usePublic";
import { BookOpen, Clock, Globe, User, ArrowRight, ChevronRight } from "lucide-react";

export default function CoursesPage() {
  const { data: courses, isLoading, isError } = useCourses();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="bg-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-bold">
            <ArrowRight size={16} /> بازگشت به خانه
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">کشف دوره‌های <span className="text-blue-500">آموزشی</span></h1>
          <p className="text-slate-400 max-w-xl leading-relaxed font-medium">
            با برترین اساتید زبان همراه شوید و مهارت‌های خود را در زبان‌های مختلف به سطح بعدی ارتقا دهید.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 animate-pulse">
                <div className="w-full h-48 bg-slate-200 rounded-3xl mb-4"></div>
                <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded-full w-1/2 mb-6"></div>
                <div className="flex gap-2 mb-6">
                  <div className="h-8 bg-slate-200 rounded-xl w-1/3"></div>
                  <div className="h-8 bg-slate-200 rounded-xl w-1/3"></div>
                </div>
                <div className="h-12 bg-slate-200 rounded-2xl w-full"></div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-red-50 text-red-500 p-6 rounded-2xl text-center font-bold">
            خطا در دریافت لیست دوره‌ها. لطفاً اتصال اینترنت خود را بررسی کنید.
          </div>
        )}

        {!isLoading && !isError && courses && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any) => (
              <div key={course.id} className="bg-white rounded-[2rem] p-4 shadow-lg shadow-slate-200/40 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                <div className="relative w-full h-48 rounded-3xl overflow-hidden mb-6 bg-slate-100 shrink-0">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <BookOpen size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-black text-slate-700 flex items-center gap-1.5 shadow-sm">
                    <Globe size={14} className="text-blue-500" /> {course.language}
                  </div>
                </div>
                
                <div className="px-2 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-slate-800 mb-2 line-clamp-1">{course.title}</h3>
                  <p className="text-sm font-medium text-slate-500 mb-6 line-clamp-2">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      <User size={14} /> {course.tutor?.user_first_name} {course.tutor?.user_last_name}
                    </span>
                    <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      <Clock size={14} /> {course.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400">هزینه دوره</span>
                      <span className="text-lg font-black text-slate-900">
                        {Number(course.price_per_toman).toLocaleString()} <span className="text-xs font-medium text-slate-500">تومان</span>
                      </span>
                    </div>
                    <button className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}