<script setup lang="ts">
import { ref } from 'vue'
import { almacenAuth } from '@/stores/user';

const user = almacenAuth()

const email = ref('')
const password = ref('')
</script>

<template>
  <main class="w-full flex justify-center sm:w-1/2 xl:w-1/3">
    <div class="border-teal p-8 border-t-12 mb-6 rounded-lg shadow-lg bg-white">
      <div class="form-control w-full max-w-xl">
        <label class="font-bold text-grey-darker block mb-2">Email</label>
     
        <input
          type="text"
          class="input input-bordered input-accent flex justify-center w-full max-w-xl"
          placeholder="Tú correo"
          v-model="email"
        />
      </div>
      <div class="form-control bg-white w-full max-w-xl">
        <label class="font-bold text-grey-darker block mb-2">Contraseña</label>
        <input
          type="password"
          class="input input-bordered input-accent bg-white w-full max-w-xl"
          placeholder="Tú contraseña"
          v-model="password"
        />
      </div>
<!-- ////////// Botón Registrarse, envía un email de validación  ////////// -->
      <div class="flex flex-col gap-2">
        <a @click="user.handleSignup({ email, password })" 
        href="#" 
        class="btn btn-sm btn-secondary btn-wide max-w-xl mt-4"
        tabindex="0">
          Regístrate
        </a>
<!-- ////////// Botón Iniciar Sesión (Loguearse) ////////// -->
        <a @click="user.handleLogin({ email, password })" 
        href="#" 
        class="btn btn-sm btn-accent text-white btn-wide max-w-xs mt-1"
        >
          <span v-if="password.length">Entrar</span>
          <span v-else> Enviar enlace mágico </span>
        </a>
      </div>
<!-- ////////// Botón Recuperar/Actualizar Contraseña ////////// -->
      <div class="mt-2 text-sm leading-5">
        <a
          @click.prevent="user.handlePasswordReset"
          href="/"
          class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          ¿Olvidaste la contraseña?
        </a>
      </div>
      <div class="mt-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm leading-5">
            <span class="px-2 bg-white text-gray-500">O continúa con</span>
          </div>
        </div>
   <!-- ////////// Registro con terceros, Github, Google... ////////// -->
        <div class="mt-6">
          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                @click="user.handleOAuthLogin('github')"
                type="button"
                class="btn btn-active btn-wide max-w-xs"
              >
                GitHub
              </button>
            </span>
          </div>
          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                @click="user.handleOAuthLogin('google')"
                type="button"
                class="btn btn-outline btn-wide max-w-xs"
              >
                Google
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

