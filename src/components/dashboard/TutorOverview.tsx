"use client";

import { Users, BookOpen, Star, TrendingUp } from "lucide-react";

interface TutorOverviewProps {
  dashboardData: any;
}

export default function TutorOverview({ dashboardData }: TutorOverviewProps) {
  const stats = [
    {
      title: "دوره‌های فعال",
      value: dashboardData?.courses?.length || "۰",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
      trend: "+۲ دوره جدید",
    },
    {
      title: "دانش‌آموزان من",
      value: "۲۴",
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      trend: "+۵ نفر این ماه",
    },
    {
      title: "میانگین امتیازات",
      value: "۴.۸ / ۵",
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-100",
      trend: "بر اساس ۱۲ نظر",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group relative overflow-hidden"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform duration-500`}
            ></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}
              >
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                <TrendingUp size={14} />
                {stat.trend}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-slate-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-bold text-slate-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-800 mb-5">
            تخصص‌های ثبت‌شده شما
          </h3>
          <div className="flex flex-wrap gap-2">
            {dashboardData?.subjects?.map((subject: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-bold rounded-xl border border-slate-200"
              >
                {subject}
              </span>
            ))}
            {(!dashboardData?.subjects ||
              dashboardData.subjects.length === 0) && (
              <p className="text-sm text-slate-500">تخصصی ثبت نشده است.</p>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-800 mb-5">
            زبان‌های آموزشی
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-2xl border border-blue-100/50">
              <span className="font-bold text-slate-700 text-sm">
                زبان انگلیسی
              </span>
              <span className="text-xs font-black text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">
                Native
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
