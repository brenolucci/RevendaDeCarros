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
    <h6 class="mt-2">Localização</h6>
    <IconField class="mt-">
        <InputIcon v-if="isLoading" class="pi pi-spin pi-spinner" />
        <InputIcon v-else class="pi pi-map-marker" />
        <InputText placeholder="florianópolis" />
    </IconField>
    <hr class="mt-5 mb-5"/>
    
</template>