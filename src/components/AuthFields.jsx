import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Field({ label, right, children }) {
  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800">{label}</label>
        {right}
      </div>
      {children}
    </div>
  );
}

export function TextInput(props) {
  const { className = '', ...rest } = props;
  return (
    <input
      {...rest}
      className={
        'w-full h-11 sm:h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-amber-400/40 transition ' +
        className
      }
    />
  );
}

export function PasswordInput(props) {
  const [show, setShow] = useState(false);
  const { className = '', ...rest } = props;
  return (
    <div className="relative">
      <input
        {...rest}
        type={show ? 'text' : 'password'}
        className={
          'w-full h-11 sm:h-12 rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-amber-400/40 transition ' +
          className
        }
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-8 w-8 rounded-full text-slate-400 hover:text-slate-700"
        aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function PrimaryButton({ children, className = '', ...rest }) {
  return (
    <button
      {...rest}
      className={
        'w-full h-11 sm:h-12 rounded-2xl bg-amber-400 text-slate-800 font-semibold text-sm hover:brightness-95 active:scale-[0.99] transition disabled:opacity-60 ' +
        className
      }
    >
      {children}
    </button>
  );
}

export function SocialButton({ icon, children, className = '', ...rest }) {
  return (
    <button
      {...rest}
      className={
        'w-full h-11 sm:h-12 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2 ' +
        className
      }
    >
      {icon}
      {children}
    </button>
  );
}

export function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs text-slate-400">{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
