import BigCloseBtn from '@assets/icons/big-close-btn.svg'
import BigCloseBtnDark from '@assets/icons/big-close-btn_dark.svg'
import { DialogContent } from '@components/ui/dialog'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'

import type { ResponsiveDialogContentProperties } from '../../swap/types/types'
import { IonButton } from '@ionic/react'

export const ResponsiveDialogContent = ({
  className,
  children,
  opened,
  setOpened,
  ...props
}: ResponsiveDialogContentProperties) => {
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop && opened) {
    return (
      <div
        className={cn(
          'fixed h-screen w-screen top-0 left-0 bg-white z-10 pt-[5.5rem] pb-12 px-4 flex flex-col gap-6 overscroll-none',
          'animate-translateIn bg-cards',
          className,
        )}
      >
        {children}

        <IonButton
          type="button"
          aria-label="Close"
          onClick={() => setOpened(false)}
          style={{
            '--background': 'transparent',
            '--box-shadow': 'none',
            '--border-radius': '50%',
            '--width': '4.125rem',
            '--height': '4.125rem',
            '--padding-start': '0',
            '--padding-end': '0',
            '--padding-top': '0',
            '--padding-bottom': '0',
            'margin': 'auto',
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center',
          } as React.CSSProperties}
        >
          <BigCloseBtn style={{ width: '100%', height: '100%' }} className="dark:hidden" />
          <BigCloseBtnDark style={{ width: '100%', height: '100%' }} className="hidden dark:block" />
        </IonButton>
      </div>
    )
  }

  return (
    <DialogContent
      className={cn('text-text gap-6 max-lg:max-w-[95vw] overflow-visible', className)}
      {...props}
    >
      {children}
    </DialogContent>
  )
}
