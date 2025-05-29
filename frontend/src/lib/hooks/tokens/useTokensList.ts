import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import type { ChainType } from '@constants/chains'
import { useMemo } from 'react'

// Specific token fields for each type
export interface DepositToken extends ITokenData {}

// Define token type based on input type
export type TokenType<T> = T extends ITokenData ? DepositToken : never

export type TokensByChain<T> = Record<string, T[]>

const sortTokensByUSDBalance = <T extends TokenType<any>>(tokens: T[]) => {
  return [...tokens].sort((a, b) => {
    const bValue = 'balance_usd' in b ? b.balance_usd : 0
    const aValue = 'balance_usd' in a ? a.balance_usd : 0
    return Number(bValue) - Number(aValue)
  })
}

const searchTokens = <T extends TokenType<any>>(
  tokens: T[],
  searchValue: string,
): T[] => {
  const searchLower = searchValue.toLowerCase()
  return tokens.filter((token) => {
    if ('contract_ticker_symbol' in token) {
      return (
        token.contract_name?.toLowerCase().includes(searchLower) ||
        token.contract_ticker_symbol?.toLowerCase().includes(searchLower)
      )
    }
    return false
  })
}

export const useTokensList = <T extends TokenType<any>>(
  userTokens: TokensByChain<T> | undefined,
  chain: ChainType | null,
  searchValue: string,
): T[] => {
  return useMemo(() => {
    if (!userTokens) return []

    if (chain) {
      const chainTokens = userTokens[chain] || []
      const filteredChainTokens = searchValue
        ? searchTokens(chainTokens, searchValue)
        : chainTokens
      return sortTokensByUSDBalance(filteredChainTokens)
    }

    const allTokens = Object.values(userTokens).flat()
    const filteredAllTokens = searchValue
      ? searchTokens(allTokens, searchValue)
      : allTokens
    return sortTokensByUSDBalance(filteredAllTokens)
  }, [userTokens, chain, searchValue])
}
