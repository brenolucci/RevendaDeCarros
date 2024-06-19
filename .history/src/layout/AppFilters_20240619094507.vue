<script setup>
import {ref} from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';


const isLoading = ref(false)
const value1 =

</script>

<template>
    <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="value1" placeholder="Search" />
    </IconField>
    <IconField>
        <InputText v-if="isLoading" v-model="value2" />
        <InputIcon class="pi pi-spin pi-spinner" />
    </IconField>
</template>