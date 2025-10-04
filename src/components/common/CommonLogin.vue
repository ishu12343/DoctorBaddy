<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1 pt-16 lg:pt-20 flex items-center justify-center bg-gradient-to-br from-medical-primary to-medical-secondary dark:from-gray-900 dark:to-gray-800">
      <div class="container py-8">
        <div class="max-w-md mx-auto">
          <!-- Login Card -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <!-- Role Selection Header -->
            <div class="bg-gradient-to-r from-brand-500 to-teal-500 p-6 text-center text-white">
              <div class="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i :class="getRoleIcon()" class="text-2xl"></i>
              </div>
              <h1 class="text-2xl font-bold">{{ getRoleTitle() }} Login</h1>
              <p class="text-blue-100 mt-2">{{ getRoleSubtitle() }}</p>
            </div>

            <!-- Role Selection Tabs -->
            <div class="bg-gray-50 dark:bg-gray-900 px-6 py-4">
              <div class="flex rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
                <button 
                  v-for="role in availableRoles" 
                  :key="role.key"
                  @click="selectRole(role.key)"
                  class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  :class="selectedRole === role.key 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
                >
                  <i :class="role.icon" class="text-sm"></i>
                  <span>{{ role.label }}</span>
                </button>
              </div>
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
                      class="form-input pl-10"
                      :class="{ 'border-red-500 focus:border-red-500': emailError }"
                      :placeholder="getEmailPlaceholder()"
                    />
                  </div>
                  <p v-if="emailError" class="text-sm text-red-600 mt-1">{{ emailError }}</p>
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
                      class="form-input pl-10 pr-10"
                      :class="{ 'border-red-500 focus:border-red-500': passwordError }"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                  <p v-if="passwordError" class="text-sm text-red-600 mt-1">{{ passwordError }}</p>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                  <label class="flex items-center">
                    <input 
                      v-model="rememberMe" 
                      type="checkbox" 
                      class="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                    />
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                  </label>

                  <button
                    type="button"
                    @click="showForgotPassword = true"
                    class="text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
                    <p class="text-sm text-red-800">{{ error }}</p>
                  </div>
                </div>

                <!-- Success Message -->
                <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                    <p class="text-sm text-green-800">{{ successMessage }}</p>
                  </div>
                </div>

                <!-- Login Button -->
                <BaseButton
                  type="submit"
                  :loading="isLoading"
                  class="w-full bg-gradient-to-r from-brand-500 to-teal-500 hover:from-brand-600 hover:to-teal-600"
                >
                  <i class="fas fa-sign-in-alt mr-2"></i>
                  {{ isLoading ? 'Signing in...' : `Sign in as ${getRoleTitle()}` }}
                </BaseButton>

                <!-- Sign Up Link -->
                <div class="text-center">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?
                    <button
                      type="button"
                      @click="goToSignUp"
                      class="text-brand-600 hover:text-brand-700 font-medium ml-1"
                    >
                      Sign up as {{ getRoleTitle() }}
                    </button>
                  </p>
                </div>
              </form>
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
                <i class="fas fa-mobile-alt"></i>
              </div>
              <p class="text-sm text-blue-100">{{ getRoleFeature() }}</p>
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
          <p class="text-gray-600 dark:text-gray-300">Enter your {{ selectedRole }} email to receive a password reset link</p>
        </div>

        <form @submit.prevent="resetPassword" class="space-y-4">
          <div class="form-group">
            <label class="form-label">{{ selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1) }} Email</label>
            <input 
              v-model="resetEmail" 
              type="email" 
              required 
              class="form-input dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
              :placeholder="getEmailPlaceholder()"
            />
          </div>

          <div class="flex gap-3">
            <BaseButton type="button" @click="showForgotPassword = false" variant="outline" class="flex-1">
              Cancel
            </BaseButton>
            <BaseButton type="submit" :loading="isResetting" class="flex-1">
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
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { BASE_URL } from '@/config/api';
import axios from 'axios';

