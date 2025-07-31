<template>
  <div class="p-6 max-w-6xl mx-auto">
    <header class="flex items-center justify-between mb-6">
      <DoctorProfileCard />
      <button class="logout-btn" @click="logout">Logout</button>
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
  </div>
</template>

<script>
import DoctorProfileCard from './DoctorProfileCard.vue';
import axios from 'axios';

export default {
  components: {
    DoctorProfileCard
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
/* Optional custom styles */
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
</style>
