import Logo from '@assets/icons/menu/logo.png'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { IonButton } from '@ionic/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronsLeft, ChevronsUpDown } from 'lucide-react'

export const MenuTrigger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const { isBelowDesktop } = useDeviceWidth()

  return (
    <IonButton
      type="button"
      className="m-0 p-0 -translate-y-[0.35rem] max-lg:translate-y-[-0.6rem]"
      style={{
        '--background': 'transparent',
        '--background-hover': 'transparent',
        '--background-activated': 'transparent',
        '--color': '#30303066',
        '--color-hover': '#30303066',
        '--color-activated': '#30303066',
        '--border-radius': '1rem',
        '--box-shadow': 'none',
        '--padding-start': '0',
        '--padding-end': '0',
        '--padding-top': '0',
        '--padding-bottom': '0',
        '--padding': '0',
        display: 'flex',
        alignItems: 'center',
        gap: isOpen ? '0.5rem' : '0.25rem',
        paddingRight: isOpen ? '0.25rem' : '0',
      } as any}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-2 justify-start w-full">
        <img src={Logo} alt="Logo" className="h-[2.4rem] max-md:h-[1.9375rem] max-md:w-12" />
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="chevrons-updown"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronsUpDown className="size-4 text-[#30303066] dark:text-[#8585A9]" />
            </motion.div>
          )}
          {isBelowDesktop && isOpen && (
            <motion.div
              key="chevrons-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronsLeft className="size-4 text-[#30303066] dark:text-[#8585A9]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </IonButton>
  )
}
