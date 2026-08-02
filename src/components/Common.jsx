/* Small, generic UI atoms shared across many pages: layout wrappers,
   scroll-reveal helpers, scramble-text, tilt/magnetic effects, counters. */

import React, { useState, useEffect, useRef } from "react";
import { Droplet, Leaf, Scissors, Sparkles } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";

export const Page = ({ children, className = "" }) => (
  <div className={"kc-page " + className}>{children}</div>
);

export const Stagger = ({ children }) =>
  React.Children.map(children, (child, i) =>
    child
      ? React.cloneElement(child, {
          style: { ...(child.props.style || {}), animationDelay: `${i * 60}ms` },
          className: (child.props.className || "") + " kc-stagger",
        })
      : child
  );

export const PortfolioTile = ({ seed, label }) => {
  const hue = (seed * 47) % 360;
  return (
    <div className="kc-tile" style={{ background: `linear-gradient(150deg, hsl(${hue} 70% 45%), hsl(${hue + 30} 80% 32%))` }}>
      <Scissors size={22} strokeWidth={1.6} />
      <span>{label}</span>
    </div>
  );
};

/* ================================================================== */
/* SCRAMBLE TEXT — letters flicker randomly, then lock in left-to-right */
/* ================================================================== */

export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=";

export function ScrambleText({ text, className = "", as: Tag = "span", startDelay = 0, revealSpeed = 2, fps = 30 }) {
  const [display, setDisplay] = useState(() => text.replace(/[^\s]/g, "·"));
  useEffect(() => {
    let frame = 0;
    let timer = null;
    const to = setTimeout(() => {
      timer = setInterval(() => {
        frame++;
        const revealed = Math.floor(frame / revealSpeed);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") { out += " "; continue; }
          out += i < revealed ? text[i] : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setDisplay(out);
        if (revealed >= text.length) { clearInterval(timer); setDisplay(text); }
      }, 1000 / fps);
    }, startDelay);
    return () => { clearTimeout(to); if (timer) clearInterval(timer); };
  }, [text, startDelay, revealSpeed, fps]);
  return <Tag className={"kc-scramble " + className}>{display}</Tag>;
}

/* ================================================================== */
/* MAGNETIC HOVER — element gently pulls toward the cursor              */
/* ================================================================== */

export function TiltCard({ children, className = "", onClick, maxTilt = 8 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * maxTilt * 2;
    const ry = (px - 0.5) * maxTilt * 2;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(700px) rotateX(0) rotateY(0)"; };
  return (
    <div ref={ref} className={"kc-tilt " + className} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
      {children}
    </div>
  );
}

/* ================================================================== */
/* AMBIENT FLOATERS — small icons drifting slowly in the background    */
/* ================================================================== */

export function AmbientFloaters({ icons = [Leaf, Droplet, Sparkles], count = 7 }) {
  const items = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
    Icon: icons[i % icons.length],
    left: (i * 137) % 100,
    top: (i * 71) % 100,
    size: 12 + ((i * 5) % 16),
    duration: 9 + (i % 5) * 2.4,
    delay: (i % 6) * -1.6,
  })), [icons, count]);
  return (
    <div className="kc-floaters" aria-hidden="true">
      {items.map((it, i) => (
        <it.Icon
          key={i}
          size={it.size}
          className="kc-floater"
          style={{ left: `${it.left}%`, top: `${it.top}%`, animationDuration: `${it.duration}s`, animationDelay: `${it.delay}s` }}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/* SCROLL-REVEAL — sections animate in as the user scrolls to them     */
/* ================================================================== */

export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const [ref, inView] = useInView();
  const Tag = as;
  return (
    <Tag ref={ref} className={"kc-reveal" + (inView ? " in" : "") + (className ? " " + className : "")} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function StatCounter({ value, suffix = "", label }) {
  const [ref, inView] = useInView(0.4);
  const count = useCountUp(value, 1100, inView);
  return (
    <div ref={ref} className="kc-stat">
      <div className="kc-stat-num">{count}{suffix}</div>
      <div className="kc-stat-label">{label}</div>
    </div>
  );
}

/* ================================================================== */
/* MARQUEE — infinite auto-scrolling ticker                            */
/* ================================================================== */

export function Marquee({ items, reverse = false }) {
  const loop = [...items, ...items];
  return (
    <div className="kc-marquee">
      <div className={"kc-marquee-track" + (reverse ? " reverse" : "")}>
        {loop.map((it, i) => (
          <span className="kc-marquee-item" key={i}>{it} <Scissors size={14} strokeWidth={2} /></span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* AUTO SPOTLIGHT CAROUSEL — advances itself, pauses on hover           */
/* ================================================================== */

