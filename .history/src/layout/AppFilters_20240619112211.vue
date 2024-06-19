<script setup>
import { ref, onMounted } from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Audi from '@/assets/carlogos/audi.png'
import Carousel from 'primevue/carousel'


const isLoading = ref(false)
const value1 = ref(0)
const products = ref({
    data: [
		{
			id: 1,
			name: 'Audi',
			description: 'Product Description',
			image:'/audi.png',
			category: 'Brand',
			quantity: 24,
        },
        {
			id: 1,
			name: 'Ford',
			description: 'Product Description',
			image:'/ford.png',
			category: 'Brand',
			quantity: 24,
        },
        {
			id: 1,
			name: 'Honda',
			description: 'Product Description',
			image:'/honda.png',
			category: 'Brand',
			quantity: 24,
        },
    ]
})

const logo = ref()

onMounted(products.value = () => )

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
        <h6 class="mt-2">Marca</h6>
        <Carousel :value="logos" :numVisible="3">
            <template #item="slotProps">

            </template>
        </Carousel>
    </div>
    <hr class="mt-5 mb-5"/>
    <div>
        <h6 class="mt-2">Carros</h6>
        
    </div>
    <hr class="mt-5 mb-5"/>
    <div>
        <h6 class="mt-2">Ano</h6>
        
    </div>
    <hr class="mt-5 mb-5"/>
    <div>
        <h6 class="mt-2">Preço</h6>
        
    </div>
    <hr class="mt-5 mb-5"/>
    <div>
        <h6 class="mt-2">Quilometragem</h6>
        
    </div>
    <hr class="mt-5 mb-5"/>
    <div>
        <h6 class="mt-2">Opcionais</h6>
        
    </div>
    <hr class="mt-5 mb-5"/>


</template>