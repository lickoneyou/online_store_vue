<script setup lang="ts">
import { computed} from 'vue';
import { Form } from '@primevue/forms';
import { Button, InputText, Message } from 'primevue';

import type {FormSubmitEvent} from '@primevue/forms';

const props = defineProps<{
  isShow: boolean;
}>();

const emit = defineEmits<{
  'close': [];
}>();

const show = computed(() => {
  return props.isShow
})

const initialValues = {
  email: '',
  password: ''
}

async function onFormSubmit(event: FormSubmitEvent<Record<string, unknown>>, ) {
  const values = event.values
  await fetch('http://localhost:3000/users/create', {
    method: 'Post',
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    }
  });
}
</script>

<template>
  <Transition>
    <Teleport to="body">
      <div 
        v-if="show" 
        class="modal_overlay" 
        @click="emit('close')"
        >
        <Form
          v-slot="$form"
          :initialValues
          @submit="onFormSubmit"
          class="registred_form"
          @click.stop=""
        >
          <p class="form_title">Registred form</p>
          <div class="flex flex-col gap-1">
            <InputText name="email" type="email" placeholder="Email" fluid />
            <Message
              v-if="$form.email?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >Wrong email</Message
            >
          </div>
          <div class="flex flex-col gap-1">
            <InputText name="password" type="password" placeholder="Password" fluid />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >Wrong password</Message
            >
          </div>
          <Button type="submit" severity="secondary" label="Submit" />
        </Form>
      </div>
    </Teleport>
  </Transition>
</template>

<style lang="scss" scoped>
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(000, 000, 000, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;

  .registred_form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 300px;
    padding: 10px 20px;
    background-color: #ffffff;
    max-height: 300px;
    height: 100%;
    border-radius: 8px;

    .form_title {
      color: #000000;
      font-weight: 700;
    }
  }
}
</style>
