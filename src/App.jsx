/* App shell: owns all top-level navigation/booking state and renders
   whichever "stage" (page) is currently active, wrapped by the shared
   Header and Footer. */

import "./index.css";
import React, { useState } from "react";
import { AuthGate } from "./components/AuthGate";
import { Footer } from "./components/Footer";
import { Header } from "./components/Navbar";
import { REDEEMABLE_VOUCHERS, SERVICES } from "./data/barbershop";
import { BookingSuccessTicket, DateTimeStep, JourneyTimeline, PaymentFailed, PaymentStep, PaymentSuccess, PointRewardScreen, ProcessingStep, ReviewScreen, ServiceStep, VoucherStep } from "./pages/BookingFlow";
import { CapsterDetail } from "./pages/CapsterDetail";
import { CapstersPage } from "./pages/CapstersPage";
import { HistoryPage } from "./pages/HistoryPage";
import { Home } from "./pages/Home";
import { InspirationPage } from "./pages/InspirationPage";
import { PointsPage } from "./pages/PointsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PromoPage } from "./pages/PromoPage";
import { ServicesPage } from "./pages/ServicesPage";

export default function App() {
  const [stage, setStage] = useState("auth");
  const [menuOpen, setMenuOpen] = useState(false);
  const [branch, setBranch] = useState("kmg");
  const [userName, setUserName] = useState("");
  const [capster, setCapster] = useState(null);
  const [booking, setBooking] = useState({ date: null, time: null, serviceId: null, addonIds: [] });
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [method, setMethod] = useState(null);
  const [points, setPoints] = useState(320);
  const [wallet, setWallet] = useState(() => Array.from({ length: 5 }, () => REDEEMABLE_VOUCHERS[0]));
  const [lastTotal, setLastTotal] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const go = (next, payload = {}) => {
    if (payload.capster) setCapster(payload.capster);
    if (typeof payload.total === "number") setLastTotal(payload.total);
    setStage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEnter = (name, guest) => { setUserName(guest ? "" : name); go("home"); };

  const handleProcessed = (ok) => {
    if (ok) go("success", {}); else go("failed", { capster });
  };

  const resetBookingState = () => {
    setBooking({ date: null, time: null, serviceId: null, addonIds: [] });
    setAppliedVoucher(null);
    setMethod(null);
  };

  const finishJourneyToReward = () => {
    const service = SERVICES.find((s) => s.id === booking.serviceId);
    const earned = Math.max(10, Math.round((service?.price || 0) * 0.0002 * 100));
    setEarnedPoints(earned);
    setPoints((p) => p + earned);
    go("reward");
  };

  const backToHomeFresh = () => { resetBookingState(); setCapster(null); go("home"); };

  const handleLogout = () => {
    setUserName("");
    resetBookingState();
    setCapster(null);
    go("auth");
  };

  return (
    <div className="kc-root">
      {stage !== "auth" && (
        <Header stage={stage} go={(s) => { if (s !== stage) { if (["home","services","capsters","promo","inspiration","points","profile","history"].includes(s)) resetBookingState(); } go(s); }}
          branch={branch} setBranch={setBranch} points={points} menuOpen={menuOpen} setMenuOpen={setMenuOpen} userName={userName} onLogout={handleLogout} />
      )}

      {stage === "auth" && <AuthGate onEnter={handleEnter} />}
      {stage === "home" && <Home branch={branch} go={go} points={points} />}
      {stage === "services" && <ServicesPage go={go} />}
      {stage === "promo" && <PromoPage go={go} />}
      {stage === "inspiration" && <InspirationPage go={go} />}
      {stage === "capsters" && <CapstersPage branch={branch} setBranch={setBranch} go={go} />}
      {stage === "capsterDetail" && capster && <CapsterDetail capster={capster} go={go} />}
      {stage === "dateTime" && capster && <DateTimeStep branch={branch} capster={capster} booking={booking} setBooking={setBooking} go={go} />}
      {stage === "service" && capster && <ServiceStep branch={branch} capster={capster} booking={booking} setBooking={setBooking} go={go} />}
      {stage === "voucher" && capster && <VoucherStep branch={branch} capster={capster} booking={booking} wallet={wallet} appliedVoucher={appliedVoucher} setAppliedVoucher={setAppliedVoucher} go={go} />}
      {stage === "payment" && capster && <PaymentStep branch={branch} capster={capster} booking={booking} appliedVoucher={appliedVoucher} method={method} setMethod={setMethod} go={go} />}
      {stage === "processing" && <ProcessingStep onDone={handleProcessed} />}
      {stage === "failed" && capster && <PaymentFailed go={go} capster={capster} />}
      {stage === "success" && capster && <PaymentSuccess go={go} total={lastTotal} capster={capster} method={method} />}
      {stage === "bookingSuccess" && capster && <BookingSuccessTicket branch={branch} capster={capster} booking={booking} total={lastTotal} method={method} go={go} />}
      {stage === "journey" && <JourneyTimeline onFinishToReward={finishJourneyToReward} />}
      {stage === "reward" && <PointRewardScreen earned={earnedPoints} onNext={() => go("review")} />}
      {stage === "review" && capster && <ReviewScreen capster={capster} onSubmit={backToHomeFresh} />}
      {stage === "points" && <PointsPage points={points} wallet={wallet} setWallet={setWallet} setPoints={setPoints} userName={userName} go={go} />}
      {stage === "profile" && <ProfilePage userName={userName} points={points} branch={branch} go={go} />}
      {stage === "history" && <HistoryPage go={go} />}

      {stage !== "auth" && <Footer go={go} />}
    </div>
  );
}
