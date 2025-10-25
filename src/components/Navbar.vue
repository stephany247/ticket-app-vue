<template>
  <nav class="bg-white border-b border-blue-300 shadow-sm sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="text-2xl font-bold text-blue-600">
        TicketPro
      </RouterLink>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-6">
        <RouterLink to="/" class="hover:text-blue-600 transition">
          Home
        </RouterLink>
        <RouterLink to="/dashboard" class="hover:text-blue-600 transition">
          Dashboard
        </RouterLink>
        <RouterLink to="/tickets" class="hover:text-blue-600 transition">
          Tickets
        </RouterLink>
      </div>

      <!-- Auth -->
      <div class="hidden md:flex items-center gap-4">
        <template v-if="user">
          <button
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/auth/login"
            class="text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/auth/register"
            class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </RouterLink>
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="md:hidden text-gray-700 text-3xl focus:outline-none"
      >
        <Icon icon="ci:hamburger-md" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t border-blue-300">
      <div class="flex flex-col p-4 space-y-3 text-center">
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/dashboard" @click="closeMenu">Dashboard</RouterLink>
        <RouterLink to="/tickets" @click="closeMenu">Tickets</RouterLink>

        <template v-if="user">
          <button
            @click="handleLogout"
            class="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-transparent bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/auth/login"
            @click="closeMenu"
            class="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-transparent bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/auth/register"
            @click="closeMenu"
            class="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-blue-600 bg-white text-blue-600 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../stores/useAuthStore";

const isOpen = ref(false);
const router = useRouter();
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { logout } = authStore;

// Methods
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const handleLogout = () => {
  logout();
  isOpen.value = false;
  router.push("/");
};
</script>
