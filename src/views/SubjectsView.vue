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

    <!-- Tabela -->
    <BaseTable :headers="headers" :items="subjects" @edit="editSubject" @delete="confirmDelete" />

    <!-- Modal de Formulário -->
    <BaseFormDialog v-model="dialog" :title="editing ? 'Editar Matéria' : 'Nova Matéria'" @close="closeDialog" @save="saveSubject">
      <v-text-field
        v-model="subject.name"
        label="Nome da Matéria"
        outlined
        dense
        required
        :error-messages="nameError"
      />
    </BaseFormDialog>

    <!-- Modal de Confirmação -->
    <BaseDeleteDialog v-model="deleteDialog" message="Tem certeza que deseja excluir esta matéria?" @cancel="deleteDialog = false" @confirm="deleteSubject" />

    <!-- 🔹 Snackbar de Erro -->
    <v-snackbar v-model="errorSnackbar" color="red" :timeout="4000">
      {{ errorMessage }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="errorSnackbar = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import subjectsService from "@/services/subjectsService";
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
    const subjects = ref<Subject[]>([]);
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

    const errorSnackbar = ref(false);
    const errorMessage = ref("");

    const fetchSubjects = async () => {
      try {
        subjects.value = await subjectsService.getAll();
      } catch (error) {
        console.error("Erro ao buscar matérias", error);
        showError("Erro ao carregar matérias. Tente novamente.");
      }
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
      dialog.value = true;
    };

    const validateInput = () => {
      nameError.value = subject.value.name.trim() ? "" : "O nome da matéria não pode estar vazio.";
      return !nameError.value;
    };

    const saveSubject = async () => {
      if (!validateInput()) return;

      const { name } = subject.value
      const subjectData = { name }

      try {
        if (editing.value) {
          await subjectsService.update(subject.value.id, subjectData);
        } else {
          await subjectsService.create(subjectData);
        }
        dialog.value = false;
        await fetchSubjects();
      } catch (error) {
        console.error("Erro ao salvar matéria", error);
        showError("Erro ao salvar matéria. Verifique os dados e tente novamente.");
      }
    };

    const confirmDelete = (id: number) => {
      subjectToDelete.value = id;
      deleteDialog.value = true;
    };

    const deleteSubject = async () => {
      if (subjectToDelete.value !== null) {
        try {
          await subjectsService.delete(subjectToDelete.value);
          deleteDialog.value = false;
          await fetchSubjects();
        } catch (error) {
          console.error("Erro ao excluir matéria", error);
          showError("Erro ao excluir matéria. Tente novamente.");
        }
      }
    };

    const closeDialog = () => {
      dialog.value = false;
      nameError.value = "";
    };

    // 🔹 Função para exibir erro no Snackbar
    const showError = (message: string) => {
      errorMessage.value = message;
      errorSnackbar.value = true;
    };

    onMounted(fetchSubjects);

    return {
      subjects,
      headers,
      dialog,
      deleteDialog,
      editing,
      nameError,
      subject,
      subjectToDelete,
      errorSnackbar,
      errorMessage,
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
