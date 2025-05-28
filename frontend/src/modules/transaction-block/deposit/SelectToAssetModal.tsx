/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */

import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { UniversalSelectModal } from '@components/universal-select-modal/UniversalSelectModal'
import type { ChainType } from '@constants/chains'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useLifiTokens } from '@hooks/tokens/useLifiTokens'
import { useToAssetSelection } from '@modules/transaction-block/deposit/hooks/useToAssetSelection'
import { cn } from '@utils/cn'
import { useMemo, useState } from 'react'

import { SelectToTokensListItem } from './components/SelectToTokensListItem'

export const SelectToAsset = () => {
  const { isBelowDesktop } = useDeviceWidth()
  const [hasTriggeredLoad, setHasTriggeredLoad] = useState(false)

  const { data: lifiTokens, isLoading, refetch } = useLifiTokens({
    enabled: false, // Always disabled, we'll use refetch manually
    limit: 25, 
  })

  const { toAsset, handleToAssetChange } = useToAssetSelection()

  // Simple filter function for LiFi tokens
  const filterTokens = useMemo(() => {
    return (
      items: Record<string, ITokenData[]> | ITokenData[],
      searchValue: string,
      network: ChainType | null,
    ): ITokenData[] => {
      let allTokens: ITokenData[] = []
      
      if (Array.isArray(items)) {
        allTokens = items
      } else {
        if (network) {
          // Filter by specific network
          allTokens = items[network] || []
        } else {
          // Get all tokens from all networks
          allTokens = Object.values(items).flat()
        }
      }

      // Filter by search value
      if (searchValue) {
        const searchLower = searchValue.toLowerCase()
        allTokens = allTokens.filter((token) =>
          token.contract_name?.toLowerCase().includes(searchLower) ||
          token.contract_ticker_symbol?.toLowerCase().includes(searchLower)
        )
      }

      return allTokens
    }
  }, [])

  const choiceBoxValue = toAsset?.contract_ticker_symbol
    ? isBelowDesktop
      ? ''
      : toAsset?.contract_ticker_symbol
    : 'Select token'

  const handleTriggerClick = () => {
    console.log('🚀 ~ handleTriggerClick ~ hasTriggeredLoad before:', hasTriggeredLoad)
    if (!hasTriggeredLoad) {
      setHasTriggeredLoad(true)
      console.log('🚀 ~ handleTriggerClick ~ calling refetch')
      refetch()
    }
  }

  return (
    <UniversalSelectModal<ITokenData>
      selectedItem={toAsset as ITokenData | undefined}
      items={(lifiTokens as any) || {}}
      isLoading={isLoading}
      filterByNetwork
      filterBySearch
      filterItems={filterTokens}
      renderTrigger={(selectedItem) => (
        <ChoiceBox
          value={choiceBoxValue}
          className={cn(
            !selectedItem && 'px-4 py-5 max-lg:py-[1rem] max-lg:px-[1.25rem]',
            'hover:bg-[#8585A914]',
          )}
          icon={
            selectedItem?.contract_ticker_symbol && (
              <TokenWithNetwork
                symbol={selectedItem.contract_ticker_symbol}
                network={selectedItem.chain_id}
                tokenLogoFallback={selectedItem.logo_url}
                position="bottom-right"
                classNames={{
                  token: 'rounded-full overflow-hidden size-[2.25rem] max-lg:size-[2rem]',
                }}
              />
            )
          }
          onClick={handleTriggerClick}
        />
      )}
      renderItem={(token, onItemChange) => (
        <SelectToTokensListItem
          key={`${token?.contract_address}-${token?.chain_id}`}
          onChange={onItemChange}
          token={token}
          selected={
            `${toAsset?.contract_address}-${toAsset?.chain_id}` ===
            `${token.contract_address}-${token.chain_id}`
          }
        />
      )}
      onChange={handleToAssetChange}
    />
  )
}
