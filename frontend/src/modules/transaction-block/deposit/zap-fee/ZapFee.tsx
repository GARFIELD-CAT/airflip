import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { useHideHeaderStore } from '@store/useHideHeaderStore'
import type { HTMLAttributes } from 'react'
import React from 'react'

import Details from './Details'
import ShortInfo from './ShortInfo'
import { getSummaryAndFees } from './summaryAndFees'
import { useGetTokenSwapRoute } from '@api/lifi/hooks/useGetTokenSwapRoute'

interface ZapFeeProperties extends HTMLAttributes<HTMLDivElement> {}

const ZapFee: React.FC<ZapFeeProperties> = ({ className }) => {
  const [open, setOpen] = React.useState(false)
  const { setHidden: setIsHeaderHidden } = useHideHeaderStore()
  const { swapRoute, isTxZAP } = useTxStore()
  const { isPending: isRouteLoading } = useGetTokenSwapRoute()
  console.log("🚀 ~ isRouteLoading:", isRouteLoading)
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    setIsHeaderHidden(isOpen)
  }

  const summaryAndFees = getSummaryAndFees(swapRoute)
  return (
    <div className={className}>
      {isTxZAP ? (
        <ShortInfo
          openHandler={() => handleOpenChange(true)}
          summaryAndFees={summaryAndFees}
          isLoading={isRouteLoading}
        />
      ) : null}
      <Details
        open={open}
        onOpenChange={handleOpenChange}
        summaryAndFees={summaryAndFees}
        isLoading={isRouteLoading}
      />
    </div>
  )
}

export default ZapFee
