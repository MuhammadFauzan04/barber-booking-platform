import React, { useState } from "react";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { ADMIN_ACCOUNT } from "../adminData";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Email dan password wajib diisi.");
      return;
    }
    if (email !== ADMIN_ACCOUNT.email || password !== ADMIN_ACCOUNT.password) {
      setError("Email atau password salah. Coba lagi.");
      return;
    }
    setError("");
    onLogin();
  };

  return (
    <div className="adm-login-page">
      <div className="adm-login-card">
        <div className="adm-login-brand">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="adm-login-logo">
            <path d="M33 7C33 7 19 5 13 13C7 21 13 27 19 25C25 23 21 15 15 17C9 19 9 27 15 31C21 35 29 33 31 27"
              stroke="#17281F" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </svg>
          <div>
            <div className="adm-login-brand-main">CARTENZ BARBERSHOP</div>
            <div className="adm-login-brand-sub">Admin Panel</div>
          </div>
        </div>

        <h2 className="adm-login-title">Masuk ke Dashboard</h2>
        <p className="adm-login-desc">Khusus untuk tim internal Cartenz Barbershop.</p>

        <form onSubmit={handleSubmit} className="adm-login-form">
          <label className="adm-field">
            <span>Email</span>
            <div className="adm-input-icon">
              <Mail size={15} />
              <input type="email" placeholder="admin@cartenz.id" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </label>
          <label className="adm-field">
            <span>Password</span>
            <div className="adm-input-icon">
              <Lock size={15} />
              <input type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </label>

          {error && <div className="adm-login-error">{error}</div>}

          <button type="submit" className="adm-btn primary block">
            <ShieldCheck size={15} /> Masuk sebagai Admin
          </button>
        </form>

        <div className="adm-login-hint">
          Demo akun &mdash; email: <b>{ADMIN_ACCOUNT.email}</b>, password: <b>{ADMIN_ACCOUNT.password}</b>
        </div>
      </div>
    </div>
  );
}
