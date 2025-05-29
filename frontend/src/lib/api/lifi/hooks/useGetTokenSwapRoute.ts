import { useDebounce } from '@hooks/useDebounce'
import type { ContractCallsQuoteRequest } from '@lifi/sdk'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { useEffect, useMemo, useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { useGetQuote } from '../endpoints/get-quote'

export function useGetTokenSwapRoute() {
  const { inputValue, depositAsset, toAsset, setSwapRoute } = useTxStore()

  const { address } = useAccount()
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue)

  const debouncedSetInputValue = useDebounce((value: string) => {
    setDebouncedInputValue(value)
  }, 500)

  useEffect(() => {
    debouncedSetInputValue(inputValue)
  }, [inputValue, debouncedSetInputValue])

  // Swap route parameters
  const swapParameters: ContractCallsQuoteRequest | undefined = useMemo(() => {
    // Don't create route if tokens are the same
    if (
      !address ||
      !depositAsset?.contract_address ||
      !toAsset?.contract_address ||
      !debouncedInputValue ||
      Number(debouncedInputValue) <= 0 ||
      depositAsset.contract_address.toLowerCase() ===
        toAsset.contract_address.toLowerCase()
    ) {
      return undefined
    }

    if (!depositAsset.contract_decimals) {
      console.warn(`Missing decimals for token ${depositAsset.contract_address}`)
      return undefined
    }

    return {
      fromAddress: address,
      fromChain: depositAsset.chain_id.toString(),
      fromToken: depositAsset.contract_address,
      fromAmount: parseUnits(
        debouncedInputValue,
        depositAsset.contract_decimals,
      ).toString(),
      toChain: toAsset.chain_id.toString(),
      toToken: toAsset.contract_address,
      contractCalls: [],
    }
  }, [
    address,
    depositAsset?.contract_address,
    depositAsset?.contract_decimals,
    depositAsset?.chain_id,
    toAsset?.contract_address,
    toAsset?.chain_id,
    debouncedInputValue,
  ])

  const { data, isLoading, error } = useGetQuote(swapParameters)

  useEffect(() => {
    if (data?.data) {
      setSwapRoute(data.data)
    } else {
      setSwapRoute(undefined)
    }
  }, [data, setSwapRoute])

  return {
    route: data?.data,
    isPending: isLoading,
    error,
  }
}
