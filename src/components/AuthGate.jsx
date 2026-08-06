/* Login/register/guest entry screen shown before the app unlocks. */

import React, { useState } from "react";
import { AlertCircle, ArrowRight, Check, Chrome, Eye, EyeOff, Facebook, Lock, Mail, Phone, ShieldCheck, Star, X } from "lucide-react";
import { Page } from "./Common";

/* ---------- Validation rules ----------------------------------------
   Email atau No. HP:
     - wajib diisi
     - jika mengandung "@" harus format email valid (nama@domain.tld)
     - jika berupa nomor HP: diawali 08 / 62 / +62, panjang 9–13 digit
   Kata sandi:
     - wajib diisi
     - saat daftar: minimal 8 karakter & kombinasi huruf + angka
     - saat masuk: hanya dicek wajib diisi (kombinasi divalidasi di server) */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;

function validateIdentifier(raw) {
  const val = raw.trim();
  if (!val) return "Email atau No. HP wajib diisi";
  if (val.includes("@")) {
    return EMAIL_RE.test(val) ? "" : "Format email tidak valid, contoh: nama@email.com";
  }
  const digits = val.replace(/[\s-]/g, "");
  if (!/^[+0-9]+$/.test(digits)) return "Gunakan format email, atau No. HP yang valid";
  return PHONE_RE.test(digits) ? "" : "No. HP harus diawali 08/62/+62, 9–13 digit angka";
}

function validatePassword(val, mode) {
  if (!val) return "Kata sandi wajib diisi";
  if (mode === "register") {
    if (val.length < 8) return "Kata sandi minimal 8 karakter";
    if (!/[A-Za-z]/.test(val) || !/[0-9]/.test(val)) return "Kombinasikan huruf dan angka";
  }
  return "";
}

