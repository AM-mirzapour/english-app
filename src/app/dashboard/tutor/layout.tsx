"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={["tutor"]}>{children}</ProtectedRoute>;
}