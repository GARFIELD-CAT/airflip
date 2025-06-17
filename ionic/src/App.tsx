import { LIfiProvider } from '@configs/LIfiProvider'
import { queryClient } from '@configs/r-query'
import { Web3ModalProvider } from '@configs/Web3ModalProvider'
import { PendingTransactionsManager, TransactionStatusDebug } from '@modules/pending-transactions'
import { ThemeProvider } from '@modules/theme/ThemeProvider'
import { TxReviewModal } from '@modules/transaction-block/transaction-review/components/TxReviewModal'
import { IonicApp } from '@routes/router.config'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { setupIonicReact } from '@ionic/react'
import { IonApp } from '@ionic/react'

setupIonicReact({
  mode: 'ios',
  animated: true,
})

function App() {
  return (
    <IonApp>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Web3ModalProvider>
          <QueryClientProvider client={queryClient}>
            <LIfiProvider>
              <IonicApp />
              <TxReviewModal />
              <PendingTransactionsManager />
              <TransactionStatusDebug />
            </LIfiProvider>
          </QueryClientProvider>
        </Web3ModalProvider>
      </ThemeProvider>
      <Toaster />
    </IonApp>
  )
}

export default App
