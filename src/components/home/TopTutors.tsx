"use client";

import { Users } from "lucide-react";
import { useTutors } from "@/hooks/usePublic";

export default function TopTutors() {
  const { data: tutorsData, isLoading } = useTutors();
  const tutors = Array.isArray(tutorsData) ? tutorsData : tutorsData?.results || [];

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-slate-800">اساتید برتر مجموعه</h2>
          <p className="text-sm text-slate-500 font-medium mt-2">با مدرسین حرفه‌ای ما آشنا شوید</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutors.slice(0, 4).map((tutor: any) => (
              <div key={tutor.id} className="bg-white p-6 rounded-3xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 overflow-hidden mb-4 flex items-center justify-center border-4 border-white shadow-sm">
                  {tutor.profile_picture ? (
                    <img src={tutor.profile_picture} alt="tutor" className="w-full h-full object-cover" />
                  ) : (
                    <Users size={28} className="text-slate-400" />
                  )}
                </div>
                <h3 className="font-black text-slate-800">
                  {tutor.user?.first_name} {tutor.user?.last_name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-2 line-clamp-2">{tutor.bio || "مدرس مجرب زبان‌های خارجی"}</p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                  {tutor.subjects?.map((sub: string, idx: number) => (
                    <span key={idx} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{sub}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}