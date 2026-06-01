"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";

export default function MyEnrollmentsSection() {
  const { data: enrollments, isLoading } = useMyEnrollments();

  if (isLoading)
    return (
      <div className="p-10 text-center font-bold text-slate-500">
        در حال دریافت اطلاعات...
      </div>
    );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
            <CheckCircle2 size={14} /> تایید شده
          </span>
        );
      case "under_review":
      case "pending_payment":
        return (
          <span className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
            <Clock size={14} /> در حال بررسی
          </span>
        );
      case "rejected":
      case "cancelled":
        return (
          <span className="flex items-center gap-1 text-xs font-black text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
            <XCircle size={14} /> رد شده
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs font-black text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-4">
        {(!enrollments || enrollments.length === 0) && (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100">
            <p className="text-sm font-medium text-slate-500">
              شما هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید.
            </p>
          </div>
        )}

        {Array.isArray(enrollments)
          ? enrollments.map((enrollment: any) => (
              <div
                key={enrollment.id}
                className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-black text-slate-800 text-base">
                    {enrollment.course?.title ||
                      enrollment.course?.course_title ||
                      "دوره آموزشی"}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 mt-1">
                    تاریخ درخواست:{" "}
                    {new Date(enrollment.submitted_at).toLocaleDateString(
                      "fa-IR",
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-slate-600">
                    {enrollment.payment_amount} {enrollment.currency}
                  </span>
                  {getStatusBadge(enrollment.status)}
                </div>
              </div>
            ))
          : enrollments && (
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-slate-800 text-base">
                    {enrollments.course?.title || "دوره آموزشی"}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 mt-1">
                    تاریخ درخواست:{" "}
                    {new Date(enrollments.submitted_at).toLocaleDateString(
                      "fa-IR",
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(enrollments.status)}
                </div>
              </div>
            )}
      </div>
    </div>
  );
}
