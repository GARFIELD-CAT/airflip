import CollapseIcon from '@assets/icons/collapse.svg'
import ExpandIcon from '@assets/icons/expand_2.svg'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { Drawer, DrawerContent } from '@components/ui/drawer'
import { useModalVariant } from '@hooks/common/useModalVariant'
import { cloneElement } from 'react'

import { SwapReviewContent } from './components/SwapReviewContent'
import { useTxStore } from './store/useTxStore'

export const TxReviewModal = () => {
  const {
    currentModal,
    setCurrentModal,
    setCurrentStep,
    currentStep,
    isTransactionCanBeCollapsed,
    resetStore,
    setIntermediateError,
    isTransactionFromStore,
    collapseTxInfo,
    setCollapseTxInfo,
  } = useTxStore()

  const { isDrawer } = useModalVariant()

  const isTransactionSent =
    (isTransactionFromStore || isTransactionCanBeCollapsed) && currentStep === 3

  const handleClose = () => {
    if (isTransactionSent) {
      resetStore()
    }
    setIntermediateError(null)
    setCurrentStep(1)
    setCurrentModal(null)
    setCollapseTxInfo(false)
  }

  const renderContent = () => {
    const content = <SwapReviewContent />

    if (isTransactionFromStore) {
      return cloneElement(content, { allStepsCompleted: true })
    }

    return content
  }

  const modalContent = (
    <div className="overflow-hidden rounded-3xl border border-stroke-100 bg-cards-widget shadow-test-2">
      {renderContent()}
      <button
        type="button"
        className="flex w-full flex-row items-center justify-center gap-[0.38rem] border-t bg-text-3100/5 px-6 py-3 text-[0.875rem] font-medium text-text-3100 dark:border-[#3E3E4D66]"
        onClick={() => setCollapseTxInfo(!collapseTxInfo)}
      >
        {collapseTxInfo ? (
          <>
            <ExpandIcon className="size-4" /> See Details
          </>
        ) : (
          <>
            <CollapseIcon className="size-4" /> Condense
          </>
        )}
      </button>
    </div>
  )

  const isModalOpen = currentModal === 'review'

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose()
    }
  }

  return isDrawer ? (
    <Drawer open={isModalOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[95vh] overflow-hidden">
        {modalContent}
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isModalOpen}>
      <DialogContent
        onClose={handleClose}
        className="max-w-[38.75rem] overflow-visible !bg-transparent text-text"
        showCloseButton
      >
        {modalContent}
      </DialogContent>
    </Dialog>
  )
}
