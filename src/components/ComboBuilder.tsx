"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

const combos = [
  {
    id: "combo-1",
    name: "Chicken Fried Rice",
    mainPrice: 90,
    hotel: "Sri Murugan Mess",
    isVeg: false,
    items: [
      { id: "c1-i1", name: "Coke (250ml)", price: 20 },
      { id: "c1-i2", name: "Chicken 65", price: 70 },
    ],
    discount: 25,
    finalPrice: 155,
  },
  {
    id: "combo-2",
    name: "Veg Meals",
    mainPrice: 70,
    hotel: "A2B Hotel",
    isVeg: true,
    items: [
      { id: "c2-i1", name: "Buttermilk", price: 15 },
      { id: "c2-i2", name: "Gobi 65", price: 50 },
    ],
    discount: 15,
    finalPrice: 120,
  },
  {
    id: "combo-3",
    name: "Egg Parotta",
    mainPrice: 80,
    hotel: "Amma Hotel",
    isVeg: false,
    items: [
      { id: "c3-i1", name: "Kalaki", price: 25 },
      { id: "c3-i2", name: "Sprite (250ml)", price: 20 },
    ],
    discount: 15,
    finalPrice: 110,
  }
];

export function ComboBuilder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || isAdding) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % combos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, isAdding]);

  const nextCombo = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % combos.length);
  };



  const combo = combos[currentIndex];

  const handleAddCombo = () => {
    if (isAdding) return;
    setIsAdding(true);
    
    // Add Main Item
    addItem({ menuItemId: `${combo.id}-main`, name: combo.name, price: combo.mainPrice, hotel: combo.hotel, isVeg: combo.isVeg, quantity: 1 });
    
    // Add Sub Items
    combo.items.forEach(item => {
       addItem({ menuItemId: item.id, name: item.name, price: item.price, hotel: combo.hotel, isVeg: combo.isVeg, quantity: 1 });
    });
    
    // Add Discount
    addItem({ menuItemId: `${combo.id}-discount`, name: `Combo Discount`, price: -combo.discount, hotel: "System", isVeg: true, quantity: 1 });
    
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <Card 
      className="p-6 glass border-border/50 bg-primary/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       <div className="flex justify-between items-center mb-2">
         <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-3 py-1 text-sm font-bold">Combo Builder</Badge>
       </div>

       <div className="relative min-h-[220px] flex items-center overflow-hidden">
         <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col md:flex-row gap-6 items-center w-full pt-2"
            >
              <div className="flex-1 w-full">
                <h2 className="text-3xl font-black mb-2">{combo.name}</h2>
                <p className="text-muted-foreground mb-4 font-medium">Frequently Ordered With:</p>
                
                <div className="space-y-3">
                  {combo.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card/80 transition-colors shadow-sm">
                      <span className="font-bold flex-1">{item.name}</span>
                      <span className="font-bold text-muted-foreground">+₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-64 bg-card p-6 rounded-3xl shadow-xl text-center border border-border/50 flex flex-col justify-center relative">
                {isAdding && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: -40 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg whitespace-nowrap"
                  >
                    Added to cart!
                  </motion.div>
                )}
                
                <p className="text-sm font-bold text-green-500 mb-1">Save ₹{combo.discount}</p>
                <p className="text-4xl font-black mb-6">₹{combo.finalPrice}</p>
                <Button 
                  onClick={handleAddCombo} 
                  disabled={isAdding}
                  className={`w-full h-12 rounded-xl text-white font-bold text-lg shadow-md transition-all ${isAdding ? 'bg-green-500 hover:bg-green-600 scale-95 opacity-90' : 'bg-primary hover:bg-primary/90 shadow-primary/20'}`}
                >
                  {isAdding ? <><Check className="w-5 h-5 mr-1" /> Added!</> : "Add Combo"}
                </Button>
              </div>
           </motion.div>
         </AnimatePresence>
       </div>
    </Card>
  );
}
