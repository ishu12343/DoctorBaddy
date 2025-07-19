<template>
  <header class="header">
    <div class="header__container">
      <img src="@/assets/icons/Footer.png" alt="Logo" class="header__logo" />
      <nav class="header__nav">
        <router-link to="/doctors">Doctors</router-link>
        <router-link to="/appointments">Appointments</router-link>
        <router-link to="/patient">Patient</router-link>
        <router-link to="/about">About us</router-link>
        <!-- <router-link to="/contact">Contact</router-link> -->
        <router-link to="/profile" class="btn btn--primary btn--small">Profile</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader'
}
</script>

<style scoped>
.header {
  background-color: #1d2856 !important;
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
.btn--primary {
  background: #5C9EF0;
  color: #fff;
  border-radius: 6px;
  border: none;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
}
.btn--small { font-size: 0.9rem; padding: 0.4rem 1rem; }
</style>
