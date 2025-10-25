<script setup>
import { useToastStore } from "../stores/useToastStore";

const toastStore = useToastStore();
</script>

<template>
  <div class="fixed top-12 sm:top-16 right-4 z-50 space-y-2">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      @click="toastStore.removeToast(toast.id)"
      class="px-4 py-3 rounded-lg shadow-md text-white cursor-pointer animate-slide-in"
      :class="{
        'bg-green-600': toast.type === 'success',
        'bg-red-600': toast.type === 'error',
        'bg-blue-600': toast.type === 'info'
      }"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-in-out;
}
</style>
