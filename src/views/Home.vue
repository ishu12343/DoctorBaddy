<template>
  <div class="layout-container">
    <div class="layout-content">
      <AppHeader @login="goToLogin" />
      <!-- Hero/Masthead -->
      <section class="masthead">
        <div class="masthead__content">
          <div class="masthead__text">
            <h1>Online doctor visits, 24/7</h1>
            <p>We are offer you caring, expert medical advice whenever you need it, 
              from the comfort of your home. Connect easily with trusted doctors for health concerns like fever,
               skin issues, stress, and more. Enjoy private video consultations, quick prescriptions, and gentle guidance.
                We’re here to support your well-being day or night. For emergencies, 
                please call 101 or visit your nearest hospital right away. Your health matters to us!</p>
            <button @click="showTestimonials = true" class="btn btn--primary btn--large">See a doctor now</button>
          </div>
          <div class="masthead__image">
            <img src="@/assets/images/10.webp" alt="provider virtually seeing patient on a phone" loading="lazy" />
          </div>
        </div>
      </section>
      <!-- <h3>Prescriptions</h3>
      <p>Prescriptions are sent electronically to the pharmacy of your choice.</p> -->
      <!-- Testimonials -->
      <section class="testimonials" v-if="showTestimonials">
        <h2>Meet best Doctors here</h2>
        <div class="icon-card-row__cards">
          <div class="icon-card">
            <img src="@/assets/icons/visiting.svg" alt="Icon telehealth" />
            <h3>Cynthia Horner, MD FAAFP</h3>
            <p>As a family doctor, I am passionate about caring for the whole person over the continuum of their life. I've been in practice for 25 years and look forward to seeing you or your child!</p>
            <h3>Doctor rating</h3>
          </div>
          <div class="icon-card">
            <img src="@/assets/icons/Always Available.svg" alt="Icon efficiency" />
            <h3>Cynthia Horner</h3>
            <p>I go by Dr. Mia and have 20 years of family medicine experience. I look forward to being your physician.</p>
            <h3>Doctor rating</h3>
          </div>
        </div>
      </section>
      <!-- Benefits Icon Cards -->
      <section class="icon-card-row">
        <h2>The benefits of an DoctorBuddy</h2>
        <div class="icon-card-row__cards">
          <div class="icon-card">
            <img src="@/assets/icons/visiting.svg" alt="Icon telehealth" />
            <h3>Visit anywhere</h3>
            <p>Connect with doctors from anywhere</p>
          </div>
          <div class="icon-card">
            <img src="@/assets/icons/Always Available.svg" alt="Icon efficiency" />
            <h3>24/7 Availability</h3>
            <p>Access care anytime, day or night</p>
          </div>
          <div class="icon-card">
            <img src="@/assets/icons/Prescriptions.svg" alt="Icon prescriptions" />
            <h3>Prescriptions</h3>
            <p>Get prescriptions sent directly</p>
          </div>
          <div class="icon-card">
            <img src="@/assets/icons/medicine.svg" alt="Icon prescriptions" />
            <h3>medicine</h3>
            <p>Get medicine sent directly to your doorstep</p>
          </div>
        </div>
      </section>
    </div>
  </div>
  <section class="cta-footer">
    <div class="cta-footer__bg">
      <img class="cta-footer__bg-image" src="@/assets/images/Footer1.svg" alt="Background gradient" />
      <div class="cta-footer__container">
        <img class="cta-footer__icon" src="@/assets/images/Footer1.svg" alt="Doctor with headset icon" />
        <div class="cta-footer__text">
          <h2>Now is the time to try telemedicine!</h2>
          <div>We can help you feel better faster. Register now for access to our online doctors 24 hours a day.</div>
        </div>
        <div class="cta-footer__button">
          <router-link to="/patient-signup" class="btn btn--primary btn--medium">Sign up now</router-link>
        </div>
      </div>
    </div>
  </section>
  <AppFooter />
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';

