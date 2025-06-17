import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import Check from '@assets/icons/check.svg'
import { TokenIconComponent } from '@components/token-icon'

export const SelectToTokensListItem = ({
  token,
  onChange,
  selected,
}: {
  token: ITokenData
  onChange: (token: ITokenData) => void
  selected: boolean
}) => {
  console.log('TokensListItem received token:', token)

  if (!token) return null
  return (
    <button
      type="button"
      onClick={() => onChange(token)}
      className="flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-4 hover:bg-input-active"
    >
      <div className="flex items-center gap-[0.67rem]">
        <div className="relative">
          <TokenIconComponent
            className="size-10 overflow-hidden rounded-full"
            symbol={token.contract_ticker_symbol}
            tokenLogoFallback={token.logo_url}
          />
          <TokenIconComponent
            symbol={token?.chain_id}
            className="absolute bottom-0 right-0 size-4 overflow-hidden rounded"
          />
        </div>

        <div className="flex flex-col items-start gap-[0.13rem]">
          <p className="text-base/[1.5rem] text-text-1100">
            {token?.contract_name || ''}
          </p>

          <div className="flex items-center gap-[0.22rem]">
            <p className="text-[0.875rem]/[1rem] text-text-2100/60">
              {token?.contract_ticker_symbol || ''}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        {selected && <Check className="size-4" />}
      </div>
    </button>
  )
}
