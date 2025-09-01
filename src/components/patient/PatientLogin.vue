<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-left">
        <div class="welcome-container">
          <h1>Welcome Back!</h1>
          <p class="subtitle">Please sign in to continue</p>
          <form @submit.prevent="loginPatient" class="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                placeholder="Enter your email" 
                required 
                class="form-input"
              >
            </div>
            <div class="form-group">
              <div class="password-header">
                <label for="password">Password</label>
                <router-link to="/forgot-password" class="forgot-password">Forgot Password?</router-link>
              </div>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                placeholder="Enter your password" 
                required 
                class="form-input"
              >
            </div>
            <button type="submit" class="login-button">Sign In</button>
            <div class="signup-link">
              Don't have an account? <router-link to="/patient-signup">Sign up</router-link>
            </div>
          </form>
        </div>
      </div>
      <div class="login-right">
        <div class="logo-container">
          <img src="@/assets/images/logo.png" alt="Logo" class="logo">
          <h2>DoctorBuddy</h2>
          <p>Your Personal Health Assistant</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async loginPatient() {
      this.error = '';
      try {
        const response = await fetch('http://127.0.0.1:5000/api/patient/login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || 'Login failed. Please check your credentials.';
          throw new Error(errorMessage);
        }

        const data = await response.json();
        if (!data.token) {
          throw new Error('No authentication token received');
        }

        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'patient');

        // Redirect to patient dashboard first
        this.$router.push('/patient-dashboard');

        // Then fetch profile data with token
        const profileResponse = await fetch('http://127.0.0.1:5000/api/patient/profile?id=1', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Accept': 'application/json'
          }
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          localStorage.setItem('patientProfile', JSON.stringify(profileData));
        }
        // Optionally handle profile fetch errors silently or show a message
      } catch (err) {
        this.error = err.message || 'Login failed. Please try again.';
      }
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  min-height: 600px;
}

.login-left {
  flex: 1;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-right {
  flex: 1;
  background: linear-gradient(135deg, #4a90e2 0%, #8bc34a 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.welcome-container h1 {
  font-size: 2.2rem;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #666;
  margin-bottom: 2.5rem;
  font-size: 1rem;
  font-weight: 400;
}

.login-form {
  max-width: 380px;
  margin: 0 auto;
  width: 100%;
}

.form-group {
  margin-bottom: 1.75rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.form-input:focus {
  border-color: #4a90e2;
  background-color: #fff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.forgot-password {
  color: #4a90e2;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #3a7bc8;
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #3a7bc8;
}

.login-button:active {
  transform: translateY(1px);
}

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.9rem;
}

.signup-link a {
  color: #4a90e2;
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
  transition: color 0.2s;
}

.signup-link a:hover {
  text-decoration: underline;
}

.logo-container {
  max-width: 300px;
  position: relative;
  z-index: 2;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 1.5rem;
}

.logo-container h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo-container p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.05rem;
  margin: 0;
  line-height: 1.5;
}

/* Decorative elements */
.login-right::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  z-index: 1;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .login-container {
    max-width: 800px;
  }
  
  .login-left {
    padding: 60px 40px;
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    max-width: 500px;
    min-height: auto;
  }
  
  .login-right {
    display: none;
  }
  
  .login-left {
    padding: 50px 30px;
  }
  
  .welcome-container h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 15px;
  }
  
  .login-left {
    padding: 40px 25px;
  }
  
  .welcome-container h1 {
    font-size: 1.8rem;
  }
  
  .login-form {
    max-width: 100%;
  }
}
</style>
