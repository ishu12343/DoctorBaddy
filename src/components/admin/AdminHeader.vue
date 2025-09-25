<template>
  <header class="bg-medical-primary text-white fixed top-0 left-0 right-0 w-full z-50 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <div class="flex items-center text-white hover:text-gray-200 transition-colors">
          <img src="@/assets/logo/logo1.png" alt="DoctorBuddy Admin" class="h-8 lg:h-10 w-auto" />
          <span class="text-lg lg:text-xl font-bold ml-2">DoctorBuddy Admin</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-6">
          <button 
            @click="$emit('navigate', 'dashboard')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'dashboard' }"
          >
            <i class="fas fa-tachometer-alt text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Dashboard</span>
          </button>
          
          <button 
            @click="$emit('navigate', 'doctors')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'doctors' }"
          >
            <i class="fas fa-user-md text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Doctors</span>
          </button>
          
          <button 
            @click="$emit('navigate', 'patients')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'patients' }"
          >
            <i class="fas fa-users text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Patients</span>
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
                <i class="fas fa-user-shield text-xl"></i>
              </div>
              {{ adminInfo?.username || 'Admin' }}
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
                <div class="px-4 py-3 border-b border-medical-primary">
                  <p class="text-sm font-medium text-white">{{ adminInfo?.username || 'Admin' }}</p>
                  <p class="text-xs text-gray-300">Administrator</p>
                </div>
                <button @click="$emit('navigate', 'profile')" class="dropdown-item">
                  <i class="fas fa-user-cog mr-2"></i>
                  Admin Settings
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

      <!-- Mobile Navigation -->
      <nav 
        v-if="mobileMenuOpen" 
        class="lg:hidden pb-4 border-t border-medical-secondary mt-4 pt-4 animate-fade-in"
      >
        <div class="flex flex-col space-y-3">
          <button 
            @click="navigateAndClose('dashboard')"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
            :class="{ 'bg-medical-secondary': currentPage === 'dashboard' }"
          >
            <i class="fas fa-tachometer-alt text-medical-secondary"></i>
            <span>Dashboard</span>
          </button>
          
          <button 
            @click="navigateAndClose('doctors')"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
            :class="{ 'bg-medical-secondary': currentPage === 'doctors' }"
          >
            <i class="fas fa-user-md text-medical-secondary"></i>
            <span>Doctors</span>
          </button>
          
          <button 
            @click="navigateAndClose('patients')"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
            :class="{ 'bg-medical-secondary': currentPage === 'patients' }"
          >
            <i class="fas fa-users text-medical-secondary"></i>
            <span>Patients</span>
          </button>

          <!-- Mobile User Section -->
          <div class="pt-3 border-t border-medical-secondary/30">
            <div class="px-4 py-2 text-sm text-gray-300">
              <div class="flex items-center gap-2 mb-1">
                <i class="fas fa-user-shield text-lg"></i>
                <span class="font-medium">{{ adminInfo?.username || 'Admin' }}</span>
              </div>
              <p class="text-xs text-gray-400">Administrator</p>
            </div>
            <button 
              @click="logout"
              class="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-2"
            >
              <i class="fas fa-sign-out-alt"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AdminHeader',
  props: {
    currentPage: {
      type: String,
      default: 'dashboard'
    },
    adminInfo: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['navigate', 'logout'],
  data() {
    return {
      showDropdown: false,
      mobileMenuOpen: false,
      isMobile: false,
      clickListener: null,
    }
  },
  methods: {
    toggleUserDropdown(e) {
      e.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },
    showUserDropdown() {
      if (!this.isMobile) {
        this.showDropdown = true;
      }
    },
    hideUserDropdown() {
      this.showDropdown = false;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
    navigateAndClose(page) {
      this.$emit('navigate', page);
      this.closeMobileMenu();
    },
    logout() {
      this.closeMobileMenu();
      this.$emit('logout');
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth < 1024;
    },
    handleClickOutside(event) {
      if (this.$refs.userDropdown && !this.$el.contains(event.target) && !this.$refs.userDropdown.contains(event.target)) {
        this.hideUserDropdown();
      }
    }
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
    window.addEventListener('click', this.handleClickOutside);
    
    // Close dropdown when clicking outside
    this.clickListener = (e) => {
      if (this.showDropdown && !this.$el.contains(e.target)) {
        this.hideUserDropdown();
      }
    };
    document.addEventListener('click', this.clickListener);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkIfMobile);
    window.removeEventListener('click', this.handleClickOutside);
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
  }
}
</script>

<style scoped>
/* Navigation styles */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #d1d5db;
  transition: color 0.2s ease-in-out;
}

.nav-item:hover {
  color: #ffffff;
}

.nav-item.active {
  color: #ffffff;
  background-color: rgba(92, 158, 240, 0.3);
  border-radius: 0.5rem;
}

.nav-item i {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.nav-item.active i {
  color: #ffffff;
}

/* Dropdown styles */
.dropdown-item {
  width: 100%;
  text-align: left;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  color: #e5e7eb;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  align-items: center;
}

.dropdown-item:hover {
  background-color: rgba(30, 41, 59, 0.5);
}

.dropdown-item i {
  width: 1.25rem;
  text-align: center;
  margin-right: 0.5rem;
  color: #5C9EF0;
}

.dropdown-divider {
  border-top: 1px solid rgba(30, 41, 59, 0.5);
  margin: 0.25rem 0;
}

/* User avatar */
.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: rgba(92, 158, 240, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5C9EF0;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .nav-item {
    padding-left: 1rem; /* px-4 */
    padding-right: 1rem; /* px-4 */
    padding-top: 0.75rem; /* py-3 */
    padding-bottom: 0.75rem; /* py-3 */
    font-size: 1rem; /* text-base */
  }
  
  .nav-item i {
    width: 1.5rem; /* w-6 */
    text-align: center;
  }
}
</style>
