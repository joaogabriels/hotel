import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import { useQueryParams } from '../useQueryParams'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: {},
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

import { useRoute, useRouter } from 'vue-router'

describe('useQueryParams', () => {
  let router: { push: Mock }

  beforeEach(() => {
    router = {
      push: vi.fn(),
    }
    ;(useRouter as Mock).mockReturnValue(router)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should update query params', async () => {
    const { updateQueryParams } = useQueryParams()
    const params = {
      location: 'Belo Horizonte, MG',
      hotelName: 'Hotel Test',
    }

    await updateQueryParams(params)

    expect(router.push).toHaveBeenCalledWith({
      query: params,
    })
  })

  it('should merge with existing query params', async () => {
    ;(useRoute as Mock).mockReturnValue({
      query: {
        sortBy: 'best_rated',
      },
    })

    const { updateQueryParams } = useQueryParams()
    const params = {
      location: 'Belo Horizonte, MG',
    }

    await updateQueryParams(params)

    expect(router.push).toHaveBeenCalledWith({
      query: {
        sortBy: 'best_rated',
        location: 'Belo Horizonte, MG',
      },
    })
  })

  it('should remove empty, null, or undefined values from query params', async () => {
    ;(useRoute as Mock).mockReturnValue({
      query: {
        sortBy: 'best_rated',
        location: 'Belo Horizonte, MG',
      },
    })

    const { updateQueryParams } = useQueryParams()
    const params = {
      location: '',
      hotelName: '',
      sortBy: '',
    }

    await updateQueryParams(params)

    expect(router.push).toHaveBeenCalledWith({
      query: {},
    })
  })

  it('should handle partial updates', async () => {
    ;(useRoute as Mock).mockReturnValue({
      query: {
        sortBy: 'best_rated',
        location: 'Belo Horizonte, MG',
        hotelName: 'Hotel Test',
      },
    })

    const { updateQueryParams } = useQueryParams()
    const params = {
      hotelName: 'New Hotel',
    }

    await updateQueryParams(params)

    expect(router.push).toHaveBeenCalledWith({
      query: {
        sortBy: 'best_rated',
        location: 'Belo Horizonte, MG',
        hotelName: 'New Hotel',
      },
    })
  })
})
