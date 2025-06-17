import TryAgainIcon from '@assets/icons/try-again.svg'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { IonButton } from '@ionic/react'
import { cn } from '@utils/cn'

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: '',
      light: '',
      destructive: '',
      outline: '',
      'outline-light': '',
      secondary: '',
      ghost: '',
      link: '',
      container: '',
      error: '',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProperties
  extends Omit<React.ComponentProps<typeof IonButton>, "size">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  error?: boolean
}

const variantStyles: Record<string, any> = {
  default: {
    '--background': 'var(--main-100)',
    '--color': 'var(--white)',
    '--border-radius': '2rem',
    '--box-shadow': 'none',
    '--padding-top': '1.25rem',
    '--padding-bottom': '1.25rem',
    '--padding-start': '3rem',
    '--padding-end': '3rem',
    '--background-hover': 'var(--main-50)',
    '--background-activated': 'var(--main-50)',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  error: {
    '--background': 'var(--red-5)',
    '--color': 'var(--red-100)',
  },
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProperties>(
  (
    {
      variant = 'default',
      size = 'default',
      loading = false,
      error = false,
      children,
      style,
      ...props
    },
    reference,
  ) => {
    const buttonContent = loading ? 'Processing...' : children
    const styleKey = error ? 'error' : variant || 'default'
    const mergedStyle = { ...variantStyles[styleKey], ...style }
    return (
      <IonButton
        ref={reference as any}
        disabled={props.disabled || loading}
        style={mergedStyle as any}
        {...props}
        className={cn("", props.className)}
      >
        {buttonContent}
        {loading && <Loader2 className="size-4 animate-spin text-main-100" />}
        {error && <TryAgainIcon className="ml-2 size-4" />}
      </IonButton>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
