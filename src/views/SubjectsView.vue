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
          <v-btn icon color="red" @click="confirmDelete(item.id)">
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
          <v-text-field
            v-model="subject.name"
            label="Nome da Matéria"
            outlined
            dense
            :error-messages="nameError"
            @input="validateInput"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="red" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="green" variant="text" @click="saveSubject">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Confirmação de Exclusão -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirmação</v-card-title>
        <v-card-text>Tem certeza que deseja excluir esta matéria?</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="gray" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="red" variant="text" @click="deleteSubject">Excluir</v-btn>
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
    const nameError = ref("");
    const subject = ref<Subject>({ id: 0, name: "" });
    const deleteDialog = ref(false);
    const subjectToDelete = ref<number | null>(null);

    const confirmDelete = (id: number) => {
      subjectToDelete.value = id;
      deleteDialog.value = true;
    };

    const deleteSubject = () => {
      if (subjectToDelete.value !== null) {
        subjects.value = subjects.value.filter((s) => s.id !== subjectToDelete.value);
      }
      deleteDialog.value = false;
      subjectToDelete.value = null;
    };

    const openDialog = () => {
      subject.value = { id: 0, name: "" };
      editing.value = false;
      nameError.value = "";
      dialog.value = true;
    };

    const editSubject = (item: Subject) => {
      subject.value = { ...item };
      editing.value = true;
      nameError.value = "";
      dialog.value = true;
    };

    const validateInput = () => {
      if (!subject.value.name.trim()) {
        nameError.value = "O nome da matéria não pode estar vazio.";
      } else {
        nameError.value = "";
      }
    };

    const saveSubject = () => {
      validateInput();
      if (nameError.value) return;

      if (editing.value) {
        const index = subjects.value.findIndex((s) => s.id === subject.value.id);
        if (index !== -1) subjects.value[index] = { ...subject.value };
      } else {
        subject.value.id = subjects.value.length + 1;
        subjects.value.push({ ...subject.value });
      }
      closeDialog();
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
      nameError,
      deleteDialog,
      subjectToDelete,
      confirmDelete,
      validateInput,
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
