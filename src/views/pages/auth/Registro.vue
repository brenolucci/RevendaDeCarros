<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { ProductService } from '@/service/ProductService';
import { ref, computed } from 'vue';
import { useUsersStore, useAlertStore} from '@/stores'
import router from '@/router';
import type User from '@/types/User';



const usersStore = useUsersStore();
const alertStore = useAlertStore();
const productService = new ProductService();
const { layoutConfig } = useLayout();
const nome = ref('');
const email = ref('');
const senha = ref('');
const usuario = ref<User>({
    nome: '',
    email: ''
});
const checked = ref(false);

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

async function registro(){
    usuario.value = <User> {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    }
    try {
        await usersStore.register(usuario.value);
        await router.push('/auth/login');
        alertStore.success('Cadastro bem sucedido!')
    } catch (error: any) {
        alertStore.error(error);
    }
}


</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <form @submit.prevent="registro">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                        <div class="text-center mb-5">
                            <img src="@/assets/revendaCarro-logo.webp" alt="Image" height="80" class="rounded-full mb-3" />
                            <div class="text-900 text-3xl font-medium mb-3">Bem vindo ao Revenda de Carros!</div>
                            <span class="text-600 font-medium">Já tem cadastro?</span>
                            <router-link to="/auth/login" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Faça login</router-link>
                        </div>
                        <div>
                            <label for="nome" class="block text-900 text-xl font-medium mb-2">Nome</label>
                            <InputText id="nome" type="text" placeholder="Nome completo" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="nome" required/>

                            <label for="email" class="block text-900 text-xl mb-2" >Email</label>
                            <InputText id="email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" required/>

                            <label for="senha" class="block text-900 font-medium text-xl mb-2">Senha</label>
                            <Password id="senha" v-model="senha" placeholder="Senha" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }" required></Password>

                        
                            <Button type="submit"  label="Registrar" class="mt-6 w-full p-3 text-xl"></Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
