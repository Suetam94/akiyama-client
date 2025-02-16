import { createRouter, createWebHistory } from 'vue-router'
import SubjectsView from '@/views/SubjectsView.vue'
import StudentsView from '@/views/StudentsView.vue'

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
    {
      path: "/alunos",
      name: "Alunos",
      component: StudentsView,
    },
  ],
})

export default router
