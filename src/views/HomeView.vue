<template>
  <v-container fluid class="full-height d-flex flex-column align-center justify-center">
    <!-- Título da Página -->
    <h1 class="mb-2">Gestão Acadêmica</h1>
    <p class="subtitle mb-6">Gerencie alunos, matérias e provas de forma simples e eficiente.</p>

    <!-- Cards de Navegação -->
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="4">
        <v-card class="hover-card text-center py-6" @click="goTo('/alunos')" elevation="5">
          <v-icon size="80" class="mb-3">mdi-account-multiple</v-icon>
          <v-card-title class="text-h6">Gerenciar Alunos</v-card-title>
          <v-card-text>
            Cadastre, edite e visualize informações dos alunos, incluindo idade, turno e notas.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="hover-card text-center py-6" @click="goTo('/materias')" elevation="5">
          <v-icon size="80" class="mb-3">mdi-book-open-variant</v-icon>
          <v-card-title class="text-h6">Gerenciar Matérias</v-card-title>
          <v-card-text>
            Adicione e organize as matérias oferecidas pela instituição de ensino.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="hover-card text-center py-6" @click="goTo('/provas')" elevation="5">
          <v-icon size="80" class="mb-3">mdi-file-document-edit</v-icon>
          <v-card-title class="text-h6">Gerenciar Provas</v-card-title>
          <v-card-text>
            Registre as notas dos alunos em cada disciplina e acompanhe o desempenho acadêmico.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  setup() {
    const router = useRouter();

    const goTo = (path: string) => {
      router.push(path);
    };

    return { goTo };
  },
});
</script>

<style scoped>
.full-height {
  height: 100vh;
  background-color: #f4f6f9; /* Fundo mais suave */
}

.subtitle {
  font-size: 1.2rem;
  color: #4a4a4a;
}

.hover-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hover-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
