import { createRouter, createWebHistory } from 'vue-router'
import SubjectsView from '@/views/SubjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/materias",
    },
    {
      path: "/materias",
      name: "Materias",
      component: SubjectsView,
    },
  ],
})

export default router
