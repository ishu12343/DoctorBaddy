<template>
  <div>
    <AppHeader />
    <div class="auth-page">
      <div class="auth-container">
        <h2>Patient Registration</h2>
        <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="formData.fullName"
            required
            class="form-control"
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            v-model="formData.mobile"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            required
            minlength="6"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            v-model="formData.dateOfBirth"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label>Gender</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.gender"
                value="MALE"
                required
              />
              <span>Male</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.gender"
                value="FEMALE"
                required
              />
              <span>Female</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.gender"
                value="OTHER"
                required
              />
              <span>Other</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="bloodGroup">Blood Group</label>
          <select id="bloodGroup" v-model="formData.bloodGroup" class="form-control">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <textarea
            id="address"
            v-model="formData.address"
            required
            class="form-control"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="emergencyContact">Emergency Contact Number</label>
          <input
            type="tel"
            id="emergencyContact"
            v-model="formData.emergencyContact"
            class="form-control"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Registering...' : 'Register' }}
          </button>
          <p class="login-link">
            Already have an account? <router-link to="/patient-login">Login here</router-link>
          </p>
        </div>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
  <ChatButton />
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import ChatButton from '@/components/ChatButton.vue';
import AppFooter from '@/views/AppFooter.vue';
export default {
  name: 'PatientSignUp',
  components: { AppHeader, ChatButton, AppFooter },
  data() {
    return {
      isLoading: false,
      formData: {
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        address: '',
        emergencyContact: '',
        role: 'PATIENT'  // Set default role for patient
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      try {
        const response = await fetch('http://127.0.0.1:5000/api/patient/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
          // credentials: 'include' // Important for cookies/session
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'patient');
        
        // Redirect to patient dashboard
        this.$router.push('/patient-dashboard');
      } catch (error) {
        console.error('Registration error:', error);
        alert(error.message || 'Registration failed. Please try again.');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
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
  width: 100%;
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
  width: 100%;
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
</style>
