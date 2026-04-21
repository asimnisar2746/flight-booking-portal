import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Loggin in...");
    try {
      const res = await loginUser({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });
      localStorage.setItem("token", res.token);

      toast.success(res.message, { id: toastId });
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-green-100 shadow-xl rounded-2xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-600">Welcome Back</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Login to continue your AI journey 🚀
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
        />

        {/* Forgot password */}
        <div className="text-right">
          <a
            href="#"
            className="text-sm text-emerald-500 hover:text-emerald-600"
          >
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition shadow-md hover:shadow-lg"
        >
          {loading ? "Loggin in..." : "Login"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-xs text-center text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-emerald-600 text-sm">
          Sign up
        </Link>{" "}
        instead
      </p>
    </div>
  );
}

export default LoginForm;
