<script setup>
defineProps({
  orderId: {
    type: [Number, String],
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  canAssign: {
    type: Boolean,
    default: false,
  },
  isAssigning: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['assign'])
</script>

<template>
  <article class="pending-delivery-card" :aria-busy="isAssigning">
    <div class="pending-delivery-card__details">
      <h3 class="pending-delivery-card__title">
        Pedido {{ orderNumber }}
      </h3>

      <p class="pending-delivery-card__address">
        {{ address || 'Dirección no disponible.' }}
      </p>
    </div>

    <button
      type="button"
      class="pending-delivery-card__button"
      :disabled="!canAssign || isAssigning"
      :aria-label="`Asignarme pedido ${orderNumber}`"
      @click="emit('assign', orderId)"
    >
      {{ isAssigning ? 'Asignando…' : 'Asignarme pedido' }}
    </button>

    <p
      v-if="!canAssign && !isAssigning"
      class="pending-delivery-card__notice"
    >
      La asignación estará disponible próximamente.
    </p>
  </article>
</template>

<style scoped>
@reference "../style.css";

.pending-delivery-card {
  @apply flex flex-col gap-4 rounded-xl border border-outline
    bg-surface-container p-5;
}

.pending-delivery-card__details {
  @apply flex flex-col gap-2;
}

.pending-delivery-card__title {
  @apply text-lg font-semibold;
}

.pending-delivery-card__address {
  @apply whitespace-pre-line break-words text-sm text-on-surface;
}

.pending-delivery-card__button {
  @apply self-start cursor-pointer rounded-lg bg-primary
    px-5 py-3 font-semibold text-white
    disabled:cursor-not-allowed disabled:opacity-50;
}

.pending-delivery-card__notice {
  @apply text-sm text-on-surface;
}
</style>