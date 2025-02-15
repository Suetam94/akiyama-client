<template>
  <v-container fluid class="full-height">
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
      density="comfortable"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex gap-buttons">
          <v-btn icon color="blue" @click="editSubject(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="deleteSubject(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <!-- Modal de Cadastro/Edição -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ editing ? "Editar Matéria" : "Nova Matéria" }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="subject.name" label="Nome da Matéria" outlined dense />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="red" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="green" variant="text" @click="saveSubject">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

    const dialog = ref(false);
    const editing = ref(false);
    const subject = ref<Subject>({ id: 0, name: "" });

    const openDialog = () => {
      subject.value = { id: 0, name: "" };
      editing.value = false;
      dialog.value = true;
    };

    const editSubject = (item: Subject) => {
      subject.value = { ...item };
      editing.value = true;
      dialog.value = true;
    };

    const saveSubject = () => {
      if (editing.value) {
        const index = subjects.value.findIndex((s) => s.id === subject.value.id);
        if (index !== -1) subjects.value[index] = { ...subject.value };
      } else {
        subject.value.id = subjects.value.length + 1;
        subjects.value.push({ ...subject.value });
      }
      closeDialog();
    };

    const deleteSubject = (id: number) => {
      subjects.value = subjects.value.filter((s) => s.id !== id);
    };

    const closeDialog = () => {
      dialog.value = false;
    };

    return {
      subjects,
      headers,
      dialog,
      editing,
      subject,
      openDialog,
      editSubject,
      saveSubject,
      deleteSubject,
      closeDialog,
    };
  },
});
</script>

<style scoped>
.gap-buttons {
  gap: 16px;
}

.full-width {
  width: 100%;
}

.full-height {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
