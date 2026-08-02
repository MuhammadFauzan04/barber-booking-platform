/* Animated, irregular wall of customer testimonials. */

import React, { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { Stagger } from "./Common";
import { FEEDBACK_ANCHOR_POOL, FEEDBACK_FADE_MS, FEEDBACK_OVERLAP_MS, FEEDBACK_SLOT_COUNT, FEEDBACK_START_DELAY_MS, TESTIMONIALS } from "../data/barbershop";

export function FeedbackWall() {
  const [slots, setSlots] = useState(() =>
    Array.from({ length: FEEDBACK_SLOT_COUNT }, (_, i) => i % TESTIMONIALS.length)
  );
  const [anchors, setAnchors] = useState(() =>
    Array.from({ length: FEEDBACK_SLOT_COUNT }, (_, i) => i % FEEDBACK_ANCHOR_POOL.length)
  );
  const [zIndex, setZIndex] = useState(() => Array.from({ length: FEEDBACK_SLOT_COUNT }, (_, i) => i));
  // Multiple cards can be fading out at once now, so this is a set of slot
  // indices rather than a single "current" slot.
  const [fadingSlots, setFadingSlots] = useState(() => new Set());
  const cursorRef = useRef(FEEDBACK_SLOT_COUNT);
  const zCursorRef = useRef(FEEDBACK_SLOT_COUNT);
  const busyRef = useRef(new Set()); // slots currently mid-cycle, so we don't grab the same one twice

  useEffect(() => {
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timers = [];
    let cancelled = false;

    const runCycle = () => {
      if (cancelled) return;

      // Pick a slot that isn't already mid-fade.
      let slot = Math.floor(Math.random() * FEEDBACK_SLOT_COUNT);
      let guard = 0;
      while (busyRef.current.has(slot) && guard < FEEDBACK_SLOT_COUNT) {
        slot = (slot + 1) % FEEDBACK_SLOT_COUNT;
        guard++;
      }
      busyRef.current.add(slot);
      setFadingSlots((prev) => new Set(prev).add(slot));

      // Set the NEXT card loose halfway through this one's fade-out —
      // this is the overlap that keeps the wall busy instead of quiet.
      timers.push(setTimeout(runCycle, FEEDBACK_OVERLAP_MS));

      // Once this card has fully faded to invisible, swap its content and
      // anchor (instant, since it's unseen at opacity 0 — no visible slide),
      // then fade it back in.
      timers.push(setTimeout(() => {
        setSlots((prev) => {
          const next = [...prev];
          next[slot] = cursorRef.current % TESTIMONIALS.length;
          cursorRef.current += 1;
          return next;
        });
        setAnchors((prev) => {
          const next = [...prev];
          const choices = FEEDBACK_ANCHOR_POOL.map((_, i) => i).filter((i) => i !== prev[slot]);
          next[slot] = choices[Math.floor(Math.random() * choices.length)];
          return next;
        });
        zCursorRef.current += 1;
        setZIndex((prev) => {
          const next = [...prev];
          next[slot] = zCursorRef.current;
          return next;
        });
        setFadingSlots((prev) => {
          const next = new Set(prev);
          next.delete(slot);
          return next;
        });
        busyRef.current.delete(slot);
      }, FEEDBACK_FADE_MS));
    };

    const kickoff = setTimeout(runCycle, FEEDBACK_START_DELAY_MS);
    timers.push(kickoff);

    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="kc-feedback-wall">
      <Stagger>
        {slots.map((tIndex, slot) => {
          const t = TESTIMONIALS[tIndex];
          const a = FEEDBACK_ANCHOR_POOL[anchors[slot]];
          const isFading = fadingSlots.has(slot);
          return (
            <div
              key={slot}
              className="kc-feedback-card"
              style={{ top: a.top, left: `${a.left}%`, "--rot": `${a.rot}deg`, zIndex: zIndex[slot] }}
            >
              <div className={"kc-feedback-inner" + (isFading ? " fading" : "")}>
                <div className="kc-feedback-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={13} fill={i < t.rating ? "var(--kc-accent)" : "none"} stroke="var(--kc-accent)" strokeWidth={1.4} />
                  ))}
                </div>
                <p className="kc-feedback-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="kc-feedback-foot">
                  <div className="kc-feedback-avatar">{t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
                  <div>
                    <div className="kc-feedback-name">{t.name}</div>
                    <div className="kc-feedback-branch">{t.branch}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Stagger>
    </div>
  );
}

/* ================================================================== */
/* ================================================================== */
/* FAQ — modern filterable grid: category pills narrow the list, each   */
/* question is its own elevated card with a category icon, and a       */
/* closing "still stuck?" strip nudges people toward live help.        */
/* ================================================================== */

