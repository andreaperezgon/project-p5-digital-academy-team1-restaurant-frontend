<script setup>
defineProps({
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  deliveryInstructions: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="mt-6 border-t border-gray-200 pt-6">
    <h3 class="mb-4 text-lg font-semibold">
      Destino de entrega
    </h3>

    <div class="space-y-3 text-sm">
      <div>
        <p class="text-gray-500">Dirección</p>
        <p class="font-medium">{{ address }}</p>
      </div>

      <div>
        <p class="text-gray-500">Código postal</p>
        <p class="font-medium">{{ postalCode }}</p>
      </div>

      <div>
        <p class="text-gray-500">Indicaciones</p>
        <p class="font-medium">{{ deliveryInstructions }}</p>
      </div>
    </div>
  </section>
</template>