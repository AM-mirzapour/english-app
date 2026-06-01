"use client";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          LangPath
        </span>
        <p className="text-xs font-bold text-slate-400">
          حقوق مادی و معنوی این پلتفرم محفوظ می‌باشد.
        </p>
      </div>
    </footer>
  );
}