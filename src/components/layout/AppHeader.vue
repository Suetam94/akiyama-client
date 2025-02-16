<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title class="cursor-pointer" @click="goTo('/')">Gestão Acadêmica</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$emit('toggle-drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: "AppHeader",
  setup() {
    const router = useRouter();

    const goTo = (path: string) => {
      router.push(path);
    };

    return { goTo };
  },
};
</script>
