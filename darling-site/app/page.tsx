"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Smooth from "@/components/Smooth";
import Atmosphere from "@/components/Atmosphere";
import Gate from "@/components/Gate";
import Poem from "@/components/Poem";
import { Divider, HEART } from "@/components/Ornaments";
import { DEDICATION, SIGN_OFF, TITLE } from "@/lib/poem";
import { state } from "@/lib/state";

gsap.registerPlugin(ScrollTrigger);
const Embers = dynamic(() => import("@/components/Embers"), { ssr: false });

function Title({ open }: { open: boolean }) {
  let n = 0;
  return (
    <h1 className="title" aria-label={TITLE}>
      {TITLE.split(" ").map((w, wi) => (
        <span className="tw" key={wi} aria-hidden>
          {[...w].map((ch) => {
            const i = n++;
            return (
              <motion.span key={i} className="ltr" initial={{ opacity: 0, y: 46, filter: "blur(14px)" }}
                animate={open ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ delay: 0.5 + i * 0.07, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}>
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export default function Page() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle("locked", !open); }, [open]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-in", { yPercent: -28, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.fromTo(".finale-heart", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: ".finale", start: "top 85%", end: "top 40%", scrub: true } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      <Smooth />
      <Embers />
      <Atmosphere />
      <AnimatePresence>{!open && <Gate key="gate" onOpen={() => setOpen(true)} />}</AnimatePresence>

      <section className="hero">
        <div className="hero-in">
          <Title open={open} />
          <motion.p className="dedication" initial={{ opacity: 0 }} animate={open ? { opacity: 0.9 } : {}} transition={{ delay: 2.6, duration: 2 }}>{DEDICATION}</motion.p>
          <motion.div className="cue" initial={{ opacity: 0 }} animate={open ? { opacity: 1 } : {}} transition={{ delay: 3.6, duration: 2 }} aria-hidden />
        </div>
      </section>

      <Poem />

      <footer className="finale">
        <svg className="finale-heart" viewBox="0 0 100 100" aria-hidden>
          <defs><radialGradient id="hg" cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#ff7a90" /><stop offset=".5" stopColor="#c0294a" /><stop offset="1" stopColor="#5a0e20" /></radialGradient></defs>
          <motion.path d={HEART} fill="url(#hg)" animate={{ scale: [1, 1.1, 1, 1.07, 1] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50px 45px" }} />
        </svg>
        <Divider />
        <p className="sign">{SIGN_OFF}</p>
        <button className="again" onClick={() => (state.lenis ? state.lenis.scrollTo(0, { duration: 4 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}>Read it again</button>
      </footer>
    </main>
  );
}
