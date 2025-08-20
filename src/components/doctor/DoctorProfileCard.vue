<template>
  <div class="profile-container">
    <!-- Header Section -->
    <div class="profile-header">
      <div class="header-content">
        <h1 class="profile-title">Doctor Profile</h1>
        <p class="profile-subtitle">Manage your professional information</p>
      </div>
      <div class="header-actions">
        <button class="edit-btn" @click="isEditing = true" v-if="!isEditing">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Profile Card -->
    <div class="profile-card">
      <div class="form-container">
        <form v-if="doctor" @submit.prevent="submitForm" class="profile-form">
          <!-- Personal Information Section -->
          <div class="form-section">
            <h3 class="section-title">Personal Information</h3>
            <div class="form-grid">
              <!-- Full Name -->
              <div class="form-group">
                <label class="form-label">Full Name <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.full_name" type="text" class="form-input" required placeholder="Enter your full name" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.full_name }}</div>
                </template>
              </div>
              
              <!-- Email -->
              <div class="form-group">
                <label class="form-label">Email <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.email" type="email" class="form-input disabled" required readonly placeholder="Email address" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.email }}</div>
                </template>
              </div>
              
              <!-- Mobile -->
              <div class="form-group">
                <label class="form-label">Mobile <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.mobile" type="tel" class="form-input" required placeholder="Enter mobile number" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.mobile }}</div>
                </template>
              </div>
              
              <!-- Gender -->
              <div class="form-group">
                <label class="form-label">Gender <span class="required">*</span></label>
                <template v-if="isEditing">
                  <select v-model="doctor.gender" class="form-input" required>
                    <option disabled value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.gender }}</div>
                </template>
              </div>
              
              <!-- DOB -->
              <div class="form-group">
                <label class="form-label">Date of Birth <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.dob" type="date" class="form-input" required />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.dob }}</div>
                </template>
              </div>
              
              <!-- Blood Group -->
              <div class="form-group">
                <label class="form-label">Blood Group <span class="required">*</span></label>
                <template v-if="isEditing">
                  <select v-model="doctor.blood_group" class="form-input" required>
                    <option disabled value="">Select Blood Group</option>
                    <option v-for="group in bloodGroups" :key="group">{{ group }}</option>
                  </select>
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.blood_group }}</div>
                </template>
              </div>
            </div>
          </div>

          <!-- Professional Information Section -->
          <div class="form-section">
            <h3 class="section-title">Professional Information</h3>
            <div class="form-grid">
              <!-- Specialty -->
              <div class="form-group">
                <label class="form-label">Specialty <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.specialty" type="text" class="form-input" required placeholder="e.g., Cardiology, Neurology" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.specialty }}</div>
                </template>
              </div>
              
              <!-- Qualification -->
              <div class="form-group">
                <label class="form-label">Qualification <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.qualification" type="text" class="form-input" required placeholder="e.g., MBBS, MD" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.qualification }}</div>
                </template>
              </div>
              
              <!-- Experience -->
              <div class="form-group">
                <label class="form-label">Experience (Years) <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model.number="doctor.experience" type="number" class="form-input" required placeholder="Years of experience" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.experience }} years</div>
                </template>
              </div>
              
              <!-- Registration Number -->
              <div class="form-group">
                <label class="form-label">Registration Number <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.registration_number" type="text" class="form-input" required placeholder="Medical registration number" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.registration_number }}</div>
                </template>
              </div>
              
              <!-- License No -->
              <div class="form-group">
                <label class="form-label">License Number <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.license_number" type="text" class="form-input" required placeholder="Medical license number" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.license_number }}</div>
                </template>
              </div>
              
              <!-- Medical Council -->
              <div class="form-group">
                <label class="form-label">Medical Council</label>
                <template v-if="isEditing">
                  <input v-model="doctor.council" type="text" class="form-input" placeholder="Medical council name" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.council || 'Not specified' }}</div>
                </template>
              </div>
            </div>
          </div>

          <!-- Clinic Information Section -->
          <div class="form-section">
            <h3 class="section-title">Clinic Information</h3>
            <div class="form-grid">
              <!-- Clinic Name -->
              <div class="form-group">
                <label class="form-label">Clinic/Hospital Name <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.clinic_name" type="text" class="form-input" required placeholder="Clinic or hospital name" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.clinic_name }}</div>
                </template>
              </div>
              
              <!-- Clinic Address -->
              <div class="form-group">
                <label class="form-label">Clinic Address <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.clinic_address" type="text" class="form-input" required placeholder="Complete clinic address" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.clinic_address }}</div>
                </template>
              </div>
              
              <!-- City -->
              <div class="form-group">
                <label class="form-label">City <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.city" type="text" class="form-input" required placeholder="City name" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.city }}</div>
                </template>
              </div>
              
              <!-- State -->
              <div class="form-group">
                <label class="form-label">State <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.state" type="text" class="form-input" required placeholder="State name" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.state }}</div>
                </template>
              </div>
              
              <!-- Zip Code -->
              <div class="form-group">
                <label class="form-label">Zip Code <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.zip" type="text" class="form-input" required placeholder="Postal code" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.zip }}</div>
                </template>
              </div>
              
              <!-- Location Description -->
              <div class="form-group">
                <label class="form-label">Location Description</label>
                <template v-if="isEditing">
                  <input v-model="doctor.location" type="text" class="form-input" placeholder="Additional location details" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.location || 'Not specified' }}</div>
                </template>
              </div>
            </div>
          </div>

          <!-- Availability & Settings Section -->
          <div class="form-section">
            <h3 class="section-title">Availability & Settings</h3>
            <div class="form-grid">
              <!-- Language -->
              <div class="form-group">
                <label class="form-label">Languages <span class="required">*</span></label>
                <template v-if="isEditing">
                  <div class="checkbox-group">
                    <div v-for="lang in indianLanguages" :key="lang" class="checkbox-item">
                      <input 
                        type="checkbox" 
                        :id="`lang-${lang}`" 
                        :value="lang" 
                        v-model="doctor.selectedLanguages"
                        class="checkbox-input"
                      />
                      <label :for="`lang-${lang}`" class="checkbox-label">{{ lang }}</label>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="form-display">
                    <div class="tags-container">
                      <span v-for="lang in doctor.selectedLanguages" :key="lang" class="tag">{{ lang }}</span>
                    </div>
                  </div>
                </template>
              </div>
              
              <!-- Available Days -->
              <div class="form-group">
                <label class="form-label">Available Days <span class="required">*</span></label>
                <template v-if="isEditing">
                  <div class="checkbox-group">
                    <div v-for="day in daysOfWeek" :key="day" class="checkbox-item">
                      <input 
                        type="checkbox" 
                        :id="`day-${day}`" 
                        :value="day" 
                        v-model="doctor.selectedDays"
                        class="checkbox-input"
                      />
                      <label :for="`day-${day}`" class="checkbox-label">{{ day }}</label>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="form-display">
                    <div class="tags-container">
                      <span v-for="day in doctor.selectedDays" :key="day" class="tag">{{ day }}</span>
                    </div>
                  </div>
                </template>
              </div>
              
              <!-- Available Timings -->
              <div class="form-group">
                <label class="form-label">Available From <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.available_from" type="time" class="form-input" required />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.available_from || 'Not specified' }}</div>
                </template>
              </div>
              
              <div class="form-group">
                <label class="form-label">Available To <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="doctor.available_to" type="time" class="form-input" required />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.available_to || 'Not specified' }}</div>
                </template>
              </div>
              
              <!-- Status -->
              <div class="form-group">
                <label class="form-label">Account Status</label>
                <div class="status-display" :class="getStatusClass()">
                  <div class="status-indicator"></div>
                  {{ getDisplayStatus() }}
                </div>
              </div>
            </div>
          </div>

          <!-- File Upload Section (Only in Edit Mode) -->
          <div class="form-section" v-if="isEditing">
            <h3 class="section-title">Documents</h3>
            <div class="form-grid">
              <!-- Upload Photo -->
              <div class="form-group">
                <label class="form-label">Profile Photo</label>
                <div class="file-upload-container">
                  <input type="file" @change="handlePhotoUpload" class="file-input" id="photo-upload" accept="image/*" />
                  <label for="photo-upload" class="file-upload-btn">
                    <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Choose Photo
                  </label>
                </div>
              </div>
              
              <!-- Upload Document -->
              <div class="form-group">
                <label class="form-label">Upload License/ID</label>
                <div class="file-upload-container">
                  <input type="file" @change="handleDocUpload" class="file-input" id="doc-upload" accept=".pdf,.jpg,.jpeg,.png" />
                  <label for="doc-upload" class="file-upload-btn">
                    <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Choose Document
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions" v-if="isEditing">
            <button type="button" class="btn-secondary" @click="cancelEdit">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Save Profile
            </button>
          </div>
        </form>
        <div v-else class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading profile information...</p>
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
          license_number: data.license_number || '', // Use actual API data
          clinic_name: data.clinic_name || '',
          clinic_address: data.clinic_address || '',
          city: data.city || '',
          zip: data.zip_code || '',
          state: data.state || '',
          selectedLanguages: [], // Initialize as array
          selectedDays: [], // Initialize as array
          available_from: data.available_from || '',
          available_to: data.available_to || '',
          status: data.status || '',
          council: data.council || '',
          location: data.location || '',
          approved: data.approved || false,
          suspended: data.suspended || false,
        };
        
        // Handle languages - convert from comma-separated string to array
        if (data.languages) {
          doctorObj.selectedLanguages = data.languages.split(',').map(lang => lang.trim()).filter(lang => lang);
        }
        
        // Handle available days - convert from string to array
        if (data.available_days) {
          // If it's a comma-separated string, split it
          if (typeof data.available_days === 'string') {
            doctorObj.selectedDays = data.available_days.split(',').map(day => day.trim()).filter(day => day);
          } else if (Array.isArray(data.available_days)) {
            doctorObj.selectedDays = data.available_days;
          } else {
            doctorObj.selectedDays = [data.available_days];
          }
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
        // Prepare data for API - convert arrays to comma-separated strings
        const submitData = {
          ...this.doctor,
          languages: this.doctor.selectedLanguages.join(', '),
          available_days: this.doctor.selectedDays.join(', ')
        };
        
        // Remove the array properties as they're not expected by the API
        delete submitData.selectedLanguages;
        delete submitData.selectedDays;
        
        const response = await fetch('http://127.0.0.1:5000/api/doctor/profile/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(submitData)
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
* {
  box-sizing: border-box;
}

.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Header Section */
.profile-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-content h1.profile-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.2;
}

.header-content .profile-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  font-weight: 400;
}

