import { useGetTokenSwapRoute } from '@api/lifi/hooks/useGetTokenSwapRoute'
import { cn } from '@utils/cn'
import { formatValueWithPrecision } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { type ComponentProps } from 'react'
import React from 'react'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import { SwapActionButton } from './deposit/components/DepositActionButton'
import { SwappableInputs } from './deposit/components/SwappableInputs'
import { useInputHandling } from './deposit/hooks/useInputHandling'
import { useInputValidation } from './deposit/hooks/useInputValidation'
import { useSetDepositDetails } from './deposit/hooks/useSetDepositDetails'
import ZapFee from './deposit/zap-fee/ZapFee'
import { useTxStore } from './store/useTxStore'

interface DepositBlockProperties extends ComponentProps<'div'> {}

export const TransactionBlock = (props: DepositBlockProperties) => {
  const { className, ...rest } = props
  const { isConnected } = useAccount()
  const { isPending: isRouteLoading, route } = useGetTokenSwapRoute()
  const {
    depositAsset: asset,
    toAsset,
    inputValue,
    toTokenValue,
    inputValueInUSD,
    swapRoute,
    setInputValue,
    setToTokenValue,
    setDepositAsset,
    setToAsset,
    setCurrentModal,
    setInputValueInUSD,
    setInputError,
  } = useTxStore()

  useSetDepositDetails()

  // Calculate toUsdValue based on toTokenValue and toAsset rate
  const toUsdValue = React.useMemo(() => {
    if (!toTokenValue || !toAsset?.rate) return '0.00'

    const tokenValueBN = BigNumber(toTokenValue)
    const rateBN = BigNumber(toAsset.rate)

    if (tokenValueBN.isNaN() || rateBN.isNaN() || tokenValueBN.isZero()) {
      return '0.00'
    }

    return tokenValueBN.multipliedBy(rateBN).toFixed(2)
  }, [toTokenValue, toAsset?.rate])

  // Update toTokenValue when route changes
  React.useEffect(() => {
    if (route?.estimate?.toAmount && toAsset) {
      const formattedAmount = (
        Number(route.estimate.toAmount) /
        10 ** toAsset.contract_decimals
      ).toString()
      setToTokenValue(formattedAmount)
    }
  }, [route?.estimate?.toAmount, toAsset, setToTokenValue])

  // Asset balance handling
  const assetBalance = formatUnits(
    BigInt(asset?.balance?.toString() || '0'),
    asset?.contract_decimals || 6,
  )
  const prettyAssetBalance = formatValueWithPrecision(assetBalance, 5)

  // Input validation
  const validationError = useInputValidation({
    inputValue,
    assetBalance,
    inputValueInUSD,
    onError: setInputError,
    hasAsset: !!asset,
  })

  // Input handling
  const handleAction = useInputHandling({
    swapRoute,
    assetRate: asset?.rate,
    onInputValueChange: setInputValue,
    onUsdValueChange: setInputValueInUSD,
  })

  // Handle swapping tokens
  const handleSwapTokens = () => {
    if (asset && toAsset) {
      // Swap assets
      setDepositAsset(toAsset)
      setToAsset(asset)

      // Swap values
      setInputValue(toTokenValue)
      setToTokenValue(inputValue)
    }
  }

  return (
    <>
      {/* Deposit Input Section */}
      <div
        className={cn(
          validationError && 'bg-input-error',
          !isConnected && 'pointer-events-none opacity-50',
        )}
      >
        <SwappableInputs
          fromTokenValue={inputValue}
          fromUsdValue={inputValueInUSD}
          toTokenValue={toTokenValue}
          toUsdValue={toUsdValue}
          onFromTokenValueChange={(value: string) => handleAction('token', value)}
          onFromUsdValueChange={(value: string) => handleAction('usd', value)}
          error={validationError}
          fromAsset={asset ? { ...asset, balance: BigInt(asset.balance) } : undefined}
          toAsset={toAsset ? { ...toAsset, balance: BigInt(toAsset.balance) } : undefined}
          onFromMaxClick={() => handleAction('token', prettyAssetBalance)}
          onSwapTokens={handleSwapTokens}
          isRouteLoading={isRouteLoading}
        />
      </div>

      {/* Action Button */}
      <div className="flex flex-col items-center justify-center">
        <SwapActionButton
          isConnected={isConnected}
          inputValue={inputValue}
          error={validationError}
          onModalOpen={() => setCurrentModal('review')}
        />
      </div>
      {!validationError && <ZapFee />}
      <p className="text-[#99979A] text-center text-[1rem] not-italic font-medium leading-[100%]">
        Powered by <a href="https://lifi.io" target="_blank" rel="noopener noreferrer" className="text-[#F4F2F5]">Li.fi</a>
      </p>
    </>
  )
}
