"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Cookies from "js-cookie";
import { authService } from "@/services/authService";
import { setAuth } from "@/store/slices/authSlice";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        router.push("/login");
        return;
      }

      if (!user) {
        try {
          const userData = await authService.getMe();
          const userInfo = userData.user || userData;
          dispatch(
            setAuth({
              user: userInfo,
              role: userInfo.is_teacher ? "tutor" : "student",
            })
          );
        } catch (error) {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          router.push("/login");
          return;
        }
      }
      
      setIsVerifying(false);
    };

    verifyAuth();
  }, [user, router, dispatch]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}