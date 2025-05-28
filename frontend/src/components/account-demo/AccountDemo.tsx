import { AccountStatus } from '@components/account-status'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'

export const AccountDemo = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-center">Account Management Demo</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Wallet Connection:</h3>
          <ConnectWallet />
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Account Status:</h3>
          <AccountStatus className="p-3 bg-gray-50 rounded-md" />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 space-y-1">
        <p>• When connecting wallet, account existence is automatically checked</p>
        <p>• If account not found, new one is created with 0 bonuses</p>
        <p>• Current bonus balance and level are displayed</p>
      </div>
    </div>
  )
} 