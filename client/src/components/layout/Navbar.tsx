import { useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../../api/auth";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";

type UserType = {
  name: string;
  email: string;
  role: string;
  avatar: string;
};

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.user);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");

      toast.success("Logged out successfully");

      navigate("/login", { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Logout failed");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-16 bg-white/70 backdrop-blur-xl border-b border-green-100 flex items-center justify-between px-6">
      {/* Left - Logo */}
      <h2 className="text-emerald-600 font-bold text-lg">
        ✈️ SkyBook Dashboard
      </h2>

      {/* Right */}
      <div className="relative" ref={dropdownRef}>
        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <img
            src={user?.avatar || "https://i.pravatar.cc/150"}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700">{user?.name || "user"}</span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
            {/* Profile */}
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
              <p className="text-xs text-emerald-500 mt-1 capitalize">
                {user?.role}
              </p>
            </div>

            {/* Menu Items */}
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition"
            >
              Profile
            </button>

            {/* Divider */}
            <div className="border-t" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