export default {
  name: 'CommonLogin',
  components: { 
    AppHeader, 
    AppFooter, 
    ChatButton, 
    BaseButton 
  },
  data() {
    return {
      selectedRole: 'patient', // Default role
      availableRoles: [
        { key: 'patient', label: 'Patient', icon: 'fas fa-user' },
        { key: 'doctor', label: 'Doctor', icon: 'fas fa-user-md' },
        { key: 'admin', label: 'Admin', icon: 'fas fa-user-shield' }
      ],
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      error: '',
      successMessage: '',
      emailError: '',
      passwordError: '',
      showForgotPassword: false,
      resetEmail: '',
      isResetting: false
    }
  },
  mounted() {
    // Check for role from route params or query
    if (this.$route.params.role) {
      this.selectedRole = this.$route.params.role;
    } else if (this.$route.query.role) {
      this.selectedRole = this.$route.query.role;
    }
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (token && userType) {
      this.redirectToDashboard(userType);
    }
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role;
      this.clearMessages();
      this.clearForm();
    },
    
    getRoleIcon() {
      const icons = {
        patient: 'fas fa-user-injured',
        doctor: 'fas fa-user-md',
        admin: 'fas fa-user-shield'
      };
      return icons[this.selectedRole] || 'fas fa-user';
    },
    
    getRoleTitle() {
      return this.selectedRole.charAt(0).toUpperCase() + this.selectedRole.slice(1);
    },
    
    getRoleSubtitle() {
      const subtitles = {
        patient: 'Access your health records and appointments',
        doctor: 'Manage your practice and patients',
        admin: 'System administration and oversight'
      };
      return subtitles[this.selectedRole] || 'Welcome back';
    },
    
    getRoleFeature() {
      const features = {
        patient: 'Mobile Care',
        doctor: 'Smart Tools',
        admin: 'Analytics'
      };
      return features[this.selectedRole] || 'Mobile App';
    },
    
    getEmailPlaceholder() {
      const placeholders = {
        patient: 'patient@example.com',
        doctor: 'doctor@hospital.com',
        admin: 'admin@system.com'
      };
      return placeholders[this.selectedRole] || 'email@example.com';
    },
    
    clearMessages() {
      this.error = '';
      this.successMessage = '';
      this.emailError = '';
      this.passwordError = '';
    },
    
    clearForm() {
      this.email = '';
      this.password = '';
      this.rememberMe = false;
      this.showPassword = false;
    },
    
    validateForm() {
      this.clearMessages();
      let isValid = true;
      
      // Email validation
      if (!this.email) {
        this.emailError = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
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
      if (!this.validateForm()) {
        return;
      }
      
      this.isLoading = true;
      this.error = '';
      
      try {
        const response = await this.performLogin();
        
        if (response) {
          this.successMessage = `Welcome back! Redirecting to your ${this.selectedRole} dashboard...`;
          
          // Redirect after a short delay to show success message
          setTimeout(() => {
            this.redirectToDashboard(this.selectedRole);
          }, 1500);
        }
      } catch (error) {
        console.error('Login error:', error);
        this.error = error.message || `Failed to login as ${this.selectedRole}. Please check your credentials.`;
      } finally {
        this.isLoading = false;
      }
    },
    
    async performLogin() {
      const loginData = {
        email: this.email,
        password: this.password
      };
      
      if (this.selectedRole === 'admin') {
        // Admin login uses axios and different endpoint
        const response = await axios.post(`${BASE_URL}/admin/login`, loginData);
        
        // Admin login returns data directly without success wrapper
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
          localStorage.setItem('userType', 'admin');
          return response.data;
        } else {
          throw new Error(response.data.error || 'Admin login failed');
        }
      } else {
        // Patient and Doctor login use fetch with correct endpoints
        const endpoint = this.selectedRole === 'patient' 
          ? `${BASE_URL}/api/patient/login`
          : `${BASE_URL}/api/doctor/login`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || data.message || `${this.selectedRole.charAt(0).toUpperCase() + this.selectedRole.slice(1)} login failed`);
        }
        
        // Store user data consistently
        localStorage.setItem(`${this.selectedRole}Info`, JSON.stringify(data.patient || data.doctor));
        localStorage.setItem('userType', this.selectedRole);
        
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        return data;
      }
    },

    redirectToDashboard(userType) {
      // Check for redirect parameter
      const redirectTo = this.$route.query.redirect;
      
      if (redirectTo) {
        // Redirect to the original requested page
        this.$router.push(redirectTo);
      } else {
        // Default dashboard redirect
        const dashboardRoutes = {
          patient: '/patient-dashboard',
          doctor: '/doctor-dashboard',
          admin: '/admin-dashboard'
        };
        
        const route = dashboardRoutes[userType];
        if (route) {
          this.$router.push(route);
        }
      }
    },

    goToSignUp() {
      const signupRoutes = {
        patient: '/patient-signup',
        doctor: '/doctor-signup',
        admin: '/admin-signup'
      };
      
      const route = signupRoutes[this.selectedRole];
      if (route) {
        this.$router.push(route);
      }
    },

    async resetPassword() {
      if (!this.resetEmail) {
        this.error = 'Please enter your email address';
        return;
      }

      this.isResetting = true;
      this.error = '';

      try {
        // Simulate password reset request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.successMessage = `Password reset link sent to ${this.resetEmail}`;
        this.showForgotPassword = false;
        this.resetEmail = '';
      } catch (error) {
        this.error = 'Failed to send reset email. Please try again.';
      } finally {
        this.isResetting = false;
      }
    }
  }
}
</script>

<style scoped>
/* Form styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.dark .form-label {
  color: #d1d5db;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark .form-input {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.dark .form-input:focus {
  border-color: #60a5fa;
}

/* Brand colors */
.bg-brand-500 {
  background-color: #3b82f6;
}

.bg-brand-600 {
  background-color: #2563eb;
}

.text-brand-600 {
  color: #2563eb;
}

.text-brand-700 {
  color: #1d4ed8;
}

.border-brand-500 {
  border-color: #3b82f6;
}

.focus\:ring-brand-500:focus {
  --tw-ring-color: rgb(59 130 246);
}

/* Medical theme colors */
.from-medical-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.to-medical-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Animation */
@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .role-tab {
    border: 1px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-bounce-in {
    animation: none;
  }
}
</style>