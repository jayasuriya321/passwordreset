import React, { useState } from "react";
import API from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMsg(res.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending email");
    }
  };

  return (
    <div className="flex justify-center items-center font-oswald">
      <div className="p-2 w-96">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        {/* Messages */}
        {msg && (
          <p className="text-green-600 text-center mt-4 font-medium">{msg}</p>
        )}
        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
