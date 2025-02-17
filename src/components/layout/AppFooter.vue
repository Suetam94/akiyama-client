<template>
  <v-footer app color="grey darken-3" class="white--text text-center">
    <v-container>
      <span>&copy; {{ new Date().getFullYear() }} Gestão Acadêmica</span>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
export default {
  name: 'AppFooter',
}
</script>
