"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import { MapPin, Search, Bike, CheckSquare, ArrowRight, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection({ onOrderNow }: { onOrderNow: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
       gsap.set(".hero-element, .hero-mobile-element", { opacity: 1, y: 0, filter: "blur(0px)" });
       return;
    }

    const splitTitle = new SplitType(".hero-title", { types: "words,chars" });
    
    // Initial states
    gsap.set(".hero-badge", { opacity: 0, y: 20 });
    gsap.set(splitTitle.chars, { opacity: 0, y: 40, rotateX: -40, filter: "blur(10px)" });
    gsap.set(".hero-title-gradient", { opacity: 0, y: 20 });
    gsap.set(".hero-subtitle", { opacity: 0, y: 20 });
    gsap.set(".hero-search", { opacity: 0, scale: 0.95 });
    gsap.set(".hero-runner", { opacity: 0, y: 30 });
    gsap.set(".food-item", { opacity: 0, scale: 0.5, rotation: -20 });
    gsap.set(".pattern-fade-in", { opacity: 0 });
    
    gsap.set(".hero-mobile-element", { opacity: 0, y: 20 });
    gsap.set(".food-mobile-item", { opacity: 0, scale: 0.5, rotation: -10 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Entrance Animation
    tl.to(".pattern-fade-in", { opacity: 0.04, duration: 2, ease: "power2.inOut" })
      .to(".hero-badge", { opacity: 1, y: 0, duration: 0.6 }, "-=1.5")
      .to(splitTitle.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        stagger: 0.015,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=1.2")
      .to(".hero-title-gradient", { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.6")
      .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.6 }, "-=0.6")
      .to(".hero-search", { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.5")
      .to(".hero-runner", { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)" }, "-=0.4")
      .to(".food-item", {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)"
      }, "-=1")
      .to(".hero-mobile-element", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=1.5")
      .to(".food-mobile-item", { opacity: 1, scale: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, "-=1");

    // Food Halo pulse
    gsap.to(".food-halo", { scale: 1.05, opacity: 0.8, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });

    // Sequence Animation helper for food
    const applyFloatSequence = (selector: string, driftAmt: number) => {
      gsap.utils.toArray(selector).forEach((item: any) => {
         const seqTl = gsap.timeline({ repeat: -1 });
         seqTl.to(item, { y: -driftAmt, duration: 1, ease: "power2.out", force3D: true })
              .to(item, { scale: 1.03, duration: 0.8, ease: "power1.inOut", force3D: true }, "-=0.5")
              .to(item, { y: driftAmt/2, duration: 1.2, ease: "sine.inOut", force3D: true })
              .to(item, { scale: 1, duration: 0.8, ease: "power1.inOut", force3D: true }, "-=0.5")
              .to(item, { y: 0, duration: 0.8, ease: "power2.in", force3D: true })
              .to({}, { duration: 1.5 });
      });
    }

    applyFloatSequence(".food-item", 15);
    applyFloatSequence(".food-mobile-item", 8);

    return () => {
       splitTitle.revert();
    };
  }, { scope: container });

  return (
      <div ref={container} className="relative pt-6 md:pt-12 pb-4 md:pb-24 px-4">
        

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE BESPOKE LAYOUT (< md) */}
        {/* ------------------------------------------------------------------ */}
        <div className="md:hidden max-w-[420px] mx-auto pt-2 pb-2 flex flex-col gap-6 relative z-20">

          <div className="flex w-full items-center relative gap-1">
            <div className="flex-[0.55] z-10 bg-white/5 backdrop-blur-[12px] p-4 rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <h1 className="hero-mobile-element text-[2rem] sm:text-[2.5rem] font-black leading-[1.05] mb-3 text-gray-900 tracking-tight">
                Order Once.<br/>We Pick Up.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFB347]">You Pick Up.</span>
              </h1>
              <p className="hero-mobile-element text-[13px] sm:text-sm text-gray-700 font-medium leading-snug">
                Experience the fastest way to get your favorite village hotel food. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFB347] font-bold">We collect it</span>, you simply pick it up from the campus counter.
              </p>
            </div>
            
            <div className="flex-[0.45] relative h-[180px] hero-mobile-collage flex items-center justify-center -mr-2">
              {/* Premium Food Glow */}
              <div className="food-halo absolute w-32 h-32 bg-gradient-to-br from-[#FF8A00] to-white rounded-full blur-[24px] opacity-60 mix-blend-overlay z-0" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 food-mobile-item">
                 <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-[4px] border-white/90 shadow-xl relative group">
                   <img src="/biryani_3d.png" alt="Biryani" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
              </div>
              <div className="absolute top-2 left-0 z-30 food-mobile-item">
                 <div className="w-14 h-14 rounded-full overflow-hidden border-[3px] border-white/90 shadow-lg relative group">
                   <img src="/burger_3d.png" alt="Burger" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
              </div>
              <div className="absolute bottom-4 right-1 z-10 food-mobile-item">
                 <div className="w-12 h-12 rounded-full overflow-hidden border-[3px] border-white/90 shadow-lg relative group">
                   <img src="/drink_3d.png" alt="Drink" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
              </div>
            </div>
          </div>

          <div className="hero-mobile-element relative z-30 w-full h-[60px] mt-2 rounded-full bg-white/70 backdrop-blur-xl shadow-lg shadow-[#FF8A00]/10 flex items-center px-5 focus-within:shadow-[#FF8A00]/20 focus-within:ring-2 ring-[#FF8A00]/30 transition-all border border-white/60">
             <Search className="w-5 h-5 text-gray-400 mr-3" />
             <Input type="text" placeholder="Search food, hotel or dish..." className="border-0 shadow-none focus-visible:ring-0 text-base h-full p-0 bg-transparent text-gray-900 placeholder:text-gray-400 flex-1" />
          </div>

          <div className="hero-mobile-element w-full">
             <Card className="rounded-[24px] p-5 bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl shadow-[#FF8A00]/15 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#FFB347]" />
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2 text-[#FF6B00] font-black text-base">
                     <Bike className="w-5 h-5" /> Next Runner Trip
                   </div>
                   <Badge variant="outline" className="bg-[#FF8A00]/10 text-[#FF6B00] border-[#FF8A00]/20 font-bold px-2.5 py-0.5 text-xs">Leaves in 18:42</Badge>
                </div>
                <div className="space-y-2 mb-5">
                   <p className="text-xs font-bold text-gray-500">Collecting From:</p>
                   <div className="flex flex-wrap gap-1.5">
                     <span className="text-[10px] font-bold bg-white text-gray-700 shadow-sm border border-gray-100 px-2 py-1 rounded-md flex items-center gap-1"><CheckSquare className="w-2.5 h-2.5 text-green-500"/> A2B Hotel</span>
                     <span className="text-[10px] font-bold bg-white text-gray-700 shadow-sm border border-gray-100 px-2 py-1 rounded-md flex items-center gap-1"><CheckSquare className="w-2.5 h-2.5 text-green-500"/> Sri Murugan</span>
                     <span className="text-[10px] font-bold bg-white text-gray-700 shadow-sm border border-gray-100 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400">...</span>
                   </div>
                </div>
                <Button onClick={onOrderNow} className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white rounded-xl h-14 text-base font-black shadow-lg shadow-[#FF8A00]/30 active:scale-[0.98] transition-transform">
                  Order Now <ArrowRight className="w-4 h-4 ml-1"/>
                </Button>
             </Card>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP/TABLET LAYOUT (md+) */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden md:block container mx-auto max-w-6xl relative z-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Glassmorphism Wrapped Content */}
            <div className="text-left bg-[rgba(255,255,255,0.08)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.25)] rounded-[32px] p-8 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 z-0 pointer-events-none" />
              
              <div className="relative z-10">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1] text-gray-900" style={{ perspective: "1000px" }}>
                  <span className="hero-title block">Order Once.<br/>We Pick Up.</span>
                  <span className="hero-title-gradient block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFB347]">You Pick Up.</span>
                </h1>
                
                <p className="hero-subtitle hero-element text-lg md:text-xl text-gray-700 mb-10 font-medium max-w-lg">
                  Experience the fastest way to get your favorite village hotel food. We collect it, you simply pick it up from the campus counter.
                </p>

                <div className="hero-element mt-6 md:mt-8 relative max-w-xl mx-auto w-full group">
                  <div className="flex items-center justify-center p-[5px] bg-gradient-to-b from-[rgb(227,213,255)] to-[rgb(255,231,231)] rounded-[30px] shadow-[2px_2px_10px_rgba(0,0,0,0.075)] cursor-text">
                    <div className="relative flex-1 flex items-center">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                        <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[rgb(255,81,0)] transition-colors" />
                      </div>
                      
                      <input 
                        type="text" 
                        placeholder="Search for biryani, meals, fast food..." 
                        className="w-full h-[45px] md:h-[50px] pl-12 pr-6 border-none outline-none caret-[rgb(255,81,0)] bg-white rounded-[30px] text-[13.4px] tracking-[0.8px] text-[rgb(19,19,19)] placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="hero-runner hero-element max-w-md mt-10">
                   <Card className="p-1 bg-white/60 backdrop-blur-xl border-white/50 shadow-2xl shadow-[#FF8A00]/10 overflow-hidden relative group text-left hover:-translate-y-1 transition-transform duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#FFB347]" />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-2 text-[#FF6B00] font-black text-lg">
                             <Bike className="w-6 h-6 animate-bounce" /> Next Runner Trip
                           </div>
                           <Badge variant="outline" className="bg-[#FF8A00]/10 text-[#FF6B00] border-[#FF8A00]/20 font-bold px-3 py-1">Leaves in 18:42</Badge>
                        </div>
                        <div className="text-left space-y-2 mb-6">
                           <p className="text-sm font-bold text-gray-500">Collecting From:</p>
                           <div className="flex flex-wrap gap-2">
                             <span className="text-xs font-bold bg-white text-gray-700 shadow-sm border border-gray-100 px-2 py-1 rounded-md flex items-center gap-1"><CheckSquare className="w-3 h-3 text-green-500"/> A2B Hotel</span>
                             <span className="text-xs font-bold bg-white text-gray-700 shadow-sm border border-gray-100 px-2 py-1 rounded-md flex items-center gap-1"><CheckSquare className="w-3 h-3 text-green-500"/> Sri Murugan Mess</span>
                           </div>
                        </div>
                        <Button onClick={onOrderNow} className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#FF6B00] text-white rounded-xl h-14 text-lg font-black shadow-lg shadow-[#FF8A00]/30 hover:shadow-xl hover:shadow-[#FF8A00]/40 transition-all overflow-hidden relative group/btn">
                          <span className="relative z-10 flex items-center justify-center gap-2">Order Now <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"/></span>
                        </Button>
                      </div>
                   </Card>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Interactive Collage (Tablet/Desktop only) */}
            <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center">
               
               {/* Premium Glow */}
               <div className="food-halo absolute w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-[#FF8A00] to-white rounded-full blur-[60px] opacity-40 mix-blend-overlay z-0" />
               
               {/* Main Center Image */}
               <div className="parallax-layer-1 absolute z-30">
                 <div className="w-[280px] h-[280px] lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden border-[8px] border-white/60 shadow-[0_20px_50px_rgba(255,107,0,0.2)] food-item group relative">
                    <img src="/biryani_3d.png" alt="Biryani" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                 </div>
               </div>

               {/* Top Left Floating Image */}
               <div className="parallax-layer-2 absolute top-8 left-0 lg:top-12 lg:left-4 z-40">
                 <div className="w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden border-[6px] border-white/60 shadow-2xl food-item group relative">
                    <img src="/burger_3d.png" alt="Burger" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
               </div>

               {/* Bottom Right Floating Image */}
               <div className="parallax-layer-2 absolute bottom-8 right-0 lg:bottom-16 lg:right-4 z-20 hidden md:block">
                 <div className="w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] rounded-full overflow-hidden border-[6px] border-white/60 shadow-2xl food-item group relative">
                    <img src="/drink_3d.png" alt="Drink" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
               </div>

               {/* Floating Info Pill */}
               <div className="absolute bottom-1/4 -left-4 lg:left-0 z-50 food-item">
                 <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 shadow-xl border border-white flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                   <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">🔥</div>
                   <div>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Trending</p>
                     <p className="text-sm font-black text-gray-900 leading-tight">Spicy Biryani</p>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
  );
}
