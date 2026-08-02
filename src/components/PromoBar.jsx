/* Scrolling top promo strip. */

import React, { useState, useEffect } from "react";

export function PromoBar() {
  const [seconds, setSeconds] = useState(2 * 3600 + 14 * 60 + 33);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return (
    <div className="kc-promobar">
      Diskon member baru 10% berakhir dalam&nbsp;
      <span className="kc-promobar-time">{h}:{m}:{s}</span>
    </div>
  );
}

/* ================================================================== */
/* HEADER / NAV                                                        */
/* ================================================================== */

