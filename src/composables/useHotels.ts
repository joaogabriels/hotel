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

  const fetchHotels = async (page: number = 1) => {
    isFetching.value = true

    try {
      const response = await hotelService.getHotels({
        location: route.query.location as string,
        name: route.query.hotelName as string,
        sortBy: route.query.sortBy as 'recommended' | 'best_rated',
        page,
        perPage: 10,
      })

      if (page === 1) {
        hotels.value = response.data
      } else {
        hotels.value = [...hotels.value, ...response.data]
      }

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
    await fetchHotels(currentPage.value + 1)
  }

  const reset = () => {
    hotels.value = []
    currentPage.value = 1
    totalPages.value = 0
  }

  watch(
    () => route.query,
    async () => {
      reset()

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
    reset,
  }
}
