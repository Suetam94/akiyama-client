<template>
  <v-app>
    <!-- Header -->
    <AppHeader @toggle-drawer="toggleDrawer" />

    <!-- Sidebar -->
    <AppSidebar v-model="drawer" />

    <!-- Main Area -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

export default defineComponent({
  name: "BaseLayout",
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
  },
  setup() {
    const drawer = ref(false);

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    return { drawer, toggleDrawer };
  },
});
</script>
