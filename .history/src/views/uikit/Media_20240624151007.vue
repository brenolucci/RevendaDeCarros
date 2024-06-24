<script setup>
import { ref, onMounted, toRaw } from 'vue';
import Button from 'primevue/button';
import Skyline from '@/assets/skylineR34.jpeg'
import ProductService from '@/'

const images = ref([]);
const versoes = ref([]);

const productService = new ProductService();

const carouselResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);



const home = ref({
    icon: 'pi pi-home'
});
const items = ref([
    { label: 'Carros' }, 
    { label: 'Usados' }, 
    { label: 'Nissan' }, 
]);

onMounted(() => {
    productService.getVersions().then((data) => (versoes.value = data));
});

async function getVersions(){
    const requestOptions = {
        method: "GET",
        headers: {"content-type": "application/json"},
    };
    const response = await fetch('http://localhost/revendaCarro/hmtl/src/controllers/CriarVersao.php');
    const data = await response.json();

    versoes.value = data;

    console.log(toRaw(versoes.value));

}

const getSeverity = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};
</script>

<template>
    <Breadcrumb class="mb-5" :home="home" :model="items" />
    <div class="mb-5 ml-5">
        <h1 class="text-xl font-semibold font" >Carros usados, seminovos e novos em Florianópolis/SC</h1>
        <span>17.321 resultados encontrados</span>
    </div>
    <div class="flex justify-center grid-cols-4 px-16">

        <div v-for="versao in versoes" :key="versao.id" >
            <div class="border-1 surface-border border-round w-auto m-2 ">
                <div class="mb-3">
                    <div class="relative mx-auto">
                        <img :src="Skyline" :alt="versao.nome" class="w-full" />
                        <Tag :value="'INSTOCK'" :severity="true" class="absolute" style="left: 3px; top: 5px" />
                    </div>
                </div>
                <div class="p-3">
                    <div class="mb-2 font-semibold">{{ versao.modelo.marca.nome.toUpperCase() }} {{ versao.modelo.nome.toUpperCase() }}</div>
                    <span class="mb-30">{{versao.nome}}</span>
                    <div class="justify-content-between align-items-center mb-2">
                        <div class="mt-3 font-semibold text-xl">R$ {{ versao.preco }}</div>
                        <div class="flex justify-content-between align-items-center mb-2">
                            <span>{{ versao.ano }}/{{ versao.ano_modelo }}</span>
                            <span>{{ versao.quilometragem }}KM</span>
                        </div>
                        <span class="flex justify-center">
                            <Button class="mx-6 mt-4 mb-2">Ver detalhes</Button>
                        </span>
                        <hr/>
                        <span class="flex justify-center mt-2">{{ versao.localizacao }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
