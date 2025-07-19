<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Doctor Registration</h2>
      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Error Message -->
        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>
        
        <!-- Personal Information -->
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" v-model="formData.fullName" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="name">Preferred Name</label>
          <input type="text" id="name" v-model="formData.name" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="mobile">Mobile Number</label>
          <input 
            type="tel" 
            id="mobile" 
            v-model="formData.mobile" 
            pattern="[0-9]{10}" 
            title="Please enter a 10-digit mobile number"
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
            minlength="6" 
            required 
            class="form-control" 
          />
        </div>

        <div class="form-group">
          <label for="registrationNumber">Registration Number</label>
          <input 
            type="text" 
            id="registrationNumber" 
            v-model="formData.registrationNumber" 
            required 
            class="form-control" 
          />
        </div>

        <div class="form-group">
          <label for="council">Medical Council</label>
          <select id="council" v-model="formData.council" required class="form-control">
            <option value="">Select Council</option>
            <option value="MCI">MCI (Medical Council of India)</option>
            <option value="SMC">State Medical Council</option>
          </select>
        </div>

        <div class="form-group">
          <label for="specialty">Specialty</label>
          <input type="text" id="specialty" v-model="formData.specialty" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="experience">Years of Experience</label>
          <input 
            type="number" 
            id="experience" 
            v-model.number="formData.experience" 
            min="0" 
            required 
            class="form-control" 
          />
        </div>

        <!-- Clinic Information -->
        <div class="form-group">
          <label for="clinicName">Clinic Name</label>
          <input type="text" id="clinicName" v-model="formData.clinicName" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="clinicAddress">Clinic Address</label>
          <textarea 
            id="clinicAddress" 
            v-model="formData.clinicAddress" 
            required 
            rows="3" 
            class="form-control"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" id="location" v-model="formData.location" required class="form-control" />
        </div>

        <!-- Degree & Docs -->
        <div class="form-group">
          <label for="degree">Highest Degree</label>
          <input type="text" id="degree" v-model="formData.degree" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="degreeCertPath">Degree Certificate Path (Optional)</label>
          <input 
            type="text" 
            id="degreeCertPath" 
            v-model="formData.degreeCertPath" 
            class="form-control" 
            placeholder="e.g., /path/to/degree.pdf"
          />
        </div>

        <div class="form-group">
          <label for="idProofPath">ID Proof Path (Optional)</label>
          <input 
            type="text" 
            id="idProofPath" 
            v-model="formData.idProofPath" 
            class="form-control" 
            placeholder="e.g., /path/to/id_proof.pdf"
          />
        </div>

        <div class="form-group">
          <label for="licensePath">License Path (Optional)</label>
          <input 
            type="text" 
            id="licensePath" 
            v-model="formData.licensePath" 
            class="form-control" 
            placeholder="e.g., /path/to/license.pdf"
          />
        </div>

        <div class="form-group">
          <label for="photoPath">Photo Path (Optional)</label>
          <input 
            type="text" 
            id="photoPath" 
            v-model="formData.photoPath" 
            class="form-control" 
            placeholder="e.g., /path/to/photo.jpg"
          />
        </div>

        <!-- Hidden field for approved status (defaults to false) -->
        <input type="hidden" v-model="formData.approved" />

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Registering...' : 'Register' }}
          </button>
          
          <p class="login-link">
            Already have an account? <router-link to="/login">Login here</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorSignUp',
  data() {
    return {
      isLoading: false,
      formData: {
        fullName: '',
        name: '',
        email: '',
        mobile: '',
        password: '',
        registrationNumber: '',
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
        approved: false
      },
      error: ''
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      this.error = '';
      
      try {
        // Map the form data to match the DTO
        const requestData = {
          ...this.formData,
          // Convert empty strings to null for optional fields
          degreeCertPath: this.formData.degreeCertPath || null,
          idProofPath: this.formData.idProofPath || null,
          licensePath: this.formData.licensePath || null,
          photoPath: this.formData.photoPath || null
        };
        
        const response = await fetch('http://localhost:8080/api/auth/doctors/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
          credentials: 'include'
        });
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Registration failed. Please check your details and try again.');
        }
  
        const data = await response.json();
        
        // Store the token and user type in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'doctor');
        
        // Redirect to doctor dashboard or login page
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
  /* Keep your existing style from previous component */
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
  
  @media (max-width: 768px) {
    .auth-container {
      padding: 1.5rem;
    }
  
    .auth-page {
      padding: 1rem;
    }
  }
  </style>
  