export default {
  name: 'DoctorHome',
  components: { AppHeader, AppFooter },
  props: {
    msg: String
  },
  data() {
    return {
      showTestimonials: false,
      specialties: [
        'Cardiology',
        'Dermatology',
        'Pediatrics',
        'Neurology',
        'Orthopedics',
        'Psychiatry'
      ],
      searchIssue: '',
      searchSpecialist: '',
      searchLocation: '',
      topRatedDoctors: [
        { name: 'Dr. A. Sharma', specialty: 'Cardiology', rating: 4.9 },
        { name: 'Dr. B. Gupta', specialty: 'Dermatology', rating: 4.8 },
        { name: 'Dr. C. Singh', specialty: 'Pediatrics', rating: 4.9 }
        // ...add more as needed
      ]
    }
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
  emits: [],
  computed: {
  }
}
</script>

<style scoped>
.masthead {
  padding: 6rem 2rem 4rem;
  background-color: #f8f9fa;
}

.masthead__content {
  /* max-width: 1200px; */
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.masthead__text {
  flex: 1;
}

.masthead__image {
  flex: 1;
  /* max-width: 500px; */
}

.masthead__image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn--primary {
  background-color: #007bff;
  color: white;
}

.btn--large {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .masthead__content {
    flex-direction: column;
    text-align: center;
  }
  
  .masthead__image {
    margin-top: 2rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}

/* Header styles */
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
.btn--large { font-size: 1.2rem; padding: 0.8rem 2rem;background: blue; }
.btn--medium { font-size: 1rem; padding: 0.7rem 1.5rem; }

/* Masthead styles */
.masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #5C9EF0 60%, #fff 100%);
  padding: 2.5rem 0;
  /* max-width: 1100px; */
  margin: 0 auto;
  border-radius: 16px;
  margin-top: 2rem;
}
.masthead__content {
  flex: 1;
  padding-left: 2rem;
}
.masthead__content h1 {
  font-size: 2.5rem;
  color: #002B5C;
  margin-bottom: 1rem;
}
.masthead__content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #333;
}
.masthead__image img {
  /* width: 400px; */
  border-radius: 16px;
}

/* Icon card row styles */
.icon-card-row {
  background: #f7f7f7;
  padding: 2rem 0;
  margin-top: 2rem;
}
.icon-card-row h2 {
  text-align: center;
  font-size: 2rem;
  color: #275FD4;
  margin-bottom: 2rem;
}
.icon-card-row__cards {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}
.icon-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 1.5rem;
  min-width: 220px;
  max-width: 240px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-card img {
  width: 57px;
  margin-bottom: 1rem;
}
.icon-card h3 {
  color: #275FD4;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.icon-card p {
  color: #333;
  font-size: 1rem;
}

/* Testimonials styles */
.testimonials {
  background: #fff;
  padding: 2rem 0;
  margin-top: 2rem;
}
.testimonials h2 {
  text-align: center;
  color: #275FD4;
  font-size: 2rem;
  margin-bottom: 2rem;
}
.testimonials__cards {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}
.testimonial-card {
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1.5rem;
  min-width: 260px;
  max-width: 300px;
  text-align: left;
}
.testimonial-card blockquote {
  font-style: italic;
  color: #275FD4;
  margin-bottom: 1rem;
}
.testimonial-card strong {
  color: #002B5C;
  font-size: 1.1rem;
}
.testimonial-card div {
  color: #333;
  font-size: 1rem;
}

/* CTA Footer styles */
.cta-footer {
  margin-top: 2rem;
}
.cta-footer__bg {
  background: linear-gradient(90deg, #5C9EF0 60%, #C8D67E 100%);
  border-radius: 16px;
  padding: 2rem 0;
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
}
.cta-footer__container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.cta-footer__icon {
  width: 80px;
  height: 80px;
}
.cta-footer__text h2 {
  color: #002B5C;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}
.cta-footer__text div {
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.cta-footer__button .btn {
  background: #275FD4;
  color: #fff;
  border-radius: 8px;
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
}

/* Existing styles for home container, subtitle, actions, smart search, specialties, top doctors */
/* ...existing styles... */

/* Responsive adjustments */
@media (max-width: 900px) {
  .masthead, .cta-footer__bg, .header__container { flex-direction: column; align-items: flex-start; }
  .masthead__image img { width: 100%; }
  .icon-card-row__cards, .testimonials__cards { flex-direction: column; align-items: center; }
}
</style>
