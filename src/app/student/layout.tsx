import { ThemeToggle } from "@/components/ThemeToggle";
import { Zap, Home, ShoppingBag, Clock, Wallet } from "lucide-react";
import Link from "next/link";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="glass sticky top-0 z-50 w-full border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm shadow-indigo-500/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Student</span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/student/home" className="hover:text-indigo-500 transition-colors hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Home className="w-4 h-4"/> Home
            </Link>
            <Link href="/student/cart" className="hover:text-indigo-500 transition-colors hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ShoppingBag className="w-4 h-4"/> Cart
            </Link>
            <Link href="/student/orders" className="hover:text-indigo-500 transition-colors hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Clock className="w-4 h-4"/> Orders
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Nav Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 glass border-t border-border/50 z-50 flex items-center justify-around px-2 pb-safe">
         <Link href="/student/home" className="flex flex-col items-center gap-1 text-indigo-500">
           <Home className="w-5 h-5"/> 
           <span className="text-[10px] font-medium">Home</span>
         </Link>
         <Link href="/student/cart" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
           <ShoppingBag className="w-5 h-5"/> 
           <span className="text-[10px] font-medium">Cart</span>
         </Link>
         <Link href="/student/orders" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
           <Clock className="w-5 h-5"/> 
           <span className="text-[10px] font-medium">Orders</span>
         </Link>
         <Link href="/student/wallet" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
           <Wallet className="w-5 h-5"/> 
           <span className="text-[10px] font-medium">Wallet</span>
         </Link>
      </div>

      <main className="flex-1 pb-20 md:pb-0 pt-6">
        {children}
      </main>
    </div>
  );
}
