"use client";

import { User, BookOpen, CreditCard, FileText, LayoutDashboard, LogOut } from "lucide-react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

interface StudentSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function StudentSidebar({ activeTab, setActiveTab }: StudentSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/login");
    } catch (error) {
      alert("خطا در خروج از سیستم");
    }
  };

  const menuItems = [
    { id: "overview", label: "داشبورد", icon: LayoutDashboard },
    { id: "profile", label: "پروفایل من", icon: User },
    { id: "courses", label: "دوره‌های من", icon: BookOpen },
    { id: "payments", label: "وضعیت پرداخت‌ها", icon: CreditCard },
    { id: "homeworks", label: "تکالیف ثبت‌شده", icon: FileText },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white/80 backdrop-blur-xl border-l border-slate-200 p-6 flex flex-col justify-between h-auto lg:min-h-screen sticky top-0 z-20">
      <div>
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LangPath</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">پنل کاربری دانش‌آموز</p>
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
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 translate-x-1"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
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
        className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 mt-8 lg:mt-0"
      >
        <LogOut size={20} strokeWidth={2} />
        خروج از حساب
      </button>
    </aside>
  );
}