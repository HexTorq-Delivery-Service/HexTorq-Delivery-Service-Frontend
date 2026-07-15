"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart } from "lucide-react";
import { useState } from "react";
import { getFavorites, FavoriteItem } from "@/lib/storage";
import { FoodCard } from "./FoodCard";

export function FavoritesModal() {
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setFavorites(getFavorites());
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger render={<button className="bg-primary/10 hover:bg-primary/20 text-primary p-2 sm:p-2.5 rounded-xl shadow-sm transition-colors flex items-center justify-center" />}>
        <Heart className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] w-[95vw] max-h-[85vh] overflow-y-auto glass border-border/50 p-4 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" /> Your Favorites
          </DialogTitle>
        </DialogHeader>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
             <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p className="font-bold text-lg">No favorites yet</p>
             <p>Tap the heart icon on any food item to save it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
            {favorites.map((fav) => (
              <FoodCard 
                key={fav.id}
                id={fav.id}
                name={fav.name}
                price={fav.price}
                hotel={fav.hotel}
                isVeg={fav.isVeg}
                image={fav.image}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
