/* eslint-disable @typescript-eslint/default-param-last */
import { LIfiProvider } from '@configs/LIfiProvider'
import { queryClient } from '@configs/r-query'
import { Web3ModalProvider } from '@configs/Web3ModalProvider'
import { PendingTransactionsManager, TransactionStatusDebug } from '@modules/pending-transactions'
import { ThemeProvider } from '@modules/theme/ThemeProvider'
import { TxReviewModal } from '@modules/transaction-block/transaction-review/components/TxReviewModal'
import { router } from '@routes/router.config'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Web3ModalProvider>
          <QueryClientProvider client={queryClient}>
            <LIfiProvider>
              <RouterProvider router={router} />
              <TxReviewModal />
              <PendingTransactionsManager />
              <TransactionStatusDebug />
            </LIfiProvider>
          </QueryClientProvider>
        </Web3ModalProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
