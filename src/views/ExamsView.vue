<template>
  <v-container fluid class="full-height">
    <!-- Cabeçalho -->
    <div class="d-flex justify-space-between align-center mb-4 px-4">
      <h2>Provas</h2>
      <v-btn color="primary" @click="openDialog">
        <v-icon left>mdi-plus</v-icon> Nova Prova
      </v-btn>
    </div>

    <!-- Tabela -->
    <v-data-table
      :headers="headers"
      :items="exams"
      class="elevation-2 full-width"
      no-data-text="Nenhuma prova cadastrada"
      density="comfortable"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex gap-buttons">
          <v-btn icon color="blue" @click="editExam(item)">
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
          {{ editing ? "Editar Prova" : "Nova Prova" }}
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="red" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="green" variant="text" @click="saveExam">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Confirmação de Exclusão -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirmação</v-card-title>
        <v-card-text>Tem certeza que deseja excluir esta prova?</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="gray" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="red" variant="text" @click="deleteExam">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

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
      dialog.value = true;
    };

    const closeDialog = () => {
      dialog.value = false;
      studentError.value = "";
      subjectError.value = "";
      scoreError.value = "";
    };


    const editExam = (item: Exam) => {
      exam.value = { ...item };
      editing.value = true;
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
      dialog.value = false;
    };

    const confirmDelete = (id: number) => {
      examToDelete.value = id;
      deleteDialog.value = true;
    };

    const deleteExam = () => {
      exams.value = exams.value.filter((e) => e.id !== examToDelete.value);
      deleteDialog.value = false;
    };

    return {
      exams,
      students,
      subjects,
      headers,
      dialog,
      editing,
      deleteDialog,
      exam,
      examToDelete,
      studentError,
      subjectError,
      scoreError,
      closeDialog,
      openDialog,
      editExam,
      saveExam,
      confirmDelete,
      deleteExam,
    };
  },
});

</script>

