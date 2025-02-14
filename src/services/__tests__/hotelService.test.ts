import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { Mock } from 'vitest'

import { hotelService } from '../../services/hotelService'
import { mockHotel, mockSaoPauloHotel } from '../../components/__tests__/mocks'

global.fetch = vi.fn()

describe.skip('HotelService', () => {
  const mockHotels = [mockHotel, mockSaoPauloHotel]

  beforeEach(() => {
    ;(fetch as Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue([{ hotels: mockHotels }]),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch hotels and return paginated data', async () => {
    const result = await hotelService.getHotels({ page: 1, perPage: 1 })

    expect(fetch).toHaveBeenCalledWith('/hotel.json')
    expect(result.data).toHaveLength(1)
    expect(result.total).toBe(2)
    expect(result.page).toBe(1)
    expect(result.totalPages).toBe(2)
  })

  it('should filter hotels by location', async () => {
    const result = await hotelService.getHotels({ location: 'Belo Horizonte, MG' })

    expect(result.data).toHaveLength(1)
    expect(result.data[0]?.name).toBe('Hotel de Teste')
  })

  it('should filter hotels by name', async () => {
    const result = await hotelService.getHotels({ name: 'Hotel de Teste 2' })

    expect(result.data).toHaveLength(1)
    expect(result.data[0]?.name).toBe('Hotel de Teste 2')
  })

  it('should sort hotels by best rated', async () => {
    const result = await hotelService.getHotels({ sortBy: 'best_rated' })

    expect(result.data[0]?.name).toBe('Hotel de Teste')
  })

  it('should handle fetch error', async () => {
    ;(fetch as Mock).mockRejectedValue(new Error('Network error'))
    await expect(hotelService.getHotels()).rejects.toThrow('Failed to fetch hotels')
  })
})
