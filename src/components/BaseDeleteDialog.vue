<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title class="text-h5">Confirmação</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="gray" variant="text" @click="$emit('cancel')">Cancelar</v-btn>
        <v-btn color="red" variant="text" @click="$emit('confirm')">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseDeleteDialog',
  props: {
    modelValue: Boolean,
    message: String,
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  emits: ['update:modelValue', 'cancel', 'confirm'],
})
</script>
