"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { state } from "@/lib/state";
import { Flourish } from "./Ornaments";

type Ripple = { id: number; x: number; y: number };

/** Candle-light that follows the finger/cursor, tap ripples, frame, corners, grain, vignette, progress thread. */
export default function Atmosphere() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  useEffect(() => {
    let id = 0;
    const move = (e: PointerEvent) => {
      const s = document.documentElement.style;
      s.setProperty("--mx", `${e.clientX}px`); s.setProperty("--my", `${e.clientY}px`);
      state.px = (e.clientX / window.innerWidth) * 2 - 1; state.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const down = (e: PointerEvent) => {
      const r = { id: id++, x: e.clientX, y: e.clientY };
      setRipples((a) => [...a, r]);
      window.setTimeout(() => setRipples((a) => a.filter((q) => q.id !== r.id)), 1800);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); };
  }, []);

  return (
    <>
      <div className="candle" aria-hidden />
      <div className="lightleak" aria-hidden />
      <div className="frame" aria-hidden />
      {(["tl", "tr", "bl", "br"] as const).map((p) => <Flourish key={p} pos={p} />)}
      <div className="prog" aria-hidden />
      {ripples.map((r) => (
        <span key={r.id} className="ripple-pos" style={{ left: r.x, top: r.y }} aria-hidden>
          <motion.span className="ripple" initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: 1.2, opacity: 0 }} transition={{ duration: 1.6, ease: "easeOut" }} />
        </span>
      ))}
      <div className="vignette" aria-hidden />
      <div className="grain" aria-hidden />
    </>
  );
}
