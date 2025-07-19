<template>
    <MainHeader />
  <div>
    <h2>Doctors List</h2>
    <ul>
      <li v-for="doc in doctors" :key="doc.id">
        {{ doc.name }} - {{ doc.specialty }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import MainHeader from '@/components/MainHeader.vue'

export default {
  name: 'DoctorList',
  components: { MainHeader },

  data() {
    return {
      doctors: []
    }
  },
  mounted() {
    axios.get('http://localhost:8080/api/doctors') // match your backend URL
      .then(res => this.doctors = res.data)
      .catch(err => console.error(err))
  }
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

.tab-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
</style>


