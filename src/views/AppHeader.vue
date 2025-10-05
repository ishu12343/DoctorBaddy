<template>
  <header class="bg-medical-primary text-white fixed top-0 left-0 right-0 w-full z-50 shadow-lg">
    <div class="container mx-auto px-3 sm:px-4">
      <div class="flex items-center justify-between h-14 sm:h-16 lg:h-20">
        <!-- Left: Menu Button -->
        <div class="flex items-center">
          <button 
            @click="toggleMobileMenu" 
            class="p-2 text-white rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            <i :class="mobileMenuOpen ? 'fas fa-times text-lg' : 'fas fa-bars text-lg'"></i>
          </button>
        </div>

        <!-- Center: Logo -->
        <div class="flex-1 flex justify-center">
          <router-link to="/" class="flex items-center text-white hover:text-gray-200 transition-colors">
            <img src="@/assets/logo/logo1.png" alt="DoctorBuddy Logo" class="h-6 sm:h-8 lg:h-10 w-auto" />
            <span class="text-base sm:text-lg lg:text-xl font-bold ml-2">DoctorBuddy</span>
          </router-link>
        </div>

        <!-- Right: Auth Buttons -->
        <div class="flex items-center gap-1 sm:gap-2">
          <!-- Mobile Login Button -->
          <router-link 
            to="/login" 
            class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-white/10 border border-white/30 rounded-md sm:rounded-lg hover:bg-white/20 transition-colors flex items-center gap-1 touch-manipulation min-w-0"
          >
            <i class="fas fa-sign-in-alt text-xs sm:text-sm"></i>
            <span class="hidden xs:inline">LOGIN</span>
          </router-link>

          <!-- Mobile Sign Up Button -->
          <router-link 
            to="/signup" 
            class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-md sm:rounded-lg hover:from-orange-600 hover:to-pink-600 transition-colors flex items-center gap-1 touch-manipulation min-w-0"
          >
            <i class="fas fa-user-plus text-xs sm:text-sm"></i>
            <span class="hidden xs:inline">SIGN UP</span>
          </router-link>
        </div>
      </div>

      <!-- Mobile/Desktop Navigation Menu -->
      <nav 
        v-if="mobileMenuOpen" 
        class="absolute top-full left-0 right-0 bg-medical-primary border-t border-medical-secondary/30 shadow-lg animate-fade-in z-40"
      >
        <div class="container mx-auto px-3 sm:px-4 py-4">
          <div class="flex flex-col space-y-2">
            <!-- Navigation Links -->
            <router-link 
              to="/" 
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
            >
              <i class="fas fa-home text-medical-secondary w-5"></i>
              <span class="font-medium">Home</span>
            </router-link>
            
            <router-link 
              to="/services" 
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
            >
              <i class="fas fa-stethoscope text-medical-secondary w-5"></i>
              <span class="font-medium">Our Services</span>
            </router-link>
            
            <router-link 
              to="/contact" 
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
            >
              <i class="fas fa-envelope-open-text text-medical-secondary w-5"></i>
              <span class="font-medium">Contact</span>
            </router-link>

            <!-- Divider -->
            <div class="border-t border-white/20 my-2"></div>

            <!-- Auth Section in Menu -->
            <div class="space-y-2">
              <router-link 
                to="/login" 
                @click="closeMobileMenu"
                class="flex items-center gap-3 px-4 py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors touch-manipulation border border-white/20"
              >
                <i class="fas fa-sign-in-alt text-medical-secondary w-5"></i>
                <span class="font-medium">Login</span>
              </router-link>
              
              <router-link 
                to="/signup" 
                @click="closeMobileMenu"
                class="flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-lg transition-colors touch-manipulation shadow-md"
              >
                <i class="fas fa-user-plus text-white w-5"></i>
                <span class="font-medium">Sign Up</span>
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
      mobileMenuOpen: false,
      clickListener: null,
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
  },
  mounted() {
    // Add click outside listener for mobile menu
    this.clickListener = (e) => {
      // Close mobile menu when clicking outside
      if (!this.$el.contains(e.target)) {
        this.mobileMenuOpen = false;
      }
    };
    
    document.addEventListener('click', this.clickListener);
    
    // Close mobile menu on route change
    this.$router.afterEach(() => {
      this.mobileMenuOpen = false;
    });
  },
  beforeUnmount() {
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

/* Touch-friendly design */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Custom breakpoint for extra small screens */
@media (min-width: 475px) {
  .xs\:inline {
    display: inline;
  }
}

/* Enhanced mobile button styling */
@media (max-width: 474px) {
  /* Hide text on very small screens, show only icons */
  .auth-btn-text {
    display: none;
  }
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

/* Enhanced button styles */
.btn-primary {
  background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
  box-shadow: 0 4px 14px 0 rgb(221 36 118 / 15%);
  font-weight: 600;
  letter-spacing: 0.5px;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  min-height: 44px; /* iOS minimum touch target */
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

/* Mobile-first responsive design */
@media (max-width: 640px) {
  /* Smaller header on mobile */
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  /* More compact buttons */
  .auth-button {
    min-height: 40px;
    padding: 0.375rem 0.5rem;
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
