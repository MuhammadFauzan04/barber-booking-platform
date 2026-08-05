import React from "react";
import { ArrowUpRight } from "lucide-react";
import { StatCard, Badge } from "../components/ui";
import { DASHBOARD_STATS, REVENUE_TREND, BRANCH_LOAD, MONITORING_BOOKINGS, rupiah } from "../adminData";
import { isSuperScope, scopeByBranch } from "../scope";

export function Dashboard({ go, user }) {
  const superScope = isSuperScope(user);
  const maxRevenue = Math.max(...REVENUE_TREND.map((d) => d.value));
  const scopedBookings = scopeByBranch(MONITORING_BOOKINGS, user, ["branch"]);
  const latestBookings = scopedBookings.slice(0, 6);
  const branchLoad = superScope ? BRANCH_LOAD : BRANCH_LOAD.filter((b) => b.name === user.branch);

  const stats = superScope
    ? DASHBOARD_STATS
    : [
        { id: "booking", label: "Booking Hari Ini", value: String(branchLoad[0]?.bookingHariIni ?? 0), trend: `Cabang ${user.branch}`, tone: "neutral" },
        { id: "revenue", label: "Pendapatan Hari Ini", value: rupiah(scopedBookings.filter((b) => b.status === "Selesai").reduce((s, b) => s + b.price, 0)), trend: "Cabang ini saja", tone: "up" },
        { id: "booking-total", label: "Total Booking Tercatat", value: scopedBookings.length, trend: "Termasuk walk-in", tone: "neutral" },
      ];

  return (
    <div className="adm-page">
      {!superScope && (
        <div className="adm-locked-note">Menampilkan data khusus cabang <b>{user.branch}</b> — login sebagai Super Admin untuk melihat semua cabang.</div>
      )}
      <div className="adm-stat-grid">
        {stats.map((s) => <StatCard key={s.id} {...s} />)}
      </div>

      <div className="adm-grid-2">
        <div className="adm-card">
          <div className="adm-card-head">
            <div><h3 className="adm-card-title">Pendapatan 7 Hari Terakhir</h3></div>
          </div>
          <div className="adm-bar-chart">
            {REVENUE_TREND.map((d) => (
              <div key={d.day} className="adm-bar-col">
                <div className="adm-bar-track">
                  <div className="adm-bar-fill" style={{ height: `${(d.value / maxRevenue) * 100}%` }} title={rupiah(d.value)} />
                </div>
                <span className="adm-bar-label">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-head">
            <div><h3 className="adm-card-title">Beban Booking per Cabang</h3></div>
          </div>
          <div className="adm-branch-load">
            {branchLoad.map((b) => (
              <div key={b.id} className="adm-branch-load-row">
                <div className="adm-branch-load-top">
                  <span>{b.name}</span>
                  <span>{b.bookingHariIni} booking</span>
                </div>
                <div className="adm-progress-track">
                  <div className="adm-progress-fill" style={{ width: `${b.kapasitasPct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title">Booking Terbaru</h3>
            <div className="adm-card-count">{superScope ? "Aktivitas booking real-time dari semua cabang" : `Aktivitas booking di cabang ${user.branch}`}</div>
          </div>
          <button className="adm-btn ghost" onClick={() => go("monitoring-booking")}>
            Lihat semua <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>ID</th><th>Customer</th><th>Layanan</th><th>Cabang</th><th>Jadwal</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {latestBookings.map((b) => (
                <tr key={b.id}>
                  <td className="adm-mono">{b.id}</td>
                  <td>{b.customer}</td>
                  <td>{b.service}</td>
                  <td>{b.branch}</td>
                  <td>{b.date}, {b.time}</td>
                  <td><Badge>{b.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
