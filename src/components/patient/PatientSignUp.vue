<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1 pt-16 lg:pt-20 bg-gradient-to-br from-medical-primary to-medical-secondary">
      <div class="container py-8">
        <div class="max-w-2xl mx-auto">
          <!-- Registration Card -->
          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-center text-white">
              <div class="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i class="fas fa-user-plus text-2xl"></i>
              </div>
              <h1 class="text-2xl font-bold">Create Patient Account</h1>
              <p class="text-orange-100 mt-2">Join our healthcare community</p>
            </div>

            <!-- Progress Bar -->
            <div class="p-6 border-b">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-600">Registration Progress</span>
                <span class="text-sm text-gray-500">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-500 h-2 rounded-full transition-all duration-500" :style="{ width: (currentStep / totalSteps) * 100 + '%' }"></div>
              </div>
            </div>

            <!-- Form -->
            <div class="p-6 lg:p-8">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                
                <!-- Step 1: Personal Information -->
                <div v-if="currentStep === 1" class="space-y-6" data-step="personal">
                  <div class="text-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-900">Personal Information</h2>
                    <p class="text-gray-600">Tell us about yourself</p>
                  </div>

                  <div class="grid md:grid-cols-2 gap-6">
                    <div class="form-group">
                      <label class="form-label">Full Name *</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i class="fas fa-user text-gray-400"></i>
                        </div>
                        <input 
                          v-model="formData.fullName" 
                          type="text" 
                          required 
                          class="form-input pl-10"
                          placeholder="Enter your full name"
                          :class="{ 'border-red-300': errors.fullName }"
                        />
                      </div>
                      <p v-if="errors.fullName" class="mt-1 text-sm text-red-600">{{ errors.fullName }}</p>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Date of Birth *</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i class="fas fa-calendar text-gray-400"></i>
                        </div>
                        <input 
                          v-model="formData.dateOfBirth" 
                          type="date" 
                          required 
                          class="form-input pl-10"
                          :max="maxDate"
                          :class="{ 'border-red-300': errors.dateOfBirth }"
                        />
                      </div>
                      <p v-if="errors.dateOfBirth" class="mt-1 text-sm text-red-600">{{ errors.dateOfBirth }}</p>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Gender *</label>
                    <div class="grid grid-cols-3 gap-4">
                      <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="{ 'border-orange-500 bg-orange-50': formData.gender === 'MALE' }">
                        <input v-model="formData.gender" type="radio" value="MALE" class="sr-only" required />
                        <div class="flex items-center gap-2">
                          <i class="fas fa-mars text-blue-500"></i>
                          <span class="text-sm font-medium">Male</span>
                        </div>
                      </label>
                      <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="{ 'border-orange-500 bg-orange-50': formData.gender === 'FEMALE' }">
                        <input v-model="formData.gender" type="radio" value="FEMALE" class="sr-only" required />
                        <div class="flex items-center gap-2">
                          <i class="fas fa-venus text-pink-500"></i>
                          <span class="text-sm font-medium">Female</span>
                        </div>
                      </label>
                      <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="{ 'border-orange-500 bg-orange-50': formData.gender === 'OTHER' }">
                        <input v-model="formData.gender" type="radio" value="OTHER" class="sr-only" required />
                        <div class="flex items-center gap-2">
                          <i class="fas fa-genderless text-purple-500"></i>
                          <span class="text-sm font-medium">Other</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Blood Group</label>
                    <select v-model="formData.bloodGroup" class="form-input">
                      <option value="">Select Blood Group (Optional)</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <!-- Step 2: Contact Information -->
                <div v-if="currentStep === 2" class="space-y-6" data-step="contact">
                  <div class="text-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-900">Contact Information</h2>
                    <p class="text-gray-600">How can we reach you?</p>
                  </div>

                  <div class="grid md:grid-cols-2 gap-6">
                    <div class="form-group">
                      <label class="form-label">Email Address *</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i class="fas fa-envelope text-gray-400"></i>
                        </div>
                        <input 
                          v-model="formData.email" 
                          type="email" 
                          required 
                          class="form-input pl-10"
                          placeholder="your.email@example.com"
                          :class="{ 'border-red-300': errors.email }"
                        />
                      </div>
                      <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Mobile Number *</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i class="fas fa-phone text-gray-400"></i>
                        </div>
                        <input 
                          v-model="formData.mobile" 
                          type="tel" 
                          required 
                          class="form-input pl-10"
                          placeholder="+1 (555) 123-4567"
                          :class="{ 'border-red-300': errors.mobile }"
                        />
                      </div>
                      <p v-if="errors.mobile" class="mt-1 text-sm text-red-600">{{ errors.mobile }}</p>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Address *</label>
                    <div class="relative">
                      <div class="absolute top-3 left-3 pointer-events-none">
                        <i class="fas fa-map-marker-alt text-gray-400"></i>
                      </div>
                      <textarea 
                        v-model="formData.address" 
                        required 
                        rows="3" 
                        class="form-input pl-10 resize-y"
                        placeholder="Enter your complete address"
                        :class="{ 'border-red-300': errors.address }"
                      ></textarea>
                    </div>
                    <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Emergency Contact Number</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-phone-alt text-gray-400"></i>
                      </div>
                      <input 
                        v-model="formData.emergencyContact" 
                        type="tel" 
                        class="form-input pl-10"
                        placeholder="+1 (555) 987-6543 (Optional)"
                      />
                    </div>
                    <p class="mt-1 text-xs text-gray-500">Emergency contact for medical situations</p>
                  </div>
                </div>

                <!-- Step 3: Account Security -->
                <div v-if="currentStep === 3" class="space-y-6" data-step="security">
                  <div class="text-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-900">Account Security</h2>
                    <p class="text-gray-600">Secure your account</p>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Password *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                      </div>
                      <input 
                        v-model="formData.password" 
                        :type="showPassword ? 'text' : 'password'" 
                        required 
                        minlength="6"
                        class="form-input pl-10 pr-10"
                        placeholder="Enter secure password"
                        :class="{ 'border-red-300': errors.password }"
                      />
                      <button 
                        type="button" 
                        @click="showPassword = !showPassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <i :class="[showPassword ? 'fas fa-eye-slash' : 'fas fa-eye', 'text-gray-400 hover:text-gray-600']"></i>
                      </button>
                    </div>
                    <div class="mt-1 text-xs space-y-1">
                      <div class="flex items-center gap-2">
                        <i :class="[passwordValidation.length ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500']"></i>
                        <span>At least 6 characters</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i :class="[passwordValidation.hasLetter ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500']"></i>
                        <span>Contains letters</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i :class="[passwordValidation.hasNumber ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500']"></i>
                        <span>Contains numbers</span>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Confirm Password *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                      </div>
                      <input 
                        v-model="confirmPassword" 
                        :type="showConfirmPassword ? 'text' : 'password'" 
                        required 
                        class="form-input pl-10 pr-10"
                        placeholder="Confirm your password"
                        :class="{ 'border-red-300': errors.confirmPassword }"
                      />
                      <button 
                        type="button" 
                        @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <i :class="[showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye', 'text-gray-400 hover:text-gray-600']"></i>
                      </button>
                    </div>
                    <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
                  </div>

                  <div class="space-y-4">
                    <label class="flex items-start gap-3">
                      <input v-model="agreeToTerms" type="checkbox" required class="mt-1 w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded">
                      <span class="text-sm text-gray-700">
                        I agree to the <a href="#" class="text-orange-500 hover:text-orange-600 underline">Terms of Service</a> 
                        and <a href="#" class="text-orange-500 hover:text-orange-600 underline">Privacy Policy</a>
                      </span>
                    </label>
                    
                    <label class="flex items-start gap-3">
                      <input v-model="subscribeNewsletter" type="checkbox" class="mt-1 w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded">
                      <span class="text-sm text-gray-700">
                        Subscribe to our newsletter for health tips and updates
                      </span>
                    </label>
                  </div>
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
                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                    <p class="text-sm text-green-700">{{ successMessage }}</p>
                  </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex justify-between gap-4">
                  <button 
                    v-if="currentStep > 1"
                    type="button" 
                    @click="previousStep"
                    class="btn btn-outline flex-1"
                  >
                    <i class="fas fa-chevron-left mr-2"></i>
                    Previous
                  </button>
                  
                  <button 
                    v-if="currentStep < totalSteps"
                    type="button" 
                    @click="nextStep"
                    class="btn bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 flex-1"
                  >
                    Next
                    <i class="fas fa-chevron-right ml-2"></i>
                  </button>
                  
                  <button 
                    v-if="currentStep === totalSteps"
                    type="submit" 
                    :disabled="isLoading || !canSubmit"
                    class="btn bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 flex-1"
                  >
                    <i v-if="!isLoading" class="fas fa-user-plus mr-2"></i>
                    <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                    {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                  </button>
                </div>
              </form>

              <!-- Already have account -->
              <div class="mt-8 text-center">
                <p class="text-gray-600">
                  Already have an account? 
                  <button @click="$router.push('/patient-login')" class="text-orange-500 hover:text-orange-600 font-medium">
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
    <ChatButton />
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';

export default {
  name: 'PatientSignUp',
  components: { AppHeader, AppFooter, ChatButton },
  data() {
    return {
      currentStep: 1,
      totalSteps: 3,
      isLoading: false,
      error: '',
      successMessage: '',
      showPassword: false,
      showConfirmPassword: false,
      confirmPassword: '',
      agreeToTerms: false,
      subscribeNewsletter: false,
      formData: {
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        address: '',
        emergencyContact: '',
        role: 'PATIENT'
      },
      errors: {}
    }
  },
  computed: {
    maxDate() {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
      return maxDate.toISOString().split('T')[0];
    },
    
    passwordValidation() {
      const password = this.formData.password;
      return {
        length: password.length >= 6,
        hasLetter: /[a-zA-Z]/.test(password),
        hasNumber: /\d/.test(password)
      };
    },
    
    canSubmit() {
      return this.agreeToTerms && 
             this.passwordValidation.length && 
             this.passwordValidation.hasLetter && 
             this.passwordValidation.hasNumber &&
             this.formData.password === this.confirmPassword;
    }
  },
  methods: {
    validateStep(step) {
      this.errors = {};
      let isValid = true;

      if (step === 1) {
        if (!this.formData.fullName) {
          this.errors.fullName = 'Full name is required';
          isValid = false;
        }
        if (!this.formData.dateOfBirth) {
          this.errors.dateOfBirth = 'Date of birth is required';
          isValid = false;
        }
        if (!this.formData.gender) {
          this.errors.gender = 'Gender is required';
          isValid = false;
        }
      }

      if (step === 2) {
        if (!this.formData.email) {
          this.errors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
          this.errors.email = 'Please enter a valid email address';
          isValid = false;
        }
        
        if (!this.formData.mobile) {
          this.errors.mobile = 'Mobile number is required';
          isValid = false;
        }
        
        if (!this.formData.address) {
          this.errors.address = 'Address is required';
          isValid = false;
        }
      }

      if (step === 3) {
        if (!this.formData.password) {
          this.errors.password = 'Password is required';
          isValid = false;
        } else if (!this.passwordValidation.length || !this.passwordValidation.hasLetter || !this.passwordValidation.hasNumber) {
          this.errors.password = 'Password does not meet requirements';
          isValid = false;
        }
        
        if (this.formData.password !== this.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match';
          isValid = false;
        }
      }

      return isValid;
    },

    nextStep() {
      if (this.validateStep(this.currentStep)) {
        this.currentStep++;
      }
    },

    previousStep() {
      this.currentStep--;
    },

    async handleSubmit() {
      this.error = '';
      this.successMessage = '';

      if (!this.validateStep(3) || !this.canSubmit) {
        return;
      }

      this.isLoading = true;

      try {
        const response = await fetch('http://127.0.0.1:5000/api/patient/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        
        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'patient');
        
        this.successMessage = 'Registration successful! Redirecting to your dashboard...';
        
        // Redirect after success message
        setTimeout(() => {
          this.$router.push('/patient-dashboard');
        }, 2000);

      } catch (error) {
        console.error('Registration error:', error);
        this.error = error.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
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
/* Responsive adjustments */
@media (width <= 576px) {
  .form-input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>