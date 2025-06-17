import SwitchIcon from '@assets/icons/switch.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { ShadowBox } from '@components/box/ShadowBox'
import { cn } from '@utils/cn'
import { formatTokenBalance } from '@utils/formatValue'

import DollarInput from '../../shared/components/DollarInput'
import { useInputsMode } from '../hooks/useInputsMode'
import { SelectDepositAsset } from '../SelectDepositAssetModal'
import { SelectToAsset } from '../SelectToAssetModal'
import { IonButton } from '@ionic/react'

interface Asset {
  balance: string | bigint
  contract_decimals: number
  contract_ticker_symbol: string
}

interface SwappableInputsProperties {
  /** From token value */
  fromTokenValue: string
  /** From USD value */
  fromUsdValue: string
  /** To token value (calculated from route, read-only) */
  toTokenValue: string
  /** To USD value (calculated from route, read-only) */
  toUsdValue: string
  /** Callback when from token value changes */
  onFromTokenValueChange: (value: string) => void
  /** Callback when from USD value changes */
  onFromUsdValueChange: (value: string) => void
  /** Error message */
  error?: string
  /** From asset details */
  fromAsset?: Asset
  /** To asset details */
  toAsset?: Asset
  /** Callback when Max button is clicked for from token */
  onFromMaxClick?: () => void
  /** From token label */
  fromTokenLabel?: string
  /** To token label */
  toTokenLabel?: string
  /** Callback when swap button is clicked */
  onSwapTokens?: () => void
  /** Whether the route is loading */
  isRouteLoading?: boolean
}

const DECIMALS = 18

// Helper component for rendering from token input
const FromTokenInput = ({
  fromAsset,
  isSwapped,
  fromUsdValue,
  onFromUsdValueChange,
  error,
  fromTokenValue,
  onFromTokenValueChange,
  setIsSwapped,
  fromTokenLabel,
}: {
  fromAsset?: Asset
  isSwapped: boolean
  fromUsdValue: string
  onFromUsdValueChange: (value: string) => void
  error?: string
  fromTokenValue: string
  onFromTokenValueChange: (value: string) => void
  setIsSwapped: (value: boolean) => void
  fromTokenLabel?: string
}) => {
  if (!fromAsset) {
    return (
      <p className="text-[1.5rem] font-medium leading-[3.25rem] tracking-[-0.015rem] text-text-20 max-lg:text-[1rem]">
        Select from token
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Primary input based on swap state */}
      <div className="flex h-14 items-center">
        {isSwapped ? (
          <DollarInput
            value={fromUsdValue}
            onValueChange={onFromUsdValueChange}
            error={!!error}
            inputClassName="text-[1.5rem] max-lg:text-[1rem]"
          />
        ) : (
          <AmountInput
            value={fromTokenValue}
            error={error}
            decimals={DECIMALS}
            onChange={onFromTokenValueChange}
          />
        )}
      </div>

      {/* Secondary input with swap button */}
      <div className="flex items-center gap-2">
        <IonButton
          type="button"
          onClick={() => setIsSwapped(!isSwapped)}
          style={{
            '--background': 'transparent',
            '--background-hover': 'transparent',
            '--background-activated': 'transparent',
            '--color': 'var(--text-100)',
            '--color-hover': 'var(--text-100)',
            '--color-activated': 'var(--text-100)',
            '--border-radius': '0.75rem',
            '--border-width': '1px',
            '--border-style': 'solid',
            '--border-color': 'var(--stroke-100)',
            '--padding': '0',
            width: '1.5rem',
            minWidth: '1.5rem',
            height: '1.5rem',
            minHeight: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          } as any}
        >
          <SwitchIcon className="size-3.5" />
        </IonButton>
        {isSwapped ? (
          <AmountInput
            value={fromTokenValue}
            error={error}
            decimals={DECIMALS}
            className="text-[1rem] max-lg:text-[0.8125rem]"
            wrapperClassName="!min-h-0 !h-[1.5rem]"
            onChange={onFromTokenValueChange}
            after={fromTokenLabel || fromAsset.contract_ticker_symbol}
          />
        ) : (
          <DollarInput
            value={fromUsdValue}
            onValueChange={onFromUsdValueChange}
            error={!!error}
            inputClassName="text-normal max-lg:text-[0.8125rem]"
            className="text-text-2100"
          />
        )}
      </div>
    </div>
  )
}

