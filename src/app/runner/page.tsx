"use client";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MapPin, Truck } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Button } from "@/components/ui/button";

export default function RunnerDashboard() {
  return (
    <div className="container mx-auto px-4 max-w-3xl pt-8 pb-12">
      <FadeIn>
        <div className="flex items-center gap-3 mb-6">
           <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center">
             <Truck className="w-6 h-6" />
           </div>
           <div>
             <h1 className="text-3xl font-bold">Runner Dashboard</h1>
             <p className="text-muted-foreground">Manage active batches and hotel pickups.</p>
           </div>
        </div>
      </FadeIn>

      <SlideUp delay={0.1}>
        <h2 className="font-bold text-xl mb-4">Active Batch #B-491</h2>
        <Card className="glass border-border/50 p-6 relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          
          <div className="mb-6 space-y-6 relative before:absolute before:inset-0 before:ml-[1.15rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-border before:z-0">
            {/* Sequence */}
            <div className="flex gap-4 relative z-10 items-start">
              <div className="w-9 h-9 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0 text-xs font-bold text-primary">1</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Village Dhaba</h3>
                <Card className="p-4 bg-muted/30 border-border/50 flex justify-between items-center hover:border-primary/30 transition-colors">
                  <div>
                    <p className="font-medium">Paneer Butter Masala <span className="text-primary text-xs font-bold bg-primary/10 px-1.5 py-0.5 rounded">x5</span></p>
                    <p className="text-xs text-muted-foreground mt-1">₹1100</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">Mark Paid</Button>
                </Card>
              </div>
            </div>
            
            <div className="flex gap-4 relative z-10 items-start">
              <div className="w-9 h-9 rounded-full bg-primary border-2 border-primary flex items-center justify-center shrink-0 text-white">
                <MapPin className="w-4 h-4"/>
              </div>
              <div>
                <h3 className="font-bold text-lg">Return to Office</h3>
                <p className="text-sm text-muted-foreground">Campus Counter</p>
              </div>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl text-base shadow-lg shadow-primary/25 text-white">
            Complete Batch & Return
          </Button>
        </Card>
      </SlideUp>
    </div>
  );
}
