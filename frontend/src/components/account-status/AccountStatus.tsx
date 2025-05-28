import { useAccountManager } from '@hooks/accounts'
import clsx from 'clsx'

interface AccountStatusProperties {
  className?: string
}

export const AccountStatus = ({ className }: AccountStatusProperties) => {
  const { 
    account, 
    isWalletConnected, 
    isInitializing, 
    isReady,
    walletAddress 
  } = useAccountManager()

  if (!isWalletConnected) {
    return (
      <div className={clsx('text-sm text-gray-500', className)}>
        Wallet not connected
      </div>
    )
  }

  if (isInitializing) {
    return (
      <div className={clsx('text-sm text-blue-500', className)}>
        Initializing account...
      </div>
    )
  }

  if (!isReady || !account) {
    return (
      <div className={clsx('text-sm text-red-500', className)}>
        Account loading error
      </div>
    )
  }

  return (
    <div className={clsx('space-y-2', className)}>
      <div className="text-sm">
        <span className="text-gray-600">Wallet:</span>{' '}
        <span className="font-mono text-xs">{walletAddress}</span>
      </div>
      
      <div className="text-sm">
        <span className="text-gray-600">Bonuses:</span>{' '}
        <span className="font-semibold text-green-600">{account.bonus_amount}</span>
      </div>
      
      {account.bonus_level && (
        <div className="text-sm">
          <span className="text-gray-600">Level:</span>{' '}
          <span className="font-semibold text-purple-600">{account.bonus_level}</span>
        </div>
      )}
    </div>
  )
} 