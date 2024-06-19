<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import AppFilters from '@/lay'
</script>

<!-- <app-menu></app-menu> -->
<template>
   <TabView class="">
        <TabPanel header="Carro">
            <AppFilters>
        </TabPanel>
        <TabPanel header="Moto">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </TabPanel>
    </TabView>
</template>

<style lang="scss" scoped></style>
