<script setup>
import {ref} from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Audi from '@/assets/carlogos/audi.png'


const isLoading = ref(false)
const value1 = ref(0)
const slotProps = ref({
    item: {
        thumbnailImageSrc: '@/assets/carlogos/audi.png'
    }
})

</script>

<template>

    <IconField class="mt-3">
        <InputIcon class="pi pi-map-marker" />
        <InputText placeholder="Localização" />
    </IconField>
    <IconField v-if="isLoading">
        <InputText  v-model="value2" />
        <InputIcon class="pi pi-spin pi-spinner" />
    </IconField>
    <hr class="mt-5 mb-5"></hr>
    
</template>