<template>
  <div class="profile-container">
    <!-- Professional Header Section -->
    <!-- <div class="profile-header">
      <div class="header-content">
        <div class="profile-avatar">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div class="header-info">
          <h1 class="profile-title">Patient Profile</h1>
          <p class="profile-subtitle">Comprehensive Healthcare Information Management</p>
        </div>
      </div>
    </div> -->

    <!-- Scrollable Content Area -->
    <div class="form-container">
        <form v-if="form" @submit.prevent="saveProfile" class="profile-form">
          <!-- Personal Information Section -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 class="section-title">Personal Information</h3>
            </div>
            <div class="form-grid">
              <!-- Full Name -->
              <div class="form-group">
                <label class="form-label">Full Name <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="form.full_name" type="text" class="form-input" required placeholder="Enter your full name" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.full_name || 'Not provided' }}</div>
                </template>
              </div>
              
              <!-- Email -->
              <div class="form-group">
                <label class="form-label">Email Address <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="form.email" type="email" class="form-input disabled" required readonly placeholder="Email address" />
                </template>
                <template v-else>
                  <div class="form-display readonly">{{ form.email }}</div>
                </template>
              </div>
              
              <!-- Mobile -->
              <div class="form-group">
                <label class="form-label">Mobile Number <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="form.mobile" type="tel" class="form-input" required placeholder="Enter mobile number" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.mobile || 'Not provided' }}</div>
                </template>
              </div>
              
              <!-- Gender -->
              <div class="form-group">
                <label class="form-label">Gender <span class="required">*</span></label>
                <template v-if="isEditing">
                  <select v-model="form.gender" class="form-input" required>
                    <option disabled value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </template>
                <template v-else>
                  <div class="form-display">{{ form.gender || 'Not specified' }}</div>
                </template>
              </div>
              
              <!-- DOB -->
              <div class="form-group">
                <label class="form-label">Date of Birth <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="form.dob" type="date" class="form-input" required />
                </template>
                <template v-else>
                  <div class="form-display">{{ formatDate(form.dob) || 'Not provided' }}</div>
                </template>
              </div>
              
              <!-- Blood Group -->
              <div class="form-group">
                <label class="form-label">Blood Group <span class="required">*</span></label>
                <template v-if="isEditing">
                  <select v-model="form.blood_group" class="form-input" required>
                    <option disabled value="">Select Blood Group</option>
                    <option v-for="bg in bloodGroups" :key="bg" :value="bg">{{ bg }}</option>
                  </select>
                </template>
                <template v-else>
                  <div class="form-display">{{ form.blood_group || 'Not specified' }}</div>
                </template>
              </div>
            </div>
          </div>

          <!-- Address Information Section -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 class="section-title">Address Information</h3>
            </div>
            <div class="form-grid">
              <!-- Address -->
              <div class="form-group full-width">
                <label class="form-label">Address Line <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="form.address" type="text" class="form-input" required placeholder="Enter your address" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.address || 'Not provided' }}</div>
                </template>
              </div>

              <!-- City -->
              <div class="form-group">
                <label class="form-label">City <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="form.city" type="text" class="form-input" required placeholder="Enter city" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.city || 'Not provided' }}</div>
                </template>
              </div>

              <!-- State -->
              <div class="form-group">
                <label class="form-label">State <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="form.state" type="text" class="form-input" required placeholder="Enter state" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.state || 'Not provided' }}</div>
                </template>
              </div>

              <!-- ZIP -->
              <div class="form-group">
                <label class="form-label">ZIP Code</label>
                <template v-if="isEditing">
                  <input v-model="form.zip" type="text" class="form-input" placeholder="Enter ZIP code" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.zip || 'Not provided' }}</div>
                </template>
              </div>

              <!-- Country -->
              <div class="form-group">
                <label class="form-label">Country <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="form.country" type="text" class="form-input" required placeholder="Enter country" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.country || 'Not provided' }}</div>
                </template>
              </div>
            </div>
          </div>

          <!-- Medical Information Section -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>
                </svg>
              </div>
              <h3 class="section-title">Medical Information</h3>
            </div>
            <div class="form-grid">
              <!-- Known Allergies -->
              <div class="form-group full-width">
                <label class="form-label">Known Allergies</label>
                <template v-if="isEditing">
                  <textarea v-model="form.allergies" class="form-input" rows="3" placeholder="Enter any known allergies"></textarea>
                </template>
                <template v-else>
                  <div class="form-display textarea-display">{{ form.allergies || 'None reported' }}</div>
                </template>
              </div>

              <!-- Existing Conditions -->
              <div class="form-group full-width">
                <label class="form-label">Existing Medical Conditions</label>
                <template v-if="isEditing">
                  <textarea v-model="form.conditions" class="form-input" rows="3" placeholder="Enter any existing medical conditions"></textarea>
                </template>
                <template v-else>
                  <div class="form-display textarea-display">{{ form.conditions || 'None reported' }}</div>
                </template>
              </div>

              <!-- Current Medications -->
              <div class="form-group full-width">
                <label class="form-label">Current Medications</label>
                <template v-if="isEditing">
                  <textarea v-model="form.medications" class="form-input" rows="3" placeholder="Enter current medications"></textarea>
                </template>
                <template v-else>
                  <div class="form-display textarea-display">{{ form.medications || 'None reported' }}</div>
                </template>
              </div>

              <!-- Past Surgeries -->
              <div class="form-group full-width">
                <label class="form-label">Past Surgeries</label>
                <template v-if="isEditing">
                  <textarea v-model="form.surgeries" class="form-input" rows="3" placeholder="Enter past surgeries or procedures"></textarea>
                </template>
                <template v-else>
                  <div class="form-display textarea-display">{{ form.surgeries || 'None reported' }}</div>
                </template>
              </div>
            </div>
          </div>

          <!-- Emergency Contact Section -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <h3 class="section-title">Emergency Contact</h3>
            </div>
            <div class="form-grid">
              <!-- Emergency Contact Name -->
              <div class="form-group">
                <label class="form-label">Emergency Contact Name</label>
                <template v-if="isEditing">
                  <input v-model="form.emergency_contact_name" type="text" class="form-input" placeholder="Enter contact name" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.emergency_contact_name || 'Not provided' }}</div>
                </template>
              </div>

              <!-- Emergency Contact Number -->
              <div class="form-group">
                <label class="form-label">Emergency Contact Number</label>
                <template v-if="isEditing">
                  <input v-model="form.emergency_contact_number" type="tel" class="form-input" placeholder="Enter contact number" />
                </template>
                <template v-else>
                  <div class="form-display">{{ form.emergency_contact_number || 'Not provided' }}</div>
                </template>
              </div>
            </div>
          </div>

          <!-- Document Upload Section (Only in edit mode) -->
          <div v-if="isEditing" class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <h3 class="section-title">Upload Medical Document</h3>
            </div>
            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label">Medical Document (PDF/JPG/PNG)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" @change="handleFileUpload" class="form-input file-input" />
                <p class="form-help">Upload medical documents, test reports, or prescriptions</p>
              </div>
            </div>
          </div>

          <!-- Submit Button Section -->
          <div v-if="isEditing" class="form-actions">
            <button type="submit" class="submit-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Save Changes
            </button>
            <button type="button" @click="cancelEdit" class="cancel-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Cancel
            </button>
          </div>
        </form>

        <!-- Loading State -->
        <div v-else class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading profile information...</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '@/config/api';

