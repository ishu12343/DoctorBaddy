<template>
  <div class="bg-white p-6 rounded-lg shadow w-full max-w-4xl mx-auto">
    <h2 class="text-2xl font-semibold mb-6">Edit Doctor Profile</h2>

    <form @submit.prevent="submitForm" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Full Name -->
      <div>
        <label>Full Name <span class="text-red-500">*</span></label>
        <input v-model="doctor.full_name" type="text" class="input" required />
      </div>

      <!-- Email -->
      <div>
        <label>Email <span class="text-red-500">*</span></label>
        <input v-model="doctor.email" type="email" class="input" required />
      </div>

      <!-- Mobile -->
      <div>
        <label>Mobile <span class="text-red-500">*</span></label>
        <input v-model="doctor.mobile" type="tel" class="input" required />
      </div>

      <!-- Gender -->
      <div>
        <label>Gender <span class="text-red-500">*</span></label>
        <select v-model="doctor.gender" class="input" required>
          <option disabled value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <!-- DOB -->
      <div>
        <label>Date of Birth <span class="text-red-500">*</span></label>
        <input v-model="doctor.dob" type="date" class="input" required />
      </div>

      <!-- Blood Group -->
      <div>
        <label>Blood Group <span class="text-red-500">*</span></label>
        <select v-model="doctor.blood_group" class="input" required>
          <option disabled value="">Select</option>
          <option v-for="group in bloodGroups" :key="group">{{ group }}</option>
        </select>
      </div>

      <!-- Specialty -->
      <div>
        <label>Specialty <span class="text-red-500">*</span></label>
        <input v-model="doctor.specialty" type="text" class="input" required />
      </div>

      <!-- Qualification -->
      <div>
        <label>Qualification <span class="text-red-500">*</span></label>
        <input v-model="doctor.qualification" type="text" class="input" required />
      </div>

      <!-- Experience -->
      <div>
        <label>Experience (Years) <span class="text-red-500">*</span></label>
        <input v-model.number="doctor.experience" type="number" class="input" required />
      </div>

      <!-- Registration Number -->
      <div>
        <label>Registration Number <span class="text-red-500">*</span></label>
        <input v-model="doctor.registration_number" type="text" class="input" required />
      </div>

      <!-- License No -->
      <div>
        <label>License Number <span class="text-red-500">*</span></label>
        <input v-model="doctor.license_number" type="text" class="input" required />
      </div>

      <!-- Clinic Name -->
      <div>
        <label>Clinic/Hospital Name <span class="text-red-500">*</span></label>
        <input v-model="doctor.clinic_name" type="text" class="input" required />
      </div>

      <!-- Clinic Address -->
      <div>
        <label>Clinic Address <span class="text-red-500">*</span></label>
        <input v-model="doctor.clinic_address" type="text" class="input" required />
      </div>

      <!-- City -->
      <div>
        <label>City <span class="text-red-500">*</span></label>
        <input v-model="doctor.city" type="text" class="input" required />
      </div>

      <!-- Zip Code -->
      <div>
        <label>Zip Code <span class="text-red-500">*</span></label>
        <input v-model="doctor.zip" type="text" class="input" required />
      </div>

      <!-- State -->
      <div>
        <label>State <span class="text-red-500">*</span></label>
        <input v-model="doctor.state" type="text" class="input" required />
      </div>

      <!-- Language -->
      <div>
        <label>Language <span class="text-red-500">*</span></label>
        <select v-model="doctor.language" class="input" required>
          <option disabled value="">Select</option>
          <option v-for="lang in indianLanguages" :key="lang">{{ lang }}</option>
        </select>
      </div>

      <!-- Available Days -->
      <div>
        <label>Available Days <span class="text-red-500">*</span></label>
        <select v-model="doctor.available_days" class="input" required>
          <option disabled value="">Select</option>
          <option v-for="day in daysOfWeek" :key="day">{{ day }}</option>
        </select>
      </div>

      <!-- Available Timings -->
      <div>
        <label>Available Timings <span class="text-red-500">*</span></label>
        <input v-model="doctor.available_timings" type="time" class="input" required />
      </div>

      <!-- Status -->
      <div>
        <label>Status <span class="text-red-500">*</span></label>
        <select v-model="doctor.status" class="input" required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Medical Council -->
      <div>
        <label>Medical Council</label>
        <input v-model="doctor.council" type="text" class="input" />
      </div>

      <!-- Location Description -->
      <div>
        <label>Location (Description)</label>
        <input v-model="doctor.location" type="text" class="input" />
      </div>

      <!-- Upload Photo -->
      <div>
        <label>Profile Photo</label>
        <input type="file" @change="handlePhotoUpload" class="input" />
      </div>

      <!-- Upload Document -->
      <div>
        <label>Upload License/ID</label>
        <input type="file" @change="handleDocUpload" class="input" />
      </div>

      <div class="sm:col-span-2">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Profile
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctor: {
        full_name: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        blood_group: '',
        specialty: '',
        qualification: '',
        experience: null,
        registration_number: '',
        license_number: '',
        clinic_name: '',
        clinic_address: '',
        city: '',
        zip: '',
        state: '',
        language: '',
        available_days: '',
        available_timings: '',
        status: 'Active',
        council: '',
        location: '',
      },
      bloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      indianLanguages: [
        'Hindi', 'Gujarati', 'Marathi', 'Punjabi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam',
        'Bengali', 'Odia', 'Assamese', 'Urdu'
      ],
      photoFile: null,
      docFile: null,
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
        // Normalize DOB format
        let dob = data.dob || '';
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dob && !dobRegex.test(dob)) {
          const date = new Date(dob);
          dob = date.toISOString().slice(0, 10);
        }
        this.doctor = {
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
          language: '', // Will be set below
          available_days: data.available_days || '',
          available_timings: data.available_from ? `${data.available_from} - ${data.available_to}` : '',
          status: data.status || '',
          council: data.council || '',
          location: data.location || '',
        };
        // Set language (first from languages list)
        if (data.languages) {
          const langs = data.languages.split(',');
          this.doctor.language = langs[0] || '';
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
      } catch (error) {
        alert('Error: ' + error.message);
      }
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
</style>
