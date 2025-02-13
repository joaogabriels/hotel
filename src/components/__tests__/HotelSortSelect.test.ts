import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import type { Mock } from 'vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { useRoute } from 'vue-router'

import * as useQueryParamsModule from '../../composables/useQueryParams'
import HotelSortSelect from '../HotelSortSelect.vue'
import { QBtnDropdown } from 'quasar'

installQuasarPlugin({ components: { QBtnDropdown } })

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}))

describe('HotelSortSelect', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.spyOn(useQueryParamsModule, 'useQueryParams').mockReturnValue({
      updateQueryParams: vi.fn(),
    })
    ;(useRoute as Mock).mockReturnValue({
      query: {},
    })
  })

  it('matches snapshot', () => {
    const wrapper = shallowMount(HotelSortSelect)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be able to select sorting option', async () => {
    const wrapper = mount(HotelSortSelect)

    await wrapper.vm.handleSelect({ label: 'Melhor avaliados', value: 'best_rated' })

    await flushPromises()

    expect(wrapper.findComponent({ name: 'q-btn-dropdown' }).props('label')).toBe(
      'Melhor avaliados',
    )
  })

  it('should get sorting option from query params on mount', async () => {
    ;(useRoute as Mock).mockReturnValue({
      query: {
        sortBy: 'best_rated',
      },
    })

    const wrapper = mount(HotelSortSelect)

    await flushPromises()

    expect(wrapper.findComponent({ name: 'q-btn-dropdown' }).props('label')).toBe(
      'Melhor avaliados',
    )
  })
})
