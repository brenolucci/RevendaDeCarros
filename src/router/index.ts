import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../layout/AppLayout.vue';
import { useAuthStore } from '@/stores';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: '/cadastro',
                    name: 'cadastro',
                    component: () => import('@/views/pages/Cadastro.vue')
                }
            ]
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('../views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('../views/pages/auth/Login.vue')
        },
        {
            path: '/auth/registro',
            name: 'registro',
            component: () => import('@/views/pages/auth/Registro.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('../views/pages/auth/Access.vue')
            
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('../views/pages/auth/Error.vue')
        }
    ]
});

router.beforeEach(async (to) => {
    const paginasPublicas = ['/auth/login', '/auth/registro', '/auth/access'];
    const authNecessaria = !paginasPublicas.includes(to.path);
    const auth = useAuthStore();

    if (authNecessaria && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/auth/login';
    }
})

export default router;
