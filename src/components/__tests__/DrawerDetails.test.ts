import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

import DrawerDetails from '../DrawerDetails.vue'
import { mockHotel } from './mocks'

installQuasarPlugin()

describe('DrawerDetails', () => {
  it('matches snapshot', () => {
    const wrapper = mount(DrawerDetails, { props: { hotel: mockHotel } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render hotel amenities when they exist', () => {
    const wrapper = mount(DrawerDetails, { props: { hotel: mockHotel } })

    const amenitiesSection = wrapper.find('.amenities-section')
    const amenitiesTitle = wrapper.findAll('.drawer-section-title')

    expect(amenitiesSection.exists()).toBe(true)
    expect(amenitiesTitle[0]?.text()).toBe('Facilidades do hotel')
  })

  it('should be able to expand amenities', async () => {
    const wrapper = mount(DrawerDetails, { props: { hotel: mockHotel } })

    const expandButton = wrapper.findAll('.q-btn')[2]

    await expandButton?.trigger('click')

    expect(expandButton?.text()).toBe('Ver menos')
  })

  it('should be able to collapse amenities', async () => {
    const wrapper = mount(DrawerDetails, { props: { hotel: mockHotel } })

    const expandButton = wrapper.findAll('.q-btn')[2]

    await expandButton?.trigger('click')
    await expandButton?.trigger('click')

    expect(expandButton?.text()).toBe('Mostrar todas as facilidades')
  })

  it('should be able to render hotel description', () => {
    const wrapper = mount(DrawerDetails, { props: { hotel: mockHotel } })

    const descriptionSection = wrapper.findAll('.drawer-section-title')[1]

    expect(descriptionSection?.exists()).toBe(true)
  })

  it('should emit close event when clicking close button on mobile', async () => {
    const wrapper = mount(DrawerDetails, {
      props: { hotel: mockHotel },
      global: {
        mocks: {
          $q: {
            screen: {
              lt: {
                md: true,
              },
            },
            platform: {
              has: {
                touch: false,
              },
            },
            lang: {
              rtl: false,
            },
          },
        },
      },
    })

    const closeButton = wrapper.find('.q-btn')
    await closeButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('close')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
