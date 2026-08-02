/* The full booking journey as one cohesive module: date/time -> service
   -> voucher -> payment -> processing -> success/fail -> in-store journey
   -> point reward -> review. Kept together since these steps are tightly
   coupled stages of a single flow rather than independent pages. */

import React, { useState, useEffect } from "react";
import { AlertTriangle, Calendar, Check, ChevronLeft, ChevronRight, Clock, HelpCircle, Lock, MessageSquare, PartyPopper, Percent, Plus, RotateCcw, Search, ShieldCheck, Star, Ticket } from "lucide-react";
import { Page, Stagger } from "../components/Common";
import { TicketStub } from "../components/TicketStub";
import { BOOK_STEPS, BRANCHES, DATES, JOURNEY_STEPS, PAYMENT_METHODS, SERVICE_ADDONS, SERVICES, TIME_SLOTS } from "../data/barbershop";
import { useCountUp } from "../hooks/useCountUp";
import { rupiah } from "../utils/format";

export function StepDots({ step }) {
  return (
    <div className="kc-stepper">
      {BOOK_STEPS.map((s, i) => (
        <div key={s} className={"kc-step" + (i === step ? " active" : i < step ? " done" : "")}>
          <span className="kc-step-num">{i < step ? <Check size={12} /> : i + 1}</span>{s}
        </div>
      ))}
    </div>
  );
}

/* Shared "Ringkasan Booking" + "Butuh Bantuan?" sidebar used across the
   date/time, service and voucher steps so every step reads consistently. */
function BookingSummarySide({ branchObj, capster, service, booking, total, onBack }) {
  return (
    <div className="kc-payment-col-left">
      <div className="kc-summary-card">
        <div className="kc-kicker" style={{ marginBottom: 10 }}>Ringkasan Booking</div>
        <div className="kc-summary-row"><span>Cabang</span><span>{branchObj.name}</span></div>
        <div className="kc-summary-row"><span>Capster</span><span>{capster.name}</span></div>
        {service && <div className="kc-summary-row"><span>Layanan</span><span>{service.name}</span></div>}
        {booking.date && <div className="kc-summary-row"><span>Tanggal</span><span>{booking.date}</span></div>}
        {booking.time && <div className="kc-summary-row"><span>Waktu</span><span>{booking.time}</span></div>}
        <div className="kc-summary-row total"><span>Total</span><span>{rupiah(total)}</span></div>
      </div>

      <div className="kc-help-card">
        <div className="kc-help-card-title"><HelpCircle size={15} /> Butuh Bantuan?</div>
        <p>Hubungi kami jika ada pertanyaan</p>
        <button className="kc-btn kc-btn-outline kc-btn-block">Hubungi Kami</button>
      </div>

      {onBack && (
        <button className="kc-btn kc-btn-outline kc-btn-block" onClick={onBack}>
          <ChevronLeft size={16} /> Kembali
        </button>
      )}
    </div>
  );
}

