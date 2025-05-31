import ClosePortfolioIcon from '@assets/icons/portfolio-close.svg'
import { useClickOutside } from '@hooks/useClickOutside'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import PortfolioButton from './PortfolioButton'
import { PointsBalance } from '@modules/points-balance/PointsBalance'
import { useTotalBalance } from '@hooks/tokens/useTotalBalance'
import { UserTokens } from './UserTokens'

interface PortfolioModalProperties extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  isMobile?: boolean
  openConnectModal?: () => void
}

export const PortfolioModal = ({
  isOpen,
  onClose,
  isMobile,
}: PortfolioModalProperties) => {

  const { open: openConnectModal } = useAppKit()
  const { formattedBalance, isLoading: isTotalBalanceLoading } = useTotalBalance()

  const handleClickOutside = () => {
    if (isOpen) {
      onClose()
    }
  }
  const sidebarReference = useClickOutside(handleClickOutside, [
    '#all-assets-chains, #chain-filter, .open',
  ])

  useEffect(() => {
    document.body.style.overflow = isOpen && isMobile ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, isMobile])

  return createPortal(
    <>
      {isOpen && isMobile && <div className="fixed inset-0 z-[99] bg-cards-widget" />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarReference}
            className="fixed right-0 top-0 z-[100] mt-4 flex max-md:mr-0 max-md:mt-0 max-md:w-full max-md:p-4 md:mr-4"
            initial={{ opacity: 0, x: 50, scale: 1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.1 }}
          >
            <div className="relative mr-3 flex items-start pt-2 max-md:mr-0">
              {!isMobile && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-12 items-center justify-center rounded-2xl border border-stroke-100 bg-cards-widget p-1"
                >
                  <div className="flex size-full items-center justify-center rounded-xl p-2 hover:bg-[#8585A914] dark:hover:bg-transparent">
                    <ClosePortfolioIcon className="size-4 " />
                  </div>
                </button>
              )}
            </div>
            <div className="relative size-auto max-h-screen w-[30.125rem] overflow-y-auto rounded-3xl border border-stroke-100 bg-cards-widget pt-4 shadow-lg">
              <div className="flex h-auto w-full items-center justify-between  px-6 py-4">
                <div className="flex items-center gap-2">
                  <PortfolioButton
                    context="modal"
                    onClick={onClose}
                    isOpen={isOpen}
                    openConnectModal={() => openConnectModal()}
                    isMobile={isMobile}
                    />
                  <PointsBalance />
                </div>
                <div className="flex  items-center justify-center gap-2 ">
                  <ThemeToggler />
                  {isMobile && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex size-12 items-center justify-center rounded-xl border border-stroke-100 bg-cards-widget hover:bg-transparent"
                    >
                      <ClosePortfolioIcon />
                    </button>
                  )}
                </div>
              </div>
              <div className="px-6">
                <div className="text-[#F4F2F5] text-[2rem] font-medium">
                  {isTotalBalanceLoading ? 'Loading...' : `${formattedBalance}`}
                </div>
              </div>
              
              <div className="hide-scrollbar pointer-events-auto h-auto max-h-[80vh] overflow-y-auto bg-cards-widget">
                <div
                  className={cn(
                    'mt-4 [&_.all-assets]:max-h-[calc(90vh-200px)] [&_.all-assets]:overflow-y-auto [&_.all-assets]:overflow-x-hidden [&_.user-activity]:overflow-y-auto [&_.user-activity]:overflow-x-hidden flex flex-col gap-4',
                  )}
                >
                  <UserTokens />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  )
}
