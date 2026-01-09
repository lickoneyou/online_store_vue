<script setup lang="ts">
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  label: string
  route: string
}>()

const router = useRouter()
</script>

<template>
  <Button
    @click="router.push(props.route)"
    icon="pi pi-shopping-cart"
    :label="props.label"
    class="p-button p-component p-button-secondary"
  />
</template>
