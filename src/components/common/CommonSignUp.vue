<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 opacity-30">
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-white/[0.02] bg-grid-16"></div>
      
      <!-- Radial Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/20 to-violet-900/40"></div>
    </div>
    
    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
      <div class="absolute top-20 right-20 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
      <div class="absolute bottom-20 left-20 w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>
      <div class="absolute bottom-40 right-40 w-1 h-1 bg-white/50 rounded-full animate-ping"></div>
    </div>
    
    <AppHeader />
    
    <main class="flex-1 pt-20 lg:pt-20 flex items-center justify-center px-3 py-2 sm:py-4 relative z-10 min-h-0">
      <div class="w-full max-w-2xl mx-auto">
        <!-- SignUp Card -->
        <div class="bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/50 overflow-hidden">
          <!-- Role Selection Header -->
          <div class="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 p-4 sm:p-6 text-center text-white">
            <!-- Background Pattern -->
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <i :class="getRoleIcon()" class="text-xl sm:text-2xl drop-shadow-sm"></i>
              </div>
              <h1 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 drop-shadow-sm">{{ getRoleTitle() }} Registration</h1>
              <p class="text-indigo-100 text-xs sm:text-sm font-medium opacity-90 hidden sm:block">{{ getRoleSubtitle() }}</p>
            </div>
          </div>

          <!-- Role Selection Tabs -->
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-3 sm:px-4 py-3 sm:py-4">
            <div class="flex rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 p-0.5 sm:p-1 shadow-inner border border-gray-200 dark:border-gray-700">
              <button 
                v-for="role in availableRoles" 
                :key="role.key"
                @click="selectRole(role.key)"
                class="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                :class="selectedRole === role.key 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700'"
              >
                <i :class="role.icon" class="text-sm sm:text-base"></i>
                <span class="hidden sm:inline">{{ role.label }}</span>
                <span class="sm:hidden text-xs">{{ role.label }}</span>
              </button>
            </div>
          </div>

          <!-- Form Content -->
          <div class="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800">
            <!-- Patient SignUp Form -->
            <form v-if="selectedRole === 'patient'" @submit.prevent="handlePatientSignup" class="space-y-4 sm:space-y-6">
              <!-- Progress Bar for Patient -->
              <div v-if="selectedRole === 'patient'" class="mb-4 sm:mb-6">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Registration Progress</span>
                  <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-500">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500" :style="{ width: (currentStep / totalSteps) * 100 + '%' }"></div>
                </div>
              </div>

              <!-- Error/Success Messages -->
              <div v-if="error" class="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <div class="flex items-center">
                  <i class="fas fa-exclamation-circle text-red-500 dark:text-red-400 mr-2"></i>
                  <p class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
                </div>
              </div>

              <div v-if="successMessage" class="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 dark:text-green-400 mr-2"></i>
                  <p class="text-sm text-green-700 dark:text-green-300">{{ successMessage }}</p>
                </div>
              </div>

              <!-- Step 1: Personal Information -->
              <div v-if="currentStep === 1" class="space-y-4 sm:space-y-6">
                <div class="text-center mb-4 sm:mb-6">
                  <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Tell us about yourself</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label">Full Name *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-user text-gray-400"></i>
                      </div>
                      <input 
                        v-model="patientForm.fullName"
                        type="text"
                        required
                        class="form-input pl-10"
                        placeholder="Enter your full name"
                        :class="{ 'border-red-300': errors.fullName }"
                      />
                    </div>
                    <p v-if="errors.fullName" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.fullName }}</p>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Date of Birth *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-calendar text-gray-400"></i>
                      </div>
                      <input 
                        v-model="patientForm.dateOfBirth"
                        type="date"
                        required
                        :max="maxDate"
                        class="form-input pl-10"
                        :class="{ 'border-red-300': errors.dateOfBirth }"
                      />
                    </div>
                    <p v-if="errors.dateOfBirth" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.dateOfBirth }}</p>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Gender *</label>
                  <div class="grid grid-cols-3 gap-2 sm:gap-4">
                    <label class="flex items-center p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm" :class="{ 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50': patientForm.gender === 'MALE' }">
                      <input v-model="patientForm.gender" type="radio" value="MALE" class="sr-only">
                      <i class="fas fa-mars text-blue-500 mr-2"></i>
                      <span class="text-gray-900 dark:text-white">Male</span>
                    </label>
                    <label class="flex items-center p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm" :class="{ 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50': patientForm.gender === 'FEMALE' }">
                      <input v-model="patientForm.gender" type="radio" value="FEMALE" class="sr-only">
                      <i class="fas fa-venus text-pink-500 mr-2"></i>
                      <span class="text-gray-900 dark:text-white">Female</span>
                    </label>
                    <label class="flex items-center p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm" :class="{ 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50': patientForm.gender === 'OTHER' }">
                      <input v-model="patientForm.gender" type="radio" value="OTHER" class="sr-only">
                      <i class="fas fa-genderless text-purple-500 mr-2"></i>
                      <span class="text-gray-900 dark:text-white">Other</span>
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Blood Group</label>
                  <select v-model="patientForm.bloodGroup" class="form-input">
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
              <div v-if="currentStep === 2" class="space-y-4 sm:space-y-6">
                <div class="text-center mb-4 sm:mb-6">
                  <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">How can we reach you?</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-envelope text-gray-400"></i>
                      </div>
                      <input 
                        v-model="patientForm.email"
                        type="email"
                        required
                        class="form-input pl-10"
                        placeholder="your@email.com"
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
                        v-model="patientForm.mobile"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        class="form-input pl-10"
                        placeholder="10-digit mobile number"
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
                      <i class="fas fa-home text-gray-400"></i>
                    </div>
                    <textarea 
                      v-model="patientForm.address"
                      required
                      rows="3"
                      class="form-input pl-10"
                      placeholder="Enter your full address"
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
                      v-model="patientForm.emergencyContact"
                      type="tel"
                      class="form-input pl-10"
                      placeholder="Emergency contact (Optional)"
                    />
                  </div>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Emergency contact for medical situations</p>
                </div>
              </div>

              <!-- Step 3: Account Security -->
              <div v-if="currentStep === 3" class="space-y-4 sm:space-y-6">
                <div class="text-center mb-4 sm:mb-6">
                  <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Account Security</h2>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Secure your account</p>
                </div>

                <div class="form-group">
                  <label class="form-label">Password *</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-lock text-gray-400"></i>
                    </div>
                    <input 
                      v-model="patientForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      minlength="6"
                      class="form-input pl-10 pr-10"
                      placeholder="Create a strong password"
                      :class="{ 'border-red-300': errors.password }"
                    />
                    <button 
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400"></i>
                    </button>
                  </div>
                  <div class="mt-1 text-xs space-y-1">
                    <div class="flex items-center gap-2">
                      <i :class="passwordValidation.length ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'" class="text-xs"></i>
                      <span class="text-gray-600 dark:text-gray-400">At least 6 characters</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i :class="passwordValidation.hasLetter ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'" class="text-xs"></i>
                      <span class="text-gray-600 dark:text-gray-400">Contains letters</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i :class="passwordValidation.hasNumber ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'" class="text-xs"></i>
                      <span class="text-gray-600 dark:text-gray-400">Contains numbers</span>
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
                      <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400"></i>
                    </button>
                  </div>
                  <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.confirmPassword }}</p>
                </div>

                <div class="space-y-4">
                  <label class="flex items-start gap-3">
                    <input v-model="agreeToTerms" type="checkbox" required class="mt-1 w-4 h-4 text-indigo-500 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded">
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      I agree to the <a href="#" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline">Terms of Service</a> and 
                      <a href="#" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline">Privacy Policy</a>
                    </span>
                  </label>
                  
                  <label class="flex items-start gap-3">
                    <input v-model="subscribeNewsletter" type="checkbox" class="mt-1 w-4 h-4 text-indigo-500 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded">
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Subscribe to health tips and updates
                    </span>
                  </label>
                </div>
              </div>

              <!-- Navigation Buttons for Patient -->
              <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-8">
                <button 
                  v-if="currentStep > 1"
                  type="button" 
                  @click="previousStep"
                  class="btn btn-secondary flex-1 order-2 sm:order-1"
                >
                  <i class="fas fa-chevron-left mr-2"></i>
                  Previous
                </button>
                
                <button 
                  v-if="currentStep < totalSteps"
                  type="button" 
                  @click="nextStep"
                  class="btn btn-primary flex-1 order-1 sm:order-2"
                >
                  Next
                  <i class="fas fa-chevron-right ml-2"></i>
                </button>
                
                <button 
                  v-if="currentStep === totalSteps"
                  type="submit" 
                  :disabled="isLoading || !canSubmit"
                  class="btn btn-primary disabled:opacity-50 flex-1 order-1"
                >
                  <i v-if="!isLoading" class="fas fa-user-plus mr-2"></i>
                  <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                  {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                </button>
              </div>
            </form>

            <!-- Doctor SignUp Form -->
            <form v-if="selectedRole === 'doctor'" @submit.prevent="handleDoctorSignup" class="space-y-4 sm:space-y-6">
              <!-- Progress Bar for Doctor -->
              <div class="mb-4 sm:mb-6">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Registration Progress</span>
                  <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-500">{{ Math.round((doctorStep / doctorTotalSteps) * 100) }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500" :style="{ width: (doctorStep / doctorTotalSteps) * 100 + '%' }"></div>
                </div>
              </div>

              <!-- Error/Success Messages -->
              <div v-if="error" class="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <div class="flex items-center">
                  <i class="fas fa-exclamation-circle text-red-500 dark:text-red-400 mr-2"></i>
                  <p class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
                </div>
              </div>

              <!-- Step 1: Personal Information -->
              <div v-if="doctorStep === 1" class="space-y-4 sm:space-y-6">
                <div class="text-center mb-4 sm:mb-6">
                  <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Tell us about yourself</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label for="fullName" class="form-label">Full Name *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-user text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="fullName" 
                        v-model="doctorForm.fullName" 
                        required 
                        class="form-input pl-10" 
                        placeholder="Enter your full name" 
                        :class="{ 'border-red-300': errors.doctorFullName }"
                      />
                    </div>
                    <p v-if="errors.doctorFullName" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.doctorFullName }}</p>
                  </div>
                  <div class="form-group">
                    <label for="name" class="form-label">Preferred Name *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-user-circle text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="name" 
                        v-model="doctorForm.name" 
                        required 
                        class="form-input pl-10" 
                        placeholder="How should we address you?" 
                        :class="{ 'border-red-300': errors.doctorName }"
                      />
                    </div>
                    <p v-if="errors.doctorName" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.doctorName }}</p>
                  </div>
                  <div class="form-group">
                    <label for="email" class="form-label">Email Address *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-envelope text-gray-400"></i>
                      </div>
                      <input 
                        type="email" 
                        id="email" 
                        v-model="doctorForm.email" 
                        required 
                        class="form-input pl-10" 
                        placeholder="your@email.com" 
                        :class="{ 'border-red-300': errors.doctorEmail }"
                      />
                    </div>
                    <p v-if="errors.doctorEmail" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.doctorEmail }}</p>
                  </div>
                  <div class="form-group">
                    <label for="mobile" class="form-label">Mobile Number *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-phone text-gray-400"></i>
                      </div>
                      <input 
                        type="tel" 
                        id="mobile" 
                        v-model="doctorForm.mobile" 
                        pattern="[0-9]{10}" 
                        title="Please enter a 10-digit mobile number" 
                        required 
                        class="form-input pl-10" 
                        placeholder="10-digit mobile number" 
                        :class="{ 'border-red-300': errors.doctorMobile }"
                      />
                    </div>
                    <p v-if="errors.doctorMobile" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.doctorMobile }}</p>
                  </div>
                  <div class="form-group">
                    <label for="password" class="form-label">Password *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                      </div>
                      <input 
                        type="password" 
                        id="password" 
                        v-model="doctorForm.password" 
                        minlength="6" 
                        required 
                        class="form-input pl-10" 
                        placeholder="Create a strong password" 
                        :class="{ 'border-red-300': errors.doctorPassword }"
                      />
                    </div>
                    <p v-if="errors.doctorPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.doctorPassword }}</p>
                  </div>
                  <div class="form-group">
                    <label for="gender" class="form-label">Gender *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-venus-mars text-gray-400"></i>
                      </div>
                      <select 
                        id="gender" 
                        v-model="doctorForm.gender" 
                        required 
                        class="form-input pl-10" 
                        :class="{ 'border-red-300': errors.doctorGender }"
                      >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <p v-if="errors.doctorGender" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.doctorGender }}</p>
                  </div>
                </div>
              </div>

              <!-- Step 2: Professional Information -->
              <div v-if="doctorStep === 2" class="space-y-4 sm:space-y-6">
                <div class="text-center mb-4 sm:mb-6">
                  <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Professional Information</h2>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Your medical credentials</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label for="registrationNumber" class="form-label">Registration Number *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-id-card text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="registrationNumber" 
                        v-model="doctorForm.registrationNumber" 
                        required 
                        class="form-input pl-10" 
                        placeholder="Enter registration number" 
                        :class="{ 'border-red-300': errors.registrationNumber }"
                      />
                    </div>
                    <p v-if="errors.registrationNumber" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.registrationNumber }}</p>
                  </div>
                  <div class="form-group">
                    <label for="council" class="form-label">Medical Council *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-building text-gray-400"></i>
                      </div>
                      <select 
                        id="council" 
                        v-model="doctorForm.council" 
                        required 
                        class="form-input pl-10" 
                        :class="{ 'border-red-300': errors.council }"
                      >
                        <option value="">Select Council</option>
                        <option value="MCI">MCI (Medical Council of India)</option>
                        <option value="SMC">State Medical Council</option>
                      </select>
                    </div>
                    <p v-if="errors.council" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.council }}</p>
                  </div>
                  <div class="form-group">
                    <label for="specialty" class="form-label">Specialty *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-stethoscope text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="specialty" 
                        v-model="doctorForm.specialty" 
                        required 
                        class="form-input pl-10" 
                        placeholder="e.g., Cardiology, Pediatrics" 
                        :class="{ 'border-red-300': errors.specialty }"
                      />
                    </div>
                    <p v-if="errors.specialty" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.specialty }}</p>
                  </div>
                  <div class="form-group">
                    <label for="experience" class="form-label">Years of Experience *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-calendar-alt text-gray-400"></i>
                      </div>
                      <input 
                        type="number" 
                        id="experience" 
                        v-model.number="doctorForm.experience" 
                        min="0" 
                        required 
                        class="form-input pl-10" 
                        placeholder="Years of experience" 
                        :class="{ 'border-red-300': errors.experience }"
                      />
                    </div>
                    <p v-if="errors.experience" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.experience }}</p>
                  </div>
                  <div class="form-group">
                    <label for="degree" class="form-label">Highest Degree *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-graduation-cap text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="degree" 
                        v-model="doctorForm.degree" 
                        required 
                        class="form-input pl-10" 
                        placeholder="e.g., MBBS, MD, MS" 
                        :class="{ 'border-red-300': errors.degree }"
                      />
                    </div>
                    <p v-if="errors.degree" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.degree }}</p>
                  </div>
                  <div class="form-group">
                    <label for="licenseNumber" class="form-label">License Number *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-certificate text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="licenseNumber" 
                        v-model="doctorForm.licenseNumber" 
                        required 
                        class="form-input pl-10" 
                        placeholder="Enter license number" 
                        :class="{ 'border-red-300': errors.licenseNumber }"
                      />
                    </div>
                    <p v-if="errors.licenseNumber" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.licenseNumber }}</p>
                  </div>
                </div>
              </div>

              <!-- Step 3: Clinic Information -->
              <div v-if="doctorStep === 3" class="space-y-4 sm:space-y-6">
                <div class="text-center mb-4 sm:mb-6">
                  <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Clinic Information</h2>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Tell us about your practice</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group md:col-span-2">
                    <label for="clinicName" class="form-label">Clinic Name *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-hospital text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="clinicName" 
                        v-model="doctorForm.clinicName" 
                        required 
                        class="form-input pl-10" 
                        placeholder="Enter clinic name" 
                        :class="{ 'border-red-300': errors.clinicName }"
                      />
                    </div>
                    <p v-if="errors.clinicName" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.clinicName }}</p>
                  </div>
                  <div class="form-group md:col-span-2">
                    <label for="clinicAddress" class="form-label">Clinic Address *</label>
                    <div class="relative">
                      <div class="absolute top-3 left-3 pointer-events-none">
                        <i class="fas fa-map-marker-alt text-gray-400"></i>
                      </div>
                      <textarea 
                        id="clinicAddress" 
                        v-model="doctorForm.clinicAddress" 
                        required 
                        rows="3" 
                        class="form-input pl-10" 
                        placeholder="Enter full clinic address" 
                        :class="{ 'border-red-300': errors.clinicAddress }"
                      ></textarea>
                    </div>
                    <p v-if="errors.clinicAddress" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.clinicAddress }}</p>
                  </div>
                  <div class="form-group md:col-span-2">
                    <label for="location" class="form-label">Location *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-map-pin text-gray-400"></i>
                      </div>
                      <input 
                        type="text" 
                        id="location" 
                        v-model="doctorForm.location" 
                        required 
                        class="form-input pl-10" 
                        placeholder="City, State" 
                        :class="{ 'border-red-300': errors.location }"
                      />
                    </div>
                    <p v-if="errors.location" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.location }}</p>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons for Doctor -->
              <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-8">
                <button 
                  v-if="doctorStep > 1"
                  type="button" 
                  @click="prevDoctorStep"
                  class="btn btn-secondary flex-1 order-2 sm:order-1"
                >
                  <i class="fas fa-chevron-left mr-2"></i>
                  Previous
                </button>
                
                <button 
                  v-if="doctorStep < doctorTotalSteps"
                  type="button" 
                  @click="nextDoctorStep"
                  class="btn btn-primary flex-1 order-1 sm:order-2"
                >
                  Next
                  <i class="fas fa-chevron-right ml-2"></i>
                </button>
                
                <button 
                  v-if="doctorStep === doctorTotalSteps"
                  type="submit" 
                  :disabled="isLoading"
                  class="btn btn-primary disabled:opacity-50 flex-1 order-1"
                >
                  <i v-if="!isLoading" class="fas fa-user-md mr-2"></i>
                  <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                  {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                </button>
              </div>
            </form>

            <!-- Admin SignUp Form -->
            <form v-if="selectedRole === 'admin'" @submit.prevent="handleAdminSignup" class="space-y-6 sm:space-y-8">
              <div class="text-center mb-4 sm:mb-6">
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Admin Registration</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Create your admin account</p>
              </div>
              
              <!-- Error/Success Messages -->
              <div v-if="error" class="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                <i class="fas fa-exclamation-circle"></i> {{ error }}
              </div>
              <div v-if="success" class="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                <i class="fas fa-check-circle"></i> Registration successful! 🎉
              </div>

              <div class="form-group">
                <label for="adminFullName" class="form-label">Full Name *</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-user text-gray-400"></i>
                  </div>
                  <input type="text" id="adminFullName" v-model="adminForm.full_name" required class="form-input pl-10" placeholder="Enter your full name" />
                </div>
              </div>
              
              <div class="form-group">
                <label for="adminEmail" class="form-label">Email Address *</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input type="email" id="adminEmail" v-model="adminForm.email" required class="form-input pl-10" placeholder="your@email.com" />
                </div>
              </div>

              <div class="form-group">
                <label for="adminMobile" class="form-label">Mobile Number</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-phone text-gray-400"></i>
                  </div>
                  <input type="tel" id="adminMobile" v-model="adminForm.mobile" pattern="[0-9]{10}" placeholder="10-digit mobile number" class="form-input pl-10" />
                </div>
              </div>

              <div class="form-group">
                <label for="adminPassword" class="form-label">Password *</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-lock text-gray-400"></i>
                  </div>
                  <input type="password" id="adminPassword" v-model="adminForm.password" required minlength="6" class="form-input pl-10" placeholder="Create a strong password" />
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-full mt-8" :disabled="isLoading">
                <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
                <i v-else class="fas fa-user-shield mr-2"></i>
                {{ isLoading ? 'Creating Account...' : 'Create Admin Account' }}
              </button>
            </form>

            <!-- Already have account -->
            <div class="mt-6 sm:mt-8 text-center">
              <p class="text-gray-600 text-sm">
                Already have an account? 
                <button @click="goToLogin" class="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
    <ChatButton />
    <ToastNotification />
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { BASE_URL } from '@/config/api';

export default {
  name: 'CommonSignUp',
  components: {
    AppHeader,
    AppFooter,
    ChatButton,
    ToastNotification
  },
  data() {
    return {
      selectedRole: 'patient',
      isLoading: false,
      error: '',
      successMessage: '',
      success: false,
      
      // Patient Form Data
      currentStep: 1,
      totalSteps: 3,
      showPassword: false,
      showConfirmPassword: false,
      confirmPassword: '',
      agreeToTerms: false,
      subscribeNewsletter: false,
      patientForm: {
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
      
      // Doctor Form Data
      doctorStep: 1,
      doctorTotalSteps: 3,
      doctorForm: {
        fullName: '',
        name: '',
        email: '',
        mobile: '',
        password: '',
        gender: '',
        registrationNumber: '',
        licenseNumber: '',
        council: '',
        specialty: '',
        experience: 0,
        degree: '',
        clinicName: '',
        clinicAddress: '',
        location: '',
        role: 'DOCTOR'
      },
      
      // Admin Form Data
      adminForm: {
        full_name: "",
        email: "",
        mobile: "",
        password: "",
        role: "ADMIN",
      },
      
      errors: {},
      
      availableRoles: [
        {
          key: 'patient',
          label: 'Patient',
          short: 'Patient',
          icon: 'fas fa-user',
          title: 'Patient',
          subtitle: 'Join our healthcare community'
        },
        {
          key: 'doctor',
          label: 'Doctor',
          short: 'Doctor',
          icon: 'fas fa-user-md',
          title: 'Healthcare Professional',
          subtitle: 'Join our network of medical experts'
        },
        {
          key: 'admin',
          label: 'Admin',
          short: 'Admin',
          icon: 'fas fa-user-shield',
          title: 'Administrator',
          subtitle: 'Manage the healthcare platform'
        }
      ]
    }
  },
  computed: {
    maxDate() {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
      return maxDate.toISOString().split('T')[0];
    },
    
    passwordValidation() {
      const password = this.patientForm.password;
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
             this.patientForm.password === this.confirmPassword;
    }
  },
  created() {
    // Check URL parameters for role
    const role = this.$route.query.role;
    if (role && ['patient', 'doctor', 'admin'].includes(role)) {
      this.selectedRole = role;
    }
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role;
      this.error = '';
      this.successMessage = '';
    },
    
    getRoleIcon() {
      const role = this.availableRoles.find(r => r.key === this.selectedRole);
      return role ? role.icon : 'fas fa-user';
    },
    
    getRoleTitle() {
      const role = this.availableRoles.find(r => r.key === this.selectedRole);
      return role ? role.title : 'User';
    },
    
    getRoleSubtitle() {
      const role = this.availableRoles.find(r => r.key === this.selectedRole);
      return role ? role.subtitle : 'Create your account';
    },
    
    goToLogin() {
      this.$router.push(`/login?role=${this.selectedRole}`);
    },
    
    // Patient Form Methods
    validateStep(step) {
      this.errors = {};
      let isValid = true;

      if (step === 1) {
        if (!this.patientForm.fullName) {
          this.errors.fullName = 'Full name is required';
          isValid = false;
        }
        if (!this.patientForm.dateOfBirth) {
          this.errors.dateOfBirth = 'Date of birth is required';
          isValid = false;
        }
        if (!this.patientForm.gender) {
          this.errors.gender = 'Gender is required';
          isValid = false;
        }
      }

      if (step === 2) {
        if (!this.patientForm.email) {
          this.errors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(this.patientForm.email)) {
          this.errors.email = 'Please enter a valid email address';
          isValid = false;
        }
        
        if (!this.patientForm.mobile) {
          this.errors.mobile = 'Mobile number is required';
          isValid = false;
        }
        
        if (!this.patientForm.address) {
          this.errors.address = 'Address is required';
          isValid = false;
        }
      }

      if (step === 3) {
        if (!this.patientForm.password) {
          this.errors.password = 'Password is required';
          isValid = false;
        } else if (!this.passwordValidation.length || !this.passwordValidation.hasLetter || !this.passwordValidation.hasNumber) {
          this.errors.password = 'Password does not meet requirements';
          isValid = false;
        }
        
        if (this.patientForm.password !== this.confirmPassword) {
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
    
    // Doctor Form Methods
    validateDoctorStep(step) {
      this.errors = {};
      let isValid = true;

      if (step === 1) {
        if (!this.doctorForm.fullName) {
          this.errors.doctorFullName = 'Full name is required';
          isValid = false;
        }
        if (!this.doctorForm.name) {
          this.errors.doctorName = 'Preferred name is required';
          isValid = false;
        }
        if (!this.doctorForm.email) {
          this.errors.doctorEmail = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(this.doctorForm.email)) {
          this.errors.doctorEmail = 'Please enter a valid email address';
          isValid = false;
        }
        if (!this.doctorForm.mobile) {
          this.errors.doctorMobile = 'Mobile number is required';
          isValid = false;
        } else if (!/^[0-9]{10}$/.test(this.doctorForm.mobile)) {
          this.errors.doctorMobile = 'Please enter a valid 10-digit mobile number';
          isValid = false;
        }
        if (!this.doctorForm.password) {
          this.errors.doctorPassword = 'Password is required';
          isValid = false;
        } else if (this.doctorForm.password.length < 6) {
          this.errors.doctorPassword = 'Password must be at least 6 characters';
          isValid = false;
        }
        if (!this.doctorForm.gender) {
          this.errors.doctorGender = 'Gender is required';
          isValid = false;
        }
      }

      if (step === 2) {
        if (!this.doctorForm.registrationNumber) {
          this.errors.registrationNumber = 'Registration number is required';
          isValid = false;
        }
        if (!this.doctorForm.council) {
          this.errors.council = 'Medical council is required';
          isValid = false;
        }
        if (!this.doctorForm.specialty) {
          this.errors.specialty = 'Specialty is required';
          isValid = false;
        }
        if (this.doctorForm.experience === '' || this.doctorForm.experience < 0) {
          this.errors.experience = 'Years of experience is required';
          isValid = false;
        }
        if (!this.doctorForm.degree) {
          this.errors.degree = 'Highest degree is required';
          isValid = false;
        }
        if (!this.doctorForm.licenseNumber) {
          this.errors.licenseNumber = 'License number is required';
          isValid = false;
        }
      }

      if (step === 3) {
        if (!this.doctorForm.clinicName) {
          this.errors.clinicName = 'Clinic name is required';
          isValid = false;
        }
        if (!this.doctorForm.clinicAddress) {
          this.errors.clinicAddress = 'Clinic address is required';
          isValid = false;
        }
        if (!this.doctorForm.location) {
          this.errors.location = 'Location is required';
          isValid = false;
        }
      }

      return isValid;
    },

    nextDoctorStep() {
      if (this.validateDoctorStep(this.doctorStep)) {
        this.doctorStep++;
      }
    },
    
    prevDoctorStep() {
      this.doctorStep--;
    },

    async handlePatientSignup() {
      this.error = '';
      this.successMessage = '';

      if (!this.validateStep(3) || !this.canSubmit) {
        return;
      }

      this.isLoading = true;

      try {
        const response = await fetch(`${BASE_URL}/api/patient/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.patientForm)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'patient');
        
        this.successMessage = 'Registration successful! Redirecting to your dashboard...';
        
        setTimeout(() => {
          this.$router.push('/patient-dashboard');
        }, 2000);

      } catch (error) {
        console.error('Registration error:', error);
        this.error = error.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },

    async handleDoctorSignup() {
      this.error = '';

      if (!this.validateDoctorStep(3)) {
        return;
      }

      this.isLoading = true;

      try {
        const requestData = {
          full_name: this.doctorForm.fullName,
          name: this.doctorForm.name,
          email: this.doctorForm.email,
          mobile: this.doctorForm.mobile,
          password: this.doctorForm.password,
          gender: this.doctorForm.gender,
          registration_number: this.doctorForm.registrationNumber,
          license_number: this.doctorForm.licenseNumber,
          council: this.doctorForm.council,
          specialty: this.doctorForm.specialty,
          experience: this.doctorForm.experience,
          degree: this.doctorForm.degree,
          clinic_name: this.doctorForm.clinicName,
          clinic_address: this.doctorForm.clinicAddress,
          location: this.doctorForm.location,
          role: this.doctorForm.role
        };

        const response = await fetch(`${BASE_URL}/api/doctor/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Registration failed. Please check your details and try again.');
        }

        const data = await response.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'doctor');

        this.$router.push('/doctor-dashboard');

      } catch (error) {
        console.error('Registration error:', error);
        this.error = error.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },

    async handleAdminSignup() {
      this.isLoading = true;
      this.error = "";
      this.success = false;

      if (this.adminForm.mobile && !this.validateMobile(this.adminForm.mobile)) {
        this.error = "Please enter a valid 10-digit mobile number";
        this.isLoading = false;
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/admin/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.adminForm)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration failed');
        }

        const { token, admin } = await response.json();

        localStorage.setItem("token", token);
        localStorage.setItem("adminInfo", JSON.stringify(admin));
        localStorage.setItem("userType", "admin");
        
        this.success = true;
        console.log("Admin signed up:", admin);
        this.$router.push("/admin-dashboard");
      } catch (err) {
        this.error = err.message || "Registration failed. Please try again.";
        console.error('Registration error:', err);
      } finally {
        this.isLoading = false;
      }
    },

    validateMobile(mobile) {
      if (!mobile) return true;
      const mobilePattern = /^[0-9]{10}$/;
      return mobilePattern.test(mobile);
    }
  }
}
</script>

<style scoped>
/* Modern Form Styles */
.form-group {
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .form-group {
    margin-bottom: 1.25rem;
  }
}

.form-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

@media (min-width: 640px) {
  .form-label {
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
  }
}

.dark .form-label {
  color: #e5e7eb;
}

/* Modern Input Styling */
.modern-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 640px) {
  .modern-input {
    padding: 0.875rem 1.125rem;
    font-size: 1rem;
    border-radius: 1rem;
  }
}

.modern-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.modern-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

/* Animated Background Blobs */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Compact Login Button */
.login-button-compact {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border-radius: 0.75rem;
}

@media (min-width: 640px) {
  .login-button-compact {
    padding: 1rem 2rem;
    font-size: 1rem;
    border-radius: 1rem;
  }
}

/* Enhanced Button Styles */
.gradient-button {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 1rem;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.gradient-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

/* Modal Buttons Styling */
.modal-buttons button {
  min-height: 3.5rem;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.modal-buttons button i {
  font-size: 1.125rem;
}

/* Improved Focus States */
.modern-input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Modal Animation */
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Touch Optimization */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Enhanced Focus States for Mobile */
@media (max-width: 768px) {
  .modern-input:focus,
  button:focus {
    transform: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
  
  /* Larger touch targets on mobile */
  button {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Dark Mode Enhancements */
.dark .modern-input {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.dark .modern-input:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark .modern-input::placeholder {
  color: #6b7280;
}

.gradient-button:hover::before {
  left: 100%;
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Glass Card Effect */
.glass-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.dark .glass-card {
  background: rgba(31, 41, 55, 0.9);
  border: 1px solid rgba(75, 85, 99, 0.2);
}

.dark .modern-input {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.dark .modern-input:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

.dark .modern-input::placeholder {
  color: #6b7280;
}

/* Custom Button Styles */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
  transform: translateY(-1px);
}

.dark .btn-secondary {
  background: #374151;
  color: #e5e7eb;
  border-color: #4b5563;
}

.dark .btn-secondary:hover {
  background: #4b5563;
  border-color: #6b7280;
}

/* Mobile Responsive Design */
@media (max-width: 640px) {
  .modern-input {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: 0.75rem 0.875rem;
    border-radius: 0.75rem;
  }
  
  .modern-input.pl-4 {
    padding-left: 0.875rem;
  }
  
  .modern-input.pr-4 {
    padding-right: 0.875rem;
  }
  
  .modern-input.pl-12 {
    padding-left: 2.5rem;
  }
  
  .modern-input.pr-12 {
    padding-right: 2.5rem;
  }
  
  /* Improve button alignment on mobile */
  .modal-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .modal-buttons button {
    width: 100%;
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
    min-height: 44px;
  }
  
  /* Ensure proper touch targets */
  button {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Improve modal on mobile */
  .fixed.inset-0 {
    padding: 0.75rem;
  }
  
  .fixed.inset-0 > div {
    max-height: calc(100vh - 1.5rem);
    overflow-y: auto;
    margin: 0;
  }
  
  /* Form spacing */
  .space-y-3 > * + * {
    margin-top: 0.75rem;
  }
  
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
  
  /* Compact header */
  .text-3xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
  
  .modern-input.pr-12 {
    padding-right: 3rem;
  }
  
  .modern-input.text-center {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .form-label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  /* Modal adjustments for mobile */
  .animate-bounce-in {
    margin: 1rem;
  }
  
  /* Button adjustments for mobile */
  .btn-primary, .btn-secondary {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    min-height: 48px; /* Touch-friendly */
  }

/* Enhanced animations */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.shimmer-effect {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  background-size: 200px 100%;
  animation: shimmer 2s linear infinite;
}

/* Glassmorphism effects */
.glass-effect {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass-effect {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Improved focus states */
.modern-input:focus {
  transform: translateY(-2px);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Loading states */
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.loading-pulse {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Improved checkbox styling */
.custom-checkbox {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-checkbox:checked {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-color: #6366f1;
}

.custom-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
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

/* Modal Animation */
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-100px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(0);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-bounce-in {
    animation: none;
  }
  .animate-blob {
    animation: none;
  }
}

/* Additional Mobile Responsive Improvements */
@media (max-width: 480px) {
  /* Extra small mobile screens */
  .min-h-screen {
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height */
  }
  
  .pt-12 {
    padding-top: 2rem;
  }
  
  .pt-16 {
    padding-top: 2.5rem;
  }
  
  /* Card adjustments */
  .rounded-xl {
    border-radius: 0.75rem;
  }
  
  .rounded-2xl {
    border-radius: 1rem;
  }
  
  /* Text sizing */
  .text-xl {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  
  /* Button improvements */
  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  /* Form label sizing */
  .form-label {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  
  /* Modal specific */
  .animate-bounce-in {
    margin: 0.5rem;
  }
  
  /* Compact spacing */
  .space-y-3 > * + * {
    margin-top: 0.5rem;
  }
}

/* Improved focus styles for accessibility */
.focus-visible\:outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-visible\:ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Enhanced modal overlay */
.modal-overlay {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.5);
}

/* Improved input animations */
.modern-input:focus {
  animation: input-focus 0.2s ease-out;
}

@keyframes input-focus {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

/* Better loading states */
.loading-button {
  position: relative;
  overflow: hidden;
}

.loading-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: loading-shine 1.5s infinite;
}

@keyframes loading-shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Improved checkbox animation */
.custom-checkbox {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.custom-checkbox:checked {
  transform: scale(1.1);
}

.custom-checkbox:checked {
  animation: checkbox-check 0.3s ease-out;
}

@keyframes checkbox-check {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Compact Design Utilities */
.compact-card {
  max-height: 90vh;
  overflow-y: auto;
}

@media (max-width: 640px) {
  .compact-card {
    max-height: 95vh;
  }
}

/* Modern scrollbar for modal */
.compact-card::-webkit-scrollbar {
  width: 4px;
}

.compact-card::-webkit-scrollbar-track {
  background: transparent;
}

.compact-card::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.compact-card::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}
</style>