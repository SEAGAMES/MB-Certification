// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Certification-PDF.vue'),
    children: [
      {
        path: '',
        name: 'Certification',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/certification-pdf',
    name: 'Certification-PDF',
    component: () => import('../views/Certification-PDF.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
