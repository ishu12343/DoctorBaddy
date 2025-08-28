<template>
  <div class="contact-root">
    <AppHeader @login="goToLogin" />
    <div class="contact-content">
      <div class="tab-container">
        <h2>Contact DoctorBuddy</h2>
        <div class="contact-cards">
          <div class="contact-card">
            <h3>For Doctors</h3>
            <ul>
              <li><strong>Email:</strong> doctors@doctorbuddy.com</li>
              <li><strong>Phone:</strong> +91 98765 43210</li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/919876543210" target="_blank">Chat Now</a></li>
              <li><strong>Support Hours:</strong> Mon-Fri, 9am-7pm</li>
            </ul>
          </div>
          <div class="contact-card">
            <h3>For Patients</h3>
            <ul>
              <li><strong>Email:</strong> patients@doctorbuddy.com</li>
              <li><strong>Phone:</strong> +91 91234 56789</li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/919123456789" target="_blank">Chat Now</a></li>
              <li><strong>Support Hours:</strong> Mon-Sat, 8am-10pm</li>
            </ul>
          </div>
        </div>
        <div class="contact-form-section">
          <h3>Send Us a Message</h3>
          <form class="contact-form" @submit.prevent="submitContactForm">
            <div class="form-row">
              <input v-model="contactForm.name" type="text" placeholder="Your Name" required />
              <select v-model="contactForm.role" required>
                <option disabled value="">I am a...</option>
                <option>Doctor</option>
                <option>Patient</option>
              </select>
            </div>
            <div class="form-row">
              <input v-model="contactForm.email" type="email" placeholder="Your Email" required />
              <input v-model="contactForm.phone" type="tel" placeholder="Phone (optional)" />
            </div>
            <textarea v-model="contactForm.message" placeholder="How can we help you?" rows="4" required></textarea>
            <button type="submit" class="btn--primary">Send Message</button>
            <div v-if="formSubmitted" class="form-success">Thank you! We'll get back to you soon.</div>
          </form>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
<script>

import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';

export default {
  name: 'ContactPage',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      contactForm: {
        name: '',
        role: '',
        email: '',
        phone: '',
        message: ''
      },
      formSubmitted: false
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    submitContactForm() {
      // Simulate form submission
      this.formSubmitted = true;
      setTimeout(() => {
        this.formSubmitted = false;
        this.contactForm = { name: '', role: '', email: '', phone: '', message: '' };
      }, 2500);
    }
  }
}
</script>
<style scoped>
.contact-cards {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
}
.contact-card {
  background: #f7f7fa;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(44,100,200,0.07);
  padding: 1.5rem 2rem;
  min-width: 220px;
  max-width: 320px;
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;
}
.contact-card h3 {
  color: #5C9EF0;
  margin-bottom: 0.7rem;
}
.contact-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.contact-card li {
  margin-bottom: 0.5rem;
}
.contact-card a {
  color: #5C9EF0;
  text-decoration: underline;
}
.contact-form-section {
  margin-top: 2.5rem;
  background: #f9fbff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(44,100,200,0.07);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.contact-form-section h3 {
  color: #275FD4;
  margin-bottom: 1.2rem;
  text-align: center;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.form-row input,
.form-row select {
  flex: 1 1 0;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #c7d7ef;
  font-size: 1rem;
  background: #fff;
}
.contact-form textarea {
  border-radius: 8px;
  border: 1px solid #c7d7ef;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  background: #fff;
  resize: vertical;
}
.contact-form button {
  align-self: flex-end;
  margin-top: 0.5rem;
}
.form-success {
  color: #4CAF50;
  margin-top: 0.7rem;
  text-align: right;
  font-weight: 600;
}
.contact-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #764ba2;
}
.contact-content {
  flex: 1 0 auto;
}
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