export function AuthGate({ onEnter, initialMode = "register" }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTerms, setShowTerms] = useState(false);

  const switchMode = (next) => {
    setMode(next);
    setErrors({});
  };

  const handleSubmit = () => {
    const nextErrors = {};
    const idErr = validateIdentifier(email);
    if (idErr) nextErrors.email = idErr;
    const passErr = validatePassword(password, mode);
    if (passErr) nextErrors.password = passErr;
    if (mode === "register") {
      if (!name.trim()) nextErrors.name = "Nama depan wajib diisi";
      if (!agree) nextErrors.agree = "Setujui Syarat & Ketentuan untuk lanjut";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onEnter(name || "Andi Wijaya", false);
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  return (
    <Page className="kc-auth-wrap">
      <div className="kc-auth-shell">
        {/* ---------- LEFT: the form, plain white ---------- */}
        <div className="kc-auth-left">
          <div className="kc-logo" style={{ marginBottom: 16, marginLeft: -16 }}>
            <span className="kc-logo-mark"> <img src="/logo.png" alt="Logo" className="kc-logo-image"/></span>
            CARTENZ BARBERSHOP
          </div>

          <span className="kc-auth-kicker">{mode === "register" ? "Mulai Gratis" : "Selamat Datang Kembali"}</span>
          <h1 className="kc-auth-h1">{mode === "register" ? "Buat Akun Baru" : "Masuk ke Akunmu"}</h1>

          <div className="kc-auth-social-row">
            <button className="kc-auth-social kc-auth-social-google" onClick={() => onEnter(name || "Andi Wijaya", false)}>
              <Chrome size={16} /> Google
            </button>
            <button className="kc-auth-social kc-auth-social-fb" onClick={() => onEnter(name || "Andi Wijaya", false)}>
              <Facebook size={16} /> Facebook
            </button>
          </div>

          <div className="kc-auth-divider"><span>atau</span></div>

          <div className="kc-form">
            {mode === "register" && (
              <div className="kc-auth-row2">
                <div className="kc-field">
                  <input
                    className={"kc-input" + (errors.name ? " kc-input-invalid" : "")}
                    placeholder="Nama depan"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError("name"); }}
                  />
                  {errors.name && <span className="kc-field-error"><AlertCircle size={12} /> {errors.name}</span>}
                </div>
                <div className="kc-field">
                  <input className="kc-input" placeholder="Nama belakang" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
            )}

            <div className="kc-field">
              <div className="kc-auth-input-icon">
                <input
                  className={"kc-input" + (errors.email ? " kc-input-invalid" : "")}
                  placeholder="Email atau No. HP"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                />
                <Mail size={16} className="kc-auth-icon" />
              </div>
              {errors.email ? (
                <span className="kc-field-error"><AlertCircle size={12} /> {errors.email}</span>
              ) : (
                <span className="kc-field-hint">Email aktif (nama@email.com) atau No. HP diawali 08, contoh 081234567890</span>
              )}
            </div>

            <div className="kc-field">
              <div className="kc-auth-input-icon">
                <input
                  className={"kc-input" + (errors.password ? " kc-input-invalid" : "")}
                  type={showPass ? "text" : "password"}
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                />
                <button type="button" className="kc-auth-icon kc-auth-icon-btn" onClick={() => setShowPass((v) => !v)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password ? (
                <span className="kc-field-error"><AlertCircle size={12} /> {errors.password}</span>
              ) : mode === "register" ? (
                <span className="kc-field-hint">Minimal 8 karakter, kombinasi huruf &amp; angka</span>
              ) : null}
            </div>

            {mode === "register" && (
              <div className="kc-field">
                <label className="kc-auth-check">
                  <button
                    type="button"
                    className={"kc-checkbox" + (agree ? " checked" : "") + (errors.agree ? " kc-checkbox-invalid" : "")}
                    onClick={() => { setAgree((v) => !v); clearError("agree"); }}
                  >
                    {agree && <Check size={12} strokeWidth={3} />}
                  </button>
                  <span className="kc-auth-check-text">
                    Saya setuju dengan{" "}
                    <span
                      className="kc-auth-link"
                      role="button"
                      tabIndex={0}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTerms(true); }}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); setShowTerms(true); } }}
                    >
                      Syarat &amp; Ketentuan
                    </span>
                  </span>
                </label>
                {errors.agree && <span className="kc-field-error"><AlertCircle size={12} /> {errors.agree}</span>}
              </div>
            )}

            <button className="kc-btn kc-btn-primary kc-btn-block" onClick={handleSubmit}>
              {mode === "register" ? "Buat Akun" : "Masuk"}
            </button>
          </div>

          <p className="kc-auth-switch">
            {mode === "register" ? "Sudah punya akun? " : "Belum punya akun? "}
            <button className="kc-auth-link" onClick={() => switchMode(mode === "register" ? "login" : "register")}>
              {mode === "register" ? "Masuk" : "Daftar"}
            </button>
          </p>

          <button className="kc-auth-guest" onClick={() => onEnter("", true)}>
            Lanjutkan sebagai Tamu <ArrowRight size={14} />
          </button>
        </div>

        {/* ---------- RIGHT: soft gradient panel with a floating "live booking" mockup ---------- */}
        <div className="kc-auth-right">
          <div className="kc-auth-blob kc-auth-blob-1" />
          <div className="kc-auth-blob kc-auth-blob-2" />

          <div className="kc-auth-mockup">
            <div className="kc-auth-mockup-bar">
              <span /><span /><span />
              <div className="kc-auth-mockup-url" />
            </div>
            <div className="kc-auth-mockup-body">
              <div className="kc-auth-mockup-avatar">RA</div>
              <div className="kc-auth-mockup-name">Rafi Ardiansyah</div>
              <div className="kc-auth-mockup-time">Booking · 2 hari lalu</div>
              <div className="kc-auth-mockup-stars">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="var(--kc-brass)" strokeWidth={0} />)}
              </div>
              <p className="kc-auth-mockup-quote">&ldquo;Booking online-nya gampang, gak perlu antre lama di tempat.&rdquo;</p>
              <div className="kc-auth-mockup-cta">Booking Sekarang <ArrowRight size={14} /></div>
            </div>

            <div className="kc-auth-float-card">
              <div className="kc-auth-float-top">
                <span className="kc-auth-float-logo"> <img src="/logo.png" alt="Logo" className="kc-logo-image"/></span>
                <span className="kc-auth-float-badge"><span className="kc-auth-float-dot" /> Aktif</span>
              </div>
              <div className="kc-auth-float-title">Cartenz Barbershop</div>
              <div className="kc-auth-float-sub">Booking Real-time</div>
            </div>
          </div>

          <h3 className="kc-auth-right-h3">Booking Tanpa Antre</h3>
          <p className="kc-auth-right-p">
            Pilih capster, jadwal, dan cabang favoritmu — semua dalam satu aplikasi, gratis untuk mulai.
          </p>
          <div className="kc-auth-dots"><span /><span className="active" /></div>
        </div>
      </div>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </Page>
  );
}

