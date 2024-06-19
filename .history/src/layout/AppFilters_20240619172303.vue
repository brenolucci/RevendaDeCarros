<script setup>
import { ref, onMounted, toRaw } from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';


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
    <!-- Localização -->
    <div>
        <h6 class="mt-2 mb-3">Localização</h6>
        <IconField>
            <InputIcon v-if="isLoading" class="pi pi-spin pi-spinner" :id="product.id"/>
            <InputIcon v-else class="pi pi-map-marker" />
            <InputText class="border w-full py-2 px-2" placeholder="florianópolis" />
        </IconField>
    </div>
    <hr class="mt-5 mb-5"/>
    <!--  -->
    <!-- LogoMarcas -->
    <div class="grid grid-cols-4 gap-4">
    </div>
    <h6 class="mt-2 mb-5">Marca</h6>
    <div class="grid grid-cols-3 gap-1">
        <div>
            <div class="shadow-sm border rounded flex flex-column items-center justify-items-center">
                <img src="@/assets/carlogos/audi.png" class="h-3rem mb-2">
                <small class="text-xs">{{ products[0].name }}</small>
            </div>
        </div>
        <div>
            <div class="shadow-sm border rounded flex flex-column items-center justify-items-center">
                <img src="@/assets/carlogos/ford.png" class="h-3rem mb-2">
                <small class="text-xs">{{ products[1].name }}</small>
            </div>
        </div>
        <div>
            <div class="shadow-sm border rounded flex flex-column items-center justify-items-center">
                <img src="@/assets/carlogos/honda.png" class="h-3rem mb-2">
                <small class="text-xs">{{ products[2].name }}</small>
            </div>
        </div>
        <div>
            <div class="shadow-sm border rounded flex flex-column items-center justify-items-center">
                <img src="@/assets/carlogos/porsche.png" class="h-3rem mb-2">
                <small class="text-xs">{{ products[3].name }}</small>
            </div>
        </div>
        <div>
            <div class="shadow-sm border rounded flex flex-column items-center justify-items-center">
                <img src="@/assets/carlogos/toyota.png" class="h-3rem mb-2">
                <small class="text-xs">{{ products[4].name }}</small>
            </div>
        </div>
        <div>
            <div class="shadow-sm border rounded flex flex-column items-center justify-items-center">
                <img src="@/assets/carlogos/tesla.webp" class="h-3rem mb-2">
                <small class="text-xs">{{ products[5].name }}</small>
            </div>
        </div>
    </div>
    <hr class="mt-5 mb-5"/>
    <!--  -->
    <!-- Carros -->
    <div>
        <h6 class="mt-2 mb-3">Carros</h6>
        <div class="flex flex-wrap justify-content-center gap-3">
        <div class="flex align-items-center">
            <Checkbox v-model="tipoCarro" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="ml-2"> Novos </label>
        </div>
        <div class="flex align-items-center">
            <Checkbox v-model="pizza" inputId="ingredient2" name="pizza" value="Mushroom" />
            <label for="ingredient2" class="ml-2"> Usados </label>
        </div>
    </div>
    </div>
    <hr class="mt-5 mb-5"/>
    <!--  -->
    <!-- Ano -->
    <div>
        <h6 class="mt-2 mb-5">Ano</h6>
        <div class=" gap-2">
            <InputText class="border w-full py-2 px-2" placeholder="de" />
            <small id="username-help">Ex: 2014</small>
            <InputText class="border w-full py-2 px-2" placeholder="de" />
            <small id="username-help">Ex: 2014</small>
        </div>
    </div>
    <hr class="mt-5 mb-5"/>
    <!--  -->
    <!-- Preço -->
    <div>
        <h6 class="mt-2 mb-5">Preço</h6>
        
    </div>
    <hr class="mt-5 mb-5"/>
    <!--  -->
    <!-- Quilometragem -->
    <div>
        <h6 class="mt-2">Quilometragem</h6>
        
    </div>
    <hr class="mt-5 mb-5"/>
    <!--  -->
    <!-- Opcionais -->
    <div>
        <h6 class="mt-2">Opcionais</h6>
        
    </div>
    <hr class="mt-5 mb-5"/>


</template>