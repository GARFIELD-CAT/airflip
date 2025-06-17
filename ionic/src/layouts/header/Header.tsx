import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useAccountManager } from '@hooks/accounts'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import { useTransactionStatusTracker } from '@modules/pending-transactions/useTransactionStatusTracker'
import { PointsBalance } from '@modules/points-balance/PointsBalance'
import { useAppKit } from '@reown/appkit/react'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { useAccount } from 'wagmi'

import PortfolioButton from './components/PortfolioButton'
import { PortfolioModal } from './components/PortfolioModal'
import { usePortfolioModalState } from './hooks/UsePortfolioModalState'
import { Menu } from './menu/Menu'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  useTransactionStatusTracker()
  useAccountManager()

  const account = useAccount()
  const { isOpen, handlePortfolioClose, handlePortfolioOpen } = usePortfolioModalState()

  const { open: openConnectModal } = useAppKit()

  const { isMobile } = useDeviceWidth()
  return (
    <header
      {...rest}
      className={clsx('flex w-full items-center justify-between max-md:py-3', className)}
    >
      <Menu />
      {account.address ? (
        <div className="flex h-full items-center gap-2 rounded-[1.375rem] bg-transparent max-md:gap-[0.38rem]">
          <PointsBalance />
          <PortfolioButton
            onClick={() => handlePortfolioOpen()}
            isOpen={isOpen}
            isMobile={isMobile}
            openConnectModal={() => openConnectModal()}
            context="header"
          />
          <PortfolioModal isOpen={isOpen} onClose={handlePortfolioClose} />
        </div>
      ) : (
        <ConnectWallet className="rounded-[12.5rem] bg-cards-widget px-6 py-4 text-[1.25rem] text-gray-100 dark:bg-[rgba(153,_152,_184,_0.10)] dark:text-white" />
      )}
    </header>
  )
}
