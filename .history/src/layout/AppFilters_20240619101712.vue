<script setup>
import {ref} from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';


const isLoading = ref(false)
const value1 = ref(0)
const slotProps = ref({
    item: {
        itemImageSrc: '@/assets/carlogos/audi'
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
    <Galleria:value="images" :responsiveOptions="responsiveOptions" :numVisible="6"
    containerStyle="max-width: 850px" :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
    </template>
</Galleria:value=>
</template>