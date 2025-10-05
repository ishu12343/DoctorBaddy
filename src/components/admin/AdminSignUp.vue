<style scoped>
/* Enhanced Mobile Responsiveness */
@media (max-width: 1024px) {
  .container {
    padding: 1rem !important;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0.75rem !important;
  }
  
  .max-w-md {
    max-width: 100% !important;
    margin: 0 !important;
  }
  
  .bg-white {
    margin: 0 0.5rem !important;
    border-radius: 1rem !important;
  }
  
  .p-6 {
    padding: 1.5rem !important;
  }
  
  .lg\:p-8 {
    padding: 1.5rem !important;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem !important;
  }
  
  .bg-white {
    margin: 0 0.25rem !important;
    border-radius: 0.75rem !important;
  }
  
  .p-6, .lg\:p-8 {
    padding: 1rem !important;
  }
  
  .text-2xl {
    font-size: 1.5rem !important;
  }
  
  .w-16 {
    width: 3rem !important;
    height: 3rem !important;
  }
  
  .text-2xl {
    font-size: 1.25rem !important;
  }
  
  .space-y-6 > * + * {
    margin-top: 1rem !important;
  }
  
  .form-input {
    padding: 0.625rem 0.875rem !important;
    font-size: 0.9rem !important;
  }
  
  .btn-primary {
    padding: 0.75rem 1.25rem !important;
    font-size: 0.9rem !important;
  }
}

@media (max-width: 360px) {
  .container {
    padding: 0.25rem !important;
  }
  
  .bg-white {
    margin: 0 !important;
    border-radius: 0.5rem !important;
  }
  
  .p-6, .lg\:p-8 {
    padding: 0.75rem !important;
  }
}
</style>
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 pt-16 lg:pt-20 flex items-center justify-center bg-gradient-to-br from-medical-primary to-medical-secondary dark:from-gray-900 dark:to-gray-800">
      <div class="container py-8">
        <div class="max-w-md mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-brand-500 to-teal-500 p-6 text-center text-white">
              <div class="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i class="fas fa-user-shield text-2xl"></i>
              </div>
              <h1 class="text-2xl font-bold">Admin Registration</h1>
              <p class="text-blue-100 mt-2">Create a new administrator account</p>
            </div>

            <!-- Form -->
            <div class="p-6 lg:p-8">
              <form @submit.prevent="handleSignup" class="space-y-6">
                <!-- Error/Success Messages -->
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i> {{ error }}
                </div>
                <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 flex items-center gap-2">
                  <i class="fas fa-check-circle"></i> Registration successful! 🎉
                </div>

                <div class="form-group">
                  <label for="fullName" class="form-label">Full Name</label>
                  <input type="text" id="fullName" v-model="form.full_name" required class="form-input" />
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" v-model="form.email" required class="form-input" />
                </div>

                <div class="form-group">
                  <label for="mobile" class="form-label">Mobile Number</label>
                  <input type="tel" id="mobile" v-model="form.mobile" pattern="[0-9]{10}" placeholder="10-digit mobile number" class="form-input" />
                </div>

                <div class="form-group">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" id="password" v-model="form.password" required minlength="6" class="form-input" />
                </div>

                <div class="form-group">
                  <label for="role" class="form-label">Role</label>
                  <select id="role" v-model="form.role" class="form-input bg-gray-100" disabled>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <button type="submit" class="btn-primary w-full" :disabled="isLoading">
                  <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
                  {{ isLoading ? 'Registering...' : 'Register' }}
                </button>

                <p class="text-center text-sm text-gray-600">
                  Already have an account? 
                  <router-link to="/login?role=admin" class="font-medium text-brand-600 hover:text-brand-500">Login here</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import { BASE_URL } from '@/config/api';
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
        mobile: "",
        password: "",
        role: "ADMIN",
      },
      error: "",
      success: false,
    };
  },
  methods: {
    validateMobile(mobile) {
      if (!mobile) return true; // Mobile is optional
      const mobilePattern = /^[0-9]{10}$/;
      return mobilePattern.test(mobile);
    },
    
    async handleSignup() {
      this.isLoading = true;
      this.error = "";
      this.success = false;

      // Validate mobile number if provided
      if (this.form.mobile && !this.validateMobile(this.form.mobile)) {
        this.error = "Please enter a valid 10-digit mobile number";
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.post(`${BASE_URL}/admin/create`, this.form);
        const { token, admin } = response.data;

        // Store token in localStorage consistently
        localStorage.setItem("token", token);
        localStorage.setItem("adminInfo", JSON.stringify(admin));
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
.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

.form-input {
  @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2.5 px-3 border;
}

.btn-primary {
  @apply inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500;
}

.btn-primary:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}
</style>
