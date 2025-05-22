
import { ButtonHTMLAttributes, forwardRef, ElementType } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
  href?: string;
  to?: string;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "default", size = "default", fullWidth, href, to, ...props }, ref) => {
    // If "to" prop is provided, render as Link component
    if (to) {
      return (
        <Link
          to={to}
          className={cn(
            "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
            
            // Variants
            variant === "default" && "bg-divulgaja-blue text-white hover:bg-blue-600",
            variant === "outline" && "border border-divulgaja-blue text-divulgaja-blue hover:bg-blue-50",
            variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
            variant === "link" && "text-primary underline-offset-4 hover:underline",
            variant === "gradient" && "bg-gradient-to-r from-divulgaja-blue to-divulgaja-purple text-white shadow-md hover:shadow-lg",
            
            // Sizes
            size === "default" && "h-10 px-4 py-2",
            size === "sm" && "h-8 px-3 py-1 text-sm",
            size === "lg" && "h-12 px-6 py-3 text-lg",
            size === "icon" && "h-10 w-10",
            
            // Full width
            fullWidth && "w-full",
            
            className
          )}
        >
          {children}
        </Link>
      );
    }
    
    // If href is provided, render as anchor tag
    if (href) {
      return (
        <a
          href={href}
          className={cn(
            "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
            
            // Variants
            variant === "default" && "bg-divulgaja-blue text-white hover:bg-blue-600",
            variant === "outline" && "border border-divulgaja-blue text-divulgaja-blue hover:bg-blue-50",
            variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
            variant === "link" && "text-primary underline-offset-4 hover:underline",
            variant === "gradient" && "bg-gradient-to-r from-divulgaja-blue to-divulgaja-purple text-white shadow-md hover:shadow-lg",
            
            // Sizes
            size === "default" && "h-10 px-4 py-2",
            size === "sm" && "h-8 px-3 py-1 text-sm",
            size === "lg" && "h-12 px-6 py-3 text-lg",
            size === "icon" && "h-10 w-10",
            
            // Full width
            fullWidth && "w-full",
            
            className
          )}
          {...props as any}
        >
          {children}
        </a>
      );
    }
    
    // Default case: render as button
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
          
          // Variants
          variant === "default" && "bg-divulgaja-blue text-white hover:bg-blue-600",
          variant === "outline" && "border border-divulgaja-blue text-divulgaja-blue hover:bg-blue-50",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          variant === "link" && "text-primary underline-offset-4 hover:underline",
          variant === "gradient" && "bg-gradient-to-r from-divulgaja-blue to-divulgaja-purple text-white shadow-md hover:shadow-lg",
          
          // Sizes
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 px-3 py-1 text-sm",
          size === "lg" && "h-12 px-6 py-3 text-lg",
          size === "icon" && "h-10 w-10",
          
          // Full width
          fullWidth && "w-full",
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
