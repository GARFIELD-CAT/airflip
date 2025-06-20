import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactElement, type ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { IonApp, setupIonicReact } from '@ionic/react'

// Setup Ionic for testing
setupIonicReact()

// Create a custom render function that includes providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

interface AllTheProvidersProps {
  children: ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = createTestQueryClient()

  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    </IonApp>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Mock wagmi hooks for testing
export const mockUseAccount = {
  address: '0x1234567890123456789012345678901234567890' as const,
  isConnected: true,
  isConnecting: false,
  isDisconnected: false,
  isReconnecting: false,
  status: 'connected' as const,
}

export const mockUseBalance = {
  data: {
    decimals: 18,
    formatted: '1.0',
    symbol: 'ETH',
    value: BigInt('1000000000000000000'),
  },
  isLoading: false,
  isError: false,
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render } 