/* Site footer with the edge-to-edge cropped wordmark. */

import React from "react";
import { Facebook, Instagram, MessageCircle, Scissors } from "lucide-react";

export function Footer({ go }) {
  return (
    // Full-bleed dark footer — no more floating white card. Content sits
    // directly on the dark ink background (the same tone the old stats
    // section used), which also makes the cropped "CARTENZ" wordmark below
    // read cleanly since it no longer has to fight a white card edge.
    <footer className="kc-footer">
      <div className="kc-footer-inner">
        <div className="kc-footer-top">
          <div className="kc-footer-brand-col">
            <div className="kc-logo kc-logo-onDark">
              <span className="kc-logo-mark"><Scissors size={17} strokeWidth={2.4} /></span>
              CARTENZ<span className="kc-logo-dot">.BARBER</span>
            </div>
            <p className="kc-footer-tagline">
              Cartenz merawat gaya dan kepercayaan diri lebih dari 13.800 pelanggan lewat capster
              bersertifikat di 5 cabang.
            </p>
            <div className="kc-footer-social">
              <button className="kc-footer-social-btn" aria-label="Instagram" onClick={() => go("home")}><Instagram size={16} /></button>
              <button className="kc-footer-social-btn" aria-label="Facebook" onClick={() => go("home")}><Facebook size={16} /></button>
              <button className="kc-footer-social-btn" aria-label="WhatsApp" onClick={() => go("home")}><MessageCircle size={16} /></button>
            </div>
          </div>

          <div className="kc-footer-links-grid">
            <div className="kc-footer-col">
              <div className="kc-footer-title">Brand Kami</div>
              <button className="kc-footer-link" onClick={() => go("home")}>Tentang</button>
              <button className="kc-footer-link" onClick={() => go("capsters")}>Tim Capster</button>
              <button className="kc-footer-link" onClick={() => go("promo")}>Promo</button>
              <button className="kc-footer-link" onClick={() => go("inspiration")}>Galeri</button>
            </div>
            <div className="kc-footer-col">
              <div className="kc-footer-title">Akun</div>
              <button className="kc-footer-link" onClick={() => go("points")}>Poin & Voucher</button>
              <button className="kc-footer-link" onClick={() => go("services")}>Riwayat Booking</button>
              <button className="kc-footer-link" onClick={() => go("home")}>Pengaturan</button>
            </div>
            <div className="kc-footer-col">
              <div className="kc-footer-title">Bantuan</div>
              <span className="kc-footer-link static">Pusat Bantuan</span>
              <span className="kc-footer-link static">Hubungi Kami</span>
              <span className="kc-footer-link static">Karir</span>
            </div>
          </div>
        </div>

        <div className="kc-footer-divider" />

        <div className="kc-footer-bottom-row">
          <div className="kc-footer-copy">© 2026 Cartenz Barbershop. Semua hak dilindungi.</div>
          <div className="kc-footer-legal">
            <span className="kc-footer-legal-link">Kebijakan Privasi</span>
            <span className="kc-footer-legal-link">Syarat & Ketentuan</span>
            <span className="kc-footer-legal-link">Pengaturan Cookie</span>
          </div>
        </div>
      </div>

      {/*
        Giant cropped wordmark, built as SVG instead of plain text:
        - `textLength="1000"` (matching the viewBox width) forces the word to
          stretch/compress to EXACTLY the full width of its container, so it
          always touches the left edge and the right edge regardless of
          screen size or how many letters the brand name has.
        - The wrapper below uses the padding-bottom aspect-ratio trick to
          clip the SVG's height down to 60% of its natural size, so only the
          top 60% of the letters are visible and the rest bleeds off the
          bottom edge of the footer.
      */}
      <div className="kc-footer-watermark-wrap" aria-hidden="true">
        <svg className="kc-footer-watermark-svg" viewBox="0 0 1450 300" preserveAspectRatio="none">
          <text x="725" y="230" textAnchor="middle" textLength="1500" lengthAdjust="spacingAndGlyphs" className="kc-footer-watermark-text">
            CARTENZ BARBERSHOP
          </text>
        </svg>
      </div>
    </footer>
  );
}

/* ================================================================== */
/* APP ROOT — simple state-machine router                              */
/* ================================================================== */

