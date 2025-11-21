import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "12345") {
      navigate("/payslip");
    } else {
      setMsg("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 font-[SF Pro Display]">

      {/* Wrapper with reduced gap */}
      <div className="flex items-center justify-between w-[85%] gap-4">

        {/* LEFT SIDE */}
        <div className="w-[540px]">
          {/* Logo + Text */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/vetri-logo.png"
              alt="logo"
              className="w-24 h-24 object-contain"
            />

            <div>
              <h1 className="text-3xl font-bold text-[#3C3084]">
                VETRI IT SYSTEMS
              </h1>
              <p className="text-2xl font-medium text-[#3C3084] -mt-1">-Employee Payslip-</p>
            </div>
          </div>

          {/* Illustration */}
          <img
            src="/login-side.png"
            alt="illustration"
            className="mt-2"
          />
        </div>

        {/* RIGHT SIDE LOGIN CARD */}
        <div className="w-[480px] bg-[#F6FFE8] p-10 rounded-[25px] shadow-sm border pt-[80px] pb-[120px]">

          <h2 className="text-3xl font-bold text-[#3C3084] text-center">
            Hello, Welcome Back!
          </h2>
          <p className="text-3xl font-bold text-[#3C3084] text-center -mt-1 mb-8">
            Login to continue
          </p>

          {/* Username Input */}
          <div className="relative mb-5">
            <FaUser className="absolute left-4 top-4 text-darkText" />
            <input
              type="text"
              placeholder="Username/Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow outline-none 
                         text-black placeholder-darkText"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-5">
            <FaLock className="absolute left-4 top-4 text-darkText" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow outline-none 
                         text-black placeholder-darkText"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              Remember me
            </label>

            <button className="text-black hover:text-[#3C3084]">
              Forget Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-full bg-[#3C3084] text-white text-lg font-semibold hover:opacity-90"
          >
            Login
          </button>

          {/* Login message */}
          {msg && (
            <p className="text-center text-sm mt-4 text-red-500 font-medium">
              {msg}
            </p>
          )}
        <p className="text-center mt-4 text-sm text-gray-600">
          <span className="font-semibold text-[#3C3084]">Dummy Login →</span>  
          Username: <span className="font-medium">admin</span> | 
          Password: <span className="font-medium">12345</span>
        </p>
        </div>
      </div>
    </div>
  );
}
