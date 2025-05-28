import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render } from '../../test/test-utils'

import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalDescription,
  AdaptiveModalHeader,
  AdaptiveModalTitle,
  AdaptiveModalTrigger,
} from './AdaptiveModal'

vi.mock('@hooks/common/useModalVariant', () => ({
  useModalVariant: vi.fn(),
}))

vi.mock('@hooks/common/useDeviceWidth', () => ({
  default: vi.fn(),
}))

const { useModalVariant } = await import('@hooks/common/useModalVariant')
const mockUseModalVariant = vi.mocked(useModalVariant)

const SimpleTestModal = ({
  isOpen = false,
  onOpenChange = () => {},
}: {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) => (
  <AdaptiveModal open={isOpen} onOpenChange={onOpenChange}>
    <AdaptiveModalTrigger data-testid="modal-trigger">
      Open Modal
    </AdaptiveModalTrigger>
    <AdaptiveModalContent data-testid="modal-content">
      <AdaptiveModalHeader>
        <AdaptiveModalTitle data-testid="modal-title">
          Test Modal
        </AdaptiveModalTitle>
        <AdaptiveModalDescription data-testid="modal-description">
          Simple test modal
        </AdaptiveModalDescription>
      </AdaptiveModalHeader>
      <div data-testid="modal-body">
        <p>Modal content</p>
        <button type="button" data-testid="test-button">
          Test Button
        </button>
      </div>
    </AdaptiveModalContent>
  </AdaptiveModal>
)

describe('AdaptiveModal Integration Tests', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Modal Functionality', () => {
    beforeEach(() => {
      mockUseModalVariant.mockReturnValue({
        isDrawer: false,
        isDialog: true,
      })
    })

    it('should render trigger button', () => {
      render(<SimpleTestModal />)

      const triggerButton = screen.getByTestId('modal-trigger')
      expect(triggerButton).toBeInTheDocument()
      expect(triggerButton).toHaveTextContent('Open Modal')
    })

    it('should call onOpenChange when trigger is clicked', async () => {
      const onOpenChange = vi.fn()
      render(<SimpleTestModal onOpenChange={onOpenChange} />)

      const triggerButton = screen.getByTestId('modal-trigger')
      await user.click(triggerButton)
      
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('should not display modal content when closed', () => {
      render(<SimpleTestModal isOpen={false} />)

      expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('should use drawer variant on mobile', () => {
      mockUseModalVariant.mockReturnValue({
        isDrawer: true,
        isDialog: false,
      })

      render(<SimpleTestModal isOpen={true} />)
      
      expect(screen.getByTestId('modal-content')).toBeInTheDocument()
    })
  })

  describe('Component Props and API', () => {
    beforeEach(() => {
      mockUseModalVariant.mockReturnValue({
        isDrawer: false,
        isDialog: true,
      })
    })

    it('should work without onOpenChange prop', () => {
      expect(() => render(<SimpleTestModal isOpen={false} />)).not.toThrow()
    })

    it('should render minimal modal structure', () => {
      const MinimalModal = () => (
        <AdaptiveModal>
          <AdaptiveModalTrigger>Open</AdaptiveModalTrigger>
          <AdaptiveModalContent>
            <p>Minimal content</p>
          </AdaptiveModalContent>
        </AdaptiveModal>
      )

      expect(() => render(<MinimalModal />)).not.toThrow()
    })

    it('should handle controlled vs uncontrolled usage', async () => {
      const onOpenChange = vi.fn()
      
      const { rerender } = render(
        <SimpleTestModal isOpen={false} onOpenChange={onOpenChange} />
      )

      const triggerButton = screen.getByTestId('modal-trigger')
      await user.click(triggerButton)
      
      expect(onOpenChange).toHaveBeenCalledWith(true)

      rerender(<SimpleTestModal onOpenChange={onOpenChange} />)
      expect(screen.getByTestId('modal-trigger')).toBeInTheDocument()
    })
  })
}) 