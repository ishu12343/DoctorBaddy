<template>
  <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">User Login</h2>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Password" class="input" required />

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Login
      </button>
    </form>
    <p class="text-red-600 mt-2" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async loginUser() {
      this.error = '';
      try {
        const response = await fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);

        if (!response.ok) {
          const errorText = await response.text();
          this.error = errorText;
          return;
        }

        const user = await response.json();
        alert(`Welcome ${user.fullName}`);
      } catch (err) {
        this.error = 'Login failed. Try again later.';
      }
    }
  }
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
