import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderSummary from './OrderSummary.vue'

describe('OrderSummary', () => {
  it('renders payment summary details', () => {
    const wrapper = mount(OrderSummary, {
      props: {
        subtotal: 21.9,
        deliveryFee: 2.5,
        total: 24.4,
        paymentMethod: 'Tarjeta',
      },
    })

    expect(wrapper.text()).toContain('21.9')
    expect(wrapper.text()).toContain('2.5')
    expect(wrapper.text()).toContain('24.4')
    expect(wrapper.text()).toContain('Tarjeta')
  })
})