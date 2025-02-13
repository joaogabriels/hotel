import { describe, expect, it } from 'vitest'
import formatCurrency from '../formatCurrency'

describe('formatCurrency', () => {
  it('should format integer numbers', () => {
    expect(formatCurrency(1000)).toBe('1.000,00')
  })

  it('should format decimal numbers', () => {
    expect(formatCurrency(1000.5)).toBe('1.000,50')
  })

  it('should format numbers with more than 2 decimal places', () => {
    expect(formatCurrency(1000.567)).toBe('1.000,57')
  })

  it('should format zero', () => {
    expect(formatCurrency(0)).toBe('0,00')
  })

  it('should format small decimal numbers', () => {
    expect(formatCurrency(0.1)).toBe('0,10')
  })
})
