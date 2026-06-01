"use client";

import { useStudentHomeworks } from "@/hooks/useStudent";
import { FileText, Calendar, Download } from "lucide-react";

export default function StudentHomeworksSection() {
  const { data, isLoading } = useStudentHomeworks();
  const homeworks = Array.isArray(data) ? data : data?.results || [];

  if (isLoading) return <div className="p-10 text-center font-bold text-slate-500">در حال دریافت تکالیف...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {homeworks.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <FileText className="mx-auto text-slate-300 mb-4" size={48} />
          <p className="text-sm font-bold text-slate-500">تکلیف جدیدی برای شما ثبت نشده است.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeworks.map((homework: any) => (
          <div key={homework.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-6 flex-1">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5">
                <FileText size={24} />
              </div>
              <h4 className="font-black text-slate-800 text-lg leading-snug">{homework.title}</h4>
              <div className="flex items-center gap-2 mt-4 text-slate-500">
                <Calendar size={16} />
                <span className="text-xs font-bold">مهلت تحویل: {new Date(homework.due_date).toLocaleDateString("fa-IR")}</span>
              </div>
            </div>
            
            <div className="p-5 bg-slate-50 border-t border-slate-100">
              {homework.document ? (
                <a 
                  href={homework.document} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white text-sm font-black rounded-xl hover:bg-indigo-600 transition-colors"
                >
                  <Download size={18} />
                  دانلود فایل تکلیف
                </a>
              ) : (
                <div className="w-full text-center py-3 bg-slate-200 text-slate-500 text-sm font-bold rounded-xl cursor-not-allowed">
                  فایلی پیوست نشده است
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}