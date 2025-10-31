import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      const res = await API.post("/auth/register", form);
      setMsg(res.data.message);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center font-oswald">
      <div className="p-2 w-96">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
          />

          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-3.5 text-gray-500 cursor-pointer"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Register
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
