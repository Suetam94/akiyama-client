<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>Gestão Acadêmica</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$emit('toggle-drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
export default {
  name: "AppHeader",
};
</script>
