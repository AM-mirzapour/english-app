"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 text-center lg:text-right animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-black rounded-xl border border-blue-100">
          <ShieldCheck size={14} />
          سامانه هوشمند آموزش زبان انگلیسی
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight sm:leading-none">
          مسیر حرفه‌ای <span className="text-blue-600">یادگیری زبان</span> از همین‌جا آغاز می‌شود
        </h1>
        <p className="text-base font-medium text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
          دسترسی به برترین اساتید بین‌المللی، کلاس‌های تعاملی آنلاین و پلتفرم هوشمند مدیریت تکالیف و دوره‌ها؛ همه در یک پلتفرم یکپارچه.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
          <Link href="/register" className="px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all duration-300 group">
            شروع یادگیری به عنوان دانش‌آموز
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-left-4 duration-700">
        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40 hover:shadow-md transition-all">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <GraduationCap size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-black text-slate-800 text-base">اساتید مجرب</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">امکان تدریس و ثبت رزومه سوابق برای مدرسین</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40 hover:shadow-md transition-all">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <BookOpen size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-black text-slate-800 text-base">دوره‌های متنوع</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">پوشش کامل سطوح آموزشی از مبتدی تا پیشرفته</p>
          </div>
        </div>
      </div>
    </section>
  );
}