import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { useAccount } from './useAccount'

export const useAccountManager = () => {
  const {
    account,
    accountExists,
    accountNotFound,
    isLoadingAccount,
    isCreatingAccount,
    createAccount,
    createAccountError,
    walletAddress,
    isWalletConnected,
  } = useAccount()

  useEffect(() => {
    if (isWalletConnected && accountNotFound && walletAddress) {
      console.log('Creating new account for wallet:', walletAddress)
      
      createAccount({
        wallet_key: walletAddress,
        bonus_amount: 0,
        bonus_level: null,
      })
    }
  }, [isWalletConnected, accountNotFound, walletAddress, createAccount])


  useEffect(() => {
    if (createAccountError) {
      console.error('Failed to create account:', createAccountError)
      toast.error('Account creation error')
    }
  }, [createAccountError])

  const isInitializing = isWalletConnected && (isLoadingAccount || isCreatingAccount)
  const isReady = isWalletConnected && accountExists && !isInitializing

  return {
    account,
    accountExists,
    isReady,
    isInitializing,

    walletAddress,
    isWalletConnected,

    isLoadingAccount,
    isCreatingAccount,

    createAccountError,
  }
} 