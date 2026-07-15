"use client";

import { useCart } from "@/components/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function FloatingCart() {
  const { itemCount, total } = useCart();
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    if (itemCount > 0) {
      setAnimateKey(prev => prev + 1);
    }
  }, [itemCount]);

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-24 md:bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Link href="/checkout" className="w-full group block">
        <motion.div 
          key={animateKey}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 0.95, 1.02, 1] }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] backdrop-blur-md text-white rounded-full p-2 sm:p-3 pl-3 sm:pl-4 flex items-center justify-between shadow-xl shadow-[#FF8A00]/30 transition-all active:scale-[0.98] group-hover:shadow-2xl group-hover:shadow-[#FF8A00]/40 border border-white/30"
        >
          <div className="flex items-center gap-2 sm:gap-3">
             <div className="w-10 h-10 shrink-0 bg-white/20 rounded-full flex items-center justify-center relative overflow-hidden group-hover:bg-white/30 transition-colors">
               <ShoppingBag className="w-5 h-5 relative z-10 text-white" />
               <motion.div
                 key={animateKey}
                 initial={{ y: -20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="absolute inset-0 bg-white/40"
                 transition={{ duration: 0.4, ease: "easeOut" }}
               />
             </div>
             <div className="flex flex-col">
               <span className="font-semibold text-xs sm:text-sm leading-none mb-1 opacity-90">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
               <span className="font-black text-sm sm:text-base leading-none">₹{total}</span>
             </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 font-black text-sm bg-white text-[#FF6B00] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full group-hover:scale-105 transition-all shadow-sm ml-2">
            View Cart <ArrowRight className="w-4 h-4 ml-1 hidden sm:block group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
