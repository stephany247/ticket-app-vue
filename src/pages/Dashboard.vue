<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center p-4">
    <div class="w-full max-w-[1440px] mx-auto bg-white shadow-md rounded-xl p-8">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-2">
        Welcome, {{ user?.name }}!
      </h1>
      <p class="text-gray-600 text-center mb-8">
        Here's an overview of your ticket activity 🚀
      </p>

      <!-- Stats Section -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8 capitalize"
      >
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-5 text-center">
          <h3 class="text-lg font-semibold text-blue-700">Total Tickets</h3>
          <p class="text-3xl font-bold mt-2">{{ ticketStats.total }}</p>
        </div>
        <div
          class="bg-green-50 border border-green-200 rounded-lg p-5 text-center"
        >
          <h3 class="text-lg font-semibold text-green-700">Open Tickets</h3>
          <p class="text-3xl font-bold mt-2">{{ ticketStats.open }}</p>
        </div>
        <div
          class="bg-amber-50 border border-amber-200 rounded-lg p-5 text-center"
        >
          <h3 class="text-lg font-semibold text-amber-700">
            Tickets in progress
          </h3>
          <p class="text-3xl font-bold mt-2">{{ ticketStats.in_progress }}</p>
        </div>
        <div
          class="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center"
        >
          <h3 class="text-lg font-semibold text-gray-700">Closed Tickets</h3>
          <p class="text-3xl font-bold mt-2">{{ ticketStats.resolved }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          @click="goToTickets"
          class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out cursor-pointer"
        >
          Manage Tickets
        </button>
        <button
          @click="handleLogout"
          class="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";
import { useTicketStore } from "../stores/useTicketStore";
import { useToastStore } from "../stores/useToastStore";

const router = useRouter();
const authStore = useAuthStore();
const ticketStore = useTicketStore();
const toastStore = useToastStore();

const user = authStore.user;
const ticketStats = ref({
  total: 0,
  open: 0,
  resolved: 0,
  in_progress: 0,
});

onMounted(() => {
  if (!user) {
    toastStore.showToast("Unauthorized — please log in first.", "error");
    router.push("/auth/login");
    return;
  }

  const tickets = ticketStore.getTickets();

  ticketStats.value = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    resolved: tickets.filter((t) => t.status === "closed").length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
  };
});

function handleLogout() {
  authStore.logout();
  toastStore.showToast("Logged out successfully!", "success");
  router.push("/");
}

function goToTickets() {
  router.push("/tickets");
}
</script>
