<script setup>
import {ref} from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';


const isLoading = ref(false)
const value1 = ref(0)

</script>

<template>

    <IconField>
        <InputIcon class="pi pi-map-marker" />
        <InputText placeholder="Localização" />
    </IconField>
    <IconField v-if="isLoading">
        <InputText  v-model="value2" />
        <InputIcon class="pi pi-spin pi-spinner" />
    </IconField>
    <hr></hr class="mt-4">
</template>