export function DateTimeStep({ branch, capster, booking, setBooking, go }) {
  const branchObj = BRANCHES.find((b) => b.id === branch);
  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Booking · {branchObj.name}</span><h2 className="kc-h2">PILIH TANGGAL &amp; JAM</h2><p className="kc-hero-sub">Pilih waktu terbaik untukmu</p></div>
      <StepDots step={0} />

      <div className="kc-flow-layout">
        <BookingSummarySide branchObj={branchObj} capster={capster} service={null} booking={booking} total={0} />

        <div className="kc-flow-main">
          <div className="kc-kicker" style={{ marginBottom: 8 }}>Pilih Tanggal</div>
          <div className="kc-date-row">
            <Stagger>{DATES.map((d) => <button key={d} className={"kc-pill dark" + (booking.date === d ? " active" : "")} onClick={() => setBooking({ ...booking, date: d })}>{d}</button>)}</Stagger>
          </div>
          <div className="kc-kicker" style={{ margin: "18px 0 8px" }}>Pilih Jam</div>
          <div className="kc-time-grid">
            <Stagger>{TIME_SLOTS.map((t) => <button key={t} className={"kc-pill dark" + (booking.time === t ? " active" : "")} onClick={() => setBooking({ ...booking, time: t })}>{t}</button>)}</Stagger>
          </div>

          {booking.date && booking.time && (
            <div className="kc-chosen-box kc-fade-in">
              <Calendar size={18} />
              <div>
                <div className="kc-chosen-label">Waktu yang kamu pilih</div>
                <div className="kc-chosen-value">{booking.date} · {booking.time}</div>
              </div>
            </div>
          )}

          <div className="kc-flow-nav" style={{ justifyContent: "flex-end" }}>
            <button className="kc-btn kc-btn-dark" disabled={!booking.date || !booking.time} onClick={() => go("service", { capster })}>
              Lanjut ke Layanan <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export function ServiceStep({ branch, capster, booking, setBooking, go }) {
  const branchObj = BRANCHES.find((b) => b.id === branch);
  const popular = SERVICES.filter((s) => s.popular);
  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const addonIds = booking.addonIds || [];
  const addonTotal = SERVICE_ADDONS.filter((a) => addonIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const total = (service?.price || 0) + addonTotal;

  const toggleAddon = (id) => {
    const next = addonIds.includes(id) ? addonIds.filter((x) => x !== id) : [...addonIds, id];
    setBooking({ ...booking, addonIds: next });
  };

  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Booking · {branchObj.name}</span><h2 className="kc-h2">PILIH LAYANAN</h2><p className="kc-hero-sub">Pilih layanan yang sesuai dengan kebutuhanmu</p></div>
      <StepDots step={1} />

      <div className="kc-flow-layout">
        <BookingSummarySide branchObj={branchObj} capster={capster} service={service} booking={booking} total={total} onBack={() => go("dateTime", { capster })} />

        <div className="kc-flow-main">
          <div className="kc-kicker" style={{ marginBottom: 10 }}>Layanan Populer</div>
          <div className="kc-service-grid">
            <Stagger>
              {popular.map((s) => {
                const Icon = s.icon || Star;
                const active = booking.serviceId === s.id;
                return (
                  <button key={s.id} className={"kc-service-card" + (active ? " active" : "")} onClick={() => setBooking({ ...booking, serviceId: s.id })}>
                    <div className="kc-service-card-thumb">
                      <Icon size={26} />
                      {active && <span className="kc-service-card-check"><Check size={13} /></span>}
                    </div>
                    <div className="kc-service-card-body">
                      <div className="kc-service-card-name">{s.name}</div>
                      <div className="kc-service-card-desc">{s.desc}</div>
                      <div className="kc-service-card-foot">
                        <span><Clock size={12} style={{ verticalAlign: -2 }} /> {s.duration}</span>
                        <span className="kc-service-card-price">{rupiah(s.price)}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </Stagger>
          </div>

          <div className="kc-kicker" style={{ margin: "22px 0 10px" }}>Layanan Tambahan</div>
          <div className="kc-addon-grid">
            <Stagger>
              {SERVICE_ADDONS.map((a) => {
                const Icon = a.icon;
                const active = addonIds.includes(a.id);
                return (
                  <div key={a.id} className={"kc-addon-row" + (active ? " active" : "")}>
                    <span className="kc-addon-icon"><Icon size={16} /></span>
                    <span className="kc-addon-text">
                      <span className="kc-service-name">{a.name}</span>
                      <span className="kc-capster-meta">{a.desc}</span>
                    </span>
                    <span className="kc-addon-price">+{rupiah(a.price)}</span>
                    <button className={"kc-addon-btn" + (active ? " active" : "")} onClick={() => toggleAddon(a.id)}>
                      {active ? <Check size={15} /> : <Plus size={15} />}
                    </button>
                  </div>
                );
              })}
            </Stagger>
          </div>

          <div className="kc-flow-nav" style={{ justifyContent: "flex-end" }}>
            <button className="kc-btn kc-btn-dark" disabled={!booking.serviceId} onClick={() => go("voucher", { capster })}>
              Lanjut ke Voucher <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export function VoucherStep({ branch, capster, booking, wallet, appliedVoucher, setAppliedVoucher, go }) {
  const branchObj = BRANCHES.find((b) => b.id === branch);
  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const addonIds = booking.addonIds || [];
  const addonTotal = SERVICE_ADDONS.filter((a) => addonIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const subtotal = service.price + addonTotal;
  const [code, setCode] = useState("");

  const options = [
    ...wallet.map((v) => ({ id: v.id, label: v.label, type: v.type, value: v.value, max: v.max, min: v.min, expiry: v.expiry })),
    { id: "NEWMEMBER10", label: "Diskon 10% Semua Layanan", type: "percent", value: 10, max: 30000, min: 50000, expiry: "Hingga 30 Jun 2025" },
    { id: "HAIR15", label: "Diskon 15% Hair Treatment", type: "percent", value: 15, max: 60000, min: 100000, expiry: "Hingga 30 Jun 2025" },
    { id: "FLAT20", label: "Potongan Rp 20.000", type: "flat", value: 20000, min: 120000, expiry: "Hingga 30 Jun 2025" },
  ];
  const computeDiscount = (v) => {
    if (!v) return 0;
    if (v.type === "flat") return Math.min(v.value, subtotal);
    const raw = subtotal * (v.value / 100);
    return Math.min(raw, v.max || raw);
  };
  const discount = computeDiscount(appliedVoucher);
  const total = Math.max(subtotal - discount, 0);

  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Booking · {branchObj.name}</span><h2 className="kc-h2">GUNAKAN VOUCHER</h2><p className="kc-hero-sub">Pilih voucher untuk mendapatkan potongan harga</p></div>
      <StepDots step={2} />

      <div className="kc-voucher-layout">
        <BookingSummarySide branchObj={branchObj} capster={capster} service={service} booking={booking} total={subtotal} />

        <div className="kc-flow-main">
          <div className="kc-voucher-grid">
            <div className="kc-payment-col-mid">
              <div className="kc-voucher-search">
                <input className="kc-input" placeholder="Masukkan kode voucher (Contoh: CARTENZ10)" value={code} onChange={(e) => setCode(e.target.value)} />
                <button className="kc-btn kc-btn-dark">Gunakan</button>
              </div>

              <div className="kc-kicker" style={{ margin: "16px 0 8px" }}>Voucher Tersedia</div>
              <div className="kc-voucher-list">
                <Stagger>
                  {options.map((v) => (
                    <button key={v.id} className={"kc-voucher-card" + (appliedVoucher?.id === v.id ? " active" : "")} onClick={() => setAppliedVoucher(appliedVoucher?.id === v.id ? null : v)}>
                      <div className="kc-voucher-card-value">{v.type === "percent" ? `${v.value}%` : <>Rp&nbsp;{Math.round(v.value / 1000)}RB</>}</div>
                      <div className="kc-voucher-card-body">
                        <div className="kc-service-name">{v.label}</div>
                        <div className="kc-capster-meta">{v.min ? `Min. transaksi ${rupiah(v.min)}` : "Tanpa minimum transaksi"}</div>
                        {v.expiry && <div className="kc-capster-meta">{v.expiry}</div>}
                      </div>
                      <span className={"kc-radio" + (appliedVoucher?.id === v.id ? " checked" : "")}>{appliedVoucher?.id === v.id && <Check size={12} />}</span>
                    </button>
                  ))}
                </Stagger>
              </div>
            </div>

            <div className="kc-payment-col-right">
              <div className="kc-summary-card">
                <div className="kc-kicker" style={{ marginBottom: 10 }}>Ringkasan Pembayaran</div>
                <div className="kc-summary-row"><span>Total Layanan</span><span>{rupiah(subtotal)}</span></div>
                {appliedVoucher && <div className="kc-summary-row" style={{ color: "var(--kc-sage)" }}><span>Voucher ({appliedVoucher.type === "percent" ? `${appliedVoucher.value}% OFF` : "Diskon"})</span><span>-{rupiah(discount)}</span></div>}
                <div className="kc-summary-row total"><span>{appliedVoucher ? "Total Setelah Diskon" : "Total"}</span><span>{rupiah(total)}</span></div>
              </div>
              {appliedVoucher && discount > 0 && (
                <div className="kc-hemat-box kc-fade-in">
                  <Percent size={16} />
                  <div>
                    <div className="kc-chosen-label">Hemat {rupiah(discount)}</div>
                    <div className="kc-capster-meta">dengan voucher ini</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="kc-flow-nav">
            <button className="kc-btn kc-btn-outline" onClick={() => go("service", { capster })}><ChevronLeft size={16} /> Kembali</button>
            <button className="kc-btn kc-btn-dark" onClick={() => go("payment", { capster })}>
              Lanjut ke Pembayaran <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export function PaymentStep({ branch, capster, booking, appliedVoucher, method, setMethod, go }) {
  const branchObj = BRANCHES.find((b) => b.id === branch);
  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const addonIds = booking.addonIds || [];
  const addonTotal = SERVICE_ADDONS.filter((a) => addonIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const subtotal = service.price + addonTotal;
  const discount = appliedVoucher ? (appliedVoucher.type === "flat" ? Math.min(appliedVoucher.value, subtotal) : Math.min(subtotal * (appliedVoucher.value / 100), appliedVoucher.max || 999999)) : 0;
  const total = Math.max(subtotal - discount, 0);

  return (
    <Page className="kc-section">
      <div className="kc-section-head">
        <span className="kc-kicker">Booking · {branchObj.name}</span>
        <h2 className="kc-h2">PEMBAYARAN</h2>
        <p className="kc-hero-sub">Pilih metode pembayaran yang kamu inginkan</p>
      </div>
      <StepDots step={3} />

      <div className="kc-payment-layout">
        {/* LEFT — ringkasan booking + bantuan + kembali */}
        <div className="kc-payment-col-left">
          <div className="kc-summary-card">
            <div className="kc-kicker" style={{ marginBottom: 10 }}>Ringkasan Booking</div>
            <div className="kc-summary-row"><span>Cabang</span><span>{branchObj.name}</span></div>
            <div className="kc-summary-row"><span>Capster</span><span>{capster.name}</span></div>
            <div className="kc-summary-row"><span>Layanan</span><span>{service.name}</span></div>
            <div className="kc-summary-row"><span>Tanggal</span><span>{booking.date}</span></div>
            <div className="kc-summary-row"><span>Waktu</span><span>{booking.time}</span></div>
            <div className="kc-summary-row total"><span>Total</span><span>{rupiah(total)}</span></div>
          </div>

          <div className="kc-help-card">
            <div className="kc-help-card-title"><HelpCircle size={15} /> Butuh Bantuan?</div>
            <p>Hubungi kami jika ada pertanyaan</p>
            <button className="kc-btn kc-btn-outline kc-btn-block">Hubungi Kami</button>
          </div>

          <button className="kc-btn kc-btn-outline kc-btn-block" onClick={() => go("voucher", { capster })}>
            <ChevronLeft size={16} /> Kembali
          </button>
        </div>

        {/* MIDDLE — pilih metode pembayaran */}
        <div className="kc-payment-col-mid">
          <div className="kc-kicker" style={{ marginBottom: 10 }}>Pilih Metode Pembayaran</div>
          <div className="kc-payment-list">
            <Stagger>
              {PAYMENT_METHODS.map((m) => {
                const Icon = m.icon;
                return (
                  <button key={m.id} className={"kc-payment-row" + (method === m.id ? " active" : "")} onClick={() => setMethod(m.id)}>
                    <span className="kc-payment-row-icon"><Icon size={18} /></span>
                    <span className="kc-payment-row-text">
                      <span className="kc-service-name">{m.name}</span>
                      <span className="kc-capster-meta">{m.desc}</span>
                    </span>
                    <span className={"kc-radio" + (method === m.id ? " checked" : "")}>{method === m.id && <Check size={12} />}</span>
                  </button>
                );
              })}
            </Stagger>
          </div>
        </div>

        {/* RIGHT — detail pembayaran + keamanan + bayar sekarang */}
        <div className="kc-payment-col-right">
          <div className="kc-summary-card">
            <div className="kc-kicker" style={{ marginBottom: 10 }}>Detail Pembayaran</div>
            <div className="kc-summary-row"><span>Total Layanan</span><span>{rupiah(subtotal)}</span></div>
            {appliedVoucher && <div className="kc-summary-row" style={{ color: "var(--kc-sage)" }}><span>Voucher ({appliedVoucher.type === "percent" ? `${appliedVoucher.value}% OFF` : "Diskon"})</span><span>-{rupiah(discount)}</span></div>}
            <div className="kc-summary-row total"><span>Total Bayar</span><span>{rupiah(total)}</span></div>
          </div>

          <div className="kc-security-note">
            <ShieldCheck size={18} />
            <p>Transaksi kamu aman dan terenkripsi. Informasi pembayaran dijaga kerahasiaannya.</p>
          </div>

          <button className="kc-btn kc-btn-dark kc-btn-block" disabled={!method} onClick={() => go("processing", { capster, total })}>
            <Lock size={14} /> Bayar Sekarang
          </button>
        </div>
      </div>
    </Page>
  );
}

export function ProcessingStep({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(Math.random() > 0.22), 1700);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <Page className="kc-section kc-center-wrap">
      <div className="kc-spinner" />
      <p className="kc-hero-sub" style={{ marginTop: 18 }}>Memproses pembayaran kamu...</p>
    </Page>
  );
}

export function PaymentFailed({ go, capster }) {
  return (
    <Page className="kc-section kc-center-wrap">
      <div className="kc-result-icon fail"><AlertTriangle size={30} /></div>
      <h2 className="kc-h2" style={{ marginTop: 14 }}>PEMBAYARAN GAGAL</h2>
      <p className="kc-hero-sub" style={{ textAlign: "center", maxWidth: 360 }}>Transaksi tidak dapat diproses oleh metode pembayaran ini. Silakan pilih metode lain.</p>
      <button className="kc-btn kc-btn-dark" style={{ marginTop: 18 }} onClick={() => go("payment", { capster })}>
        <RotateCcw size={16} /> Pilih Metode Lagi
      </button>
    </Page>
  );
}

export function PaymentSuccess({ go, total, capster, method }) {
  return (
    <Page className="kc-section kc-center-wrap">
      <div className="kc-result-icon ok"><Check size={30} /></div>
      <h2 className="kc-h2" style={{ marginTop: 14 }}>PEMBAYARAN BERHASIL</h2>
      <p className="kc-hero-sub" style={{ textAlign: "center", maxWidth: 360 }}>Total {rupiah(total)} terbayar via {PAYMENT_METHODS.find(m => m.id === method)?.name}. Booking kamu sudah dikonfirmasi.</p>
      <button className="kc-btn kc-btn-dark" style={{ marginTop: 18 }} onClick={() => go("bookingSuccess", { capster })}>
        Lihat Booking Saya <ChevronRight size={16} />
      </button>
    </Page>
  );
}

export function BookingSuccessTicket({ branch, capster, booking, total, method, go }) {
  const branchObj = BRANCHES.find((b) => b.id === branch);
  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const methodObj = PAYMENT_METHODS.find((m) => m.id === method);
  const queueNo = "A-0" + (14 + (branch.length % 5));
  return (
    <Page className="kc-section kc-center-wrap">
      <TicketStub
        big
        queueNo={queueNo}
        lines={[["Cabang", branchObj.name], ["Capster", capster.name], ["Layanan", service.name], ["Jadwal", `${booking.date}, ${booking.time}`], ["Bayar", methodObj?.name], ["Total", rupiah(total)]]}
      />
      <p className="kc-hero-sub" style={{ textAlign: "center", marginTop: 20 }}>Booking berhasil! Tunjukkan nomor antrian ini ke resepsionis saat tiba di cabang.</p>
      <button className="kc-btn kc-btn-dark" style={{ marginTop: 18 }} onClick={() => go("journey")}>
        Mulai Kunjungan <ChevronRight size={16} />
      </button>
    </Page>
  );
}

/* ================================================================== */
/* POST-BOOKING JOURNEY:                                                */
/* Datang -> Check-in -> Proses Haircut -> Selesai -> Poin -> Review    */
/* ================================================================== */

export function JourneyTimeline({ onFinishToReward }) {
  const [step, setStep] = useState(0);
  const current = JOURNEY_STEPS[step];
  const Icon = current.icon;
  const isLast = step === JOURNEY_STEPS.length - 1;

  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Kunjungan</span><h2 className="kc-h2">STATUS BOOKING</h2></div>
      <div className="kc-journey-track">
        {JOURNEY_STEPS.map((s, i) => (
          <div key={s.key} className={"kc-journey-dot" + (i < step ? " done" : i === step ? " active" : "")}>
            <span>{i < step ? <Check size={11} /> : i + 1}</span>
          </div>
        ))}
      </div>
      <div className="kc-journey-card kc-fade-in" key={current.key}>
        <div className="kc-journey-icon"><Icon size={30} /></div>
        <h3 className="kc-h2" style={{ fontSize: 22 }}>{current.title.toUpperCase()}</h3>
        <p className="kc-hero-sub" style={{ textAlign: "center", maxWidth: 380 }}>{current.desc}</p>
        <button className="kc-btn kc-btn-dark" style={{ marginTop: 16 }} onClick={() => isLast ? onFinishToReward() : setStep(step + 1)}>
          {current.cta} <ChevronRight size={16} />
        </button>
      </div>
    </Page>
  );
}

export function PointRewardScreen({ earned, onNext }) {
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), 200); return () => clearTimeout(t); }, []);
  const count = useCountUp(earned, 1000, started);
  return (
    <Page className="kc-section kc-center-wrap">
      <div className="kc-confetti-wrap">
        <PartyPopper size={34} />
        {[...Array(10)].map((_, i) => (
          <span key={i} className="kc-confetti" style={{ left: `${i * 10}%`, animationDelay: `${i * 90}ms`, background: i % 2 ? "var(--kc-accent)" : "var(--kc-brass)" }} />
        ))}
      </div>
      <h2 className="kc-h2" style={{ marginTop: 10 }}>POIN REWARD DIDAPAT!</h2>
      <div className="kc-reward-count">+{count}</div>
      <p className="kc-hero-sub">poin ditambahkan ke akun kamu</p>
      <button className="kc-btn kc-btn-dark" style={{ marginTop: 18 }} onClick={onNext}>Beri Rating & Review <ChevronRight size={16} /></button>
    </Page>
  );
}

export function ReviewScreen({ capster, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Page className="kc-section kc-center-wrap">
        <div className="kc-result-icon ok"><Check size={30} /></div>
        <h2 className="kc-h2" style={{ marginTop: 14 }}>TERIMA KASIH!</h2>
        <p className="kc-hero-sub" style={{ textAlign: "center" }}>Ulasan kamu membantu capster & pelanggan lain.</p>
        <button className="kc-btn kc-btn-dark" style={{ marginTop: 18 }} onClick={onSubmit}>Kembali ke Beranda</button>
      </Page>
    );
  }

  return (
    <Page className="kc-section kc-center-wrap">
      <div className="kc-journey-icon"><MessageSquare size={26} /></div>
      <h2 className="kc-h2" style={{ marginTop: 10 }}>RATING & REVIEW</h2>
      <p className="kc-hero-sub">Bagaimana pengalamanmu dengan {capster.name}?</p>
      <div className="kc-star-row">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} className="kc-star-btn" onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)}>
            <Star size={30} fill={(hover || rating) >= n ? "var(--kc-brass)" : "none"} color="var(--kc-brass)" strokeWidth={1.5} />
          </button>
        ))}
      </div>
      <textarea className="kc-input kc-textarea" placeholder="Ceritakan pengalaman potong rambutmu..." value={text} onChange={(e) => setText(e.target.value)} />
      <button className="kc-btn kc-btn-dark kc-btn-block" disabled={!rating} onClick={() => setSubmitted(true)}>Kirim Review</button>
    </Page>
  );
}

/* ================================================================== */
/* POINTS PAGE                                                         */
/* ================================================================== */

