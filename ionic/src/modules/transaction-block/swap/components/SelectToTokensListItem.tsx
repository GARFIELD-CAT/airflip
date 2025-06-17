import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import Check from '@assets/icons/check.svg'
import { TokenIconComponent } from '@components/token-icon'
import { IonButton, IonItem } from '@ionic/react'

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
    <IonItem
    key={`${token.contract_address}-${token.chain_id}`}
    style={{
      '--background': 'transparent',
      '--background-hover': 'var(--input-active)',
      '--background-activated': 'var(--input-active)',
      '--inner-border-width': '0',
    } as React.CSSProperties}>
    <IonButton
      type="button"
      className="w-full text-text-100"
      onClick={() => onChange(token)}
      style={{
        '--background': 'transparent',
        '--background-hover': 'var(--input-active)',
        '--background-activated': 'var(--input-active)',
        '--box-shadow': 'none',
        '--border-radius': '0.75rem',
        '--padding-start': '1.25rem',
        '--padding-end': '1.25rem',
        '--padding-top': '1rem',
        '--padding-bottom': '1rem',
        '--width': '100%',
        '--height': 'auto',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'space-between',
        'cursor': 'pointer',
      } as React.CSSProperties}
    >
      <div className="flex items-center justify-between w-full">

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.67rem' }}>
        <div style={{ position: 'relative' }}>
          <TokenIconComponent
            style={{ width: '2.5rem', height: '2.5rem', overflow: 'hidden', borderRadius: '50%' }}
            symbol={token.contract_ticker_symbol}
            tokenLogoFallback={token.logo_url}
          />
          <TokenIconComponent
            symbol={token?.chain_id}
            style={{ position: 'absolute', bottom: 0, right: 0, width: '1rem', height: '1rem', overflow: 'hidden', borderRadius: '0.25rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.13rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: 'var(--ion-color-text-1100)' }}>
            {token?.contract_name || ''}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.22rem' }}>
            <p style={{ fontSize: '0.875rem', lineHeight: '1rem', color: 'var(--ion-color-text-2100-60)' }}>
              {token?.contract_ticker_symbol || ''}
            </p>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
        {selected && <Check style={{ width: '1rem', height: '1rem' }} />}
      </div>
      </div>
    </IonButton>
    </IonItem>
  )
}
