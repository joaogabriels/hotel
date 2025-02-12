import { useRoute, useRouter } from 'vue-router'

interface QueryParams {
  location?: string
  hotelName?: string
  sortBy?: string
}

export function useQueryParams() {
  const router = useRouter()
  const route = useRoute()

  const updateQueryParams = async (params: Partial<QueryParams>) => {
    const newQuery = {
      ...route.query,
      ...params,
    }

    Object.keys(newQuery).forEach((key) => {
      if (
        newQuery[key as keyof QueryParams] === undefined ||
        newQuery[key as keyof QueryParams] === null ||
        newQuery[key as keyof QueryParams] === ''
      ) {
        delete newQuery[key as keyof QueryParams]
      }
    })

    await router.push({ query: newQuery })
  }

  return {
    updateQueryParams,
  }
}
