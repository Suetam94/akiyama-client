<template>
  <v-app-bar app color="primary" class="px-10" dark>
    <div class="d-flex align-center cursor-pointer" @click="goTo('/')">
      <v-img src="favicon.webp" contain :width="32" :height="32" class="mr-2"></v-img>
      <span class="title-text">Gestão Acadêmica</span>
    </div>

    <v-spacer></v-spacer>

    <v-btn icon @click="$emit('toggle-drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter()

    const goTo = (path: string) => {
      router.push(path)
    }

    return { goTo }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.title-text {
  font-size: 18px;
  line-height: 1;
}
</style>
