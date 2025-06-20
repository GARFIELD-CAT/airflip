import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render } from '../../test/test-utils'

import { AmountInput } from './AmountInput'

describe('AmountInput Integration Tests', () => {
  const user = userEvent.setup()
  const mockOnValueChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Number Formatting Logic', () => {
    it('should add leading zero for decimal starting with dot', async () => {
      render(<AmountInput value="" onValueChange={mockOnValueChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, '.')

      expect(mockOnValueChange).toHaveBeenCalledWith('0.')
    })

    it('should limit decimal places based on decimals prop', async () => {
      render(<AmountInput value="123.45" onValueChange={mockOnValueChange} decimals={2} />)

      const input = screen.getByRole('textbox')
      await user.type(input, '6')

      expect(mockOnValueChange).toHaveBeenCalledWith('123.45')
    })

    it('should remove non-numeric characters', async () => {
      render(<AmountInput value="" onValueChange={mockOnValueChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'a')

      expect(mockOnValueChange).toHaveBeenCalledWith('')
    })

    it('should handle multiple decimal points correctly', async () => {
      render(<AmountInput value="123." onValueChange={mockOnValueChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, '.')

      expect(mockOnValueChange).toHaveBeenCalledWith('123.')
    })
  })

  describe('Error State Integration', () => {
    it('should apply error styling when error prop is provided', () => {
      render(<AmountInput value="100" onValueChange={mockOnValueChange} error="Test error" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('text-red-100')
    })

    it('should apply error styling to suffix when error is present', () => {
      render(
        <AmountInput value="100" onValueChange={mockOnValueChange} error="Test error" after="ETH" />
      )

      const suffix = screen.getByText('ETH')
      expect(suffix).toHaveClass('text-red-100')
    })
  })

  describe('Special Value Handling', () => {
    it('should not display "0.00" as value', () => {
      render(<AmountInput value="0.00" onValueChange={mockOnValueChange} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('should display suffix when provided', () => {
      render(<AmountInput value="100" onValueChange={mockOnValueChange} after="ETH" />)

      expect(screen.getByText('ETH')).toBeInTheDocument()
    })
  })
}) 