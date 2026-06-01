"use client";

import { Activity, BookOpen, Star, AlertCircle } from "lucide-react";

interface StudentOverviewProps {
  dashboardData: any;
}

export default function StudentOverview({ dashboardData }: StudentOverviewProps) {
  const stats = [
    {
      title: "وضعیت حساب کاربری",
      value: dashboardData.student_active ? "فعال" : "غیرفعال",
      icon: Activity,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "دوره‌های در حال یادگیری",
      value: `${dashboardData.courses_list?.length || 0} دوره`,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "تعداد اساتید منتخب",
      value: `${dashboardData.favourite_tutors?.length || 0} مدرس`,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-100",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow duration-300 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon size={26} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.title}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-gradient-to-br from-white to-slate-50/50 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-2">آخرین وضعیت تکالیف</h3>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              {dashboardData.student_homework_completed 
                ? "عالی است! تمامی تکالیف محول شده با موفقیت ارسال و ثبت شده‌اند." 
                : "شما تکالیف بررسی‌نشده یا معوقه دارید. لطفاً در اسرع وقت نسبت به انجام آن‌ها اقدام کنید."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}