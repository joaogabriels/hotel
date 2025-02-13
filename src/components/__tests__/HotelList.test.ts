import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import type { Ref, ComputedRef } from 'vue'

import { mockHotel } from './mocks'
import * as useHotelsModule from '../../composables/useHotels'
import HotelList from '../HotelList.vue'
import type { Hotel } from '../models'

installQuasarPlugin()

describe('HotelList', () => {
  it('matches snapshot', () => {
    vi.spyOn(useHotelsModule, 'useHotels').mockReturnValue({
      hotels: [mockHotel] as unknown as Ref<Hotel[]>,
      isFetching: false as unknown as Ref<boolean>,
      hasNextPage: true as unknown as ComputedRef<boolean>,
      fetchNextPage: vi.fn(),
      currentPage: 1 as unknown as Ref<number>,
      totalPages: 2 as unknown as Ref<number>,
      reset: vi.fn(),
    })

    const wrapper = mount(HotelList)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('triggers next page fetch', async () => {
    const fetchNextPage = vi.fn()
    vi.spyOn(useHotelsModule, 'useHotels').mockReturnValue({
      hotels: [mockHotel] as unknown as Ref<Hotel[]>,
      isFetching: false as unknown as Ref<boolean>,
      hasNextPage: true as unknown as ComputedRef<boolean>,
      fetchNextPage,
      currentPage: 1 as unknown as Ref<number>,
      totalPages: 2 as unknown as Ref<number>,
      reset: vi.fn(),
    })

    const wrapper = mount(HotelList)
    const infiniteScroll = wrapper.find('.q-infinite-scroll')

    await infiniteScroll?.trigger('scroll')

    expect(fetchNextPage).toHaveBeenCalled()
  })

  it('shows no more to load message when hasNextPage is false', () => {
    vi.spyOn(useHotelsModule, 'useHotels').mockReturnValue({
      hotels: [mockHotel] as unknown as Ref<Hotel[]>,
      isFetching: false as unknown as Ref<boolean>,
      hasNextPage: false as unknown as ComputedRef<boolean>,
      fetchNextPage: vi.fn(),
      currentPage: 2 as unknown as Ref<number>,
      totalPages: 2 as unknown as Ref<number>,
      reset: vi.fn(),
    })

    const wrapper = mount(HotelList)
    const noMoreMessage =
      wrapper.findAll('.text-grey-6')[wrapper.findAll('.text-grey-6').length - 1]

    expect(noMoreMessage?.exists()).toBe(true)
    expect(noMoreMessage?.text()).toBe('Não existem mais hotéis para serem exibidos :(')
  })
})
