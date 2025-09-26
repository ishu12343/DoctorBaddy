<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1 pt-16 lg:pt-20 flex items-center justify-center bg-gradient-to-br from-medical-primary to-medical-secondary dark:from-gray-900 dark:to-gray-800">
      <div class="container py-8">
        <div class="max-w-md mx-auto">
          <!-- Login Card -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-brand-500 to-teal-500 p-6 text-center text-white">
              <div class="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i class="fas fa-user-shield text-2xl"></i>
              </div>
              <h1 class="text-2xl font-bold">Admin Login</h1>
              <p class="text-blue-100 mt-2">Access your admin dashboard</p>
            </div>

            <!-- Form -->
            <div class="p-6 lg:p-8">
              <form @submit.prevent="handleLogin" class="space-y-6">
                <!-- Email Input -->
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input 
                      v-model="email" 
                      type="email" 
                      required 
                      class="form-input pl-10 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                      placeholder="admin@example.com"
                      :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': emailError }"
                    />
                  </div>
                  <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
                </div>

                <!-- Password Input -->
                <div class="form-group">
                  <label class="form-label">Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-lock text-gray-400"></i>
                    </div>
                    <input 
                      v-model="password" 
                      :type="showPassword ? 'text' : 'password'" 
                      required 
                      class="form-input pl-10 pr-10 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                      placeholder="Enter your password"
                      :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': passwordError }"
                    />
                    <button 
                      type="button" 
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <i :class="[showPassword ? 'fas fa-eye-slash' : 'fas fa-eye', 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300']"></i>
                    </button>
                  </div>
                  <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                  <label class="flex items-center">
                    <input v-model="rememberMe" type="checkbox" class="w-4 h-4 text-brand-500 focus:ring-brand-500 border-gray-300 rounded">
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Remember me</span>
                  </label>
                  <button type="button" @click="showForgotPassword = true" class="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
                    Forgot password?
                  </button>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
                    <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
                  </div>
                </div>

                <!-- Success Message -->
                <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                    <p class="text-sm text-green-700 dark:text-green-400">{{ successMessage }}</p>
                  </div>
                </div>

                <!-- Submit Button -->
                <BaseButton type="submit" :loading="isLoading" variant="primary" size="md" :block="true">
                  <i class="fas fa-sign-in-alt mr-2" v-if="!isLoading"></i>
                  {{ isLoading ? 'Signing In...' : 'Sign In' }}
                </BaseButton>
              </form>

              <!-- Divider -->
              <div class="mt-8 relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">Need help?</span>
                </div>
              </div>

              <!-- Back to Home -->
              <div class="mt-6 text-center">
                <BaseButton @click="$router.push('/')" variant="outline" :block="true">
                  <i class="fas fa-home mr-2"></i>
                  Back to Home
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="mt-8 grid grid-cols-3 gap-4 text-center text-white">
            <div class="space-y-2">
              <div class="w-10 h-10 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i class="fas fa-shield-alt"></i>
              </div>
              <p class="text-sm text-blue-100">Secure</p>
            </div>
            <div class="space-y-2">
              <div class="w-10 h-10 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i class="fas fa-clock"></i>
              </div>
              <p class="text-sm text-blue-100">24/7 Access</p>
            </div>
            <div class="space-y-2">
              <div class="w-10 h-10 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i class="fas fa-user-shield"></i>
              </div>
              <p class="text-sm text-blue-100">Admin Only</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showForgotPassword = false">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full animate-bounce-in">
        <div class="text-center mb-6">
          <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <i class="fas fa-key text-2xl text-brand-600"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h3>
          <p class="text-gray-600 dark:text-gray-300">Enter your admin email to receive a password reset link</p>
        </div>

        <form @submit.prevent="resetPassword" class="space-y-4">
          <div class="form-group">
            <label class="form-label">Admin Email</label>
            <input 
              v-model="resetEmail" 
              type="email" 
              required 
              class="form-input dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
              placeholder="admin@example.com"
            />
          </div>

          <div class="flex gap-3">
            <BaseButton type="button" @click="showForgotPassword = false" variant="outline" class="flex-1">
              Cancel
            </BaseButton>
            <BaseButton type="submit" :loading="isResetting" variant="primary" class="flex-1">
              <i class="fas fa-paper-plane mr-2" v-if="!isResetting"></i>
              {{ isResetting ? 'Sending...' : 'Send Reset Link' }}
            </BaseButton>
          </div>
        </form>
      </div>
    </div>

    <AppFooter />
    <ChatButton />
  </div>
