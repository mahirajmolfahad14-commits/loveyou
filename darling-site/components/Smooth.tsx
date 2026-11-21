"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { state } from "@/lib/state";

gsap.registerPlugin(ScrollTrigger);

/** Inertial scrolling wired into GSAP's ticker + a global scroll-progress feed for the WebGL layer. */
export default function Smooth() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
    state.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    const bar = document.querySelector<HTMLElement>(".prog");
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => {
      state.progress = s.progress; if (bar) bar.style.transform = `scaleX(${s.progress})`;
    } });
    return () => { st.kill(); gsap.ticker.remove(tick); lenis.destroy(); state.lenis = null; };
  }, []);
  return null;
}
