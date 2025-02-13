import type { Mock } from 'vitest'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { placeService } from '../../services/placeService'
import type { Place } from '../../components/models'

global.fetch = vi.fn()

describe('PlaceService', () => {
  const mockPlaces: Place[] = [
    {
      name: 'Xique-Xique',
      state: {
        name: 'Bahia',
        shortname: 'BA',
      },
      placeId: 1,
    },
    {
      name: 'Betim',
      state: {
        name: 'Minas Gerais',
        shortname: 'MG',
      },
      placeId: 2,
    },
  ]

  beforeEach(() => {
    ;(fetch as Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockPlaces),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch places', async () => {
    const result = await placeService.getPlaces()

    expect(fetch).toHaveBeenCalledWith('/place.json')
    expect(result).toEqual(mockPlaces)
  })

  it('should handle fetch error', async () => {
    ;(fetch as Mock).mockRejectedValue(new Error('Network error'))
    await expect(placeService.getPlaces()).rejects.toThrow('Failed to fetch places')
  })
})
