"use client";
import { useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls } from "framer-motion";
import { HEART } from "./Ornaments";

function Seal() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden>
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#e8566d" /><stop offset=".45" stopColor="#a3213d" /><stop offset="1" stopColor="#4d0b1a" />
        </radialGradient>
        <filter id="rough"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="3" seed="7" /><feDisplacementMap in="SourceGraphic" scale="14" /></filter>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#wax)" filter="url(#rough)" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#6d1226" strokeWidth="3" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#f08a9b" strokeOpacity=".35" transform="translate(1.5 1.5)" />
      <g transform="translate(50 54) scale(.95)"><path d={HEART} fill="#85182f" stroke="#f08a9b" strokeOpacity=".45" strokeWidth="1.5" /></g>
    </svg>
  );
}

export default function Gate({ onOpen }: { onOpen: () => void }) {
  const prog = useMotionValue(0);
  const ctl = useRef<AnimationPlaybackControls | null>(null);
  const [broken, setBroken] = useState(false);
  const scale = useTransform(prog, [0, 1], [1, 1.1]);
  const glow = useTransform(prog, (v) => `drop-shadow(0 14px 30px rgba(0,0,0,.7)) drop-shadow(0 0 ${20 + v * 70}px rgba(230,70,95,${0.3 + v * 0.6}))`);

  const start = () => {
    if (broken) return;
    ctl.current?.stop();
    ctl.current = animate(prog, 1, { duration: 1.7, ease: "easeIn", onComplete: () => {
      setBroken(true); navigator.vibrate?.([30, 40, 70]); window.setTimeout(onOpen, 1500);
    } });
  };
  const release = () => { if (!broken) { ctl.current?.stop(); ctl.current = animate(prog, 0, { duration: 0.7 }); } };

  return (
    <motion.div className="gate" exit={{ opacity: 0 }} transition={{ duration: 2 }}>
      <motion.h2 className="gate-title" initial={{ opacity: 0, y: 16, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 2, delay: 0.3 }}>
        For you
      </motion.h2>
      <motion.button className="sealbtn" style={{ scale, filter: glow }} aria-label="Press and hold to break the seal"
        onPointerDown={start} onPointerUp={release} onPointerLeave={release} onPointerCancel={release}
        onKeyDown={(e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) start(); }} onKeyUp={release} onContextMenu={(e) => e.preventDefault()}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.6 }}>
        <svg className="ring" viewBox="0 0 200 200" aria-hidden>
          <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(236,211,165,.18)" strokeWidth="1.5" />
          <motion.circle cx="100" cy="100" r="96" fill="none" stroke="#ecd3a5" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: prog, rotate: -90, transformOrigin: "100px 100px" }} />
        </svg>
        <motion.span className="half l" animate={broken ? { x: "-48%", y: "16%", rotate: -28, opacity: 0 } : {}} transition={{ duration: 1.4, ease: [0.6, 0, 0.2, 1] }}><Seal /></motion.span>
        <motion.span className="half r" animate={broken ? { x: "48%", y: "22%", rotate: 26, opacity: 0 } : {}} transition={{ duration: 1.4, ease: [0.6, 0, 0.2, 1] }}><Seal /></motion.span>
        {broken && Array.from({ length: 18 }, (_, i) => {
          const a = (i / 18) * Math.PI * 2, d = 110 + (i % 3) * 45;
          return <motion.i key={i} className="spark" initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, opacity: 0, scale: 0.2 }} transition={{ duration: 1.3, ease: "easeOut" }} />;
        })}
      </motion.button>
      <motion.p className="gate-cta" initial={{ opacity: 0 }} animate={{ opacity: broken ? 0 : 0.85 }} transition={{ duration: 1.2, delay: broken ? 0 : 1.4 }}>
        Press and hold the seal
      </motion.p>
    </motion.div>
  );
}
