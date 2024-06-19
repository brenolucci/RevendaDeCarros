<script setup>
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';




</script>

<!-- <app-menu></app-menu> -->
<template>
    <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="value1" placeholder="Search" />
    </IconField>

    <IconField>
        <InputText v-model="value2" />
        <InputIcon class="pi pi-spin pi-spinner" />
    </IconField>
</template>

<style lang="scss" scoped></style>