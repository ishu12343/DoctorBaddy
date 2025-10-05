<template>
  <div class="profile-container">
    <!-- Header Section -->
    <div class="profile-header">
      <div class="header-content">
        <h1 class="profile-title">Admin Profile</h1>
        <p class="profile-subtitle">Manage your administrator information</p>
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
        <form v-if="admin" @submit.prevent="submitForm" class="profile-form">
          <!-- Personal Information Section -->
          <div class="form-section">
            <h3 class="section-title">Personal Information</h3>
            <div class="form-grid">
              <!-- Profile Photo Section -->
              <div class="form-group" v-if="isEditing">
                <label class="form-label">Profile Photo</label>
                <div class="file-upload-container">
                  <!-- Photo Preview -->
                  <div v-if="photoPreview || (admin.profile_photo && !photoFile)" class="photo-preview-container">
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
                  <input v-model="admin.full_name" type="text" class="form-input" required placeholder="Enter your full name" />
                </template>
                <template v-else>
                  <div class="form-display">{{ admin.full_name }}</div>
                </template>
              </div>
              
              <!-- Email -->
              <div class="form-group">
                <label class="form-label">Email <span class="required">*</span></label>
                <template v-if="isEditing">
                  <input v-model="admin.email" type="email" class="form-input" required placeholder="Email address" />
                </template>
                <template v-else>
                  <div class="form-display">{{ admin.email }}</div>
                </template>
              </div>
              
              <!-- Mobile -->
              <div class="form-group">
                <label class="form-label">Mobile Number</label>
                <template v-if="isEditing">
                  <input v-model="admin.mobile" type="tel" class="form-input" pattern="[0-9]{10}" placeholder="10-digit mobile number" />
                </template>
                <template v-else>
                  <div class="form-display">{{ admin.mobile || 'Not provided' }}</div>
                </template>
              </div>
              
              <!-- Role -->
              <div class="form-group">
                <label class="form-label">Role</label>
                <div class="form-display">{{ admin.role || 'Administrator' }}</div>
              </div>
              
              <!-- Created At -->
              <div class="form-group" v-if="admin.created_at">
                <label class="form-label">Account Created</label>
                <div class="form-display">{{ formatDate(admin.created_at) }}</div>
              </div>
              
              <!-- Last Login -->
              <div class="form-group" v-if="admin.last_login">
                <label class="form-label">Last Login</label>
                <div class="form-display">{{ formatDate(admin.last_login) }}</div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions" v-if="isEditing">
            <button type="button" @click="cancelEdit" class="cancel-btn">
              Cancel
            </button>
            <button type="submit" class="save-btn" :class="{ loading: isLoading }">
              <span v-if="!isLoading">Save Changes</span>
              <span v-else class="loading-content">
                <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            </button>
          </div>
        </form>
        
        <!-- Loading State -->
        <div v-else class="loading-state">
          <div class="loading-spinner-container">
            <svg class="loading-spinner large" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/config/api';

