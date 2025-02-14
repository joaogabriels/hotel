import type { Hotel } from 'components/models'
import hotels from '../assets/hotel.json'

interface HotelFilters {
  location?: string
  name?: string
  sortBy?: 'recommended' | 'best_rated'
  page?: number
  perPage?: number
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

class HotelService {
  private async fetchHotels(): Promise<Hotel[]> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return hotels.flatMap((item) => {
      if ('hotels' in item && Array.isArray(item.hotels)) {
        return item.hotels as Hotel[]
      }

      return []
    })
  }

  async getHotels(filters: HotelFilters = {}): Promise<PaginatedResponse<Hotel>> {
    const { page = 1, perPage = 10, sortBy = 'recommended', location, name } = filters

    try {
      let hotels = await this.fetchHotels()

      if (location) {
        const [city, state] = location.split(',')

        hotels = hotels.filter(
          (hotel) =>
            (city ? hotel.address.city.toLowerCase().includes(city.toLowerCase()) : false) ||
            (state ? hotel.address.state.toLowerCase().includes(state.toLowerCase()) : false),
        )
      }

      if (name) {
        hotels = hotels.filter((hotel) => hotel.name.toLowerCase().includes(name.toLowerCase()))
      }

      const sortedHotels = [...hotels]
      if (sortBy === 'best_rated') {
        sortedHotels.sort((a, b) => Number(b.stars) - Number(a.stars))
      } else {
        sortedHotels.sort((a, b) => (a.price || 0) - (b.price || 0))
      }

      const total = sortedHotels.length
      const totalPages = Math.ceil(total / perPage)
      const start = (page - 1) * perPage
      const end = start + perPage
      const paginatedHotels = sortedHotels.slice(start, end)

      return {
        data: paginatedHotels,
        total,
        page,
        totalPages,
      }
    } catch (error) {
      console.error('Error fetching hotels:', error)
      throw new Error('Failed to fetch hotels')
    }
  }
}

export const hotelService = new HotelService()
