import { SUPPORTED_CHAINS_IDS } from '@constants/chains'
import type { TokensResponse } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { lifiApiClient } from '../constants'

export function getTokens(): Promise<AxiosResponse<TokensResponse, any>> {
  const chains = SUPPORTED_CHAINS_IDS.join(',')


  return lifiApiClient.get('tokens', {
    params: {
      chains,
    },
  }).then(response => {
    console.log('🚀 ~ getTokens ~ success, tokens count:', Object.keys(response.data.tokens || {}).length)
    return response
  }).catch(error => {
    console.error('🚀 ~ getTokens ~ error:', error)
    throw error
  })
}

export function useGetTokens() {
  return useQuery({
    queryKey: ['get-tokens'],
    queryFn: getTokens,
  })
}

export function useGetTokensLazy(enabled: boolean = false) {
  return useQuery({
    queryKey: ['get-tokens'],
    queryFn: getTokens,
    enabled,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  })
}
