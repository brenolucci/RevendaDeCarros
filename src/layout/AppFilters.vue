<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue'
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
import router from '@/router';
import type { LocationQueryRaw } from 'vue-router';

const productService = new ProductService();
const isLoading = ref(false);
const versoes = ref<Array<Versao>>([]);
const versao = ref<Versao>();
const marcas = ref<Array<Marca>>([]);
const marcaSelecionada = ref<Marca>();
const localizacao = ref('');
const ano = ref<Number>();
const preco = ref<Number>();
const quilometragem = ref<Number>();
const opcionais = ref<Array<Opcional>>([]);
const opcionaisSelecionados = ref<Array<number>>([]);
const listaMarcas = ref(false);

function debounce(func: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return  (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const updateQueryParams = debounce(() => {
  const query: LocationQueryRaw = {
    ...(ano.value && { ano: ano.value.toString() }),
    ...(preco.value && { preco: preco.value.toString() }),
    ...(quilometragem.value && { quilometragem: quilometragem.value.toString() }),
    ...(opcionaisSelecionados.value.length && { opcionais: opcionaisSelecionados.value.join(',') }),
    ...(localizacao.value && { localizacao: localizacao.value }),
    ...(marcaSelecionada.value && { marca: marcaSelecionada.value.nome })
  };

  router.push({
    path: '/',
    query
  });
}, 1000); // 1 segundo de delay

watch(ano, updateQueryParams);
watch(preco, updateQueryParams);
watch(quilometragem, updateQueryParams);
watch(opcionaisSelecionados, updateQueryParams);
watch(localizacao, updateQueryParams);
watch(marcaSelecionada, updateQueryParams);

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
      <InputIcon v-if="isLoading" class="pi pi-spin pi-spinner" :id="(localizacao)" />
      <InputIcon v-else class="pi pi-map-marker" />
      <InputText class="border w-full py-2 px-2" v-model="localizacao" placeholder="florianópolis" />
    </IconField>
  </div>
  <hr class="mt-5 mb-5" />
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
  <hr class="mt-5 mb-3" />
  <!-- Ano -->
  <div>
    <h6 class="mt-2 mb-5">Ano</h6>
    <div class="flex justify-center gap-2">
      <div>
        <InputText type="number" v-model="ano" class="border w-full py-2 px-2" placeholder="2024" />
        <small id="username-help">ex: 2014</small>
      </div>
    </div>
  </div>
  <hr class="mt-5 mb-3" />
  <!-- Preço -->
  <div>
    <h6 class="mt-2 mb-5">Preço</h6>
    <div class="flex justify-center gap-2">
      <div>
        <InputText type="number" v-model="preco" class="border w-full py-2 px-2" placeholder="R$" />
        <small id="username-help">R$ 10.000</small>
      </div>
    </div>
  </div>
  <hr class="mt-5 mb-3" />
  <!-- Quilometragem -->
  <div>
    <h6 class="mt-2 mb-5">Quilometragem</h6>
    <div class="flex justify-center gap-2">
      <div>
        <InputText type="number" v-model="quilometragem" class="border w-full py-2 px-2" placeholder="0 km" />
        <small id="username-help">50.000</small>
      </div>
    </div>
  </div>
  <hr class="mt-5 mb-5" />
  <!-- Opcionais -->
  <div>
    <h6 class="mt-2 mb-3">Opcionais</h6>
    <div v-for="opcional in opcionais" :key="opcional.id" class="p-1">
      <div>
        <Checkbox v-model="opcionaisSelecionados" :inputId="String(opcional.id)" name="optionals" :value="opcional.id" />
        <label :for="String(opcional.id)" class="ml-2"> {{opcional.nome}} </label>
      </div>
    </div>
  </div>
  <hr class="mt-5 mb-5" />
  <Button type="submit" required rounded label="Filtrar" class="m-5 py-2 px-4 rounded border" />
</template>

<style scoped>
.field {
  width: 7rem;
  gap: 1px;
  margin-bottom: 5%;
}

.field:hover {
  color: red;
}
</style>
