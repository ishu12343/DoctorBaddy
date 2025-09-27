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
              <!-- Profile Photo Section -->
              <div class="form-group" v-if="isEditing">
                <label class="form-label">Profile Photo</label>
                <div class="file-upload-container">
                  <!-- Photo Preview -->
                  <div v-if="photoPreview || (doctor.profile_photo && !photoFile)" class="photo-preview-container">
                    <img :src="photoPreview || getProfilePhotoUrl()" alt="Profile Photo" class="photo-preview" />
                    <div class="photo-overlay">
                      <button type="button" @click="removePhoto" class="remove-photo-btn">
                        <svg class="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                      <label for="photo-upload" class="change-photo-btn">
                        <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </label>
                    </div>
                  </div>
                  
                  <!-- Upload Button (when no photo) -->
                  <div v-else>
                    <input type="file" @change="handlePhotoUpload" class="file-input" id="photo-upload" accept="image/*" />
                    <label for="photo-upload" class="file-upload-btn">
                      <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      Choose Photo (Max 10MB)
                    </label>
                  </div>
                  
                  <!-- Hidden file input for changing photo -->
                  <input type="file" @change="handlePhotoUpload" class="file-input" id="photo-upload" accept="image/*" />
                  
                  <!-- Upload Status -->
                  <div v-if="photoFile" class="file-selected">
                    <span class="file-name">{{ photoFile.name }} ({{ formatFileSize(photoFile.size) }})</span>
                  </div>
                  
                  <div class="upload-info">
                    <small class="upload-hint">Supports all image formats (JPG, PNG, GIF, WebP, etc.) • Maximum size: 10MB</small>
                  </div>
                </div>
              </div>
              
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
                <label class="form-label">Date of Birth</label>
                <template v-if="isEditing">
                  <input v-model="doctor.dob" type="date" class="form-input" />
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.dob || 'Not specified' }}</div>
                </template>
              </div>
              
              <!-- Blood Group -->
              <div class="form-group">
                <label class="form-label">Blood Group</label>
                <template v-if="isEditing">
                  <select v-model="doctor.blood_group" class="form-input">
                    <option disabled value="">Select Blood Group</option>
                    <option v-for="group in bloodGroups" :key="group">{{ group }}</option>
                  </select>
                </template>
                <template v-else>
                  <div class="form-display">{{ doctor.blood_group || 'Not specified' }}</div>
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
              
              <!-- License Number -->
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

          <!-- Current Photo Display (When Not Editing) -->
          <div class="form-section" v-if="!isEditing && doctor.profile_photo">
            <h3 class="section-title">Profile Photo</h3>
            <div class="profile-photo-display">
              <img :src="getProfilePhotoUrl()" alt="Profile Photo" class="profile-photo-view" />
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
import { BASE_URL } from '@/config/api';

