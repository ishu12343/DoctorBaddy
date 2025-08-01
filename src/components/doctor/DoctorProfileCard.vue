<template>
  <div class="bg-white p-4 rounded-lg shadow w-full max-w-3xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4">Doctor Profile</h2>

    <div v-if="loading" class="text-gray-500">Loading...</div>

    <div v-else class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <img
        :src="defaultPhoto"
        alt="Doctor Photo"
        class="rounded-full object-cover border-2"
        style="width: 14%; height: auto; min-width: 40px; max-width: 80px;"
      />
      <div>
        <h3 class="text-xl font-bold">{{ doctor.full_name }}</h3>
        <p class="text-sm text-gray-600 mb-1">{{ doctor.specialty }}</p>
        <p class="text-sm text-gray-500">{{ doctor.experience }}</p>
        <p class="mt-2 text-sm">
          <strong>Status:</strong>
          <span :class="statusClass">
            {{ doctor.approved === 1 ? '✅ Approved' : '⏳ Pending Approval' }}
          </span>
        </p>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
      <p><strong>Email:</strong> {{ doctor.email }}</p>
      <p><strong>Phone:</strong> {{ doctor.mobile }}</p>
      <p><strong>Clinic:</strong> {{ doctor.clinic_name }}</p>
      <p><strong>Clinic Address:</strong> {{ doctor.clinic_address }}</p>
      <p><strong>Registration Number:</strong> {{ doctor.registration_number }}</p>
      <p><strong>Medical Council:</strong> {{ doctor.council }}</p>
      <p><strong>Location:</strong> {{ doctor.location }}</p>
      <p><strong>Role:</strong> {{ doctor.role }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoctorProfileCard",
  data() {
    return {
      doctor: {},
      loading: true,
      defaultPhoto: require('@/assets/profile.jpg') // Use local image
    };
  },
  computed: {
    statusClass() {
      return this.doctor.approved === 1 ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold';
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
      const response = await res.json();
      this.doctor = response.doctor;
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.text-green-600 {
  color: #16a34a;
}
.text-yellow-600 {
  color: #ca8a04;
}
</style>
