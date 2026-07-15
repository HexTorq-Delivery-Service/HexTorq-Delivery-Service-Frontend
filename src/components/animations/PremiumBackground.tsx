"use client";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PremiumBackground() {
  const container = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;


    // LAYER 1: Animated Mesh Gradient (Divs)
    gsap.utils.toArray<gsap.TweenTarget>('.mesh-node').forEach((node) => {
      gsap.to(node, {
        x: "random(-15vw, 15vw)",
        y: "random(-15vh, 15vh)",
        duration: "random(20, 40)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true
      });
    });

    // LAYER 2: Aurora Lights
    gsap.utils.toArray<gsap.TweenTarget>('.aurora-light').forEach((node) => {
      gsap.to(node, {
        x: "random(-20vw, 20vw)",
        scaleX: "random(1, 1.5)",
        duration: "random(15, 30)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true
      });
    });

    // LAYER 5: Morphing Blobs
    if (!isMobile) {
      gsap.utils.toArray<gsap.TweenTarget>('.morph-blob').forEach((node) => {
        gsap.to(node, {
          x: "random(-30vw, 30vw)",
          y: "random(-30vh, 30vh)",
          scale: "random(0.8, 1.3)",
          rotation: "random(-90, 90)",
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true
        });
      });
    }

    // LAYER 6: Light Rays - now static, no animation needed

    // LAYER 10: Depth Rings - removed for performance

    // Global Container Breath - removed for performance

    if (!isMobile) {
       gsap.fromTo('.svg-curve-path', 
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 15, repeat: -1, yoyo: true, ease: "power1.inOut", stagger: 2 }
       );
    }

    // Scroll Transitions (Ambient Lighting)
    // We bind ScrollTrigger to the document body height to shift the global tint
    gsap.to('.bg-global-tint', {
      background: "linear-gradient(to bottom, rgba(255,107,0,0.05), rgba(0,0,0,0.3))",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // Parallax on scrolling
    gsap.to('.parallax-deep', {
       y: () => -(window.innerHeight * 0.2),
       ease: "none",
       scrollTrigger: {
         trigger: document.body,
         start: "top top",
         end: "bottom bottom",
         scrub: true
       }
    });

  }, { scope: container });

  // Mouse Interactivity (Layer 3 Orbs & Spotlight)
  useEffect(() => {
    if (!container.current) return;
    if (window.innerWidth < 768) return; // Disable on mobile

    const orbs = gsap.utils.toArray<Element>('.glass-orb');
    // Store quickTo functions for x and y of each orb
    const xSetters = orbs.map((orb) => gsap.quickTo(orb as gsap.TweenTarget, "x", { duration: 1, ease: "power3" }));
    const ySetters = orbs.map((orb) => gsap.quickTo(orb as gsap.TweenTarget, "y", { duration: 1, ease: "power3" }));

    // Spotlight quickTo
    const spotlightX = gsap.quickTo('.mouse-spotlight', 'x', { duration: 0.3, ease: "power2" });
    const spotlightY = gsap.quickTo('.mouse-spotlight', 'y', { duration: 0.3, ease: "power2" });

    const handleMouseMove = (e: MouseEvent) => {
       const { clientX, clientY } = e;
       const { innerWidth, innerHeight } = window;
       const cx = innerWidth / 2;
       const cy = innerHeight / 2;
       
       spotlightX(clientX - cx);
       spotlightY(clientY - cy);

       // Orbs repel slightly
       orbs.forEach((orb, i) => {
          const rect = (orb as HTMLElement).getBoundingClientRect();
          const orbX = rect.left + rect.width / 2;
          const orbY = rect.top + rect.height / 2;
          
          const distX = orbX - clientX;
          const distY = orbY - clientY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          if (distance < 300) {
             const force = (300 - distance) / 300; // 0 to 1
             xSetters[i](distX * force * 0.5);
             ySetters[i](distY * force * 0.5);
          } else {
             xSetters[i](0);
             ySetters[i](0);
          }
       });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
    <div ref={container} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#FFF9F3] bg-global-tint transition-colors duration-1000">
      
      {/* Uiverse Longbar Pattern (Orange) - Static Background Layer */}
      <div className="absolute inset-0 pattern-longbar opacity-[0.15] mix-blend-multiply pointer-events-none" />

      {/* Container Rotator (Breathing) */}
      <div className="bg-rotator w-full h-full absolute inset-[-10%]">
        
        {/* Layer 1: Animated Mesh Gradient - reduced blur for perf */}
        <div className="absolute inset-0 opacity-80 mix-blend-multiply">
           <div className="mesh-node absolute top-[10%] left-[10%] w-[50vw] h-[50vh] rounded-full bg-[#FFE8CC] blur-[80px]" />
           <div className="mesh-node absolute top-[20%] right-[10%] w-[60vw] h-[60vh] rounded-full bg-[#FFD8A8] blur-[90px]" />
           <div className="mesh-node absolute bottom-[10%] left-[20%] w-[55vw] h-[55vh] rounded-full bg-[#FFB357] blur-[80px]" />
           <div className="mesh-node absolute bottom-[20%] right-[20%] w-[45vw] h-[45vh] rounded-full bg-[#FFF3E8] blur-[70px]" />
        </div>

        {/* Layer 2: Aurora Lights - no blur, just gradient opacity */}
        <div className="absolute inset-0 opacity-[0.06]">
           <div className="aurora-light absolute top-[-10%] left-0 w-[120%] h-[40vh] bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
           <div className="aurora-light absolute top-[40%] left-[-20%] w-[150%] h-[30vh] bg-gradient-to-r from-transparent via-[#FF9F43] to-transparent" />
        </div>

        {/* Layer 5: Morphing Blobs - desktop only, reduced blur */}
        <div className="hidden md:block absolute inset-0 mix-blend-soft-light opacity-[0.08]">
           <div className="morph-blob absolute top-1/4 left-1/4 w-[300px] h-[220px] bg-[#FF6B00] blur-[80px] rounded-[40%_60%_70%_30%]" />
           <div className="morph-blob absolute bottom-1/4 left-1/3 w-[350px] h-[250px] bg-[#FFE8CC] blur-[80px] rounded-[30%_70%_60%_40%]" />
        </div>

        {/* Layer 6: Light Rays - static, no animation for perf */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] opacity-[0.03] pointer-events-none"
             style={{ background: "repeating-conic-gradient(from 0deg, transparent 0deg, #FF6B00 10deg, transparent 20deg)", maskImage: "radial-gradient(circle, black 20%, transparent 60%)", WebkitMaskImage: "radial-gradient(circle, black 20%, transparent 60%)" }} />

        {/* Layer 8: SVG Curves */}
        <svg className="hidden md:block absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1000 1000">
           <path className="svg-curve-path" d="M -100,500 C 200,300 400,700 1100,500" fill="none" stroke="#FF8A00" strokeWidth="2" strokeDasharray="1000" />
           <path className="svg-curve-path" d="M -100,600 C 300,800 600,200 1100,600" fill="none" stroke="#FFB347" strokeWidth="1" strokeDasharray="1000" />
        </svg>

        {/* Layer 10: Depth Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="depth-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[10px] border-[#FF8A00] opacity-[0.04] blur-[40px]" />
           <div className="depth-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border-[20px] border-[#FF6B00] opacity-[0.03] blur-[60px]" />
        </div>

        {/* Parallax Group (Layer 4 & 9) */}
        <div className="parallax-deep absolute inset-0">
           
           {/* Layer 9: Particle Field - reduced count for perf */}
           {mounted && Array.from({ length: 6 }).map((_, i) => (
             <div key={`p-${i}`} className="atmos-drift absolute bg-[#FFB347] rounded-full opacity-[0.12]" 
                  style={{ 
                     top: `${(i * 17 + 5) % 100}%`, 
                     left: `${(i * 19 + 8) % 100}%`, 
                     width: `${(i % 3) + 2}px`, 
                     height: `${(i % 3) + 2}px` 
                  }} />
           ))}
           
           {/* Layer 4: Food Atmosphere (Leaves, Crumbs) */}
           <svg className="atmos-drift absolute top-[15%] left-[8%] w-8 h-8 text-green-500 opacity-10 transform rotate-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.7 2.3c-2.2-.4-5.3.3-8 2.6C6.7 7.5 5 11 5 14.5c0 1.2.2 2.4.6 3.4l-3.3 3.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l3.3-3.3c1 .4 2.2.6 3.4.6 3.5 0 7-1.7 9.6-4.7 2.3-2.7 3-5.8 2.6-8-.3-2-1.9-3.6-4.3-4.9z" />
           </svg>
           <svg className="atmos-drift absolute top-[65%] left-[85%] w-6 h-6 text-green-600 opacity-10 transform -rotate-45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.7 2.3c-2.2-.4-5.3.3-8 2.6C6.7 7.5 5 11 5 14.5c0 1.2.2 2.4.6 3.4l-3.3 3.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l3.3-3.3c1 .4 2.2.6 3.4.6 3.5 0 7-1.7 9.6-4.7 2.3-2.7 3-5.8 2.6-8-.3-2-1.9-3.6-4.3-4.9z" />
           </svg>
           <div className="atmos-drift absolute top-[30%] right-[20%] w-2 h-2 bg-red-500 rounded-full opacity-10 blur-[1px]" />
           <div className="atmos-drift absolute top-[70%] left-[30%] w-3 h-3 bg-[#FF8A00] rounded-sm opacity-10 transform rotate-45 blur-[1px]" />
           
           {/* Layer 3: Floating Glass Orbs - no backdrop-blur for perf */}
           {mounted && Array.from({ length: 5 }).map((_, i) => {
              const size = [80, 120, 60, 100, 70][i];
              return (
                <div key={`orb-${i}`} 
                     className="glass-orb hidden md:block absolute rounded-full bg-white/8 border border-white/15 shadow-[0_4px_15px_rgba(255,107,0,0.04)]"
                     style={{
                        top: `${[15, 60, 30, 75, 45][i]}%`,
                        left: `${[70, 15, 85, 40, 55][i]}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                     }}
                />
              )
           })}
        </div>

      </div>

      {/* Layer 7: Noise Layer */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />

      {/* Mouse Spotlight (Desktop Only) */}
      <div className="mouse-spotlight hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] rounded-full mix-blend-overlay pointer-events-none" />

    </div>
  );
}
