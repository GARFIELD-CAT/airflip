import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'

/**
 * Debug component to show current pending transactions
 * Only visible in development mode
 */
export const TransactionStatusDebug = () => {
  const { transactions, clearTransactions } = useTransactionStore()

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const pendingTransactions = transactions.filter(tx => tx.status === 'pending')
  const completedTransactions = transactions.filter(tx => tx.status !== 'pending')

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg max-w-md z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Transaction Status Debug</h3>
        <button
          onClick={clearTransactions}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Pending ({pendingTransactions.length}):</strong>
          {pendingTransactions.length === 0 ? (
            <p className="text-gray-500">No pending transactions</p>
          ) : (
            pendingTransactions.map(tx => (
              <div key={tx.transactionHash} className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded mt-1">
                <div>Hash: {tx.transactionHash?.slice(0, 10)}...</div>
                <div>Type: {tx.txType} ({tx.txDifficulty})</div>
                <div>Age: {Math.round((Date.now() - tx.timestamp) / 1000)}s</div>
              </div>
            ))
          )}
        </div>
        
        <div>
          <strong>Completed ({completedTransactions.length}):</strong>
          {completedTransactions.length === 0 ? (
            <p className="text-gray-500">No completed transactions</p>
          ) : (
            completedTransactions.slice(-3).map(tx => (
              <div key={tx.transactionHash} className={`p-2 rounded mt-1 ${
                tx.status === 'success' 
                  ? 'bg-green-100 dark:bg-green-900' 
                  : 'bg-red-100 dark:bg-red-900'
              }`}>
                <div>Hash: {tx.transactionHash?.slice(0, 10)}...</div>
                <div>Status: {tx.status}</div>
                <div>Type: {tx.txType}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 