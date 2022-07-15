<script setup lang="ts">
import { computed } from "vue";
import Auth from "@/components/Auth.vue";
import PasswordReset from "@/components/PasswordReset.vue";
import ProductCard from "../components/ProductCard.vue";
import ProductCardSkeleton from "../components/ProductCardSkeleton.vue";
import { getParameterByName } from "@/lib/helpers";
import { almacenAuth } from "@/stores/user";
import { userSession } from "@/lib/useAuth";
import { almacenProductos } from "../stores/products";

const deProductos = almacenProductos();
const user = almacenAuth();

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
    </div>
    <button class="btn-black w-full mt-12" @click="user.handleLogout">
      Logout
    </button>
  </div>
</template>
