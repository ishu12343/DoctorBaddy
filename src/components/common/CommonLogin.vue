<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
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
      <div class="w-full max-w-md mx-auto">
        <!-- Login Card -->
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
              <h1 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 drop-shadow-sm">{{ getRoleTitle() }} Login</h1>
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

          <!-- Form -->
          <div class="p-3 sm:p-4 lg:p-6">
            <form @submit.prevent="handleLogin" class="space-y-3 sm:space-y-4">
              <!-- Email/Mobile Input -->
              <div class="form-group">
                <label class="form-label text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                  <i class="fas fa-envelope mr-2 text-indigo-500"></i>
                  Email or Mobile
                </label>
                <div class="relative">
                  <input 
                    v-model="email" 
                    type="text" 
                    required 
                    class="modern-input pl-3 sm:pl-4 pr-10 sm:pr-12 text-sm sm:text-base"
                    :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-200': emailError }"
                    :placeholder="getEmailPlaceholder()"
                    inputmode="email"
                    autocomplete="username"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
                    <i :class="getInputIcon(email)" class="text-gray-400 text-sm transition-colors duration-200"></i>
                  </div>
                </div>
                <p v-if="emailError" class="text-xs sm:text-sm text-red-500 mt-1 sm:mt-2 flex items-center">
                  <i class="fas fa-exclamation-circle mr-1"></i>
                  {{ emailError }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 opacity-75">
                  Enter your registered email address or 10-digit mobile number
                </p>
              </div>

              <!-- Password Input -->
              <div class="form-group">
                <label class="form-label text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                  <i class="fas fa-lock mr-2 text-indigo-500"></i>
                  Password
                </label>
                <div class="relative">
                  <input 
                    v-model="password" 
                    :type="showPassword ? 'text' : 'password'" 
                    required 
                    class="modern-input pl-3 sm:pl-4 pr-10 sm:pr-12 text-sm sm:text-base"
                    :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-200': passwordError }"
                    placeholder="Enter your password"
                    autocomplete="current-password"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors focus:outline-none touch-manipulation min-w-[44px] min-h-[44px]"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm sm:text-base"></i>
                  </button>
                </div>
                <p v-if="passwordError" class="text-xs sm:text-sm text-red-500 mt-1 sm:mt-2 flex items-center">
                  <i class="fas fa-exclamation-circle mr-1"></i>
                  {{ passwordError }}
                </p>
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer group">
                  <div class="relative">
                    <input 
                      v-model="rememberMe" 
                      type="checkbox" 
                      class="sr-only"
                    />
                    <div 
                      class="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-200 group-hover:border-indigo-500"
                      :class="rememberMe ? 'bg-indigo-500 border-indigo-500' : ''"
                    >
                      <i v-if="rememberMe" class="fas fa-check text-white text-xs"></i>
                    </div>
                  </div>
                  <span class="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">Remember me</span>
                </label>

                <button
                  type="button"
                  @click="showForgotPassword = true"
                  class="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors relative group focus:outline-none"
                >
                  Forgot password?
                  <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <i class="fas fa-exclamation-triangle text-red-500 text-sm sm:text-base"></i>
                  </div>
                  <div class="ml-2 sm:ml-3">
                    <p class="text-xs sm:text-sm text-red-800 dark:text-red-200 font-medium">{{ error }}</p>
                  </div>
                </div>
              </div>

              <!-- Success Message -->
              <div v-if="successMessage" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-xl">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <i class="fas fa-check-circle text-green-500 text-sm sm:text-base"></i>
                  </div>
                  <div class="ml-2 sm:ml-3">
                    <p class="text-xs sm:text-sm text-green-800 dark:text-green-200 font-medium">{{ successMessage }}</p>
                  </div>
                </div>
              </div>

              <!-- Login Button -->
              <button
                type="submit" 
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold login-button-compact transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-md flex items-center justify-center space-x-2 relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                <div class="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <i :class="isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'" class="text-lg relative z-10"></i>
                <span class="text-lg relative z-10">{{ isLoading ? 'Signing in...' : `Sign in as ${getRoleTitle()}` }}</span>
              </button>

              <!-- Sign Up Link -->
              <div class="text-center pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?
                  <button 
                    type="button"
                    @click="goToSignUp"
                    class="font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 ml-1 relative group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-1 text-xs sm:text-sm"
                  >
                    Sign up as {{ getRoleTitle() }}
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <!-- Features - Compact Version -->
        <div class="mt-4 sm:mt-6 flex justify-center items-center gap-6 sm:gap-8 px-4">
          <div class="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <i class="fas fa-shield-alt text-sm"></i>
            </div>
            <span class="text-xs font-medium hidden sm:inline">Secure</span>
          </div>
          <div class="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <i class="fas fa-clock text-sm"></i>
            </div>
            <span class="text-xs font-medium hidden sm:inline">24/7</span>
          </div>
          <div class="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <i class="fas fa-mobile-alt text-sm"></i>
            </div>
            <span class="text-xs font-medium hidden sm:inline">Mobile</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto" @click.self="closeForgotPasswordModal">
      <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full my-4 animate-bounce-in overflow-hidden border border-white/20 dark:border-gray-600/50">
        <!-- Modal Header -->
        <div class="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 p-4 sm:p-6 text-center text-white">
          <!-- Background Pattern -->
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          <button 
            @click="closeForgotPasswordModal"
            class="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg sm:rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
          >
            <i class="fas fa-times text-sm sm:text-base"></i>
          </button>
          
          <div class="relative z-10">
            <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <i :class="forgotPasswordStep === 1 ? 'fas fa-envelope' : 'fas fa-key'" class="text-lg sm:text-2xl drop-shadow-sm"></i>
            </div>
            <h3 class="text-lg sm:text-xl font-bold mb-1 sm:mb-2 drop-shadow-sm">
              {{ forgotPasswordStep === 1 ? 'Reset Password' : 'Verify OTP' }}
            </h3>
            <p class="text-indigo-100 text-xs sm:text-sm font-medium opacity-90 px-2 hidden sm:block">
              {{ forgotPasswordStep === 1 
                ? `Enter your ${selectedRole} email or mobile number` 
                : 'Enter the OTP and your new password' 
              }}
            </p>
          </div>
        </div>

        <!-- Step Progress Indicator -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-3 sm:px-6 py-3 sm:py-4">
          <div class="flex items-center justify-center space-x-2 sm:space-x-4">
            <div class="flex items-center">
              <div 
                class="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-md"
                :class="forgotPasswordStep >= 1 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-indigo-500/25' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'"
              >
                <i v-if="forgotPasswordStep > 1" class="fas fa-check text-xs"></i>
                <span v-else>1</span>
              </div>
              <span class="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold hidden sm:inline" :class="forgotPasswordStep >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'">Send OTP</span>
            </div>
            <div class="flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded-full relative overflow-hidden">
              <div 
                class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                :class="forgotPasswordStep >= 2 ? 'translate-x-0' : 'translate-x-[-100%]'"
              ></div>
            </div>
            <div class="flex items-center">
              <div 
                class="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-md"
                :class="forgotPasswordStep >= 2 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-indigo-500/25' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'"
              >
                2
              </div>
              <span class="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold hidden sm:inline" :class="forgotPasswordStep >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'">Reset</span>
            </div>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-3 sm:p-4 lg:p-6">
          <!-- Step 1: Send OTP -->
          <form v-if="forgotPasswordStep === 1" @submit.prevent="sendOTP" class="space-y-6">
            <div class="form-group">
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                <i class="fas fa-user-circle mr-2 text-indigo-500"></i>
                Registered Email or Mobile Number
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="fas fa-envelope text-indigo-400 text-lg"></i>
                </div>
                <input 
                  v-model="resetIdentifier" 
                  type="text" 
                  required 
                  class="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm font-medium"
                  :placeholder="getResetPlaceholder()"
                />
              </div>
              
              <!-- Information Alert -->
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <i class="fas fa-info-circle text-blue-500 text-lg mr-3 mt-0.5"></i>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-bold text-blue-800 dark:text-blue-200 mb-1">Important Notice</h4>
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                      {{ selectedRole === 'admin' 
                        ? 'Only registered admin accounts can receive OTP. Please use your registered email address or mobile number from your admin account.' 
                        : 'Only registered email addresses or mobile numbers can receive OTP. Please use the same email/mobile you used during registration.' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="resetError" class="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <i class="fas fa-exclamation-triangle text-red-500 text-lg"></i>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-red-800 dark:text-red-200">{{ resetError }}</p>
                </div>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="resetSuccess" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div class="flex items-center">
                <i class="fas fa-check-circle text-green-500 mr-2 text-sm"></i>
                <p class="text-sm text-green-800 dark:text-green-200">{{ resetSuccess }}</p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 pt-4 modal-buttons">
              <button 
                type="button" 
                @click="closeForgotPasswordModal" 
                class="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-500 transform hover:scale-105 flex items-center justify-center"
              >
                <i class="fas fa-times mr-3 text-lg"></i>
                <span>Cancel</span>
              </button>
              <button 
                type="submit" 
                :disabled="isSendingOTP"
                class="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-md relative overflow-hidden group flex items-center justify-center"
              >
                <div class="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <i :class="isSendingOTP ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'" class="mr-3 text-lg relative z-10"></i>
                <span class="relative z-10 text-lg">{{ isSendingOTP ? 'Sending...' : 'Send OTP' }}</span>
              </button>
            </div>
          </form>

          <!-- Step 2: Verify OTP and Reset Password -->
          <form v-if="forgotPasswordStep === 2" @submit.prevent="resetPassword" class="space-y-6">
            <div class="form-group">
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                <i class="fas fa-shield-alt mr-2 text-indigo-500"></i>
                Enter OTP
              </label>
              <div class="relative">
                <input 
                  v-model="resetOTP" 
                  type="text" 
                  required 
                  maxlength="6"
                  class="w-full px-4 py-4 text-center text-2xl font-mono tracking-[0.5rem] font-bold border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                  placeholder="000000"
                />
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-center font-medium">
                <i class="fas fa-mobile-alt mr-2 text-indigo-400"></i>
                Check your {{ identifierType === 'email' ? 'email' : 'mobile' }} for the 6-digit OTP
              </p>
            </div>

            <div class="form-group">
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                <i class="fas fa-lock mr-2 text-indigo-500"></i>
                New Password
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-indigo-400 text-lg"></i>
                </div>
                <input 
                  v-model="newPassword" 
                  :type="showNewPassword ? 'text' : 'password'" 
                  required
                  minlength="6"
                  class="w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm font-medium"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors focus:outline-none"
                >
                  <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label text-gray-700 dark:text-gray-300 font-semibold">
                <i class="fas fa-lock mr-2 text-indigo-500"></i>
                Confirm Password
              </label>
              <div class="relative">
                <input 
                  v-model="confirmPassword" 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  required
                  minlength="6"
                  class="modern-input pl-12 pr-12"
                  placeholder="Confirm new password"
                />
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400 text-sm"></i>
                </div>
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors focus:outline-none"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
                </button>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="resetError" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div class="flex items-center">
                <i class="fas fa-exclamation-circle text-red-500 mr-2 text-sm"></i>
                <p class="text-sm text-red-800 dark:text-red-200">{{ resetError }}</p>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="resetSuccess" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div class="flex items-center">
                <i class="fas fa-check-circle text-green-500 mr-2 text-sm"></i>
                <p class="text-sm text-green-800 dark:text-green-200">{{ resetSuccess }}</p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 pt-4 modal-buttons">
              <button 
                type="button" 
                @click="goBackToStep1" 
                class="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-500 transform hover:scale-105 flex items-center justify-center"
              >
                <i class="fas fa-arrow-left mr-3 text-lg"></i>
                <span>Back</span>
              </button>
              <button 
                type="submit" 
                :disabled="isResetting"
                class="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-md relative overflow-hidden group flex items-center justify-center"
              >
                <div class="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <i :class="isResetting ? 'fas fa-spinner fa-spin' : 'fas fa-check'" class="mr-3 text-lg relative z-10"></i>
                <span class="relative z-10 text-lg">{{ isResetting ? 'Resetting...' : 'Reset Password' }}</span>
              </button>
            </div>

            <!-- Resend OTP -->
            <div class="text-center pt-4">
              <button
                type="button"
                @click="resendOTP"
                :disabled="resendCooldown > 0"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:text-gray-400 dark:disabled:text-gray-500 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 disabled:bg-gray-100 dark:disabled:bg-gray-800 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 border border-indigo-200 dark:border-indigo-800 disabled:border-gray-300 dark:disabled:border-gray-600"
              >
                <i class="fas fa-redo mr-2 text-xs"></i>
                {{ resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP' }}
              </button>
            </div>
          </form>
        </div>
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
import { BASE_URL } from '@/config/api';
import axios from 'axios';

export default {
  name: 'CommonLogin',
  components: { 
    AppHeader, 
    AppFooter, 
    ChatButton 
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
      // Forgot Password Modal
      showForgotPassword: false,
      forgotPasswordStep: 1, // 1 = Send OTP, 2 = Verify & Reset
      resetIdentifier: '', // Email or mobile
      resetOTP: '',
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      isSendingOTP: false,
      isResetting: false,
      resetError: '',
      resetSuccess: '',
      identifierType: '', // 'email' or 'mobile'
      resendCooldown: 0,
      resendTimer: null
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
  beforeUnmount() {
    this.clearResendTimer();
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
        patient: 'patient@example.com or 9876543210',
        doctor: 'doctor@hospital.com or 9876543210',
        admin: 'admin@system.com or 9876543210'
      };
      return placeholders[this.selectedRole] || 'email@example.com or mobile';
    },

    getInputIcon(value) {
      if (!value) return 'fas fa-envelope';
      
      // Check if it looks like an email
      if (value.includes('@')) {
        return 'fas fa-envelope';
      }
      
      // Check if it looks like a mobile number
      if (/^[0-9]+$/.test(value.replace(/\s/g, ''))) {
        return 'fas fa-mobile-alt';
      }
      
      return 'fas fa-envelope';
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
      
      // Email/Mobile validation
      if (!this.email) {
        this.emailError = 'Email or mobile number is required';
        isValid = false;
      } else {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobilePattern = /^[0-9]{10}$/;
        
        if (!emailPattern.test(this.email) && !mobilePattern.test(this.email.replace(/\s/g, ''))) {
          this.emailError = 'Please enter a valid email address or 10-digit mobile number';
          isValid = false;
        }
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
        identifier: this.email,
        email: this.email, // Keep for backward compatibility with admin endpoint
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

    // ===== FORGOT PASSWORD METHODS =====
    
    getResetPlaceholder() {
      const placeholders = {
        patient: 'Your registered email or mobile number',
        doctor: 'Your registered email or mobile number',
        admin: 'Your registered email or mobile number'
      };
      return placeholders[this.selectedRole] || 'Your registered email or mobile';
    },

    closeForgotPasswordModal() {
      this.showForgotPassword = false;
      this.forgotPasswordStep = 1;
      this.resetIdentifier = '';
      this.resetOTP = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.resetError = '';
      this.resetSuccess = '';
      this.identifierType = '';
      this.showNewPassword = false;
      this.showConfirmPassword = false;
      this.clearResendTimer();
    },

    clearResetMessages() {
      this.resetError = '';
      this.resetSuccess = '';
    },

    async sendOTP() {
      if (!this.resetIdentifier.trim()) {
        this.resetError = 'Please enter your email or mobile number';
        return;
      }

      this.isSendingOTP = true;
      this.clearResetMessages();

      try {
        const endpoint = this.selectedRole === 'admin' 
          ? `${BASE_URL}/admin/forgot-password/send-otp`
          : `${BASE_URL}/api/${this.selectedRole}/forgot-password/send-otp`;

        const response = await axios.post(endpoint, {
          identifier: this.resetIdentifier.trim()
        });

        if (response.data.success) {
          this.resetSuccess = response.data.message;
          this.identifierType = response.data.identifier_type;
          this.forgotPasswordStep = 2;
          this.startResendCooldown();
        } else {
          this.resetError = response.data.error || 'Failed to send OTP';
        }
      } catch (error) {
        console.error('Send OTP error:', error);
        if (error.response && error.response.data) {
          this.resetError = error.response.data.error || 'Failed to send OTP';
        } else {
          this.resetError = 'Network error. Please check your connection and try again.';
        }
      } finally {
        this.isSendingOTP = false;
      }
    },

    async resetPassword() {
      // Validation
      if (!this.resetOTP.trim()) {
        this.resetError = 'Please enter the OTP';
        return;
      }

      if (!this.newPassword) {
        this.resetError = 'Please enter a new password';
        return;
      }

      if (this.newPassword.length < 6) {
        this.resetError = 'Password must be at least 6 characters long';
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.resetError = 'Passwords do not match';
        return;
      }

      this.isResetting = true;
      this.clearResetMessages();

      try {
        const endpoint = this.selectedRole === 'admin' 
          ? `${BASE_URL}/admin/forgot-password/reset`
          : `${BASE_URL}/api/${this.selectedRole}/forgot-password/reset`;

        const response = await axios.post(endpoint, {
          identifier: this.resetIdentifier.trim(),
          otp: this.resetOTP.trim(),
          new_password: this.newPassword,
          confirm_password: this.confirmPassword
        });

        if (response.data.success) {
          this.resetSuccess = response.data.message;
          this.successMessage = 'Password reset successfully! You can now login with your new password.';
          
          // Close modal after 2 seconds
          setTimeout(() => {
            this.closeForgotPasswordModal();
          }, 2000);
        } else {
          this.resetError = response.data.error || 'Failed to reset password';
        }
      } catch (error) {
        console.error('Reset password error:', error);
        if (error.response && error.response.data) {
          this.resetError = error.response.data.error || 'Failed to reset password';
        } else {
          this.resetError = 'Network error. Please check your connection and try again.';
        }
      } finally {
        this.isResetting = false;
      }
    },

    goBackToStep1() {
      this.forgotPasswordStep = 1;
      this.resetOTP = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.clearResetMessages();
    },

    async resendOTP() {
      if (this.resendCooldown > 0) return;
      
      this.clearResetMessages();
      await this.sendOTP();
    },

    startResendCooldown() {
      this.resendCooldown = 60; // 60 seconds cooldown
      this.resendTimer = setInterval(() => {
        this.resendCooldown--;
        if (this.resendCooldown <= 0) {
          this.clearResendTimer();
        }
      }, 1000);
    },

    clearResendTimer() {
      if (this.resendTimer) {
        clearInterval(this.resendTimer);
        this.resendTimer = null;
      }
      this.resendCooldown = 0;
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