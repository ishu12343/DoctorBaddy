<template>
  <AppHeader @login="goToLogin" />
  <AppFooter />
  <div class="services-fixed-container">
    <div class="services-page">
      <!-- <h1>Our Services</h1> -->
      <div class="services-list">
        <div class="service-box appointment">
          <div class="service-content">
            <span class="service-icon appointment">
              <i class="fas fa-user-md"></i>
            </span>
            <strong>Book Doctor Appointments:</strong>
            <div>Easily find and book appointments with doctors and specialists near you.</div>
          </div>
          <span class="service-img-right">
            <img src="@/assets/images/10.webp" alt="Service" />
          </span>
        </div>
        <div class="service-box online">
          <div class="service-content">
            <span class="service-icon online">
              <i class="fa-solid fa-user-doctor-message"></i>
            </span>
            <strong>Online Doctor Visits (24/7):</strong>
            <div>See a doctor or therapist from home, using your phone, tablet, or computer—anytime, day or night.</div>
          </div>
          <span class="service-img-right">
            <img src="@/assets/images/10.webp" alt="Service" />
          </span>
        </div>
        <div class="service-box medicine">
          <div class="service-content">
            <span class="service-icon medicine">
              <i class="fa-solid fa-pills"></i>
            </span>
            <strong>Buy Medicine:</strong>
            <div>Order prescribed medicines online and get them delivered to your doorstep.</div>
          </div>
          <span class="service-img-right">
            <img src="@/assets/images/10.webp" alt="Service" />
          </span>
        </div>
        <div class="service-box insurance">
          <div class="service-content">
            <span class="service-icon insurance">
              <i class="fa-solid fa-file-medical"></i>
            </span>
            <strong>Insurance Coverage:</strong>
            <div>Choose insurance plans accepted by doctors, and check coverage before booking.</div>
          </div>
          <span class="service-img-right">
            <img src="@/assets/images/10.webp" alt="Service" />
          </span>
        </div>
        <div class="emergency-note">
          <strong>If you’re having a medical emergency, call 101 immediately.</strong>
        </div>
      </div>
      <!-- Add more detailed content about services here -->
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
export default {
  name: 'OurServices',
  components: {
    AppHeader,
    AppFooter
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
.btn--large { font-size: 1.2rem; padding: 0.8rem 2rem; }
.btn--medium { font-size: 1rem; padding: 0.7rem 1.5rem; }

/* Masthead styles */
.masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #5C9EF0 60%, #fff 100%);
  padding: 2.5rem 0;
  max-width: 1100px;
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
  width: 400px;
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
  background: linear-gradient(90deg, #5C9EF0 60%, #C8D67K 100%);
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
.services-fixed-container {
  position: fixed;
  top: 70px; /* adjust if header height changes */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: #f9fbff;
  overflow-y: auto;
  padding-bottom: 2rem;
}
.services-page {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1vw;
  box-sizing: border-box;
}
.services-list {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.service-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  border-radius: 14px;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(44,62,80,0.07);
  font-size: 1.08rem;
  margin-bottom: 0.5rem;
  background: #f7f7f7;
  border-left: 7px solid #275FD4;
  width: 100%;
  min-width: 0;
  transition: 
    transform 0.18s cubic-bezier(.4,0,.2,1),
    box-shadow 0.18s cubic-bezier(.4,0,.2,1),
    background 0.18s cubic-bezier(.4,0,.2,1),
    border-color 0.18s cubic-bezier(.4,0,.2,1);
  will-change: transform, box-shadow, background, border-color;
}
.service-box:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 24px rgba(44,62,80,0.14);
  background: #f0f8ff;
  border-left-color: #1565c0;
  cursor: pointer;
}
.service-box strong {
  color: #275FD4;
  font-size: 1.18rem;
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.service-box.appointment { border-left-color: #5C9EF0; background: #eaf3fc; }
.service-box.appointment:hover { background: #d6eafd; border-left-color: #1565c0; }
.service-box.online { border-left-color: #4CAF50; background: #eafaf1; }
.service-box.online:hover { background: #d2f5e3; border-left-color: #388e3c; }
.service-box.medicine { border-left-color: #FF9800; background: #fff6e5; }
.service-box.medicine:hover { background: #ffe2b8; border-left-color: #f57c00; }
.service-box.insurance { border-left-color: #9C27B0; background: #f3eafc; }
.service-box.insurance:hover { background: #e3d6f7; border-left-color: #6d1b7b; }
.service-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}
.service-icon {
  flex-shrink: 0;
  font-size: 2.1rem;
  margin-bottom: 0.2rem;
  color: #5C9EF0;
  background: #fff;
  border-radius: 50%;
  padding: 0.4rem 0.6rem;
  box-shadow: 0 2px 8px rgba(44,62,80,0.07);
  border: 1.5px solid #e3eafc;
  transition: color 0.2s;
}
.service-img-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 1.2rem;
}
.service-img-right img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 18px;
  border: 2px solid #e3eafc;
  box-shadow: 0 2px 8px rgba(44,62,80,0.07);
}
@media (max-width: 1200px) {
  .services-page {
    max-width: 98vw;
    padding: 0 1vw;
  }
}
@media (max-width: 900px) {
  .services-page {
    max-width: 100vw;
    padding: 0 0.5vw;
  }
  .service-box {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .service-img-right {
    margin-left: 0;
    margin-top: 1rem;
    justify-content: flex-start;
  }
  .service-img-right img {
    width: 70px;
    height: 70px;
    border-radius: 14px;
  }
}
@media (max-width: 600px) {
  .service-box {
    flex-direction: column;
    align-items: flex-start;
  }
  .service-img-right {
    margin-left: 0;
    margin-top: 1rem;
    justify-content: flex-start;
  }
}
</style>

