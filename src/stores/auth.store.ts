import { defineStore } from 'pinia';
import axios from 'axios'
import router from '@/router';
import type Login from '@/types/Login';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: localStorage.getItem('user'),
        returnUrl: <null | string>null
    }),
    actions: {
        async login(credentials: Login) {
            await axios.post('http://localhost/revendaCarro/hmtl/src/controllers/Login.php', credentials).then(r => {
                const token = JSON.stringify(r.data.accessToken);
                localStorage.setItem('user', token);
            })
        },
        logout() {
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
    }
});