<script setup lang="ts">
import { useCardStore } from '@/stores/card'
import { Button } from 'primevue'
import { computed } from 'vue'

const props = defineProps<{
  id: number
}>()

const store = useCardStore()

const inCard = computed(() => store.products.includes(props.id))

const toggleCardHandler = function () {
  if (inCard.value) {
    store.removeProduct(props.id)
  } else {
    store.addProduct(props.id)
  }
}
</script>

<template>
  <Button
    @click="toggleCardHandler"
    class="like_button"
    :icon="`pi ${inCard ? 'pi-heart-fill' : 'pi-heart'}`"
    variant="outlined"
  />
</template>
