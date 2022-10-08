import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/Layout.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      alias: '/',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Layout,
      meta: { requiresAuth: true },
      children:[
        {
          path: '/system/menu',
          name: 'SystemMenu',
          component: ()=>import('@/views/System/menu.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/account/list',
          name: 'AccountList',
          component: ()=>import('@/views/Account/List.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/user/list',
          name: 'UserList',
          component: ()=>import('@/views/User/List.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/system/edit',
          name: 'SystemEdit',
          component: ()=>import('@/views/System/Edit.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/system/menu2',
          name: 'SystemMenu2',
          component: ()=>import('@/views/System/menu2.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/account/issue',
          name: 'AccountIssue',
          component: ()=>import('@/views/Account/issue.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/account/indent',
          name: 'AccountIndent',
          component: ()=>import('@/views/Account/indent.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/account/product',
          name: 'AccountProduct',
          component: ()=>import('@/views/Account/product.vue'),
          meta: { requiresAuth: true },
        },
      ]
    },
  ]
})

export default router
