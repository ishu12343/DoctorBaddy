<template>
  <div class="p-6 max-w-6xl mx-auto">
    <header class="flex items-center justify-between mb-6">
      <!-- Remove DoctorProfileCard from here -->
      <div class="flex gap-2">
        <button class="profile-btn" @click="showProfile = true">Profile</button>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </header>
    <h1 class="text-2xl font-bold mb-6">Doctor Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Other dashboard cards/components go here -->
      <!-- <EarningsSummary />
      <DoctorAvailability />
      <UpcomingAppointments />
      <PrescriptionUpload />
      <DoctorNotifications /> -->
    </div>

    <!-- Profile Modal -->
    <div v-if="showProfile" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="showProfile = false">&times;</button>
        <h2 class="text-xl font-bold mb-4">Doctor Profile</h2>
        <DoctorProfileCard />
      </div>
    </div>
  </div>
</template>

<script>
import DoctorProfileCard from './DoctorProfileCard.vue';
import axios from 'axios';

export default {
  components: {
    DoctorProfileCard
  },
  data() {
    return {
      showProfile: false
    };
  },
  methods: {
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
  }
};
</script>

<style scoped>
.logout-btn {
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #dc2626;
}
.profile-btn {
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background 0.2s;
}
.profile-btn:hover {
  background: #1d4ed8;
}
</style>
