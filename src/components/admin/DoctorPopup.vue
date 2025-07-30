<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg min-w-[300px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Doctor Details</h2>
      <div v-if="doctor">
        <p><strong>Name:</strong> {{ doctor.full_name }}</p>
        <p><strong>Email:</strong> {{ doctor.email }}</p>
        <p><strong>Specialization:</strong> {{ doctor.specialization || 'Not specified' }}</p>
        <p><strong>Mobile:</strong> {{ doctor.mobile || 'Not provided' }}</p>
        <p><strong>Status:</strong> {{ doctor.approved ? 'Approved' : 'Pending Approval' }}</p>
        <p><strong>Suspended:</strong> {{ doctor.suspended ? 'Yes' : 'No' }}</p>
        <!-- Add more doctor-specific fields as needed -->
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <button 
          v-if="!doctor.approved"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          @click="approveDoctor"
        >
          Approve
        </button>
        <button 
          v-if="doctor.approved && !doctor.suspended"
          class="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          @click="suspendDoctor"
        >
          Suspend
        </button>
        <button 
          v-else-if="doctor.suspended"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          @click="unsuspendDoctor"
        >
          Unsuspend
        </button>
        <button 
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          @click="closePopup"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorPopup',
  props: {
    doctor: {
      type: Object,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    approveDoctor() {
      this.$emit('approve', this.doctor.id);
    },
    suspendDoctor() {
      this.$emit('suspend', this.doctor.id);
    },
    unsuspendDoctor() {
      this.$emit('unsuspend', this.doctor.id);
    }
  }
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

button {
  transition: background-color 0.2s;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>