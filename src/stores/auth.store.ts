import { defineStore } from 'pinia';
import axios from 'axios'
import router from '@/router';
import { useAlertStore } from '@/stores';
import type User from '@/types/User';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(<string>localStorage.getItem('user')),
        returnUrl: <null | string>null
    }),
    actions: {
        async login(credentials :User) {
            await axios.post('http://localhost/revendaCarro/hmtl/src/controllers/Login.php', credentials).then(r => {
                this.user = JSON.stringify(r.data.accessToken);
                localStorage.setItem('user', this.user);
            })
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
    }
});