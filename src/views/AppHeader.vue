<template>
  <header class="bg-medical-primary text-white fixed top-0 left-0 right-0 w-full z-50 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center text-white hover:text-gray-200 transition-colors">
          <img src="@/assets/logo/logo1.png" alt="DoctorBuddy Logo" class="h-8 lg:h-10 w-auto" />
          <span class="text-lg lg:text-xl font-bold">DoctorBuddy</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-8">
          <router-link to="/services" class="nav-item group">
            <i class="fas fa-stethoscope text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Our Services</span>
          </router-link>
          <router-link to="/contact" class="nav-item group">
            <i class="fas fa-envelope-open-text text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Contact</span>
          </router-link>
          
          <!-- Signup Section -->
          <div class="flex items-center gap-4">
            <!-- Login Button -->
            <router-link 
              to="/login" 
              class="px-4 py-2 bg-medical-secondary hover:bg-medical-secondary/90 text-white rounded-lg font-medium flex items-center gap-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <i class="fas fa-sign-in-alt"></i>
              LOG IN
            </router-link>

            <!-- Signup Dropdown -->
            <div class="relative">
              <button 
                @click="toggleSignupDropdown"
                @mouseenter="showSignupDropdown" 
                class="px-4 py-2 bg-medical-secondary hover:bg-medical-secondary/90 text-white rounded-lg font-medium flex items-center gap-2 relative z-20 transition-colors duration-200 shadow-md hover:shadow-lg"
                :aria-expanded="showDropdown2"
                aria-haspopup="true"
              >
                SIGN UP
                <i class="fas fa-chevron-down text-xs transition-transform duration-200" :class="{'transform rotate-180': showDropdown2}"></i>
              </button>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div 
                  v-if="showDropdown2" 
                  ref="signupDropdown"
                  class="absolute top-full right-0 mt-2 bg-medical-secondary hover:bg-medical-secondary/90 text-white rounded-lg shadow-xl min-w-48 overflow-hidden z-50 animate-fade-in border border-gray-100"
                >
                  <router-link to="/patient-signup" class="dropdown-item text-gray-700 hover:bg-gray-50" @click="hideSignupDropdown">Patient Sign Up</router-link>
                  <router-link to="/doctor-signup" class="dropdown-item text-gray-700 hover:bg-gray-50" @click="hideSignupDropdown">Doctor Sign Up</router-link>
                  <router-link to="/admin-signup" class="dropdown-item text-gray-700 hover:bg-gray-50" @click="hideSignupDropdown">Admin Sign Up</router-link>
                </div>
              </transition>
            </div>
          </div>
        </nav>
        <!-- Mobile Menu and Login Buttons -->
        <div class="flex items-center gap-2 lg:hidden">
          <!-- Mobile Login Button -->
          <router-link 
            to="/login" 
            class="px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <i class="fas fa-sign-in-alt"></i>
            LOGIN
          </router-link>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu" 
            class="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {{ mobileMenuOpen ? '✕' : '☰' }}
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <nav 
        v-if="mobileMenuOpen" 
        class="lg:hidden pb-4 border-t border-medical-secondary mt-4 pt-4 animate-fade-in"
      >
        <div class="flex flex-col space-y-3">
          <router-link 
            to="/services" 
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
          >
            <i class="fas fa-stethoscope text-medical-secondary"></i>
            <span>Our Services</span>
          </router-link>
          
          <router-link 
            to="/contact" 
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
          >
            <i class="fas fa-envelope-open-text text-medical-secondary"></i>
            <span>Contact</span>
          </router-link>


          <!-- Mobile Signup Section -->
          <div class="pt-3 border-t border-medical-secondary/30">
            <p class="text-sm text-gray-300 px-4 mb-3">Sign Up</p>
            <div class="space-y-2">
              <router-link 
                to="/patient-signup" 
                @click="closeMobileMenu"
                class="block px-4 py-2 text-white hover:bg-medical-secondary rounded-lg transition-colors"
              >
                Patient Sign Up
              </router-link>
              <router-link 
                to="/doctor-signup" 
                @click="closeMobileMenu"
                class="block px-4 py-2 text-white hover:bg-medical-secondary rounded-lg transition-colors"
              >
                Doctor Sign Up
              </router-link>
              <router-link 
                to="/admin-signup" 
                @click="closeMobileMenu"
                class="block px-4 py-2 text-white hover:bg-medical-secondary rounded-lg transition-colors"
              >
                Admin Sign Up
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      showDropdown2: false,
      mobileMenuOpen: false,
      isMobile: false,
      clickListener: null,
    }
  },
  methods: {
    toggleSignupDropdown(e) {
      e.stopPropagation();
      this.showDropdown2 = !this.showDropdown2;
    },
    showSignupDropdown() {
      if (!this.isMobile) {
        this.showDropdown2 = true;
      }
    },
    hideSignupDropdown() {
      this.showDropdown2 = false;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth < 1024; // lg breakpoint
    },
  },
  mounted() {
    // Add click outside listener for dropdowns
    this.clickListener = (e) => {
      // Close mobile menu when clicking outside
      if (!this.$el.contains(e.target)) {
        this.mobileMenuOpen = false;
      }
      
      // Close signup dropdown when clicking outside
      if (this.showDropdown2 && !this.$refs.signupDropdown?.contains(e.target)) {
        this.hideSignupDropdown();
      }
    };
    
    document.addEventListener('click', this.clickListener);
    
    // Close mobile menu on route change
    this.$router.afterEach(() => {
      this.mobileMenuOpen = false;
    });
    
    // Check if mobile device
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkIfMobile);
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
  },
}
</script>

<style scoped>
/* Dropdown animations */
.animate-fade-in {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Ensure dropdown items are clickable */
.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: white;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: rgba(59, 130, 246, 0.8);
}

/* Improve touch targets for mobile */
@media (max-width: 1023px) {
  .dropdown-item {
    padding: 1rem;
    font-size: 1rem;
  }
}

/* Custom styles for components that need Tailwind extensions */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: 500;
  transition: color 0.2s ease;
  text-decoration: none;
}

.nav-item:hover {
  color: #e5e7eb;
}

.btn-primary {
  background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
  box-shadow: 0 4px 14px 0 rgb(221 36 118 / 15%);
  font-weight: 600;
  letter-spacing: 0.5px;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px 0 rgb(54 209 196 / 18%);
}

/* Remove router-link default styles */
.nav-item, .dropdown-item {
  text-decoration: none;
}

/* Responsive font size adjustments */
@media (width <= 576px) {
  .nav-item span {
    font-size: 0.9rem;
  }
  
  .btn-primary {
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
  }
}

/* Animation for mobile menu */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
