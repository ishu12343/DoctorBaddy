<template>
  <div class="dashboard-layout">
    <!-- Toast Notifications -->
    <ToastNotification ref="toast" />
    
    <!-- Modern Sidebar -->
    <aside class="sidebar">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="logo-container">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" class="logo-svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <div class="logo-text">
            <h3 class="logo-title">DoctorBuddy</h3>
            <p class="logo-subtitle">Professional</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <p class="nav-section-title">MAIN MENU</p>
          <ul class="nav-list">
            <li class="nav-item">
              <button 
                class="nav-btn" 
                :class="{ 'active': showHome }"
                @click="goHome"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
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
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <span class="nav-text">Patients</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button class="nav-btn">
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <span class="nav-text">Medical Records</span>
                <div class="nav-indicator"></div>
              </button>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <p class="nav-section-title">SETTINGS</p>
          <ul class="nav-list">
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
          <span class="dashboard-title">Doctor Dashboard</span>
        </div>
        <div class="header-right">
          <div class="header-user-profile" @click="toggleUserDropdown" :class="{ 'dropdown-open': showUserDropdown }">
            <div class="header-user-info">
              <span class="header-user-name">{{ doctorStatus?.full_name || 'Loading...' }}</span>
              <span class="header-user-specialty">{{ doctorStatus?.specialty || 'Loading...' }}</span>
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
          <DoctorProfileCard :onStatusUpdate="refreshStatus" @profileUpdated="handleProfileUpdate" />
        </template>

        <!-- Appointments Page - Show only when home/appointments is selected -->
        <template v-else-if="showHome">
          <DoctorAppointments />
        </template>

        <!-- Default Welcome Page - Show when no specific page is selected -->
        <template v-else>
          <div class="welcome-container">
            <div class="welcome-card">
              <div class="welcome-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <h2 class="welcome-title">Welcome to Doctor Dashboard</h2>
              <p class="welcome-subtitle">Select an option from the sidebar to get started</p>
              <div class="quick-actions">
                <button class="quick-action-btn" @click="goHome">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  View Appointments
                </button>
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
import DoctorProfileCard from './DoctorProfileCard.vue';
import DoctorAppointments from './DoctorAppointments.vue';
import ToastNotification from '../ToastNotification.vue';

import axios from 'axios';

export default {
  components: { DoctorProfileCard, DoctorAppointments, ToastNotification },
  data() {
    return {
      showProfile: false,
      showHome: false,
      doctorStatus: null,
      lastToastShown: null,
      hasShownActiveToast: false, // Track if active toast has been shown
      showUserDropdown: false // Track dropdown visibility
    };
  },
  async mounted() {
    await this.checkDoctorStatus();
    this.showStatusToast();
    
    // Check if active toast was already shown in this session
    const activeToastShown = sessionStorage.getItem('activeToastShown');
    if (activeToastShown === 'true') {
      this.hasShownActiveToast = true;
    }

    // Add click outside listener for dropdown
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    async checkDoctorStatus() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/api/doctor/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data) {
          this.doctorStatus = response.data;
        }
      } catch (error) {
        console.error('Error checking doctor status:', error);
      }
    },
    showStatusToast() {
      if (!this.doctorStatus) return;
      
      let currentStatus = '';
      if (this.doctorStatus.suspended) {
        currentStatus = 'suspended';
      } else if (!this.doctorStatus.approved) {
        currentStatus = 'pending';
      } else if (this.doctorStatus.approved && !this.doctorStatus.suspended) {
        currentStatus = 'approved';
      }
      
      // Don't show the same toast again
      if (this.lastToastShown === currentStatus) return;
      this.lastToastShown = currentStatus;
      
      // Show toast notification based on approval status
      if (this.doctorStatus.suspended) {
        this.$refs.toast.showError(
          'Your account has been suspended by the administrator. Please contact support for assistance.',
          'Account Suspended',
          0 // Persistent toast
        );
      } else if (!this.doctorStatus.approved) {
        this.$refs.toast.showWarning(
          'Your account is pending approval by the administrator. You will be notified once approved.',
          'Pending Approval',
          0 // Persistent toast
        );
      } else if (this.doctorStatus.approved && !this.doctorStatus.suspended) {
        // Only show active toast if it hasn't been shown in this session
        if (!this.hasShownActiveToast) {
          this.$refs.toast.showSuccess(
            'Your account is approved and active. You can now manage appointments and patients.',
            'Account Active',
            3000 // Show for 3 seconds
          );
          this.hasShownActiveToast = true;
          // Store in session storage to persist across page refreshes
          sessionStorage.setItem('activeToastShown', 'true');
        }
      }
    },
    async logout() {
      this.showUserDropdown = false; // Close dropdown
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://127.0.0.1:5000/api/doctor/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Logout API error:', err);
      }
      
      // Clear all session data including toast tracking
      localStorage.removeItem('token');
      sessionStorage.removeItem('activeToastShown');
      
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
    async refreshStatus() {
      await this.checkDoctorStatus();
      this.showStatusToast();
    },
    handleProfileUpdate() {
      // Show success toast when profile is updated
      this.$refs.toast.showSuccess(
        'Your profile has been updated successfully!',
        'Profile Updated',
        4000
      );
      // Refresh status to show any changes, but don't reset active toast flag
      // since profile update shouldn't trigger the initial active account toast again
      this.checkDoctorStatus();
    }
  }
};
</script>

