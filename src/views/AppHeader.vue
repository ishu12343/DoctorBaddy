<template>
  <header class="bg-medical-primary text-white fixed top-0 left-0 right-0 w-full z-50 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 text-white hover:text-gray-200 transition-colors">
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
          
          <!-- Login Dropdown -->
          <div class="relative" @mouseleave="hideLoginDropdown">
            <button 
              @mouseenter="showLoginDropdown" 
              class="btn btn-primary btn-small flex items-center gap-2"
            >
              LOG IN
              <i class="fas fa-chevron-down"></i>
            </button>
            <div v-if="showDropdown" class="absolute top-full right-0 mt-2 bg-medical-secondary rounded-lg shadow-xl min-w-48 overflow-hidden z-10">
              <router-link to="/patient-login" class="dropdown-item">Patient Login</router-link>
              <router-link to="/doctor-login" class="dropdown-item">Doctor Login</router-link>
              <router-link to="/admin-login" class="dropdown-item">Admin Login</router-link>
            </div>
          </div>

          <!-- Signup Dropdown -->
          <div class="relative" @mouseleave="hideSignupDropdown">
            <button 
              @mouseenter="showSignupDropdown" 
              class="btn btn-primary btn-small flex items-center gap-2"
            >
              SIGN UP
              <i class="fas fa-chevron-down"></i>
            </button>
            <div v-if="showDropdown2" class="absolute top-full right-0 mt-2 bg-medical-secondary rounded-lg shadow-xl min-w-48 overflow-hidden z-10">
              <router-link to="/patient-signup" class="dropdown-item">Patient Sign Up</router-link>
              <router-link to="/doctor-signup" class="dropdown-item">Doctor Sign Up</router-link>
              <router-link to="/admin-signup" class="dropdown-item">Admin Sign Up</router-link>
            </div>
          </div>

          <!-- Theme Toggle -->
          <ThemeToggle />
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-medical-secondary transition-colors"
          aria-label="Toggle mobile menu"
        >
          <i class="fas fa-bars text-xl" v-if="!mobileMenuOpen"></i>
          <i class="fas fa-times text-xl" v-else></i>
        </button>
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

          <!-- Mobile Login Section -->
          <div class="pt-3 border-t border-medical-secondary/30">
            <p class="text-sm text-gray-300 px-4 mb-3">Login</p>
            <div class="space-y-2">
              <router-link 
                to="/patient-login" 
                @click="closeMobileMenu"
                class="block px-4 py-2 text-white hover:bg-medical-secondary rounded-lg transition-colors"
              >
                Patient Login
              </router-link>
              <router-link 
                to="/doctor-login" 
                @click="closeMobileMenu"
                class="block px-4 py-2 text-white hover:bg-medical-secondary rounded-lg transition-colors"
              >
                Doctor Login
              </router-link>
              <router-link 
                to="/admin-login" 
                @click="closeMobileMenu"
                class="block px-4 py-2 text-white hover:bg-medical-secondary rounded-lg transition-colors"
              >
                Admin Login
              </router-link>
            </div>
          </div>

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
import ThemeToggle from '@/components/ThemeToggle.vue'
export default {
  name: 'AppHeader',
  components: { ThemeToggle },
  data() {
    return {
      showDropdown: false,
      showDropdown2: false,
      mobileMenuOpen: false
    }
  },
  methods: {
    showLoginDropdown() {
      this.showDropdown = true
    },
    hideLoginDropdown() {
      this.showDropdown = false
    },
    showSignupDropdown() {
      this.showDropdown2 = true
    },
    hideSignupDropdown() {
      this.showDropdown2 = false
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  },
  mounted() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.mobileMenuOpen = false
      }
    })
    
    // Close mobile menu on route change
    this.$router.afterEach(() => {
      this.mobileMenuOpen = false
    })
  }
}
</script>

<style scoped>
/* Custom styles for components that need Tailwind extensions */
.nav-item {
  @apply flex items-center gap-2 px-4 py-2 text-white hover:text-gray-200 transition-colors duration-200 font-medium;
}

.dropdown-item {
  @apply block px-4 py-3 text-white hover:bg-blue-600 transition-colors duration-200 no-underline;
}

.btn-primary {
  background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
  box-shadow: 0 4px 14px 0 rgba(221, 36, 118, 0.15);
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
  box-shadow: 0 6px 20px 0 rgba(54, 209, 196, 0.18);
}

/* Remove router-link default styles */
.nav-item, .dropdown-item {
  text-decoration: none;
}

/* Responsive font size adjustments */
@media (max-width: 576px) {
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
