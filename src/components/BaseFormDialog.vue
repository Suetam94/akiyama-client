<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="red" variant="text" @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="green" variant="text" @click="$emit('save')">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseFormDialog',
  props: {
    title: String,
    modelValue: Boolean,
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
  emits: ['update:modelValue', 'close', 'save'],
})
</script>
