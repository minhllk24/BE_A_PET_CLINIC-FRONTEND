import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Otp from '../pages/Auth/Otp'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import ResetPassword from '../pages/Auth/ResetPassword'

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-sky-50/50 flex flex-col items-center justify-center p-6 text-center">
              <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
                Dr. Pet's House 🐾
              </h1>
              <p className="text-slate-600 mb-8 max-w-md">
                Hệ thống Quản lý Phòng Khám Thú Y & Thương mại điện tử dành cho Pet.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/auth/login" className="px-6 h-12 bg-amber-400 text-slate-800 font-semibold rounded-2xl flex items-center justify-center hover:brightness-95 transition no-underline">
                  Đăng nhập hệ thống
                </Link>
                <Link to="/auth/register" className="px-6 h-12 border border-slate-200 bg-white text-slate-700 font-semibold rounded-2xl flex items-center justify-center hover:bg-slate-50 transition no-underline">
                  Tạo tài khoản mới
                </Link>
              </div>
              <p className="text-xs text-slate-400 mt-12 font-medium">
                Giao diện Auth & OTP thực hiện bởi Thái.
              </p>
            </div>
          } />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/otp" element={<Otp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
