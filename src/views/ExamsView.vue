<template>
  <v-container fluid class="full-height">
    <div class="d-flex justify-space-between align-center mb-4 px-4">
      <h2>Provas</h2>
      <v-btn color="primary" @click="openDialog">
        <v-icon left>mdi-plus</v-icon> Nova Prova
      </v-btn>
    </div>

    <BaseTable :headers="headers" :items="exams" @edit="editExam" @delete="confirmDelete" />

    <BaseFormDialog v-model="dialog" :title="editing ? 'Editar Prova' : 'Nova Prova'" @close="closeDialog" @save="saveExam">
      <v-select v-model="exam.studentId" label="Aluno" :items="students" item-title="name" item-value="id" outlined dense required :error-messages="studentError" />
      <v-select v-model="exam.subjectId" label="Matéria" :items="subjects" item-title="name" item-value="id" outlined dense required :error-messages="subjectError" />
      <v-text-field v-model="exam.score" label="Nota" type="number" outlined dense required :error-messages="scoreError" />
    </BaseFormDialog>

    <BaseDeleteDialog v-model="deleteDialog" message="Tem certeza que deseja excluir esta prova?" @cancel="deleteDialog = false" @confirm="deleteExam" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    const students = ref<Student[]>([
      { id: 1, name: "João Silva" },
      { id: 2, name: "Maria Oliveira" },
    ]);

    const subjects = ref<Subject[]>([
      { id: 1, name: "Matemática" },
      { id: 2, name: "Português" },
    ]);

    const exams = ref<Exam[]>([
      { id: 1, score: 8.5, studentId: 1, subjectId: 1 },
      { id: 2, score: 9.0, studentId: 2, subjectId: 2 },
    ]);

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

    const saveExam = () => {
      if (!validateInput()) return;

      if (editing.value) {
        const index = exams.value.findIndex((e) => e.id === exam.value.id);
        if (index !== -1) exams.value[index] = { ...exam.value };
      } else {
        exam.value.id = exams.value.length + 1;
        exams.value.push({ ...exam.value });
      }
      closeDialog();
    };

    const confirmDelete = (id: number) => {
      examToDelete.value = id;
      deleteDialog.value = true;
    };

    const deleteExam = () => {
      exams.value = exams.value.filter((e) => e.id !== examToDelete.value);
      deleteDialog.value = false;
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
