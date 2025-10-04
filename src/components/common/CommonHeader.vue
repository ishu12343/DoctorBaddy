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
        <div class="flex items-center gap-3 relative ml-auto px-3 py-2 rounded-lg user-header-right cursor-pointer" @click="toggleUserDropdown">
          <div class="flex flex-col items-end justify-center">
            <span class="font-semibold text-base text-white">{{ userInfo?.full_name || userInfo?.username || getUserDefaultName() }}</span>
            <span class="text-xs font-medium mt-1 text-gray-200">{{ getRoleDisplayName() }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="user-avatar user-avatar-lg shadow-lg" style="border: 2px solid #fff;">
              <img
                v-if="getProfilePhotoUrl()"
                :src="getProfilePhotoUrl()"
                alt="Profile Photo"
                class="h-10 w-10 rounded-full object-cover"
                @error="handleImageError"
              />
              <i v-else :class="getDefaultAvatarIcon()" class="text-3xl" style="color: #fff;"></i>
            </div>
          </div>
          
          <!-- Dropdown for Profile and Sign Out -->
          <div v-if="showDropdown" ref="userDropdown" class="dropdown-menu absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl z-50 min-w-[160px] border border-gray-200 animate-fade-in">
            <button 
              @click.stop="handleProfileClick" 
              class="dropdown-item profile-item flex items-center gap-3 px-4 py-3 w-full text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-t-lg border-b border-gray-100"
            >
              <i :class="getProfileIcon()" class="text-blue-500"></i>
              <span>Profile</span>
            </button>
            <button 
              @click.stop="handleLogoutClick" 
              class="dropdown-item logout-item flex items-center gap-3 px-4 py-3 w-full text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-b-lg"
            >
              <i class="fas fa-sign-out-alt text-red-500"></i>
              <span>Sign Out</span>
            </button>
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
      this.showDropdown = false;
      this.mobileMenuOpen = false;
      this.$emit('logout');
    },
    handleProfileClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.showDropdown = false;
      this.mobileMenuOpen = false;
      this.$emit('navigate', 'profile');
    },
    handleLogoutClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.showDropdown = false;
      this.mobileMenuOpen = false;
      this.$emit('logout');
    },
    getProfilePhotoUrl() {
      if (!this.userInfo) return null;
      // Check both possible field names for profile photo
      return this.userInfo.profile_photo || this.userInfo.photo_path || null;
    },
    handleImageError(event) {
      // Hide broken image and show default avatar
      event.target.style.display = 'none';
    },
    handleClickOutside(event) {
      // Check if click is outside dropdown
      if (this.showDropdown && this.$refs.userDropdown && !this.$refs.userDropdown.contains(event.target)) {
        // Also check if click is not on the user header area
        const userHeaderRight = event.target.closest('.user-header-right');
        if (!userHeaderRight) {
          this.showDropdown = false;
        }
      }
      // Check if click is outside mobile menu
      if (this.mobileMenuOpen && !this.$el.contains(event.target)) {
        this.mobileMenuOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
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
}

.nav-item:hover {
  color: #d1d5db;
}

.nav-item.active {
  background-color: rgba(96, 165, 250, 0.3);
  border-radius: 0.5rem;
}

.dropdown-menu {
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
  min-height: 48px; /* Touch-friendly height */
  transition: all 0.2s ease;
  position: relative;
}

.dropdown-item:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

.profile-item:hover {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  transform: translateX(2px);
}

.logout-item:hover {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  transform: translateX(2px);
}

.user-header-right {
  transition: background-color 0.2s ease;
  border-radius: 0.5rem;
}

.user-header-right:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
}

.user-avatar-lg {
  width: 3rem;
  height: 3rem;
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

/* Responsive font size adjustments */
@media (width <= 576px) {
  .nav-item span {
    font-size: 0.9rem;
  }
  
  .user-header-right {
    padding: 0.5rem;
  }
  
  .user-header-right span {
    font-size: 0.85rem;
  }
}

/* Touch-friendly improvements for mobile */
@media (hover: none) and (pointer: coarse) {
  .nav-item, .dropdown-item {
    min-height: 48px;
    touch-action: manipulation;
  }
  
  .user-header-right {
    min-height: 48px;
    padding: 0.75rem;
  }
  
  .dropdown-menu {
    min-width: 180px;
    right: -0.5rem;
  }
  
  .dropdown-item {
    padding: 1rem 1.25rem;
    font-size: 1rem;
  }
}

/* Mobile-specific responsive adjustments */
@media (width <= 768px) {
  .dropdown-menu {
    right: 0.5rem;
    min-width: 160px;
  }
  
  .user-header-right {
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
  }
  
  .user-header-right span {
    font-size: 0.9rem;
  }
  
  .user-avatar-lg {
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (width <= 480px) {
  .dropdown-menu {
    right: 0.25rem;
    min-width: 140px;
  }
  
  .dropdown-item {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }
  
  .user-header-right {
    padding: 0.375rem 0.5rem;
  }
  
  .user-header-right span {
    font-size: 0.8rem;
  }
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