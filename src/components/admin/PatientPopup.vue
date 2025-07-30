<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        @click="$emit('close')"
      >
        ✕
      </button>
      <h2 class="text-xl font-bold mb-4">Patient Details</h2>
      <div v-if="patient">
        <p><strong>ID:</strong> {{ patient.id }}</p>
        <p><strong>Name:</strong> {{ patient.full_name }}</p>
        <p><strong>Email:</strong> {{ patient.email }}</p>
        <p><strong>Mobile:</strong> {{ patient.mobile }}</p>
        <p><strong>Status:</strong> {{ patient.is_active ? 'Active' : 'Deactivated' }}</p>
        <!-- Add more fields as needed -->
      </div>
      <div v-else>
        <p>No patient data available.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientPopup',
  props: {
    patient: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleEsc);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  },
  methods: {
    handleEsc(e) {
      if (e.key === 'Escape') {
        this.$emit('close');
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles for the popup */
</style>