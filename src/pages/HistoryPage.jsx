/* Booking history page. */

import React from "react";
import { ArrowRight, Check, XCircle } from "lucide-react";
import { Page, Stagger } from "../components/Common";
import { BOOKING_HISTORY } from "../data/barbershop";
import { rupiah } from "../utils/format";

export function HistoryPage({ go }) {
  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Akun Saya</span><h2 className="kc-h2">RIWAYAT BOOKING</h2></div>

      {BOOKING_HISTORY.length === 0 ? (
        <p className="kc-capster-meta">Belum ada riwayat booking.</p>
      ) : (
        <div className="kc-card-list" style={{ maxWidth: 640 }}>
          <Stagger>
            {BOOKING_HISTORY.map((h) => (
              <div key={h.id} className="kc-history-booking-row">
                <div className="kc-history-booking-main">
                  <div className="kc-service-name">{h.service}</div>
                  <div className="kc-capster-meta">{h.capster} · {h.branch} · {h.date}</div>
                </div>
                <div className="kc-history-booking-side">
                  <div className="kc-service-name">{rupiah(h.price)}</div>
                  <span className={"kc-status-badge" + (h.status === "Selesai" ? " done" : " cancel")}>
                    {h.status === "Selesai" ? <Check size={11} /> : <XCircle size={11} />} {h.status}
                  </span>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button className="kc-btn kc-btn-primary" onClick={() => go("capsters")}>Booking Lagi <ArrowRight size={15} /></button>
      </div>
    </Page>
  );
}

