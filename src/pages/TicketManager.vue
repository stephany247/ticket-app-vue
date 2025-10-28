<template>
  <main class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <!-- LEFT — Create/Edit Ticket Form -->
      <section
        class="bg-white rounded-2xl shadow-sm p-6 border border-blue-300 h-fit"
      >
        <h2 class="text-xl font-semibold mb-4">
          {{ editingId ? "Edit Ticket" : "Create New Ticket" }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-3">
          <!-- Title -->
          <div class="flex flex-col">
            <label for="title" class="text-sm font-medium text-gray-700">Title <span class="text-red-500">*</span></label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              placeholder="Enter ticket title"
              class="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="errors.title ? 'border-red-500' : 'border-blue-600'"
            />
            <p v-if="errors.title" class="text-red-500 text-xs mt-1">
              {{ errors.title }}
            </p>
          </div>

          <!-- Description -->
          <div class="flex flex-col">
            <label for="description" class="text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              placeholder="Describe the issue(Optional)"
              rows="4"
              class="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              :class="errors.description ? 'border-red-500' : 'border-blue-600'"
            ></textarea>
            <p v-if="errors.description" class="text-red-500 text-xs mt-1">
              {{ errors.description }}
            </p>
          </div>

          <!-- Priority -->
          <div class="flex flex-col">
            <label for="priority" class="text-sm font-medium text-gray-700"
              >Priority</label
            >
            <select
              id="priority"
              v-model="form.priority"
              class="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="errors.priority ? 'border-red-500' : 'border-blue-600'"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <p v-if="errors.priority" class="text-red-500 text-xs mt-1">
              {{ errors.priority }}
            </p>
          </div>

          <!-- Status -->
          <div class="flex flex-col">
            <label for="status" class="text-sm font-medium text-gray-700"
              >Status <span class="text-red-500">*</span></label
            >
            <select
              id="status"
              v-model="form.status"
              class="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="errors.status ? 'border-red-500' : 'border-blue-600'"
            >
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="text-red-500 text-xs mt-1">
              {{ errors.status }}
            </p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition-all"
          >
            {{ editingId ? "Update Ticket" : "Create Ticket" }}
          </button>
        </form>
      </section>

      <!-- RIGHT — Ticket List -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Tickets</h2>

        <p
          v-if="!tickets || tickets.length === 0"
          class="text-gray-500 text-sm"
        >
          No tickets yet.
        </p>

        <div v-else class="space-y-3">
          <div
            v-for="ticket in tickets"
            :key="ticket.id"
            class="bg-white rounded-2xl shadow-sm p-5 border border-blue-300"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-semibold capitalize text-gray-900">
                {{ ticket.title }}
              </h3>
              <span
                v-if="ticket.status"
                :class="[
                  'text-xs px-2 py-1 rounded-full capitalize',
                  statusClass(ticket.status),
                ]"
              >
                {{ formatStatus(ticket.status) }}
              </span>
            </div>

            <p class="text-sm text-gray-600 mt-2">
              {{ ticket.description || "No description provided." }}
            </p>

            <div class="flex items-center justify-between mt-3 text-sm">
              <span
                :class="[
                  'font-medium',
                  ticket.priority === 'High'
                    ? 'text-red-600'
                    : ticket.priority === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-green-600',
                ]"
              >
                Priority: {{ ticket.priority || "Low" }}
              </span>

              <div class="flex gap-2">
                <button
                  @click="handleEdit(ticket)"
                  class="text-blue-600 hover:underline text-sm cursor-pointer"
                >
                  Edit
                </button>
                <button
                  @click="handleDelete(ticket.id)"
                  class="text-red-600 hover:underline text-sm cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTicketStore } from "../stores/useTicketStore";

const ticketStore = useTicketStore();
const tickets = computed(() => ticketStore.getTickets());

const editingId = ref(null);
const form = ref({
  title: "",
  description: "",
  priority: "",
  status: "",
});

const errors = ref({});

// Format and style helpers
const formatStatus = (status) => {
  const map = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
  };
  return map[status] || status;
};

const statusClass = (status) => {
  const classes = {
    open: "bg-green-100 text-green-700",
    in_progress: "bg-amber-100 text-amber-700",
    closed: "bg-gray-100 text-gray-700",
  };
  return classes[status] || "bg-gray-100 text-gray-700";
};

// ✅ Validation logic
const validateForm = () => {
  errors.value = {};

  if (!form.value.title.trim()) {
    errors.value.title = "Title is required.";
  }

  const allowedStatuses = ["open", "in_progress", "closed"];
  if (!form.value.status) {
    errors.value.status = "Please select a status.";
  } else if (!allowedStatuses.includes(form.value.status)) {
    errors.value.status = "Invalid status selected.";
  }

  return Object.keys(errors.value).length === 0;
};

// ✅ Submit
const handleSubmit = () => {
  if (!validateForm()) return;

  if (editingId.value) {
    ticketStore.updateTicket(editingId.value, form.value);
  } else {
    ticketStore.createTicket(form.value);
  }

  form.value = { title: "", description: "", priority: "", status: "" };
  editingId.value = null;
  errors.value = {};
};

const handleEdit = (ticket) => {
  editingId.value = ticket.id;
  form.value = {
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priority,
    status: ticket.status,
  };
};

const handleDelete = (id) => {
  if (!confirm("Are you sure you want to delete this ticket?")) return;
  ticketStore.deleteTicket(id);
};
</script>
