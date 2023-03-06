<template>
  <v-form @submit.prevent="submit" v-model="valid" ref="form">
    <v-container>
      <v-row>
        <slot />
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
  import { defineEmits, ref } from 'vue';

  type VForm = {
    reset: () => boolean;
    resetValidation: () => boolean;
    validate: () => boolean;
  };

  const valid = ref(false);
  const form = ref<VForm | null>(null);
  const emit = defineEmits({
    send: null
  });

  function reset(): void {
    if (form.value) form.value.reset();
  }

  function resetValidation(): void {
    if (form.value) form.value.resetValidation();
  }

  function validate(): void {
    if (form.value) form.value.validate();
  }

  function submit(): void {
    validate();
    if (valid.value) emit('send');
  }
</script>
