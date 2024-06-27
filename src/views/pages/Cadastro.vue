<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
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

function marcaEscolhida() {
    modelos.value = [];
    modeloSelecionado.value = <Modelo>{};
        marcaId.value = !marcaSelecionada.value ? undefined : marcaSelecionada.value.id;
        if(marcaId.value != undefined)
        productService.buscarModelosPorMarca(marcaId.value).then((data: Array<Modelo>) => (modelos.value = data));
}

function montarCarro() {

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
productService.buscarOpcionais().then((data: Array<Opcional>) => (opcionais.value = data));
});
</script>

<template>
<div class="container flex justify-center mx-auto my-10 p-5 border rounded-lg shadow-lg">
    <div class="flex-col">
        <h1 class="text-5xl font-semibold font flex justify-center mb-8" >Cadastro de veículo</h1>
        <div class="flex justify-center">
            <div class="field mx-5 px-2">
                <label for="id" class="mb-3">MARCA</label>
                <Dropdown class="border flex w-full" v-model="marcaSelecionada" :options="marcas" optionLabel="nome" placeholder="Selecione a Marca" @change="marcaEscolhida" />
            </div>
            <div class="field mx-5">
                <label for="inventoryStatus" class="mb-3">MODELO</label>
                <Dropdown class="border w-full" v-model="modeloSelecionado" :options="modelos" optionLabel="nome" placeholder="Selecione o Modelo">
                </Dropdown>
            </div>
            <div class="field mx-5">
                <label for="name" class="mb-3">VERSÃO</label>
                <InputText class="rounded border flex justify-center w-full py-2 px-2" placeholder="1.4 MPI ELX 8V FLEX 4P MANUAL" id="name" v-model.trim="versao" required="true" autofocus :invalid="submitted && null" />
                <small class="p-invalid" v-if="submitted && null">Name is required.</small>
            </div>
        </div>
        <div class=" flex justify-center">                   
            <div class="field mx-4">
                <label for="quantity">ANO DO CARRO</label>
                <InputNumber class="rounded border flex justify-center w-full py-2 px-2" id="quantity" v-model="ano" :min="0" :max="2024" integeronly />
            </div>
            <div class="field mx-4">
                <label for="name" >ANO DO MODELO</label>
                <InputNumber class="rounded border flex justify-center w-full  py-2 px-2" id="name" v-model="anoModelo" :min="0" :max="2025" integeronly />
            </div>
            <div class="field mx-4">
                <label for="price">PREÇO</label>
                <InputNumber class="rounded border flex justify-center w-full  py-2 px-2" id="price" v-model="preco" mode="currency" currency="BRL" locale="pt-BR" :invalid="submitted && !preco" :required="true" />
                <small class="p-invalid" v-if="submitted && !preco">Preço é obrigatório.</small>
            </div>
        </div>
        <img :src="'/demo/images/product/'" :alt="marcaSelecionada?.logo_url" v-if="marcaSelecionada?.logo_url" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
        <div class="flex justify-center">
            <div class="field mx-3">
                <label for="quantity" class="mb-3">QUILOMETRAGEM</label>
                <InputNumber class="rounded border flex justify-center" id="quantity" v-model="quilometragem" suffix=" km" stringonly />
            </div>
            <div class="field mx-3">
                <label for="combustivel" class="mb-3">COMBUSTÍVEL</label>
                <Dropdown class="border flex justify-center w-full " v-model="combustivelSelecionado" :options="combustiveis" optionLabel="nome" placeholder="Selecione o tipo de combustível" />
            </div>
            <div class="field mx-3">
                <label for="location" class="mb-3">LOCALIZAÇÃO</label>
                <InputText class="rounded border flex justify-center" id="location" v-model="localizacao" />
            </div>
        </div>
        <div class="ml-24 flex justify-center mt-3">
            <div class="field flex-col">
                <label class="mb-4">Opcionais</label>
                <div class="formgrid grid">
                    <div v-for="opcional in opcionais" :key="String(opcional.id)" class="field-radiobutton col-4">
                        <RadioButton v-model="opcionalSelecionado" :inputId="String(opcional.id)" name="dynamic" :value="opcional"  />
                        <label :for="String(opcional.id)">{{opcional.nome}}</label>
                    </div>
                </div>
                <Button @click="cadastrar" rounded outlined severity="success" label="primary" class="mt-5 py-2 px-4 rounded border">Salvar</Button>
            </div>
        </div>
        <ImageUploader></ImageUploader>
    </div>
</div>
</template>

<style scoped>
.container {
  max-width: 1980px;
}
</style>