<style scoped>
/* Dashboard Layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  position: relative;
}

/* Modern Sidebar Styling - Fixed Width with Dynamic Behavior */
.sidebar {
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  width: 320px; /* Fixed width for desktop */
  min-width: 320px; /* Prevent shrinking */
  max-width: 320px; /* Prevent growing */
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  position: fixed; /* Fixed positioning for consistent behavior */
  left: 0;
  top: 0;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
  pointer-events: none;
}

/* Sidebar Header */
.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.logo-svg {
  width: 2rem;
  height: 2rem;
  color: white;
}

.logo-text {
  color: white;
  flex: 1;
  min-width: 0;
}

.logo-title {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logo-subtitle {
  font-size: 0.8rem;
  color: #cbd5e1;
  margin: 0.25rem 0 0 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Sidebar Navigation */
.sidebar-nav {
  flex: 1;
  padding: 2rem 0;
  position: relative;
  z-index: 1;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 2.5rem;
}

.nav-section:last-child {
  margin-bottom: 1rem;
}

.nav-section-title {
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin: 0 0 1.25rem 2rem;
  padding-left: 0.5rem;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.375rem;
}

.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 0;
  min-height: 3.5rem;
}

.nav-btn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981);
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-btn:hover,
.nav-btn.active {
  color: white;
  transform: translateX(8px);
}

.nav-btn:hover::after,
.nav-btn.active::after {
  opacity: 1;
}

.nav-btn:hover::before,
.nav-btn.active::before {
  transform: scaleY(1);
}

.nav-btn.active {
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.2), rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.05));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn:hover .nav-icon svg,
.nav-btn.active .nav-icon svg {
  transform: scale(1.15);
  filter: drop-shadow(0 2px 4px rgba(14, 165, 233, 0.4));
}

.nav-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 1;
}

.nav-indicator {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981);
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.nav-btn.active .nav-indicator {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.5);
}

/* Main Content - Adjusted for fixed sidebar */
.main-content {
  flex: 1;
  margin-left: 320px; /* Account for fixed sidebar width */
  padding: 0;
  background: #f8fafc;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

/* Top Header with User Profile */
.top-header {
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
  border-bottom: 3px solid;
  border-image: linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981) 1;
  padding: 1rem 2rem; /* Reduced padding */
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.15);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 320px; /* Account for sidebar width */
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 60px; /* Fixed height for reduced navbar */
}

.top-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.03) 0%, rgba(16, 185, 129, 0.02) 100%);
  pointer-events: none;
}

.header-left .dashboard-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: transparent;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(14, 165, 233, 0.1);
  position: relative;
}

.header-left .dashboard-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #0ea5e9, #10b981);
  border-radius: 2px;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-user-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 100%);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: visible; /* Changed from hidden to visible for dropdown */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-user-profile:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(14, 165, 233, 0.18);
}

.header-user-profile.dropdown-open {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.2);
}

.header-user-profile::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981);
}

.header-user-info {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.header-user-name {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-user-specialty {
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-user-avatar {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #10b981 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(14, 165, 233, 0.3);
  flex-shrink: 0;
  border: 3px solid rgba(255, 255, 255, 0.8);
  position: relative;
}

.header-user-avatar::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #0ea5e9, #10b981);
  border-radius: 50%;
  z-index: -1;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.header-user-avatar svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.dropdown-arrow {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.dropdown-arrow svg {
  width: 1rem;
  height: 1rem;
  color: #0ea5e9;
  transition: transform 0.3s ease;
}

.header-user-profile.dropdown-open .dropdown-arrow svg {
  transform: rotate(180deg);
}

.user-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
  border: 1px solid rgba(14, 165, 233, 0.1);
  backdrop-filter: blur(20px);
  min-width: 200px;
  z-index: 1001;
  overflow: hidden;
  transform-origin: top right;
  animation: dropdownAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes dropdownAppear {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.dropdown-signout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

.dropdown-signout-btn:hover {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
  color: #dc2626;
  transform: translateX(4px);
}

.dropdown-menu-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #0ea5e9;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

.dropdown-menu-btn:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.05));
  color: #0284c7;
  transform: translateX(4px);
}

.dropdown-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.2), transparent);
  margin: 0.5rem 0;
}

.dropdown-menu-btn svg,
.dropdown-signout-btn svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.header-signout-btn {
  display: none; /* Hide the old sign out button */
}

