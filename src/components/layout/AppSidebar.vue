<template>
  <v-navigation-drawer v-model="isOpen" app>
    <v-list>
      <v-list-item to="/">
        <template v-slot:prepend>
          <v-icon class="mr-3">mdi-home-circle-outline</v-icon>
        </template>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item to="/materias" class="w-100 d-flex align-center">
        <template v-slot:prepend>
          <v-icon class="mr-3">mdi-book</v-icon>
        </template>
        <v-list-item-title>Matérias</v-list-item-title>
      </v-list-item>

      <v-list-item to="/alunos" class="w-100 d-flex align-center">
        <template v-slot:prepend>
          <v-icon class="mr-3">mdi-account</v-icon>
        </template>
        <v-list-item-title>Alunos</v-list-item-title>
      </v-list-item>

      <v-list-item to="/provas" class="w-100 d-flex align-center">
        <template v-slot:prepend>
          <v-icon class="mr-3">mdi-file-document</v-icon>
        </template>
        <v-list-item-title>Provas</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AppSidebar',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (value: boolean) => emit('update:modelValue', value),
    })

    return { isOpen }
  },
})
</script>
