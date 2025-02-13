import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'

import { usePlaces } from '../usePlaces'
import { mockPlace } from '../../components/__tests__/mocks'

vi.mock('../../services/placeService', () => ({
  placeService: {
    getPlaces: vi.fn(),
  },
}))

import { placeService } from '../../services/placeService'

describe('usePlaces', () => {
  beforeEach(() => {
    ;(placeService.getPlaces as Mock).mockResolvedValue([mockPlace])
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch places', async () => {
    const { places, isLoading, error, fetchPlaces } = usePlaces()

    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(places.value).toEqual([])

    await fetchPlaces()

    expect(places.value).toEqual([mockPlace])
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('should handle fetch error', async () => {
    ;(placeService.getPlaces as Mock).mockRejectedValue('error')
    const mockSpy = vi.spyOn(console, 'error')

    const { places, isLoading, error, fetchPlaces } = usePlaces()

    await fetchPlaces()

    expect(isLoading.value).toBe(false)
    expect(error.value).toBe('error')
    expect(places.value).toEqual([])
    expect(mockSpy).toHaveBeenCalledWith('Error loading places:', 'error')
  })

  it('should filter places by name', () => {
    const { places, filterPlaces } = usePlaces()
    places.value = [
      mockPlace,
      {
        name: 'São Paulo',
        state: {
          name: 'São Paulo',
          shortname: 'SP',
        },
        placeId: 2,
      },
    ]

    const filteredPlaces = filterPlaces('belo')

    expect(filteredPlaces).toHaveLength(1)
    expect(filteredPlaces[0]).toEqual(mockPlace)
  })

  it('should filter places by state name', () => {
    const { places, filterPlaces } = usePlaces()
    places.value = [
      mockPlace,
      {
        name: 'São Paulo',
        state: {
          name: 'São Paulo',
          shortname: 'SP',
        },
        placeId: 2,
      },
    ]

    const filteredPlaces = filterPlaces('paulo')

    expect(filteredPlaces).toHaveLength(1)
    expect(filteredPlaces[0]?.state?.name).toBe('São Paulo')
  })

  it('should return all places when search term is empty', () => {
    const { places, filterPlaces } = usePlaces()
    places.value = [
      mockPlace,
      {
        name: 'São Paulo',
        state: {
          name: 'São Paulo',
          shortname: 'SP',
        },
        placeId: 2,
      },
    ]

    const filteredPlaces = filterPlaces('')

    expect(filteredPlaces).toHaveLength(2)
    expect(filteredPlaces).toEqual(places.value)
  })
})
