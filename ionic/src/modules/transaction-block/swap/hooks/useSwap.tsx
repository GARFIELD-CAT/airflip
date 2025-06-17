import { ESTIMATED_TIME_OF_CONFIRMATION } from '@constants/chains'
import type { STEP_STATUS } from '@modules/transaction-block/swap/types/interfaces'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { convertBigIntToString } from '@utils/formatValue'
import { useCallback, useState } from 'react'
import { useSendTransaction } from 'wagmi'

import { transformTxRequestToSendTxParameters } from '../utils/transformTxRequestToSendTxParams'


// ---------------------------------------
// ------------ Hook Definition -----------
// ---------------------------------------

/**
 * Hook for handling token swaps
 * @param requestId - Optional request ID
 * @param onSuccessHandler - Function to call on successful swap
 * @returns Object containing swap function, status, error, and deposit hash
 */
export const useSwap = () => {
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const [error, setError] = useState('')
  const [depositHash, setDepositHash] = useState<string | null>(null)

  const {
    getFullState,
    setTransactionHash,
    setTimerDuration,
    swapRoute: route,
  } = useTxStore()
  const { addTransaction } = useTransactionStore()

  const { sendTransaction } = useSendTransaction({
    mutation: {
      onError(_error) {
        setError(_error.message)
        setStatus('error')
      },
      onSuccess(data) {
        setTransactionHash(data)
        setTimerDuration(
          (route?.estimate?.executionDuration ?? 0) + ESTIMATED_TIME_OF_CONFIRMATION,
        )
        setStatus('pending')
        setDepositHash(data) // Set the deposit hash when the transaction is successful

        const txState = getFullState()
        const preparedTxState = convertBigIntToString(txState)
        addTransaction({
          ...preparedTxState,
          transactionHash: data,
          status: 'pending',
          timestamp: Date.now(),
        })
      },
    },
  })

  const swapTokens = useCallback(async () => {
    if (!route?.transactionRequest) return
    try {
      setStatus('confirm_in_wallet')

      sendTransaction(transformTxRequestToSendTxParameters(route.transactionRequest))
    } catch (error_: unknown) {
      console.error(error_)
      if (error_ instanceof Error) {
        setError(error_.message)
      } else {
        setError('An unknown error occurred')
      }
      setStatus('error')
    }
  }, [route, sendTransaction])

  return { swapTokens, status, error, depositHash }
}
