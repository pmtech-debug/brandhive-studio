import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-white/10 bg-[#050608]/40 px-4 py-3 text-sm text-[#F5F7FA] shadow-inner transition-all duration-300 placeholder:text-white/30 focus-visible:outline-none focus-visible:border-[#16C7FF]/40 focus-visible:ring-4 focus-visible:ring-[#16C7FF]/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
