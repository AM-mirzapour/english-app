"use client";

import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { useBlogs } from "@/hooks/usePublic";

export default function LatestBlogs() {
  const { data: blogsData, isLoading } = useBlogs();
  const blogs = Array.isArray(blogsData) ? blogsData : blogsData?.results || [];

  return (
    <section className="bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              آخرین مقالات آموزشی
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              دانش خود را با مقالات تخصصی افزایش دهید
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white text-sm font-bold rounded-xl transition-all duration-300 group shadow-sm"
          >
            ورود به مجله{" "}
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog: any) => (
              <div key={blog.id} className="group cursor-pointer">
                <div className="w-full h-48 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 mb-4">
                  {blog.picture ? (
                    <img
                      src={blog.picture}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText size={32} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                    {blog.difficulty_level || "عمومی"}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {new Date(blog.created_at).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <h3 className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-2 line-clamp-2">
                  {blog.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
