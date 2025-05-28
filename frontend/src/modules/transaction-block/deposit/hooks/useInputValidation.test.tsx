import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useInputValidation } from './useInputValidation'

describe('useInputValidation Integration Tests', () => {
  const mockOnError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Core Validation Logic', () => {
    it('should show error when input exceeds balance', () => {
      const { result } = renderHook(() =>
        useInputValidation({
          inputValue: '150',
          assetBalance: '100',
          hasAsset: true,
          onError: mockOnError,
        })
      )

      expect(result.current).toBe('Exceeds balance')
      expect(mockOnError).toHaveBeenCalledWith('Exceeds balance')
    })

    it('should not show error when input is within balance', () => {
      const { result } = renderHook(() =>
        useInputValidation({
          inputValue: '50',
          assetBalance: '100',
          hasAsset: true,
          onError: mockOnError,
        })
      )

      expect(result.current).toBe('')
      expect(mockOnError).toHaveBeenCalledWith(null)
    })

    it('should not validate when no asset is selected', () => {
      const { result } = renderHook(() =>
        useInputValidation({
          inputValue: '100',
          assetBalance: '50',
          hasAsset: false,
          onError: mockOnError,
        })
      )

      expect(result.current).toBe('')
      expect(mockOnError).toHaveBeenCalledWith(null)
    })

    it('should show error for invalid input values', () => {
      const { result } = renderHook(() =>
        useInputValidation({
          inputValue: 'invalid',
          assetBalance: '100',
          hasAsset: true,
          onError: mockOnError,
        })
      )

      expect(result.current).toBe('Invalid input or balance')
      expect(mockOnError).toHaveBeenCalledWith('Invalid input or balance')
    })
  })

  describe('Dynamic Validation Updates', () => {
    it('should update error when input value changes', () => {
      const { result, rerender } = renderHook(
        ({ inputValue }) =>
          useInputValidation({
            inputValue,
            assetBalance: '100',
            hasAsset: true,
            onError: mockOnError,
          }),
        {
          initialProps: { inputValue: '50' },
        }
      )

      expect(result.current).toBe('')

      rerender({ inputValue: '150' })
      expect(result.current).toBe('Exceeds balance')

      rerender({ inputValue: '75' })
      expect(result.current).toBe('')
    })

    it('should clear error when asset is deselected', () => {
      const { result, rerender } = renderHook(
        ({ hasAsset }) =>
          useInputValidation({
            inputValue: '150',
            assetBalance: '100',
            hasAsset,
            onError: mockOnError,
          }),
        {
          initialProps: { hasAsset: true },
        }
      )

      expect(result.current).toBe('Exceeds balance')

      rerender({ hasAsset: false })
      expect(result.current).toBe('')
    })
  })
}) 