"use client";

import { LayoutDashboard, BookOpen, GraduationCap, Briefcase, Award, User, LogOut } from "lucide-react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

interface TutorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TutorSidebar({ activeTab, setActiveTab }: TutorSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  const menuItems = [
    { id: "overview", label: "خلاصه وضعیت", icon: LayoutDashboard },
    { id: "profile", label: "پروفایل من", icon: User },
    { id: "courses", label: "مدیریت دوره‌ها", icon: BookOpen },
    { id: "educations", label: "سوابق تحصیلی", icon: GraduationCap },
    { id: "experiences", label: "سوابق کاری", icon: Briefcase },
    { id: "certificates", label: "گواهینامه‌ها", icon: Award },
  ];

  return (
    <aside className="w-full lg:w-72 bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between h-auto lg:min-h-screen sticky top-0 z-20">
      <div>
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">LangPath</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">پنل مدیریت اساتید</p>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 mt-8 lg:mt-0"
      >
        <LogOut size={20} strokeWidth={2} />
        خروج از حساب کاربری
      </button>
    </aside>
  );
}