export default {
  name: 'PatientProfileCard',
  props: {
    isEditingProp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: null,
      originalForm: null,
      documentFile: null,
      bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      isEditing: false
    }
  },
  watch: {
    isEditingProp: {
      handler(newVal) {
        if (newVal && !this.isEditing) {
          this.startEditing();
        } else if (!newVal && this.isEditing) {
          this.saveProfile();
        }
      },
      immediate: true
    }
  },
  async mounted() {
    await this.loadProfile()
  },
  methods: {
    async loadProfile() {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get(`${BASE_URL}/api/patient/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.data?.patient) {
          const patient = { ...res.data.patient }
          
          // Normalize date field
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
        this.$toast?.error?.('Failed to load profile information')
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return ''
      try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (err) {
        return dateString
      }
    },
    
    handleFileUpload(event) {
      this.documentFile = event.target.files[0]
    },
    
    async saveProfile() {
      const token = localStorage.getItem('token')
      
      // Validate required fields
      const requiredFields = ['full_name', 'mobile', 'gender', 'dob', 'blood_group', 'address', 'city', 'state', 'country']
      const missingFields = requiredFields.filter(field => !this.form[field])
      
      if (missingFields.length > 0) {
        this.$toast?.error?.(`Please fill in all required fields: ${missingFields.join(', ')}`)
        return
      }
      
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key] || '')
      }
      
      if (this.documentFile) {
        formData.append('document', this.documentFile)
      }
      
      try {
        await axios.put(`${BASE_URL}/api/patient/updateprofile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        
        this.$toast?.success?.('Profile updated successfully')
        this.isEditing = false
        this.originalForm = { ...this.form }
        this.documentFile = null
        
      } catch (err) {
        console.error('Profile update failed:', err)
        this.$toast?.error?.('Failed to save profile. Please try again.')
      }
      
      this.isEditing = false
      this.$emit('update:editing', false);
    },
    
    cancelEdit() {
      this.form = { ...this.originalForm }
      this.isEditing = false
      this.documentFile = null
      this.$emit('update:editing', false);
    },
    
    // Method to be called from parent component
    toggleEdit() {
      if (this.isEditing) {
        this.saveProfile();
      } else {
        this.startEditing();
      }
    },
    
    startEditing() {
      this.isEditing = true
      this.originalForm = { ...this.form }
      this.$emit('update:editing', true);
    },
    
    // Legacy method names for compatibility
    async handleSave() {
      await this.saveProfile()
    }
  }
}
</script>

