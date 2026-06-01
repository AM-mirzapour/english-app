import { BookOpen, GraduationCap } from "lucide-react";

interface RoleSelectorProps {
  isTeacher: boolean;
  onChange: (value: boolean) => void;
}

export default function RoleSelector({ isTeacher, onChange }: RoleSelectorProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <label className="block text-sm font-semibold text-gray-700">
        نقش خود را انتخاب کنید
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => onChange(false)}
          className={`cursor-pointer flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 ${
            !isTeacher
              ? "border-blue-600 bg-blue-50/50 shadow-sm"
              : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50/30"
          }`}
        >
          <BookOpen size={28} className={!isTeacher ? "text-blue-600" : "text-gray-400"} />
          <span className={`mt-3 text-sm font-bold ${!isTeacher ? "text-blue-700" : "text-gray-700"}`}>
            دانش‌آموز
          </span>
        </div>

        <div
          onClick={() => onChange(true)}
          className={`cursor-pointer flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 ${
            isTeacher
              ? "border-blue-600 bg-blue-50/50 shadow-sm"
              : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50/30"
          }`}
        >
          <GraduationCap size={28} className={isTeacher ? "text-blue-600" : "text-gray-400"} />
          <span className={`mt-3 text-sm font-bold ${isTeacher ? "text-blue-700" : "text-gray-700"}`}>
            استاد
          </span>
        </div>
      </div>
    </div>
  );
}