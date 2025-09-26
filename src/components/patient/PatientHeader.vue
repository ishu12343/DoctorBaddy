<template>
  <header class="bg-medical-primary text-white fixed top-0 left-0 right-0 w-full z-50 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <div class="flex items-center text-white hover:text-gray-200 transition-colors">
          <img src="@/assets/logo/logo1.png" alt="DoctorBuddy Logo" class="h-8 lg:h-10 w-auto" />
          <span class="text-lg lg:text-xl font-bold">DoctorBuddy</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-8">
          <button 
            @click="$emit('navigate', 'dashboard')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'dashboard' }"
          >
            <i class="fas fa-home text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Dashboard</span>
          </button>
          
          <button 
            @click="$emit('navigate', 'appointments')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'appointments' }"
          >
            <i class="fas fa-calendar-alt text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Appointments</span>
          </button>
          
          <button 
            @click="$emit('navigate', 'profile')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'profile' }"
          >
            <i class="fas fa-user text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Profile</span>
          </button>
          
          <!-- User Profile Dropdown -->
          <div class="relative">
            <button 
              @click="toggleUserDropdown"
              @mouseenter="showUserDropdown" 
              class="btn btn-primary btn-small flex items-center gap-2 relative z-20"
              :aria-expanded="showDropdown"
              aria-haspopup="true"
            >
              <div class="user-avatar">
                <i class="fas fa-user-circle text-xl"></i>
              </div>
              {{ patientInfo?.full_name || 'Patient' }}
              <i class="fas fa-chevron-down transition-transform duration-200" :class="{'transform rotate-180': showDropdown}"></i>
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
                v-if="showDropdown" 
                ref="userDropdown"
                class="absolute top-full right-0 mt-2 bg-medical-secondary rounded-lg shadow-xl min-w-48 overflow-hidden z-50 animate-fade-in"
              >
                <button @click="$emit('navigate', 'profile')" class="dropdown-item">
                  <i class="fas fa-user mr-2"></i>
                  View Profile
                </button>
                <div class="dropdown-divider"></div>
                <button @click="$emit('logout')" class="dropdown-item text-red-400 hover:text-red-300">
                  <i class="fas fa-sign-out-alt mr-2"></i>
                  Sign Out
                </button>
              </div>
            </transition>
          </div>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="lg:hidden px-4 py-2 bg-medical-secondary text-white font-bold rounded-lg hover:bg-medical-secondary/90 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {{ mobileMenuOpen ? '✕' : '☰' }}
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <nav v-if="mobileMenuOpen" class="lg:hidden bg-medical-secondary border-t border-gray-600 py-4">
          <div class="flex flex-col gap-2">
            <button 
              @click="navigateAndCloseMobile('dashboard')"
              class="mobile-nav-item"
              :class="{ 'active': currentPage === 'dashboard' }"
            >
              <i class="fas fa-home"></i>
              <span>Dashboard</span>
            </button>
            
            <button 
              @click="navigateAndCloseMobile('appointments')"
              class="mobile-nav-item"
              :class="{ 'active': currentPage === 'appointments' }"
            >
              <i class="fas fa-calendar-alt"></i>
              <span>Appointments</span>
            </button>
            
            <button 
              @click="navigateAndCloseMobile('profile')"
              class="mobile-nav-item"
              :class="{ 'active': currentPage === 'profile' }"
            >
              <i class="fas fa-user"></i>
              <span>Profile</span>
            </button>
            
            <div class="mobile-nav-divider"></div>
            
            <button 
              @click="$emit('logout')"
              class="mobile-nav-item text-red-400"
            >
              <i class="fas fa-sign-out-alt"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PatientHeader',
  props: {
    patientInfo: {
      type: Object,
      default: () => ({})
    },
    currentPage: {
      type: String,
      default: 'dashboard'
    }
  },
  emits: ['navigate', 'logout'],
  data() {
    return {
      showDropdown: false,
      mobileMenuOpen: false
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleUserDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    showUserDropdown() {
      this.showDropdown = true;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    navigateAndCloseMobile(page) {
      this.$emit('navigate', page);
      this.mobileMenuOpen = false;
    },
    handleClickOutside(event) {
      if (this.$refs.userDropdown && !this.$refs.userDropdown.contains(event.target) && !event.target.closest('.btn-primary')) {
        this.showDropdown = false;
      }
    }
  }
}
</script>

<style scoped>
/* Header Navigation Styles */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #e2e8f0;
  background: transparent;
  border: none;
  cursor: pointer;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.nav-item i {
  font-size: 1.1rem;
}

.nav-item span {
  font-size: 0.875rem;
}

/* Dropdown Styles */
.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  color: white;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dropdown-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.5rem 0;
}

/* Mobile Navigation */
.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: #e2e8f0;
  text-align: left;
  transition: all 0.2s ease;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
}

.mobile-nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.mobile-nav-item.active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.mobile-nav-item i {
  font-size: 1.1rem;
  width: 1.2rem;
  text-align: center;
}

.mobile-nav-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.5rem 1rem;
}

/* Button Styles */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-small {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav-item span {
    display: none;
  }
  
  .nav-item {
    padding: 0.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .mobile-nav-item {
    padding: 1rem;
    font-size: 1rem;
  }
}

/* Animation Classes */
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>