<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form
      @submit.prevent="handleLogin"
      class="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
    >
      <h2 class="text-xl font-bold text-center">Login</h2>

      <!-- Email -->
      <div class="space-y-1">
        <label for="email" class="block font-medium">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          v-model="email"
          :class="[
            'w-full p-3 border rounded-md focus:outline-none focus:ring-2',
            emailError
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
        />
        <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
      </div>

      <!-- Password -->
      <div class="space-y-1">
        <label for="password" class="block font-medium">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="password"
          :class="[
            'w-full p-3 border rounded-md focus:outline-none focus:ring-2',
            passwordError
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
        />
        <p v-if="passwordError" class="text-red-500 text-sm">
          {{ passwordError }}
        </p>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 mt-4 rounded-md transition duration-200 cursor-pointer"
      >
        Login
      </button>

      <p class="text-center text-sm">
        Don’t have an account?
        <span
          class="text-blue-600 cursor-pointer hover:underline"
          @click="router.push('/auth/register')"
        >
          Register
        </span>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToastStore } from "../stores/useToastStore";
import { useAuthStore } from "../stores/useAuthStore";

const router = useRouter();
const toast = useToastStore();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");

const validateFields = () => {
  let valid = true;
  emailError.value = "";
  passwordError.value = "";

  // Email validation
  if (!email.value.trim()) {
    emailError.value = "Email is required";
    valid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      emailError.value = "Enter a valid email address";
      valid = false;
    }
  }

  // Password validation
  if (!password.value.trim()) {
    passwordError.value = "Password is required";
    valid = false;
  } else if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters";
    valid = false;
  }

  return valid;
};

const handleLogin = async () => {
  if (!validateFields()) {
    toast.showToast("Please fix the errors before submitting", "error");
    return;
  }

  const res = await auth.login(email.value, password.value);

  if (res.success) {
    toast.showToast("Login successful!", "success");
    router.push("/dashboard");
  } else {
    toast.showToast(res.message, "error");
  }
};
</script>
