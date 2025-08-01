<template>
  <div class="bg-white max-w-5xl mx-auto p-6 md:p-10 rounded-2xl shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-blue-700">Patient Profile</h2>

    <form v-if="form" @submit.prevent="handleSave" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Email (Read-only) -->
      <div class="col-span-full">
        <label class="form-label">Email</label>
        <input v-model="form.email" class="form-input bg-gray-100 cursor-not-allowed" type="email" readonly />
      </div>

      <!-- Full Name & Mobile -->
      <div>
        <label class="form-label">Full Name *</label>
        <input v-model="form.full_name" class="form-input" type="text" required />
      </div>
      <div>
        <label class="form-label">Mobile *</label>
        <input v-model="form.mobile" class="form-input" type="tel" required />
      </div>

      <!-- Gender & DOB -->
      <div>
        <label class="form-label">Gender *</label>
        <select v-model="form.gender" class="form-input" required>
          <option disabled value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label class="form-label">Date of Birth *</label>
        <input v-model="form.dob" class="form-input" type="date" required />
      </div>

      <!-- Blood Group -->
      <div>
        <label class="form-label">Blood Group *</label>
        <select v-model="form.blood_group" class="form-input" required>
          <option disabled value="">Select Blood Group</option>
          <option v-for="bg in bloodGroups" :key="bg" :value="bg">{{ bg }}</option>
        </select>
      </div>

      <!-- Address Fields -->
      <div class="col-span-full">
        <label class="form-label">Address Line *</label>
        <input v-model="form.address" class="form-input" type="text" required />
      </div>

      <div>
        <label class="form-label">City *</label>
        <input v-model="form.city" class="form-input" type="text" required />
      </div>
      <div>
        <label class="form-label">State *</label>
        <input v-model="form.state" class="form-input" type="text" required />
      </div>
      <div>
        <label class="form-label">ZIP</label>
        <input v-model="form.zip" class="form-input" type="text" />
      </div>
      <div>
        <label class="form-label">Country *</label>
        <input v-model="form.country" class="form-input" type="text" required />
      </div>

      <!-- Medical Info -->
      <div class="col-span-full">
        <label class="form-label">Known Allergies</label>
        <textarea v-model="form.allergies" class="form-input" rows="2"></textarea>
      </div>
      <div class="col-span-full">
        <label class="form-label">Existing Conditions</label>
        <textarea v-model="form.conditions" class="form-input" rows="2"></textarea>
      </div>
      <div class="col-span-full">
        <label class="form-label">Current Medications</label>
        <textarea v-model="form.medications" class="form-input" rows="2"></textarea>
      </div>
      <div class="col-span-full">
        <label class="form-label">Past Surgeries</label>
        <textarea v-model="form.surgeries" class="form-input" rows="2"></textarea>
      </div>

      <!-- Emergency Contact -->
      <div>
        <label class="form-label">Emergency Contact Name</label>
        <input v-model="form.emergency_contact_name" class="form-input" type="text" />
      </div>
      <div>
        <label class="form-label">Emergency Contact Number</label>
        <input v-model="form.emergency_contact_number" class="form-input" type="tel" />
      </div>

      <!-- Document Upload -->
      <div class="col-span-full">
        <label class="form-label">Upload Medical Document (PDF/JPG/PNG)</label>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" @change="handleFileUpload" class="block w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white" />
      </div>

      <!-- Submit Button -->
      <div class="col-span-full flex justify-end">
        <button type="submit" class="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Profile
        </button>
      </div>
    </form>

    <div v-else class="text-center py-6">
      <p>Loading profile...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PatientProfileCard',
  data() {
    return {
      form: null,
      documentFile: null,
      bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data?.patient) {
        const patient = { ...res.data.patient }
        // Use the correct key for date of birth
        patient.dob = patient.dob || patient.date_of_birth || ''
        // Ensure format is YYYY-MM-DD
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/
        if (patient.dob && !dobRegex.test(patient.dob)) {
          const date = new Date(patient.dob)
          patient.dob = date.toISOString().slice(0, 10)
        }
        this.form = patient
      }
    } catch (err) {
      console.error('Profile API error:', err)
    }
  },
  methods: {
    handleFileUpload(event) {
      this.documentFile = event.target.files[0]
    },
    async handleSave() {
      const token = localStorage.getItem('token')

      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key] || '')
      }
      if (this.documentFile) {
        formData.append('document', this.documentFile)
      }

      try {
        await axios.put('http://127.0.0.1:5000/api/patient/updateprofile', formData, {
          headers: {
            Authorization: `Bearer ${token}`
            // Do not set 'Content-Type' manually
          },
        })
        alert('Profile updated successfully')
      } catch (err) {
        console.error('Profile update failed:', err)
        alert('Failed to save profile')
      }
    }
  }
}
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.form-input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
