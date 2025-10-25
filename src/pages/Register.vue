<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form
      @submit.prevent="handleRegister"
      class="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
    >
      <h2 class="text-xl font-bold text-center">Register</h2>

      <!-- Full Name Field -->
      <div class="space-y-2">
        <label for="fullName" class="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          id="fullName"
          placeholder="Full name"
          v-model="fullName"
          :class="[
            'w-full p-3 border rounded-md focus:outline-none focus:ring-2',
            fullNameError
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
        />
        <p v-if="fullNameError" class="text-red-500 text-sm">
          {{ fullNameError }}
        </p>
      </div>

      <!-- Email Field -->
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium">Email</label>
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

      <!-- Password Field -->
      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium">Password</label>
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

      <!-- Confirm Password Field -->
      <div class="space-y-2">
        <label for="confirmPassword" class="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          v-model="confirmPassword"
          :class="[
            'w-full p-3 border rounded-md focus:outline-none focus:ring-2',
            confirmError
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
        />
        <p v-if="confirmError" class="text-red-500 text-sm">
          {{ confirmError }}
        </p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
      >
        Register
      </button>

      <!-- Redirect -->
      <p class="text-center text-sm mt-3">
        Already have an account?
        <span
          class="text-blue-600 cursor-pointer hover:underline"
          @click="router.push('/auth/login')"
        >
          Login
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
const fullName = ref("");
const password = ref("");
const confirmPassword = ref("");
const emailError = ref("");
const fullNameError = ref("");
const passwordError = ref("");
const confirmError = ref("");

const validateFields = () => {
  let valid = true;
  emailError.value = "";
  fullNameError.value = "";
  passwordError.value = "";
  confirmError.value = "";

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

  // Full Name validation
  if (!fullName.value.trim()) {
    fullNameError.value = "Full Name is required";
    valid = false;
  } else if (fullName.value.length < 3) {
    fullNameError.value = "Full Name must be at least 3 characters";
    valid = false;
  }

  // Password validation
  if (!password.value.trim()) {
    passwordError.value = "Password is required";
    valid = false;
  } else if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters";
    valid = false;
  }

  // Confirm Password validation
  if (!confirmPassword.value.trim()) {
    confirmError.value = "Confirm your password";
    valid = false;
  } else if (confirmPassword.value !== password.value) {
    confirmError.value = "Passwords do not match";
    valid = false;
  }

  return valid;
};

const handleRegister = async () => {
  if (!validateFields()) {
    toast.showToast("Please fix the errors before submitting", "error");
    return;
  }

  const res = await auth.register(fullName.value, email.value, password.value);

  if (res.success) {
    toast.showToast("Registration successful!", "success");
    router.push("/dashboard");
  } else {
    toast.showToast(res.message, "error");
  }
};
</script>
