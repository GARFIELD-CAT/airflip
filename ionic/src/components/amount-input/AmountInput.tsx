import { cn } from '@utils/cn'
import { IonInput } from '@ionic/react'
import type { ComponentProps } from 'react'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'

const DEFAULT_DECIMALS = 18
const DEFAULT_PLACEHOLDER = '0.00'

interface AmountInputProperties extends Omit<ComponentProps<typeof IonInput>, 'onIonInput' | 'onChange'> {
  /** Callback when input value changes */
  onValueChange?: (value: string) => void
  /** Error state */
  error?: string
  /** Maximum number of decimal places */
  decimals?: number
  /** Current input value */
  value: string
  /** Text to display after the input (e.g. currency symbol) */
  after?: string
  /** Additional className for the wrapper div */
  wrapperClassName?: string
}

const formatInputValue = (value: string, decimals: number): string => {
  if (value === '') return value

  let formattedValue = value

  // Add leading zero for decimal numbers
  if (formattedValue.startsWith('.')) {
    formattedValue = `0${formattedValue}`
  }

  // Remove non-numeric characters except decimal point
  formattedValue = formattedValue.replaceAll(/[^\d.]|(?<=\..*)\./g, '')

  // Limit decimal places
  const [whole, decimal] = formattedValue.split('.')
  if (decimal?.length > decimals) {
    formattedValue = `${whole}.${decimal.slice(0, decimals)}`
  }

  // Remove leading zeros except for "0" itself
  return formattedValue.replace(/^0+/, '0')
}

export const AmountInput = forwardRef<HTMLIonInputElement, AmountInputProperties>(
  (props, reference) => {
    const {
      onValueChange,
      value,
      error,
      decimals = DEFAULT_DECIMALS,
      after,
      className,
      wrapperClassName,
      ...rest
    } = props

    // Reference for measuring input width
    const measureReference = useRef<HTMLSpanElement>(null)
    const [inputWidth, setInputWidth] = useState(0)

    // Update input width when value changes
    useEffect(() => {
      if (measureReference.current) {
        setInputWidth(measureReference.current.offsetWidth)
      }
    }, [value])

    const handleChange = (event: CustomEvent) => {
      const inputValue = event.detail.value || ''
      const formattedValue = formatInputValue(inputValue, decimals)
      onValueChange?.(formattedValue)
    }

    const baseInputClasses = cn(
      'placeholder:text-text-20',
      'text-[2.625rem] max-lg:text-[2.25rem]',
      'bg-transparent',
      'font-medium',
      'leading-[3.25rem]',
      'tracking-[-0.02625rem]',
    )

    const id = useId()

    return (
      <div className={cn('relative size-full min-h-10', wrapperClassName)}>
        <div className="flex items-center">
          {/* Hidden element for measuring input width */}
          <span
            ref={measureReference}
            className={cn(
              'invisible absolute whitespace-pre',
              baseInputClasses,
              className,
            )}
          >
            {value || DEFAULT_PLACEHOLDER}
          </span>

          {/* Actual input element */}
          <IonInput
            id={id}
            {...rest}
            type="text"
            inputmode="decimal"
            placeholder={DEFAULT_PLACEHOLDER}
            style={{ 
              width: `${inputWidth}px`,
              '--background': 'transparent',
              '--color': error ? 'var(--red-100)' : (after ? 'var(--text-2100)' : 'var(--text-100)'),
              '--placeholder-color': 'var(--text-20)',
              '--padding-start': '0',
              '--padding-end': '0',
              '--padding-top': '0',
              '--padding-bottom': '0',
              '--border': 'none',
              '--border-radius': '0',
              '--box-shadow': 'none',
              '--outline': 'none',
              '--font-size': '2.625rem',
              '--font-weight': '500',
              '--line-height': '3.25rem',
              '--letter-spacing': '-0.02625rem',
            } as React.CSSProperties}
            className={cn(
              baseInputClasses,
              'focus:outline-none',
              className,
            )}
            onIonInput={handleChange}
            value={value === '0.00' ? '' : value}
            ref={reference}
          />

          {/* Optional suffix */}
          {after && (
            <span
              className={cn(
                'ml-[0.2rem] text-[1rem] text-text-60 max-lg:text-[0.8125rem]',
                error && 'text-red-100',
              )}
            >
              {after}
            </span>
          )}
        </div>
      </div>
    )
  },
)

AmountInput.displayName = 'AmountInput'
