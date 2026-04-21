import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../api/auth";

function SignupForm() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const clearForm = () => setFormData(initialState);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const cleanData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
    setLoading(true);
    const toastId = toast.loading("Creating account...");
    try {
      const res = await registerUser(cleanData);

      toast.success(res.message, {
        id: toastId,
      });
      clearForm();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-green-100 shadow-xl rounded-2xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-600">Create Account</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Join the AI-powered experience 🚀
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
        />

        {/* Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition shadow-md hover:shadow-lg"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      {/* Footer text */}
      <p className="text-xs text-center text-gray-400 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-emerald-600 text-sm">
          Login
        </Link>
      </p>
      <p className="text-xs text-center text-gray-400 mt-6">
        By signing up, you agree to our terms & privacy policy
      </p>
    </div>
  );
}

export default SignupForm;
