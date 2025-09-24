import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import lawbotLogo from '../../src/assets/lawbot_logo.svg';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm flex flex-col items-center">
          <img
            src={lawbotLogo}
            alt="LawBot Logo"
            style={{ height: '30px', width: 'auto' }} 
            className="mb-6"
          />

          <div className="mb-4 w-full">
            <input
              type="email"
              id="email"
              placeholder="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>

          <div className="mb-6 w-full">
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>

          <button
            className="w-full py-3 mb-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            로그인
          </button>

          <p className="text-center text-sm text-gray-600">
            계정이 없으신가요?
            <button
              onClick={() => navigate("/register")}
              className="text-blue-900 font-semibold ml-1 hover:underline p-0 m-0 bg-transparent"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 