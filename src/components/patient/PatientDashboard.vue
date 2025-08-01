<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-top">
        <button class="profile-btn" @click="showProfile = true">Profile</button>
        <!-- <button class="profile-btn" @click="goHome">Home</button> -->
      </div>
      <div class="sidebar-bottom">
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Dashboard Cards Row (above navbar) -->
      <!-- <template v-if="!showProfile && !showHome">
        <div class="dashboard-cards-row mb-6">
          <dashboard-card title="Appointments" :value="appointments" icon="📅" />
          <dashboard-card title="Prescriptions" :value="prescriptions" icon="💊" />
          <dashboard-card title="Bills" :value="bills" icon="💵" />
          <dashboard-card title="Messages" :value="messages" icon="✉️" />
        </div>
      </template> -->
      <header class="navbar">
        <span class="font-bold text-lg text-gray-700">Patient Dashboard</span>
      </header>

      <!-- Profile Modal -->
      <div v-if="showProfile" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="showProfile = false">&times;</button>
          <h2 class="text-xl font-bold mb-4">Patient Profile</h2>
          <div v-if="profile" class="profile-section">
            <p><strong>Email:</strong> {{ profile.email }}</p>
            <p><strong>Role:</strong> {{ profile.role }}</p>
            <p><strong>Full Name:</strong> {{ profile.patient.full_name }}</p>
            <p><strong>Patient Email:</strong> {{ profile.patient.email }}</p>
            <p><strong>Patient ID:</strong> {{ profile.patient.id }}</p>
            <p><strong>Mobile:</strong> {{ profile.patient.mobile }}</p>
          </div>
          <div v-else>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>

      <!-- Home -->
      <template v-if="showHome">
        <PatientHome />
      </template>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: {
  },
  data() {
    return {
      profile: null,
      showProfile: false,
      showHome: false,
      appointments: 0,
      prescriptions: 0,
      bills: 0,
      messages: 0
    };
  },
  methods: {
    async logout() {
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
    goHome() {
      this.showHome = true;
      this.showProfile = false;
    },
    async fetchProfile() {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.profile = res.data;
        // Example: set dashboard stats if available
        this.appointments = res.data.patient.appointments_count || 0;
        this.prescriptions = res.data.patient.prescriptions_count || 0;
        this.bills = res.data.patient.bills_count || 0;
        this.messages = res.data.patient.messages_count || 0;
      } catch (err) {
        console.error('Profile API error:', err);
      }
    },
  },
  mounted() {
    this.fetchProfile();
  },
}
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
.profile-section {
  background: #f5f8ff;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(39, 95, 212, 0.08);
  min-width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>