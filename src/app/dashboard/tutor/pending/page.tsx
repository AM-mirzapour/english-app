"use client";

import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <Clock size={40} strokeWidth={2.5} />
          <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <CheckCircle2 size={20} className="text-green-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-slate-800 mb-3">در انتظار بررسی مدیریت</h2>
        <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
          پروفایل و مدارک شما با موفقیت ثبت شد. تیم پشتیبانی ما در حال بررسی اطلاعات شماست. نتیجه بررسی طی ۲۴ الی ۴۸ ساعت آینده از طریق ایمیل به شما اطلاع داده خواهد شد.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all duration-300"
        >
          بازگشت به صفحه اصلی
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}