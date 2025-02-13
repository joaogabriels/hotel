import type { Place } from '../components/models'

class PlaceService {
  async getPlaces(): Promise<Place[]> {
    try {
      const response = await fetch('/place.json')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching places:', error)
      throw new Error('Failed to fetch places')
    }
  }
}

export const placeService = new PlaceService()
