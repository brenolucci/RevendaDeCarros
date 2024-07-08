import { defineStore } from 'pinia';
import type User from '../types/User'

import axios from 'axios';


export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        user: {}
    }),
    actions: {
        async register(user: User) {
            await axios.post(`http://localhost/revendaCarro/hmtl/src/controllers/Registro.php`, user);
        },
        async getAll() {
            this.users = { loading: true };
            try {
                this.users = await axios.get('http://localhost/revendaCarro/hmtl/src/controllers/Login.php');    
            } catch (error) {
                this.users = { error };
            }
        },
    }
});