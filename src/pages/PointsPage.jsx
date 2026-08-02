/* Points & voucher wallet page. */

import React from "react";
import { BadgeCheck, Gift, Sparkles } from "lucide-react";
import { Page, Stagger } from "../components/Common";
import { TicketStub } from "../components/TicketStub";
import { POINT_HISTORY, REDEEMABLE_VOUCHERS } from "../data/barbershop";

export function PointsPage({ points, wallet, setWallet, setPoints, userName }) {
  const redeem = (v) => { if (points < v.points) return; setPoints(points - v.points); setWallet([...wallet, v]); };
  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Poin & Voucher</span><h2 className="kc-h2">KARTU MEMBER KAMU</h2></div>
      <div className="kc-member-card">
        <div className="kc-member-top">
          <div><div className="kc-kicker" style={{ color: "rgba(255,255,255,0.7)" }}>CARTENZ.BARBER MEMBER</div>
            <div className="kc-member-name">{userName || "Tamu"} <BadgeCheck size={16} /></div></div>
          <Sparkles size={22} />
        </div>
        <div className="kc-member-bottom">
          <div><div className="kc-member-points">{points}</div><div className="kc-capster-meta" style={{ color: "rgba(255,255,255,0.65)" }}>Poin tersedia</div></div>
          <div className="kc-member-tier">Silver Member</div>
        </div>
      </div>

      <div className="kc-kicker" style={{ margin: "30px 0 12px" }}>Tukar Poin Jadi Voucher</div>
      <div className="kc-voucher-grid">
        <Stagger>
          {REDEEMABLE_VOUCHERS.map((v) => (
            <div key={v.id} className="kc-voucher-card">
              <Gift size={20} />
              <div className="kc-voucher-label">{v.label}</div>
              <div className="kc-capster-meta">{v.points} poin</div>
              <button className="kc-btn kc-btn-brass kc-btn-block" disabled={points < v.points} onClick={() => redeem(v)}>
                {points < v.points ? "Poin Kurang" : "Tukar Sekarang"}
              </button>
            </div>
          ))}
        </Stagger>
      </div>

      {wallet.length > 0 && (
        <>
          <div className="kc-kicker" style={{ margin: "30px 0 12px" }}>Voucher Kamu</div>
          <div className="kc-card-list">
            <Stagger>{wallet.map((v, i) => <TicketStub key={i} lines={[["VOUCHER", v.label], ["BERLAKU S/D", "31 Agu 2026"]]} />)}</Stagger>
          </div>
        </>
      )}

      <div className="kc-kicker" style={{ margin: "30px 0 12px" }}>Riwayat Poin</div>
      <div className="kc-card-list">
        <Stagger>
          {POINT_HISTORY.map((h) => (
            <div key={h.id} className="kc-history-row">
              <div><div className="kc-service-name">{h.label}</div><div className="kc-capster-meta">{h.date}</div></div>
              <div className={"kc-history-points" + (h.points < 0 ? " neg" : "")}>{h.points > 0 ? `+${h.points}` : h.points}</div>
            </div>
          ))}
        </Stagger>
      </div>
    </Page>
  );
}

/* ================================================================== */
/* FOOTER                                                               */
/* ================================================================== */

