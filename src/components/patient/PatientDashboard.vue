<template>
  <div class="dashboard-container">
    <h2>Welcome to Patient Dashboard!</h2>
    <p>You have successfully logged in.</p>
  </div>
</template>

<script>
export default {
  name: 'PatientDashboard'
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