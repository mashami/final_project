"use client"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Loader } from "../Loader"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-main text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounder-lg ",
  {
    variants: {
      variant: {
        default: "bg-purple-400 text-primary-foreground hover:bg-purple-300",
        destructive:
          "bg-[#00d79a] text-destructive-foreground hover:bg-[#00d79a]/90",
        outline:
          "border border-input bg-background hover:bg-[#d266f5] hover:text-[#d266f5]/90",
        secondary:
          "bg-[#d266f5] text-secondary-foreground hover:bg-[#d266f5]/80",
        ghost: "hover:bg-[#d266f5] hover:text-[#d266f5]/90",
        link: "text-[#ffffab] underline-offset-4 hover:underline"
      },
      size: {
        default: "h-12 p-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text?: string
  icon?: React.ReactElement
  iconPosition?: "right" | "left"
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      text,
      icon,
      iconPosition = "right",
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          iconPosition === "left" && "flex-row-reverse"
        )}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {!text ? (
              <>{children}</>
            ) : (
              <>
                <span className="px-2">{text}</span>
                <span>{icon}</span>
              </>
            )}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
