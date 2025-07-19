<template>
  <AppHeader @login="goToLogin" />
  
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
    <h2 class="text-xl font-bold mb-4">Doctor Signup</h2>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <input v-model="form.fullName" placeholder="Full Name" required class="input" />
      <input v-model="form.email" type="email" placeholder="Email" required class="input" />
      <input v-model="form.mobile" type="tel" placeholder="Mobile Number" required class="input" />
      <input v-model="form.password" type="password" placeholder="Password" required class="input" />
      <input v-model="form.confirmPassword" type="password" placeholder="Confirm Password" required class="input" />

      <input v-model="form.registrationNumber" placeholder="Medical Reg. Number" required class="input" />
      <select v-model="form.council" required class="input">
        <option disabled value="">Select Council</option>
        <option>MCI</option>
        <option>NMC</option>
        <option>State Medical Council</option>
      </select>
      <input v-model="form.specialty" placeholder="Specialty (e.g., Dermatologist)" class="input" />
      <input v-model="form.experience" type="number" placeholder="Years of Experience" class="input" />
      <input v-model="form.degree" placeholder="Degree (e.g., MBBS)" class="input" />

      <input v-model="form.clinicName" placeholder="Hospital/Clinic Name" class="input" />
      <input v-model="form.clinicAddress" placeholder="Clinic Address" class="input" />

      <label>Upload ID Proof</label>
      <input type="file" @change="handleFile($event, 'idProof')" class="input" />

      <label>Medical Certificate</label>
      <input type="file" @change="handleFile($event, 'license')" class="input" />

      <label>Degree Certificate</label>
      <input type="file" @change="handleFile($event, 'degreeCert')" class="input" />

      <label>Profile Photo</label>
      <input type="file" @change="handleFile($event, 'photo')" class="input" />

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 mt-4 rounded">Sign Up</button>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line vue/multi-word-component-names
import AppHeader from '@/components/AppHeader.vue';
export default {
  name: 'SignupPage',
  components: {
    AppHeader
  },
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        registrationNumber: '',
        council: '',
        specialty: '',
        experience: '',
        degree: '',
        clinicName: '',
        clinicAddress: '',
      },
      files: {
        idProof: null,
        license: null,
        degreeCert: null,
        photo: null
      }
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    handleFile(event, field) {
      this.files[field] = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      Object.entries(this.form).forEach(([key, value]) => formData.append(key, value));
      Object.entries(this.files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      try {
        await fetch("http://localhost:8080/api/doctors/signup", {
          method: "POST",
          body: formData,
        });
        alert("Doctor registered! Pending approval.");
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  }
}
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
