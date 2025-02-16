<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-2 full-width"
    no-data-text="Nenhum dado cadastrado"
    density="comfortable"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex gap-buttons">
        <v-btn icon color="blue" @click="$emit('edit', item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="$emit('delete', item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from 'vue'

export default defineComponent({
  name: "BaseTable",
  props: {
    headers: {
      type: Array as PropType<{ title: string; key: string }[]>,
      required: true,
    },
    items: {
      type: Array as PropType<Array<Record<string, unknown>>>,
      required: true,
    },
  },
  emits: ["edit", "delete"],
});
</script>

<style scoped>
.gap-buttons {
  gap: 16px;
}
</style>
