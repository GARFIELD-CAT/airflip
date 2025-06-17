import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import type { ChainType } from '@constants/chains'

import { useTxStore } from '../../store/useTxStore'

export const useToAssetSelection = () => {
  const { toAsset, setToAsset, setToNetwork } = useTxStore()

  const handleToAssetChange = (selectedAsset: ITokenData) => {
    setToAsset(selectedAsset)
    setToNetwork(selectedAsset.chain_id as ChainType)

    return selectedAsset
  }

  return {
    toAsset,
    handleToAssetChange,
  }
}