/* Content Wrapper */
.content-wrapper {
  flex: 1;
  padding: 2rem;
  padding-top: 4rem; /* Reduced from 6rem to account for smaller header */
  overflow-y: auto;
}

/* Welcome Page Styles */
.welcome-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.welcome-card {
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  max-width: 500px;
  width: 100%;
}

.welcome-icon {
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem auto;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.welcome-icon svg {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  line-height: 1.6;
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
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  min-width: 160px;
  justify-content: center;
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
  background: linear-gradient(135deg, #059669, #047857);
}

.quick-action-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.navbar {
  background: linear-gradient(135deg, #ffffff, #f1f5f9);
  padding: 1.5rem 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.02), rgba(147, 51, 234, 0.02));
  pointer-events: none;
}

.navbar span {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

/* Profile Modal Enhancement */
.fixed {
  backdrop-filter: blur(12px);
  z-index: 9999;
}

.fixed > div {
  max-width: 95vw !important;
  max-height: 95vh;
  overflow: auto;
  border-radius: 24px !important;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

/* Responsive Design with Fixed Widths */
@media (max-width: 1440px) {
  .sidebar {
    width: 300px;
    min-width: 300px;
    max-width: 300px;
  }
  
  .main-content {
    margin-left: 300px;
  }
  
  .top-header {
    left: 300px;
  }
}

@media (max-width: 1200px) {
  .sidebar {
    width: 280px;
    min-width: 280px;
    max-width: 280px;
  }
  
  .main-content {
    margin-left: 280px;
  }
  
  .top-header {
    left: 280px;
    padding: 1.25rem 1.5rem;
  }
  
  .content-wrapper {
    padding: 1.5rem;
    padding-top: 5.5rem;
  }
  
  .sidebar-header {
    padding: 1.5rem 1.25rem;
  }
  
  .nav-btn {
    padding: 0.875rem 1.5rem;
    gap: 1rem;
  }
  
  .header-user-profile {
    gap: 1rem;
    padding: 0.625rem 1rem;
  }
  
  .header-user-name {
    font-size: 0.95rem;
  }
  
  .header-user-specialty {
    font-size: 0.8rem;
  }
}

@media (max-width: 992px) {
  .sidebar {
    width: 260px;
    min-width: 260px;
    max-width: 260px;
  }
  
  .main-content {
    margin-left: 260px;
  }
  
  .top-header {
    left: 260px;
    padding: 1rem 1.25rem;
  }
  
  .content-wrapper {
    padding-top: 5rem;
  }
  
  .logo-title {
    font-size: 1.25rem;
  }
  
  .nav-btn {
    font-size: 0.95rem;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
  }
  
  .header-user-profile {
    gap: 0.75rem;
  }
  
  .header-user-avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .header-signout-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
    width: 280px;
    min-width: 280px;
    max-width: 280px;
    z-index: 9998;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
    width: 100%;
  }
  
  .top-header {
    left: 0;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .content-wrapper {
    padding: 1rem;
    padding-top: 8rem; /* Increased for mobile stacked header */
  }
  
  .header-left {
    text-align: center;
  }
  
  .dashboard-title {
    font-size: 1.375rem;
  }
  
  .header-right {
    justify-content: center;
  }
  
  .header-user-profile {
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .navbar {
    padding: 1rem 1.5rem;
    border-radius: 16px;
  }
  
  .navbar span {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100vw;
    min-width: 100vw;
    max-width: 100vw;
  }
  
  .content-wrapper {
    padding: 0.75rem;
    padding-top: 10rem; /* Increased for mobile vertical layout */
  }
  
  .top-header {
    padding: 0.75rem;
  }
  
  .dashboard-title {
    font-size: 1.25rem;
  }
  
  .header-user-profile {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .header-user-info {
    text-align: center;
  }
  
  .header-user-avatar {
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 auto;
  }
  
  .header-signout-btn {
    align-self: center;
    min-width: 120px;
  }
  
  .welcome-card {
    padding: 2rem 1.5rem;
  }
  
  .welcome-title {
    font-size: 1.75rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
  
  .quick-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .quick-action-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .navbar {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 12px;
  }
  
  .navbar span {
    font-size: 1.1rem;
  }
  
  .sidebar-header {
    padding: 1.25rem;
  }
  
  .logo-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .logo-svg {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .nav-btn {
    padding: 1rem 1.5rem;
    min-height: 3.25rem;
  }
}

/* Custom Scrollbar for Sidebar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5));
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(147, 51, 234, 0.7));
}

.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

/* Animations and Transitions */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.sidebar {
  animation: slideInFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn:hover {
  transform: translateX(8px);
}

/* Focus States for Accessibility */
.nav-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.logout-btn:focus {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .sidebar {
    display: none;
  }
  
  .main-content {
    margin-left: 0;
    padding: 0;
  }
}
</style>