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
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',  // Important for sending/receiving cookies
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || 'Login failed. Please check your credentials.';
          throw new Error(errorMessage);
        }

        const data = await response.json();
        if (!data.token) {
          throw new Error('No authentication token received');
        }

        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'patient');
        
        // Redirect to patient dashboard
        this.$router.push('/patient-dashboard');
      } catch (err) {
        this.error = err.message || 'Login failed. Please try again.';
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
