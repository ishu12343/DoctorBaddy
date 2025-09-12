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
                <i class="fas fa-user text-2xl"></i>
              </div>
              <h1 class="text-2xl font-bold">Patient Login</h1>
              <p class="text-blue-100 mt-2">Access your healthcare portal</p>
            </div>

            <!-- Form -->
            <div class="p-6 lg:p-8">
              <form @submit.prevent="loginPatient" class="space-y-6">
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
                      placeholder="your.email@example.com"
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
                    <span class="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <button type="button" @click="showForgotPassword = true" class="text-sm text-brand-600 hover:text-brand-700">
                    Forgot password?
                  </button>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
                    <p class="text-sm text-red-700">{{ error }}</p>
                  </div>
                </div>

                <!-- Success Message -->
                <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div class="flex items-center">
                    <i class="fas fa-check-circle text-success-500 mr-2"></i>
                    <p class="text-sm text-green-700">{{ successMessage }}</p>
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
                  <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">Don't have an account?</span>
                </div>
              </div>

              <!-- Sign Up Link -->
              <div class="mt-6 text-center">
                <BaseButton @click="$router.push('/patient-signup')" variant="outline" :block="true">
                  <i class="fas fa-user-plus mr-2"></i>
                  Create Patient Account
                </BaseButton>
              </div>

              <!-- Quick Actions -->
              <div class="mt-6 grid grid-cols-2 gap-4 text-center">
                <button @click="$router.push('/')" class="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  <i class="fas fa-home mr-1"></i>
                  Back to Home
                </button>
                <button @click="$router.push('/doctor-login')" class="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  <i class="fas fa-stethoscope mr-1"></i>
                  Doctor Login
                </button>
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
                <i class="fas fa-mobile-alt"></i>
              </div>
              <p class="text-sm text-blue-100">Mobile Ready</p>
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
          <h3 class="text-xl font-bold text-gray-900 mb-2">Reset Password</h3>
          <p class="text-gray-600">Enter your email to receive a password reset link</p>
        </div>

        <form @submit.prevent="resetPassword" class="space-y-4">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input 
              v-model="resetEmail" 
              type="email" 
              required 
              class="form-input dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
              placeholder="your.email@example.com"
            />
          </div>

          <div class="flex gap-3">
            <BaseButton type="button" @click="showForgotPassword = false" variant="outline" class="flex-1">Cancel</BaseButton>
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
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'PatientLogin',
  components: { AppHeader, AppFooter, ChatButton, BaseButton },
  data() {
    return {
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
  methods: {
    validateForm() {
      this.emailError = '';
      this.passwordError = '';
      let isValid = true;

      if (!this.email) {
        this.emailError = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.emailError = 'Please enter a valid email address';
        isValid = false;
      }

      if (!this.password) {
        this.passwordError = 'Password is required';
        isValid = false;
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters';
        isValid = false;
      }

      return isValid;
    },

    async loginPatient() {
      this.error = '';
      this.successMessage = '';

      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;

      const requestBody = {
        email: this.email,
        password: this.password
      };

      console.log('Sending patient login payload:', requestBody);

      const loginUrl = 'http://127.0.0.1:5000/api/patient/login';

      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        const responseText = await response.clone().text();
        console.log('Patient login response:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText
        });

        if (!response.ok) {
          let errorMessage = 'Login failed. Please check your credentials.';
          try {
            const errorData = JSON.parse(responseText);
            if (errorData.error) errorMessage = errorData.error;
          } catch (_) {
            // Ignore parse error
          }
          throw new Error(errorMessage);
        }

        const data = JSON.parse(responseText);

        if (!data.token) {
          throw new Error('No authentication token received');
        }

        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'patient');
        
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        this.successMessage = 'Login successful! Redirecting...';
        
        // Redirect after a short delay to show success message
        setTimeout(() => {
          this.$router.push('/patient-dashboard');
        }, 1000);

      } catch (err) {
        this.error = err.message || 'Login failed. Please try again.';
        console.error('Patient login error:', err);
      } finally {
        this.isLoading = false;
      }
    },

    async resetPassword() {
      if (!this.resetEmail) {
        return;
      }

      this.isResetting = true;
      
      try {
        // Simulate API call for password reset
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.showForgotPassword = false;
        this.successMessage = 'Password reset link sent to your email!';
        this.resetEmail = '';
        
      } catch (error) {
        this.error = 'Failed to send reset email. Please try again.';
      } finally {
        this.isResetting = false;
      }
    }
  },
  mounted() {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (token && userType === 'patient') {
      this.$router.push('/patient-dashboard');
    }
  }
}
</script>

<style scoped>
/* Custom animation for modal */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
}

/* Responsive adjustments */
@media (width <= 576px) {
  .form-input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>