<template>
  <header class="bg-medical-primary text-white fixed top-0 left-0 right-0 w-full z-50 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Left: Profile Photo & Doctor Name -->
        <div class="flex items-center gap-3">
          <div class="user-avatar doctor-avatar-lg shadow-lg">
            <img
              v-if="doctorInfo?.profile_photo"
              :src="doctorInfo.profile_photo"
              alt="Profile Photo"
              class="h-10 w-10 rounded-full object-cover border-2 border-white"
            />
            <i v-else class="fas fa-user-circle text-3xl"></i>
          </div>
          <div class="flex flex-col items-start justify-center">
            <span class="font-semibold text-base text-white leading-tight">{{ doctorInfo?.full_name || 'Dr. User' }}</span>
          </div>
        </div>

  <!-- Desktop Navigation -->
  <nav class="hidden lg:flex items-center gap-8">
          <button 
            @click="$emit('navigate', 'dashboard')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'dashboard' }"
          >
            <i class="fas fa-tachometer-alt text-medical-secondary group-hover:text-white transition-colors"></i>
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
            @click="$emit('navigate', 'patients')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'patients' }"
          >
            <i class="fas fa-users text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Patients</span>
          </button>
          
          <button 
            @click="$emit('navigate', 'profile')"
            class="nav-item group"
            :class="{ 'active': currentPage === 'profile' }"
          >
            <i class="fas fa-user-md text-medical-secondary group-hover:text-white transition-colors"></i>
            <span>Profile</span>
          </button>
          
          <!-- Right: Home Icon removed -->
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="lg:hidden px-3 py-2 bg-white text-medical-primary rounded-full shadow border border-medical-secondary focus:outline-none focus:ring-2 focus:ring-medical-secondary"
          aria-label="Toggle mobile menu"
        >
          <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav 
        v-if="mobileMenuOpen" 
        class="lg:hidden pb-4 border-t border-medical-secondary mt-4 pt-4 animate-fade-in"
      >
        <div class="flex flex-col space-y-3">
          <!-- Top Row: Profile Photo, Doctor Name removed -->
          <button 
            @click="navigateAndClose('dashboard')"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
            :class="{ 'bg-medical-secondary': currentPage === 'dashboard' }"
          >
            <i class="fas fa-tachometer-alt text-medical-secondary"></i>
            <span>Dashboard</span>
          </button>
          
          <button 
            @click="navigateAndClose('appointments')"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
            :class="{ 'bg-medical-secondary': currentPage === 'appointments' }"
          >
            <i class="fas fa-calendar-alt text-medical-secondary"></i>
            <span>Appointments</span>
          </button>
          
          <button 
            @click="navigateAndClose('patients')"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
            :class="{ 'bg-medical-secondary': currentPage === 'patients' }"
          >
            <i class="fas fa-users text-medical-secondary"></i>
            <span>Patients</span>
          </button>
          
          <button 
            @click="navigateAndClose('profile')"
            class="flex items-center gap-3 px-4 py-3 text-white hover:bg-medical-secondary rounded-lg transition-colors"
            :class="{ 'bg-medical-secondary': currentPage === 'profile' }"
          >
            <i class="fas fa-user-md text-medical-secondary"></i>
            <span>Profile</span>
          </button>

          <!-- Mobile User Section -->
          <div class="pt-3 border-t border-medical-secondary/30">
            <div class="px-4 py-2 text-sm text-gray-300">
              <div class="flex items-center gap-3 mb-2">
                <div class="user-avatar doctor-avatar-lg shadow-lg">
                  <img
                    v-if="doctorInfo?.profile_photo"
                    :src="doctorInfo.profile_photo"
                    alt="Profile Photo"
                    class="h-11 w-11 rounded-full object-cover border-2 border-white"
                  />
                  <i v-else class="fas fa-user-circle text-2xl"></i>
                </div>
                <div class="flex flex-col items-start justify-center min-w-[100px]">
                  <span class="font-semibold text-base text-white leading-tight">{{ doctorInfo?.full_name || 'Dr. User' }}</span>
                  <div class="flex items-center gap-2 mt-1 text-xs text-gray-200">
                    <span v-if="doctorInfo?.specialty" class="ml-2">{{ doctorInfo.specialty }}</span>
                    <span v-if="doctorInfo?.average_rating !== undefined" class="flex items-center gap-1">
                      <span class="flex items-center">
                        <i v-for="star in 5" :key="star" class="fas fa-star" :class="star <= Math.round(doctorInfo.average_rating) ? 'text-yellow-400' : 'text-gray-300'" style="font-size: 1em;"></i>
                      </span>
                      <span class="font-bold text-white">({{ (Number(doctorInfo.average_rating) || 0).toFixed(1) }})</span>
                      <span v-if="doctorInfo.total_reviews !== undefined" class="text-gray-300">({{ doctorInfo.total_reviews }} reviews)</span>
                    </span>
                  </div>
                </div>
              </div>
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
  name: 'DoctorHeader',
  props: {
    currentPage: {
      type: String,
      default: 'dashboard'
    },
    doctorInfo: {
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
      if (this.isMobile) {
        this.showDropdown = !this.showDropdown;
      } else {
        this.showDropdown = !this.showDropdown;
      }
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
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    navigateAndClose(page) {
      this.$emit('navigate', page);
      this.closeMobileMenu();
    },
    logout() {
      this.$emit('logout');
      this.closeMobileMenu();
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
      
      // Close dropdowns when clicking outside
      if (this.showDropdown && !this.$refs.userDropdown?.contains(e.target)) {
        this.hideUserDropdown();
      }
    };
    
    document.addEventListener('click', this.clickListener);
    
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
/* Navigation styles */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  transition: color 0.2s;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
}

.nav-item:hover {
  color: #e5e7eb;
}

.nav-item.active {
  color: #fde047;
}

.nav-item.active i {
  color: #fde047;
}

/* Dropdown animations */
.animate-fade-in {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Dropdown items */
.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  color: white;
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;
  background: transparent;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: rgba(59, 130, 246, 0.8);
}

.dropdown-divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0.25rem 0;
}

/* User avatar */
.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
}
.doctor-avatar-lg {
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  min-height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,0.18);
  box-shadow: 0 2px 8px 0 rgb(54 209 196 / 12%);
}

/* Button styles */
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

.btn-small {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
}

/* Responsive adjustments */
@media (width <= 576px) {
  .nav-item span {
    font-size: 0.9rem;
  }
  
  .btn-primary {
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>