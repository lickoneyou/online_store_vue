<script setup lang="ts">
import { Button } from 'primevue'

const props = defineProps<{
  isShow: boolean
}>()

const emits = defineEmits(['clear-modal'])

const clearModalHandler = function (isClear: boolean) {
  emits('clear-modal', isClear)
}
</script>

<template>
  <Transition>
    <Teleport to="body">
      <div v-if="props.isShow" class="modal_overlay">
        <div class="modal">
          <p class="title">Clear card?</p>
          <div class="action_buttons">
            <Button @click="clearModalHandler(true)" class="btn" label="Yes" severity="danger" />
            <Button @click="clearModalHandler(false)" class="btn" label="No" />
          </div>
        </div>
      </div>
    </Teleport>
  </Transition>
</template>

<style lang="scss" scoped>
.modal_overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);

  .modal {
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    border-radius: 16px;
    max-width: 300px;
    width: 100%;

    .title {
      color: #000000;
      font-weight: 700;
    }

    .action_buttons {
      display: flex;
      gap: 15px;
      width: 100%;

      .btn {
        width: 100%;
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
