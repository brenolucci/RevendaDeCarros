<script setup lang="ts">
import { onMounted, ref, toRaw} from 'vue';
import { ProductService } from '@/service/ProductService';
import Button from 'primevue/button';
import { useToast } from "primevue/usetoast";
// import ImageUploader from '@/components/ImageUploader.vue';
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
const opcionaisSelecionados = ref<Array<Opcional>>([]);
const ano = ref();
const anoModelo = ref();
const preco = ref();
const quilometragem = ref<String>();
const localizacao = ref<String>();
const toast = useToast();
const anos = ref<Array<Number>>([]);
const files = ref();

interface Event {
    files: Array<File>,
    xhr: any
}

function onAdvancedUpload(event: Event) {
    files.value = toRaw(event.files);
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

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
        const formData = new FormData();
        const modeloId = modeloSelecionado.value?.id;
        const combustivelId = combustivelSelecionado.value?.id;
        const opcionaisId = opcionaisSelecionados.value;
        formData.append('modelo_id', String(modeloId));
        formData.append('combustivel_id', String(combustivelId));
        formData.append('nome', versao.value);
        formData.append('preco', preco.value);
        formData.append('ano', ano.value);
        formData.append('ano_modelo', anoModelo.value);
        formData.append('quilometragem', String(quilometragem.value).toString());
        formData.append('localizacao', String(localizacao.value));
        formData.append('opcionais', String(opcionaisId));

        if(!files.value){
            toast.add({ severity: "error", summary: "Erro", detail: "Faça upload das imagens!!", life: 6000 });
            throw new Error("Por favor faça o upload das imagens!");
        }
      
        files.value.forEach((file: string | Blob) => {
            formData.append('files[]', file);
        });

        productService.cadastrarVersao(formData)
            .then(response => {
                if (response.status === 'error') {
                    toast.add({ severity: 'error', summary: "Ops!", detail: response.message, life: 3000 });                   
                } else {
                    toast.add({ severity: 'success', summary: "Successo", detail: response.message, life: 3000 });
                }
            });
        
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
        <div class="flex flex-col items-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
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
            <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
                <div class="field">
                    <label for="quantity" class="mb-3">ANO DO CARRO</label>
                    <Dropdown class="border flex" v-model="ano" :options="anos" optionLabel="" placeholder="Selecione o Ano" required />
                </div>
                <div class="field">
                    <label for="name" class="mb-3">ANO DO MODELO</label>
                    <Dropdown class="border flex" v-model="anoModelo" :options="anos" optionLabel="" placeholder="Selecione o Ano" required />
                </div>
                <div class="field">
                    <label for="price" class="mb-3">PREÇO</label>
                    <InputNumber class="rounded border flex" id="price" v-model="preco" mode="currency" currency="BRL" locale="pt-BR" :invalid="submitted && !preco" required />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
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
                <div class="flex gap-10 mt-3">
                    <div v-for="opcional in opcionais" :key="opcional.id" class="flex align-items-center">
                        <Checkbox v-model="opcionaisSelecionados" :inputId="`opcional-${opcional.id}`" name="category" :value="opcional.id" />
                        <label class="ml-2" :for="`opcional-${opcional.id}`">{{ opcional.nome }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        <Toast />
        <FileUpload name="demo[]" chooseLabel="Escolher imagens" accept="image/*" :showUploadButton="false" url="http://localhost/revendaCarro/hmtl/src/Controllers/UploadImg.php" @select="onAdvancedUpload($event)" :multiple="true"  :maxFileSize="1000000">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
    <Button type="submit" required rounded  label="Salvar" class="m-5 py-2 px-4 rounded border">Salvar</Button>
    <!-- <ImageUploader @select="cadastrar"></ImageUploader> -->
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
  