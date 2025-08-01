<template>
  <div class="patient-profile-card">
    <h2 class="title">Patient Profile</h2>
    <div v-if="profile" class="profile-details">
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'PatientProfileCard',
  data() {
    return {
      profile: null
    }
  },
  async mounted() {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.profile = res.data;
    } catch (err) {
      console.error('Profile API error:', err);
    }
  }
}
</script>

<style scoped>
.patient-profile-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(39, 95, 212, 0.08);
  padding: 2rem;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.profile-details p {
  margin-bottom: 0.5rem;
}
</style>