<script setup lang="ts">
import { ref, onMounted, toRaw, watch } from 'vue';
import Button from 'primevue/button';
import Skyline from '@/assets/skylineR34.jpeg';
import { ProductService } from '@/service/ProductService';
import type Versao from '@/types/Versao';
import { useRoute, useRouter } from 'vue-router';
import Galleria from 'primevue/galleria';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const query = ref(route.query);
const images = ref([]);
const versoes = ref<Array<Versao>>();
const productService = new ProductService();
const totalBusca = ref<Number>();
const user = ref({});
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
   
]);


watch(
  () => route.fullPath,
  async () => {
    await productService.buscarVersoesFiltradas(route.fullPath).then((data) => (versoes.value = data));
    totalBusca.value = versoes.value?.length;
  }
)

onMounted(() => {
    productService.buscarVersoesFiltradas(route.fullPath).then((data) => (versoes.value = data));
});

const getSeverity = (status: string) => {
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
    <div class="flex flex-col">
        <Breadcrumb class="mb-5" :home="home" :model="items" />
        <div class="mb-5 ml-5">
            <h1 class="text-xl font-semibold font" >Carros usados, seminovos e novos em Florianópolis/SC</h1>
            <span>{{ totalBusca }} resultados encontrados</span>
        </div>

        <div class="grid grid-cols-5 gap-1">
            <div v-for="versao in versoes" :key="versao.id" >
                <div class="border-1 surface-border border-round max-w-80 m-2 ">
                    <div class="mb-3">
                        <div class="relative mx-auto">
                        <Galleria :value="versao.imagens" :num-visible="6" container-style="max-width: 640px"
                        :show-thumbnails="false" :show-indicators="true" :change-item-on-indicator-hover="true" >
                            <template #item="slotProps">
                                <img :src="slotProps.item.img_url"  class="w-full" />
                            </template>
                        </Galleria>
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

</div>

</template>

<style scoped>
.grid {
 display: grid;
}
.border-1 {
    max-height: 95%;
}
</style>