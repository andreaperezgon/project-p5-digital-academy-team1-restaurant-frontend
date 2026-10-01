import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PendingDeliveryList from './PendingDeliveryList.vue'

const orders = [
  {
    id: 42,
    orderNumber: 'GS-42',
    address: 'Calle Mayor 10, Oviedo',
  },
  {
    id: 43,
    orderNumber: 'GS-43',
    address: 'Calle Luna 5, Gijón',
  },
]

describe('PendingDeliveryList', () => {
  it('distingue una función no disponible de una lista vacía', () => {
    const wrapper = mount(PendingDeliveryList)

    expect(wrapper.text()).toContain(
      'La consulta y asignación de pedidos estarán disponibles próximamente.'
    )
    expect(wrapper.text()).not.toContain(
      'No hay pedidos pendientes de asignar.'
    )
  })

  it('muestra el estado de carga', () => {
    const wrapper = mount(PendingDeliveryList, {
      props: {
        isAvailable: true,
        isLoading: true,
      },
    })

    expect(wrapper.text()).toContain('Cargando pedidos pendientes…')
    expect(wrapper.get('section').attributes('aria-busy')).toBe('true')
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('muestra el error y permite solicitar un reintento', async () => {
    const wrapper = mount(PendingDeliveryList, {
      props: {
        isAvailable: true,
        error: 'No se han podido cargar los pedidos.',
      },
    })

    expect(wrapper.get('[role="alert"]').text()).toBe(
      'No se han podido cargar los pedidos.'
    )

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('muestra un mensaje cuando la consulta no devuelve pedidos', () => {
    const wrapper = mount(PendingDeliveryList, {
      props: { isAvailable: true },
    })

    expect(wrapper.text()).toContain(
      'No hay pedidos pendientes de asignar.'
    )
  })

  it('muestra los pedidos y comunica cuál se quiere asignar', async () => {
    const wrapper = mount(PendingDeliveryList, {
      props: { isAvailable: true, orders },
    })

    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.text()).toContain('Calle Mayor 10, Oviedo')
    expect(wrapper.text()).toContain('Calle Luna 5, Gijón')

    await wrapper
      .get('button[aria-label="Asignarme pedido GS-43"]')
      .trigger('click')

    expect(wrapper.emitted('assign')).toEqual([[43]])
  })

  it('bloquea los botones mientras se procesa una asignación', async () => {
    const wrapper = mount(PendingDeliveryList, {
      props: {
        isAvailable: true,
        orders,
        assigningOrderId: 42,
      },
    })

    const buttons = wrapper.findAll('button')

    expect(buttons[0].text()).toBe('Asignando…')
    expect(buttons.every((button) => button.element.disabled)).toBe(true)
    expect(wrapper.text()).not.toContain(
      'La asignación estará disponible próximamente.'
    )

    await buttons[1].trigger('click')

    expect(wrapper.emitted('assign')).toBeUndefined()
  })
})