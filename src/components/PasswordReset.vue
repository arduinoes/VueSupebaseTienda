<script setup lang="ts">
import { ref } from 'vue'
import { almacenAuth } from '@/stores/user';

const user = almacenAuth()

const password = ref('')
</script>

<template>
<!-- ////////// Actualizar Contraseña ////////// -->
  <main class="w-full sm:w-1/2 xl:w-1/3">
    <div class="border-teal p-8 border-t-12 mb-6 rounded-lg shadow-lg bg-white">
      <div class="mb-4">
        <label class="font-bold text-grey-darker block mb-2">Contraseña</label>
        <input
          type="password"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Tú contraseña"
          v-model="(password)"
        />
      </div>

      <div class="flex flex-col gap-2">
        <a @click="user.handleUpdateUser({password: password})" href="#" class="btn btn-accent" tabindex="0">
          Actualizar contraseña
        </a>
      </div>
    </div>
  </main>
</template>

