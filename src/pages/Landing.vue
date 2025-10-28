<template>
  <main class="min-h-screen flex flex-col">
    <div class="w-full bg-white">
        <Hero />
    </div>

     <!-- FEATURES SECTION  -->
    <section class="bg-blue-50 pb-12">
      <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose TicketPro?
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(f, i) in features"
            :key="i"
            class="bg-white rounded-2xl shadow p-6 hover:shadow-md transition"
          >
            <div class="text-4xl mb-3">
              <Icon :icon="f.icon" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800">{{ f.title }}</h3>
            <p class="mt-2 text-gray-600 text-sm">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import Hero from "../components/Hero.vue";
import { Icon } from "@iconify/vue";

const features = [
  {
    title: "Quick Ticket Creation",
    desc: "Log issues in seconds with streamlined forms and smart validation.",
    icon: "fluent-emoji-flat:ticket",
  },
  {
    title: "Clear Status Tracking",
    desc: "Stay on top of open, in-progress, and closed tasks with intuitive tags.",
    icon: "twemoji:bar-chart",
  },
  {
    title: "Secure Sessions",
    desc: "Protected routes ensure only logged-in users can access dashboards.",
    icon: "fluent-color:lock-shield-16",
  },
  {
    title: "Resolve & Archive",
    desc: "Close or archive tickets with clear audit-friendly timestamps.",
    icon: "streamline-ultimate-color:archive-books",
  },
  {
    title: "LocalStorage Auth",
    desc: "Session tokens simulated with `ticketapp_session` for simplicity.",
    icon: "streamline-color:local-storage-folder",
  },
  {
    title: "Responsive Layout",
    desc: "Looks great on any device — mobile, tablet, or desktop.",
    icon: "streamline-ultimate-color:responsive-design-1",
  },
];
</script>
