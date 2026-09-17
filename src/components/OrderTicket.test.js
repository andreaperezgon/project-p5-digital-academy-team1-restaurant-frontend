import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderTicket from './OrderTicket.vue'

const baseProps = {
  orderNumber: 'GS-2026-00125',
  paymentStatus: 'Pagado',
  items: [
    {
      id: 1,
      name: 'Pull Nigiri',
      quantity: 2,
      price: 6.5,
    },
    {
      id: 2,
      name: 'Merge Maki',
      quantity: 1,
      price: 8.9,
    },
  ],
  subtotal: 21.9,
  deliveryFee: 2.5,
  total: 24.4,
  paymentMethod: 'Tarjeta',
  address: 'Calle Uría, 25',
  postalCode: '33003',
  deliveryInstructions: 'Llamar al telefonillo al llegar',
}

describe('OrderTicket', () => {
  it('renders order manifest details', () => {
    const wrapper = mount(OrderTicket, {
      props: {
        ...baseProps,
        isDelivery: true,
      },
    })

    expect(wrapper.text()).toContain('GS-2026-00125')
    expect(wrapper.text()).toContain('Pagado')
    expect(wrapper.text()).toContain('Pull Nigiri')
    expect(wrapper.text()).toContain('Merge Maki')
    expect(wrapper.text()).toContain('Cantidad: 2')
    expect(wrapper.text()).toContain('6.5 €')
  })

  it('shows delivery destination for delivery orders', () => {
    const wrapper = mount(OrderTicket, {
      props: {
        ...baseProps,
        isDelivery: true,
      },
    })

    expect(wrapper.text()).toContain('Destino de entrega')
    expect(wrapper.text()).toContain('Calle Uría, 25')
    expect(wrapper.text()).toContain('33003')
  })

  it('hides delivery destination for non-delivery orders', () => {
    const wrapper = mount(OrderTicket, {
      props: {
        ...baseProps,
        isDelivery: false,
      },
    })

    expect(wrapper.text()).not.toContain('Destino de entrega')
    expect(wrapper.text()).not.toContain('Calle Uría, 25')
  })
})