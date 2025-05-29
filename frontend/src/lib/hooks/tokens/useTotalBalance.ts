import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

export const useTotalBalance = () => {
  const { address } = useAccount()
  const { data: userTokens, isLoading } = useTokensBalance({ address })

  const totalBalance = useMemo(() => {
    if (!userTokens) return 0

    return Object.values(userTokens)
      .flat()
      .filter((token) => token !== undefined)
      .reduce((total, token) => {
        return total + Number(token.balance_usd || 0)
      }, 0)
  }, [userTokens])

  return {
    totalBalance,
    isLoading,
    formattedBalance: totalBalance.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  }
} 