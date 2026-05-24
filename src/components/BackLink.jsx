import React from 'react';
import { Link } from 'react-router-dom';

export function BackLink({ to = '/auth/login', label = 'Quay lại đăng nhập' }) {
  return (
    <Link
      to={to}
      className="mx-auto flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition"
    >
      <span aria-hidden>←</span>
      {label}
    </Link>
  );
}