// Helper component for rendering to token input
const ToTokenInput = ({
  toAsset,
  isRouteLoading,
  isSwapped,
  toUsdValue,
  toTokenValue,
  toTokenLabel,
}: {
  toAsset?: Asset
  isRouteLoading?: boolean
  isSwapped: boolean
  toUsdValue: string
  toTokenValue: string
  toTokenLabel?: string
}) => {
  if (!toAsset) {
    return (
      <p className="text-[1.5rem] font-medium leading-[3.25rem] tracking-[-0.015rem] text-text-20 max-lg:text-[1rem]">
        Select to token
      </p>
    )
  }

  if (isRouteLoading) {
    return (
      <p className="text-[1.5rem] font-medium leading-[3.25rem] tracking-[-0.015rem] text-text-260 max-lg:text-[1rem]">
        Calculating...
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Primary input based on swap state */}
      <div className="flex h-14 items-center">
        {isSwapped ? (
          <DollarInput
            value={toUsdValue}
            disabled
            inputClassName="text-[1.5rem] max-lg:text-[1rem]"
          />
        ) : (
          <AmountInput
            value={toTokenValue}
            decimals={DECIMALS}
            onChange={() => {}} // Read-only, no changes allowed
            disabled
          />
        )}
      </div>

      {/* Secondary display */}
      <div className="flex items-center gap-2">
        {isSwapped ? (
          <AmountInput
            value={toTokenValue}
            decimals={DECIMALS}
            className="text-[1rem] max-lg:text-[0.8125rem]"
            wrapperClassName="!min-h-0 !h-[1.5rem]"
            onChange={() => {}}
            after={toTokenLabel || toAsset.contract_ticker_symbol}
            disabled
          />
        ) : (
          <DollarInput
            value={toUsdValue}
            disabled
            inputClassName="text-normal max-lg:text-[0.8125rem]"
            className="text-text-2100"
          />
        )}
      </div>
    </div>
  )
}

export const SwappableInputs = ({
  fromTokenValue,
  fromUsdValue,
  toTokenValue,
  toUsdValue,
  onFromTokenValueChange,
  onFromUsdValueChange,
  error,
  fromAsset,
  toAsset,
  onFromMaxClick,
  fromTokenLabel,
  toTokenLabel,
  onSwapTokens,
  isRouteLoading,
}: SwappableInputsProperties) => {
  const { isSwapped, setIsSwapped } = useInputsMode()

  // Render from token balance information
  const fromBalanceInfo = fromAsset ? (
    <div className="flex items-center gap-1">
      <p
        className={cn(
          'text-normal flex items-center gap-[.19rem] max-lg:text-[0.8125rem]',
          error && '[&>span]:text-red-100',
        )}
      >
        <span className="ml-2 mr-[.19rem] text-text-2100">
          {formatTokenBalance(fromAsset.balance, fromAsset.contract_decimals, 2)}
        </span>
        <span className="text-text-260">
          {fromTokenLabel || fromAsset.contract_ticker_symbol}
        </span>
      </p>
      <ShadowBox
        className="cursor-pointer select-none rounded-md border border-stroke-100 bg-white px-[0.56rem] text-[0.875rem] font-medium leading-[1.5625rem] text-text-2100 dark:bg-[#2D2D36]"
        onClick={onFromMaxClick}
      >
        Max
      </ShadowBox>
    </div>
  ) : null

  return (
    <div className="flex flex-col gap-1">
      {/* From token input with right element */}
      <div className="rounded-2xl border border-solid border-stroke-100 bg-cards-widget p-6">
        <h3 className="mb-3 font-medium text-[#99979A]">Sell</h3>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <FromTokenInput
              fromAsset={fromAsset}
              isSwapped={isSwapped}
              fromUsdValue={fromUsdValue}
              onFromUsdValueChange={onFromUsdValueChange}
              error={error}
              fromTokenValue={fromTokenValue}
              onFromTokenValueChange={onFromTokenValueChange}
              setIsSwapped={setIsSwapped}
              fromTokenLabel={fromTokenLabel}
            />
          </div>
          <SelectDepositAsset />
        </div>

        {/* From token balance info */}
        {fromBalanceInfo && (
          <div className="flex items-center justify-end">{fromBalanceInfo}</div>
        )}
      </div>

      {/* To token input with right element */}
      <div className="relative rounded-2xl border border-solid border-stroke-100 bg-cards p-6">
        <IonButton
          type="button"
          onClick={onSwapTokens}
          style={{
            '--background': 'var(--cards-widget)',
            '--background-hover': 'var(--cards-widget)',
            '--background-activated': 'var(--cards-widget)',
            '--color': 'var(--text-100)',
            '--color-hover': 'var(--text-100)',
            '--color-activated': 'var(--text-100)',
            '--border-radius': '1rem',
            '--box-shadow': '0px 2px 8px 0px rgba(135,99,243,0.12)',
            '--border-width': '1px',
            '--border-style': 'solid',
            '--border-color': 'var(--stroke-100)',
            '--padding': '0',
            width: '3.5rem',
            minWidth: '3.5rem',
            height: '3.5rem',
            minHeight: '3.5rem',
            position: 'absolute',
            top: '-0.25rem',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          } as any}
          disabled={!onSwapTokens}
        >
          <SwitchIcon className="size-6 rotate-90" />
        </IonButton>
        <h3 className="mb-3 font-medium text-[#99979A]">Buy</h3>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <ToTokenInput
              toAsset={toAsset}
              isRouteLoading={isRouteLoading}
              isSwapped={isSwapped}
              toUsdValue={toUsdValue}
              toTokenValue={toTokenValue}
              toTokenLabel={toTokenLabel}
            />
          </div>
          <SelectToAsset />
        </div>
      </div>
    </div>
  )
}
