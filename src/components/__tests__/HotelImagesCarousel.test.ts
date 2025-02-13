import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

import HotelImagesCarousel from '../HotelImagesCarousel.vue'
import { mockHotel } from './mocks'

installQuasarPlugin()

describe('HotelImagesCarousel', () => {
  it('matches snapshot', () => {
    const wrapper = mount(HotelImagesCarousel, {
      props: {
        images: mockHotel.images,
        height: '320px',
        arrows: true,
        showCounter: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with counter', () => {
    const wrapper = mount(HotelImagesCarousel, {
      props: {
        images: mockHotel.images,
        height: '320px',
        arrows: true,
        showCounter: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should trigger next button', async () => {
    const wrapper = mount(HotelImagesCarousel, {
      props: {
        images: mockHotel.images,
        height: '320px',
        arrows: true,
        showCounter: true,
      },
    })

    const nextButton = wrapper.findAll('.q-btn')[1]
    await nextButton?.trigger('click')

    expect((wrapper.vm as unknown as { currentSlide: number }).currentSlide).toBe(1)
  })

  it('should trigger back button', async () => {
    const wrapper = mount(HotelImagesCarousel, {
      props: {
        images: mockHotel.images,
        height: '320px',
        arrows: true,
        showCounter: true,
      },
    })

    const nextButton = wrapper.findAll('.q-btn')[1]
    await nextButton?.trigger('click')

    expect((wrapper.vm as unknown as { currentSlide: number }).currentSlide).toBe(1)

    const backButton = wrapper.findAll('.q-btn')[0]
    await backButton?.trigger('click')

    expect((wrapper.vm as unknown as { currentSlide: number }).currentSlide).toBe(0)
  })
})
