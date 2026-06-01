"use client";

import Link from "next/link";
import { useBlogs } from "@/hooks/usePublic";
import {
  ArrowRight,
  Calendar,
  User,
  FileText,
  ChevronRight,
} from "lucide-react";

export default function BlogPage() {
  const { data: blogs, isLoading, isError } = useBlogs();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="bg-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-bold"
          >
            <ArrowRight size={16} /> بازگشت به خانه
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            مجلات و <span className="text-indigo-400">مقالات آموزشی</span>
          </h1>
          <p className="text-slate-400 max-w-xl leading-relaxed font-medium">
            جدیدترین متدهای یادگیری زبان و اخبار آموزشی را در مجله LangPath
            دنبال کنید.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 animate-pulse"
              >
                <div className="w-full h-56 bg-slate-200 rounded-3xl mb-6"></div>
                <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded-full w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded-full w-2/3 mb-6"></div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-red-50 text-red-500 p-6 rounded-2xl text-center font-bold">
            مشکلی در دریافت مقالات پیش آمد.
          </div>
        )}
        {!isLoading && !isError && blogs && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <article
                key={blog.id}
                className="bg-white rounded-[2rem] p-4 shadow-lg shadow-slate-200/40 border border-slate-100 hover:shadow-xl transition-shadow group flex flex-col h-full"
              >
                <div className="relative w-full h-56 rounded-3xl overflow-hidden mb-6 bg-slate-100 shrink-0">
                  {blog.picture ? (
                    <img
                      src={blog.picture}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <FileText size={48} />
                    </div>
                  )}
                  {blog.difficulty_level && (
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-bold">
                      {blog.difficulty_level}
                    </div>
                  )}
                </div>

                <div className="px-2 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <User size={14} /> {blog.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />{" "}
                      {new Date(blog.created_at).toLocaleDateString("fa-IR")}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 mb-3 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mb-6 line-clamp-3 leading-relaxed flex-1">
                    {blog.description}
                  </p>

                  <button className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm hover:text-indigo-800 transition-colors mt-auto">
                    مطالعه کامل <ChevronRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
