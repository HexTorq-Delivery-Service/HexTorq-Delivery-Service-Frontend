import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Clock } from "lucide-react";
import Link from "next/link";

export default function StudentCart() {
  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <FadeIn>
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      </FadeIn>

      <SlideUp delay={0.1}>
        {/* Dummy Cart Items */}
        <div className="space-y-4 mb-8">
          <Card className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm md:text-base">Paneer Butter Masala</h3>
              <p className="text-xs text-muted-foreground mb-1">Village Dhaba</p>
              <p className="font-bold text-sm">₹120</p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full"><Minus className="h-3 w-3"/></Button>
              <span className="font-medium text-sm">1</span>
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full"><Plus className="h-3 w-3"/></Button>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm md:text-base">Garlic Naan</h3>
              <p className="text-xs text-muted-foreground mb-1">Village Dhaba</p>
              <p className="font-bold text-sm">₹60</p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full"><Minus className="h-3 w-3"/></Button>
              <span className="font-medium text-sm">2</span>
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full"><Plus className="h-3 w-3"/></Button>
            </div>
          </Card>
        </div>
      </SlideUp>

      <SlideUp delay={0.2}>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Clock className="w-5 h-5"/> Select Pickup Slot</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button variant="outline" className="h-12 border-indigo-500 bg-indigo-500/10 text-indigo-600">12:30 PM</Button>
            <Button variant="outline" className="h-12 text-muted-foreground">1:30 PM</Button>
            <Button variant="outline" className="h-12 text-muted-foreground">6:30 PM</Button>
          </div>
        </div>

        <Card className="p-4 bg-muted/30 border-border/50 mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹180</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Platform Fee</span>
            <span>₹10</span>
          </div>
          <div className="border-t border-border/50 my-2 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>₹190</span>
          </div>
        </Card>

        <Button className="w-full h-14 text-base rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25">
          <Link href="/student/order/demo-id" className="w-full h-full flex items-center justify-center">
            Place Order & Pay
          </Link>
        </Button>
      </SlideUp>
    </div>
  );
}