</template>

<script>
import { BASE_URL } from '@/config/api';
import axios from 'axios';
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'AdminLogin',
  components: {
    AppHeader,
    AppFooter,
    ChatButton,
    BaseButton
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      emailError: '',
      passwordError: '',
      successMessage: '',
      showPassword: false,
      rememberMe: false,
      showForgotPassword: false,
      resetEmail: '',
      isLoading: false,
      isResetting: false
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      
      // Reset previous errors
      this.emailError = '';
      this.passwordError = '';
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Password validation
      if (!this.password) {
        this.passwordError = 'Password is required';
        isValid = false;
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters';
        isValid = false;
      }
      
      return isValid;
    },
    
    async handleLogin() {
      if (!this.validateForm()) return;
      
      this.error = '';
      this.isLoading = true;
      
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
        
        // Store remember me preference
        if (this.rememberMe) {
          localStorage.setItem('rememberAdmin', 'true');
        } else {
          localStorage.removeItem('rememberAdmin');
        }

        // Show success message and redirect
        this.successMessage = 'Login successful! Redirecting...';
        setTimeout(() => {
          this.$router.push('/admin-dashboard');
        }, 1500);
        
      } catch (err) {
        console.error('Login error:', err);
        this.error = err.response?.data?.error || 'Login failed. Please check your credentials and try again.';
      } finally {
        this.isLoading = false;
      }
    },
    
    async resetPassword() {
      if (!this.resetEmail) {
        this.error = 'Please enter your email address';
        return;
      }
      
      this.isResetting = true;
      
      try {
        // Replace with your actual admin password reset endpoint
        await axios.post(`${BASE_URL}/admin/forgot-password`, {
          email: this.resetEmail
        });
        
        this.successMessage = 'Password reset link has been sent to your email.';
        this.showForgotPassword = false;
        this.resetEmail = '';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
        
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to send reset link. Please try again later.';
      } finally {
        this.isResetting = false;
      }
    }
  },
  
  mounted() {
    // Check for remembered user
    if (localStorage.getItem('rememberAdmin') === 'true') {
      const savedAdmin = localStorage.getItem('admin');
      if (savedAdmin) {
        try {
          const admin = JSON.parse(savedAdmin);
          this.email = admin.email || '';
          this.rememberMe = true;
        } catch (e) {
          console.error('Error parsing saved admin data:', e);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Form Styles */
.form-group {
  @apply mb-4;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

.form-input {
  @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2.5 pl-10 pr-3 border;
}

/* Dark Mode Styles */
.dark .form-input {
  @apply bg-gray-900 border-gray-700 text-gray-100;
}

/* Animation for modal */
@keyframes bounce-in {
  0% { transform: scale(0.95); opacity: 0; }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); opacity: 1; }
}

.animate-bounce-in {
  animation: bounce-in 0.2s ease-out forwards;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    @apply px-4;
  }
  
  .login-card {
    @apply rounded-none shadow-none;
  }
}

/* Dark mode fixes */
.dark .text-gray-700 {
  @apply text-gray-300;
}

.dark .border-gray-300 {
  @apply border-gray-600;
}

/* Forgot password modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Ensure form inputs are visible in dark mode */
.dark input[type="email"],
.dark input[type="password"],
.dark input[type="text"] {
  @apply bg-gray-900 border-gray-700 text-white;
}

/* Style the eye icon for password visibility toggle */
.eye-icon {
  @apply absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300;
  cursor: pointer;
}
</style>

