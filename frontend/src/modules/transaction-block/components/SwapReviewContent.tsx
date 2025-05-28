import { TokenIconComponent } from '@components/token-icon'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { formatAmountValue } from '@utils/formatValue'

import { useTxStore } from '../store/useTxStore'
import { SwapERC20Tokens, SwapNativeTokens } from '../swap-wizards'

interface SwapReviewContentProps {
  allStepsCompleted?: boolean
}

export const SwapReviewContent = ({ allStepsCompleted }: SwapReviewContentProps = {}) => {
  const {
    depositAsset,
    toAsset,
    depositFromNetwork,
    toNetwork,
    inputValue,
    toTokenValue,
    inputValueInUSD,
    swapRoute,
  } = useTxStore()

  if (!depositAsset || !toAsset) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-text-2100">Swap data not found</p>
      </div>
    )
  }

  // Check if it's actually a swap (different tokens)
  if (depositAsset.contract_address === toAsset.contract_address) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-text-2100">Invalid swap: same tokens selected</p>
      </div>
    )
  }

  const fromNetworkName = CHAIN_NAMES_BY_ID[depositFromNetwork as keyof typeof CHAIN_NAMES_BY_ID] || 'Unknown Network'
  const toNetworkName = CHAIN_NAMES_BY_ID[toNetwork as keyof typeof CHAIN_NAMES_BY_ID] || 'Unknown Network'

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-text-1100 mb-2">
          {allStepsCompleted ? 'Swap Completed' : 'Swap Review'}
        </h2>
        <p className="text-text-2100 text-sm">
          {allStepsCompleted 
            ? 'Your swap has been completed successfully'
            : 'Review your swap details before confirming'
          }
        </p>
        {allStepsCompleted && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Success
          </div>
        )}
      </div>

      {/* Transaction Details */}
      <div className="space-y-4">
        {/* From Token */}
        <div className="bg-input-active rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <TokenIconComponent
                  className="size-10 overflow-hidden rounded-full"
                  symbol={depositAsset.contract_ticker_symbol}
                  tokenLogoFallback={depositAsset.logo_url}
                />
                <TokenIconComponent
                  symbol={depositFromNetwork}
                  className="absolute -bottom-1 -right-1 size-4 overflow-hidden rounded border-2 border-white"
                />
              </div>
              <div>
                <p className="text-base font-medium text-text-1100">
                  {depositAsset.contract_ticker_symbol}
                </p>
                <p className="text-sm text-text-2100">
                  {fromNetworkName}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-medium text-text-1100">
                {formatAmountValue(inputValue) || '0'}
              </p>
              {inputValueInUSD && (
                <p className="text-sm text-text-2100">
                  ${inputValueInUSD}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-main-100 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M8 2L8 14M8 14L12 10M8 14L4 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* To Token */}
        <div className="bg-input-active rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <TokenIconComponent
                  className="size-10 overflow-hidden rounded-full"
                  symbol={toAsset.contract_ticker_symbol}
                  tokenLogoFallback={toAsset.logo_url}
                />
                <TokenIconComponent
                  symbol={toNetwork}
                  className="absolute -bottom-1 -right-1 size-4 overflow-hidden rounded border-2 border-white"
                />
              </div>
              <div>
                <p className="text-base font-medium text-text-1100">
                  {toAsset.contract_ticker_symbol}
                </p>
                <p className="text-sm text-text-2100">
                  {toNetworkName}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-medium text-text-1100">
                {formatAmountValue(toTokenValue) || '~'}
              </p>
              <p className="text-sm text-text-2100">
                You will receive ~ ${formatAmountValue(swapRoute?.estimate?.toAmountUSD || '0') || '~'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Rate */}
      {toTokenValue && inputValue && (
        <div className="bg-stroke-100/10 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-2100">Exchange Rate</span>
            <span className="text-sm font-medium text-text-1100">
              1 {depositAsset.contract_ticker_symbol} ≈{' '}
              {(Number(toTokenValue) / Number(inputValue)).toFixed(6)}{' '}
              {toAsset.contract_ticker_symbol}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {renderActionButtons()}
    </div>
  )

  function renderActionButtons() {
    if (!depositAsset) return null
    
    const isNativeToken = depositAsset.is_native
    
    if (isNativeToken) {
      return <SwapNativeTokens allStepsCompleted={allStepsCompleted} />
    } else {
      return <SwapERC20Tokens allStepsCompleted={allStepsCompleted} />
    }
  }
} 