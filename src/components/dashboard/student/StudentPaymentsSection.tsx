"use client";

import { useStudentEnrollments } from "@/hooks/useStudent";

export default function StudentPaymentsSection() {
  const { data: enrollments, isLoading, isError } = useStudentEnrollments();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !enrollments) {
    return (
      <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center">
        خطا در بارگذاری اطلاعات پرداخت‌ها
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-xs font-bold">
              <th className="p-4">شناسه</th>
              <th className="p-4">مبلغ پرداختی</th>
              <th className="p-4">واحد ارز</th>
              <th className="p-4">وضعیت بررسی مالی</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-800">
            <tr className="hover:bg-gray-50/30 transition-colors">
              <td className="p-4 text-gray-500">#{enrollments.id}</td>
              <td className="p-4 font-mono">{enrollments.payment_amount || "۰"}</td>
              <td className="p-4">{enrollments.currency}</td>
              <td className="p-4">
                <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold ${
                  enrollments.status === "approved"
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : enrollments.status === "rejected"
                    ? "bg-red-50 text-red-700 border border-red-100"
                    : "bg-amber-50 text-amber-700 border border-amber-100"
                }`}>
                  {enrollments.status === "approved" && "تایید شده"}
                  {enrollments.status === "rejected" && "رد شده"}
                  {enrollments.status !== "approved" && enrollments.status !== "rejected" && "در انتظار بررسی ادمین"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}