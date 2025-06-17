import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAccount as useWagmiAccount } from 'wagmi'
import { AxiosError } from 'axios'

import { accountsApi, type CreateAccountRequest } from '@api/accounts'

export const ACCOUNT_QUERY_KEY = 'account'

export const useAccount = () => {
  const { address } = useWagmiAccount()
  const queryClient = useQueryClient()

  const {
    data: account,
    isLoading: isLoadingAccount,
    error: accountError,
    refetch: refetchAccount,
  } = useQuery({
    queryKey: [ACCOUNT_QUERY_KEY, address],
    queryFn: () => accountsApi.getByWalletKey(address!),
    enabled: !!address,
    retry: false,
  })

  const createAccountMutation = useMutation({
    mutationFn: (data: CreateAccountRequest) => accountsApi.create(data),
    onSuccess: (newAccount) => {
      queryClient.setQueryData([ACCOUNT_QUERY_KEY, address], newAccount)
    },
  })

  const accountExists = !!account && !accountError
  const accountNotFound = accountError instanceof AxiosError && accountError.response?.status === 404

  return {
    account,
    accountExists,
    accountNotFound,
    
    isLoadingAccount,
    isCreatingAccount: createAccountMutation.isPending,
    
    accountError,
    createAccountError: createAccountMutation.error,
    
    createAccount: createAccountMutation.mutate,
    refetchAccount,
    
    walletAddress: address,
    isWalletConnected: !!address,
  }
} 