/* Booking history page — lifetime stats, filterable list, and a
   spending-summary / next-booking / support sidebar. */

import React, { useMemo, useState } from "react";
import {
  Calendar, CheckCircle2, ChevronDown, ChevronRight, Clock,
  Gift, Headphones, LayoutGrid, MessageCircle, Scissors, Wallet, XCircle,
} from "lucide-react";
import { Page, Stagger } from "../components/Common";
import { BOOKING_HISTORY, EXPENSE_SUMMARY, HISTORY_FILTERS, HISTORY_STATS } from "../data/barbershop";
import { rupiah } from "../utils/format";

const rp = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");
const FILTER_ICON = { Semua: LayoutGrid, Selesai: CheckCircle2, Dijadwalkan: Clock, Dibatalkan: XCircle };

export function HistoryPage({ go }) {
  const [filter, setFilter] = useState("Semua");
  const years = useMemo(() => ["Semua Tahun", ...Array.from(new Set(BOOKING_HISTORY.map((h) => h.date.split(" ").pop())))], []);
  const [year, setYear] = useState(years[0]);

  const rows = BOOKING_HISTORY.filter((h) =>
    (filter === "Semua" || h.status === filter) &&
    (year === "Semua Tahun" || h.date.endsWith(year))
  );

  const stats = [
    { icon: Calendar, tone: "green", value: HISTORY_STATS.totalBooking, label: "Total Booking", sub: "Sejak bergabung" },
    { icon: CheckCircle2, tone: "green", value: HISTORY_STATS.selesai, label: "Selesai", sub: `${HISTORY_STATS.selesaiPct}% dari total` },
    { icon: Clock, tone: "red", value: HISTORY_STATS.dibatalkan, label: "Dibatalkan", sub: `${HISTORY_STATS.dibatalkanPct}% dari total` },
    { icon: Wallet, tone: "green", value: rp(HISTORY_STATS.totalPembayaran), label: "Total Pembayaran", sub: "Semua transaksi" },
  ];

  return (
    <Page className="kc-section kc-rb">
      <div className="kc-rb-headrow">
        <div>
          <span className="kc-kicker">Akun Saya</span>
          <h2 className="kc-h2">RIWAYAT BOOKING</h2>
          <p className="kc-rw-sub">Lihat semua booking yang pernah kamu buat di Cartenz Barbershop.</p>
        </div>
        <div className="kc-rb-stats">
          {stats.map((s) => (
            <div className="kc-rb-stat" key={s.label}>
              <div className={"kc-rb-stat-icon tone-" + s.tone}><s.icon size={17} /></div>
              <div>
                <div className="kc-rb-stat-value">{s.value}</div>
                <div className="kc-rb-stat-label">{s.label}</div>
                <div className="kc-rb-stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="kc-rb-layout">
        <div className="kc-rb-main">
          <div className="kc-rb-toolbar">
            <div className="kc-rb-tabs">
              {HISTORY_FILTERS.map((f) => {
                const Icon = FILTER_ICON[f];
                return (
                  <button key={f} className={"kc-rb-tab" + (filter === f ? " active" : "")} onClick={() => setFilter(f)}>
                    <Icon size={14} /> {f}
                  </button>
                );
              })}
            </div>
            <div className="kc-rb-yearselect">
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                {years.map((y) => <option key={y} value={y}>{y === "Semua Tahun" ? y : `Tahun ${y}`}</option>)}
              </select>
              <ChevronDown size={14} />
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="kc-rw-empty">Belum ada booking dengan status "{filter}".</div>
          ) : (
            <div className="kc-rb-list">
              <Stagger>
                {rows.map((h) => (
                  <div key={h.id} className="kc-rb-row">
                    <div className="kc-rb-row-icon"><Scissors size={18} /></div>
                    <div className="kc-rb-row-main">
                      <div className="kc-rb-row-title">{h.service}</div>
                      <div className="kc-rb-row-meta">{h.capster} &nbsp;·&nbsp; {h.branch} &nbsp;·&nbsp; <Calendar size={11} /> {h.date} &nbsp;&nbsp; {h.time}</div>
                    </div>
                    <div className="kc-rb-row-side">
                      <div className="kc-rb-row-price">{rupiah(h.price)}</div>
                      <span className={"kc-status-badge" + (h.status === "Selesai" ? " done" : " cancel")}>
                        {h.status === "Selesai" ? <CheckCircle2 size={11} /> : <XCircle size={11} />} {h.status}
                      </span>
                    </div>
                    <ChevronRight size={16} className="kc-rb-row-chevron" />
                  </div>
                ))}
              </Stagger>
            </div>
          )}
        </div>

        <div className="kc-rb-side">
          <div className="kc-rb-next-card">
            <div className="kc-rb-next-icon"><Calendar size={20} /></div>
            <div className="kc-rb-next-title">Booking Berikutnya</div>
            <div className="kc-rb-next-desc">Kamu belum memiliki booking yang dijadwalkan.</div>
            <button className="kc-btn kc-btn-primary kc-btn-block" onClick={() => go("capsters")}>Buat Booking Sekarang</button>
          </div>

          <div className="kc-rb-summary-card">
            <div className="kc-rb-summary-head">
              <span>Ringkasan Pengeluaran</span>
              <div className="kc-rb-yearselect kc-rb-yearselect-sm">
                <select defaultValue="Tahun Ini"><option>Tahun Ini</option></select>
                <ChevronDown size={13} />
              </div>
            </div>
            <div className="kc-rb-summary-row"><span>Total Pembayaran</span><b className="accent">{rp(EXPENSE_SUMMARY.totalPembayaran)}</b></div>
            <div className="kc-rb-summary-row"><span>Rata-rata per booking</span><b>{rp(EXPENSE_SUMMARY.rataRata)}</b></div>
            <div className="kc-rb-summary-row"><span>Booking Terbanyak</span><b>{EXPENSE_SUMMARY.bookingTerbanyak} booking</b></div>
            <button className="kc-rb-hemat-pill">
              <Gift size={15} /> Hemat {rp(EXPENSE_SUMMARY.hemat)} dengan voucher & poin <ChevronRight size={14} />
            </button>
          </div>

          <div className="kc-rb-help-card">
            <div className="kc-rb-help-text">
              <div className="kc-rb-help-title">Butuh Bantuan?</div>
              <div className="kc-rb-help-desc">Hubungi kami jika ada pertanyaan</div>
              <button className="kc-rb-whatsapp-btn"><MessageCircle size={15} /> Chat WhatsApp <ChevronRight size={13} /></button>
            </div>
            <div className="kc-rb-help-avatar"><Headphones size={22} /></div>
          </div>
        </div>
      </div>
    </Page>
  );
}
