import type { TransactionCheckResult } from '@hooks/transaction-status/types'
import { useSwapStatusChecker } from '@hooks/transaction-status/useSwapStatusChecker'
import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useCallback } from 'react'

/**
 * Hook for tracking transaction status across different transaction types
 * Handles different types of transactions (deposit, swap)
 * Returns appropriate status checker based on transaction type
 */
export const useTransactionStatusTracker = () => {
  const checkSwapStatus = useSwapStatusChecker()

  const checkTransactionStatus = useCallback(
    async (tx: IPendingTransactionData): Promise<TransactionCheckResult> => {
      let result: TransactionCheckResult

      result = await checkSwapStatus(tx)

      return result
    },
    [checkSwapStatus],
  )

  return {
    checkTransactionStatus,
    checkSwapStatus,
  }
}
