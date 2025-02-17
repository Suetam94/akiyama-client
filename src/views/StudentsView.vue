<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center mb-4">
        <div class="d-flex flex-row align-center">
          <v-icon size="36" class="mr-2">mdi-account-multiple</v-icon>
          <h2>Alunos</h2>
        </div>
        <v-btn color="primary" @click="openDialog">
          <v-icon left>mdi-plus</v-icon> Novo Aluno
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="students"
          class="elevation-2"
          no-data-text="Nenhum aluno cadastrado"
          density="comfortable"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="blue" @click="editStudent(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="confirmDelete(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Modal de Formulário -->
    <BaseFormDialog
      v-model="dialog"
      :editing="editing"
      title="Aluno"
      @save="saveStudent"
      @close="closeDialog"
    >
      <v-text-field
        v-model="student.name"
        label="Nome"
        :error-messages="nameError"
        @input="validateInput"
        required
      ></v-text-field>
      <v-text-field v-model="student.document" label="Documento" required></v-text-field>
      <v-text-field v-model="student.age" label="Idade" type="number" required></v-text-field>
      <v-select
        v-model="student.gender"
        label="Gênero"
        :items="['Masculino', 'Feminino', 'Outro']"
        required
      ></v-select>
      <v-text-field v-model="student.turn" label="Turno" required></v-text-field>
      <v-text-field v-model="student.grade" label="Série" type="number" required></v-text-field>
    </BaseFormDialog>

    <!-- Modal de Confirmação -->
    <BaseDeleteDialog v-model="deleteDialog" @confirm="deleteStudent" />

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
import studentsService from "@/services/studentsService";
import type { Student } from "@/services/studentsService";
import BaseFormDialog from "@/components/BaseFormDialog.vue";
import BaseDeleteDialog from "@/components/BaseDeleteDialog.vue";

export default defineComponent({
  name: "StudentsView",
  components: {
    BaseFormDialog,
    BaseDeleteDialog,
  },
  setup() {
    const students = ref<Student[]>([]);
    const dialog = ref(false);
    const deleteDialog = ref(false);
    const editing = ref(false);
    const student = ref<Student>({
      id: 0,
      name: "",
      document: "",
      age: 0,
      gender: "",
      turn: "",
      grade: 0,
    });
    const selectedStudentId = ref<number | null>(null);
    const nameError = ref("");

    const errorSnackbar = ref(false);
    const errorMessage = ref("");

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

    const fetchStudents = async () => {
      try {
        students.value = await studentsService.getAll();
      } catch (error) {
        console.error("Erro ao buscar alunos", error);
        showError("Erro ao carregar alunos. Tente novamente.");
      }
    };

    const openDialog = () => {
      student.value = {
        id: 0,
        name: "",
        document: "",
        age: 0,
        gender: "",
        turn: "",
        grade: 0,
      };
      editing.value = false;
      nameError.value = "";
      dialog.value = true;
    };

    const editStudent = (selectedStudent: Student) => {
      student.value = { ...selectedStudent };
      editing.value = true;
      dialog.value = true;
    };

    const saveStudent = async () => {
      try {
        const { name, document, age, gender, turn, grade } = student.value;
        const studentData = { name, document, age, gender, turn, grade };

        if (editing.value) {
          await studentsService.update(student.value.id, studentData);
        } else {
          await studentsService.create(studentData);
        }
        dialog.value = false;
        await fetchStudents();
      } catch (error) {
        console.error("Erro ao salvar aluno", error);
        showError("Erro ao salvar aluno. Verifique os dados e tente novamente.");
      }
    };

    const confirmDelete = (id: number) => {
      selectedStudentId.value = id;
      deleteDialog.value = true;
    };

    const deleteStudent = async () => {
      if (selectedStudentId.value !== null) {
        try {
          await studentsService.delete(selectedStudentId.value);
          deleteDialog.value = false;
          await fetchStudents();
        } catch (error) {
          console.error("Erro ao excluir aluno", error);
          showError("Erro ao excluir aluno. Tente novamente.");
        }
      }
    };

    const validateInput = () => {
      nameError.value = student.value.name.trim() ? "" : "O nome do aluno não pode estar vazio.";
    };

    const closeDialog = () => {
      dialog.value = false;
    };

    // 🔹 Função para exibir erro no Snackbar
    const showError = (message: string) => {
      errorMessage.value = message;
      errorSnackbar.value = true;
    };

    onMounted(fetchStudents);

    return {
      students,
      headers,
      dialog,
      deleteDialog,
      student,
      editing,
      nameError,
      openDialog,
      editStudent,
      saveStudent,
      confirmDelete,
      deleteStudent,
      validateInput,
      closeDialog,
      errorSnackbar,
      errorMessage,
    };
  },
});
</script>
