"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStudentDashboard } from "@/hooks/useStudent";
import StudentSidebar from "@/components/dashboard/student/StudentSidebar";
import StudentOverview from "@/components/dashboard/student/StudentOverview";
import AvailableCoursesSection from "@/components/dashboard/student/AvailableCoursesSection";
import MyEnrollmentsSection from "@/components/dashboard/student/MyEnrollmentsSection";
import StudentHomeworksSection from "@/components/dashboard/student/StudentHomeworksSection";
import StudentProfileSection from "@/components/dashboard/student/StudentProfileSection";

export default function StudentDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const { data: dashboardData, isLoading, error } = useStudentDashboard();

  useEffect(() => {
    if (error) {
      const errResponse = (error as any).response;
      if (errResponse?.status === 401) {
        router.push("/login");
      }
    }
  }, [error, router]);

  useEffect(() => {
    const pendingCourseId = localStorage.getItem("pendingCourseId");
    if (pendingCourseId) {
      setActiveTab("courses");
    }
  }, []);

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

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <StudentOverview dashboardData={dashboardData} />;
      case "courses":
        return <AvailableCoursesSection />;
      case "enrollments":
        return <MyEnrollmentsSection />;
      case "homeworks":
        return <StudentHomeworksSection />;
      case "profile":
        return <StudentProfileSection />;
      default:
        return <StudentOverview dashboardData={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
