<script setup lang='ts'>
import { ref, onMounted, toRaw, watch } from 'vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import { ProductService } from '@/service/ProductService';
import type Versao from '@/types/Versao';
import type Opcional from '@/types/Opcional';
import Listbox from 'primevue/listbox';
import type Marca from '@/types/Marca';
import Button from 'primevue/button';


const productService = new ProductService();
const isLoading = ref(false);
const versoes = ref<Array<Versao>>([]);
const versao = ref<Versao>();
const marcas = ref<Array<Marca>>([])
const marcaSelecionada = ref<Marca>()
const localizacao = ref();
const anoDe = ref<Number>();
const anoAte = ref<Number>();
const precoDe = ref<Number>();
const precoAte = ref<Number>();
const quilometragemDe = ref<Number>();
const quilometragemAte = ref<Number>();
const opcionais = ref<Array<Opcional>>([]);
const opcionaisSelecionados = ref<Opcional>();
const listaMarcas = ref(false);

watch(marcaSelecionada, () => {
    if(marcaSelecionada.value!=undefined)
    console.log(marcaSelecionada.value.nome)
})

onMounted(() => {
    productService.buscarOpcionais().then((data: Array<Opcional>) => (opcionais.value = data));
    productService.buscarMarcas().then((data: Array<Marca>) => (marcas.value = data));
});

</script>

<template>
    <!-- Localização -->
    <div>
        <h6 class="mt-2 mb-3">Localização</h6>
        <IconField>
            <InputIcon v-if="isLoading" class="pi pi-spin pi-spinner" :id="(localizacao)"/>
            <InputIcon v-else class="pi pi-map-marker" />
            <InputText class="border w-full py-2 px-2" v-model="localizacao" placeholder="florianópolis" />
        </IconField>
    </div>
    <hr class="mt-5 mb-5"/>
    <!--  -->
    <!-- LogoMarcas -->
    <h6 class="mt-2 mb-5">Marca</h6>
            <div class="flex">
                <a @click="listaMarcas=false" class="pi pi-arrow-left mr-2"></a>
                <Listbox v-if="listaMarcas" v-model="marcaSelecionada" :options="marcas" optionLabel="nome" :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:250px" />
            </div>
            <div v-if="!listaMarcas" class="flex flex-col items-center">
                <div class="grid grid-cols-4 gap-1">
                        <div class="field shadow border rounded flex flex-column items-center">
                            <a />
                            <img src="@/assets/carlogos/audi.png" class="h-3rem p-1 m-1">
                            <small class="text-xs">Audi</small>
                        </div>
                        <div class="field shadow border rounded flex flex-column items-center">
                            <img src="@/assets/carlogos/ford.png" class="h-3rem p-1 m-1">
                            <small class="text-xs">Ford</small>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-1 mt-1">
                    <div class="field shadow border rounded flex flex-column items-center">
                        <img src="@/assets/carlogos/honda.png" class="h-3rem p-1 m-1">
                        <small class="text-xs">Honda</small>
                    </div>
                    <div class="field shadow border rounded flex flex-column items-center">
                        <img src="@/assets/carlogos/porsche.png" class="h-3rem p-1 m-1">
                        <small class="text-xs">Porsche</small>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-1 mt-1">
                        <div class="field shadow border rounded flex flex-column items-center">
                            <img src="@/assets/carlogos/toyota.png" class="h-3rem p-1 m-1">
                            <small class="text-xs">Toyota</small>
                        </div>
                        <div class="field shadow border rounded flex flex-column items-center">
                            <img src="@/assets/carlogos/tesla.webp" class="h-3rem p-1 m-1">
                            <small class="text-xs">Tesla</small>
                        </div>
                </div>
            </div>
            <div @click="listaMarcas=true" v-if="!listaMarcas">Ver todas as Marcas >></div>
            <hr class="mt-5 mb-3"/>
    <!--  -->
    <!-- Ano -->
    <div>
        <h6 class="mt-2 mb-5">Ano</h6>
        <div class="flex justify-center gap-2">
            <div>
                <InputText type="number" v-model="anoDe" class="border w-full py-2 px-2" placeholder="de" />
                <small id="username-help">ex: 2014</small>
            </div>
            <div>
                <InputText type="number" v-model="anoAte" class="border w-full py-2 px-2" placeholder="até" />
                <small id="username-help">ex: 2014</small>
            </div>
        </div>
    </div>
    <hr class="mt-5 mb-3"/>
    <!--  -->
    <!-- Preço -->
    <div>
        <h6 class="mt-2 mb-5">Preço</h6>
        <div class="flex justify-center gap-2">
            <div>
                <InputText type="number" v-model="precoDe" class="border w-full py-2 px-2" placeholder="de" />
                <small id="username-help">R$ 10.000</small>
            </div>
            <div>
                <InputText type="number" v-model="precoAte" class="border w-full py-2 px-2" placeholder="até" />
                <small id="username-help">R$ 50.000</small>
            </div>
        </div>
    </div>
    <hr class="mt-5 mb-3"/>
    <!--  -->
    <!-- Quilometragem -->
    <div>
        <h6 class="mt-2 mb-5">Quilometragem</h6>
        <div class="flex justify-center gap-2">
            <div>
                <InputText type="number" v-model="quilometragemDe" class="border w-full py-2 px-2" placeholder="de" />
                <small id="username-help">50.000</small>
            </div>
            <div>
                <InputText type="number" v-model="quilometragemAte" class="border w-full py-2 px-2" placeholder="até" />
                <small id="username-help">180.000</small>
            </div>
        </div>
    </div>
    <hr class="mt-5 mb-5"/>
    <!--  -->
    <!-- Opcionais -->
    <div >
        <h6 class="mt-2 mb-3">Opcionais</h6>
        <div v-for="opcional in opcionais" :key="opcional.id" class="p-1">
            <div>
                <Checkbox v-model="opcionaisSelecionados" :inputId="String(opcional.id)" name="optionals" :value="opcional.id" />
                <label :for="String(opcional.id)" class="ml-2"> {{opcional.nome}} </label>
            </div>
        </div>
    </div>
    <hr class="mt-5 mb-5"/>
    <Button type="submit" required rounded label="Filtrar" class="m-5 py-2 px-4 rounded border" />
</template>

<style scoped>
.field {
  width: 7rem;
  gap: 1px;
  margin-bottom: 5%;
  
}
.field:hover{
    color: red;
}
</style>