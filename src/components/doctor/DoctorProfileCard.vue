<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-lg font-semibold mb-2">Profile Overview</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="flex items-center space-x-4">
        <img :src="doctor.photoUrl || defaultPhoto" alt="Doctor Photo" class="w-16 h-16 rounded-full border" />
        <div>
          <h3 class="text-xl font-bold">{{ doctor.fullName }}</h3>
          <p class="text-sm text-gray-600">{{ doctor.specialty }}</p>
          <p class="text-sm">{{ doctor.degree }} | {{ doctor.experience }} yrs</p>
        </div>
      </div>
      <div class="mt-4 text-sm text-gray-700">
        <p><strong>Email:</strong> {{ doctor.email }}</p>
        <p><strong>Phone:</strong> {{ doctor.mobile }}</p>
        <p><strong>Clinic:</strong> {{ doctor.clinicName }} ({{ doctor.clinicAddress }})</p>
        <p><strong>Status:</strong> <span :class="statusClass">{{ doctor.status }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctor: {},
      loading: true,
      defaultPhoto: 'https://via.placeholder.com/64'
    };
  },
  computed: {
    statusClass() {
      return this.doctor.status === 'APPROVED' ? 'text-green-600' : 'text-yellow-600';
    }
  },
  async created() {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/doctor/profile', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      this.doctor = await res.json();
    } catch (err) {
      alert(err.message);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.status-approved {
  color: green;
}
.status-pending {
  color: orange;
}
</style>
