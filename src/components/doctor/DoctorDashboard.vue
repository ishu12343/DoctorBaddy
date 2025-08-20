<template>
  <div class="dashboard-layout">
    <!-- Toast Notifications -->
    <ToastNotification ref="toast" />
    
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-top">
        
        <button class="profile-btn" @click="showProfile = true">Profile</button>
        <button class="profile-btn" @click="goHome">Appointments</button>
        <div class="sidebar-bottom">
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
      </div>
      
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="navbar">
        <span class="font-bold text-lg text-gray-700">Doctor Dashboard</span>
      </header>

      <!-- Profile Modal -->
      <div v-if="showProfile" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <!-- <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="showProfile = false">&times;</button> -->
          <!-- <h2 class="text-xl font-bold mb-4">Doctor Profile</h2> -->
          <DoctorProfileCard :onStatusUpdate="refreshStatus" @profileUpdated="handleProfileUpdate" />
        </div>
      </div>

      <!-- Home -->
      <template v-if="showHome">
        <DoctorAppointments />
      </template>
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
      lastToastShown: null
    };
  },
  async mounted() {
    await this.checkDoctorStatus();
    this.showStatusToast();
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
        this.$refs.toast.showSuccess(
          'Your account is approved and active. You can now manage appointments and patients.',
          'Account Active',
          3000 // Show for 3 seconds
        );
      }
    },
    async logout() {
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://127.0.0.1:5000/api/doctor/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Logout API error:', err);
      }
      localStorage.removeItem('token');
      this.$router.replace('/');
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
      // Refresh status to show any changes
      this.refreshStatus();
    }
  }
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  background: linear-gradient(to right, #1D2856);
  padding: 2rem 1rem;
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 0.5rem 0 0 0.5rem;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  min-height: 80vh;
}
.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}
.sidebar-bottom {
  width: 100%;
}
.main-content {
  flex: 1;
  padding: 2rem;
}
.navbar {
  background: linear-gradient(to right, #3B82F6, #ffffff);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}
.logout-btn, .profile-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background 0.2s;
  color: white;
  width: 100%;
  text-align: left;
}
.logout-btn {
  background: #ef4444;
}
.logout-btn:hover {
  background: #dc2626;
}
.profile-btn {
  background: #2563eb;
}
.profile-btn:hover {
  background: #1d4ed8;
}
.dashboard-cards-row {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: flex-start;
  align-items: stretch;
}
</style>