import type { Token } from '@0xsquid/squid-types'
import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
import { CHAIN_IDS_BY_BACKEND_NAMES_FOR_PORTFOLIO } from '@constants/chains'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

import { useSquidSDKState } from './useSquidSdkState'

/**
 * Sorts tokens by quote in descending order
 * @param tokens - Array of tokens to sort
 */
const sortTokensByQuote = (tokens: ITokenData[]) => {
  return tokens.sort((a, b) => Number(b.balance_usd) - Number(a.balance_usd))
}

export const useAllAssets = (chains: any[]) => {
  const { address } = useAccount()
  const { data: userTokens, isLoading } = useTokensBalance({ address })
  const { squid, loading } = useSquidSDKState()

  const supportedBySquidTokens = squid?.tokens as Token[]
  const supportedTokensAddr = useMemo(() => {
    return supportedBySquidTokens?.map((token) => token.address.toLowerCase())
  }, [supportedBySquidTokens])

  const filteredByChainTokens = (() => {
    if (!userTokens || !supportedTokensAddr || supportedBySquidTokens?.length === 0)
      return []
    if (chains.length > 0) {
      const chainIds = new Set(
        chains.map(
          (chain) =>
            CHAIN_IDS_BY_BACKEND_NAMES_FOR_PORTFOLIO[
              chain.value as keyof typeof CHAIN_IDS_BY_BACKEND_NAMES_FOR_PORTFOLIO
            ],
        ),
      )
      const _filteredByChainTokens = Object.values(userTokens)
        .flat()
        .filter((token) => chainIds.has(token?.chain_id as never))

      return sortTokensByQuote(_filteredByChainTokens as ITokenData[])
    }

    const allTokens = Object.values(userTokens).flat()
    return sortTokensByQuote(allTokens as ITokenData[])
  })()


  return {
    tokens: filteredByChainTokens,
    isLoading: isLoading || loading,
  }
}
