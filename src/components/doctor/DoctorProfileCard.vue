<template>
  <div>
    <!-- Fixed Actions Menu -->
    <div class="fixed top-6 right-8 z-50 flex gap-3">
      <button class="btn-primary" @click="isEditing = true" v-if="!isEditing">
        Edit Profile
      </button>
    </div>
    <nav class="flex items-center px-8 py-4 bg-white shadow mb-6"></nav>
    <div class="bg-white max-w-5xl mx-auto p-6 md:p-10 rounded-2xl shadow-md relative">
      <div class="form-scrollbar" style="max-height:70vh;overflow-y:auto;">
        <form v-if="doctor" @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Full Name -->
          <div>
            <label class="form-label">Full Name <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.full_name" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.full_name }}</div>
            </template>
          </div>
          <!-- Email -->
          <div>
            <label class="form-label">Email <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.email" type="email" class="form-input" required readonly />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.email }}</div>
            </template>
          </div>
          <!-- Mobile -->
          <div>
            <label class="form-label">Mobile <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.mobile" type="tel" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.mobile }}</div>
            </template>
          </div>
          <!-- Gender -->
          <div>
            <label class="form-label">Gender <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <select v-model="doctor.gender" class="form-input" required>
                <option disabled value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.gender }}</div>
            </template>
          </div>
          <!-- DOB -->
          <div>
            <label class="form-label">Date of Birth <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.dob" type="date" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.dob }}</div>
            </template>
          </div>
          <!-- Blood Group -->
          <div>
            <label class="form-label">Blood Group <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <select v-model="doctor.blood_group" class="form-input" required>
                <option disabled value="">Select</option>
                <option v-for="group in bloodGroups" :key="group">{{ group }}</option>
              </select>
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.blood_group }}</div>
            </template>
          </div>
          <!-- Specialty -->
          <div>
            <label class="form-label">Specialty <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.specialty" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.specialty }}</div>
            </template>
          </div>
          <!-- Qualification -->
          <div>
            <label class="form-label">Qualification <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.qualification" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.qualification }}</div>
            </template>
          </div>
          <!-- Experience -->
          <div>
            <label class="form-label">Experience (Years) <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model.number="doctor.experience" type="number" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.experience }}</div>
            </template>
          </div>
          <!-- Registration Number -->
          <div>
            <label class="form-label">Registration Number <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.registration_number" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.registration_number }}</div>
            </template>
          </div>
          <!-- License No -->
          <div>
            <label class="form-label">License Number <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.license_number" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.license_number }}</div>
            </template>
          </div>
          <!-- Clinic Name -->
          <div>
            <label class="form-label">Clinic/Hospital Name <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.clinic_name" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.clinic_name }}</div>
            </template>
          </div>
          <!-- Clinic Address -->
          <div>
            <label class="form-label">Clinic Address <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.clinic_address" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.clinic_address }}</div>
            </template>
          </div>
          <!-- City -->
          <div>
            <label class="form-label">City <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.city" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.city }}</div>
            </template>
          </div>
          <!-- Zip Code -->
          <div>
            <label class="form-label">Zip Code <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.zip" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.zip }}</div>
            </template>
          </div>
          <!-- State -->
          <div>
            <label class="form-label">State <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.state" type="text" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.state }}</div>
            </template>
          </div>
          <!-- Language -->
          <div>
            <label class="form-label">Language <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <select v-model="doctor.language" class="form-input" required>
                <option disabled value="">Select</option>
                <option v-for="lang in indianLanguages" :key="lang">{{ lang }}</option>
              </select>
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.language }}</div>
            </template>
          </div>
          <!-- Available Days -->
          <div>
            <label class="form-label">Available Days <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <select v-model="doctor.available_days" class="form-input" required>
                <option disabled value="">Select</option>
                <option v-for="day in daysOfWeek" :key="day">{{ day }}</option>
              </select>
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.available_days }}</div>
            </template>
          </div>
          <!-- Available Timings -->
          <div>
            <label class="form-label">Available Timings <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <input v-model="doctor.available_timings" type="time" class="form-input" required />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.available_timings }}</div>
            </template>
          </div>
          <!-- Status -->
          <div>
            <label class="form-label">Account Status <span class="text-red-500">*</span></label>
            <template v-if="isEditing">
              <select v-model="doctor.status" class="form-input" required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </template>
            <template v-else>
              <div class="form-input bg-gray-100" :class="getStatusClass()">{{ getDisplayStatus() }}</div>
            </template>
          </div>
          <!-- Medical Council -->
          <div>
            <label class="form-label">Medical Council</label>
            <template v-if="isEditing">
              <input v-model="doctor.council" type="text" class="form-input" />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.council }}</div>
            </template>
          </div>
          <!-- Location Description -->
          <div>
            <label class="form-label">Location (Description)</label>
            <template v-if="isEditing">
              <input v-model="doctor.location" type="text" class="form-input" />
            </template>
            <template v-else>
              <div class="form-input bg-gray-100">{{ doctor.location }}</div>
            </template>
          </div>
          <!-- Upload Photo -->
          <div v-if="isEditing">
            <label class="form-label">Profile Photo</label>
            <input type="file" @change="handlePhotoUpload" class="form-input" />
          </div>
          <!-- Upload Document -->
          <div v-if="isEditing">
            <label class="form-label">Upload License/ID</label>
            <input type="file" @change="handleDocUpload" class="form-input" />
          </div>
          <!-- Save/Cancel Buttons -->
          <div class="sm:col-span-2 flex justify-end form-actions" v-if="isEditing">
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onStatusUpdate: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      doctor: null,
      originalDoctor: null,
      bloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      indianLanguages: [
        'Hindi', 'Gujarati', 'Marathi', 'Punjabi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam',
        'Bengali', 'Odia', 'Assamese', 'Urdu'
      ],
      photoFile: null,
      docFile: null,
      isEditing: false
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://127.0.0.1:5000/api/doctor/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      if (data) {
        let dob = data.dob || '';
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dob && !dobRegex.test(dob)) {
          const date = new Date(dob);
          dob = date.toISOString().slice(0, 10);
        }
        const doctorObj = {
          full_name: data.full_name || '',
          email: data.email || '',
          mobile: data.mobile || '',
          gender: data.gender || '',
          dob: dob,
          blood_group: data.blood_group || '',
          specialty: data.specialty || '',
          qualification: data.degree || '',
          experience: data.experience || '',
          registration_number: data.registration_number || '',
          license_number: '', // Not present in response
          clinic_name: data.clinic_name || '',
          clinic_address: data.clinic_address || '',
          city: data.city || '',
          zip: data.zip_code || '',
          state: data.state || '',
          language: '',
          available_days: data.available_days || '',
          available_timings: data.available_from ? `${data.available_from} - ${data.available_to}` : '',
          status: data.status || '',
          council: data.council || '',
          location: data.location || '',
          approved: data.approved || false,
          suspended: data.suspended || false,
        };
        if (data.languages) {
          const langs = data.languages.split(',');
          doctorObj.language = langs[0] || '';
        }
        this.doctor = doctorObj;
        this.originalDoctor = { ...doctorObj };
        
        // Notify parent of status update if callback provided
        if (this.onStatusUpdate) {
          this.onStatusUpdate();
        }
      }
    } catch (err) {
      alert('Error fetching profile: ' + err.message);
    }
  },
  methods: {
    handlePhotoUpload(event) {
      this.photoFile = event.target.files[0];
    },
    handleDocUpload(event) {
      this.docFile = event.target.files[0];
    },
    async submitForm() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/doctor/profile/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(this.doctor)
        });

        if (!response.ok) throw new Error('Failed to save profile');
        
        this.isEditing = false;
        this.originalDoctor = { ...this.doctor };
        
        // Emit event to parent component
        this.$emit('profileUpdated');
        
        // Optional: you can remove this alert if you prefer only toast
        alert('Profile updated successfully!');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
    cancelEdit() {
      this.doctor = { ...this.originalDoctor };
      this.isEditing = false;
      this.photoFile = null;
      this.docFile = null;
    },
    getDisplayStatus() {
      if (!this.doctor) return 'Unknown';
      
      if (this.doctor.suspended) {
        return 'Suspended by Admin';
      } else if (!this.doctor.approved) {
        return 'Pending Admin Approval';
      } else if (this.doctor.approved && !this.doctor.suspended) {
        return 'Active - Approved';
      }
      return this.doctor.status || 'Unknown';
    },
    getStatusClass() {
      if (!this.doctor) return '';
      
      if (this.doctor.suspended) {
        return 'text-red-600 bg-red-50 border-red-200';
      } else if (!this.doctor.approved) {
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      } else if (this.doctor.approved && !this.doctor.suspended) {
        return 'text-green-600 bg-green-50 border-green-200';
      }
      return '';
    }
  }
};
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
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
.form-input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  background: #fff;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  transition: border-color 0.3s;
}
.form-input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}
.btn-primary {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
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
  text-align: right;
}
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
</style>
