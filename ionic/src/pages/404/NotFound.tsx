import { IonButton } from '@ionic/react'
import { ROUTES } from '@routes/routes'
import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

interface NotFoundProperties extends ComponentProps<'div'> {}

export const NotFound = ({ className, ...rest }: NotFoundProperties) => {
  return (
    <div
      className={`from-main-8/20 flex min-h-screen items-center justify-center bg-gradient-to-br to-transparent px-4 ${className}`}
      {...rest}
    >
      <div className="text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-[8rem] font-bold leading-none text-main-100 max-md:text-[6rem]">
            4
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
              }}
              className="inline-block text-[#6160FF]"
            >
              0
            </motion.span>
            4
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-[2rem] font-semibold text-text-2100 max-md:text-[1.5rem]">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-md text-[1.125rem] text-text-260 max-md:text-[1rem]">
            Sorry, but the page you are looking for does not exist or has been moved.
          </p>
        </motion.div>

        {/* Floating Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-main-100/20 absolute size-2 rounded-full"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            to={ROUTES.SWAP}
            className="group relative overflow-hidden rounded-xl bg-[#6160FF] px-8 py-4 text-[1.125rem] font-medium text-white transition-all duration-300 hover:bg-[#5550E5] hover:shadow-lg hover:shadow-[#6160FF]/25"
          >
            <motion.span
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Back to Home
            </motion.span>
            <motion.div
              className="via-white/20 absolute inset-0 bg-gradient-to-r from-transparent to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </Link>

          <IonButton
            onClick={() => window.history.back()}
            className="hover:bg-main-8/10 group rounded-xl border border-stroke-100 bg-cards-widget px-8 py-4 text-[1.125rem] font-medium text-text-2100 transition-all duration-300 hover:shadow-lg"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Go Back
            </motion.span>
          </IonButton>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="border-main-100/20 absolute left-1/4 top-1/4 size-16 rounded-full border-2 max-md:size-12"
        />

        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: -360 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-1/4 right-1/4 size-12 rounded-full bg-[#6160FF]/10 max-md:size-8"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="border-main-100/30 absolute right-1/3 top-1/3 size-6 rotate-45 border-2 max-md:size-4"
        />
      </div>
    </div>
  )
}
