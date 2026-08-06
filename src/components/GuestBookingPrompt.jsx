/* Pop up shown when a guest (not logged in) tries to start a booking.
   Offers "Masuk" or "Daftar" — either routes to AuthGate in the right mode. */

import React from "react";
import { LogIn, X } from "lucide-react";

export function GuestBookingPrompt({ onLogin, onRegister, onClose }) {
  return (
    <div className="kc-modal-overlay" onClick={onClose}>
      <div className="kc-modal-box kc-guest-box" onClick={(e) => e.stopPropagation()}>
        <button className="kc-modal-close" onClick={onClose} aria-label="Tutup"><X size={16} /></button>
        <div className="kc-guest-icon"><LogIn size={22} /></div>
        <h3>Masuk untuk Booking</h3>
        <p>Kamu sedang menjelajah sebagai tamu. Untuk melanjutkan booking, silakan masuk atau buat akun terlebih dahulu.</p>
        <div className="kc-guest-actions">
          <button className="kc-btn kc-btn-primary kc-btn-block" style={{ marginTop: 0 }} onClick={onRegister}>Daftar Akun Baru</button>
          <button className="kc-btn kc-btn-outline kc-btn-block" style={{ marginTop: 0 }} onClick={onLogin}>Masuk ke Akun</button>
        </div>
        <button className="kc-guest-cancel" onClick={onClose}>Nanti saja</button>
      </div>
    </div>
  );
}
