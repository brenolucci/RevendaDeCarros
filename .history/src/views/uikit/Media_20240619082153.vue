<script setup>
import { ProductService } from '@/service/ProductService';
import { PhotoService } from '@/service/PhotoService';
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import Skyline from '@/assets/skylineR34.jpeg'

const products = ref([]);
const images = ref([]);
const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);
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

const product = ref({
    data: [
		{
			id: 1000,
			code: 'f230fh0g3',
			name: 'Skyline R34 - Nissan',
			description: 'Product Description',
			image:' @/assets/skylineR34.jpeg',
			price: 1579000,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
            rating: 5,
            orders: [
                {
                    id: 1000,
                    productCode: 'f230fh0g3',
                    date: '2020-09-13',
                    amount: 65,
                    quantity: 1,
                    customer: 'David James',
                    status: 'PENDING'
                },
                {
                    id: 1001,
                    productCode: 'f230fh0g3',
                    date: '2020-05-14',
                    amount: 130,
                    quantity: 2,
                    customer: 'Leon Rodrigues',
                    status: 'DELIVERED'
                },
                {
                    id: 1002,
                    productCode: 'f230fh0g3',
                    date: '2019-01-04',
                    amount: 65,
                    quantity: 1,
                    customer: 'Juan Alejandro',
                    status: 'RETURNED'
                },
                {
                    id: 1003,
                    productCode: 'f230fh0g3',
                    date: '2020-09-13',
                    amount: 195,
                    quantity: 3,
                    customer: 'Claire Morrow',
                    status: 'CANCELLED'
                }
            ]
        },
    ]

}) 



const productService = new ProductService();
const photoService = new PhotoService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
    photoService.getImages().then((data) => (images.value = data));
});

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
    <div class="grid p-fluid">
        <div class="col-12">
            <div class="card">
                <h5>Carousel</h5>
                <Carousel :value="products" :numVisible="5" :numScroll="5" :responsiveOptions="carouselResponsiveOptions">
                    <template #item="slotProps">
                        <div class="border-1 surface-border border-round w-auto m-2 ">
                            <div class="mb-3">
                                <div class="relative mx-auto">
                                    <img :src="Skyline" :alt="slotProps.data.name" class="w-full" />
                                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left: 3px; top: 5px" />
                                </div>
                            </div>
                            <div class="p-3">

                                <div class="mb-2 font-normal">{{ product.data[0].name }}</div>
                                <span class="mb-30">R34 GTR Vspec Rays Nismo LM 19x10.5J </span>
                                <div class="justify-content-between align-items-center mb-2">
                                    <div class="mt-3 font-semibold text-xl">${{ product.data[0].price }}</div>
                                    <div class="flex justify-content-between align-items-center mb-2">
                                        <span>2000/2001</span>
                                        <span>60.000KM</span>
                                    </div>
                                    <span class="flex justify-center">
                                        <Button class="ml-2" />
                                    </span>
                                    <hr/>
                                    <span class="flex justify-center">Florianópolis - SC</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>
