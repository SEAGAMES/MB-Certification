// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/MainPage.vue'),
    children: [

    ],
  },
  {
    path: '/certificate-main',
    name: 'Certificate-Main',
    component: () => import('../views/MainPage.vue'),
  },
  {
    path: '/certificate-pdf',
    name: 'Certificate-PDF',
    component: () => import('../views/Certificate-PDF.vue'),
  },
  {
    path: '/certificate-master',
    name: 'Certificate-Master',
    component: () => import('../views/Certificate-Master.vue'),
  },
  {
    path: '/certificate-edit',
    name: 'Certificate-Edit',
    component: () => import('../views/Certificate-Edit.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
