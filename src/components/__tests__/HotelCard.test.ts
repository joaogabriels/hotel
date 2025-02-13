import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

import HotelCard from '../HotelCard.vue'
import { mockHotel } from './mocks'

installQuasarPlugin()

describe('HotelCard', () => {
  it('matches snapshot', () => {
    const wrapper = mount(HotelCard, {
      props: {
        hotel: mockHotel,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display refundable label when hotel has refundable room', () => {
    const wrapper = mount(HotelCard, {
      props: {
        hotel: {
          ...mockHotel,
          hasRefundableRoom: true,
        },
      },
    })

    const refundableChip = wrapper.find('.q-chip')
    expect(refundableChip.text()).toBe('Reembolsável')
  })

  it('should display non-refundable label when hotel has no refundable room', () => {
    const wrapper = mount(HotelCard, {
      props: {
        hotel: {
          ...mockHotel,
          hasRefundableRoom: false,
        },
      },
    })

    const refundableChip = wrapper.find('.q-chip')
    expect(refundableChip.text()).toBe('Não Reembolsável')
  })

  it('should emit select event with hotel data when clicking select button', async () => {
    const wrapper = mount(HotelCard, {
      props: {
        hotel: mockHotel,
      },
    })

    const selectButton = wrapper.findAll('.q-btn')[2]
    await selectButton?.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('select')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')?.[0]).toEqual([mockHotel])
  })
})
