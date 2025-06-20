import ArrowRight from '@assets/icons/arrow-right-short.svg'
import CopyIcon from '@assets/icons/copy-icon.svg'
import DoubleArrow from '@assets/icons/double-arrow.svg'
import LogoutIcon from '@assets/icons/logout-icon.svg'
import Avatar from '@assets/images/avatar.jpg'
import { IonButton } from '@ionic/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { shortenAddress } from '@utils/transform'
import React from 'react'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'

interface PortfolioButtonProperties extends React.HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
  isMobile?: boolean
  onClick: () => void
  openConnectModal: () => void
  context?: 'modal' | 'header'
}

const PortfolioButton: React.FC<PortfolioButtonProperties> = ({
  onClick,
  isOpen,
  isMobile,
  openConnectModal,
  context,
}) => {
  const { address } = useAccount()

  const getDisplayValueForButton = () => {
    if (context === 'modal' || isMobile) {
      return shortenAddress(address ?? '')
    }
  }
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || '')
    toast.success('Address copied to clipboard')
  }

  const handleClick = () => {
    if (isMobile || isOpen) {
      openConnectModal()
    } else {
      onClick()
    }
  }
  console.log(context === 'header' || !isMobile)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IonButton
          type="button"
          className="bg-white rounded-2xl dark:bg-cards-widget shadow-test min-h-0"
          style={{
            '--background': 'transparent',
            '--background-hover': 'transparent',
            '--background-activated': 'transparent',
            '--color': 'var(--text-100)',
            '--color-hover': 'var(--text-100)',
            '--color-activated': 'var(--text-100)',
            '--border-radius': '1rem',
            '--box-shadow': 'none',
            '--border-width': '1px',
            '--border-style': 'solid',
            '--border-color': 'var(--stroke-100)',
            '--padding-top': '0',
            '--padding-bottom': '0',
            '--padding-start': '0',
            '--padding-end': '0',
            '--padding': '0',
            height: 'auto',
            minWidth: 'auto',
          } as any}
          onClick={handleClick}
        >
          <div className="flex w-full">
            <div className="max-md:py flex flex-1 items-center justify-center gap-1 border-r border-stroke-40100 px-4 py-3 max-md:border-none max-md:px-3 max-md:py-2">
              <div className="size-6 rounded-[0.4375rem] border border-[#6160FF80] bg-text-50 max-md:size-4">
                <img src={Avatar} alt="avatar" className="size-full rounded-xl" />
              </div>
              <p className="truncate text-sm font-medium leading-6 text-text-100 max-md:text-[0.8125rem]">
                {getDisplayValueForButton()}
              </p>
            </div>
            {!isMobile && (
              <div
                className="flex items-center justify-center rounded-r-2xl px-3 transition-colors dark:border-stroke-40100"
              >
                {context === 'modal' ? (
                  <ArrowRight className="size-4" />
                ) : (
                  <DoubleArrow className="size-4" />
                )}
              </div>
            )}
          </div>
        </IonButton>
      </DropdownMenu.Trigger>
      {isOpen && isMobile && (
        <DropdownMenu.Content
          className="ml-8 w-[17rem] rounded-2xl border border-stroke-100 bg-cards-widget p-2 shadow-lg"
          align="end"
          side="bottom"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="cursor-pointer rounded-lg px-3 py-4 outline-none hover:bg-gray-50"
            onClick={handleCopyAddress}
          >
            <div className="flex items-center gap-2">
              <CopyIcon className="size-4" />
              <span className="text-sm">Copy address</span>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="cursor-pointer rounded-lg px-3 py-4 outline-none hover:bg-gray-50"
            onClick={() => openConnectModal()}
          >
            <div className="flex items-center gap-2">
              <LogoutIcon className="size-4" />
              <span className="text-sm">Log out</span>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      )}
    </DropdownMenu.Root>
  )
}

export default PortfolioButton
