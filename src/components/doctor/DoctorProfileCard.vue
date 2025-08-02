<template>
  <div>
    <!-- Fixed Actions Menu -->
    <div class="fixed top-6 right-8 z-50 flex gap-3">
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="isEditing = true" v-if="!isEditing">
        Edit Profile
      </button>
    </div>
    <div class="bg-white p-6 rounded-lg shadow w-full max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-6">Doctor Profile</h2>
      <form v-if="doctor" @submit.prevent="submitForm" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Full Name -->
        <div>
          <label>Full Name <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.full_name" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.full_name }}</div>
          </template>
        </div>
        <!-- Email -->
        <div>
          <label>Email <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.email" type="email" class="input" required readonly />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.email }}</div>
          </template>
        </div>
        <!-- Mobile -->
        <div>
          <label>Mobile <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.mobile" type="tel" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.mobile }}</div>
          </template>
        </div>
        <!-- Gender -->
        <div>
          <label>Gender <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <select v-model="doctor.gender" class="input" required>
              <option disabled value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.gender }}</div>
          </template>
        </div>
        <!-- DOB -->
        <div>
          <label>Date of Birth <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.dob" type="date" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.dob }}</div>
          </template>
        </div>
        <!-- Blood Group -->
        <div>
          <label>Blood Group <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <select v-model="doctor.blood_group" class="input" required>
              <option disabled value="">Select</option>
              <option v-for="group in bloodGroups" :key="group">{{ group }}</option>
            </select>
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.blood_group }}</div>
          </template>
        </div>
        <!-- Specialty -->
        <div>
          <label>Specialty <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.specialty" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.specialty }}</div>
          </template>
        </div>
        <!-- Qualification -->
        <div>
          <label>Qualification <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.qualification" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.qualification }}</div>
          </template>
        </div>
        <!-- Experience -->
        <div>
          <label>Experience (Years) <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model.number="doctor.experience" type="number" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.experience }}</div>
          </template>
        </div>
        <!-- Registration Number -->
        <div>
          <label>Registration Number <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.registration_number" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.registration_number }}</div>
          </template>
        </div>
        <!-- License No -->
        <div>
          <label>License Number <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.license_number" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.license_number }}</div>
          </template>
        </div>
        <!-- Clinic Name -->
        <div>
          <label>Clinic/Hospital Name <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.clinic_name" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.clinic_name }}</div>
          </template>
        </div>
        <!-- Clinic Address -->
        <div>
          <label>Clinic Address <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.clinic_address" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.clinic_address }}</div>
          </template>
        </div>
        <!-- City -->
        <div>
          <label>City <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.city" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.city }}</div>
          </template>
        </div>
        <!-- Zip Code -->
        <div>
          <label>Zip Code <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.zip" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.zip }}</div>
          </template>
        </div>
        <!-- State -->
        <div>
          <label>State <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.state" type="text" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.state }}</div>
          </template>
        </div>
        <!-- Language -->
        <div>
          <label>Language <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <select v-model="doctor.language" class="input" required>
              <option disabled value="">Select</option>
              <option v-for="lang in indianLanguages" :key="lang">{{ lang }}</option>
            </select>
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.language }}</div>
          </template>
        </div>
        <!-- Available Days -->
        <div>
          <label>Available Days <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <select v-model="doctor.available_days" class="input" required>
              <option disabled value="">Select</option>
              <option v-for="day in daysOfWeek" :key="day">{{ day }}</option>
            </select>
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.available_days }}</div>
          </template>
        </div>
        <!-- Available Timings -->
        <div>
          <label>Available Timings <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <input v-model="doctor.available_timings" type="time" class="input" required />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.available_timings }}</div>
          </template>
        </div>
        <!-- Status -->
        <div>
          <label>Status <span class="text-red-500">*</span></label>
          <template v-if="isEditing">
            <select v-model="doctor.status" class="input" required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.status }}</div>
          </template>
        </div>
        <!-- Medical Council -->
        <div>
          <label>Medical Council</label>
          <template v-if="isEditing">
            <input v-model="doctor.council" type="text" class="input" />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.council }}</div>
          </template>
        </div>
        <!-- Location Description -->
        <div>
          <label>Location (Description)</label>
          <template v-if="isEditing">
            <input v-model="doctor.location" type="text" class="input" />
          </template>
          <template v-else>
            <div class="input bg-gray-100">{{ doctor.location }}</div>
          </template>
        </div>
        <!-- Upload Photo -->
        <div v-if="isEditing">
          <label>Profile Photo</label>
          <input type="file" @change="handlePhotoUpload" class="input" />
        </div>
        <!-- Upload Document -->
        <div v-if="isEditing">
          <label>Upload License/ID</label>
          <input type="file" @change="handleDocUpload" class="input" />
        </div>
        <!-- Save/Cancel Buttons -->
        <div class="sm:col-span-2 flex justify-end" v-if="isEditing">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Profile
          </button>
          <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded ml-4 hover:bg-gray-500" @click="cancelEdit">
            Cancel
          </button>
        </div>
      </form>
      <div v-else class="text-center py-6">
        <p>Loading profile...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        };
        if (data.languages) {
          const langs = data.languages.split(',');
          doctorObj.language = langs[0] || '';
        }
        this.doctor = doctorObj;
        this.originalDoctor = { ...doctorObj };
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
      const formData = new FormData();
      for (const key in this.doctor) {
        formData.append(key, this.doctor[key]);
      }
      if (this.photoFile) formData.append('photo', this.photoFile);
      if (this.docFile) formData.append('document', this.docFile);

      try {
        const response = await fetch('http://127.0.0.1:5000/api/doctor/profile/update', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          body: formData
        });

        if (!response.ok) throw new Error('Failed to save profile');
        alert('Profile updated successfully!');
        this.isEditing = false;
        this.originalDoctor = { ...this.doctor };
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
    cancelEdit() {
      this.doctor = { ...this.originalDoctor };
      this.isEditing = false;
      this.photoFile = null;
      this.docFile = null;
    }
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
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
</style>
