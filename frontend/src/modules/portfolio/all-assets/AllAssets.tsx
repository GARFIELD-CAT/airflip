import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { ChainsList } from '../components/Chains/ChainList'
import TokensList from '../components/Tokens/TokenList'
import { AssetItemSkeleton } from './AssetItem'
import { EmptyState } from './EmptyState'
import { useAllAssets } from './useAllAssets'

interface AllAssetsProperties extends ComponentProps<'div'> {}

const LoadingState = () => (
  <div className="flex flex-col gap-6 overflow-auto">
    {Array.from({ length: 4 }).map((_, i) => (
      <AssetItemSkeleton key={i} />
    ))}
  </div>
)

const EmptyStateView = () => <EmptyState />

const AssetsTabs = ({
  tokens,
}: {
  tokens: ITokenData[]
}) => {
  const [activeTab, setActiveTab] = useState("tokens")
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="">
      <TabsList className="w-full justify-start gap-4 border-b border-stroke-100 px-6 max-md:px-4">
        <TabsTrigger
          variant="unstyled"
          value="tokens"
          className="py-3  text-md  text-text-2100 hover:text-text-60 data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:!text-main-100 max-md:text-sm max-md:leading-6"
        >
          Tokens
        </TabsTrigger>
        <TabsTrigger
          value="chains"
          variant="unstyled"
          className=" py-3 text-md text-text-2100  hover:text-text-60 data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:!text-main-100 max-md:text-sm max-md:leading-6"
        >
          Chains
        </TabsTrigger>
      </TabsList>
      
      <div style={{ display: activeTab === 'tokens' ? 'block' : 'none' }}>
        <TokensList tokens={tokens} />
      </div>
      
      <TabsContent value="chains">
        <ChainsList tokens={tokens} />
      </TabsContent>
    </Tabs>
  )
}

export const AllAssets = (props: AllAssetsProperties) => {
  const { className, ...rest } = props
  const chains: any[] = []
  const { tokens, isLoading } = useAllAssets(chains)

  const hasWalletTokens = tokens && tokens.length > 0

  if (isLoading) {
    return <LoadingState />
  }

  if (!hasWalletTokens) {
    return <EmptyStateView />
  }

  return (
    <div className={cn('', className)} {...rest}>
      <AssetsTabs tokens={tokens} />
    </div>
  )
}
