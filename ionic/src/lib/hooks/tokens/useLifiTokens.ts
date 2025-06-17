import { useGetTokensLazy } from '@api/lifi/endpoints/get-tokens'
import { useMemo } from 'react'

interface LifiTokenData {
  chain_id: number
  contract_address: string
  contract_name: string
  balance: string
  balance_usd: string
  rate: string
  contract_decimals: number
  contract_ticker_symbol: string
  is_native: boolean
  logo_url: string
}

interface UseLifiTokensOptions {
  enabled?: boolean
  limit?: number
}

export const useLifiTokens = (options: UseLifiTokensOptions = {}) => {
  const { enabled = false, limit = 50 } = options

  const {
    data: lifiTokensResponse,
    isLoading,
    error,
    refetch,
  } = useGetTokensLazy(enabled)



  const transformedTokens = useMemo(() => {
    if (!lifiTokensResponse?.data?.tokens) {
      console.log('🚀 ~ transformedTokens ~ No tokens data available')
      return {}
    }

    const result: Record<string, LifiTokenData[]> = {}

    Object.entries(lifiTokensResponse.data.tokens).forEach(([chainId, tokens]) => {
      if (Array.isArray(tokens)) {
        const limitedTokens = tokens.slice(0, limit)
        console.log(`🚀 ~ Processing ${limitedTokens.length} tokens for chain ${chainId}`)

        result[chainId] = limitedTokens.map((token: any) => ({
          chain_id: token.chainId,
          contract_address: token.address,
          contract_name: token.name,
          balance: '0', 
          balance_usd: '0', 
          rate: token.priceUSD || '0',
          contract_decimals: token.decimals,
          contract_ticker_symbol: token.symbol,
          is_native: token.address === '0x0000000000000000000000000000000000000000',
          logo_url: token.logoURI || '',
        }))
      }
    })

    return result
  }, [lifiTokensResponse, limit])

  return {
    data: transformedTokens,
    isLoading,
    error,
    refetch,
  }
}
