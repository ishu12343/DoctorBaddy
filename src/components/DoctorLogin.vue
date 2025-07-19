<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
    <h2 class="text-2xl font-semibold mb-6">Doctor Login</h2>
    <form @submit.prevent="loginDoctor">
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Password" class="input" required />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async loginDoctor() {
      try {
        const response = await fetch('http://localhost:8080/api/doctors/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        if (!response.ok) throw new Error('Invalid credentials');
        const data = await response.json();

        localStorage.setItem('token', data.token); // Save JWT
        alert('Login successful!');
        this.$router.push('/doctor-dashboard'); // Navigate after login
      } catch (err) {
        alert('Login failed: ' + err.message);
      }
    }
  }
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
