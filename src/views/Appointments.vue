<template>
  <MainHeader />
  <div>
    <h2>Book Appointment</h2>
    <form @submit.prevent="bookAppointment">
      <input v-model="appointment.patient.id" placeholder="Patient ID" />
      <input v-model="appointment.doctor.id" placeholder="Doctor ID" />
      <input v-model="appointment.appointmentTime" placeholder="YYYY-MM-DDTHH:MM:SS" />
      <button type="submit">Book</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import MainHeader from '../components/MainHeader.vue'

export default {
  name: 'DoctorAppointments',
  components: { MainHeader },
  data() {
    return {
      appointment: {
        patient: { id: '' },
        doctor: { id: '' },
        appointmentTime: ''
      }
    }
  },
  methods: {
    bookAppointment() {
      const token = localStorage.getItem("token");
      axios.post('http://localhost:8080/api/appointments', this.appointment, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })  
        .then(() => alert('Appointment booked'))
        .catch(() => alert('Error booking appointment'))
    }
  }
}
</script>
<style scoped>
.header {
  background-color: #1d2856 !important;
  background: #275FD4;
  color: #fff;
  padding: 0.5rem 0;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
}

.header__logo {
  height: 40px;
}

.header__nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.header__nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.btn--primary {
  background: #5C9EF0;
  color: #fff;
  border-radius: 6px;
  border: none;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

.btn--small { font-size: 0.9rem; padding: 0.4rem 1rem; }

.tab-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.tab-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
</style>

