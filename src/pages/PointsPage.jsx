/* Poin & Rewards page — membership card, stats, gold-tier progress,
   voucher redemption, point history, active vouchers and achievements. */

import React from "react";
import {
  BadgeCheck, Calendar, CalendarPlus, Check, ChevronRight, Coins, Crown,
  Gift, HelpCircle, Lock, QrCode, Tag, Ticket, UserPlus, Wallet,
} from "lucide-react";
import { Page, Stagger } from "../components/Common";
import {
  ACHIEVEMENTS, GOLD_BENEFITS, GOLD_TIER_TARGET, MEMBER_STATS,
  POINT_HISTORY, REDEEMABLE_VOUCHERS,
} from "../data/barbershop";

const rp = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

export function PointsPage({ points, wallet, setWallet, setPoints, userName, go }) {
  const redeem = (v) => { if (points < v.points) return; setPoints(points - v.points); setWallet([...wallet, v]); };
  const toGold = Math.max(GOLD_TIER_TARGET - points, 0);
  const goldPct = Math.min(100, Math.round((points / GOLD_TIER_TARGET) * 100));

  const stats = [
    { icon: Calendar, value: MEMBER_STATS.totalBooking, label: "Total Booking", sub: "Lebih banyak lebih banyak poin" },
    { icon: Wallet, value: rp(MEMBER_STATS.totalHemat), label: "Total Hemat", sub: "Dari voucher & promo" },
    { icon: Coins, value: points, label: "Total Poin", sub: "Terus kumpulkan!" },
    { icon: Tag, value: wallet.length, label: "Voucher Aktif", sub: "Siap digunakan" },
  ];

  return (
    <Page className="kc-section kc-rw">
      <div className="kc-rw-headrow">
        <div>
          <span className="kc-kicker">Poin & Rewards</span>
          <h2 className="kc-h2">KARTU MEMBER KAMU</h2>
          <p className="kc-rw-sub">Semua keuntungan member ada di sini.</p>
        </div>
        <div className="kc-rw-head-actions">
          <button className="kc-btn kc-btn-dark kc-btn-sm"><HelpCircle size={15} /> Cara Kerja Poin</button>
          <button className="kc-btn kc-btn-ghost kc-btn-sm" onClick={() => go && go("history")}>Riwayat Lengkap <ChevronRight size={15} /></button>
        </div>
      </div>

      <div className="kc-rw-layout">
        {/* LEFT COLUMN — member card + gold progress */}
        <div className="kc-rw-left">
          <div className="kc-rw-membercard">
            <Crown className="kc-rw-membercard-watermark" size={210} strokeWidth={1} />
            <div className="kc-rw-membercard-top">
              <Crown size={15} />
              <span>PREMIUM MEMBER</span>
              <span className="kc-rw-tier-pill">SILVER</span>
            </div>
            <div className="kc-rw-membercard-name">{userName || "Tamu"}</div>
            <div className="kc-rw-membercard-points">{points}</div>
            <div className="kc-rw-membercard-points-label">POINTS</div>
            <div className="kc-rw-membercard-track"><div className="kc-rw-membercard-fill" style={{ width: `${goldPct}%` }} /></div>
            <div className="kc-rw-membercard-footrow">
              <div>
                <div className="kc-rw-membercard-tolabel">{toGold} poin lagi menuju Gold</div>
                <div className="kc-rw-membercard-count">{points} / {GOLD_TIER_TARGET} Poin</div>
              </div>
              <div className="kc-rw-membercard-tierlabel">Silver Member</div>
            </div>
            <div className="kc-rw-qrbox"><QrCode size={30} /></div>
          </div>

          <div className="kc-rw-goldcard">
            <div className="kc-rw-goldcard-head">
              <span>PROGRESS KE GOLD MEMBER</span>
              <HelpCircle size={14} />
            </div>
            <div className="kc-rw-goldcard-row">
              <div><span className="kc-rw-goldcard-num">{points}</span> / {GOLD_TIER_TARGET} Poin</div>
              <div className="kc-rw-goldcard-pct">{goldPct}%</div>
            </div>
            <div className="kc-rw-goldcard-track"><div className="kc-rw-goldcard-fill" style={{ width: `${goldPct}%` }} /></div>
            <div className="kc-rw-goldcard-scale"><span>0</span><span>{Math.round(GOLD_TIER_TARGET / 2)}</span><span>{GOLD_TIER_TARGET}</span></div>

            <div className="kc-rw-goldcard-benefits-label">BENEFIT GOLD MEMBER</div>
            <div className="kc-rw-benefit-list">
              {GOLD_BENEFITS.map((b) => (
                <div className="kc-rw-benefit-item" key={b}><Check size={13} /> {b}</div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — stats + content */}
        <div className="kc-rw-right">
          <div className="kc-rw-stats">
            {stats.map((s) => (
              <div className="kc-rw-stat-card" key={s.label}>
                <div className="kc-rw-stat-icon"><s.icon size={18} /></div>
                <div className="kc-rw-stat-value">{s.value}</div>
                <div className="kc-rw-stat-label">{s.label}</div>
                <div className="kc-rw-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="kc-rw-content-grid">
            <div className="kc-rw-content-col">
              <div className="kc-rw-panel">
                <div className="kc-rw-panel-head"><span>TUKAR POIN JADI VOUCHER</span><a onClick={() => {}}>Lihat Semua <ChevronRight size={13} /></a></div>
                <div className="kc-rw-redeem-grid">
                  <Stagger>
                    {REDEEMABLE_VOUCHERS.map((v) => (
                      <div className="kc-rw-redeem-card" key={v.id}>
                        <div className="kc-rw-redeem-icon"><Gift size={16} /></div>
                        <div className="kc-rw-redeem-label">Voucher</div>
                        <div className="kc-rw-redeem-value">{rp(v.value)}</div>
                        <div className="kc-rw-redeem-pts">{v.points} POIN</div>
                        <button
                          className={"kc-rw-redeem-btn" + (points < v.points ? " disabled" : "")}
                          disabled={points < v.points}
                          onClick={() => redeem(v)}
                        >
                          {points < v.points ? "Poin Kurang" : "Tukar Sekarang"}
                        </button>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </div>

              <div className="kc-rw-panel">
                <div className="kc-rw-panel-head"><span>RIWAYAT POIN</span><a onClick={() => {}}>Lihat Semua <ChevronRight size={13} /></a></div>
                <div className="kc-rw-history">
                  <Stagger>
                    {POINT_HISTORY.map((h) => (
                      <div className="kc-rw-history-row" key={h.id}>
                        <div className={"kc-rw-history-dot" + (h.points < 0 ? " neg" : "")}>{h.points > 0 ? `+${h.points}` : h.points}</div>
                        <div className="kc-rw-history-body">
                          <div className="kc-rw-history-label">{h.label}</div>
                          <div className="kc-rw-history-date">{h.date}</div>
                        </div>
                        <div className={"kc-rw-history-points" + (h.points < 0 ? " neg" : "")}>{h.points > 0 ? `+${h.points} Poin` : `${h.points} Poin`}</div>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </div>
            </div>

            <div className="kc-rw-content-col">
              <div className="kc-rw-panel">
                <div className="kc-rw-panel-head"><span>VOUCHER KAMU</span><a onClick={() => {}}>Lihat Semua <ChevronRight size={13} /></a></div>
                {wallet.length === 0 ? (
                  <div className="kc-rw-empty">Belum ada voucher. Tukar poin kamu untuk mendapatkan voucher.</div>
                ) : (
                  <div className="kc-rw-vouchers">
                    <Stagger>
                      {wallet.slice(0, 3).map((v, i) => (
                        <div className="kc-rw-voucher-row" key={i}>
                          <Ticket size={17} className="kc-rw-voucher-icon" />
                          <div className="kc-rw-voucher-body">
                            <div className="kc-rw-voucher-value">{rp(v.value)}</div>
                            <div className="kc-rw-voucher-expiry">Berlaku s/d 31 Ags 2026</div>
                          </div>
                          <button className="kc-rw-voucher-use" onClick={() => go && go("services")}>Gunakan</button>
                        </div>
                      ))}
                    </Stagger>
                  </div>
                )}
              </div>

              <div className="kc-rw-panel">
                <div className="kc-rw-panel-head"><span>ACHIEVEMENT</span><a onClick={() => {}}>Lihat Semua <ChevronRight size={13} /></a></div>
                <div className="kc-rw-achievements">
                  <Stagger>
                    {ACHIEVEMENTS.map((a) => (
                      <div className={"kc-rw-achievement-row" + (a.unlocked ? "" : " locked")} key={a.id}>
                        <div className="kc-rw-achievement-icon"><a.icon size={16} /></div>
                        <div className="kc-rw-achievement-body">
                          <div className="kc-rw-achievement-title">{a.title}</div>
                          <div className="kc-rw-achievement-desc">{a.desc}</div>
                        </div>
                        <div className="kc-rw-achievement-status">{a.unlocked ? <Check size={16} /> : <Lock size={14} />}</div>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="kc-rw-bottom">
        <div className="kc-rw-bottom-banner">
          <div className="kc-rw-bottom-giftbox"><Gift size={22} /></div>
          <div className="kc-rw-bottom-text">
            <div className="kc-rw-bottom-title">Lebih Banyak Booking, Lebih Banyak Manfaat</div>
            <div className="kc-rw-bottom-sub">Kumpulkan poin dan tukarkan dengan berbagai keuntungan menarik!</div>
          </div>
          <button className="kc-btn kc-btn-brass kc-rw-bottom-cta" onClick={() => go && go("capsters")}>Booking Sekarang <ChevronRight size={15} /></button>
        </div>

        <div className="kc-rw-quickactions">
          <button className="kc-rw-quickaction" onClick={() => go && go("capsters")}><CalendarPlus size={18} /><span>Booking</span></button>
          <button className="kc-rw-quickaction" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Gift size={18} /><span>Tukar Poin</span></button>
          <button className="kc-rw-quickaction" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Tag size={18} /><span>Voucher Saya</span></button>
          <button className="kc-rw-quickaction" onClick={() => {}}><UserPlus size={18} /><span>Undang Teman</span></button>
        </div>
      </div>

      <div className="kc-rw-footnote">
        Setiap poin yang kamu kumpulkan semakin mendekatkanmu ke pengalaman terbaik di <BadgeCheck size={13} /> <b>Cartenz Barbershop</b>
      </div>
    </Page>
  );
}
