<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref } from 'vue';
import { ProductService } from '@/service/ProductService';
import ImageUploader from '@/components/ImageUploader.vue';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import { useToast } from "primevue/usetoast";
import type Versao from '@/types/Versao'
import type Marca from '@/types/Marca';
import type Modelo from '@/types/Modelo';
import type Combustivel from '@/types/Combustivel';
import type Opcional from '@/types/Opcional';
import Empty from './Empty.vue';

const productService = new ProductService();
const versoes = ref<Array<Versao>>([]);
const versao = ref();
const submitted = ref(false);
const marcas = ref<Array<Marca>>([]);
const marcaSelecionada = ref<Marca>();
const modelos = ref<Array<Modelo>>([]);
const modeloSelecionado = ref<Modelo>();
const marcaId = ref();
const combustiveis = ref<Array<Combustivel>>([]);
const combustivelSelecionado = ref<Combustivel>();
const opcionais = ref<Array<Opcional>>([]);
const opcionalSelecionado = ref<Opcional>();
const ano = ref();
const anoModelo = ref();
const preco = ref();
const quilometragem = ref<String>();
const localizacao = ref<String>();
const toast = useToast();
const versaoMontada = ref();
const anos = ref<Array<Number>>([]);


function marcaEscolhida() {
    modelos.value = [];
    modeloSelecionado.value = <Modelo>{};
        marcaId.value = !marcaSelecionada.value ? undefined : marcaSelecionada.value.id;
        if(marcaId.value != undefined)
        productService.buscarModelosPorMarca(marcaId.value).then((data: Array<Modelo>) => (modelos.value = data));
}

function contaAnos() {
    for (let index = 2025; index > 1950; index--) {
        anos.value.push(index);
    }
}

function cadastrar() {
    try{
    versaoMontada.value = {
            modelo_id: !modeloSelecionado.value ? null : modeloSelecionado.value.id,
            combustivel_id: !combustivelSelecionado.value ? null : combustivelSelecionado.value.id,
            nome: versao.value,
            preco: preco.value,
            ano: ano.value,
            ano_modelo: anoModelo.value,
            quilometragem: String(quilometragem.value).toString(),
            localizacao: String(localizacao.value)
        }
        
        if(versaoMontada.value.modelo_id === null || versaoMontada.value.combustivel_id === null || versaoMontada.value.ano === undefined || versaoMontada.value.ano_modelo === undefined || versaoMontada.value.preco === undefined || versaoMontada.value.quilometragem === "undefined" ) {
            toast.add({ severity: "error", summary: "Erro", detail: "Preencha todos os campos!", life: 5000 })
            throw new Error("Preencha todos os campos!!");
        }
    
        productService.cadastrarVersao(versaoMontada.value);
        toast.add({ severity: "success", summary: "Successo", detail: "Carro cadastrado!", life: 3000 });
    } catch (error) {
        toast.add({ severity: "error", summary: "Erro", detail: "Houve um problema!", life: 3000 });
    }
}

onMounted(() => {
    productService.buscarVersoes().then((data: Array<Versao>) => (versoes.value = data));
    productService.buscarMarcas().then((data: Array<Marca>) => (marcas.value = data));
    productService.buscarCombustiveis().then((data: Array<Combustivel>) => (combustiveis.value = data));
    productService.buscarOpcionais().then((data: Array<Opcional>) => (opcionais.value = data))
    contaAnos();
});

</script>

<template>
    <form @submit.prevent="cadastrar" >
        <div class="container mx-auto my-10 px-8 py-10 border rounded-lg shadow-lg">
        <h1 class="text-5xl font-semibold text-center mb-8">Cadastro de veículo</h1>
        <div class="flex flex-col items-center space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="field">
                <label for="id" class="mb-3">MARCA</label>
                <Dropdown class="border flex" v-model="marcaSelecionada" :options="marcas" optionLabel="nome" placeholder="Selecione a Marca" @change="marcaEscolhida" required />
            </div>
            <div class="field">
                <label for="inventoryStatus" class="mb-3">MODELO</label>
                <Dropdown class="border flex" v-model="modeloSelecionado" :options="modelos" optionLabel="nome" placeholder="Selecione o Modelo" required>
                </Dropdown>
            </div>
            <div class="field">
                <label for="name" class="mb-3">VERSÃO</label>
                <InputText class="rounded border flex w-17rem" placeholder="1.4 MPI ELX 8V FLEX 4P MANUAL" id="name" v-model.trim="versao" autofocus :invalid="submitted && null" required/>
            </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="field">
                <label for="quantity" class="mb-3">ANO DO CARRO</label>
                <Dropdown class="border flex" v-model="ano" :options="anos" optionLabel="" placeholder="Selecione o Ano" required />
<!-- 
                <InputNumber class="rounded border flex" id="quantity" v-model="ano" :min="0" :max="2024" integeronly :allowEmpty="false" /> -->
            </div>
            <div class="field">
                <label for="name" class="mb-3">ANO DO MODELO</label>
                <Dropdown class="border flex" v-model="anoModelo" :options="anos" optionLabel="" placeholder="Selecione o Ano" required />

                <!-- <InputNumber class="rounded border flex" id="name" v-model="anoModelo" :min="0" :max="2025" integeronly  required/> -->
            </div>
            <div class="field">
                <label for="price" class="mb-3">PREÇO</label>
                <InputNumber class="rounded border flex" id="price" v-model="preco" mode="currency" currency="BRL" locale="pt-BR" :invalid="submitted && !preco" required />
            </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="field">
                <label for="quantity" class="mb-3">QUILOMETRAGEM</label>
                <InputNumber class="rounded border flex" id="quantity" v-model.trim="quilometragem" suffix=" km" required />
            </div>
            <div class="field">
                <label for="combustivel" class="mb-3">COMBUSTÍVEL</label>
                <Dropdown class="border flex" v-model="combustivelSelecionado" :options="combustiveis" optionLabel="nome" placeholder="Selecione o tipo de combustível" required/>
            </div>
            <div class="field">
                <label for="location" class="mb-3">LOCALIZAÇÃO</label>
                <InputText class="rounded border flex w-17rem" id="location" v-model="localizacao" required/>
            </div>
            </div>
            <div class="flex flex-col items-center">
            <div class="mb-4 text-center">
                <label class="mb-4 text-xl">Opcionais</label>
                <div class="formgrid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center mt-5">
                <div v-for="opcional in opcionais" :key="String(opcional.id)" class="field-radiobutton col-span-1">
                    <RadioButton v-model="opcionalSelecionado" :inputId="String(opcional.id)" name="dynamic" :value="opcional"  />
                    <label :for="String(opcional.id)">{{opcional.nome}}</label>
                </div>
                </div>
            </div>
            <Button type="submit" required rounded severity="success" label="Salvar" class="m-5 py-2 px-4 rounded border">Salvar</Button>
            </div>
        </div>
        <ImageUploader></ImageUploader>
        </div>
    </form>
  </template>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  .field {
    width: 17rem;
    gap: 5px;
    margin-bottom: 5%;
  }
  </style>
  