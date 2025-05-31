/* eslint-disable @typescript-eslint/no-shadow */
import Check from '@assets/icons/check.svg'
import ProtocolIcon from '@assets/icons/protocol.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { SUPPORTED_CHAINS_IDS, type SupportedChainType } from '@constants/chains'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import { useState } from 'react'

interface SelectNetworkPopoverProperties {
  trigger: React.ReactNode
  onChange: (chain: SupportedChainType | null) => void
  chain?: SupportedChainType | null
  showAllNetworksOption?: boolean
}

const ChainItem = ({
  onNetworkChange,
  chain,
  currentChain,
}: {
  onNetworkChange: (chain: SupportedChainType | null) => void
  chain: SupportedChainType | null
  currentChain: SupportedChainType | null | undefined
}) => {
  const data = useTokenAsset(chain)

  const chainName = () => {
    if (chain === null)
      return (
        <div className="flex items-center gap-[0.38rem]">
          <ProtocolIcon className="size-4" />
          All Chains
        </div>
      )

    return data?.name || chain
  }

  return (
    <div
      onClick={() => onNetworkChange(chain)}
      className={cn(
        'flex items-center justify-between rounded-[0.625rem] gap-2 p-3 cursor-pointer hover:bg-input-active',
        chain === currentChain && 'bg-input-active',
      )}
    >
      <div className="flex  items-center gap-[0.38rem]">
        {chain && (
          <div className="">
            <TokenIconComponent symbol={chain} className="size-4" />
          </div>
        )}
        <span
          className={cn('text-base text-text', chain === currentChain && 'text-main-100')}
        >
          {chainName()}
        </span>
      </div>
      {chain === currentChain && (
        <Check className="ml-auto size-[1.125rem] overflow-visible" />
      )}
    </div>
  )
}

export const SelectNetworkPopover = ({
  trigger,
  onChange,
  chain: currentChain,
  showAllNetworksOption = false,
}: SelectNetworkPopoverProperties) => {
  const [isOpened, setIsOpened] = useState(false)
  const onNetworkChange = (chain: SupportedChainType | null) => {
    onChange(chain)
    setIsOpened(false)
  }

  return (
    <Popover open={isOpened} onOpenChange={() => setIsOpened(!isOpened)}>
      <div className="relative">
        <PopoverTrigger className="flex items-center gap-2">{trigger}</PopoverTrigger>

        <div className="flex flex-col">
          <PopoverContent
            align="end"
            className="pointer-events-auto flex  w-[16.25rem] flex-col gap-1 rounded-2xl border px-1  max-md:py-1 [&]:shadow-none"
          >
            {showAllNetworksOption && (
              <ChainItem
                chain={null}
                onNetworkChange={onNetworkChange}
                currentChain={currentChain}
              />
            )}
            {SUPPORTED_CHAINS_IDS.map((chain) => (
              <ChainItem
                key={chain}
                onNetworkChange={onNetworkChange}
                chain={chain}
                currentChain={currentChain}
              />
            ))}
          </PopoverContent>
        </div>
      </div>
    </Popover>
  )
}
