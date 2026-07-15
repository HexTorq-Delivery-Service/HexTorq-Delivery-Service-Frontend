import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, MapPin, PackageCheck, ShoppingBag, CheckCircle2 } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "CR-8921" }];
}

export default function OrderTracking() {

  return (
    <div className="container mx-auto px-4 max-w-2xl text-center">
      <FadeIn>
        <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 mb-4 py-1">Runner is Shopping</Badge>
        <h1 className="text-2xl font-bold mb-2">Order #CR-8921</h1>
        <p className="text-muted-foreground mb-8">Pickup Slot: 12:30 PM</p>
      </FadeIn>

      <SlideUp delay={0.1} className="mb-8">
        <Card className="p-6 bg-white dark:bg-zinc-900 border-border/50 inline-block shadow-sm">
          <div className="flex flex-col items-center">
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-xl mb-4">
               <QrCode className="w-32 h-32 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-sm font-medium">Show this at pickup counter</p>
          </div>
        </Card>
      </SlideUp>

      <SlideUp delay={0.2}>
        <div className="text-left max-w-xs mx-auto space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-border before:to-transparent">
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-indigo-600 text-white shadow shrink-0 z-10">
              <CheckCircle2 className="w-5 h-5"/>
            </div>
            <div className="w-[calc(100%-3.5rem)] p-4 rounded-xl border border-border/50 glass shadow-sm ml-4">
              <h3 className="font-bold text-sm">Order Received</h3>
              <p className="text-xs text-muted-foreground">11:15 AM</p>
            </div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-amber-500 text-white shadow shrink-0 z-10 animate-pulse">
              <ShoppingBag className="w-5 h-5"/>
            </div>
            <div className="w-[calc(100%-3.5rem)] p-4 rounded-xl border border-amber-500/30 glass shadow-sm ml-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              <h3 className="font-bold text-sm">Runner Shopping</h3>
              <p className="text-xs text-muted-foreground">At Village Dhaba</p>
            </div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground shadow shrink-0 z-10">
              <MapPin className="w-5 h-5"/>
            </div>
            <div className="w-[calc(100%-3.5rem)] p-4 rounded-xl border border-border/50 bg-muted/30 shadow-sm opacity-60 ml-4">
              <h3 className="font-bold text-sm">Returning to Campus</h3>
              <p className="text-xs text-muted-foreground">Estimated 12:15 PM</p>
            </div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground shadow shrink-0 z-10">
              <PackageCheck className="w-5 h-5"/>
            </div>
            <div className="w-[calc(100%-3.5rem)] p-4 rounded-xl border border-border/50 bg-muted/30 shadow-sm opacity-60 ml-4">
              <h3 className="font-bold text-sm">Ready for Pickup</h3>
              <p className="text-xs text-muted-foreground">At Office Counter</p>
            </div>
          </div>

        </div>
      </SlideUp>
    </div>
  );
}
