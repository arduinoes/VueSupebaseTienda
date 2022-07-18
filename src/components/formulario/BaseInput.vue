<template>
  <div class="container">
    <div class="mb-2">
      <label class="label">{{ label }}</label>
      <input
        type="text"
        class="input input-bordered input-accent w-full max-w-md"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as any).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>
