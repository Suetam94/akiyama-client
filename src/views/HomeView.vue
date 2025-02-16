<template>
  <v-container fluid class="full-height d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="hover-card text-center py-5" @click="goTo('/alunos')">
          <v-icon size="64" class="mb-3">mdi-account-multiple</v-icon>
          <v-card-title>Gerenciar Alunos</v-card-title>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="hover-card text-center py-5" @click="goTo('/materias')">
          <v-icon size="64" class="mb-3">mdi-book-open-variant</v-icon>
          <v-card-title>Gerenciar Matérias</v-card-title>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="hover-card text-center py-5" @click="goTo('/provas')">
          <v-icon size="64" class="mb-3">mdi-file-document-edit</v-icon>
          <v-card-title>Gerenciar Provas</v-card-title>
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
}
.hover-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: scale(1.05);
}
</style>
