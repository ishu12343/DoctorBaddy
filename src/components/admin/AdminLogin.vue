<style scoped>
@media (width <= 900px) {
  .login-container {
    flex-direction: column !important;
    padding: 1rem !important;
    gap: 1.5rem !important;
  }
}

@media (width <= 600px) {
  .login-container {
    padding: 0.5rem 0.2rem !important;
    margin: 0 !important;
    width: 100vw;
    min-width: 0;
    box-sizing: border-box;
  }

  .login-form {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
}
</style>
<!-- <template>
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
</template> -->
<template>
  <AppHeader />
  <div class="login-container">
    <div class="login-card">
      <img src="@/assets/images/logo.png" alt="Logo" class="login-logo" />
      <h2>DoctorBuddy on admin</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" class="btn btn--primary btn--large">Log In</button>
      </form>
      <div class="login-footer">
        <router-link to="/">Back to Home</router-link>
      </div>
      <div class="login-footer">
        <router-link to="/admin-signup">Sign Up</router-link>
      </div>
    </div>
  </div>
  <AppFooter class="footer-fixed" />
</template>

<script>
import { BASE_URL } from '@/config/api';
import axios from 'axios';
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';

export default {
  name: 'AdminLogin',
  components: {
    AppHeader,
    AppFooter
  },
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
        const response = await axios.post(`${BASE_URL}/admin/login`, {
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
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, #5C9EF0 60%, #C8D67C 100%);
  }

.login-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgb(0 0 0 / 8%);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
}

.login-logo {
  height: 40px;
  margin-bottom: 1rem;
}

h2 {
  color: #275FD4;
  margin-bottom: 2rem;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.btn {
  width: 100%;
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center;
}

  .login-footer a {
    color: #275FD4;
    text-decoration: underline;
    font-size: 1rem;
  }

  .footer-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    z-index: 100;
  }
</style>

