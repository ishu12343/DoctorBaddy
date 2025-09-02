<style scoped>
@media (max-width: 900px) {
  .login-container {
    flex-direction: column !important;
    padding: 1rem !important;
    gap: 1.5rem !important;
  }
}
@media (max-width: 600px) {
  .login-container {
    padding: 0.5rem 0.2rem !important;
    margin: 0 !important;
    width: 100vw;
    min-width: 0;
    box-sizing: border-box;
  }
  .login-form {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
}
</style>
<template>
  <AppHeader @login="goToLogin" />
  <div class="login-container">
    <div class="login-card">
      <img src="@/assets/images/logo.png" alt="Logo" class="login-logo" />
      <h2>DoctorBuddy on patient</h2>
      <form @submit.prevent="loginPatient">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" class="btn btn--primary btn--large">Log In</button>
      </form>
      <div class="login-footer">
        <router-link to="/">Back to Home</router-link>
      </div>
      <div class="login-footer">
        <router-link to="/patient-signup">Sign Up</router-link>
      </div>
    </div>
  </div>
  <AppFooter class="footer-fixed" />
  <ChatButton />
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import ChatButton from '@/components/ChatButton.vue';
import AppFooter from '@/views/AppFooter.vue';
export default {
  name: 'LoginPage',
  components: {
    AppHeader,
    ChatButton,
    AppFooter
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    loginPatient() {
      // login logic
    },
    goToLogin() {
      // navigation logic
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #5C9EF0 60%, #C8D67C 100%);
}
.login-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
}
.login-logo {
  height: 40px;
  margin-bottom: 1rem;
}
h2 {
  color: #275FD4;
  margin-bottom: 2rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input {
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.btn {
  width: 100%;
}
.login-footer {
  margin-top: 1.5rem;
  text-align: center;
}
.login-footer a {
  color: #275FD4;
  text-decoration: underline;
  font-size: 1rem;
}
.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 100;
}
</style>