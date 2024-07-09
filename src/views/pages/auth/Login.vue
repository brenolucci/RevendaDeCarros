<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores';
import type User from '@/types/User';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import type { AxiosError } from 'axios';

const toast = useToast();
const { layoutConfig } = useLayout();
const authStore = useAuthStore();
const email = ref('');
const senha = ref('');
const checked = ref(false);
const user = ref<User>({
    email: '',
    senha: ''
});

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

async function login(){
    try {
        user.value = {email: email.value, senha: senha.value};
        await authStore.login(user.value);
        toast.add({ severity: "success", summary: "Sucesso", detail: 'Login bem sucedido!', life: 3000 });
        router.push('/')
    } catch (error: any) {
        const e = error.response.data.message
        toast.add({ severity: "error", summary: "Erro", detail: e , life: 3000 });
    }
}
</script>

<template>
    <form  @submit.prevent="login">
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="@/assets/revendaCarro-logo.webp" alt="Image" height="80" class="rounded-full mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bem vindo ao Revenda de Carros!</div>
                        <span class="text-600 font-medium">Não é cadastrado?</span>
                        <router-link to="/auth/registro" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Registre aqui</router-link>
                    </div>
                    <div>
                        <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" required/>
                        <label for="senha" class="block text-900 font-medium text-xl mb-2">Senha</label>
                        <Password id="senha" v-model="senha" placeholder="Senha" :feedback="false" :toggleMask="true" class="w-full mb-3" weak-label="false" inputClass="w-full" :inputStyle="{ padding: '1rem' }" required></Password>
                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Lembrar usuário</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer hover:underline" style="color: var(--primary-color)">Esqueceu a senha?</a>
                        </div>
                        <Button type="submit" label="Entrar" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</form>
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