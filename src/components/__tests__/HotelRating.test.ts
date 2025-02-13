import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

import HotelRating from '../HotelRating.vue'
import { mockHotel } from './mocks'

installQuasarPlugin()

describe('HotelRating', () => {
  it('matches snapshot', () => {
    const wrapper = mount(HotelRating, {
      props: {
        stars: mockHotel.stars,
        hasAmenities: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with amenities', () => {
    const wrapper = mount(HotelRating, {
      props: {
        stars: mockHotel.stars,
        hasAmenities: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
