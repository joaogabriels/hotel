import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

import HotelAmenities from '../../../src/components/HotelAmenities.vue'
import { mockHotel } from '../mocks'

installQuasarPlugin()

describe('HotelAmenities', () => {
  it('matches snapshot', () => {
    const wrapper = mount(HotelAmenities, {
      props: {
        amenities: mockHotel.amenities,
        showLabels: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot when showLabels is false', () => {
    const wrapper = mount(HotelAmenities, {
      props: {
        amenities: mockHotel.amenities,
        showLabels: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be able to expand amenities', async () => {
    const wrapper = mount(HotelAmenities, {
      props: {
        amenities: mockHotel.amenities,
        showLabels: true,
      },
    })

    const expandButton = wrapper.findAll('.q-btn')[0]

    await expandButton?.trigger('click')

    expect(expandButton?.text()).toBe('Ver menos')
  })
})