.header-actions .edit-btn {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Profile Card */
.profile-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.form-container {
  max-height: 75vh;
  overflow-y: auto;
  padding: 2rem;
}

.form-container::-webkit-scrollbar {
  width: 8px;
}

.form-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.form-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
}

.form-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}

/* Form Sections */
.form-section {
  margin-bottom: 3rem;
}

.form-section:last-child {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid;
  border-image: linear-gradient(135deg, #667eea, #764ba2) 1;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.required {
  color: #ef4444;
  font-size: 1.1rem;
}

/* Form Inputs */
.form-input {
  width: 100%;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.875rem 1rem;
  background: #ffffff;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.form-input.disabled {
  background-color: #f8fafc;
  color: #64748b;
  cursor: not-allowed;
}

.form-input::placeholder {
  color: #94a3b8;
  font-style: italic;
}

/* Form Display (Non-editing mode) */
.form-display {
  padding: 0.875rem 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #374151;
  font-size: 1rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
}

/* Status Display */
.status-display {
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 3rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Checkbox Groups */
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-input {
  width: 1.125rem;
  height: 1.125rem;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  position: relative;
  accent-color: #667eea;
}

.checkbox-input:checked {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
}

.checkbox-input:checked + .checkbox-label {
  color: #667eea;
  font-weight: 600;
}

/* Tags Display */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 3rem;
  align-items: center;
}

.tag {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.status-display.text-red-600 {
  background: #fef2f2;
  color: #dc2626;
  border: 2px solid #fecaca;
}

.status-display.text-red-600 .status-indicator {
  background: #dc2626;
}

.status-display.text-yellow-600 {
  background: #fffbeb;
  color: #d97706;
  border: 2px solid #fed7aa;
}

.status-display.text-yellow-600 .status-indicator {
  background: #d97706;
}

.status-display.text-green-600 {
  background: #f0fdf4;
  color: #16a34a;
  border: 2px solid #bbf7d0;
}

.status-display.text-green-600 .status-indicator {
  background: #16a34a;
}

/* File Upload */
.file-upload-container {
  position: relative;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.file-upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  background: #f8fafc;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 3rem;
}

.file-upload-btn:hover {
  border-color: #667eea;
  background: #f1f5f9;
  color: #667eea;
}

.upload-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

.btn-secondary {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-text {
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }
  
  .profile-header {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;
  }
  
  .header-content h1.profile-title {
    font-size: 2rem;
  }
  
  .form-container {
    padding: 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .profile-container {
    padding: 0.5rem;
  }
  
  .profile-header {
    padding: 1rem;
    border-radius: 16px;
  }
  
  .profile-card {
    border-radius: 16px;
  }
  
  .form-container {
    padding: 1rem;
  }
  
  .header-content h1.profile-title {
    font-size: 1.75rem;
  }
}

/* Animation for smooth transitions */
.form-input,
.form-display,
.file-upload-btn {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
