import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

// Dummy Data
const HOTELS = [
  { id: 1, name: "Village Dhaba", tag: "Most Popular", rating: 4.8 },
  { id: 2, name: "Royal Spice", tag: "Fastest Prep", rating: 4.5 },
];

const MENU = [
  { id: 1, hotelId: 1, name: "Paneer Butter Masala", price: 120, type: "Veg" },
  { id: 2, hotelId: 1, name: "Garlic Naan", price: 30, type: "Veg" },
  { id: 3, hotelId: 2, name: "Chicken Biryani", price: 180, type: "Non-Veg" },
];

export default function StudentHome() {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <FadeIn>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">What are you craving?</h1>
        <p className="text-muted-foreground mb-6">Order from local village hotels in one cart.</p>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            placeholder="Search dishes, hotels..." 
            className="pl-10 h-12 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-indigo-500"
          />
        </div>
      </FadeIn>

      <SlideUp delay={0.1}>
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 whitespace-nowrap">All Items</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer whitespace-nowrap">Budget &lt; ₹80</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer whitespace-nowrap">Daily Specials</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer whitespace-nowrap">Veg Only</Badge>
        </div>
      </SlideUp>

      <div className="space-y-10 mt-6">
        {HOTELS.map((hotel, idx) => (
          <SlideUp key={hotel.id} delay={0.1 * (idx + 2)}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {hotel.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px] bg-amber-500/10 text-amber-600">{hotel.tag}</Badge>
                  <span className="text-xs text-muted-foreground">⭐ {hotel.rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MENU.filter(m => m.hotelId === hotel.id).map(item => (
                <Card key={item.id} className="p-4 flex items-center justify-between hover:border-indigo-500/30 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <h3 className="font-medium text-sm md:text-base">{item.name}</h3>
                    </div>
                    <p className="font-bold text-muted-foreground">₹{item.price}</p>
                  </div>
                  <Button size="icon" variant="secondary" className="rounded-full w-8 h-8 shrink-0 hover:bg-indigo-500 hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </SlideUp>
        ))}
      </div>
    </div>
  );
}
