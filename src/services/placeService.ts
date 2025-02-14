import type { Place } from '../components/models'
import places from '../assets/place.json'

class PlaceService {
  async getPlaces(): Promise<Place[]> {
    const response = places

    await new Promise((resolve) => setTimeout(resolve, 800))

    return response
  }
}

export const placeService = new PlaceService()
