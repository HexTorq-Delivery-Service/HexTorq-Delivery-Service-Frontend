"use client";
import { useCart } from "@/components/CartContext";
import { HeroSection } from "@/components/animations/HeroSection";
import { GsapReveal } from "@/components/animations/GsapReveal";
import { PremiumBackground } from "@/components/animations/PremiumBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Zap, TrendingUp, Wallet, CheckSquare, Users, Bike, Heart } from "lucide-react";
import Link from "next/link";
import { RunnerLogo } from "@/components/RunnerLogo";
import { FoodCard } from "@/components/FoodCard";
import { FloatingCart } from "@/components/FloatingCart";
import { BottomNav } from "@/components/BottomNav";
import { ReceivingPointCard } from "@/components/ReceivingPointCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState("home");

  const scrollToTrending = () => {
    document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen relative pb-32 selection:bg-primary/30 selection:text-primary">
      <PremiumBackground />
      {/* Top Navigation */}
      <nav className="glass sticky top-0 z-50 w-full border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RunnerLogo className="w-12 h-12 -ml-2" />
            <span className="font-extrabold text-2xl tracking-tight text-foreground -ml-1">
              FoodHub Campus
            </span>
          </div>
        </div>
      </nav>

      <div className={cn("block", activeTab === "home" ? "block" : "hidden md:block")}>
        <HeroSection onOrderNow={scrollToTrending} />
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* ========================================================= */}
        {/* HOTELS TAB CONTENT (Mobile) / ALL CONTENT (Desktop) */}
        {/* ========================================================= */}
        <div className={cn("space-y-12 md:space-y-20 pt-6 md:pt-0", activeTab === "hotels" ? "block" : "hidden md:block md:mt-20")}>
          
          {/* Categories */}
          <GsapReveal>
            <div className="flex items-center gap-2 mb-6 md:hidden">
              <h2 className="text-2xl font-black">Categories</h2>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar px-1">
               {[
                 { name: "Chicken", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop" },
                 { name: "Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop" },
                 { name: "Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop" },
                 { name: "Meals", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=200&auto=format&fit=crop" },
                 { name: "Biryani", img: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=200&auto=format&fit=crop" },
                 { name: "Drinks", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=200&auto=format&fit=crop" },
               ].map((cat, i) => (
                 <div key={i} className="flex flex-col items-center gap-3 shrink-0 snap-center cursor-pointer group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card border-[3px] border-border/50 flex items-center justify-center shadow-sm overflow-hidden group-hover:shadow-md group-hover:border-primary/60 group-hover:-translate-y-1 transition-all duration-300">
                       <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-muted-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                 </div>
               ))}
            </div>
          </GsapReveal>

          {/* Today's Hotels */}
        <GsapReveal>
          <h2 className="text-2xl font-black mb-6">Popular Hotels</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-hidden glass border-border/50 group cursor-pointer hover:border-primary/30 transition-all">
              <div className="h-32 bg-muted/30 relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Amma Hotel" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 z-0 pointer-events-none" />
                 <div className="absolute bottom-4 left-4 text-white z-10">
                    <h3 className="text-2xl font-black">AMMA HOTEL</h3>
                    <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                 </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Today's Special</p>
                     <p className="font-bold text-lg">Chicken Meals</p>
                     <p className="text-xl font-black text-foreground">₹120</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-muted-foreground mb-1">25 students ordered today</p>
                     <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-none">Ready in Next Trip</Badge>
                   </div>
                </div>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" className="w-full rounded-xl border-border hover:bg-primary/5 hover:text-primary" />}>
                    View Menu
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[850px] w-[95vw] max-h-[85vh] overflow-y-auto glass border-border/50 p-4 sm:p-8">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black">AMMA HOTEL Menu</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-8 mt-4 pb-12">
                      <section>
                        <h3 className="font-bold text-xl mb-4 text-primary">Rice & Biryani</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <FoodCard id="am1" name="Chicken Biryani" price={160} hotel="Amma Hotel" isVeg={false} popular />
                          <FoodCard id="am2" name="Egg Fried Rice" price={90} hotel="Amma Hotel" isVeg={false} />
                        </div>
                      </section>
                      <section>
                        <h3 className="font-bold text-xl mb-4 text-primary">Gravy & Curries</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <FoodCard id="am3" name="Chicken Chettinad" price={140} hotel="Amma Hotel" isVeg={false} popular />
                          <FoodCard id="am4" name="Paneer Butter Masala" price={120} hotel="Amma Hotel" isVeg={true} />
                        </div>
                      </section>
                      <section>
                        <h3 className="font-bold text-xl mb-4 text-primary">Drinks & Beverages</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <FoodCard id="am5" name="Fresh Lime Soda" price={40} hotel="Amma Hotel" isVeg={true} />
                          <FoodCard id="am6" name="Coke (250ml)" price={20} hotel="Amma Hotel" isVeg={true} />
                        </div>
                      </section>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <Card className="overflow-hidden glass border-border/50 group cursor-pointer hover:border-primary/30 transition-all">
              <div className="h-32 bg-muted/30 relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Village Dhaba" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 z-0 pointer-events-none" />
                 <div className="absolute bottom-4 left-4 text-white z-10">
                    <h3 className="text-2xl font-black">VILLAGE DHABA</h3>
                    <div className="text-yellow-400 text-sm">⭐⭐⭐⭐</div>
                 </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Top Rated</p>
                     <p className="font-bold text-lg">Paneer Butter Masala</p>
                     <p className="text-xl font-black text-foreground">₹220</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-muted-foreground mb-1">12 students ordered today</p>
                     <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-none">Ready in Next Trip</Badge>
                   </div>
                </div>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" className="w-full rounded-xl border-border hover:bg-primary/5 hover:text-primary" />}>
                    View Menu
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[850px] w-[95vw] max-h-[85vh] overflow-y-auto glass border-border/50 p-4 sm:p-8">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black">VILLAGE DHABA Menu</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-8 mt-4 pb-12">
                      <section>
                        <h3 className="font-bold text-xl mb-4 text-primary">Rice & Breads</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <FoodCard id="vd1" name="Veg Pulao" price={110} hotel="Village Dhaba" isVeg={true} popular />
                          <FoodCard id="vd2" name="Garlic Naan" price={45} hotel="Village Dhaba" isVeg={true} />
                        </div>
                      </section>
                      <section>
                        <h3 className="font-bold text-xl mb-4 text-primary">Gravy & Curries</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <FoodCard id="vd3" name="Dal Makhani" price={130} hotel="Village Dhaba" isVeg={true} popular />
                          <FoodCard id="vd4" name="Kadai Paneer" price={150} hotel="Village Dhaba" isVeg={true} />
                        </div>
                      </section>
                      <section>
                        <h3 className="font-bold text-xl mb-4 text-primary">Drinks & Desserts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <FoodCard id="vd5" name="Sweet Lassi" price={50} hotel="Village Dhaba" isVeg={true} popular />
                          <FoodCard id="vd6" name="Gulab Jamun" price={40} hotel="Village Dhaba" isVeg={true} />
                        </div>
                      </section>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>
        </GsapReveal>
        </div>

        {/* ========================================================= */}
        {/* HOME TAB CONTENT (Mobile) / ALL CONTENT (Desktop) */}
        {/* ========================================================= */}
        <div className={cn("space-y-8 md:space-y-20", activeTab === "home" ? "block mt-4 md:mt-0" : "hidden md:block md:mt-20")}>
        
        {/* Trending Section */}
        <GsapReveal>
          <div id="trending" className="flex items-center justify-between mb-4 scroll-mt-24 px-1">
            <h2 className="text-lg md:text-xl font-black text-[#FF6B00] uppercase tracking-wide">POPULAR RIGHT NOW 🔥</h2>
            <Link href="#" className="text-sm font-bold text-[#FF6B00] hover:underline">View All &rarr;</Link>
          </div>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x hide-scrollbar px-1">
            <div className="w-[260px] sm:w-[300px] shrink-0 snap-center">
              <FoodCard id="t1" name="Chicken Fried Rice" price={90} hotel="Sri Murugan Mess" isVeg={false} popular />
            </div>
            <div className="w-[260px] sm:w-[300px] shrink-0 snap-center">
              <FoodCard id="t2" name="Egg Kothu Parotta" price={80} hotel="Amma Hotel" isVeg={false} popular />
            </div>
            <div className="w-[260px] sm:w-[300px] shrink-0 snap-center">
              <FoodCard id="t3" name="Veg Meals" price={70} hotel="A2B Hotel" isVeg={true} popular />
            </div>
          </div>
        </GsapReveal>

        {/* Budget Meals */}
        <GsapReveal>
          <div className="mb-6">
            <h2 className="text-2xl font-black">Student Budget Meals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <FoodCard id="b1" name="Mini Tiffin" price={50} hotel="A2B Hotel" isVeg={true} popular />
            <FoodCard id="b2" name="Egg Fried Rice" price={80} hotel="Amma Hotel" isVeg={false} />
            <FoodCard id="b3" name="Half Chicken Biryani" price={100} hotel="Sri Murugan Mess" isVeg={false} popular />
            <FoodCard id="b4" name="Full Veg Meals" price={120} hotel="Village Dhaba" isVeg={true} />
          </div>
        </GsapReveal>

        </div>

        {/* ========================================================= */}
        {/* TRACK TAB CONTENT (Mobile) / ALL CONTENT (Desktop) */}
        {/* ========================================================= */}
        <div className={cn("space-y-12 md:space-y-20 pt-6", activeTab === "track" ? "block" : "hidden md:block md:mt-20")}>
        
        {/* Innovative Receiving Point Map */}
        <GsapReveal>
          <ReceivingPointCard />
        </GsapReveal>
        </div>

        {/* ========================================================= */}
        {/* FAVORITES TAB CONTENT (Mobile ONLY) */}
        {/* ========================================================= */}
        <div className={cn("space-y-12 pt-6", activeTab === "favorites" ? "block md:hidden" : "hidden")}>
          <GsapReveal>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-primary">Your Favorites</h2>
              <p className="text-muted-foreground text-sm">Items you've loved</p>
            </div>
            <Card className="p-8 glass border-border/50 text-center bg-card flex flex-col items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-bold mb-2">No Favorites Yet</h3>
              <p className="text-sm text-muted-foreground">Tap the heart icon on any food item to save it here.</p>
            </Card>
          </GsapReveal>
        </div>

      </div>

      <FloatingCart />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
