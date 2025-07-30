<template>
  <AppHeader @login="goToLogin" />
  <div class="login-container">
    <div class="login-card">
      <img src="@/assets/images/logo.png" alt="Logo" class="login-logo" />
      <h2>DoctorBuddy on patient</h2>
      <form @submit.prevent="loginPatient">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" class="btn btn--primary btn--large">Log In</button>
      </form>
      <div class="login-footer">
        <router-link to="/">Back to Home</router-link>
      </div>
      <div class="login-footer">
        <router-link to="/patient-signup">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
export default {
  name: 'LoginPage',
  components: {
    AppHeader
  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async loginPatient() {
      this.error = '';
      try {
        const response = await fetch('http://127.0.0.1:5000/api/patient/login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
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

        // Redirect to patient dashboard first
        this.$router.push('/patient-dashboard');

        // Then fetch profile data with token
        const profileResponse = await fetch('http://127.0.0.1:5000/api/patient/profile?id=1', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Accept': 'application/json'
          }
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          localStorage.setItem('patientProfile', JSON.stringify(profileData));
        }
        // Optionally handle profile fetch errors silently or show a message
      } catch (err) {
        this.error = err.message || 'Login failed. Please try again.';
      }
    }
  }
}
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
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
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
</style>
