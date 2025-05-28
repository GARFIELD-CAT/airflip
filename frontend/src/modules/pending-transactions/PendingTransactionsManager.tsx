import { useInterval } from '@hooks/common'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useCallback, useState } from 'react'

import { useTransactionStatusTracker } from './useTransactionStatusTracker'

// Check transactions every 10 seconds
const POLLING_INTERVAL = 10000

/**
 * Background component that periodically checks the status of pending transactions
 * and updates them in the store when they complete
 */
export const PendingTransactionsManager = () => {
  const { transactions, updateTransaction, removeTransaction } = useTransactionStore()
  const { checkTransactionStatus } = useTransactionStatusTracker()
  const [isChecking, setIsChecking] = useState(false)

  const checkPendingTransactions = useCallback(async () => {
    if (isChecking) return // Prevent overlapping checks

    const pendingTransactions = transactions.filter(tx => tx.status === 'pending')
    
    if (pendingTransactions.length === 0) return

    setIsChecking(true)

    try {
      // Check each pending transaction
      for (const transaction of pendingTransactions) {
        try {
          console.log(`Checking transaction status: ${transaction.transactionHash}`)
          
          const result = await checkTransactionStatus(transaction)
          
          if (result.completed) {
            console.log(`Transaction ${transaction.transactionHash} completed with status: ${result.status}`)
            
            if (result.status === 'success' || result.status === 'error') {
              updateTransaction(transaction.transactionHash, result.status)
            }
            
            // Remove very old transactions (older than 24 hours) regardless of status
            const isOld = Date.now() - transaction.timestamp > 24 * 60 * 60 * 1000
            if (isOld && result.status === 'error') {
              console.log(`Removing old failed transaction: ${transaction.transactionHash}`)
              removeTransaction(transaction.transactionHash)
            }
          }
        } catch (error) {
          console.error(`Error checking transaction ${transaction.transactionHash}:`, error)
          
          // If transaction is very old and we can't check it, mark as error
          const isVeryOld = Date.now() - transaction.timestamp > 60 * 60 * 1000 // 1 hour
          if (isVeryOld) {
            console.log(`Marking old unchecked transaction as error: ${transaction.transactionHash}`)
            updateTransaction(transaction.transactionHash, 'error')
          }
        }
      }
    } catch (error) {
      console.error('Error in checkPendingTransactions:', error)
    } finally {
      setIsChecking(false)
    }
  }, [transactions, checkTransactionStatus, updateTransaction, removeTransaction, isChecking])

  // Start polling when there are pending transactions
  const hasPendingTransactions = transactions.some(tx => tx.status === 'pending')
  const pollingDelay = hasPendingTransactions ? POLLING_INTERVAL : null

  useInterval(checkPendingTransactions, pollingDelay)

  // This component doesn't render anything
  return null
} 