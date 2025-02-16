<template>
  <v-container fluid class="full-height">
    <!-- Cabeçalho -->
    <div class="d-flex justify-space-between align-center mb-4 px-4">
      <h2>Alunos</h2>
      <v-btn color="primary" @click="openDialog"> <v-icon left>mdi-plus</v-icon> Novo Aluno </v-btn>
    </div>

    <!-- Tabela -->
    <v-data-table
      :headers="headers"
      :items="students"
      class="elevation-2 full-width"
      no-data-text="Nenhum aluno cadastrado"
      density="comfortable"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex gap-buttons">
          <v-btn icon color="blue" @click="editStudent(item)">
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
          {{ editing ? 'Editar Aluno' : 'Novo Aluno' }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="student.name"
            label="Nome"
            outlined
            dense
            required
            :error-messages="nameError"
          />

          <v-text-field
            v-model="student.document"
            label="Documento"
            outlined
            dense
            required
            :error-messages="documentError"
          />

          <v-text-field
            v-model="student.age"
            label="Idade"
            type="number"
            outlined
            dense
            required
            :error-messages="ageError"
          />

          <v-select
            v-model="student.gender"
            label="Gênero"
            :items="['Masculino', 'Feminino', 'Outro']"
            outlined
            dense
            required
            :error-messages="genderError"
          />

          <v-select
            v-model="student.turn"
            label="Turno"
            :items="['Matutino', 'Vespertino', 'Noturno']"
            outlined
            dense
            required
            :error-messages="turnError"
          />

          <v-text-field
            v-model="student.grade"
            label="Série"
            type="number"
            outlined
            dense
            required
            :error-messages="gradeError"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="red" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="green" variant="text" @click="saveStudent">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Confirmação de Exclusão -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirmação</v-card-title>
        <v-card-text>Tem certeza que deseja excluir este aluno?</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="gray" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="red" variant="text" @click="deleteStudent">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Student {
  id: number
  name: string
  document: string
  age: number
  gender: string
  turn: string
  grade: number
}

export default defineComponent({
  name: 'StudentsView',
  setup() {
    const students = ref<Student[]>([
      {
        id: 1,
        name: 'João Silva',
        document: '123.456.789-00',
        age: 16,
        gender: 'Masculino',
        turn: 'Matutino',
        grade: 10,
      },
      {
        id: 2,
        name: 'Maria Oliveira',
        document: '987.654.321-00',
        age: 15,
        gender: 'Feminino',
        turn: 'Vespertino',
        grade: 9,
      },
    ])

    const student = ref<Student>({
      id: 0,
      name: '',
      document: '',
      age: 0,
      gender: '',
      turn: '',
      grade: 0,
    })

    const headers = ref([
      { title: 'ID', key: 'id' },
      { title: 'Nome', key: 'name' },
      { title: 'Documento', key: 'document' },
      { title: 'Idade', key: 'age' },
      { title: 'Gênero', key: 'gender' },
      { title: 'Turno', key: 'turn' },
      { title: 'Série', key: 'grade' },
      { title: 'Ações', key: 'actions', sortable: false },
    ])

    const dialog = ref(false)
    const deleteDialog = ref(false)
    const editing = ref(false)
    const studentToDelete = ref<number | null>(null)
    const nameError = ref('')
    const documentError = ref('')
    const ageError = ref('')
    const genderError = ref('')
    const turnError = ref('')
    const gradeError = ref('')

    const openDialog = () => {
      student.value = {
        id: 0,
        name: '',
        document: '',
        age: 0,
        gender: '',
        turn: '',
        grade: 0,
      }
      editing.value = false
      nameError.value = ''
      dialog.value = true
    }

    const editStudent = (item: Student) => {
      student.value = { ...item }
      editing.value = true
      nameError.value = ''
      dialog.value = true
    }

    const validateInput = () => {
      nameError.value = student.value.name.trim() ? '' : 'O nome do aluno não pode estar vazio.'
      documentError.value = student.value.document.trim() ? '' : 'O documento não pode estar vazio.'
      ageError.value = student.value.age > 0 ? '' : 'A idade deve ser maior que 0.'
      genderError.value = student.value.gender ? '' : 'Selecione o gênero.'
      turnError.value = student.value.turn ? '' : 'Selecione o turno.'
      gradeError.value = student.value.grade > 0 ? '' : 'A série deve ser maior que 0.'

      return (
        !nameError.value &&
        !documentError.value &&
        !ageError.value &&
        !genderError.value &&
        !turnError.value &&
        !gradeError.value
      )
    }

    const saveStudent = () => {
      if (!validateInput()) return

      if (editing.value) {
        const index = students.value.findIndex((s) => s.id === student.value.id)
        if (index !== -1) students.value[index] = { ...student.value }
      } else {
        student.value.id = students.value.length + 1
        students.value.push({ ...student.value })
      }
      closeDialog()
    }

    const confirmDelete = (id: number) => {
      studentToDelete.value = id
      deleteDialog.value = true
    }

    const deleteStudent = () => {
      if (studentToDelete.value !== null) {
        students.value = students.value.filter((s) => s.id !== studentToDelete.value)
      }
      deleteDialog.value = false
      studentToDelete.value = null
    }

    const closeDialog = () => {
      dialog.value = false
    }

    return {
      students,
      headers,
      dialog,
      deleteDialog,
      editing,
      nameError,
      documentError,
      ageError,
      genderError,
      turnError,
      gradeError,
      student,
      studentToDelete,
      openDialog,
      editStudent,
      validateInput,
      saveStudent,
      confirmDelete,
      deleteStudent,
      closeDialog,
    }
  },
})
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
