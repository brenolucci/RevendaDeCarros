<script setup>
import {ref} from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Audi from '@/assets/carlogos/audi.png'
import Carousel from 'primevue/carousel'


const isLoading = ref(false)
const value1 = ref(0)
const product = ref({
    data: [
		{
			id: 1000,
			code: 'f230fh0g3',
			name: 'Skyline R34 - Nissan',
			description: 'Product Description',
			image:' @/assets/skylineR34.jpeg',
			price: 1579000,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
            rating: 5,
        },
        {
			id: 1000,
			code: 'f230fh0g3',
			name: 'Skyline R34 - Nissan',
			description: 'Product Description',
			image:' @/assets/skylineR34.jpeg',
			price: 1579000,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
            rating: 5,
        },
        {
			id: 1000,
			code: 'f230fh0g3',
			name: 'Skyline R34 - Nissan',
			description: 'Product Description',
			image:' @/assets/skylineR34.jpeg',
			price: 1579000,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
            rating: 5,
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