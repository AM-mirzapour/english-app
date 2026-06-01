"use client";

import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import LatestCourses from "@/components/home/LatestCourses";
import TopTutors from "@/components/home/TopTutors";
import LatestBlogs from "@/components/home/LatestBlogs";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <LatestCourses />
        <TopTutors />
        <LatestBlogs />
      </main>

      <Footer />
    </div>
  );
}