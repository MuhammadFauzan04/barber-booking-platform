/* Perforated "ticket" visual used for bookings, vouchers, receipts. */

import React from "react";
import { Scissors } from "lucide-react";

export function TicketStub({ lines, big, queueNo }) {
  return (
    <div className={"kc-stub" + (big ? " big" : "")}>
      {queueNo && (
        <>
          <div className="kc-stub-top"><Scissors size={16} /><span>CARTENZ.BARBER</span></div>
          <div className="kc-stub-queue">{queueNo}</div>
          <div className="kc-capster-meta" style={{ textAlign: "center" }}>NOMOR ANTRIAN</div>
          <div className="kc-stub-perf" />
        </>
      )}
      {lines.map(([k, v], i) => <div key={i} className="kc-stub-row"><span>{k}</span><span>{v}</span></div>)}
      {queueNo && <div className="kc-stub-barcode" />}
    </div>
  );
}

/* ================================================================== */
/* BOOKING FLOW — order follows the flowchart:                         */
/* Pilih Tanggal & Jam -> Pilih Layanan -> Gunakan Voucher? -> Bayar    */
/* ================================================================== */

