"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, MapPin, Truck, ArrowLeft, Search, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

function TrackContent() {
  const searchParams = useSearchParams();
  const initId = searchParams.get("id") || "";
  const initMobile = searchParams.get("mobile") || "";

  const [orderId, setOrderId] = useState(initId);
  const [mobile, setMobile] = useState(initMobile);
  const [isTracking, setIsTracking] = useState(!!initId && !!initMobile);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && mobile) setIsTracking(true);
  };

  const steps = [
    { label: "Order Received", icon: Clock, done: true },
    { label: "Waiting for Runner", icon: Truck, done: true },
    { label: "Runner Purchasing Food", icon: MapPin, done: false, active: true },
    { label: "Returning to Pickup Center", icon: Truck, done: false },
    { label: "Ready for Pickup", icon: CheckCircle2, done: false },
  ];

  return (
    <main className="min-h-screen bg-background pb-24">
      <nav className="glass sticky top-0 z-50 w-full border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <span className="font-bold text-lg">Track Order</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-8 max-w-xl">
        {!isTracking ? (
          <FadeIn>
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[28px] shadow-[0_8px_40px_rgba(255,107,0,0.08)] p-6 sm:p-8">
              <div className="flex flex-col items-center mb-6 text-center">
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-3 border border-orange-100">
                  <Search className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">Track Your Order</h2>
                <p className="text-gray-500 font-medium">Enter your details to see live updates</p>
              </div>
              
              <form onSubmit={handleTrack} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    required 
                    placeholder="Order ID (e.g. ORD-1234)" 
                    value={orderId} 
                    onChange={(e) => setOrderId(e.target.value)} 
                    className="w-full h-13 pl-11 pr-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none font-medium text-gray-900 placeholder:text-gray-400 transition-all py-3.5"
                  />
                </div>
                
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    required 
                    type="tel" 
                    placeholder="Mobile Number" 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} 
                    className="w-full h-13 pl-11 pr-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none font-medium text-gray-900 placeholder:text-gray-400 transition-all py-3.5"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full h-13 mt-2 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-black text-base shadow-lg shadow-[#FF6B00]/30 hover:shadow-[#FF6B00]/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 py-3.5"
                >
                  Track Now <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </FadeIn>
        ) : (
          <SlideUp>
            {/* Success Banner */}
            <div className="relative bg-gradient-to-br from-[#FF8A00] to-[#FF6B00] text-white text-center pt-12 pb-16 px-8 shadow-lg shadow-[#FF8A00]/25 overflow-hidden">
              {/* Background circles for depth */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              {/* Icon with glow ring */}
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute w-20 h-20 bg-white/20 rounded-full animate-ping opacity-30" />
                <div className="relative w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-white drop-shadow" />
                </div>
              </div>

              <h2 className="text-2xl font-black mb-1">Order Placed Successfully!</h2>
              <p className="text-white/85 font-medium">Payment Received</p>

              {/* Clean arc bottom */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10 text-background fill-current">
                  <ellipse cx="600" cy="60" rx="700" ry="60" />
                </svg>
              </div>
            </div>

            <div className="mb-8 mt-8 px-2">
              <h2 className="text-2xl font-bold">Order #{orderId}</h2>
              <p className="text-muted-foreground font-medium">Tracking for: {mobile}</p>
            </div>
            
            <Card className="p-6 glass mb-6 border-border/50">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-border/50">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pickup Token</p>
                  <p className="text-3xl font-black text-primary">A492</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Time</p>
                  <p className="text-xl font-bold">12:35 PM</p>
                </div>
              </div>

              <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-border before:z-0">
                {steps.map((step, i) => (
                  <div key={i} className={cn("flex gap-4 relative z-10 items-start", !step.done && !step.active && "opacity-50")}>
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 bg-background transition-colors",
                      step.done ? "border-green-500 bg-green-500/10 text-green-500" : 
                      step.active ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(249,115,22,0.5)]" : 
                      "border-border text-muted-foreground"
                    )}>
                      {step.done ? <CheckCircle2 className="w-4 h-4"/> : <step.icon className={cn("w-4 h-4", step.active && "animate-pulse")}/>}
                    </div>
                    <div>
                      <h3 className={cn("font-bold text-base", step.active ? "text-primary" : "")}>{step.label}</h3>
                      {step.active && <p className="text-sm text-muted-foreground mt-1">Our runner is currently picking up your items.</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Button onClick={() => setIsTracking(false)} variant="outline" className="w-full h-12 rounded-xl border-border/50 hover:bg-black/5 dark:hover:bg-white/5">Track Another Order</Button>
          </SlideUp>
        )}
      </div>
    </main>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading tracker...</div>}>
      <TrackContent />
    </Suspense>
  );
}
