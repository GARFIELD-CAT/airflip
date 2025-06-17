import { useTotalBalance } from "@hooks/tokens/useTotalBalance"
import { UserTokens } from "@layouts/header/components/UserTokens"
import { cn } from "@utils/cn"

const Portfolio = () => {
  const { formattedBalance, isLoading: isTotalBalanceLoading } = useTotalBalance()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-10 pb-10 text-text-100 mt-4">
      <div className="px-6">
        <div className="text-text-80 text-[2rem] font-medium">
          {isTotalBalanceLoading ? 'Loading...' : `${formattedBalance}`}
        </div>
      </div>
      
      <div
        className={cn(
          'w-full',
          'mt-4 [&_.all-assets]:max-h-[calc(90vh-200px)] [&_.all-assets]:overflow-y-auto [&_.all-assets]:overflow-x-hidden [&_.user-activity]:overflow-y-auto [&_.user-activity]:overflow-x-hidden flex flex-col gap-4',
        )}
      >
        <UserTokens />
      </div>
    </div>
  )
}

export default Portfolio
