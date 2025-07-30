<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Admin Login</h2>

      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block mb-1 font-semibold">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      try {
        const response = await axios.post('http://127.0.0.1:5000/admin/login', {
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;
        const admin = response.data.admin;

        // Store token and admin info
        localStorage.setItem('token', token);
        localStorage.setItem('admin', JSON.stringify(admin));

        // Redirect to dashboard
        this.$router.push('/admin-dashboard');
      } catch (err) {
        console.error(err);
        this.error =
          err.response?.data?.error || 'Login failed. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 1px #2563eb;
}
</style>
