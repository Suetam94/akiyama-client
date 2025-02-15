<template>
  <v-container fluid class="full-height px-16">
    <!-- Cabeçalho -->
    <div class="d-flex justify-space-between align-center mb-4 px-4">
      <h2>Matérias</h2>
      <v-btn color="primary" @click="openDialog">
        <v-icon left>mdi-plus</v-icon> Nova Matéria
      </v-btn>
    </div>

    <!-- Tabela -->
    <v-data-table
      :headers="headers"
      :items="subjects"
      class="elevation-2 full-width"
      no-data-text="Nenhuma matéria cadastrada"
      density="default"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon color="blue" @click="editSubject(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="mx-2" icon color="red" @click="deleteSubject(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Subject {
  id: number;
  name: string;
}

export default defineComponent({
  name: "SubjectsView",
  setup() {
    const subjects = ref<Subject[]>([
      { id: 1, name: "Matemática" },
      { id: 2, name: "Português" },
      { id: 3, name: "História" },
    ]);

    const headers = ref([
      { title: "ID", key: "id" },
      { title: "Nome", key: "name" },
      { title: "Ações", key: "actions", sortable: false },
    ]);

    const openDialog = () => {
      console.log("Abrir formulário para adicionar nova matéria");
    };

    const editSubject = (subject: Subject) => {
      console.log("Editar:", subject);
    };

    const deleteSubject = (id: number) => {
      console.log("Deletar matéria com ID:", id);
    };

    return {
      subjects,
      headers,
      openDialog,
      editSubject,
      deleteSubject,
    };
  },
});
</script>

<style scoped>
.full-width {
  width: 100%;
}

.full-height {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
