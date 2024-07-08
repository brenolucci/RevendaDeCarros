<script setup lang="ts">
import Alert from './components/Alert.vue'
import { useAuthStore } from './stores';

const authStore = useAuthStore();

</script>

<template>
    <div>
        <Alert />
        <router-view />
    </div>
</template>

<style scoped></style>
