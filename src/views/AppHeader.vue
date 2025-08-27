<template>
  <header class="header">
    <div class="header__container">
      <router-link to="/" class="header__logo-link">
        <img src="@/assets/images/logo.png" alt="Logo" class="header__logo" />
        DoctorBuddy
      </router-link>
      <nav class="header__nav">
        <router-link to="/services">Our Services</router-link>
        <router-link to="/contact">Contact</router-link>
        <div class="dropdown" @mouseleave="hideLoginDropdown">
          <button @mouseenter="showLoginDropdown" class="btn btn--primary btn--small">
            LOG IN
            <i class="fas fa-chevron-down"></i>
          </button>
          <div v-if="showDropdown" class="dropdown-menu">
            <router-link to="/patient-login" class="dropdown-item">Patient Login</router-link>
            <router-link to="/doctor-login" class="dropdown-item">Doctor Login</router-link>
            <router-link to="/admin-login" class="dropdown-item">Admin Login</router-link>
          </div>
        </div>
        <div class="dropdown" @mouseleave="hideSignupDropdown">
          <button @mouseenter="showSignupDropdown" class="btn btn--primary btn--small">
            SIGN UP
            <i class="fas fa-chevron-down"></i>
          </button>
          <div v-if="showDropdown2" class="dropdown-menu">
            <router-link to="/patient-signup" class="dropdown-item">Patient Sign Up</router-link>
            <router-link to="/doctor-signup" class="dropdown-item">Doctor Sign Up</router-link>
            <router-link to="/admin-signup" class="dropdown-item">Admin Sign Up</router-link>
          </div>
        </div>
        <!-- <router-link to="/signup" class="btn btn--primary btn--small">SIGN UP</router-link> -->
         
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      showDropdown: false,
      showDropdown2: false
    }
  },
  methods: {
    showLoginDropdown() {
      this.showDropdown = true
    },
    hideLoginDropdown() {
      this.showDropdown = false
    },
    showSignupDropdown() {
      this.showDropdown2 = true
    },
    hideSignupDropdown() {
      this.showDropdown2 = false
    }
  },
}
</script>
<style scoped>
  .header {
    background: #275FD4;
    color: #fff;
    padding: 0.5rem 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .header__logo {
    height: 40px;
  }

  .header__logo-link {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: bold;
    gap: 0.5rem;
  }

  .header__nav {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .header__nav a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
  }

  .btn {
    border-radius: 6px;
    border: none;
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 0.5rem;
  }

  .btn--primary {
    background: #5C9EF0;
    color: #fff;
  }

  .btn--small { 
    font-size: 0.9rem; 
    padding: 0.4rem 1rem; 
  }

  .dropdown {
    position: relative;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #5C9EF0;
    border-radius: 6px;
    min-width: 160px;
    z-index: 1001;
  }

  .dropdown-item {
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #fff;
    white-space: nowrap;
    font-weight: 500;
  }

  .dropdown-item:hover {
    background: #275FD4;
  }
</style>
