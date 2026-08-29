import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
        // variant styles
        variant === "outline"
          ? "border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-sm"
          : "bg-[#233d63] text-white hover:bg-[#1b2a47] shadow-md", // default primary variant using brand colors
        // size styles
        size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 py-2",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
