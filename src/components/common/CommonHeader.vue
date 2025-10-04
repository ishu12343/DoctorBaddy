<template>
  <header class="bg-medical-primary text-white fixed top-0 left-0 right-0 w-full z-50 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Left: Menu Button (Mobile & Desktop) -->
        <div class="flex items-center lg:hidden">
          <button 
            @click="toggleMobileMenu" 
            class="px-3 py-2 bg-white text-medical-primary rounded-full shadow border border-medical-secondary focus:outline-none focus:ring-2 focus:ring-medical-secondary"
            aria-label="Toggle mobile menu"
          >
            <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
          </button>
        </div>

        <!-- Desktop Navigation (center) -->
        <nav class="hidden lg:flex items-center gap-8 flex-1 justify-center">
          <button 
            v-for="item in menuItems"
            :key="item.key"
            @click="navigateTo(item.key)"
            class="nav-item group"
            :class="{ 'active': currentPage === item.key }"
          >
            <i :class="`${item.icon} text-medical-secondary group-hover:text-white transition-colors`"></i>
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <!-- Right: User Name, Profile Photo, Dropdown -->
        <div class="flex items-center gap-2 md:gap-3 relative ml-auto user-profile-container" ref="userProfileContainer">
          <!-- User Info - Hidden on very small screens -->
          <div class="hidden xs:flex flex-col items-end justify-center mr-2">
            <span class="font-semibold text-sm md:text-base text-white leading-tight">{{ userInfo?.full_name || userInfo?.username || getUserDefaultName() }}</span>
            <span class="text-xs font-medium text-gray-200 leading-tight">{{ getRoleDisplayName() }}</span>
          </div>
          
          <!-- Profile Photo with Dropdown Toggle -->
          <div class="relative">
            <button 
              @click="toggleUserDropdown"
              class="user-header-button flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
              :class="{ 'bg-white bg-opacity-20': showDropdown }"
              aria-label="User menu"
              :aria-expanded="showDropdown"
            >
              <div class="user-avatar user-avatar-lg shadow-lg border-2 border-white">
                <img
                  v-if="userInfo?.profile_photo || userInfo?.photo_path"
                  :src="userInfo.profile_photo || userInfo.photo_path"
                  alt="Profile Photo"
                  class="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                />
                <i v-else :class="getDefaultAvatarIcon()" class="text-xl md:text-2xl text-white"></i>
              </div>
              <!-- Dropdown Arrow -->
              <i class="fas fa-chevron-down text-white text-xs transition-transform duration-200" :class="{ 'rotate-180': showDropdown }"></i>
            </button>
            
            <!-- Enhanced Dropdown Menu -->
            <transition name="dropdown">
              <div 
                v-if="showDropdown" 
                ref="userDropdown" 
                class="user-dropdown absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl z-50 min-w-[180px] max-w-[250px] overflow-hidden border border-gray-100"
                role="menu"
                aria-orientation="vertical"
              >
                <!-- User Info Header in Dropdown (for mobile) -->
                <div class="xs:hidden px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                  <div class="font-semibold text-sm truncate">{{ userInfo?.full_name || userInfo?.username || getUserDefaultName() }}</div>
                  <div class="text-xs text-blue-100">{{ getRoleDisplayName() }}</div>
                </div>
                
                <!-- Profile Button -->
                <button 
                  @click="navigateAndClose('profile')" 
                  class="dropdown-item-enhanced w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-200 text-gray-700 font-medium"
                  role="menuitem"
                >
                  <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i :class="getProfileIcon()" class="text-blue-600 text-sm"></i>
                  </div>
                  <span class="flex-1">View Profile</span>
                  <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                </button>
                
                <!-- Divider -->
                <div class="border-t border-gray-100"></div>
                
                <!-- Sign Out Button -->
                <button 
                  @click="handleLogout" 
                  class="dropdown-item-enhanced w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-red-50 focus:bg-red-50 focus:outline-none transition-colors duration-200 text-red-600 font-medium"
                  role="menuitem"
                >
                  <div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <i class="fas fa-sign-out-alt text-red-600 text-sm"></i>
                  </div>
                  <span class="flex-1">Sign Out</span>
                  <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <nav 
        v-if="mobileMenuOpen" 
        class="lg:hidden pb-4 border-t border-medical-secondary mt-4 pt-4 animate-fade-in"
      >
        <div class="flex flex-col space-y-3">
          <button 
            v-for="item in menuItems"
            :key="item.key"
            @click="navigateAndClose(item.key)"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
            :class="{ 'bg-medical-secondary': currentPage === item.key }"
          >
            <i :class="`${item.icon} text-medical-secondary`"></i>
            <span>{{ item.label }}</span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CommonHeader',
  props: {
    currentPage: {
      type: String,
      default: 'dashboard'
    },
    userInfo: {
      type: Object,
      default: () => ({})
    },
    userRole: {
      type: String,
      required: true,
      validator: value => ['admin', 'doctor', 'patient'].includes(value)
    }
  },
  emits: ['navigate', 'logout'],
  data() {
    return {
      showDropdown: false,
      mobileMenuOpen: false
    }
  },
  computed: {
    menuItems() {
      const menus = {
        admin: [
          { key: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
          { key: 'doctors', label: 'Doctors', icon: 'fas fa-user-md' },
          { key: 'patients', label: 'Patients', icon: 'fas fa-users' },
          { key: 'profile', label: 'Profile', icon: 'fas fa-user-shield' }
        ],
        doctor: [
          { key: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
          { key: 'appointments', label: 'Appointments', icon: 'fas fa-calendar-alt' },
          { key: 'patients', label: 'Patients', icon: 'fas fa-users' },
          { key: 'profile', label: 'Profile', icon: 'fas fa-user-md' }
        ],
        patient: [
          { key: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
          { key: 'appointments', label: 'Appointments', icon: 'fas fa-calendar-alt' },
          { key: 'profile', label: 'Profile', icon: 'fas fa-user' }
        ]
      };
      return menus[this.userRole] || [];
    }
  },
  methods: {
    getUserDefaultName() {
      const defaults = {
        admin: 'Admin',
        doctor: 'Doctor',
        patient: 'Patient'
      };
      return defaults[this.userRole] || 'User';
    },
    getRoleDisplayName() {
      const roles = {
        admin: 'Administrator',
        doctor: 'Doctor',
        patient: 'Patient'
      };
      return roles[this.userRole] || 'User';
    },
    getDefaultAvatarIcon() {
      const icons = {
        admin: 'fas fa-user-shield',
        doctor: 'fas fa-user-md',
        patient: 'fas fa-user'
      };
      return icons[this.userRole] || 'fas fa-user';
    },
    getProfileIcon() {
      const icons = {
        admin: 'fas fa-user-shield',
        doctor: 'fas fa-user-md',
        patient: 'fas fa-user'
      };
      return icons[this.userRole] || 'fas fa-user';
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    toggleUserDropdown(event) {
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
      
      // Close mobile menu if open
      if (this.showDropdown && this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
      }
    },
    navigateTo(page) {
      this.$emit('navigate', page);
    },
    navigateAndClose(page) {
      this.mobileMenuOpen = false;
      this.showDropdown = false;
      this.$emit('navigate', page);
    },
    handleLogout() {
      // Close all dropdowns/menus
      this.showDropdown = false;
      this.mobileMenuOpen = false;
      
      // Add a small delay to ensure smooth UI transition
      setTimeout(() => {
        this.$emit('logout');
      }, 100);
    },
    handleClickOutside(event) {
      // Handle user dropdown
      if (this.showDropdown) {
        const userContainer = this.$refs.userProfileContainer;
        const userDropdown = this.$refs.userDropdown;
        
        if (userContainer && !userContainer.contains(event.target) && 
            userDropdown && !userDropdown.contains(event.target)) {
          this.showDropdown = false;
        }
      }
      
      // Handle mobile menu
      if (this.mobileMenuOpen && this.$el && !this.$el.contains(event.target)) {
        this.mobileMenuOpen = false;
      }
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        this.showDropdown = false;
        this.mobileMenuOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleEscapeKey);
    
    // Add touch event handling for mobile
    document.addEventListener('touchstart', this.handleClickOutside, { passive: true });
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEscapeKey);
    document.removeEventListener('touchstart', this.handleClickOutside);
  }
}
</script>

<style scoped>
/* Custom styles for components */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: 500;
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
  min-height: 44px; /* Touch-friendly minimum */
}

.nav-item:hover {
  color: #d1d5db;
}

.nav-item.active {
  background-color: rgba(96, 165, 250, 0.3);
  border-radius: 0.5rem;
}

/* Enhanced User Profile Container */
.user-profile-container {
  position: relative;
}

.user-header-button {
  transition: all 0.2s ease;
  min-height: 44px; /* Touch-friendly */
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-header-button:hover {
  background-color: rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-1px);
}

.user-header-button:active {
  transform: translateY(0);
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
}

.user-avatar-lg {
  width: 2.5rem;
  height: 2.5rem;
}

@media (min-width: 768px) {
  .user-avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .user-avatar-lg {
    width: 3rem;
    height: 3rem;
  }
}

/* Enhanced Dropdown Styling */
.user-dropdown {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform-origin: top right;
}

.dropdown-item-enhanced {
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  min-height: 48px; /* Touch-friendly */
  display: flex;
  align-items: center;
}

.dropdown-item-enhanced:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* Dropdown Animations */
.dropdown-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Rotate animation for chevron */
.rotate-180 {
  transform: rotate(180deg);
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

/* Mobile Responsive Design */
@media (max-width: 475px) {
  .user-profile-container {
    gap: 0.5rem;
  }
  
  .user-header-button {
    padding: 0.5rem;
  }
  
  .user-dropdown {
    right: -1rem;
    min-width: calc(100vw - 2rem);
    max-width: calc(100vw - 2rem);
  }
}

@media (min-width: 476px) and (max-width: 640px) {
  .user-dropdown {
    min-width: 200px;
  }
}

@media (max-width: 640px) {
  .nav-item span {
    font-size: 0.9rem;
  }
  
  .user-header-button {
    gap: 0.25rem;
  }
  
  /* Make dropdown full width on very small screens */
  .user-dropdown {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
}

/* Extra small screens (custom breakpoint) */
@media (max-width: 360px) {
  .xs\:hidden {
    display: none !important;
  }
}

@media (min-width: 361px) {
  .xs\:flex {
    display: flex !important;
  }
}

/* Touch-friendly improvements */
@media (hover: none) and (pointer: coarse) {
  .nav-item, 
  .dropdown-item-enhanced,
  .user-header-button {
    min-height: 48px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Remove hover effects on touch devices */
  .user-header-button:hover {
    background-color: transparent !important;
    transform: none !important;
  }
  
  .dropdown-item-enhanced:hover {
    background-color: transparent !important;
  }
  
  /* Add active states for touch */
  .user-header-button:active {
    background-color: rgba(255, 255, 255, 0.15) !important;
  }
  
  .dropdown-item-enhanced:active {
    background-color: rgba(59, 130, 246, 0.1) !important;
  }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .user-avatar img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}

/* Focus visible for accessibility */
.user-header-button:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

.dropdown-item-enhanced:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

/* Medical theme colors */
.bg-medical-primary {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.text-medical-secondary {
  color: #60a5fa;
}

.border-medical-secondary {
  border-color: #60a5fa;
}

.hover\:bg-medical-secondary:hover {
  background-color: rgba(96, 165, 250, 0.2);
}

.bg-medical-secondary\/30 {
  background-color: rgba(96, 165, 250, 0.3);
}
</style>