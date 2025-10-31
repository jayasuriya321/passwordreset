import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import logo from "./assets/logo.png";

export default function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-oswald">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <img src={logo} alt="logo" className="w-10 h-10" />
          </Link>

          {/* Hamburger Icon (Mobile) */}
          <button
            onClick={toggleMenu}
            className="text-gray-700 text-2xl sm:hidden focus:outline-none"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>

          {/* Nav Links (Desktop) */}
          <div className="hidden sm:flex space-x-6">
            <NavLinks location={location} closeMenu={closeMenu} />
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Background */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Sidebar (with close icon) */}
      <div
        className={`fixed top-0 right-0 w-2/3 max-w-xs h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden`}
        role="dialog"
        aria-modal={menuOpen ? "true" : "false"}
      >
        {/* Close button positioned at top-right of sidebar */}
        <div className="relative h-16 flex items-center justify-end px-4 border-b">
          <button
            onClick={closeMenu}
            className="text-gray-700 text-2xl focus:outline-none"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col items-baseline justify-start h-[calc(100%-64px)] space-y-6 px-4 mt-4">
          <NavLinks location={location} closeMenu={closeMenu} />
        </div>
      </div>

      {/* Main Content (with padding for fixed navbar) */}
      <main className="flex-grow flex items-center justify-center py-10 px-4 pt-24">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t text-center text-gray-500 py-3 text-sm">
        © {new Date().getFullYear()} Password Reset System. All rights reserved.
      </footer>
    </div>
  );
}

/* Nav Links Component */
function NavLinks({ location, closeMenu }) {
  const links = [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
    { to: "/forgot-password", label: "Forgot Password" },
  ];

  return (
    <>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          onClick={closeMenu}
          className={`text-base font-medium ${
            location.pathname === to
              ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
              : "text-gray-700 hover:text-indigo-600 transition-colors"
          }`}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
