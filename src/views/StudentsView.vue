<template>
  <v-container fluid class="full-height">
    <div class="d-flex justify-space-between align-center mb-4 px-4">
      <div class="d-flex flex-row align-center">
        <v-icon size="36" class="mr-2">mdi-account-multiple</v-icon>
        <h2>Alunos</h2>
      </div>
      <v-btn color="primary" @click="openDialog">
        <v-icon left>mdi-plus</v-icon> Novo Aluno
      </v-btn>
    </div>

    <BaseTable :headers="headers" :items="students" @edit="editStudent" @delete="confirmDelete" />

    <BaseFormDialog v-model="dialog" :title="editing ? 'Editar Aluno' : 'Novo Aluno'" @close="closeDialog" @save="saveStudent">
      <v-text-field v-model="student.name" label="Nome" outlined dense required :error-messages="nameError" />
      <v-text-field v-model="student.document" label="Documento" outlined dense required :error-messages="documentError" />
      <v-text-field v-model="student.age" label="Idade" type="number" outlined dense required :error-messages="ageError" />
      <v-select v-model="student.gender" label="Gênero" :items="['Masculino', 'Feminino', 'Outro']" outlined dense required :error-messages="genderError" />
      <v-select v-model="student.turn" label="Turno" :items="['Matutino', 'Vespertino', 'Noturno']" outlined dense required :error-messages="turnError" />
      <v-text-field v-model="student.grade" label="Série" type="number" outlined dense required :error-messages="gradeError" />
    </BaseFormDialog>

    <BaseDeleteDialog v-model="deleteDialog" message="Tem certeza que deseja excluir este aluno?" @cancel="deleteDialog = false" @confirm="deleteStudent" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseFormDialog from "@/components/BaseFormDialog.vue";
import BaseDeleteDialog from "@/components/BaseDeleteDialog.vue";

interface Student {
  id: number;
  name: string;
  document: string;
  age: number;
  gender: string;
  turn: string;
  grade: number;
}

export default defineComponent({
  name: "StudentsView",
  components: {
    BaseTable,
    BaseFormDialog,
    BaseDeleteDialog,
  },
  setup() {
    const students = ref<Student[]>([
      { id: 1, name: "João Silva", document: "123.456.789-00", age: 16, gender: "Masculino", turn: "Matutino", grade: 10 },
      { id: 2, name: "Maria Oliveira", document: "987.654.321-00", age: 15, gender: "Feminino", turn: "Vespertino", grade: 9 },
    ]);

    const headers = ref([
      { title: "ID", key: "id" },
      { title: "Nome", key: "name" },
      { title: "Documento", key: "document" },
      { title: "Idade", key: "age" },
      { title: "Gênero", key: "gender" },
      { title: "Turno", key: "turn" },
      { title: "Série", key: "grade" },
      { title: "Ações", key: "actions", sortable: false },
    ]);

    const dialog = ref(false);
    const deleteDialog = ref(false);
    const editing = ref(false);
    const student = ref<Student>({ id: 0, name: "", document: "", age: 0, gender: "", turn: "", grade: 0 });
    const studentToDelete = ref<number | null>(null);

    const nameError = ref("");
    const documentError = ref("");
    const ageError = ref("");
    const genderError = ref("");
    const turnError = ref("");
    const gradeError = ref("");

    const openDialog = () => {
      student.value = { id: 0, name: "", document: "", age: 0, gender: "", turn: "", grade: 0 };
      editing.value = false;
      clearErrors();
      dialog.value = true;
    };

    const editStudent = (item: Student) => {
      student.value = { ...item };
      editing.value = true;
      clearErrors();
      dialog.value = true;
    };

    const validateInput = () => {
      nameError.value = student.value.name.trim() ? "" : "O nome do aluno não pode estar vazio.";
      documentError.value = student.value.document.trim() ? "" : "O documento não pode estar vazio.";
      ageError.value = student.value.age > 0 ? "" : "A idade deve ser maior que 0.";
      genderError.value = student.value.gender ? "" : "Selecione o gênero.";
      turnError.value = student.value.turn ? "" : "Selecione o turno.";
      gradeError.value = student.value.grade > 0 ? "" : "A série deve ser maior que 0.";

      return !nameError.value && !documentError.value && !ageError.value && !genderError.value && !turnError.value && !gradeError.value;
    };

    const saveStudent = () => {
      if (!validateInput()) return;

      if (editing.value) {
        const index = students.value.findIndex((s) => s.id === student.value.id);
        if (index !== -1) students.value[index] = { ...student.value };
      } else {
        student.value.id = students.value.length + 1;
        students.value.push({ ...student.value });
      }
      closeDialog();
    };

    const confirmDelete = (id: number) => {
      studentToDelete.value = id;
      deleteDialog.value = true;
    };

    const deleteStudent = () => {
      students.value = students.value.filter((s) => s.id !== studentToDelete.value);
      deleteDialog.value = false;
    };

    const closeDialog = () => {
      dialog.value = false;
      clearErrors();
    };

    const clearErrors = () => {
      nameError.value = "";
      documentError.value = "";
      ageError.value = "";
      genderError.value = "";
      turnError.value = "";
      gradeError.value = "";
    };

    return {
      students,
      headers,
      dialog,
      deleteDialog,
      editing,
      student,
      studentToDelete,
      nameError,
      documentError,
      ageError,
      genderError,
      turnError,
      gradeError,
      openDialog,
      editStudent,
      validateInput,
      saveStudent,
      confirmDelete,
      deleteStudent,
      closeDialog,
    };
  },
});
</script>
