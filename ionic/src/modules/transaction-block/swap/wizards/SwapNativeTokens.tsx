import { Button } from '@components/ui/button'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { SuccessButton } from '@modules/transaction-block/shared/components/SuccessButton'
import { useTransactionStatus } from '@modules/transaction-block/transaction-review/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/shared/utils/getButtonText'
import { useEffect } from 'react'

import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import { TransactionStatus } from '@modules/transaction-block/transaction-review/components/TransactionStatus'

interface SwapNativeTokensProps {
  allStepsCompleted?: boolean
}

export const SwapNativeTokens = ({ allStepsCompleted }: SwapNativeTokensProps = {}) => {
  const {
    depositAsset,
    currentStep,
    setCurrentStep,
    setIntermediateError,
  } = useTxStore()

  const depositAssetChain = useTokenAsset(depositAsset?.chain_id)

  const {
    status: switchToAssetChainStatus,
    switchChain: switchToAssetChain,
    error: switchError,
  } = useSwitchToTokenChain({
    chainId: depositAssetChain?.chainId ?? 1,
    onSuccessHandler: () => {
      if (currentStep === 1) {
        setCurrentStep(currentStep + 1)
      }
    },
  })

  const {
    swapTokens: swapAndDeposit,
    status: _swapAndDepositStatus,
    error: swapAndDepositError,
  } = useSwap()

  const swapAndDepositStatus = useTransactionStatus(_swapAndDepositStatus)

  const ActionButton: React.FC<{ className?: string }> = ({ className = '' }) => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            size="lg"
            type="button"
            className={className}
            onClick={switchToAssetChain}
            loading={switchToAssetChainStatus === 'pending'}
            disabled={switchToAssetChainStatus === 'confirm_in_wallet'}
            error={switchToAssetChainStatus === 'error'}
          >
            {getButtonContent(
              switchToAssetChainStatus,
              `Switch to ${depositAssetChain?.name}`,
            )}
          </Button>
        )
      }
      case 2: {
        if (swapAndDepositStatus === 'success') {
          return <SuccessButton className={className} />
        }

        return (
          <Button
            size="lg"
            type="button"
            className={className}
            onClick={swapAndDeposit}
            loading={swapAndDepositStatus === 'pending'}
            disabled={swapAndDepositStatus === 'confirm_in_wallet'}
            error={swapAndDepositStatus === 'error'}
          >
            {getButtonContent(swapAndDepositStatus, 'Swap')}
          </Button>
        )
      }
      default: {
        throw new Error('unknown action type')
      }
    }
  }

  useEffect(() => {
    if (swapAndDepositStatus === 'error') {
      setIntermediateError(swapAndDepositError ?? 'Unknown error')
    }

    if (switchToAssetChainStatus === 'error') {
      setIntermediateError(switchError ?? 'Unknown error')
    }
  }, [
    swapAndDepositStatus,
    setIntermediateError,
    swapAndDepositError,
    switchToAssetChainStatus,
    switchError,
  ])

  // Show transaction status overlay if any transaction is in progress
  const showSwitchStatus = switchToAssetChainStatus === 'pending' || switchToAssetChainStatus === 'confirm_in_wallet'
  const showSwapStatus = swapAndDepositStatus === 'pending' || swapAndDepositStatus === 'confirm_in_wallet'
  const showErrorStatus = switchToAssetChainStatus === 'error' || swapAndDepositStatus === 'error'
  const showSuccessStatus = allStepsCompleted || swapAndDepositStatus === 'success'

  if (showSwitchStatus) {
    return <TransactionStatus type="switch" status={switchToAssetChainStatus} />
  }

  if (showSwapStatus) {
    return <TransactionStatus type="swap" status={swapAndDepositStatus} />
  }

  if (showErrorStatus) {
    const errorType = switchToAssetChainStatus === 'error' ? 'switch' : 'swap'
    const errorMessage = switchToAssetChainStatus === 'error' ? switchError : swapAndDepositError
    
    return <TransactionStatus type={errorType} status="error" error={errorMessage || undefined} />
  }

  if (showSuccessStatus) {
    return <TransactionStatus type="swap" status="success" />
  }

  return (
    <div className="flex items-center justify-center gap-2.5 self-stretch px-4 py-3">
      <ActionButton className="w-full px-[1.875rem] py-4 text-base font-medium normal-case leading-6 hover:bg-main-80" />
    </div>
  )
} 