export default {
  name: 'DoctorProfileCard',
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
      photoFile: null,
      photoPreview: null,
      isEditing: false
    };
  },
  async mounted() {
    await this.loadProfile();
  },
  methods: {
    async loadProfile() {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${BASE_URL}/api/doctor/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await res.json();
        if (data) {
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
            license_number: data.license_number || '',
            council: data.council || '',
            profile_photo: data.profile_photo || '',
            approved: data.approved || false,
            suspended: data.suspended || false,
          };
          
          this.originalDoctor = { ...this.doctor };
          
          // Notify parent of status update if callback provided
          if (this.onStatusUpdate) {
            this.onStatusUpdate();
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        const message = 'Error fetching profile: ' + err.message;
        if (this.$toast) {
          this.$toast.error(message);
        } else {
          alert(message);
        }
      }
    },

    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate file type - accept all image types
        if (!file.type.startsWith('image/')) {
          const message = 'Please select a valid image file';
          if (this.$toast) {
            this.$toast.error(message);
          } else {
            alert(message);
          }
          event.target.value = '';
          return;
        }
        
        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
          const message = 'File size must be less than 10MB';
          if (this.$toast) {
            this.$toast.error(message);
          } else {
            alert(message);
          }
          event.target.value = '';
          return;
        }
        
        this.photoFile = file;
        this.createPhotoPreview(file);
        
        // Show success message
        const successMessage = `Photo selected: ${file.name} (${this.formatFileSize(file.size)})`;
        if (this.$toast) {
          this.$toast.success(successMessage);
        }
      }
    },

    createPhotoPreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removePhoto() {
      this.photoFile = null;
      this.photoPreview = null;
      this.doctor.profile_photo = '';
      const photoInput = document.getElementById('photo-upload');
      if (photoInput) photoInput.value = '';
    },

    clearPhoto() {
      this.photoFile = null;
      this.photoPreview = null;
      const photoInput = document.getElementById('photo-upload');
      if (photoInput) photoInput.value = '';
    },

    getProfilePhotoUrl() {
      if (this.doctor && this.doctor.profile_photo) {
        // If it's a base64 string, return as is
        if (this.doctor.profile_photo.startsWith('data:image/')) {
          return this.doctor.profile_photo;
        }
        // If it's just base64 data without the data URI prefix, add it
        if (this.doctor.profile_photo.length > 100 && !this.doctor.profile_photo.startsWith('http')) {
          // Assume it's base64 data and add the data URI prefix
          return `data:image/jpeg;base64,${this.doctor.profile_photo}`;
        }
        // If it's a URL, return as is
        if (this.doctor.profile_photo.startsWith('http')) {
          return this.doctor.profile_photo;
        }
      }
      // Default profile image
      try {
        return new URL('/src/assets/images/profile.jpg', import.meta.url).href;
      } catch (e) {
        // Fallback for older browsers
        return '/src/assets/images/profile.jpg';
      }
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Convert file to base64 string
    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    async submitForm() {
      try {
        // Prepare submit data
        const submitData = { ...this.doctor };
        
        // Handle photo upload
        if (this.photoFile) {
          try {
            const base64Photo = await this.fileToBase64(this.photoFile);
            submitData.profile_photo = base64Photo;
            console.log('Photo converted to base64, size:', base64Photo.length);
          } catch (error) {
            console.error('Error converting photo to base64:', error);
            const errorMessage = 'Failed to process image. Please try a different image.';
            if (this.$toast) {
              this.$toast.error(errorMessage);
            } else {
              alert(errorMessage);
            }
            return;
          }
        }
        
        console.log('Submitting data with keys:', Object.keys(submitData));
        
        const response = await fetch(`${BASE_URL}/api/doctor/profile/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(submitData)
        });

        if (!response.ok) {
          let errorData = {};
          const responseText = await response.text();
          try {
            errorData = JSON.parse(responseText);
          } catch (e) {
            console.error('Could not parse error response:', responseText);
            errorData = { error: 'Unknown server error', details: responseText };
          }
          
          const errorMessage = errorData.error || errorData.details || `Server error: ${response.status}`;
          console.error('Server response:', errorData);
          throw new Error(errorMessage);
        }
        
        const successMessage = 'Profile updated successfully!';
        if (this.$toast) {
          this.$toast.success(successMessage);
        } else {
          alert(successMessage);
        }
        
        this.isEditing = false;
        
        // Update the doctor object with the new photo data
        if (this.photoFile && submitData.profile_photo) {
          this.doctor.profile_photo = submitData.profile_photo;
        }
        
        this.originalDoctor = { ...this.doctor };
        
        // Reset file inputs
        this.photoFile = null;
        this.photoPreview = null;
        
        // Clear file input elements
        const photoInput = document.getElementById('photo-upload');
        if (photoInput) photoInput.value = '';
        
        // Emit event to parent component
        this.$emit('profileUpdated');
        
      } catch (error) {
        console.error('Submit error:', error);
        const errorMessage = error.message || 'Profile update failed. Please try again.';
        if (this.$toast) {
          this.$toast.error(errorMessage);
        } else {
          alert('Error: ' + errorMessage);
        }
      }
    },

    cancelEdit() {
      this.doctor = { ...this.originalDoctor };
      this.isEditing = false;
      this.photoFile = null;
      this.photoPreview = null;
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
  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Header Section */
.profile-header {
  background: rgb(255 255 255 / 95%);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 20%);
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
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
}

.header-content .profile-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0.5rem 0 0;
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
  box-shadow: 0 4px 12px rgb(79 70 229 / 30%);
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgb(79 70 229 / 40%);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Profile Card */
.profile-card {
  background: rgb(255 255 255 / 95%);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 20%);
  overflow: hidden;
}

.form-container {
  max-height: 75vh;
  overflow-y: auto;
  padding: 2rem;
}

/* Form Sections */
.form-section {
  margin-bottom: 3rem;
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
  background: #fff;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
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

/* Photo Preview */
.photo-preview-container {
  position: relative;
  display: inline-block;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.photo-preview {
  width: 200px;
  height: 200px;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.photo-preview-container:hover .photo-overlay {
  opacity: 1;
}

.remove-photo-btn,
.change-photo-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-photo-btn:hover {
  background: #ef4444;
  color: white;
}

.change-photo-btn:hover {
  background: #667eea;
  color: white;
}

.remove-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Profile Photo Display (Non-editing mode) */
.profile-photo-display {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.profile-photo-view {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
  border: 3px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* File Selected */
.file-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #0c4a6e;
}

.file-name {
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Upload Info */
.upload-info {
  margin-top: 0.5rem;
}

.upload-hint {
  color: #6b7280;
  font-size: 0.75rem;
  font-style: italic;
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
  box-shadow: 0 4px 12px rgb(16 185 129 / 30%);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgb(16 185 129 / 40%);
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
@media (width <= 768px) {
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
  
  .photo-preview {
    width: 150px;
    height: 150px;
  }
  
  .profile-photo-view {
    width: 120px;
    height: 120px;
  }
}

@media (width <= 480px) {
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
  
  .photo-preview {
    width: 120px;
    height: 120px;
  }
  
  .profile-photo-view {
    width: 100px;
    height: 100px;
  }
  
  .photo-preview-container {
    align-self: center;
  }
}
</style>