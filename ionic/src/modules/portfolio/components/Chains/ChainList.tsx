import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import ArrowDown from '@assets/icons/arrow-down.svg'
import { TokenIconComponent } from '@components/token-icon'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import { formatTokenBalance, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { IonList, IonItem } from '@ionic/react'

interface ChainsListProperties extends ComponentProps<'div'> {
  tokens: ITokenData[]
  className?: string
}

const ChainItem = ({
  chainId,
  totalUsdValue,
  tokens,
}: {
  chainId: number
  totalUsdValue: number
  tokens: ITokenData[]
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const chainName = CHAIN_NAMES_BY_ID[chainId as keyof typeof CHAIN_NAMES_BY_ID]
  return (
    <div
      className={cn(
        'relative rounded-xl py-4 hover:bg-[#8585A914]',
        isOpen
          ? 'border bg-[#8585A908] hover:bg-color-none border-stroke-100  max-md:text-sm bg-[#8585A908] pt-4 pb-1'
          : '',
      )}
    >
      <div
        className={cn(
          'flex w-full cursor-pointer items-center justify-between px-6 gap-2 max-md:px-3',
          isOpen ? 'border-b pb-4 border-stroke-100' : '',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center justify-center gap-1">
            <TokenIconComponent
              symbol={chainId}
              className="size-6"
              tokenLogoFallback={
                CHAIN_NAMES_BY_ID[chainId as keyof typeof CHAIN_NAMES_BY_ID]
              }
            />
            <span className="font-medium">{chainName}</span>
            <span className={`ml-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
              <ArrowDown className="rotate-90" />
            </span>
          </div>
        </div>
        <div className="pr-2 text-right">
          <p className="text-base font-medium  max-md:text-sm">
            {formatUsdValue(totalUsdValue)}
          </p>
        </div>
      </div>
      {isOpen && (
        <IonList className="left-0 z-10 mx-1 mt-2 w-auto max-md:text-sm">
          {tokens.map((token) => (
            <IonItem
              key={token.contract_ticker_symbol}
              className="flex select-none items-center justify-between rounded-lg px-6 py-4 hover:bg-[#8585A90D] max-md:px-3 text-text-100"
              style={{
                '--background': 'transparent',
                '--background-hover': 'var(--input-active)',
                '--background-activated': 'var(--input-active)',
                '--border-radius': '0.75rem',
                '--padding-start': '1.5rem',
                '--padding-end': '1.5rem',
                '--padding-top': '1rem',
                '--padding-bottom': '1rem',
                '--inner-border-width': '0',
              } as React.CSSProperties}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <TokenIconComponent
                    symbol={token.contract_ticker_symbol}
                    className="size-12 overflow-hidden rounded-full max-md:size-10"
                    tokenLogoFallback={token.logo_url}
                  />

                  <div className="ml-2 flex flex-col">
                    <span className="">
                      {formatTokenBalance(token.balance, token.contract_decimals)}{' '}
                      {token.contract_ticker_symbol}
                    </span>
                    <div className="flex flex-row items-center gap-1">
                      <TokenIconComponent
                        symbol={chainId}
                        className="size-4 rounded-full"
                        tokenLogoFallback={
                          CHAIN_NAMES_BY_ID[chainId as keyof typeof CHAIN_NAMES_BY_ID]
                        }
                      />
                      <span className="text-sm text-text-2100">{chainName}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base">{formatUsdValue(token.balance_usd)}</p>
                  <p className="text-sm" />
                </div>
              </div>
            </IonItem>
          ))}
        </IonList>
      )}
    </div>
  )
}

export const ChainsList = ({
  tokens,
  className,
}: ChainsListProperties) => {
  const groupedByChain = tokens.reduce(
    (accumulator, token) => {
      const chainId = token.chain_id
      if (accumulator[chainId]) {
        accumulator[chainId].totalUsdValue += Number(token.balance_usd)
      } else {
        accumulator[chainId] = {
          chainId,
          totalUsdValue: Number(token.balance_usd),
          tokens: [],
        }
      }
      accumulator[chainId].tokens.push(token)
      return accumulator
    },
    {} as Record<
      string,
      { chainId: number; totalUsdValue: number; tokens: ITokenData[] }
    >,
  )

  return (
    <IonList className={cn(`px-1 pb-1`, className)}>
      <div className={cn('py-4 flex flex-col gap-1 rounded-xl')}>
        {Object.values(groupedByChain).map(
          ({ chainId, totalUsdValue, tokens: chainTokens }, i) => (
            <ChainItem
              key={i}
              chainId={chainId}
              totalUsdValue={totalUsdValue}
              tokens={chainTokens}
            />
          ),
        )}
      </div>
    </IonList>
  )
}
