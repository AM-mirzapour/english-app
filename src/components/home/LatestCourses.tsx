"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowLeft } from "lucide-react";
import { useCourses } from "@/hooks/usePublic";

export default function LatestCourses() {
  const router = useRouter();
  const { data: coursesData, isLoading } = useCourses();
  const courses = Array.isArray(coursesData)
    ? coursesData
    : coursesData?.results || [];

  const handleCourseEnroll = (courseId: number) => {
    localStorage.setItem("pendingCourseId", String(courseId));
    router.push("/dashboard/student");
  };

  return (
    <section className="bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              جدیدترین دوره‌های آموزشی
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              یادگیری را با برترین دوره‌ها آغاز کنید
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white text-sm font-bold rounded-xl transition-all duration-300 group shadow-sm"
          >
            مشاهده همه{" "}
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course: any) => (
              <div
                key={course.id}
                className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-slate-200 flex items-center justify-center">
                    <BookOpen size={32} className="text-slate-400" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                      {course.language}
                    </span>
                    <span className="text-[10px] font-black bg-slate-200 text-slate-600 px-2 py-1 rounded-lg">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-800 text-lg">
                    {course.title || course.course_title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-2 line-clamp-2 leading-relaxed flex-1">
                    {course.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-sm font-black text-slate-800">
                      {course.price_per_toman || course.price_per_hour}
                    </span>
                    <button
                      onClick={() => handleCourseEnroll(course.id)}
                      className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      ثبت‌نام در دوره
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
