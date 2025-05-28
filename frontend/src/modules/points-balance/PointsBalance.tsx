import PointIcon from '@assets/icons/point-icon.svg'
import { useAccountManager } from '@hooks/accounts'
import { cn } from '@utils/cn'

export const PointsBalance = ({ className }: { className?: string }) => {
  const { account, isWalletConnected, isInitializing } = useAccountManager()

  const getDisplayValue = () => {
    if (!isWalletConnected) {
      return '0 XP'
    }
    
    if (isInitializing) {
      return '...'
    }
    
    if (!account) {
      return '0 XP'
    }
    
    return `${account.bonus_amount} XP`
  }

  return (
    <div
      className={cn(
        'flex h-[3rem] max-md:h-[2.5rem] max-md:w-auto shadow-test-2 rounded-[1rem] max-md:rounded-[0.75rem] bg-white border border-stroke-100 dark:bg-cards-widget dark:border-stroke-40100',
        className,
      )}
    >
      <div className="flex items-center justify-center gap-1.5 rounded-l-2xl px-4 py-3 max-md:px-3 max-md:py-2">
        <PointIcon className="size-4 text-[#7B61FF]" />
        <span className="text-sm font-medium leading-[1.5625rem] text-main-100 max-md:text-[0.8125rem]">
          {getDisplayValue()}
        </span>
      </div>
    </div>
  )
}
