import { cn } from "@/lib/utils";

export function RunnerLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)} xmlns="http://www.w3.org/2000/svg">
      {/* Cloche Dome - Primary Color */}
      <g className="text-primary" fill="currentColor">
        <circle cx="50" cy="22" r="6" />
        <path d="M 20 55 Q 20 28 50 28 Q 80 28 80 55 Z" />
      </g>
      
      {/* Tray and Legs - Foreground Color */}
      <g className="text-foreground">
        <rect x="12" y="57" width="76" height="6" fill="currentColor" />
        
        <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* Left Leg */}
          <path d="M 43 63 L 30 82 L 18 73" />
          {/* Right Leg */}
          <path d="M 55 63 L 72 75 L 82 90" />
        </g>
        
        {/* Feet Blob */}
        <g fill="currentColor">
          {/* Left Foot */}
          <path d="M 18 73 C 12 68 8 75 12 80 C 15 85 22 80 18 73 Z" />
          {/* Right Foot */}
          <path d="M 82 90 C 88 98 95 90 92 84 C 88 78 78 82 82 90 Z" />
        </g>
      </g>
    </svg>
  );
}
