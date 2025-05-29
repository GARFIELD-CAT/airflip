import { describe, expect, it } from 'vitest'

import { formatAmountValue } from './formatValue'

describe('formatAmountValue', () => {
  it('should return "0" for zero value', () => {
    expect(formatAmountValue('0')).toBe('0')
    expect(formatAmountValue(0)).toBe('0')
  })

  it('should return undefined for empty or undefined values', () => {
    expect(formatAmountValue()).toBeUndefined()
    expect(formatAmountValue('')).toBeUndefined()
  })

  it('should return "0.00" for NaN', () => {
    expect(formatAmountValue('NaN')).toBe('0.00')
  })

  it('should format small numbers correctly', () => {
    expect(formatAmountValue('0.0001')).toBe('<0.0001')
    expect(formatAmountValue('0.00005')).toBe('<0.0001')
    expect(formatAmountValue('0.1234')).toBe('0.1234')
  })

  it('should format regular numbers correctly', () => {
    expect(formatAmountValue('1.2345')).toBe('1.2345')
    expect(formatAmountValue('123.456789')).toBe('123.4567')
    expect(formatAmountValue('999.999')).toBe('999.999')
  })

  it('should format thousands with K suffix', () => {
    expect(formatAmountValue('1000')).toBe('1K')
    expect(formatAmountValue('1500')).toBe('1.5K')
    expect(formatAmountValue('999999')).toBe('999.999K')
  })

  it('should format millions with M suffix', () => {
    expect(formatAmountValue('1000000')).toBe('1M')
    expect(formatAmountValue('1500000')).toBe('1.5M')
    expect(formatAmountValue('999999999')).toBe('1000M')
  })

  it('should format billions with B suffix', () => {
    expect(formatAmountValue('1000000000')).toBe('1B')
    expect(formatAmountValue('1500000000')).toBe('1.5B')
    expect(formatAmountValue('999999999999')).toBe('1000B')
  })

  it('should handle custom fraction digits', () => {
    expect(formatAmountValue('1.23456', 2)).toBe('1.23')
    expect(formatAmountValue('1000', 2)).toBe('1K')
    expect(formatAmountValue('1000000', 1)).toBe('1M')
  })

  it('should handle showLess parameter', () => {
    expect(formatAmountValue('0.0001', 4, false)).toBe('0.00')
    expect(formatAmountValue('0.0001', 4, true)).toBe('<0.0001')
  })

  it('should remove trailing zeros', () => {
    expect(formatAmountValue('1.0000')).toBe('1')
    expect(formatAmountValue('1.2000')).toBe('1.2')
    expect(formatAmountValue('1.2340')).toBe('1.234')
  })
}) 