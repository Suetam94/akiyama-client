<template>
  <v-container fluid class="full-height">
    <div class="d-flex justify-space-between align-center mb-4 px-4">
      <div class="d-flex flex-row align-center">
        <v-icon size="36" class="mr-2">mdi-file-document-edit</v-icon>
        <h2>Provas</h2>
      </div>
      <v-btn color="primary" variant="text" @click="openDialog">
        <v-icon left>mdi-plus</v-icon> Nova Prova
      </v-btn>
    </div>

    <!-- Tabela -->
    <BaseTable :headers="headers" :items="exams" @edit="editExam" @delete="confirmDelete" />

    <!-- Modal de Formulário -->
    <BaseFormDialog
      v-model="dialog"
      :title="editing ? 'Editar Prova' : 'Nova Prova'"
      @close="closeDialog"
      @save="saveExam"
    >
      <v-select
        v-model="exam.studentId"
        label="Aluno"
        :items="students"
        item-title="name"
        item-value="id"
        outlined
        dense
        required
        :error-messages="studentError"
      />
      <v-select
        v-model="exam.subjectId"
        label="Matéria"
        :items="subjects"
        item-title="name"
        item-value="id"
        outlined
        dense
        required
        :error-messages="subjectError"
      />
      <v-text-field
        v-model="exam.score"
        label="Nota"
        type="number"
        outlined
        dense
        required
        :error-messages="scoreError"
      />
    </BaseFormDialog>

    <!-- Modal de Confirmação -->
    <BaseDeleteDialog
      v-model="deleteDialog"
      message="Tem certeza que deseja excluir esta prova?"
      @cancel="deleteDialog = false"
      @confirm="deleteExam"
    />

    <!-- 🔹 Snackbar de Erro -->
    <v-snackbar v-model="errorSnackbar" color="red" :timeout="4000">
      {{ errorMessage }}
      <template v-slot:actions>
        <v-btn variant="text" color="white" @click="errorSnackbar = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import examsService from "@/services/examsService";
import studentsService from "@/services/studentsService";
import subjectsService from "@/services/subjectsService";
import BaseTable from "@/components/BaseTable.vue";
import BaseFormDialog from "@/components/BaseFormDialog.vue";
import BaseDeleteDialog from "@/components/BaseDeleteDialog.vue";

interface Exam {
  id: number;
  score: number;
  studentId: number;
  subjectId: number;
}

interface Student {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

export default defineComponent({
  name: "ExamsView",
  components: {
    BaseTable,
    BaseFormDialog,
    BaseDeleteDialog,
  },
  setup() {
    const students = ref<Student[]>([]);
    const subjects = ref<Subject[]>([]);
    const exams = ref<Exam[]>([]);
    const headers = ref([
      { title: "ID", key: "id" },
      { title: "Nota", key: "score" },
      { title: "Aluno", key: "studentId" },
      { title: "Matéria", key: "subjectId" },
      { title: "Ações", key: "actions", sortable: false },
    ]);

    const dialog = ref(false);
    const deleteDialog = ref(false);
    const editing = ref(false);
    const studentError = ref("");
    const subjectError = ref("");
    const scoreError = ref("");
    const exam = ref<Exam>({ id: 0, score: 0, studentId: 0, subjectId: 0 });
    const examToDelete = ref<number | null>(null);
    const errorSnackbar = ref(false);
    const errorMessage = ref("");

    const fetchData = async () => {
      try {
        [students.value, subjects.value, exams.value] = await Promise.all([
          studentsService.getAll(),
          subjectsService.getAll(),
          examsService.getAll(),
        ]);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
        showError("Erro ao carregar dados. Tente novamente.");
      }
    };

    const openDialog = () => {
      exam.value = { id: 0, score: 0, studentId: 0, subjectId: 0 };
      editing.value = false;
      clearErrors();
      dialog.value = true;
    };

    const editExam = (item: Exam) => {
      exam.value = { ...item };
      editing.value = true;
      clearErrors();
      dialog.value = true;
    };

    const validateInput = () => {
      studentError.value = exam.value.studentId ? "" : "Selecione um aluno.";
      subjectError.value = exam.value.subjectId ? "" : "Selecione uma matéria.";
      scoreError.value = exam.value.score >= 0 ? "" : "A nota deve ser maior ou igual a 0.";

      return !studentError.value && !subjectError.value && !scoreError.value;
    };

    const saveExam = async () => {
      if (!validateInput()) return;
      const { score, studentId, subjectId } = exam.value
      const examData = { score, studentId, subjectId }

      try {
        if (editing.value) {
          await examsService.update(exam.value.id, examData);
        } else {
          await examsService.create(examData);
        }
        dialog.value = false;
        await fetchData();
      } catch (error) {
        console.error("Erro ao salvar prova", error);
        showError("Erro ao salvar prova. Verifique os dados e tente novamente.");
      }
    };

    const confirmDelete = (id: number) => {
      examToDelete.value = id;
      deleteDialog.value = true;
    };

    const deleteExam = async () => {
      if (examToDelete.value !== null) {
        try {
          await examsService.delete(examToDelete.value);
          deleteDialog.value = false;
          await fetchData();
        } catch (error) {
          console.error("Erro ao excluir prova", error);
          showError("Erro ao excluir prova. Tente novamente.");
        }
      }
    };

    const closeDialog = () => {
      dialog.value = false;
      clearErrors();
    };

    const clearErrors = () => {
      studentError.value = "";
      subjectError.value = "";
      scoreError.value = "";
    };

    const showError = (message: string) => {
      errorMessage.value = message;
      errorSnackbar.value = true;
    };

    onMounted(fetchData);

    return {
      students,
      subjects,
      exams,
      headers,
      dialog,
      deleteDialog,
      editing,
      studentError,
      subjectError,
      scoreError,
      exam,
      examToDelete,
      errorSnackbar,
      errorMessage,
      openDialog,
      editExam,
      validateInput,
      saveExam,
      confirmDelete,
      deleteExam,
      closeDialog,
    };
  },
});
</script>