<style scoped>
/* Premium Form Container */
.profile-container {
  width: 100%;
}

/* Premium Form Container */
.form-container {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 25px 50px rgb(0 0 0 / 15%);
}

/* Enhanced Form Sections */
.form-section {
  margin-bottom: 3rem;
  background: #f8fafc;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgb(0 0 0 / 5%);
  transition: all 0.3s ease;
}

.form-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 10%);
}

.form-section:last-child {
  margin-bottom: 0;
}

/* Professional Section Headers */
.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
  position: relative;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 80px;
  height: 2px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-radius: 1px;
}

.section-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 25px rgb(79 70 229 / 30%);
}

.section-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.section-title {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
}

/* Responsive Grid System */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

/* Enhanced Form Labels */
.form-label {
  color: #334155;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.required {
  color: #ef4444;
  font-size: 1.1rem;
}

/* Premium Form Inputs */
.form-input {
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #1e293b;
  font-weight: 500;
  box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
}

.form-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgb(79 70 229 / 10%), 0 4px 20px rgb(79 70 229 / 15%);
  transform: translateY(-1px);
}

.form-input.disabled {
  background: #f8fafc;
  color: #64748b;
  cursor: not-allowed;
  border-color: #cbd5e1;
}

.form-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

/* Enhanced Display Fields */
.form-display {
  padding: 1rem 1.25rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #334155;
  font-size: 1rem;
  font-weight: 500;
  min-height: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
}

.form-display.readonly {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-color: #f59e0b;
  color: #92400e;
  font-weight: 600;
}

.form-display.textarea-display {
  min-height: 4rem;
  align-items: flex-start;
  padding-top: 1rem;
  white-space: pre-wrap;
  line-height: 1.6;
}

/* File Upload Styling */
.file-input {
  padding: 1rem;
  border: 3px dashed #cbd5e1;
  background: #f8fafc;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-input:hover {
  border-color: #4f46e5;
  background: #f0f9ff;
  transform: translateY(-1px);
}

.form-help {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.5rem 0 0;
  font-style: italic;
  font-weight: 500;
}

/* Professional Action Buttons */
.form-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  padding-top: 3rem;
  border-top: 2px solid #e2e8f0;
  margin-top: 3rem;
}

.submit-btn {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 25px rgb(79 70 229 / 30%);
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgb(79 70 229 / 40%);
}

.cancel-btn {
  background: transparent;
  color: #64748b;
  border: 2px solid #cbd5e1;
  padding: 0.75rem 1.5rem;
  border-radius: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cancel-btn:hover {
  border-color: #94a3b8;
  background: #f8fafc;
  transform: translateY(-1px);
}

/* Enhanced Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #334155;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

.loading-text {
  color: #64748b;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design Enhancements */
@media (width <= 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-container {
    padding: 1.5rem;
  }
}

@media (width <= 768px) {
  .form-container {
    padding: 1rem;
    border-radius: 16px;
  }
  
  .form-section {
    padding: 1rem;
    border-radius: 16px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .submit-btn, .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (width <= 480px) {
  .form-grid {
    gap: 1.5rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .section-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .form-container {
    padding: 1rem 0.5rem;
  }
}

/* Animation Enhancements */
.form-section {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus and Accessibility */
.edit-btn:focus,
.submit-btn:focus,
.cancel-btn:focus {
  outline: 3px solid #4f46e5;
  outline-offset: 2px;
}

.form-input:focus {
  box-shadow: 0 0 0 4px rgb(79 70 229 / 10%), 0 4px 20px rgb(79 70 229 / 15%);
}
</style>
