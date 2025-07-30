<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <div v-if="profile" class="profile-section">
        <h3>Your Profile</h3>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Role:</strong> {{ profile.role }}</p>
        <p><strong>Full Name:</strong> {{ profile.patient.full_name }}</p>
        <p><strong>Patient Email:</strong> {{ profile.patient.email }}</p>
        <p><strong>Patient ID:</strong> {{ profile.patient.id }}</p>
        <p><strong>Mobile:</strong> {{ profile.patient.mobile }}</p>
      </div>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
    <h2>Welcome to Patient Dashboard!</h2>
    <p>You have successfully logged in.</p>
    <div v-if="!profile">
      <p>Loading profile...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PatientDashboard',
  data() {
    return {
      profile: null,
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
    async fetchProfile() {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.profile = res.data;
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
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  position: relative;
}
.dashboard-header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 2rem;
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
.logout-btn {
  align-self: flex-start;
  background: linear-gradient(90deg, #275FD4 0%, #1a3e8a 100%);
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(39, 95, 212, 0.12);
  transition: background 0.2s, transform 0.2s;
  margin-left: 1.5rem;
}
.logout-btn:hover {
  background: linear-gradient(90deg, #1a3e8a 0%, #275FD4 100%);
  transform: translateY(-2px) scale(1.05);
}
h2 {
  color: #275FD4;
  margin-bottom: 1rem;
}
p {
  font-size: 1.2rem;
  color: #333;
}
</style>