<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <span class="brand-text">PatientBuddy</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <ul class="nav-list">
            <li class="nav-item">
              <button 
                class="nav-btn" 
                :class="{ 'active': showHome }"
                @click="goHome"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                <span class="nav-text">Dashboard</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button class="nav-btn">
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <span class="nav-text">Appointments</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button class="nav-btn">
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <span class="nav-text">Medical Records</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button class="nav-btn">
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                  </svg>
                </div>
                <span class="nav-text">Settings</span>
                <div class="nav-indicator"></div>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Header with User Profile -->
      <header class="top-header">
        <div class="header-left">
          <span class="dashboard-title">Patient Dashboard</span>
        </div>
        <div class="header-right">
          <div class="header-user-profile" @click="toggleUserDropdown" :class="{ 'dropdown-open': showUserDropdown }">
            <div class="header-user-info">
              <span class="header-user-name">{{ patientInfo?.full_name || 'Patient' }}</span>
              <span class="header-user-specialty">{{ getPatientDisplayInfo() }}</span>
            </div>
            <div class="header-user-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div class="dropdown-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <!-- Dropdown Menu -->
            <div v-if="showUserDropdown" class="user-dropdown-menu">
              <button @click="goProfile" class="dropdown-menu-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>View Profile</span>
              </button>
              <div class="dropdown-divider"></div>
              <button @click="logout" class="dropdown-signout-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="content-wrapper">
        <!-- Profile Page - Show only profile when profile is selected -->
        <template v-if="showProfile">
          <PatientProfileCard />
        </template>

        <!-- Dashboard Home - Show only when home is selected -->
        <template v-else-if="showHome">
          <div class="welcome-container">
            <div class="welcome-card">
              <div class="welcome-header">
                <div class="welcome-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h2 class="welcome-title">Welcome to Your Healthcare Dashboard</h2>
                <p class="welcome-subtitle">Manage your health information and appointments</p>
              </div>
              
              <div class="quick-actions">
                <button class="quick-action-btn" @click="showProfile = true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import PatientProfileCard from './PatientProfileCard.vue';

export default {
  components: {
    PatientProfileCard
  },
  data() {
    return {
      showProfile: false,
      showHome: true, // Start with dashboard view
      showUserDropdown: false,
      patientInfo: null, // Store patient information
      appointments: 0,
      prescriptions: 0,
      bills: 0,
      messages: 0
    };
  },
  mounted() {
    // Add click outside listener for dropdown
    document.addEventListener('click', this.handleClickOutside);
    // Fetch patient information
    this.fetchPatientInfo();
  },
  beforeUnmount() {
    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    async logout() {
      this.showUserDropdown = false; // Close dropdown
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://127.0.0.1:5000/api/patient/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Logout API error:', err);
      }
      localStorage.removeItem('token');
      this.$router.replace('/');
    },
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.header-user-profile');
      if (dropdown && !dropdown.contains(event.target)) {
        this.showUserDropdown = false;
      }
    },
    goProfile() {
      this.showProfile = true;
      this.showHome = false;
      this.showUserDropdown = false; // Close dropdown
    },
    goHome() {
      this.showHome = true;
      this.showProfile = false;
    },
    async fetchPatientInfo() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data?.patient) {
          this.patientInfo = response.data.patient;
        }
      } catch (error) {
        console.error('Error fetching patient info:', error);
      }
    },
    getPatientDisplayInfo() {
      if (!this.patientInfo) return 'Healthcare Access';
      
      // Create a meaningful display string based on available patient info
      const parts = [];
      
      if (this.patientInfo.blood_group) {
        parts.push(`Blood Group: ${this.patientInfo.blood_group}`);
      }
      
      if (this.patientInfo.gender) {
        parts.push(this.patientInfo.gender);
      }
      
      if (this.patientInfo.city) {
        parts.push(this.patientInfo.city);
      }
      
      return parts.length > 0 ? parts.join(' • ') : 'Healthcare Access';
    },
    async fetchProfile() {
      // Remove profile fetching logic from here
      // Keep dashboard stats logic if needed, or move to a separate API if required
    },
  },
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Sidebar Styling */
.sidebar {
  width: 320px;
  background: linear-gradient(180deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%);
  box-shadow: 4px 0 20px rgba(30, 64, 175, 0.15);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.025em;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
}

.nav-section {
  padding: 0 1.5rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(4px);
}

.nav-btn.active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-btn.active .nav-indicator {
  opacity: 1;
  transform: scaleY(1);
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-text {
  flex: 1;
  text-align: left;
}

.nav-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 4px;
  height: 1.5rem;
  background: white;
  border-radius: 0 2px 2px 0;
  opacity: 0;
  transition: all 0.3s ease;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 320px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Top Header */
.top-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-user-profile {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.header-user-profile:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.header-user-profile.dropdown-open {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.header-user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
}

.header-user-specialty {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.2;
}

.header-user-avatar {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.header-user-avatar svg {
  width: 1.125rem;
  height: 1.125rem;
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.header-user-profile.dropdown-open .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-arrow svg {
  width: 100%;
  height: 100%;
}

/* User Dropdown Menu */
.user-dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid rgba(229, 231, 235, 0.8);
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  overflow: hidden;
  z-index: 1000;
  animation: dropdownSlide 0.2s ease-out;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-menu-btn, .dropdown-signout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.875rem;
  text-align: left;
}

.dropdown-menu-btn:hover {
  background: #f3f4f6;
}

.dropdown-signout-btn {
  color: #dc2626;
}

.dropdown-signout-btn:hover {
  background: #fef2f2;
}

.dropdown-menu-btn svg, .dropdown-signout-btn svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.25rem 0;
}

/* Content Wrapper */
.content-wrapper {
  flex: 1;
  padding: 2rem;
  background: transparent;
}

/* Welcome Container */
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 140px);
}

.welcome-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.welcome-header {
  margin-bottom: 2rem;
}

.welcome-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.welcome-icon svg {
  width: 2rem;
  height: 2rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.quick-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
}

.quick-action-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 280px;
  }
  
  .main-content {
    margin-left: 280px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .content-wrapper {
    padding: 1rem;
  }
  
  .welcome-card {
    padding: 2rem;
  }
  
  .welcome-title {
    font-size: 1.5rem;
  }
}
</style>