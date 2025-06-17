import { SCAN_LINK_BY_CHAIN_ID } from '@constants/chains'

import { useTxStore } from '../../store/useTxStore'

interface TransactionStatusProps {
  type: 'swap' | 'deposit' | 'approve' | 'switch'
  status: 'pending' | 'confirm_in_wallet' | 'success' | 'error'
  error?: string
  transactionHash?: string
  className?: string
}

export const TransactionStatus = ({ 
  type, 
  status, 
  error, 
  transactionHash: txHashProp, 
  className = '' 
}: TransactionStatusProps) => {
  const {
    depositFromNetwork,
    depositToNetwork,
    transactionHash: txHashFromStore,
  } = useTxStore()

  // Use prop hash if provided, otherwise fall back to store hash
  const txHash = txHashProp || txHashFromStore

  // Loading state
  if (status === 'pending' || status === 'confirm_in_wallet') {
    return (
      <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
        <div className="relative">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-stroke-100 border-t-main-100 rounded-full animate-spin"></div>
          
          {/* Inner circle */}
          <div className="absolute inset-2 bg-main-100/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-main-100" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-text-1100 mb-2">
            {getLoadingTitle()}
          </h3>
          <p className="text-sm text-text-2100">
            {status === 'confirm_in_wallet' 
              ? 'Confirm transaction in your wallet'
              : 'Processing transaction...'
            }
          </p>
        </div>
      </div>
    )
  }

  // Success state
  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-1100 mb-2">
            {getSuccessTitle()}
          </h3>
          <p className="text-sm text-text-2100 mb-3">
            Transaction completed successfully
          </p>
          
          {txHash && (
            <a
              href={getExplorerLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-main-100 hover:text-main-80 transition-colors"
            >
              View in Explorer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    )
  }

  // Error state
  if (status === 'error') {
    return (
      <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-1100 mb-2">
            Transaction Error
          </h3>
          <p className="text-sm text-text-2100 mb-3">
            {error || 'An unknown error occurred'}
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-main-100 text-white rounded-lg hover:bg-main-80 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return null

  function getExplorerLink() {
    if (!txHash) return '#'
    
    // Determine which network to use for the explorer link
    const chainId = depositFromNetwork || depositToNetwork || 1
    const baseUrl = SCAN_LINK_BY_CHAIN_ID[chainId as keyof typeof SCAN_LINK_BY_CHAIN_ID] || 'https://etherscan.io/'
    
    return `${baseUrl}tx/${txHash}`
  }

  function getLoadingTitle() {
    switch (type) {
      case 'switch':
        return 'Switching Network'
      case 'approve':
        return 'Approving Token'
      case 'swap':
        return 'Processing Swap'
      case 'deposit':
        return 'Processing Deposit'
      default:
        return 'Processing'
    }
  }

  function getSuccessTitle() {
    switch (type) {
      case 'switch':
        return 'Network Switched'
      case 'approve':
        return 'Token Approved'
      case 'swap':
        return 'Swap Completed'
      case 'deposit':
        return 'Deposit Completed'
      default:
        return 'Success'
    }
  }
} 