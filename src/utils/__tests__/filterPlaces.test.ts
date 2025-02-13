import { describe, expect, it } from 'vitest'

import filterPlaces from '../filterPlaces'
import type { Place } from '../../components/models'

describe('filterPlaces', () => {
  const mockPlaces: Place[] = [
    {
      name: 'Belo Horizonte',
      state: {
        name: 'Minas Gerais',
        shortname: 'MG',
      },
      placeId: 1,
    },
    {
      name: 'São Paulo',
      state: {
        name: 'São Paulo',
        shortname: 'SP',
      },
      placeId: 2,
    },
    {
      name: 'Rio de Janeiro',
      state: {
        name: 'Rio de Janeiro',
        shortname: 'RJ',
      },
      placeId: 3,
    },
  ]

  it('should return all places when search term is empty', () => {
    const result = filterPlaces(mockPlaces, '')
    expect(result).toEqual(mockPlaces)
  })

  it('should filter places by city name', () => {
    const result = filterPlaces(mockPlaces, 'belo')
    expect(result).toHaveLength(1)
    expect(result[0]?.name).toBe('Belo Horizonte')
  })

  it('should filter places by state name', () => {
    const result = filterPlaces(mockPlaces, 'paulo')
    expect(result).toHaveLength(1)
    expect(result[0]?.state.name).toBe('São Paulo')
  })

  it('should return empty array when no matches are found', () => {
    const result = filterPlaces(mockPlaces, 'invalid search')
    expect(result).toHaveLength(0)
  })

  it('should be case insensitive', () => {
    const result = filterPlaces(mockPlaces, 'BELO')
    expect(result).toHaveLength(1)
    expect(result[0]?.name).toBe('Belo Horizonte')
  })
})
