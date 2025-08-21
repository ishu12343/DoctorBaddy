<template>
  <AppHeader @login="goToLogin" />
  <div class="tab-container">
    <h2>Contact</h2>
    <p>Contact information and form go here.</p>
  </div>
</template>
<script>
import AppHeader from '@/views/AppHeader.vue';

export default {
  name: 'ContactPage',
  components: {
    AppHeader
  },
  methods: {
    getListOfAllDoctors() {

    },
    getStarted() {
      // Logic for Get Started button
      // e.g., navigate to registration or doctor search
    },
    learnMore() {
      // Logic for Learn More button
      // e.g., show modal or navigate to info page
    },
    findSpecialist() {
      // Logic to suggest specialist based on searchIssue
      // e.g., call API or match keywords
    },
    searchDoctors() {
      // Logic to search doctors by name, condition, location
      // e.g., call API or filter list
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    }
  },
}
</script>
<style scoped>
.tab-container {
  max-width: 700px;
  margin: 6rem auto 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
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
