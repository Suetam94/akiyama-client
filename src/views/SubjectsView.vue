<template>
  <v-container fluid class="full-height">
    <div class="d-flex justify-space-between align-center mb-4 px-4">
      <div class="d-flex flex-row align-center">
        <v-icon size="36" class="mr-2">mdi-book-open-variant</v-icon>
        <h2>Matérias</h2>
      </div>
      <v-btn color="primary" @click="openDialog">
        <v-icon left>mdi-plus</v-icon> Nova Matéria
      </v-btn>
    </div>

    <BaseTable :headers="headers" :items="subjects" @edit="editSubject" @delete="confirmDelete" />

    <BaseFormDialog v-model="dialog" :title="editing ? 'Editar Matéria' : 'Nova Matéria'" @close="closeDialog" @save="saveSubject">
      <v-text-field v-model="subject.name" label="Nome da Matéria" outlined dense required :error-messages="nameError" />
    </BaseFormDialog>

    <BaseDeleteDialog v-model="deleteDialog" message="Tem certeza que deseja excluir esta matéria?" @cancel="deleteDialog = false" @confirm="deleteSubject" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseFormDialog from "@/components/BaseFormDialog.vue";
import BaseDeleteDialog from "@/components/BaseDeleteDialog.vue";

interface Subject {
  id: number;
  name: string;
}

export default defineComponent({
  name: "SubjectsView",
  components: {
    BaseTable,
    BaseFormDialog,
    BaseDeleteDialog,
  },
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
    const deleteDialog = ref(false);
    const editing = ref(false);
    const nameError = ref("");
    const subject = ref<Subject>({ id: 0, name: "" });
    const subjectToDelete = ref<number | null>(null);

    const openDialog = () => {
      subject.value = { id: 0, name: "" };
      editing.value = false;
      nameError.value = "";
      dialog.value = true;
    };

    const editSubject = (item: Subject) => {
      subject.value = { ...item };
      editing.value = true;
      dialog.value = true;
    };

    const validateInput = () => {
      nameError.value = subject.value.name.trim() ? "" : "O nome da matéria não pode estar vazio.";
      return !nameError.value;
    };

    const saveSubject = () => {
      if (!validateInput()) return;

      if (editing.value) {
        const index = subjects.value.findIndex((s) => s.id === subject.value.id);
        if (index !== -1) subjects.value[index] = { ...subject.value };
      } else {
        subject.value.id = subjects.value.length + 1;
        subjects.value.push({ ...subject.value });
      }
      closeDialog();
    };

    const confirmDelete = (id: number) => {
      subjectToDelete.value = id;
      deleteDialog.value = true;
    };

    const deleteSubject = () => {
      subjects.value = subjects.value.filter((s) => s.id !== subjectToDelete.value);
      deleteDialog.value = false;
    };

    const closeDialog = () => {
      dialog.value = false;
      nameError.value = "";
    };

    return {
      subjects,
      headers,
      dialog,
      deleteDialog,
      editing,
      nameError,
      subject,
      subjectToDelete,
      openDialog,
      editSubject,
      validateInput,
      saveSubject,
      confirmDelete,
      deleteSubject,
      closeDialog,
    };
  },
});
</script>
