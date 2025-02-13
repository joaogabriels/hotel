import { ref } from 'vue'

import type { Place } from '../components/models'
import { placeService } from '../services/placeService'

export function usePlaces() {
  const places = ref<Place[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetchPlaces = async () => {
    isLoading.value = true
    error.value = null

    try {
      places.value = await placeService.getPlaces()
    } catch (err) {
      error.value = err as Error
      console.error('Error loading places:', err)
    } finally {
      isLoading.value = false
    }
  }

  const filterPlaces = (searchTerm: string) => {
    if (!searchTerm) return places.value

    const needle = searchTerm.toLowerCase()
    return places.value.filter(
      (place) =>
        place.name.toLowerCase().includes(needle) ||
        place.state.name.toLowerCase().includes(needle),
    )
  }

  return {
    places,
    isLoading,
    error,
    fetchPlaces,
    filterPlaces,
  }
}
