/* Login/register/guest entry screen shown before the app unlocks. */

import React, { useState } from "react";
import { ArrowRight, Check, Chrome, Eye, EyeOff, Facebook, Mail, Scissors, Star } from "lucide-react";
import { Page } from "./Common";

export function AuthGate({ onEnter }) {
  const [mode, setMode] = useState("register");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(true);

  return (
    <Page className="kc-auth-wrap">
      <div className="kc-auth-shell">
        {/* ---------- LEFT: the form, plain white ---------- */}
        <div className="kc-auth-left">
          <div className="kc-logo" style={{ marginBottom: 30 }}>
            <span className="kc-logo-mark"><Scissors size={17} strokeWidth={2.4} /></span>
            CARTENZ<span className="kc-logo-dot">.BARBER</span>
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
                <input className="kc-input" placeholder="Nama depan" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="kc-input" placeholder="Nama belakang" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            )}
            <div className="kc-auth-input-icon">
              <input className="kc-input" placeholder="Email atau No. HP" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Mail size={16} className="kc-auth-icon" />
            </div>
            <div className="kc-auth-input-icon">
              <input className="kc-input" type={showPass ? "text" : "password"} placeholder="Kata sandi" />
              <button type="button" className="kc-auth-icon kc-auth-icon-btn" onClick={() => setShowPass((v) => !v)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {mode === "register" && (
              <label className="kc-auth-check">
                <button type="button" className={"kc-checkbox" + (agree ? " checked" : "")} onClick={() => setAgree((v) => !v)}>
                  {agree && <Check size={12} strokeWidth={3} />}
                </button>
                Saya setuju dengan <span className="kc-auth-link">Syarat &amp; Ketentuan</span>
              </label>
            )}

            <button className="kc-btn kc-btn-primary kc-btn-block" onClick={() => onEnter(name || "Andi Wijaya", false)}>
              {mode === "register" ? "Buat Akun" : "Masuk"}
            </button>
          </div>

          <p className="kc-auth-switch">
            {mode === "register" ? "Sudah punya akun? " : "Belum punya akun? "}
            <button className="kc-auth-link" onClick={() => setMode(mode === "register" ? "login" : "register")}>
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
                <span className="kc-auth-float-logo"><Scissors size={15} strokeWidth={2.2} /></span>
                <span className="kc-auth-float-badge"><span className="kc-auth-float-dot" /> Aktif</span>
              </div>
              <div className="kc-auth-float-title">Cartenz.Barber</div>
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
    </Page>
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

