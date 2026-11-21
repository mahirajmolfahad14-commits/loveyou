"use client";
import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STANZAS } from "@/lib/poem";
import { Divider } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

/** Every word is lit by scroll position, so the poem is read by candlelight, one breath at a time. */
export default function Poem() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stz").forEach((el) => {
        const words = el.querySelectorAll(".w");
        const pull = el.classList.contains("pull") || el.classList.contains("final");
        gsap.fromTo(words,
          { opacity: 0.1, y: 14, filter: "blur(3px)", scale: pull ? 0.94 : 1 },
          { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, stagger: 0.14, ease: "none",
            scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 50%", scrub: 0.7 } });
        if (pull) gsap.fromTo(el, { letterSpacing: "0.12em" }, { letterSpacing: "0em", ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "center 50%", scrub: true } });
      });
    }, root);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <article className="poem" ref={root}>
      {STANZAS.map((s, i) => (
        <Fragment key={i}>
          <div className={`stz ${s.kind ?? ""}`}>
            {s.lines.map((line, li) => (
              <span className="ln" key={li}>
                {line.split(" ").map((w, wi) => (<Fragment key={wi}><span className="w">{w}</span>{" "}</Fragment>))}
              </span>
            ))}
          </div>
          {i % 4 === 3 && i < STANZAS.length - 2 && <Divider />}
        </Fragment>
      ))}
    </article>
  );
}
