import { defineStore } from 'pinia';
import axios from 'axios'
import router from '@/router';
import { useAlertStore } from '@/stores';
import type User from '@/types/User';
import { useToast } from 'primevue/usetoast';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(<string>localStorage.getItem('user')),
        returnUrl: <null | string>null
    }),
    actions: {
        async login(credentials :User) {
            try {
                await axios.post('http://localhost/revendaCarro/hmtl/src/controllers/Login.php', credentials).then(r => {
                    this.user = JSON.stringify(r.data.data);
                    localStorage.setItem('user', this.user);
                });
                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
    }
});