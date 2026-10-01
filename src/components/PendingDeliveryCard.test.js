import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PendingDeliveryCard from './PendingDeliveryCard.vue'

const props = {
  orderId: 42,
  orderNumber: 'GS-42',
  address: 'Calle Mayor 10, 33001 Oviedo',
}

describe('PendingDeliveryCard', () => {
  it('muestra el número del pedido y la dirección', () => {
    const wrapper = mount(PendingDeliveryCard, { props })

    expect(wrapper.get('h3').text()).toBe('Pedido GS-42')
    expect(wrapper.text()).toContain(props.address)
  })

  it('indica cuando no hay dirección disponible', () => {
    const wrapper = mount(PendingDeliveryCard, {
      props: { ...props, address: '' },
    })

    expect(wrapper.text()).toContain('Dirección no disponible.')
  })

  it('mantiene la asignación deshabilitada por defecto', async () => {
    const wrapper = mount(PendingDeliveryCard, { props })
    const button = wrapper.get('button')

    expect(button.element.disabled).toBe(true)
    expect(wrapper.text()).toContain(
      'La asignación estará disponible próximamente.'
    )

    await button.trigger('click')

    expect(wrapper.emitted('assign')).toBeUndefined()
  })

  it('emite el identificador del pedido cuando se permite asignar', async () => {
    const wrapper = mount(PendingDeliveryCard, {
      props: { ...props, canAssign: true },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('assign')).toEqual([[42]])
  })

  it('bloquea nuevos clics mientras se está asignando', async () => {
    const wrapper = mount(PendingDeliveryCard, {
      props: {
        ...props,
        canAssign: true,
        isAssigning: true,
      },
    })

    expect(wrapper.get('button').text()).toBe('Asignando…')
    expect(wrapper.get('button').element.disabled).toBe(true)
    expect(wrapper.get('article').attributes('aria-busy')).toBe('true')

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('assign')).toBeUndefined()
  })
})