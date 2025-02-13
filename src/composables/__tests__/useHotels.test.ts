/* eslint-disable @typescript-eslint/unbound-method */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import { useRoute } from 'vue-router'

import { useHotels } from '../../composables/useHotels'
import { mockHotel } from '../../components/__tests__/mocks'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: {},
  })),
}))

vi.mock('../../services/hotelService', () => ({
  hotelService: {
    getHotels: vi.fn(),
  },
}))

import { hotelService } from '../../services/hotelService'

describe('useHotels', () => {
  beforeEach(() => {
    ;(hotelService.getHotels as Mock).mockResolvedValue({
      data: [mockHotel],
      page: 1,
      totalPages: 2,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch hotels on mount', async () => {
    const { hotels, currentPage, totalPages } = useHotels()

    await vi.dynamicImportSettled()

    expect(hotels.value).toEqual([mockHotel])
    expect(currentPage.value).toBe(1)
    expect(totalPages.value).toBe(2)
  })

  it('should fetch hotels with query params', async () => {
    ;(useRoute as Mock).mockReturnValue({
      query: {
        location: 'Belo Horizonte, MG',
        hotelName: 'Hotel Test',
        sortBy: 'best_rated',
      },
    })

    useHotels()

    await vi.dynamicImportSettled()

    expect(hotelService.getHotels).toHaveBeenCalledWith({
      location: 'Belo Horizonte, MG',
      name: 'Hotel Test',
      sortBy: 'best_rated',
      page: 1,
      perPage: 10,
    })
  })

  it('should fetch next page', async () => {
    const { fetchNextPage, hasNextPage } = useHotels()
    await vi.dynamicImportSettled()

    expect(hasNextPage.value).toBe(true)

    await fetchNextPage()

    expect(hotelService.getHotels).toHaveBeenCalledWith({
      location: 'Belo Horizonte, MG',
      name: 'Hotel Test',
      sortBy: 'best_rated',
      page: 2,
      perPage: 10,
    })
  })

  it('should reset hotels', () => {
    const { reset, hotels } = useHotels()

    reset()

    expect(hotels.value).toEqual([])
  })

  it('should handle fetch error', async () => {
    ;(hotelService.getHotels as Mock).mockRejectedValue('error')
    const mockSpy = vi.spyOn(console, 'error')

    const { hotels, isFetching } = useHotels()

    await vi.dynamicImportSettled()

    expect(isFetching.value).toBe(false)
    expect(hotels.value).toEqual([])
    expect(mockSpy).toHaveBeenCalledWith('Error fetching hotels:', 'error')
  })
})