export default {
  name: 'AdminProfileCard',
  emits: ['profile-updated'],
  setup(props, { emit }) {
    const admin = ref(null);
    const isEditing = ref(false);
    const isLoading = ref(false);
    const photoFile = ref(null);
    const photoPreview = ref(null);
    const originalAdmin = ref(null);

    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(`${BASE_URL}/admin/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        admin.value = { ...response.data };
        originalAdmin.value = { ...response.data };
        console.log('Admin profile loaded:', admin.value);
      } catch (error) {
        console.error('Error loading profile:', error);
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          localStorage.removeItem('adminInfo');
          window.location.href = '/login?role=admin';
        }
      }
    };

    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size too large. Please choose a file smaller than 10MB.');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      photoFile.value = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const removePhoto = () => {
      photoFile.value = null;
      photoPreview.value = null;
      admin.value.profile_photo = null;
    };

    const getProfilePhotoUrl = () => {
      if (!admin.value?.profile_photo) return null;
      
      // If it's already a base64 string, return as is
      if (admin.value.profile_photo.startsWith('data:image/')) {
        return admin.value.profile_photo;
      }
      
      // If it's a relative path, construct full URL
      return `${BASE_URL}${admin.value.profile_photo}`;
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'Not available';
      try {
        return new Date(dateString).toLocaleString();
      } catch (error) {
        return 'Invalid date';
      }
    };

    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    };

    const submitForm = async () => {
      try {
        isLoading.value = true;
        
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const updateData = {
          full_name: admin.value.full_name,
          email: admin.value.email,
          mobile: admin.value.mobile
        };

        // Handle profile photo
        if (photoFile.value) {
          try {
            updateData.profile_photo = await convertFileToBase64(photoFile.value);
            console.log('Profile photo converted to base64, length:', updateData.profile_photo.length);
          } catch (error) {
            console.error('Error converting photo to base64:', error);
            alert('Error processing photo. Please try again.');
            return;
          }
        } else if (admin.value.profile_photo === null && originalAdmin.value.profile_photo) {
          // Photo was removed
          updateData.profile_photo = null;
        }

        console.log('Updating admin profile with data:', updateData);

        const response = await axios.put(`${BASE_URL}/admin/profile/update`, updateData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Update response:', response.data);

        if (response.data.admin) {
          admin.value = { ...response.data.admin };
          originalAdmin.value = { ...response.data.admin };
        }

        // Reset form state
        isEditing.value = false;
        photoFile.value = null;
        photoPreview.value = null;

        // Emit event to update header
        emit('profile-updated', admin.value);

        alert('Profile updated successfully!');

      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
      } finally {
        isLoading.value = false;
      }
    };

    const cancelEdit = () => {
      admin.value = { ...originalAdmin.value };
      isEditing.value = false;
      photoFile.value = null;
      photoPreview.value = null;
    };

    onMounted(() => {
      loadProfile();
    });

    return {
      admin,
      isEditing,
      isLoading,
      photoFile,
      photoPreview,
      handlePhotoUpload,
      removePhoto,
      getProfilePhotoUrl,
      formatFileSize,
      formatDate,
      submitForm,
      cancelEdit
    };
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-content {
  flex: 1;
  min-width: 300px;
}

.profile-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.profile-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.25);
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px 0 rgba(102, 126, 234, 0.35);
}

.btn-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.profile-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.form-container {
  padding: 2rem;
}

.form-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f3f4f6;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.required {
  color: #ef4444;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.form-display {
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border: 2px solid #f3f4f6;
  border-radius: 0.5rem;
  color: #374151;
  font-size: 1rem;
  min-height: 1.5rem;
}

/* File Upload Styles */
.file-upload-container {
  width: 100%;
}

.photo-preview-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #e5e7eb;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.photo-preview-container:hover .photo-overlay {
  opacity: 1;
}

.remove-photo-btn,
.change-photo-btn {
  background: white;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-photo-btn:hover {
  background: #fee2e2;
  color: #dc2626;
}

.change-photo-btn:hover {
  background: #dbeafe;
  color: #2563eb;
}

.remove-icon,
.upload-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.file-upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  background: #fafafa;
  color: #6b7280;
  font-weight: 500;
}

.file-upload-btn:hover {
  border-color: #667eea;
  background: #f8faff;
  color: #667eea;
}

.file-upload-btn .upload-icon {
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.5rem;
}

.file-input {
  display: none;
}

.file-selected {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #0c4a6e;
}

.upload-info {
  margin-top: 0.5rem;
}

.upload-hint {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 2rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #e5e7eb;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 140px;
}

.save-btn:hover:not(.loading) {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.25);
}

.save-btn.loading {
  cursor: not-allowed;
  opacity: 0.8;
}

.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* Loading States */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
}

.loading-spinner {
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 1s linear infinite;
}

.loading-spinner.large {
  width: 3rem;
  height: 3rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 1024px) {
  .profile-container {
    padding: 0 0.75rem;
  }
  
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .profile-container {
    padding: 0 0.5rem;
  }

  .profile-header {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .profile-title {
    font-size: 1.75rem;
    margin-bottom: 0.25rem;
  }

  .profile-subtitle {
    font-size: 1rem;
  }

  .header-actions {
    justify-content: center;
  }

  .form-container {
    padding: 1.25rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .section-title {
    font-size: 1.125rem;
    margin-bottom: 1.25rem;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
    padding-top: 1.5rem;
  }

  .form-actions button {
    width: 100%;
    padding: 0.875rem 1.5rem;
  }
  
  .photo-preview-container {
    width: 130px;
    height: 130px;
  }
}

@media (max-width: 480px) {
  .profile-container {
    padding: 0 0.25rem;
  }

  .form-container {
    padding: 1rem;
  }
  
  .profile-card {
    border-radius: 0.75rem;
    margin: 0 0.25rem;
  }

  .profile-title {
    font-size: 1.5rem;
  }
  
  .profile-subtitle {
    font-size: 0.9rem;
  }

  .edit-btn {
    padding: 0.625rem 1.125rem;
    font-size: 0.875rem;
  }
  
  .form-section {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .form-grid {
    gap: 1rem;
  }
  
  .form-label {
    font-size: 0.875rem;
    margin-bottom: 0.375rem;
  }
  
  .form-input {
    padding: 0.625rem 0.875rem;
    font-size: 0.9rem;
  }
  
  .form-display {
    padding: 0.625rem 0.875rem;
    font-size: 0.9rem;
  }

  .photo-preview-container {
    width: 110px;
    height: 110px;
  }
  
  .file-upload-btn {
    padding: 1.5rem;
    font-size: 0.875rem;
  }
  
  .form-actions {
    padding-top: 1.25rem;
    gap: 0.5rem;
  }
  
  .form-actions button {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 360px) {
  .profile-container {
    padding: 0;
  }
  
  .profile-card {
    border-radius: 0.5rem;
    margin: 0;
  }

  .form-container {
    padding: 0.75rem;
  }
  
  .profile-title {
    font-size: 1.375rem;
  }
  
  .edit-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .form-input, .form-display {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
  
  .photo-preview-container {
    width: 100px;
    height: 100px;
  }
  
  .file-upload-btn {
    padding: 1.25rem;
  }
}
</style>