"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, MapPin, Truck, ArrowLeft } from "lucide-react";
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
            <Card className="p-6 glass border-border/50 shadow-xl shadow-black/5">
              <h2 className="text-2xl font-bold mb-2">Find Your Order</h2>
              <p className="text-muted-foreground mb-6">Enter your details to track your food.</p>
              <form onSubmit={handleTrack} className="space-y-4">
                <Input required placeholder="Order ID (e.g. ORD-1234)" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="h-12 bg-background"/>
                <Input required type="tel" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="h-12 bg-background"/>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg">Track Now</Button>
              </form>
            </Card>
          </FadeIn>
        ) : (
          <SlideUp>
            {/* Success Banner with Wave */}
            <div className="relative bg-[#FF8A00] text-white rounded-t-3xl p-8 pt-10 text-center overflow-hidden mb-6 shadow-lg shadow-[#FF8A00]/20">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 animate-bounce drop-shadow-md" />
              <h2 className="text-2xl font-black mb-1 drop-shadow-sm">Order Placed Successfully!</h2>
              <p className="text-white/90 font-medium mb-6 drop-shadow-sm">Payment Received</p>
              
              {/* Animated SVG Wave at bottom */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                  <svg className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[60px] text-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
                  </svg>
              </div>
            </div>

            <div className="mb-8 px-2">
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
