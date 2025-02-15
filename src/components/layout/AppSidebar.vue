<template>
  <v-navigation-drawer v-model="isOpen" app>
    <v-list>
      <v-list-item to="/materias">
        <v-icon class="mr-2">mdi-book</v-icon>
        <v-list-item-title>Matérias</v-list-item-title>
      </v-list-item>

      <v-list-item to="/alunos">
        <v-icon class="mr-2">mdi-account</v-icon>
        <v-list-item-title>Alunos</v-list-item-title>
      </v-list-item>

      <v-list-item to="/provas">
        <v-icon class="mr-2">mdi-file-document</v-icon>
        <v-list-item-title>Provas</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "AppSidebar",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (value: boolean) => emit("update:modelValue", value),
    });

    return { isOpen };
  },
});
</script>
