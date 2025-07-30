<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
    <h2>Welcome to Patient Dashboard!</h2>
    <p>You have successfully logged in.</p>
  </div>
</template>

<script>
import axios from 'axios'; // <-- Add this line

export default {
  name: 'PatientDashboard',
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
      this.$router.replace('/'); // Prevent going back to dashboard
    },
  }
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
  margin-bottom: 1rem;
}
.logout-btn {
  background-color: #275FD4;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.logout-btn:hover {
  background-color: #1a3e8a;
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