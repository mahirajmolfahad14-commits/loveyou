"use client";
import { motion } from "framer-motion";

export const HEART = "M50 84 C20 62 8 44 8 28 C8 15 18 7 30 7 C38 7 46 11 50 19 C54 11 62 7 70 7 C82 7 92 15 92 28 C92 44 80 62 50 84Z";

export function Flourish({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  return (
    <svg className={`flourish ${pos}`} viewBox="0 0 120 120" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M4 116 V30 C4 16 16 4 30 4 H116" />
        <path d="M14 116 V36 C14 24 24 14 36 14 H116" opacity=".5" />
        <path d="M30 30 C46 30 52 44 42 52 C34 58 24 50 30 42" />
        <path d="M60 4 C60 22 74 22 74 10 M4 60 C22 60 22 74 10 74" opacity=".6" />
        <circle cx="62" cy="9" r="2.2" fill="currentColor" /><circle cx="9" cy="62" r="2.2" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Drawn-on-scroll divider: two curling vines meeting at a small heart. */
export function Divider() {
  const draw = { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true, margin: "-10%" }, transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] as const } };
  return (
    <svg className="divider" viewBox="0 0 300 40" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <motion.path d="M138 20 H70 C52 20 48 8 58 6 C68 4 70 16 60 18 M70 20 C60 28 44 30 36 22 H8" {...draw} />
        <motion.path d="M162 20 H230 C248 20 252 8 242 6 C232 4 230 16 240 18 M230 20 C240 28 256 30 264 22 H292" {...draw} />
      </g>
      <motion.path d="M150 28 C141 22 138 17 138 14 C138 11 140 9 143 9 C146 9 148.5 10.5 150 13 C151.5 10.5 154 9 157 9 C160 9 162 11 162 14 C162 17 159 22 150 28Z"
        fill="#a3213d" stroke="#e9b86b" strokeWidth=".8" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 1.6, type: "spring", stiffness: 120, damping: 9 }} style={{ transformOrigin: "150px 18px" }} />
    </svg>
  );
}
