"use client";

import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Users } from "lucide-react";
import { motion } from "framer-motion";

export function ReceivingPointCard() {
  return (
    <Card className="overflow-hidden border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(255,107,0,0.08)] rounded-[32px] relative group">
      {/* Map Background Wrapper */}
      <div className="relative h-48 sm:h-56 w-full bg-[#FFF9F3] overflow-hidden">
        {/* Decorative Grid background */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none" 
          style={{ backgroundImage: "linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
        
        {/* Pulsing Radar Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 3], opacity: [0.3, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-12 h-12 bg-[#FF6B00] rounded-full"
          />
          <motion.div 
            animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} 
            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
            className="absolute w-12 h-12 bg-[#FF6B00] rounded-full"
          />
          {/* Center Pin */}
          <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.3)]">
            <MapPin className="w-5 h-5 text-[#FF6B00] fill-[#FF6B00]" />
          </div>
        </div>

        {/* Floating Route Line (Decorative) */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
           <path d="M-50,200 Q150,150 200,90 T400,20" fill="none" stroke="#FF6B00" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
        </svg>

        {/* Live Badge */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md border border-[#FF8A00]/20 rounded-full px-3 py-1 flex items-center gap-2 shadow-sm">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[#FF6B00] text-xs font-black tracking-wider uppercase">Active Node</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 relative bg-white/40">
        <div className="flex items-start justify-between mb-6">
           <div>
             <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mb-1">Primary Receiving Point</p>
             <h3 className="text-xl font-black text-gray-900 leading-none mb-1.5">Campus Main Gate</h3>
             <a 
               href="https://maps.google.com/?q=10.879733,76.928671" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#FF6B00] transition-colors"
             >
                10°52&apos;47.0&quot;N 76°55&apos;43.2&quot;E
             </a>
           </div>
           <a 
             href="https://maps.google.com/?q=10.879733,76.928671" 
             target="_blank" 
             rel="noopener noreferrer"
             className="p-2 bg-orange-50 rounded-full border border-orange-100 hover:bg-[#FF6B00] group/nav transition-colors"
           >
             <Navigation className="w-5 h-5 text-[#FF6B00] group-hover/nav:text-white transition-colors" />
           </a>
        </div>

        {/* Live Queue Status */}
        <div className="pt-5 border-t border-orange-200/50">
          <div className="flex items-center gap-2 mb-4 text-[#FF6B00] justify-center">
            <Users className="w-5 h-5" />
            <h4 className="text-sm font-black uppercase tracking-wide">Live Counter Queue</h4>
          </div>
          
          <div className="flex justify-center gap-3 sm:gap-6">
            <div className="text-center p-3 bg-white/60 rounded-2xl border border-orange-100 shadow-sm flex-1">
               <div className="text-xs font-bold text-gray-500 mb-1">Queue</div>
               <div className="text-xl sm:text-2xl font-black text-gray-900">#18</div>
            </div>
            <div className="text-center p-3 bg-[#FF6B00]/10 rounded-2xl border border-[#FF6B00]/20 flex-1 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B00]/5 to-transparent pointer-events-none" />
               <div className="text-xs font-bold text-[#FF6B00] mb-1 relative z-10">Serving</div>
               <div className="text-xl sm:text-2xl font-black text-[#FF6B00] relative z-10">#15</div>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-2xl border border-orange-100 shadow-sm flex-1">
               <div className="text-xs font-bold text-gray-500 mb-1">Avg Wait</div>
               <div className="text-xl sm:text-2xl font-black text-gray-900">3m</div>
            </div>
          </div>
        </div>

      </div>
    </Card>
  );
}
