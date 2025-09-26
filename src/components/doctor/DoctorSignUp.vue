<style scoped>
@media (width <= 900px) {
  .signup-container {
    flex-direction: column !important;
    padding: 1rem !important;
    gap: 1.5rem !important;
  }
}

@media (width <= 600px) {
  .signup-container {
    padding: 0.5rem 0.2rem !important;
    margin: 0 !important;
    width: 100vw;
    min-width: 0;
    box-sizing: border-box;
  }

  .signup-form {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
}
</style>
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 pt-16 lg:pt-20 flex items-center justify-center bg-gradient-to-br from-medical-primary to-medical-secondary dark:from-gray-900 dark:to-gray-800">
      <div class="container py-8">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-brand-500 to-teal-500 p-6 text-center text-white">
              <div class="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i class="fas fa-user-md text-2xl"></i>
              </div>
              <h1 class="text-2xl font-bold">Doctor Registration</h1>
              <p class="text-blue-100 mt-2">Join our network of healthcare professionals</p>
            </div>

            <!-- Form -->
            <div class="p-6 lg:p-8">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Error Message -->
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
                    <p class="text-sm text-red-700">{{ error }}</p>
                  </div>
                </div>

                <!-- Step 1: Personal Information -->
                <div v-if="step === 1">
                  <h3 class="text-lg font-semibold text-gray-700 mb-4">Step 1: Personal Information</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="form-group">
                      <label for="fullName" class="form-label">Full Name</label>
                      <input type="text" id="fullName" v-model="formData.fullName" required class="form-input" />
                    </div>
                    <div class="form-group">
                      <label for="name" class="form-label">Preferred Name</label>
                      <input type="text" id="name" v-model="formData.name" required class="form-input" />
                    </div>
                    <div class="form-group">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" id="email" v-model="formData.email" required class="form-input" />
                    </div>
                    <div class="form-group">
                      <label for="mobile" class="form-label">Mobile Number</label>
                      <input type="tel" id="mobile" v-model="formData.mobile" pattern="[0-9]{10}" title="Please enter a 10-digit mobile number" required class="form-input" />
                    </div>
                    <div class="form-group">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" id="password" v-model="formData.password" minlength="6" required class="form-input" />
                    </div>
                  </div>
                </div>

                <!-- Step 2: Professional Information -->
                <div v-if="step === 2">
                  <h3 class="text-lg font-semibold text-gray-700 mb-4">Step 2: Professional Information</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="form-group">
                      <label for="registrationNumber" class="form-label">Registration Number</label>
                      <input type="text" id="registrationNumber" v-model="formData.registrationNumber" required class="form-input" />
                    </div>
                    <div class="form-group">
                      <label for="council" class="form-label">Medical Council</label>
                      <select id="council" v-model="formData.council" required class="form-input">
                        <option value="">Select Council</option>
                        <option value="MCI">MCI (Medical Council of India)</option>
                        <option value="SMC">State Medical Council</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="specialty" class="form-label">Specialty</label>
                      <input type="text" id="specialty" v-model="formData.specialty" required class="form-input" />
                    </div>
                    <div class="form-group">
                      <label for="experience" class="form-label">Years of Experience</label>
                      <input type="number" id="experience" v-model.number="formData.experience" min="0" required class="form-input" />
                    </div>
                     <div class="form-group">
                        <label for="degree" class="form-label">Highest Degree</label>
                        <input type="text" id="degree" v-model="formData.degree" required class="form-input" />
                    </div>
                    <div class="form-group">
                      <label for="gender" class="form-label">Gender</label>
                      <select id="gender" v-model="formData.gender" required class="form-input">
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="licenseNumber" class="form-label">License Number</label>
                      <input type="text" id="licenseNumber" v-model="formData.licenseNumber" required class="form-input" />
                    </div>
                  </div>
                </div>

                <!-- Step 3: Clinic & Documents -->
                <div v-if="step === 3">
                  <h3 class="text-lg font-semibold text-gray-700 mb-4">Step 3: Clinic & Documents</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="form-group md:col-span-2">
                      <label for="clinicName" class="form-label">Clinic Name</label>
                      <input type="text" id="clinicName" v-model="formData.clinicName" required class="form-input" />
                    </div>
                    <div class="form-group md:col-span-2">
                      <label for="clinicAddress" class="form-label">Clinic Address</label>
                      <textarea id="clinicAddress" v-model="formData.clinicAddress" required rows="3" class="form-input"></textarea>
                    </div>
                    <div class="form-group md:col-span-2">
                      <label for="location" class="form-label">Location (e.g., City, State)</label>
                      <input type="text" id="location" v-model="formData.location" required class="form-input" />
                    </div>
                    <div class="form-group">
                      <label for="degreeCertPath" class="form-label">Degree Certificate (Optional)</label>
                      <input type="file" id="degreeCertPath" @change="handleFileUpload($event, 'degreeCertPath')" class="form-file-input" />
                    </div>
                    <div class="form-group">
                      <label for="idProofPath" class="form-label">ID Proof (Optional)</label>
                      <input type="file" id="idProofPath" @change="handleFileUpload($event, 'idProofPath')" class="form-file-input" />
                    </div>
                    <div class="form-group">
                      <label for="licensePath" class="form-label">License (Optional)</label>
                      <input type="file" id="licensePath" @change="handleFileUpload($event, 'licensePath')" class="form-file-input" />
                    </div>
                    <div class="form-group">
                      <label for="photoPath" class="form-label">Profile Photo (Optional)</label>
                      <input type="file" id="photoPath" @change="handleFileUpload($event, 'photoPath')" class="form-file-input" />
                    </div>
                  </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex justify-between items-center pt-4">
                  <button type="button" v-if="step > 1" @click="prevStep" class="btn-secondary">
                    Back
                  </button>
                  <div v-else></div> <!-- Spacer -->

                  <button type="button" v-if="step < 3" @click="nextStep" class="btn-primary">
                    Next
                  </button>

                  <button type="submit" v-if="step === 3" class="btn-primary" :disabled="isLoading">
                    {{ isLoading ? 'Registering...' : 'Register' }}
                  </button>
                </div>

                <!-- Divider -->
                <div class="mt-8 relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">Already have an account?</span>
                  </div>
                </div>

                <!-- Login Link -->
                <div class="mt-6 text-center">
                  <router-link to="/doctor-login" class="font-medium text-brand-600 hover:text-brand-500">
                    Login here
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
    <ChatButton />
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import { BASE_URL } from '@/config/api';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';
export default {
  name: 'DoctorSignUp',
  components: {
    AppHeader,
    AppFooter,
    ChatButton
  },
  data() {
    return {
      isLoading: false,
      step: 1,
      formData: {
        fullName: '',
        name: '',
        email: '',
        mobile: '',
        password: '',
        gender: '',
        registrationNumber: '',
        licenseNumber: '',
        council: '',
        specialty: '',
        experience: 0,
        degree: '',
        degreeCertPath: '',
        clinicName: '',
        clinicAddress: '',
        location: '',
        idProofPath: '',
        licensePath: '',
        photoPath: '',
        approved: false,
        role: 'DOCTOR'  // Set default role for doctor
      },
      error: ''
    }
  },
  methods: {
    nextStep() {
      this.step++;
    },
    prevStep() {
      this.step--;
    },
    handleFileUpload(event, field) {
      const file = event.target.files[0];
      if (file) {
        // In a real app, you'd upload this file and store the URL.
        // For this example, we'll just store the file name.
        this.formData[field] = file.name;
      }
    },
  async handleSubmit() {
  this.isLoading = true;
  this.error = '';

  try {
    const requestData = {
      full_name: this.formData.fullName,
      name: this.formData.name,
      email: this.formData.email,
      mobile: this.formData.mobile,
      password: this.formData.password,
      gender: this.formData.gender,
      registration_number: this.formData.registrationNumber,
      license_number: this.formData.licenseNumber,
      council: this.formData.council,
      specialty: this.formData.specialty,
      experience: this.formData.experience,
      degree: this.formData.degree,
      clinic_name: this.formData.clinicName,
      clinic_address: this.formData.clinicAddress,
      location: this.formData.location,
      role: this.formData.role,
      profile_photo: this.formData.photoPath || null,
      documents: JSON.stringify({
        degreeCert: this.formData.degreeCertPath || null,
        idProof: this.formData.idProofPath || null,
        license: this.formData.licensePath || null
      })
    };

    const response = await fetch(`${BASE_URL}/api/doctor/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
      // credentials: 'include' // Enable if using cookies
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed. Please check your details and try again.');
    }

    const data = await response.json();

    // Save auth token
    localStorage.setItem('token', data.token);
    localStorage.setItem('userType', 'doctor');

    // Redirect
    this.$router.push('/doctor-dashboard');

  } catch (error) {
    console.error('Registration error:', error);
    this.error = error.message || 'Registration failed. Please try again.';
    alert(this.error);
  } finally {
    this.isLoading = false;
  }
}

  }
}
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

.form-input {
  @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2.5 px-3 border;
}

.form-file-input {
    @apply block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100;
}

.btn-primary {
  @apply inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500;
}

.btn-secondary {
  @apply inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}

.btn-primary:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}
</style>