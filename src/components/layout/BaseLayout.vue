<template>
  <v-app>
    <AppHeader @toggle-drawer="toggleDrawer" />

    <AppSidebar v-model="drawer" />

    <v-main class="main-container">
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default defineComponent({
  name: 'BaseLayout',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
  },
  setup() {
    const drawer = ref(false)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    return { drawer, toggleDrawer }
  },
})
</script>

<style scoped>
.main-container {
  height: 100vh;
  width: 100vw;
}
</style>
