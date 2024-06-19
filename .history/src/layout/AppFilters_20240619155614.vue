<script setup>
import { ref, onMounted, toRaw } from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';


const isLoading = ref(false)
const products = ref([
		{
			id: 1,
			name: 'Audi',
			description: 'Product Description',
			image:'@/assets/carlogos/audi.png',
			category: 'Brand',
			quantity: 24,
        },
        {
			id: 2,
			name: 'Ford',
			description: 'Product Description',
			image:'@/assets/carlogos/ford.png',
			category: 'Brand',
			quantity: 24,
        },
        {
			id: 3,
			name: 'Honda',
			description: 'Product Description',
			image:'@/assets/carlogos/honda.png',
			category: 'Brand',
			quantity: 24,
        },
        {
			id: 4,
			name: 'Porsche',
			description: 'Product Description',
			image:'@/assets/carlogos/porsche.png',
			category: 'Brand',
			quantity: 24,
        },
        {
			id: 2,
			name: 'Toyota',
			description: 'Product Description',
			image:'@/assets/carlogos/toyota.png',
			category: 'Brand',
			quantity: 24,
        },
        {
			id: 3,
			name: 'Tesla',
			description: 'Product Description',
			image:'@/assets/carlogos/tesla.webp',
			category: 'Brand',
			quantity: 24,
        },
    ]
)

</script>

<template>
    <div>
        <h6 class="mt-2">Localização</h6>
        <IconField class="mt-0">
            <InputIcon v-if="isLoading" class="pi pi-spin pi-spinner" :id="product.id"/>
            <InputIcon v-else class="pi pi-map-marker" />
            <InputText placeholder="florianópolis" />
        </IconField>
    </div>
    <hr class="mt-5 mb-5"/>
    <div>
        <h6 class="mt-2">Marca</h6>
            <div class="grid grid-cols-3 gap-3">
                <div>
                    <div class="shadow-sm border border-inherit">
                        <img src="@/assets/carlogos/audi.png" class="w-full">
                        <small class="text-xs">{{ products[0].name }}</small>
                    </div>
                </div>
                <div>
                    <div class="shadow-sm border border-inherit">
                        <img src="@/assets/carlogos/ford.png" class="w-full">
                        <small class="text-xs">{{ products[1].name }}</small>
                    </div>
                </div>
                <div>
                    <div class="shadow-sm border border-inherit">
                        <img src="@/assets/carlogos/honda.png" class="w-full">
                        <small class="text-xs">{{ products[2].name }}</small>
                    </div>
                </div>
                <div>
                    <div class="shadow-sm border border-inherit">
                        <!-- <img src="@/assets/carlogos/porsche.png" class="w-full">-->
                        <small class="text-xs">{{ products[3].name }}</small>
                    </div>
                </div>
                <div>
                    <div class="shadow-sm border border-inherit">
                        <!-- <img src="@/assets/carlogos/toyota.png" class="w-full">-->
                        <small class="text-xs">{{ products[4].name }}</small>
                    </div>
                </div>
                <div>
                    <div class="shadow-sm border border-inherit">
                        <!-- <img src="@/assets/carlogos/tesla.webp" class="w-full">-->
                        <small class="text-xs">{{ products[5].name }}</small>
                    </div>
                </div>
            </div>
        
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