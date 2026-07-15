"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { toggleFavorite, getFavorites } from "@/lib/storage";
import { useCart } from "@/components/CartContext";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  hotel: string;
  isVeg: boolean;
  image?: string;
  popular?: boolean;
}

export function FoodCard({ id, name, price, hotel, isVeg, image, popular }: FoodCardProps) {
  const [isFav, setIsFav] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setIsFav(getFavorites().some(f => f.id === id));
  }, [id]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(toggleFavorite({ id, name, price, hotel, isVeg, image }));
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addItem({ menuItemId: id, name, price, hotel, isVeg, quantity: 1 });
    setTimeout(() => setIsAdding(false), 300); // Ripple effect duration
  };

  return (
    <Card className="overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300 bg-white border-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(255,107,0,0.12)] rounded-[24px] flex flex-col h-full relative">
      <div className="relative h-[140px] sm:h-[160px] w-full overflow-hidden bg-orange-50">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=500&auto=format&fit=crop" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out opacity-90" alt="Biryani Placeholder" />
        )}
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm hover:scale-110 transition-transform z-10"
        >
          <Heart className={cn("w-4 h-4 transition-colors", isFav ? "fill-red-500 text-red-500" : "text-gray-400")} strokeWidth={isFav ? 0 : 2} />
        </button>

        {/* Popular Tag */}
        {popular && (
          <div className="absolute top-0 left-0 bg-[#FF6B00] text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-br-[16px] z-10 shadow-sm">
            Popular Today
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        <h3 className="font-extrabold text-[17px] sm:text-[19px] text-gray-900 leading-tight line-clamp-1">{name}</h3>
        
        <div className="flex items-center gap-1.5 mt-2 mb-5">
          <Star className="w-4 h-4 fill-[#FF8A00] text-[#FF8A00]" />
          <span className="font-bold text-sm text-gray-900">4.7</span>
          <span className="text-xs text-gray-400 font-medium tracking-wide">(432)</span>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-black text-xl sm:text-2xl text-gray-900">₹{price}</span>
          <Button 
            onClick={handleAdd}
            className={cn(
              "rounded-full px-5 font-bold transition-all duration-300 text-sm h-8 sm:h-9",
              isAdding ? "bg-green-500 hover:bg-green-600 text-white" : "bg-[#FF6B00] hover:bg-[#FF8A00] text-white shadow-md shadow-[#FF6B00]/20"
            )}
          >
            {isAdding ? "Added" : "+ Add"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
