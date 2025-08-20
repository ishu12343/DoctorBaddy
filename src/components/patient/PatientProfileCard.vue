<template>
  <div class="profile-container">
    <!-- Header Section -->
    <div class="profile-header">
      <div class="header-content">
        <div class="header-left">
          <div class="profile-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="header-info">
            <h1 class="profile-title">Patient Profile</h1>
            <p class="profile-subtitle">Manage your healthcare information</p>
          </div>
        </div>
        <div class="header-actions">
          <button 
            v-if="!isEditing" 
            @click="startEditing" 
            class="action-btn primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit Profile
          </button>
          <template v-else>
            <button @click="saveProfile" class="action-btn primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              Save Changes
            </button>
            <button @click="cancelEdit" class="action-btn secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="profile-content">
      <form v-if="form" @submit.prevent="saveProfile" class="profile-form">
        
        <!-- Basic Information Section -->
        <div class="form-section">
          <div class="section-header">
            <div class="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2 class="section-title">Basic Information</h2>
          </div>

          <div class="form-grid">
            <!-- Email (Read-only) -->
            <div class="form-group full-width">
              <label class="form-label">Email Address</label>
              <div class="form-input-wrapper">
                <div class="status-display">{{ form.email }}</div>
                <div class="status-badge readonly">Read Only</div>
              </div>
            </div>

            <!-- Full Name -->
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.full_name" 
                  type="text" 
                  class="form-input" 
                  required 
                  placeholder="Enter your full name"
                />
              </template>
              <template v-else>
                <div class="form-display">{{ form.full_name || 'Not provided' }}</div>
              </template>
            </div>

            <!-- Mobile -->
            <div class="form-group">
              <label class="form-label">Mobile Number *</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.mobile" 
                  type="tel" 
                  class="form-input" 
                  required 
                  placeholder="Enter mobile number"
                />
              </template>
              <template v-else>
                <div class="form-display">{{ form.mobile || 'Not provided' }}</div>
              </template>
            </div>

            <!-- Gender -->
            <div class="form-group">
              <label class="form-label">Gender *</label>
              <template v-if="isEditing">
                <select v-model="form.gender" class="form-input" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </template>
              <template v-else>
                <div class="form-display">{{ form.gender || 'Not specified' }}</div>
              </template>
            </div>

            <!-- Date of Birth -->
            <div class="form-group">
              <label class="form-label">Date of Birth *</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.dob" 
                  type="date" 
                  class="form-input" 
                  required 
                />
              </template>
              <template v-else>
                <div class="form-display">{{ formatDate(form.dob) || 'Not provided' }}</div>
              </template>
            </div>

            <!-- Blood Group -->
            <div class="form-group">
              <label class="form-label">Blood Group *</label>
              <template v-if="isEditing">
                <select v-model="form.blood_group" class="form-input" required>
                  <option value="">Select Blood Group</option>
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
            <h2 class="section-title">Address Information</h2>
          </div>

          <div class="form-grid">
            <!-- Address -->
            <div class="form-group full-width">
              <label class="form-label">Address Line *</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.address" 
                  type="text" 
                  class="form-input" 
                  required 
                  placeholder="Enter your address"
                />
              </template>
              <template v-else>
                <div class="form-display">{{ form.address || 'Not provided' }}</div>
              </template>
            </div>

            <!-- City -->
            <div class="form-group">
              <label class="form-label">City *</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.city" 
                  type="text" 
                  class="form-input" 
                  required 
                  placeholder="Enter city"
                />
              </template>
              <template v-else>
                <div class="form-display">{{ form.city || 'Not provided' }}</div>
              </template>
            </div>

            <!-- State -->
            <div class="form-group">
              <label class="form-label">State *</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.state" 
                  type="text" 
                  class="form-input" 
                  required 
                  placeholder="Enter state"
                />
              </template>
              <template v-else>
                <div class="form-display">{{ form.state || 'Not provided' }}</div>
              </template>
            </div>

            <!-- ZIP -->
            <div class="form-group">
              <label class="form-label">ZIP Code</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.zip" 
                  type="text" 
                  class="form-input" 
                  placeholder="Enter ZIP code"
                />
              </template>
              <template v-else>
                <div class="form-display">{{ form.zip || 'Not provided' }}</div>
              </template>
            </div>

            <!-- Country -->
            <div class="form-group">
              <label class="form-label">Country *</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.country" 
                  type="text" 
                  class="form-input" 
                  required 
                  placeholder="Enter country"
                />
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
            <h2 class="section-title">Medical Information</h2>
          </div>

          <div class="form-grid">
            <!-- Known Allergies -->
            <div class="form-group full-width">
              <label class="form-label">Known Allergies</label>
              <template v-if="isEditing">
                <textarea 
                  v-model="form.allergies" 
                  class="form-textarea" 
                  rows="3"
                  placeholder="Enter any known allergies"
                ></textarea>
              </template>
              <template v-else>
                <div class="form-display">{{ form.allergies || 'None reported' }}</div>
              </template>
            </div>

            <!-- Existing Conditions -->
            <div class="form-group full-width">
              <label class="form-label">Existing Medical Conditions</label>
              <template v-if="isEditing">
                <textarea 
                  v-model="form.conditions" 
                  class="form-textarea" 
                  rows="3"
                  placeholder="Enter any existing medical conditions"
                ></textarea>
              </template>
              <template v-else>
                <div class="form-display">{{ form.conditions || 'None reported' }}</div>
              </template>
            </div>

            <!-- Current Medications -->
            <div class="form-group full-width">
              <label class="form-label">Current Medications</label>
              <template v-if="isEditing">
                <textarea 
                  v-model="form.medications" 
                  class="form-textarea" 
                  rows="3"
                  placeholder="Enter current medications"
                ></textarea>
              </template>
              <template v-else>
                <div class="form-display">{{ form.medications || 'None reported' }}</div>
              </template>
            </div>

            <!-- Past Surgeries -->
            <div class="form-group full-width">
              <label class="form-label">Past Surgeries</label>
              <template v-if="isEditing">
                <textarea 
                  v-model="form.surgeries" 
                  class="form-textarea" 
                  rows="3"
                  placeholder="Enter past surgeries or procedures"
                ></textarea>
              </template>
              <template v-else>
                <div class="form-display">{{ form.surgeries || 'None reported' }}</div>
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
            <h2 class="section-title">Emergency Contact</h2>
          </div>

          <div class="form-grid">
            <!-- Emergency Contact Name -->
            <div class="form-group">
              <label class="form-label">Emergency Contact Name</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.emergency_contact_name" 
                  type="text" 
                  class="form-input" 
                  placeholder="Enter contact name"
                />
              </template>
              <template v-else>
                <div class="form-display">{{ form.emergency_contact_name || 'Not provided' }}</div>
              </template>
            </div>

            <!-- Emergency Contact Number -->
            <div class="form-group">
              <label class="form-label">Emergency Contact Number</label>
              <template v-if="isEditing">
                <input 
                  v-model="form.emergency_contact_number" 
                  type="tel" 
                  class="form-input" 
                  placeholder="Enter contact number"
                />
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
            <h2 class="section-title">Upload Medical Document</h2>
          </div>

          <div class="form-grid">
            <div class="form-group full-width">
              <label class="form-label">Medical Document (PDF/JPG/PNG)</label>
              <input 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png" 
                @change="handleFileUpload" 
                class="form-input file-input"
              />
              <p class="form-help">Upload medical documents, test reports, or prescriptions</p>
            </div>
          </div>
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
    await this.loadProfile()
  },
  methods: {
    async loadProfile() {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
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
    
    startEditing() {
      this.isEditing = true
      this.originalForm = { ...this.form }
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
        await axios.put('http://127.0.0.1:5000/api/patient/updateprofile', formData, {
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
    },
    
    cancelEdit() {
      this.form = { ...this.originalForm }
      this.isEditing = false
      this.documentFile = null
    },
    
    // Legacy method names for compatibility
    async handleSave() {
      await this.saveProfile()
    }
  }
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Profile Header */
.profile-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  padding: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.profile-avatar {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
}

.profile-avatar svg {
  width: 2rem;
  height: 2rem;
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.profile-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
  line-height: 1.2;
}

.profile-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn.primary {
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  border: 1px solid #d1d5db;
}

.action-btn.secondary:hover {
  background: #f9fafb;
  transform: translateY(-1px);
}

.action-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

/* Profile Content */
.profile-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Form Sections */
.form-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
}

.section-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.section-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-label::after {
  content: '*';
  color: #ef4444;
  font-weight: 700;
  margin-left: 0.25rem;
}

.form-group:has(.form-label:not([class*="required"])) .form-label::after,
.form-label:not(:contains("*"))::after {
  display: none;
}

/* Form Inputs */
.form-input, .form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  background: white;
}

.form-input::placeholder, .form-textarea::placeholder {
  color: #9ca3af;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.file-input {
  padding: 0.75rem;
  border: 2px dashed #d1d5db;
  background: #f9fafb;
}

.file-input:hover {
  border-color: #0ea5e9;
  background: #f0f9ff;
}

/* Form Display (Read-only) */
.form-display {
  padding: 0.875rem 1rem;
  background: #f9fafb;
  border: 2px solid #f3f4f6;
  border-radius: 0.75rem;
  color: #374151;
  font-size: 0.95rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
}

/* Status Display with Badge */
.form-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-display {
  flex: 1;
  padding: 0.875rem 1rem;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  color: #6b7280;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.status-badge.readonly {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #f59e0b;
}

/* Form Help Text */
.form-help {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  font-style: italic;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 1.5rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #0ea5e9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-content {
    padding: 1.5rem;
  }
  
  .form-section {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .profile-header {
    padding: 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .profile-title {
    font-size: 1.5rem;
  }
  
  .profile-content {
    padding: 1rem;
  }
  
  .form-section {
    padding: 1rem;
    border-radius: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .action-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .form-grid {
    gap: 1rem;
  }
  
  .header-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Animation for smooth transitions */
.form-section {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus improvements for accessibility */
.action-btn:focus {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

.form-input:focus, .form-textarea:focus {
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

/* Print styles */
@media print {
  .profile-header {
    position: static;
    box-shadow: none;
  }
  
  .header-actions {
    display: none;
  }
  
  .form-section {
    box-shadow: none;
    border: 1px solid #e5e7eb;
    break-inside: avoid;
  }
}
</style>
