import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { type ChainType } from '@constants/chains'

import { useTxStore } from '../../store/useTxStore'

export const useAssetSelection = () => {
  const {
    depositAsset: asset,
    setDepositAsset: setAsset,
    setDepositToNetwork,
    setDepositFromNetwork,
    resetStore,
  } = useTxStore()

  const handleAssetChange = (selectedAsset: ITokenData) => {
    resetStore()
    setAsset(selectedAsset)
    setDepositFromNetwork(selectedAsset.chain_id as ChainType)

    setDepositToNetwork(selectedAsset.chain_id as ChainType)

    return selectedAsset
  }

  return {
    asset,
    handleAssetChange,
  }
}
