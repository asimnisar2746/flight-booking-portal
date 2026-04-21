import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/auth";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, []);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
