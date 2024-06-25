<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { ProductService } from '../../service/ProductService';
import ImageUploader from '@/components/ImageUploader.vue';


const renderComponent = ref(true);
const productDialog = ref(false);
const hideDialog = ref(false);
const productService = new ProductService();
const versoes = ref({});
const product = ref({});
const submitted = ref(false);
const statuses = ref([]);
const marcas = ref({});
const marcaSelecionada = ref();
const modelos = ref({});
const modeloSelecionado = ref();
const marcaId = ref();


function marcaEscolhida() {
    marcaId.value 
}

async function forceRerender() {
    renderComponent.value = false;
    await nextTick();
    renderComponent.value = true;
}

function criarContato(contato) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(contato)
  };
  fetch(`/api/criar.php`, requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.message);
      } else {
        forceRerender();
        alert("Contato criado com sucesso!");
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao criar contato');
    });
}

onMounted(() => {
    productService.buscarVersoes().then((data) => (versoes.value = data));
    productService.buscarModelosPorMarca().then((data) => (modelos.value = data));
    productService.buscarMarcas().then((data) => (marcas.value = data));
});


</script>


<template>
    <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
                    <img :src="'/demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="description">Description</label>
                        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <label class="mb-3">Category</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Price</label>
                            <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" :invalid="submitted && !product.price" :required="true" />
                            <small class="p-invalid" v-if="submitted && !product.price">Price is required.</small>
                        </div>
                        <div class="field col">
                            <label for="quantity">Quantity</label>
                            <InputNumber id="quantity" v-model="product.quantity" integeronly />
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text="" @click="criarContato" />
                    </template>
                </Dialog>
                <!-- Aqui termina o dialog  -->
                <!-- Aqui começa a pagina -->
                <div class="justify-center my-5 mr-5">
                    <ImageUploader></ImageUploader>
                    <div class="field">
                        <label for="id" class="mb-3">MARCA</label>
                        <Dropdown class="border w-full" id="id" v-model="marcaSelecionada" :options="marcas" optionLabel="nome" placeholder="Selecione a Marca" />
                    </div>
                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">MODELO</label>
                        <Dropdown class="border w-full" id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Selecione o Modelo">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>
                    <img :src="'/demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">VERSÃO</label>
                        <InputText class="border w-full py-2 px-2" placeholder="de" id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">COMBUSTÍVEL</label>
                        <Dropdown class="border w-full" id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Selecione o tipo de combustível">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>
                  


                    <div class="field">
                        <label class="mb-3">Opcionais</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="quantity">Ano do carro</label>
                            <InputNumber class="rounded border w-full" id="quantity" v-model="product.quantity" integeronly />
                        </div>
                        <div class="field col">
                            <label for="quantity">Ano do modelo</label>
                            <InputNumber class="rounded border w-full" id="quantity" v-model="product.quantity" integeronly />
                        </div>
                        <div class="field col">
                            <label for="price">Price</label>
                            <InputNumber class="rounded border w-full" id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" :invalid="submitted && !product.price" :required="true" />
                            <small class="p-invalid" v-if="submitted && !product.price">Price is required.</small>
                        </div>
                        <div class="field col">
                            <label for="quantity">Quantity</label>
                            <InputNumber class="rounded border w-full" id="quantity" v-model="product.quantity" integeronly />
                        </div>
                    </div>
                </div>
  </template>