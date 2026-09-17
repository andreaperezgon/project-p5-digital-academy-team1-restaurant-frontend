import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DeliveryDestination from './DeliveryDestination.vue'

describe('DeliveryDestination', () => {
  it('renders delivery destination details', () => {
    const wrapper = mount(DeliveryDestination, {
      props: {
        address: 'Calle Uría, 25',
        postalCode: '33003',
        deliveryInstructions: 'Llamar al telefonillo al llegar',
      },
    })

    expect(wrapper.text()).toContain('Calle Uría, 25')
    expect(wrapper.text()).toContain('33003')
    expect(wrapper.text()).toContain('Llamar al telefonillo al llegar')
  })
})