<script setup lang="ts">
import Nav from "./components/Nav.vue";
import { usePersistCart } from "./composables/usePersistCart";
import { almacenProductos } from "./stores/products";

const deProductos = almacenProductos();
deProductos.obtenerProductos();

usePersistCart();
</script>

<template>
  <Nav />
  <router-view></router-view>
</template>
