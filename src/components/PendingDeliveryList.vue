<script setup>
import PendingDeliveryCard from './PendingDeliveryCard.vue'

defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  assigningOrderId: {
    type: [Number, String],
    default: null,
  },
})

const emit = defineEmits(['assign', 'retry'])
</script>

<template>
  <section
    class="pending-delivery-list"
    aria-labelledby="pending-delivery-title"
    :aria-busy="isLoading"
  >
    <h2
      id="pending-delivery-title"
      class="pending-delivery-list__title"
    >
      Pendientes de asignar
    </h2>

    <p v-if="!isAvailable" role="status">
      La consulta y asignación de pedidos estarán disponibles próximamente.
    </p>

    <p v-else-if="isLoading" role="status">
      Cargando pedidos pendientes…
    </p>

    <div v-else-if="error" class="pending-delivery-list__error">
      <p role="alert">{{ error }}</p>

      <button
        type="button"
        class="pending-delivery-list__retry"
        @click="emit('retry')"
      >
        Reintentar
      </button>
    </div>

    <p v-else-if="orders.length === 0" role="status">
      No hay pedidos pendientes de asignar.
    </p>

    <ul v-else class="pending-delivery-list__items">
      <li v-for="order in orders" :key="order.id">
        <PendingDeliveryCard
          :order-id="order.id"
          :order-number="order.orderNumber"
          :address="order.address"
:can-assign="isAvailable"
:disabled="assigningOrderId !== null"          :is-assigning="assigningOrderId === order.id"
          @assign="emit('assign', $event)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
@reference "../style.css";

.pending-delivery-list {
  @apply flex flex-col gap-4;
}

.pending-delivery-list__title {
  @apply text-xl font-heading;
}

.pending-delivery-list__items {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2;
}

.pending-delivery-list__error {
  @apply flex flex-col items-start gap-3 text-error;
}

.pending-delivery-list__retry {
  @apply cursor-pointer rounded-lg bg-primary px-5 py-3
    font-semibold text-white;
}
</style>