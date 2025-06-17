import CollapseIcon from '@assets/icons/collapse.svg'
import ExpandIcon from '@assets/icons/expand_2.svg'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { Drawer, DrawerContent } from '@components/ui/drawer'
import { useModalVariant } from '@hooks/common/useModalVariant'
import { cloneElement } from 'react'

import { SwapReviewContent } from '../../swap/components/SwapReviewContent'
import { useTxStore } from '../../store/useTxStore'
import { IonButton } from '@ionic/react'

export const TxReviewModal = () => {
  const {
    currentModal,
    setCurrentModal,
    setCurrentStep,
    resetStore,
    setIntermediateError,
    isTransactionFromStore,
    collapseTxInfo,
    setCollapseTxInfo,
  } = useTxStore()

  const { isDrawer } = useModalVariant()

  const handleClose = () => {
    resetStore()
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
      <IonButton
        type="button"
        style={{
          '--background': 'rgba(49, 49, 73, 0.05)',
          '--background-hover': 'rgba(49, 49, 73, 0.05)',
          '--background-activated': 'rgba(49, 49, 73, 0.05)',
          '--color': 'var(--text-3100)',
          '--color-hover': 'var(--text-3100)',
          '--color-activated': 'var(--text-3100)',
          '--border-radius': '0 0 1.5rem 1.5rem',
          '--box-shadow': 'none',
          '--border-width': '1px 0 0 0',
          '--border-style': 'solid',
          '--border-color': 'var(--stroke-100)',
          '--padding-top': '0.75rem',
          '--padding-bottom': '0.75rem',
          '--padding-start': '1.5rem',
          '--padding-end': '1.5rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.38rem',
          fontSize: '0.875rem',
          fontWeight: 500,
        } as any}
        onClick={() => setCollapseTxInfo(!collapseTxInfo)}
      >
        {collapseTxInfo ? (
          <div className="flex items-center gap-2">
            <ExpandIcon className="size-4" /> See Details
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CollapseIcon className="size-4" /> Condense
          </div>
        )}
      </IonButton>
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
