import { useInterval } from '@hooks/common'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useCallback, useState } from 'react'
import { useAccount as useWagmiAccount } from 'wagmi'

import { useTransactionStatusTracker } from './useTransactionStatusTracker'
import { useAccountBonus } from '@hooks/accounts/useAccountBonus'
import { useAccount } from '@hooks/accounts/useAccount'
import { calculateSwapBonus } from '@utils/bonusCalculator'

// Check transactions every 10 seconds
const POLLING_INTERVAL = 10000

/**
 * Background component that periodically checks the status of pending transactions
 * and updates them in the store when they complete
 */
export const PendingTransactionsManager = () => {
  const { transactions, updateTransaction, removeTransaction } = useTransactionStore()
  const { checkTransactionStatus } = useTransactionStatusTracker()
  const { addBonus } = useAccountBonus()
  const { account } = useAccount()
  const { address } = useWagmiAccount()
  const [isChecking, setIsChecking] = useState(false)

  const checkPendingTransactions = useCallback(async () => {
    if (isChecking) return

    const pendingTransactions = transactions.filter(tx => tx.status === 'pending')
    
    if (pendingTransactions.length === 0) return

    setIsChecking(true)

    try {
      for (const transaction of pendingTransactions) {
        try {
          const result = await checkTransactionStatus(transaction)
          
          if (result.completed) {
            if (result.status === 'success') {
              updateTransaction(transaction.transactionHash, result.status)
              
              if (account && address && transaction.inputValueInUSD) {
                const usdValue = parseFloat(transaction.inputValueInUSD)
                const bonusAmount = calculateSwapBonus(usdValue)
                
                if (bonusAmount > 0) {
                  addBonus(account.id, bonusAmount)
                }
              }
            } else if (result.status === 'error') {
              updateTransaction(transaction.transactionHash, result.status)
            }
            
            const isOld = Date.now() - transaction.timestamp > 24 * 60 * 60 * 1000
            if (isOld && result.status === 'error') {
              removeTransaction(transaction.transactionHash)
            }
          }
        } catch (error) {
          console.error(`Error checking transaction ${transaction.transactionHash}:`, error)
          
          const isVeryOld = Date.now() - transaction.timestamp > 60 * 60 * 1000
          if (isVeryOld) {
            updateTransaction(transaction.transactionHash, 'error')
          }
        }
      }
    } catch (error) {
      console.error('Error in checkPendingTransactions:', error)
    } finally {
      setIsChecking(false)
    }
  }, [transactions, checkTransactionStatus, updateTransaction, removeTransaction, isChecking, addBonus, account, address])

  // Start polling when there are pending transactions
  const hasPendingTransactions = transactions.some(tx => tx.status === 'pending')
  const pollingDelay = hasPendingTransactions ? POLLING_INTERVAL : null

  useInterval(checkPendingTransactions, pollingDelay)

  // This component doesn't render anything
  return null
} 