<template>
  <header class="header">
    <div class="header__container">
      <img src="@/assets/images/logo.png" alt="Logo" class="header__logo" />DoctorBuddy
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
        </div>
      </div>
        <router-link to="/signup" class="btn btn--primary btn--small">SIGN UP</router-link>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      showDropdown: false
    }
  },
  methods: {
    showLoginDropdown() {
      this.showDropdown = true
    },
    hideLoginDropdown() {
      this.showDropdown = false
    }
  },
}
</script>
<style scoped>
  .header {
    background: #275FD4;
    color: #fff;
    padding: 0.5rem 0;
  }

  .header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
  }

  .header__logo {
    height: 40px;
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
