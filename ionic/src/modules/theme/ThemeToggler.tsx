import { useAppKitTheme } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'

import MoonV1Svg from './assets/moon-v1.svg'
import SunV1Svg from './assets/sun-v1.svg'
import { useTheme } from './ThemeProvider'
import { IonButton } from '@ionic/react'

interface ThemeToggleProperties extends ComponentProps<'div'> {}

export function ThemeToggler(props: ThemeToggleProperties) {
  const { className } = props
  const { setTheme, theme } = useTheme()
  const { setThemeMode } = useAppKitTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setThemeMode(newTheme)
  }

  return (
    <IonButton
      onClick={toggleTheme}
      style={{
        '--background': 'var(--misc-card)',
        '--background-hover': 'var(--misc-card)',
        '--background-activated': 'var(--misc-card)',
        '--color': 'var(--text-100)',
        '--color-hover': 'var(--text-100)',
        '--color-activated': 'var(--text-100)',
        '--border-radius': '0.75rem',
        '--box-shadow': 'var(--shadow-test)',
        '--border-width': '1px',
        '--border-style': 'solid',
        '--border-color': 'var(--stroke-100)',
        '--padding-start': '0.25rem',
        '--padding-end': '0.25rem',
        '--padding-top': '0.25rem',
        '--padding-bottom': '0.25rem',
        '--padding': '0.25rem',
        width: 'auto',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        cursor: 'pointer',
      } as any}
      type="button"
    >
      <motion.div
        className={cn(
          'absolute top-1 left-1 z-0 rounded-[0.75rem]',
          'bg-main-100',
          'transition-all duration-300 ease-out pointer-events-none ',
        )}
        initial={false}
        animate={{
          x: theme === 'light' ? '0%' : '140%',
          width: '35%',
          height: '82%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
      />

      <div className="relative z-10 flex w-full items-center ">
        <div className="flex w-1/2 items-center justify-center ">
          <div
            className={cn(
              'flex justify-center items-center w-auto h-auto rounded-[0.75rem] ',
              theme === 'light' ? 'bg-main-100' : 'bg-transparent hover:bg-[#8585A914]',
              'p-3',
            )}
          >
            <SunV1Svg
              className={cn(
                theme === 'light'
                  ? 'fill-white'
                  : 'fill-gray-400 [&_path]:stroke-gray-400',
                'size-4',
              )}
            />
          </div>
        </div>

        <div className="flex w-1/2 items-center justify-center ">
          <div
            className={cn(
              'flex justify-center items-center w-auto h-auto rounded-[0.75rem]',
              theme === 'dark' ? '!bg-main-100' : 'bg-transparent hover:bg-[#8585A914]',
              'p-3',
            )}
          >
            <MoonV1Svg
              className={cn(
                theme === 'dark' ? 'fill-white [&_path]:stroke-white' : '',
                'size-4',
              )}
            />
          </div>
        </div>
      </div>
    </IonButton>
  )
}
