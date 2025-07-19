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
      password: '',
      error: ''
    };
  },
  methods: {
    async loginDoctor() {
      this.error = '';
      try {
        const requestBody = {
          email: this.email,
          password: this.password
        };
        
        const loginUrl = 'http://localhost:8080/api/doctors/login';
        console.log('Sending login request:', {
          url: loginUrl,
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: requestBody
        });
        
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(requestBody)
        });
        
        console.log('Received response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: await response.clone().text()
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

        // Store the token and user type in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'doctor');
        
        // Redirect to doctor dashboard
        this.$router.push('/doctor-dashboard');
      } catch (err) {
        this.error = err.message || 'Login failed. Please try again.';
        console.error('Login error:', err);
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
