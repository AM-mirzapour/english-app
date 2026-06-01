"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTutorDashboard } from "@/hooks/useTutor";
import TutorSidebar from "@/components/dashboard/tutor/TutorSidebar";
import TutorOverview from "@/components/dashboard/TutorOverview";
import TutorProfileSection from "@/components/dashboard/tutor/TutorProfileSection";
import TutorCoursesSection from "@/components/dashboard/tutor/TutorCoursesSection";
import TutorEducationsSection from "@/components/dashboard/tutor/TutorEducationsSection";
import TutorExperiencesSection from "@/components/dashboard/tutor/TutorExperiencesSection";
import TutorCertificatesSection from "@/components/dashboard/tutor/TutorCertificatesSection";

export default function TutorDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const { data: dashboardData, isLoading, error } = useTutorDashboard();

  useEffect(() => {
    if (error) {
      const errResponse = (error as any).response;
      if (errResponse?.status === 404) {
        router.push("/dashboard/tutor/setup");
      } else if (errResponse?.status === 401) {
        router.push("/login");
      }
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return null;
  }

  const extractTutorData = (data: any) => {
    if (!data) return null;
    if (Array.isArray(data)) return data[0];
    if (data.data) return data.data;
    if (data.tutor) return data.tutor;
    return data;
  };

  const actualTutorData = extractTutorData(dashboardData);
  const tutorId = actualTutorData?.id;

  const renderContent = () => {
    switch (activeTab) {
      case "overview": 
        return <TutorOverview dashboardData={actualTutorData} />;
      case "profile": 
        return <TutorProfileSection dashboardData={actualTutorData} tutorId={tutorId} />;
      case "courses": 
        return <TutorCoursesSection tutorId={tutorId} />;
      case "educations": 
        return <TutorEducationsSection tutorId={tutorId} />;
      case "experiences": 
        return <TutorExperiencesSection tutorId={tutorId} />;
      case "certificates": 
        return <TutorCertificatesSection tutorId={tutorId} />;
      default: 
        return <TutorOverview dashboardData={actualTutorData} />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview": return "خلاصه وضعیت";
      case "profile": return "پروفایل من";
      case "courses": return "مدیریت دوره‌ها";
      case "educations": return "سوابق تحصیلی";
      case "experiences": return "سوابق کاری";
      case "certificates": return "گواهینامه‌ها";
      default: return "داشبورد استاد";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <TutorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            {getPageTitle()}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-2">
            پنل اختصاصی مدیریت آموزش
          </p>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}