<script setup lang="ts">
// vue
import { computed } from "vue";
// componentes
import PasswordReset from "@/components/PasswordReset.vue";
import Auth from "@/components/Auth.vue";
import ProductCardSkeleton from "../components/ProductCardSkeleton.vue";
import ProductCard from "../components/ProductCard.vue";
// supabase
import { getParameterByName } from "@/lib/helpers";
import { userSession } from "@/lib/useAuth";
// almacenes
import { almacenAuth } from "@/stores/user";
import { almacenProductos } from "../stores/products";

const deProductos = almacenProductos();
const user = almacenAuth();

// Se mostrará en el caso de que necesitemos recuperar/actualizar la contraseña
const showPasswordReset = computed(() => {
  const requestType = getParameterByName("type", location.href);
  return requestType === "recovery";
});

const products = computed(() => deProductos.list);
</script>

<template>
  <div
    v-if="showPasswordReset"
    class="w-full h-full flex flex-col justify-center items-center p-4"
  >
    <PasswordReset />
  </div>
  <div
    v-else-if="userSession === null"
    class="w-full h-full flex flex-col justify-center items-center p-4"
  >
    <Auth />
  </div>
  <div v-else class="p-4 max-w-7xl mx-auto">
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ProductCardSkeleton
        v-show="!deProductos.loaded"
        v-for="n in 15"
        :key="n"
      />
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div >
    <div class="flex justify-center">
    <button class="input input-bordered input-accent bg-white w-full max-w-xl" @click="user.handleLogout">
      Salir
    </button></div>
  </div>
</template>
