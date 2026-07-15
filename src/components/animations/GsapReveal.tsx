"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export function GsapReveal({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.from(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: container });

  return <div ref={container} className={className}>{children}</div>;
}
