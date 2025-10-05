<style scoped>
@media (width <= 900px) {
  .popup-container {
    flex-direction: column !important;
    padding: 1rem !important;
    gap: 1.5rem !important;
  }
}

@media (width <= 600px) {
  .popup-container {
    padding: 0.5rem 0.2rem !important;
    margin: 0 !important;
    width: 100vw;
    min-width: 0;
    box-sizing: border-box;
  }

  .popup-content {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
}
</style>
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
        <p><strong>Emergency Contact:</strong> {{ patient.emergency_contact_number }}</p>
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
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 50%);
}

.bg-white {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
  padding: 1.5rem;
  max-height: 90vh;
  overflow-y: auto;
  width: 90%;
  max-width: 600px;
}

/* Removed global body scroll lock to prevent page from becoming unscrollable */
</style>