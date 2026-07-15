"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, UtensilsCrossed } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 max-w-5xl pt-8 pb-12">
      <FadeIn>
        <div className="flex items-center gap-3 mb-8">
           <div className="w-12 h-12 bg-slate-800 text-white rounded-2xl flex items-center justify-center">
             <Settings className="w-6 h-6" />
           </div>
           <div>
             <h1 className="text-3xl font-bold">Admin Portal</h1>
             <p className="text-muted-foreground">Manage platform settings, menus, and roles.</p>
           </div>
        </div>
      </FadeIn>

      <SlideUp delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50 glass hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <UtensilsCrossed className="w-5 h-5" />
             </div>
             <h2 className="text-xl font-bold">Hotels & Menus</h2>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center py-2 border-b border-border/50">
               <span className="font-medium">Village Dhaba</span>
               <Badge variant="outline" className="text-green-500 border-green-500/30">24 Items</Badge>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-border/50">
               <span className="font-medium">Royal Spice</span>
               <Badge variant="outline" className="text-green-500 border-green-500/30">12 Items</Badge>
             </div>
          </div>
          <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white shadow-md">Manage Menus</Button>
        </Card>

        <Card className="p-6 border-border/50 glass hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-5 h-5" />
             </div>
             <h2 className="text-xl font-bold">Platform Stats</h2>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center py-2 border-b border-border/50">
               <span className="font-medium">Today&apos;s Orders</span>
               <span className="font-bold">42</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-border/50">
               <span className="font-medium">Active Runners</span>
               <span className="font-bold text-amber-500">2 On Shift</span>
             </div>
          </div>
          <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white shadow-md">View Full Analytics</Button>
        </Card>
      </SlideUp>
    </div>
  );
}
