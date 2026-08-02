/* "Usap Kaca" — the 5-question quiz + fogged-glass capster match reveal. */

import React, { useState } from "react";
import { ArrowRight, Brain, Check, ChevronLeft, Clock, CreditCard, Crown, Flame, Gift, Hand, Lock, MessageCircle, RotateCcw, Scissors, Shield, Sparkles, Star, Users } from "lucide-react";
import { Reveal } from "./Common";
import { BRANCHES, CAPSTERS, MIRROR_STEPS, QUIZ_QUESTIONS, TESTIMONIALS, TRUST_AVATAR_INITIALS } from "../data/barbershop";

export function WaveIcon({ level = 1 }) {
  const paths = {
    1: "M2 12 H22",
    2: "M2 12 C6 6, 10 18, 14 12 S22 6, 22 12",
    3: "M2 12 C4 6, 7 18, 10 12 S14 6, 16 12 S20 18, 22 12",
    4: "M1 12 C2 8, 4 16, 6 12 S8 8, 10 12 S12 16, 14 12 S16 8, 18 12 S20 16, 22 12 S23 9,24 12",
  };
  return (
    <svg width="26" height="24" viewBox="0 0 24 24" fill="none">
      <path d={paths[level] || paths[1]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Five short questions asked before the glass unlocks. Answers feed both
// the reveal's score (see scoreCapster) and the personalized "reasons"
// copy shown on the result card.
export function scoreCapster(c, answers = {}) {
  let score = 56 + Math.random() * 6;
  if (c.badge === "TERSEDIA HARI INI") score += 4;
  score += (c.rating - 4.5) * 14;
  if (answers.style && c.tags.includes(answers.style)) score += 10;
  if (answers.priority === "rating") score += (c.rating - 4.5) * 10;
  if (answers.priority === "pengalaman") score += Math.min(c.years, 8) * 1.2;
  if (answers.priority === "cepat" && c.badge === "TERSEDIA HARI INI") score += 8;
  if (answers.budget === "premium" && c.tags.includes("Perm")) score += 6;
  if (answers.budget === "low" && (c.tags.includes("Buzz Cut") || c.tags.includes("Classic Taper"))) score += 6;
  return Math.max(58, Math.min(99, Math.round(score)));
}

export function CapsterMatchExperience({ go }) {
  // "quiz" -> 5 short questions gate the glass; "mirror" -> the existing
  // fogged-glass reveal, now unlocked and personalized by the answers.
  const [phase, setPhase] = useState("quiz");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [wiped, setWiped] = useState(false);
  const [ranked, setRanked] = useState(null);
  // Brief "unlocking" state plays an exit animation on the quiz panel
  // before swapping to the mirror phase, so the handoff reads as one
  // continuous motion instead of an instant cut.
  const [unlocking, setUnlocking] = useState(false);

  const currentQ = QUIZ_QUESTIONS[qIndex];
  const isLastQ = qIndex === QUIZ_QUESTIONS.length - 1;

  const selectOption = (qId, value) => setAnswers((a) => ({ ...a, [qId]: value }));

  const goNext = () => {
    if (!answers[currentQ.id]) return;
    if (isLastQ) {
      setUnlocking(true);
      setTimeout(() => {
        setPhase("mirror");
        setUnlocking(false);
      }, 420);
    } else {
      setQIndex((i) => i + 1);
    }
  };

  const goBack = () => setQIndex((i) => Math.max(0, i - 1));

  const restartQuiz = () => {
    setPhase("quiz");
    setQIndex(0);
    setAnswers({});
    setWiped(false);
    setRanked(null);
  };

  const computeMatch = () => {
    const scored = CAPSTERS.map((c) => ({ c, score: scoreCapster(c, answers) })).sort((a, b) => b.score - a.score);
    setRanked(scored);
    setWiped(true);
  };

  const restart = () => {
    setWiped(false);
    setRanked(null);
  };

  const match = ranked ? ranked[0] : null;
  const top3 = ranked ? ranked.slice(0, 3) : [];
  const firstName = match ? match.c.name.split(" ")[0] : "";
  const branchName = match ? BRANCHES.find((b) => b.id === match.c.branch)?.name : "";
  const quote = match
    ? (TESTIMONIALS.find((t) => t.branch === branchName)?.quote || "Hasilnya selalu rapi dan sesuai referensi yang aku bawa.")
    : "";
  // Reasons blend the matched capster's own profile (tags + rating) with
  // the customer's own quiz answers, so the copy feels personalized
  // instead of generic.
  const reasons = match
    ? [
        answers.hairType ? `Cocok untuk tipe rambut ${answers.hairType.toLowerCase()}` : `Kamu pernah memilih gaya ${match.c.tags[0]}`,
        `Spesialis gaya ${(answers.style && match.c.tags.includes(answers.style)) ? answers.style : (match.c.tags[1] || match.c.tags[0])}`,
        answers.priority === "harga" ? "Harga layanan sesuai dengan budget yang kamu pilih" : "Harga layanan sesuai dengan budget rata-rata pelanggan",
        answers.priority === "pengalaman" ? `Berpengalaman ${match.c.years}+ tahun di bidangnya` : "Sering dipilih pelanggan usia 20–30 tahun",
      ]
    : [];

  if (phase === "quiz") {
    return (
      <section className="kc-section" style={{ paddingTop: 30, paddingBottom: 30 }}>
        <Reveal className={"kc-quiz-panel" + (unlocking ? " unlocking" : "")}>
          <div className="kc-quiz-left">
            <span className="kc-eyebrow"><Sparkles size={12} /> Pengalaman Baru</span>
            <h2 className="kc-h2" style={{ marginTop: 10 }}>
              Usap Kaca,<br /><span style={{ color: "var(--kc-accent-dark)" }}>Temukan Capster-Mu</span>
            </h2>
            <p className="kc-hero-sub" style={{ maxWidth: 460, marginTop: 8 }}>
              Jawab 5 pertanyaan singkat ini agar kami bisa menemukan capster yang paling cocok untuk
              gaya rambut terbaikmu.
            </p>

            <div className="kc-qz-steps">
              {QUIZ_QUESTIONS.map((q, i) => (
                <React.Fragment key={q.id}>
                  <div className={"kc-qz-step-circle" + (i === qIndex ? " active" : i < qIndex ? " done" : "")}>
                    {i < qIndex ? <Check size={12} /> : i + 1}
                  </div>
                  {i < QUIZ_QUESTIONS.length - 1 && <div className={"kc-qz-step-line" + (i < qIndex ? " done" : "")} />}
                </React.Fragment>
              ))}
            </div>

            <div className="kc-quiz-card2">
              <div className="kc-quiz-qcontent" key={currentQ.id}>
                <div className="kc-quiz-step-label">PERTANYAAN {qIndex + 1} DARI {QUIZ_QUESTIONS.length}</div>
                <div className="kc-quiz-question">{currentQ.label}</div>
                <p className="kc-quiz-sub">{currentQ.sub}</p>

                <div className="kc-quiz-grid">
                  {currentQ.options.map((opt) => {
                    const active = answers[currentQ.id] === opt.value;
                    return (
                      <button key={opt.value} className={"kc-quiz-opt2" + (active ? " active" : "")} onClick={() => selectOption(currentQ.id, opt.value)}>
                        {active && <span className="kc-quiz-opt2-check"><Check size={12} /></span>}
                        <span className="kc-quiz-opt2-icon">
                          {opt.wave ? <WaveIcon level={opt.wave} /> : opt.Icon ? <opt.Icon size={22} strokeWidth={1.6} /> : null}
                        </span>
                        <span className="kc-quiz-opt2-title">{opt.title}</span>
                        <span className="kc-quiz-opt2-desc">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="kc-quiz-tip"><Sparkles size={13} /> Jawabanmu membantu kami memberikan rekomendasi yang lebih akurat.</div>
              </div>

              <div className="kc-quiz-nav">
                {qIndex > 0 && (
                  <button className="kc-btn-ghost-sm" onClick={goBack}><ChevronLeft size={14} /> Kembali</button>
                )}
                <button
                  className="kc-btn kc-btn-dark kc-btn-sm"
                  style={{ marginLeft: "auto", opacity: answers[currentQ.id] ? 1 : 0.45, pointerEvents: answers[currentQ.id] ? "auto" : "none" }}
                  onClick={goNext}
                >
                  {isLastQ ? "Buka Kaca" : "Selanjutnya"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="kc-glass-locked">
            <div className="kc-glass-backdrop" />
            <div className="kc-glass-locked-badge"><Lock size={13} /> Lengkapi {QUIZ_QUESTIONS.length} pertanyaan untuk membuka kaca</div>
            <div className="kc-glass-fog" style={{ opacity: 1 }}>
              <Hand size={30} className="kc-mirror-hint" />
              <div className="kc-glass-title">USAP KACA SEKARANG</div>
              <div className="kc-glass-sub">Temukan capster yang paling cocok untukmu</div>
            </div>
            <div className="kc-glass-locked-trust">
              <div className="kc-glass-locked-trust-icon"><Users size={15} /></div>
              <div className="kc-glass-locked-trust-text"><b>Telah digunakan oleh</b><span>10.000+ pelanggan</span></div>
              <div className="kc-glass-locked-trust-avatars">
                {TRUST_AVATAR_INITIALS.map((letter, i) => (
                  <span key={i} className="kc-result-trust-avatar">{letter}</span>
                ))}
                <span className="kc-result-trust-more">+9.8K</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="kc-section" style={{ paddingTop: 30, paddingBottom: 30 }}>
      <Reveal className="kc-section-head">
        <span className="kc-kicker">Pengalaman Baru</span>
        <h2 className="kc-h2">USAP KACA, TEMUKAN CAPSTER-MU</h2>
        <p className="kc-hero-sub" style={{ maxWidth: 540, marginTop: 8 }}>
          Kaca kami berembun setelah hot towel — usap untuk membaca hasil "prediksi" kami: satu capster
          yang paling cocok menemani gaya barumu.
        </p>
      </Reveal>

      <Reveal className="kc-mirror-panel2 kc-phase-enter">
        <div className="kc-mirror-left">
          <div className={"kc-glass" + (wiped ? " wiped" : "")} onClick={() => !wiped && computeMatch()}>
            <div className="kc-glass-backdrop" />
            <div className="kc-glass-fog">
              <Hand size={30} className="kc-mirror-hint" />
              <div className="kc-glass-title">USAP KACA SEKARANG</div>
              <div className="kc-glass-sub">Temukan capster yang paling cocok untukmu</div>
            </div>
          </div>

          <div className="kc-mirror-steps2">
            <div className="kc-mirror-steps2-title">Cara Kerja</div>
            {MIRROR_STEPS.map((s, i) => (
              <div className="kc-mirror-step2" key={s.title}>
                <div className="kc-mirror-step2-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="kc-mirror-step2-icon"><s.Icon size={16} strokeWidth={1.8} /></div>
                <div>
                  <div className="kc-mirror-step2-title2">{s.title}</div>
                  <div className="kc-mirror-step2-desc">{s.desc}</div>
                </div>
              </div>
            ))}
            <div className="kc-mirror-ai-box">
              <Brain size={18} strokeWidth={1.7} />
              <div>
                <div className="kc-mirror-ai-title">Bagaimana AI bekerja?</div>
                <div className="kc-mirror-ai-desc">Kami menganalisis preferensi, gaya rambut, bentuk wajah, hingga rating & pengalaman capster untuk hasil terbaik.</div>
              </div>
            </div>
          </div>
        </div>

        <div className={"kc-result-card" + (wiped ? " show" : "")}>
          {wiped && match ? (
            <>
              <div className="kc-result-top">
                <span className="kc-result-trending"><Flame size={12} /> TRENDING</span>
                <div className="kc-result-ring" style={{ "--pct": match.score }}>
                  <div className="kc-result-ring-inner">
                    <span className="kc-result-ring-num">{match.score}%</span>
                    <span className="kc-result-ring-label">COCOK</span>
                  </div>
                </div>
              </div>

              <div className="kc-result-profile">
                <div className="kc-result-avatar">{match.c.name.split(" ").map((n) => n[0]).join("")}</div>
                <div>
                  <div className="kc-result-name">{match.c.name}</div>
                  <div className="kc-result-role">Senior Barber · {branchName}</div>
                  <div className="kc-result-rating"><Star size={13} fill="var(--kc-brass)" strokeWidth={0} /> {match.c.rating} ({match.c.reviews} review)</div>
                </div>
              </div>

              <div className="kc-result-badges">
                <span className="kc-result-chip"><Crown size={12} /> Senior</span>
                <span className="kc-result-chip"><Scissors size={12} /> Expert {match.c.tags[0]}</span>
              </div>

              <div className="kc-result-label">Spesialis</div>
              <div className="kc-tag-row">{match.c.tags.map((t) => <span key={t} className="kc-tag">{t}</span>)}</div>

              <div className="kc-result-grid2">
                <div>
                  <div className="kc-result-label">Kenapa {firstName} direkomendasikan?</div>
                  <ul className="kc-result-reasons">
                    {reasons.map((r) => <li key={r}><Check size={13} /> {r}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="kc-result-label">Kecocokan Capster</div>
                  <div className="kc-compare-list">
                    {top3.map((m) => (
                      <div className="kc-compare-row" key={m.c.id}>
                        <span className="kc-compare-name">{m.c.name.split(" ")[0]}</span>
                        <div className="kc-compare-bar"><div style={{ width: m.score + "%" }} /></div>
                        <span className="kc-compare-pct">{m.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="kc-result-stats">
                <div><Users size={14} /><b>1.482+</b><span>Pelanggan</span></div>
                <div><Star size={14} /><b>{match.c.rating}</b><span>Rating</span></div>
                <div><MessageCircle size={14} /><b>{match.c.reviews}</b><span>Review</span></div>
                <div><Clock size={14} /><b>45 Menit</b><span>Estimasi</span></div>
                <div><CreditCard size={14} /><b>Rp45rb</b><span>Mulai dari</span></div>
              </div>

              <div className="kc-result-quote">&ldquo;{quote}&rdquo; <span>— {firstName}</span></div>

              <div className="kc-result-actions">
                <button className="kc-btn kc-btn-dark kc-btn-sm" onClick={() => go("capsterDetail", { capster: match.c })}>
                  Booking {firstName} <ArrowRight size={14} />
                </button>
                <button className="kc-btn kc-btn-outline kc-btn-sm" onClick={() => go("capsterDetail", { capster: match.c })}>
                  Lihat Profil <ArrowRight size={14} />
                </button>
                <button className="kc-btn-ghost-sm" onClick={restart}><RotateCcw size={13} /> Usap Lagi</button>
                <button className="kc-btn-ghost-sm" onClick={restartQuiz}><RotateCcw size={13} /> Ulangi Kuisioner</button>
              </div>

              {/* Trust row — small stacked-avatar cluster, matches the
                  reference's "dipilih oleh ribuan pelanggan" line. */}
              <div className="kc-result-trustrow">
                <span>Dipilih oleh ribuan pelanggan yang percaya pada {firstName}</span>
                <div className="kc-result-trust-avatars">
                  {TRUST_AVATAR_INITIALS.map((letter, i) => (
                    <span key={i} className="kc-result-trust-avatar">{letter}</span>
                  ))}
                  <span className="kc-result-trust-more">+1.2K</span>
                </div>
              </div>
            </>
          ) : (
            <div className="kc-result-placeholder">
              <Sparkles size={22} />
              <p>Usap kacanya untuk melihat capster yang cocok untukmu</p>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className="kc-mirror-strip">
        <div className="kc-mirror-strip-item"><Shield size={18} /><div><b>Aman & Terpercaya</b><span>Semua capster terverifikasi dan berpengalaman.</span></div></div>
        <div className="kc-mirror-strip-item"><Clock size={18} /><div><b>Jadwal Fleksibel</b><span>Pilih waktu yang paling pas untukmu.</span></div></div>
        <div className="kc-mirror-strip-item"><Sparkles size={18} /><div><b>Hasil Terbaik</b><span>Rekomendasi personal sesuai gaya kamu.</span></div></div>
        <div className="kc-mirror-bonus">
          <Gift size={18} />
          <div><b>Bonus Untukmu!</b><span>Usap beberapa kali dan dapatkan diskon spesial hari ini.</span></div>
          <div className="kc-mirror-bonus-chip">DISKON HINGGA<strong>10%</strong>KHUSUS HARI INI</div>
        </div>
      </Reveal>

      <div className="kc-mirror-footnote"><Lock size={12} /> Data pribadimu aman bersama kami</div>
    </section>
  );
}

/* ================================================================== */
/* HOME                                                                 */
/* ================================================================== */

