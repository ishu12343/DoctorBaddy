<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg min-w-[300px] max-w-[90vw]">
      <h2 class="text-xl font-bold mb-4">Patient Details</h2>
      <div v-if="patient">
        <p><strong>Name:</strong> {{ patient.full_name }}</p>
        <p><strong>Email:</strong> {{ patient.email }}</p>
        <p><strong>Mobile:</strong> {{ patient.mobile }}</p>
        <p><strong>Status:</strong> {{ patient.is_active ? 'Active' : 'Deactivated' }}</p>
        <p><strong>Address:</strong> {{ patient.address }}</p>
        <p><strong>Blood Group:</strong> {{ patient.blood_group }}</p>
        <p><strong>Date of Birth:</strong> {{ patient.date_of_birth }}</p>
        <p><strong>Emergency Contact:</strong> {{ patient.emergency_contact }}</p>
        <p><strong>Gender:</strong> {{ patient.gender }}</p>
        <p><strong>Role:</strong> {{ patient.role }}</p>
        <p><strong>ID:</strong> {{ patient.id }}</p>
      </div>
      <button class="mt-4 bg-red-600 text-white px-4 py-2 rounded" @click="$emit('close')">
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientPopup',
  props: {
    patient: Object,
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-white {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  max-height: 90vh;
  overflow-y: auto;
  width: 90%;
  max-width: 600px;
}

/* Ensure the popup stays on top of other elements */
:global(body) {
  overflow: hidden;
}
</style>