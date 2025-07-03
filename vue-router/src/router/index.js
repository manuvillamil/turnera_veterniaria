// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import TurnosView from '../views/TurnosView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/turnos',
    name: 'turnos',
    component: TurnosView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// --- CÓDIGO DE SEGURIDAD (NAVIGATION GUARD) ---
// Esto se asegura de que nadie entre a páginas a las que no tiene permiso.
router.beforeEach((to, from, next) => {
  // Rutas que no necesitan que el usuario esté logueado.
  const publicPages = ['/login'];
  
  // Verificamos si la ruta a la que se intenta acceder requiere login.
  const authRequired = !publicPages.includes(to.path);
  
  // Obtenemos el rol del usuario que guardamos en el login.
  const userRole = localStorage.getItem('rol');

  // CASO 1: Si la página requiere login y el usuario no tiene un rol guardado...
  if (authRequired && !userRole) {
    return next('/login'); // ...lo mandamos a la página de login.
  }

  // CASO 2: Si intenta entrar a /admin pero su rol no es 'admin'...
  if (to.path === '/admin' && userRole !== 'admin') {
    alert('Acceso denegado. Esta página es solo para administradores.');
    return next('/home'); // ...lo mandamos a la página de bienvenida.
  }
  
  // CASO 3: Si intenta entrar a /turnos pero su rol no es 'cliente'...
  if (to.path === '/turnos' && userRole !== 'cliente') {
    alert('Acceso denegado. Esta página es solo para clientes.');
    return next('/home'); // ...lo mandamos a la página de bienvenida.
  }

  // Si todo está en orden, lo dejamos pasar a la ruta que quería.
  next();
});

export default router