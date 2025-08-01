<template>
  <div>
    <!-- Fixed Actions Menu -->
    <div class="fixed top-6 right-8 z-50 flex gap-3">
      <button class="btn-primary" @click="isEditing = true" v-if="!isEditing">Edit Profile</button>
      <!-- <button class="btn-primary" @click="openDocumentModal">Upload/Update Documents</button>
      <button class="btn-primary" @click="openPasswordModal">Change Password</button> -->
    </div>
    <!-- Navbar -->
    <nav class="flex items-center px-8 py-4 bg-white shadow mb-6">
      <!-- <div class="text-xl font-bold">Patient Profile</div> -->
    </nav>
    <!-- Profile Card -->
    <div class="bg-white max-w-5xl mx-auto p-6 md:p-10 rounded-2xl shadow-md relative">
      <div class="form-scrollbar" style="max-height:70vh;overflow-y:auto;">
        <form v-if="form" @submit.prevent="handleSave" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Email (Read-only) -->
          <div class="col-span-full">
            <label class="form-group">Email</label>
            <template v-if="isEditing">
              <input v-model="form.email" class="form-control bg-gray-100 cursor-not-allowed" type="email" readonly />
            </template>
            <template v-else>
              <div class="form-control bg-gray-100">{{ form.email }}</div>
            </template>
          </div>

          <!-- Full Name & Mobile -->
          <div>
            <label class="form-group">Full Name *</label>
            <template v-if="isEditing">
              <input v-model="form.full_name" class="form-control" type="text" required />
            </template>
            <template v-else>
              <div class="form-control">{{ form.full_name }}</div>
            </template>
          </div>
          <div>
            <label class="form-group">Mobile *</label>
            <template v-if="isEditing">
              <input v-model="form.mobile" class="form-control" type="tel" required />
            </template>
            <template v-else>
              <div class="form-control">{{ form.mobile }}</div>
            </template>
          </div>

          <!-- Gender & DOB -->
          <div>
            <label class="form-group">Gender *</label>
            <template v-if="isEditing">
              <select v-model="form.gender" class="form-control" required>
                <option disabled value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </template>
            <template v-else>
              <div class="form-control">{{ form.gender }}</div>
            </template>
          </div>
          <div>
            <label class="form-group">Date of Birth *</label>
            <template v-if="isEditing">
              <input v-model="form.dob" class="form-control" type="date" required />
            </template>
            <template v-else>
              <div class="form-control">{{ form.dob }}</div>
            </template>
          </div>

          <!-- Blood Group -->
          <div>
            <label class="form-group">Blood Group *</label>
            <template v-if="isEditing">
              <select v-model="form.blood_group" class="form-control" required>
                <option disabled value="">Select Blood Group</option>
                <option v-for="bg in bloodGroups" :key="bg" :value="bg">{{ bg }}</option>
              </select>
            </template>
            <template v-else>
              <div class="form-control">{{ form.blood_group }}</div>
            </template>
          </div>

          <!-- Address Fields -->
          <div class="col-span-full">
            <label class="form-group">Address Line *</label>
            <template v-if="isEditing">
              <input v-model="form.address" class="form-control" type="text" required />
            </template>
            <template v-else>
              <div class="form-control">{{ form.address }}</div>
            </template>
          </div>

          <div>
            <label class="form-group">City *</label>
            <template v-if="isEditing">
              <input v-model="form.city" class="form-control" type="text" required />
            </template>
            <template v-else>
              <div class="form-control">{{ form.city }}</div>
            </template>
          </div>
          <div>
            <label class="form-group">State *</label>
            <template v-if="isEditing">
              <input v-model="form.state" class="form-control" type="text" required />
            </template>
            <template v-else>
              <div class="form-control">{{ form.state }}</div>
            </template>
          </div>
          <div>
            <label class="form-group">ZIP</label>
            <template v-if="isEditing">
              <input v-model="form.zip" class="form-control" type="text" />
            </template>
            <template v-else>
              <div class="form-control">{{ form.zip }}</div>
            </template>
          </div>
          <div>
            <label class="form-group">Country *</label>
            <template v-if="isEditing">
              <input v-model="form.country" class="form-control" type="text" required />
            </template>
            <template v-else>
              <div class="form-control">{{ form.country }}</div>
            </template>
          </div>

          <!-- Medical Info -->
          <div class="col-span-full">
            <label class="form-group">Known Allergies</label>
            <template v-if="isEditing">
              <textarea v-model="form.allergies" class="form-control" rows="2"></textarea>
            </template>
            <template v-else>
              <div class="form-control">{{ form.allergies }}</div>
            </template>
          </div>
          <div class="col-span-full">
            <label class="form-group">Existing Conditions</label>
            <template v-if="isEditing">
              <textarea v-model="form.conditions" class="form-control" rows="2"></textarea>
            </template>
            <template v-else>
              <div class="form-control">{{ form.conditions }}</div>
            </template>
          </div>
          <div class="col-span-full">
            <label class="form-group">Current Medications</label>
            <template v-if="isEditing">
              <textarea v-model="form.medications" class="form-control" rows="2"></textarea>
            </template>
            <template v-else>
              <div class="form-control">{{ form.medications }}</div>
            </template>
          </div>
          <div class="col-span-full">
            <label class="form-group">Past Surgeries</label>
            <template v-if="isEditing">
              <textarea v-model="form.surgeries" class="form-control" rows="2"></textarea>
            </template>
            <template v-else>
              <div class="form-control">{{ form.surgeries }}</div>
            </template>
          </div>

          <!-- Emergency Contact -->
          <div>
            <label class="form-group">Emergency Contact Name</label>
            <template v-if="isEditing">
              <input v-model="form.emergency_contact_name" class="form-control" type="text" />
            </template>
            <template v-else>
              <div class="form-control">{{ form.emergency_contact_name }}</div>
            </template>
          </div>
          <div>
            <label class="form-group">Emergency Contact Number</label>
            <template v-if="isEditing">
              <input v-model="form.emergency_contact_number" class="form-control" type="tel" />
            </template>
            <template v-else>
              <div class="form-control">{{ form.emergency_contact_number }}</div>
            </template>
          </div>

          <!-- Document Upload -->
          <div class="col-span-full" v-if="isEditing">
            <label class="form-group">Upload Medical Document (PDF/JPG/PNG)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" @change="handleFileUpload" class="form-control" />
          </div>

          <!-- Submit Button -->
          <div class="col-span-full flex justify-end" v-if="isEditing">
            <button type="submit" class="btn-primary">
              Save Profile
            </button>
            <button type="button" class="btn-primary ml-4 bg-gray-400 hover:bg-gray-500" @click="cancelEdit">
              Cancel
            </button>
          </div>
        </form>
        <div v-else class="text-center py-6">
          <p>Loading profile...</p>
        </div>
      </div>
      <!-- Modals for Document and Password can be added here -->
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
      originalForm: null,
      documentFile: null,
      bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      isEditing: false
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
        patient.dob = patient.dob || patient.date_of_birth || ''
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/
        if (patient.dob && !dobRegex.test(patient.dob)) {
          const date = new Date(patient.dob)
          patient.dob = date.toISOString().slice(0, 10)
        }
        this.form = patient
        this.originalForm = { ...patient }
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
          },
        })
        alert('Profile updated successfully')
        this.isEditing = false
        this.originalForm = { ...this.form }
      } catch (err) {
        console.error('Profile update failed:', err)
        alert('Failed to save profile')
      }
    },
    cancelEdit() {
      this.form = { ...this.originalForm }
      this.isEditing = false
      this.documentFile = null
    },
    openDocumentModal() {
      // TODO: Implement document modal logic
      alert('Open document upload/update modal')
    },
    openPasswordModal() {
      // TODO: Implement password change modal logic
      alert('Open change password modal')
    }
  }
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.top-6 {
  top: 1.5rem;
}
.right-8 {
  right: 2rem;
}
.z-50 {
  z-index: 50;
}
.form-scrollbar {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.form-input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400;
}

.form-group {
  margin-bottom: 1.5rem;
}


.form-control {
  width: 80%; /* Reduced from 100% */
  margin: 0 auto; /* Center the field */
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

/* Reuse the same styles as DoctorSignUp.vue */
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.auth-container {
  background: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-control {
  width: 80%; /* Reduced from 100% */
  margin: 0 auto; /* Center the field */
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

textarea.form-control {
  min-height: 100px;
  resize: vertical;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  margin: 0;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  /* width: 30%; */
  transition: background-color 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-primary:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.form-actions {
  margin-top: 2rem;
  text-align: center;
}

.login-link {
  margin-top: 1rem;
  text-align: center;
  color: #7f8c8d;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

/* Optional: Custom scrollbar styling */
.form-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.form-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.form-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .auth-container {
    padding: 1.5rem;
  }
  
  .auth-page {
    padding: 1rem;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Add this to your <style scoped> section */
.absolute.top-6.right-8 {
  z-index: 10;
}

.bg-white {
  position: relative;
  min-height: 40px; /* Ensure enough height for buttons */
  overflow: hidden;
}

</style>