/* ================================================================== */
/* SYARAT & KETENTUAN — email / no. hp / kata sandi                     */
/* ================================================================== */

function TermsModal({ onClose }) {
  return (
    <div className="kc-modal-overlay" onClick={onClose}>
      <div className="kc-modal-box kc-terms-box" onClick={(e) => e.stopPropagation()}>
        <button className="kc-modal-close" onClick={onClose} aria-label="Tutup"><X size={16} /></button>
        <h2 className="kc-terms-h2">Syarat &amp; Ketentuan</h2>
        <p className="kc-terms-sub">Ketentuan berikut berlaku saat kamu mendaftar maupun masuk ke akun Cartenz Barbershop.</p>

        <div className="kc-terms-section">
          <h4><Mail size={15} /> Email</h4>
          <ul>
            <li>Wajib menggunakan format email yang valid, misal nama@email.com.</li>
            <li>Satu alamat email hanya dapat digunakan untuk satu akun.</li>
            <li>Email digunakan untuk konfirmasi booking dan pemulihan akun, pastikan aktif.</li>
          </ul>
        </div>

        <div className="kc-terms-section">
          <h4><Phone size={15} /> Nomor HP</h4>
          <ul>
            <li>Diawali 08, 62, atau +62, diikuti 9–13 digit angka (contoh: 081234567890).</li>
            <li>Nomor harus aktif karena digunakan untuk notifikasi dan verifikasi booking.</li>
            <li>Satu nomor HP hanya dapat didaftarkan pada satu akun.</li>
          </ul>
        </div>

        <div className="kc-terms-section">
          <h4><Lock size={15} /> Kata Sandi</h4>
          <ul>
            <li>Minimal 8 karakter.</li>
            <li>Kombinasi huruf dan angka.</li>
            <li>Disarankan tidak menggunakan kata sandi yang sama dengan layanan lain.</li>
            <li>Jangan membagikan kata sandi kepada siapa pun, termasuk pihak yang mengaku dari Cartenz Barbershop.</li>
          </ul>
        </div>

        <div className="kc-terms-section">
          <h4><ShieldCheck size={15} /> Ketentuan Umum</h4>
          <ul>
            <li>Data yang didaftarkan harus benar dan merupakan milik sendiri.</li>
            <li>Dengan mendaftar, kamu menyetujui data ini digunakan untuk proses booking, poin, dan promo.</li>
            <li>Cartenz Barbershop berhak menonaktifkan akun yang terindikasi disalahgunakan.</li>
          </ul>
        </div>

        <button className="kc-btn kc-btn-dark kc-btn-block" onClick={onClose}>Saya Mengerti</button>
      </div>
    </div>
  );
}

/* ================================================================== */
/* CAPSTER MATCH QUIZ + STEAMED MIRROR                                  */
/* A 5-question quiz first narrows down what the customer wants, then   */
/* a "hot towel" fogged glass panel becomes the reveal trigger: wiping  */
/* it computes a match score against every capster and unveils a rich   */
/* result card (match %, reasons, comparison bars, stats, a quote).     */
/* ================================================================== */

/* ================================================================== */
/* STEAMED MIRROR — CAPSTER MATCH REVEAL                                */
/* Matches the reference layout exactly: no quiz step first, just the   */
/* heading, then straight into the fogged-glass panel + steps on the    */
/* left and the (initially empty) result card on the right. Wiping the  */
/* glass computes a match against every capster and reveals a rich      */
/* result card (match %, reasons, comparison bars, stats, a quote).     */
/* ================================================================== */

