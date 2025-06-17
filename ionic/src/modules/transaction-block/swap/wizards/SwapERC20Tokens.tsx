import { Button } from '@components/ui/button'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { SuccessButton } from '@modules/transaction-block/shared/components/SuccessButton'
import { useTransactionStatus } from '@modules/transaction-block/transaction-review/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/shared/utils/getButtonText'
import { useEffect } from 'react'
import { type Address, parseUnits } from 'viem'

import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import { TransactionStatus } from '@modules/transaction-block/transaction-review/components/TransactionStatus'

interface SwapERC20TokensProps {
  allStepsCompleted?: boolean
}

export const SwapERC20Tokens = ({ allStepsCompleted }: SwapERC20TokensProps = {}) => {
  const {
    depositAsset,
    inputValue: amount,
    currentStep,
    setCurrentStep,
    swapRoute,
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
        setCurrentStep(2)
      }
    },
  })

  const {
    approve,
    status: approveStatus,
    error: approveError,
  } = useApproveERC20({
    approveValue: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    tokenAddress: depositAsset?.contract_address as Address,
    transactionRequestTarget: swapRoute?.estimate?.approvalAddress,
    chainId: depositAssetChain?.chainId,
    onSuccessHandler: () => {
      if (currentStep === 2) {
        setCurrentStep(3)
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
            onClick={() => {
              switchToAssetChain()
            }}
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
        return (
          <Button
            size="lg"
            type="button"
            className={className}
            onClick={approve}
            loading={approveStatus === 'pending'}
            disabled={approveStatus === 'confirm_in_wallet'}
            error={approveStatus === 'error'}
          >
            {getButtonContent(
              approveStatus,
              `Approve ${depositAsset?.contract_ticker_symbol}`,
            )}
          </Button>
        )
      }
      case 3: {
        if (swapAndDepositStatus === 'success') {
          return <SuccessButton className={className} />
        }

        return (
          <Button
            size="lg"
            type="button"
            onClick={swapAndDeposit}
            loading={swapAndDepositStatus === 'pending'}
            disabled={swapAndDepositStatus === 'confirm_in_wallet'}
            className={className}
            error={swapAndDepositStatus === 'error'}
          >
            {getButtonContent(swapAndDepositStatus, `Swap`)}
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

    if (approveStatus === 'error') {
      setIntermediateError(approveError?.message ?? 'Unknown error')
    }

    if (switchToAssetChainStatus === 'error') {
      setIntermediateError(switchError ?? 'Unknown error')
    }
  }, [
    swapAndDepositStatus,
    setIntermediateError,
    swapAndDepositError,
    approveStatus,
    approveError?.message,
    switchToAssetChainStatus,
    switchError,
  ])

  // Show transaction status overlay if any transaction is in progress
  const showSwitchStatus = switchToAssetChainStatus === 'pending' || switchToAssetChainStatus === 'confirm_in_wallet'
  const showApproveStatus = approveStatus === 'pending' || approveStatus === 'confirm_in_wallet'
  const showSwapStatus = swapAndDepositStatus === 'pending' || swapAndDepositStatus === 'confirm_in_wallet'
  const showErrorStatus = switchToAssetChainStatus === 'error' || approveStatus === 'error' || swapAndDepositStatus === 'error'
  const showSuccessStatus = allStepsCompleted || swapAndDepositStatus === 'success'

  if (showSwitchStatus) {
    return <TransactionStatus type="switch" status={switchToAssetChainStatus} />
  }

  if (showApproveStatus) {
    return <TransactionStatus type="approve" status={approveStatus} />
  }

  if (showSwapStatus) {
    return <TransactionStatus type="swap" status={swapAndDepositStatus} />
  }

  if (showErrorStatus) {
    let errorType: 'switch' | 'approve' | 'swap' = 'swap'
    let errorMessage: string | undefined
    
    if (switchToAssetChainStatus === 'error') {
      errorType = 'switch'
      errorMessage = switchError || undefined
    } else if (approveStatus === 'error') {
      errorType = 'approve'
      errorMessage = approveError?.message
    } else {
      errorMessage = swapAndDepositError || undefined
    }
    
    return <TransactionStatus type={errorType} status="error" error={errorMessage} />
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