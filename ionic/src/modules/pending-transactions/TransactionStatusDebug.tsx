import { useState } from 'react'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { cn } from '@utils/cn'
import { IonButton } from '@ionic/react'

/**
 * Debug component to show current pending transactions
 * Only visible in development mode
 */
export const TransactionStatusDebug = () => {
  const { transactions, clearTransactions } = useTransactionStore()
  const [isCollapsed, setIsCollapsed] = useState(true)

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const pendingTransactions = transactions.filter(tx => tx.status === 'pending')
  const completedTransactions = transactions.filter(tx => tx.status !== 'pending')

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-w-sm z-50 transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className={cn("flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700", isCollapsed && 'border-b-0')}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Transaction Debug
          </h3>
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
            {pendingTransactions.length + completedTransactions.length}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <IonButton
            onClick={toggleCollapse}
            style={{
              '--background': 'transparent',
              '--background-hover': 'transparent',
              '--box-shadow': 'none',
              '--border-radius': '0.375rem',
              '--padding-start': '0.375rem',
              '--padding-end': '0.375rem',
              '--padding-top': '0.375rem',
              '--padding-bottom': '0.375rem',
              '--width': 'auto',
              '--height': 'auto',
              'display': 'flex',
              'alignItems': 'center',
              'justifyContent': 'center',
            } as React.CSSProperties}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <svg 
              style={{ width: '1rem', height: '1rem', color: 'var(--ion-color-gray-600)', transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </IonButton>
          
          <IonButton
            type="button"
            onClick={clearTransactions}
            style={{
              '--background': 'transparent',
              '--background-hover': 'transparent',
              '--box-shadow': 'none',
              '--border-radius': '0.375rem',
              '--padding-start': '0.375rem',
              '--padding-end': '0.375rem',
              '--padding-top': '0.375rem',
              '--padding-bottom': '0.375rem',
              '--width': 'auto',
              '--height': 'auto',
              'display': 'flex',
              'alignItems': 'center',
              'justifyContent': 'center',
              'color': 'var(--ion-color-danger)',
            } as React.CSSProperties}
            title="Clear all transactions"
          >
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </IonButton>
        </div>
      </div>
      
      {/* Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {/* Pending Transactions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Pending ({pendingTransactions.length})
              </span>
            </div>
            
            {pendingTransactions.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic pl-3">
                No pending transactions
              </p>
            ) : (
              <div className="space-y-2">
                {pendingTransactions.map(tx => (
                  <div key={tx.transactionHash} className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-gray-800 dark:text-gray-200">
                        {tx.transactionHash?.slice(0, 8)}...{tx.transactionHash?.slice(-6)}
                      </span>
                      <span className="text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded-full">
                        {Math.round((Date.now() - tx.timestamp) / 1000)}s
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {tx.txType} • {tx.txDifficulty}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Completed Transactions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Recent ({completedTransactions.length})
              </span>
            </div>
            
            {completedTransactions.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic pl-3">
                No completed transactions
              </p>
            ) : (
              <div className="space-y-2">
                {completedTransactions.slice(-3).map(tx => (
                  <div key={tx.transactionHash} className={`border rounded-lg p-3 ${
                    tx.status === 'success' 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700' 
                      : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-700'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-gray-800 dark:text-gray-200">
                        {tx.transactionHash?.slice(0, 8)}...{tx.transactionHash?.slice(-6)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        tx.status === 'success'
                          ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                          : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {tx.txType}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 