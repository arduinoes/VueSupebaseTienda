<script setup lang="ts">
// vue
import { computed } from "vue";
// utilidades
import { toCurrency } from "../shared/utils";
// componentes
import CartCardSkeleton from "../components/CartCardSkeleton.vue";
import CartCard from "../components/CartCard.vue";
// almacenes
import { almacenCart } from "../stores/cart";
import { almacenProductos } from "../stores/products";

const cart = almacenCart();
const deProductos = almacenProductos();

const formattedCart = computed(() => cart.formattedCart);
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="!deProductos.loaded" class="space-y-4">
      <CartCardSkeleton v-for="n in 15" :key="n" />
    </div>
    <div v-else-if="!formattedCart.length">
      <h1 class="text-xl">Cart is empty.</h1>
    </div>
    <div v-else class="space-y-4">
      <CartCard
        v-for="(cartProduct, index) in formattedCart"
        :key="index"
        :cartProduct="cartProduct"
      />
      <div class="text-right text-2xl md:text-4xl">
        Total: {{ toCurrency(cart.total) }}
      </div>
    </div>
  </div>
</template>
