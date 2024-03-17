import { createRouter, createWebHistory } from "vue-router";
import { UsuarioStore } from '@/store/auth/str_Usuario.js'
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/Home.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user/User.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/courses",
    name: "course",
    component: () => import("@/views/course/Course.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/assignments',
    name: 'assignment',
    component: () => import("@/views/assignment/Assignment.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/roles",
    name: "role",
    component: () => import("@/views/role/Role.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/permissions",
    name: "permission",
    component: () => import("@/views/permission/Permission.vue"),
    meta: { requiresAuth: true }
  }
  
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from, next) => {
  const { oUsuario } = UsuarioStore()
  const isLoggedIn = !!oUsuario.sToken
  
  if (to.meta.requiresAuth && !isLoggedIn) {
     // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
    next({ name: 'login' });
  } else if (!to.meta.requiresAuth && isLoggedIn) {
    // Si la ruta no requiere autenticación y el usuario está autenticado, redirige a home
    next({ name: 'home' });
  } else {
    // De lo contrario, permite continuar con la navegación
    next();
  }
});

export default router;
