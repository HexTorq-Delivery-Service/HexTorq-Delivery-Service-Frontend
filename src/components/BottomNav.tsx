"use client";
import { useState } from "react";
import { Home, Store, Heart, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "hotels", label: "Hotels", icon: Store },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "track", label: "Track", icon: Navigation },
];

export function BottomNav({ activeTab, onTabChange }: { activeTab: string, onTabChange: (id: string) => void }) {

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[420px] z-50 pointer-events-none">
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-[#FF8A00]/15 rounded-full px-2 py-2 flex items-center justify-between pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/10 to-[#FF8A00]/5 rounded-full border border-[#FF8A00]/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <motion.div
                initial={false}
                animate={{ 
                   y: isActive ? -6 : 0,
                   scale: isActive ? 1.1 : 1 
                }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                className={cn("relative z-10 transition-colors duration-300", isActive ? "text-[#FF6B00]" : "text-gray-400")}
              >
                <Icon className={cn("w-6 h-6", isActive && "fill-[#FF6B00]/20")} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              
              <motion.span
                initial={false}
                animate={{ 
                   opacity: isActive ? 1 : 0,
                   y: isActive ? 0 : 10,
                   scale: isActive ? 1 : 0.8
                }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                className={cn("text-[10px] font-bold absolute bottom-2 tracking-tight", isActive ? "text-[#FF6B00]" : "text-gray-400")}
              >
                {item.label}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
