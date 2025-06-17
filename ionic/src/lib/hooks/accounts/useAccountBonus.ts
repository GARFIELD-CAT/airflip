import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useAccount as useWagmiAccount } from 'wagmi'

import { accountsApi } from '@api/accounts'
import { ACCOUNT_QUERY_KEY } from './useAccount'

export const useAccountBonus = () => {
  const queryClient = useQueryClient()
  const { address } = useWagmiAccount()

  const updateBonusMutation = useMutation({
    mutationFn: async ({ accountId, bonusAmount }: { accountId: number; bonusAmount: number }) => {
      const currentAccount = queryClient.getQueryData([ACCOUNT_QUERY_KEY, address]) as any
      if (!currentAccount) throw new Error('Account not found')

      const oldBonusAmount = currentAccount.bonus_amount
      const newBonusAmount = oldBonusAmount + bonusAmount
      
      const updatedAccount = await accountsApi.update(accountId, {
        bonus_amount: newBonusAmount
      })
      
      return updatedAccount
    },
    onSuccess: (updatedAccount, { bonusAmount }) => {
      queryClient.setQueryData([ACCOUNT_QUERY_KEY, address], updatedAccount)
      toast.success(`+${bonusAmount} bonus earned!`)
    },
    onError: (error) => {
      console.error('Failed to update bonus:', error)
      toast.error('Failed to update bonus')
    },
  })

  const addBonus = (accountId: number, bonusAmount: number) => {
    updateBonusMutation.mutate({ accountId, bonusAmount })
  }

  return {
    addBonus,
    isUpdating: updateBonusMutation.isPending,
    error: updateBonusMutation.error,
  }
} 