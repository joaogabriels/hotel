import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { hotelService } from '../services/hotelService'
import type { Hotel } from '../components/models'

export function useHotels() {
  const route = useRoute()
  const hotels = ref<Hotel[]>([])
  const isFetching = ref(false)
  const totalPages = ref(0)
  const currentPage = ref(1)

  const hasNextPage = computed(() => currentPage.value < totalPages.value)

  const fetchHotels = async () => {
    isFetching.value = true

    try {
      const response = await hotelService.getHotels({
        location: route.query.location as string,
        name: route.query.hotelName as string,
        sortBy: route.query.sortBy as 'recommended' | 'best_rated',
        page: Number(route.query.page || 1),
        perPage: 10,
      })

      hotels.value = response.data
      totalPages.value = response.totalPages
      currentPage.value = response.page
    } catch (error) {
      console.error('Error fetching hotels:', error)
      throw error
    } finally {
      isFetching.value = false
    }
  }

  const fetchNextPage = async () => {
    if (!hasNextPage.value || isFetching.value) return

    await fetchHotels()
  }

  watch(
    () => route.query,
    async () => {
      await fetchHotels()
    },
    { immediate: true },
  )

  return {
    hotels,
    isFetching,
    hasNextPage,
    fetchNextPage,
    currentPage,
    totalPages,
  }
}
