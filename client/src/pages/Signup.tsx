import React from "react";
import SignupForm from "../components/auth/SignupForm";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
      <SignupForm />
    </div>
  );
}

export default Signup;
