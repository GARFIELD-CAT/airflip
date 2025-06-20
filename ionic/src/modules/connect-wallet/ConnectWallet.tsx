import Metamask from '@assets/icons/metamask.svg'
import { useAccountManager } from '@hooks/accounts'
import { IonButton } from '@ionic/react'
import { useAppKit } from '@reown/appkit/react'
import { shortenAddress } from '@utils/transform'
import { useAccount, useDisconnect } from 'wagmi'

export const ConnectWallet = () => {
  const { open: openConnectModal } = useAppKit()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { isInitializing } = useAccountManager()

  const handleClick = () => {
    if (address) {
      disconnect()
    } else {
      openConnectModal()
    }
  }

  const getButtonContent = () => {
    if (address) {
      if (isInitializing) {
        return (
          <>
            <Metamask className="size-5" />
            <span className="normal-case">Loading...</span>
          </>
        )
      }
      
      return (
        <>
          <Metamask className="size-5" />
          <span className="normal-case">{shortenAddress(address)}</span>
        </>
      )
    }
    
    return <span>CONNECT</span>
  }

  return (
    <IonButton
      fill="solid"
      color="primary"
      style={{
        '--background': 'rgba(153,_152,_184,_0.10)',
        '--background-hover': 'transparent',
        '--background-activated': 'transparent',
        '--color': 'var(--main-100)',
        '--border-radius': '1.375rem',
        '--border-width': '0',
        '--box-shadow': 'none',
        '--border-color': 'transparent',
        '--inner-border-width': '0',
        '--ripple-color': 'var(--white)',
        '--transition': 'none',
      } as React.CSSProperties}
      onClick={handleClick}
      disabled={isInitializing}
    >
      {getButtonContent()}
    </IonButton>
  )
}
