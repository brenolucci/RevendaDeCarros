import axios from 'axios';
import {defineStore} from 'pinia';
import { computed, ref } from 'vue';
import Vuex from 'vuex';


export const useUserStore = defineStore('login', () => {
    const state = ref({
        user: null
    });
    const mutations = computed(() => state.value * 2); 
    computed(SET_USER_DATA, state, userData) {
        state.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    }
    function register(credentials: any) {
        return axios.post('http://localhost/revendaCarro/hmtl/src/controllers/Login.php', credentials)
            .then((data) => {
                commit('SET_USER_DATA', data)
            });
    }
    return {state, mutations, register}
})
