import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import type { Mock } from 'vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { mockPlace } from './mocks'

import * as usePlacesModule from '../../composables/usePlaces'
import * as useQueryParamsModule from '../../composables/useQueryParams'
import HotelFilterForm from '../HotelFilterForm.vue'

installQuasarPlugin()

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}))

describe('HotelFilterForm', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.spyOn(useQueryParamsModule, 'useQueryParams').mockReturnValue({
      updateQueryParams: vi.fn(),
    })

    vi.spyOn(usePlacesModule, 'usePlaces').mockReturnValue({
      places: ref([mockPlace]),
      fetchPlaces: vi.fn(),
      filterPlaces: vi.fn().mockReturnValue([mockPlace]),
      isLoading: ref(false),
      error: ref(null),
    })
    ;(useRoute as Mock).mockReturnValue({
      query: {},
    })
  })

  it('matches snapshot', () => {
    const wrapper = shallowMount(HotelFilterForm)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be able to select a place', async () => {
    const wrapper = mount(HotelFilterForm)

    const placeSelect = wrapper.findComponent({ name: 'q-select' })
    const submitButton = wrapper.findAll('.q-btn')[wrapper.findAll('.q-btn').length - 1]

    await placeSelect.vm.$emit('filter', 'Belo', (cb: () => void) => cb())
    await placeSelect.vm.$emit('update:modelValue', mockPlace)

    await submitButton?.trigger('submit')

    await flushPromises()

    expect(useQueryParamsModule.useQueryParams().updateQueryParams).toHaveBeenCalledWith({
      location: 'Belo Horizonte, MG',
      hotelName: '',
    })
  })

  it('should be able to filter name', async () => {
    const wrapper = mount(HotelFilterForm)

    const hotelNameInput = wrapper.findComponent({ name: 'q-input' })
    const submitButton = wrapper.findAll('.q-btn')[wrapper.findAll('.q-btn').length - 1]

    await hotelNameInput.vm.$emit('update:modelValue', 'Hotel Test')
    await submitButton?.trigger('submit')

    await flushPromises()

    expect(useQueryParamsModule.useQueryParams().updateQueryParams).toHaveBeenCalledWith({
      location: '',
      hotelName: 'Hotel Test',
    })
  })

  it('should be able to clear search', async () => {
    const wrapper = mount(HotelFilterForm)

    const submitButton = wrapper.findAll('.q-btn')[wrapper.findAll('.q-btn').length - 1]

    await submitButton?.trigger('submit')

    await flushPromises()

    const clearButton = wrapper.findAll('.q-btn')[wrapper.findAll('.q-btn').length - 2]

    await clearButton?.trigger('click')

    await flushPromises()

    expect(useQueryParamsModule.useQueryParams().updateQueryParams).toHaveBeenCalledWith({
      location: '',
      hotelName: '',
    })
  })

  it('should be able to fill the form when the query params are present', async () => {
    ;(useRoute as Mock).mockReturnValue({
      query: {
        location: 'Belo Horizonte, MG',
        hotelName: 'Hotel Test',
      },
    })

    const wrapper = mount(HotelFilterForm)

    await flushPromises()

    expect(wrapper.findComponent({ name: 'q-input' }).props('modelValue')).toBe('Hotel Test')
    expect(wrapper.findComponent({ name: 'q-select' }).props('modelValue')).toStrictEqual(mockPlace)
  })
})
