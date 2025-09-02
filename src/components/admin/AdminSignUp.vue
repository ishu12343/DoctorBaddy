<style scoped>
@media (max-width: 900px) {
  .signup-container {
    flex-direction: column !important;
    padding: 1rem !important;
    gap: 1.5rem !important;
  }
}
@media (max-width: 600px) {
  .signup-container {
    padding: 0.5rem 0.2rem !important;
    margin: 0 !important;
    width: 100vw;
    min-width: 0;
    box-sizing: border-box;
  }
  .signup-form {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
}
</style>
<template>
  <div>
    <AppHeader />
    <div class="auth-page">
      <div class="auth-container">
        <h2>Admin Registration</h2>
        <form @submit.prevent="handleSignup" class="auth-form">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="form.full_name"
            required
            class="form-control"
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            minlength="6"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="form.role" class="form-control">
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Registering...' : 'Register' }}
          </button>
          <p class="login-link">
            Already have an account? <router-link to="/admin-login">Login here</router-link>
          </p>
        </div>

        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">Registration successful! 🎉</p>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import axios from "axios";

export default {
  name: 'AdminSignUp',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      isLoading: false,
      form: {
        full_name: "",
        email: "",
        password: "",
        role: "ADMIN",
      },
      error: "",
      success: false,
    };
  },
  methods: {
    async handleSignup() {
      this.isLoading = true;
      this.error = "";
      this.success = false;

      try {
        const response = await axios.post("http://127.0.0.1:5000/admin/create", this.form);
        const { token, admin } = response.data;

        // Store token in localStorage
        localStorage.setItem("admin_token", token);
        localStorage.setItem("userType", "admin");
        
        this.success = true;
        console.log("Admin signed up:", admin);
        this.$router.push("/admin-dashboard");
      } catch (err) {
        this.error = err.response?.data?.error || "Registration failed. Please try again.";
        console.error('Registration error:', err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fb;
  padding: 20px;
}

.auth-container {
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: #4a5568;
  font-size: 0.95rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.25rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;
}

.radio-label input[type="radio"] {
  margin: 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
  width: 100%;
}

.btn-primary {
  background-color: #4299e1;
  color: white;
}

.btn-primary:hover {
  background-color: #3182ce;
}

.btn-primary:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.login-link {
  text-align: center;
  color: #4a5568;
  margin-top: 0.5rem;
}

.login-link a {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
}

.success-message {
  color: #38a169;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
}
</style>
