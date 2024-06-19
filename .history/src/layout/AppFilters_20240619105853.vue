<script setup>
import {ref} from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Audi from '@/assets/carlogos/audi.png'
import Carousel from 'primevue/carousel'


const isLoading = ref(false)
const value1 = ref(0)
const logos = ref({
    data: [
		{
			id: 1,
			name: 'Audi',
			description: 'Product Description',
			image:'@/assets/carlogos/audi.png',
			category: 'Brand',
			quantity: 24,
        },
        {
			id: 1,
			name: 'Audi',
			description: 'Product Description',
			image:'@/assets/carlogos/audi.png',
			category: 'Accessories',
			quantity: 24,
        },
        {
			id: 1,
			name: 'Audi',
			description: 'Product Description',
			image:'@/assets/carlogos/audi.png',
			category: 'Accessories',
			quantity: 24,
        },
    ]
})
</script>

<template>
    <div>
        <h6 class="mt-2">Localização</h6>
        <IconField class="mt-">
            <InputIcon v-if="isLoading" class="pi pi-spin pi-spinner" />
            <InputIcon v-else class="pi pi-map-marker" />
            <InputText placeholder="florianópolis" />
        </IconField>
    </div>
    <hr class="mt-5 mb-5"/>
    <div>
        <Carousel></Carousel>
    </div>

</template>