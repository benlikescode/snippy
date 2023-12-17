import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'
import Spinner from '@/components/spinner'

const buttonVariants = cva(
  'inline-flex relative items-center justify-center whitespace-nowrap rounded-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-[rgba(255,_255,_255,_0.05)] hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        modal: 'text-[#1f1f1f] bg-[#dcdcdc] shadow hover:bg-[#dcdcdc]/90',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-[46px] px-3 rounded-lg',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  showSpinner?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant, size, showSpinner, disabled, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          showSpinner && '[&>span]:opacity-0',
        )}
        ref={ref}
        disabled={showSpinner ?? disabled}
        {...props}
      >
        {children}

        {showSpinner && <Spinner position="absolute" />}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
