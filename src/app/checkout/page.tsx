"use client";

import { useCart } from "@/components/CartContext";

import { SlideUp } from "@/components/animations/SlideUp";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addOrderToHistory } from "@/lib/storage";

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pickupTime: "12:30 PM",
    payment: "CASH",
    notes: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const serviceFee = 20;
  const grandTotal = total + (items.length > 0 ? serviceFee : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = "ORD-" + Math.floor(Math.random() * 10000);
      const token = Math.floor(1000 + Math.random() * 9000).toString();
      
      addOrderToHistory({
        id: orderId,
        token: token,
        mobileNumber: formData.mobile,
        createdAt: new Date().toISOString(),
      });

      clearCart();
      router.push(`/track?id=${orderId}&mobile=${formData.mobile}`);
    }, 1500);
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button className="bg-primary hover:bg-primary/90 text-white"><Link href="/" className="w-full h-full flex items-center justify-center">Browse Food</Link></Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      <nav className="glass sticky top-0 z-50 w-full border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Link href="/" className="w-full h-full flex items-center justify-center"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <span className="font-bold text-lg">Checkout</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-8 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <SlideUp delay={0.1} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4 flex gap-4 glass">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="font-semibold text-lg">₹{item.price * item.quantity}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.hotel}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-1 border border-border/50">
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"><Minus className="w-4 h-4"/></button>
                        <span className="font-semibold w-4 text-center">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"><Plus className="w-4 h-4"/></button>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center">
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-6 glass">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Item Total</span><span>₹{total}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service Fee</span><span>₹{serviceFee}</span></div>
              <div className="pt-3 border-t border-border/50 flex justify-between font-bold text-xl">
                <span>Grand Total</span><span>₹{grandTotal}</span>
              </div>
            </div>
          </Card>
        </SlideUp>

        <SlideUp delay={0.2}>
          <Card className="p-6 glass">
            <h2 className="text-2xl font-bold mb-6">Pickup Details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input required placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-12 bg-background"/>
              </div>
              
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input required type="tel" placeholder="10-digit mobile number" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="h-12 bg-background"/>
                <p className="text-xs text-muted-foreground">Used for order tracking (No OTP required).</p>
              </div>

              <div className="space-y-2">
                <Label>Pickup Time</Label>
                <Select value={formData.pickupTime} onValueChange={(val) => setFormData({...formData, pickupTime: val || ""})}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Select slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12:30 PM">12:30 PM</SelectItem>
                    <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                    <SelectItem value="7:30 PM">7:30 PM</SelectItem>
                    <SelectItem value="8:30 PM">8:30 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={formData.payment} onValueChange={(val) => setFormData({...formData, payment: val || ""})}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Select payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPI">UPI (Google Pay, PhonePe)</SelectItem>
                    <SelectItem value="CASH">Cash at Pickup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Optional Notes</Label>
                <Textarea placeholder="E.g., Less spicy, extra onions" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="resize-none bg-background"/>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 mt-4">
                {isSubmitting ? "Processing..." : `Place Order • ₹${grandTotal}`}
              </Button>
            </form>
          </Card>
        </SlideUp>

      </div>
    </main>
  );
}
