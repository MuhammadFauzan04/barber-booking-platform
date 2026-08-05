import React from "react";
import { ArrowUpRight } from "lucide-react";
import { StatCard, Badge } from "../components/ui";
import { DASHBOARD_STATS, REVENUE_TREND, BRANCH_LOAD, MONITORING_BOOKINGS, rupiah } from "../adminData";

export function Dashboard({ go }) {
  const maxRevenue = Math.max(...REVENUE_TREND.map((d) => d.value));
  const latestBookings = MONITORING_BOOKINGS.slice(0, 6);

  return (
    <div className="adm-page">
      <div className="adm-stat-grid">
        {DASHBOARD_STATS.map((s) => <StatCard key={s.id} {...s} />)}
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
            {BRANCH_LOAD.map((b) => (
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
            <div className="adm-card-count">Aktivitas booking real-time dari semua cabang</div>
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
