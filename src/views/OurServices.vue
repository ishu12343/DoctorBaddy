<template>
  <div class="our-services-root">
    <AppHeader @login="goToLogin" />
    <div class="our-services-content">
      <!-- Animated Hero Section -->
      <div class="services-hero">
        <div class="hero-content" data-aos="fade-right">
          <h1>Premium <span class="highlight">Healthcare</span> Services</h1>
          <p class="subtitle">Experience healthcare reimagined with our comprehensive digital solutions</p>
          <div class="hero-stats">
            <div class="stat" v-for="(stat, index) in stats" :key="index">
              <span class="stat-number">{{ stat.number }}+</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            <button class="see-more-btn" @click="seeMoreStats">See More</button>
          </div>
        </div>
        <div class="hero-animation" data-aos="fade-left">
          <img src="https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" alt="Doctor and Healthcare" />
        </div>
      </div>
      
      <div class="services-page" ref="servicesSection">
        <div v-if="showServices">
          <div class="section-header" data-aos="fade-up">
            <h2>Our Comprehensive Services</h2>
            <p>Designed to provide seamless healthcare experiences for everyone</p>
          </div>
          <div class="modern-services-grid">
            <div 
              v-for="(service, index) in services" 
              :key="index"
              class="modern-service-block"
              :class="service.class"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
              @mouseenter="activeService = index"
            >
              <div class="service-icon" :class="{'active': activeService === index}">
                <img :src="service.icon" :alt="service.title + ' icon'" style="width:48px;height:48px;object-fit:contain;" />
              </div>
              <h3>{{ service.title }}</h3>
              <ul>
                <li v-for="(feature, i) in service.features" :key="i">
                  <i class="fas fa-check"></i> {{ feature }}
                </li>
              </ul>
              <div class="service-animation" v-if="activeService === index">
                <img :src="service.animation" :alt="service.title + ' animation'" />
              </div>
              <button class="service-cta" @click="navigateTo(service.ctaLink)">
                {{ service.ctaText }}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left:8px;vertical-align:middle;">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Emergency Banner -->
      <div class="emergency-banner" data-aos="fade-up" data-aos-delay="200">
        <div class="banner-content">
          <div class="hospital-icon-section" style="display: flex; justify-content: flex-start; align-items: center; height: 100%;">
            <img src="@/assets/icons/telephone.gif" alt="Hospital Icon" style="width:38px;height:40px;object-fit:contain;" />
          </div>
           <!-- Animated Road with Medicine Icon Running to Phone -->
          <div class="road-animation-container">
            <svg class="road-svg" viewBox="0 0 1100 80" width="100%" height="80">
              <!-- Road -->
              <rect x="0" y="35" width="1100" height="10" rx="5" fill="#444" />
              <!-- Road dashed line -->
              <rect x="0" y="39" width="1100" height="2" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="32,18" />
            </svg>
            <div class="banner-text" style="flex:1;">
              <h3>24/7 Emergency Support</h3>
              <p>Immediate assistance when you need it most</p>
            </div>
            <div class="hospital-icon-section" style="justify-content: flex-end; align-items: center; flex:0 0 60px; margin-left: 24px;">
              <img src="@/assets/icons/clinic.gif" alt="Hospital Icon" style="margin-top:10px;width:38px;height:40px;object-fit:contain;" />
            </div>
            <img
              src="@/assets/icons/medicine.svg"
              alt="Medicine Icon"
              class="medicine-on-road"
            />
          </div>
         
        </div>
      </div>

     

      <!-- Back to Top Button -->
      <button 
        class="back-to-top" 
        @click="scrollToTop"
        :class="{ 'visible': showBackToTop }"
        aria-label="Back to top"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'OurServices',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
  activeService: 0,
  showBackToTop: false,
  showServices: false,
  stats: [
        { number: '500', label: 'Expert Doctors' },
        { number: '10K', label: 'Happy Patients' },
        { number: '24/7', label: 'Support' },
        { number: '50+', label: 'Specialties' }
      ],
      services: [
        {
          class: 'patient',
          icon: require('@/assets/icons/medicine.svg'),
          title: 'Patient Services',
          features: [
            'Book in-clinic & online consultations',
            'Verified doctors directory',
            'Digital health records',
            'Appointment reminders'
          ],
          ctaText: 'Book Appointment',
          ctaLink: '/book-appointment',
          animation: require('@/assets/images/10.webp')
        },
        {
          class: 'doctor',
          icon: require('@/assets/icons/visiting.svg'),
          title: 'Doctor Services',
          features: [
            'Profile management',
            'Appointment scheduling',
            'Video consultations',
            'Earnings dashboard'
          ],
          ctaText: 'Join as Doctor',
          ctaLink: '/doctor-signup',
          animation: require('@/assets/icons/Prescriptions.svg')
        },
        {
          class: 'common',
          icon: require('@/assets/icons/Always Available.svg'),
          title: 'Common Services',
          features: [
            'Secure payments',
            '24/7 support',
            'Mobile access',
            'Trusted platform'
          ],
          ctaText: 'Learn More',
          ctaLink: '/services',
          animation: require('@/assets/images/Footer1.svg')
        }
      ]
    }
  },
  mounted() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.scrollY > 500;
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    
    callEmergency() {
      window.location.href = 'tel:101';
    },
    
    navigateTo(route) {
      this.$router.push(route);
    },
    
    getListOfAllDoctors() {
      // Implementation here
    },
    learnMore(service) {
      // Smooth scroll to the selected service section
      const element = document.querySelector(`.service-box.${service}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // You can add more specific logic for each service
      switch(service) {
        case 'appointment':
          // Handle appointment specific logic
          break;
        case 'online':
          // Handle online visit logic
          break;
        // Add more cases as needed
      }
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
      },

      seeMoreStats() {
        this.showServices = true;
        this.$nextTick(() => {
          const section = this.$refs.servicesSection;
          if (section && section.scrollIntoView) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
  },
  beforeUnmount() {
    AOS.refresh();
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
:root {
  --primary: #275FD4;
  --primary-light: #5C9EF0;
  --secondary: #4CAF50;
  --accent: #FF9800;
  --text: #ffffff;
  --light-bg: #f8f9fa;
  --white: #ffffff;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.our-services-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--light-bg);
}

.our-services-content {
  flex: 1;
  padding: 2rem 5%;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.see-more-btn {
  margin-top: 1.5rem;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(39, 95, 212, 0.08);
  transition: background 0.2s, transform 0.2s;
}
.see-more-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* Hero Section */
.services-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0 4rem;
  gap: 3rem;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-content h1 {
  font-size: 3rem;
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-content h1 .highlight {
  color: var(--primary);
  position: relative;
  display: inline-block;
}

.hero-content h1 .highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, var(--primary-light), transparent);
  z-index: -1;
  border-radius: 4px;
}

.hero-content .subtitle {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-animation {
  flex: 1;
  max-width: 500px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
  animation: float 6s ease-in-out infinite;
}

.hero-animation img {
  width: 100%;
  height: auto;
  display: block;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
  padding: 1rem;
  background: var(--white);
  border-radius: 12px;
  box-shadow: var(--shadow);
  min-width: 120px;
  transition: transform 0.3s ease;
}

.stat:hover {
  transform: translateY(-5px);
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #ffffff;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.2rem;
  color: var(--text);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--primary);
  border-radius: 2px;
}

.section-header p {
  color: #ffffff;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
}

/* Modern Services Grid */
.modern-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.modern-service-block {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.modern-service-block:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.service-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  opacity: 0.15;
  z-index: -1;
  transition: all 0.3s ease;
}

.service-icon.active {
  transform: rotateY(180deg);
}

.patient .service-icon {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}

.doctor .service-icon {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.common .service-icon {
  background: linear-gradient(135deg, #f46b45 0%, #eea849 100%);
}

.modern-service-block h3 {
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 1.2rem;
  font-weight: 600;
}

.modern-service-block ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.modern-service-block li {
  margin-bottom: 0.8rem;
  color: #555;
  display: flex;
  align-items: flex-start;
  line-height: 1.5;
  font-size: 1rem;
}

.modern-service-block li i {
  color: var(--primary);
  margin-right: 10px;
  margin-top: 4px;
  font-size: 0.8rem;
}

.service-animation {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 120px;
  opacity: 0.1;
  transition: all 0.3s ease;
  pointer-events: none;
}

.modern-service-block:hover .service-animation {
  opacity: 0.2;
  transform: scale(1.1);
}

.service-animation img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.service-cta {
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  color: var(--primary);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
}

.service-cta::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s ease;
}

.service-cta:hover {
  padding-left: 10px;
}

.service-cta:hover::after {
  width: 100%;
}

.service-cta i {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.service-cta:hover i {
  transform: translateX(5px);
}

/* Emergency Banner */
.emergency-banner {
  background: linear-gradient(135deg, #ff4b4b 0%, #ff6b6b 100%);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin: 4rem 0;
  color: white;
  box-shadow: 0 10px 30px rgba(255, 75, 75, 0.2);
  overflow: hidden;
  position: relative;
}

.road-animation-container {
  position: relative;
  width: 100%;
  /* max-width: 600px;
  margin: 0 auto 2.5rem auto; */
  height: 90px;
  display: flex;
  /* align-items: flex-end; */
  justify-content: flex-start;
}
.road-svg {
  position: absolute;
  left: 0;
  top: 19px;
  /* width: 100%;
  height: 80px; */
  z-index: 0;
}
.medicine-on-road {
  position: absolute;
  left: 0;
  top: 10px;
  width: 48px;
  height: 48px;
  z-index: 2;
  animation: medicine-move 3.5s linear infinite;
  filter: drop-shadow(0 2px 8px #275fd4aa);
}
@keyframes medicine-move {
  0% { left: 0; }
  90% { left: calc(100% - 70px); }
  100% { left: 0; }
}
.phone-destination {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
}
.phone-label {
  color: #275FD4;
  font-size: 0.95rem;
  margin-top: 2px;
  font-weight: 600;
}

.emergency-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif') no-repeat;
  background-size: cover;
  opacity: 0.05;
  pointer-events: none;
}

.banner-content {
  display: flex;
  align-items: center;
  /* justify-content: space-between;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
  gap: 1.5rem; */
  height: 60px;
}

.banner-text h3 {
  font-size: 2.0rem;
  margin-bottom: 1.0rem;
  font-weight: 600;
}

.banner-text p {
  opacity: 0.9;
  font-size: 1rem;
  margin: 0;
}

.emergency-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.emergency-btn:hover {
  background: white;
  color: #ff4b4b;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.pulse-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 5px 20px rgba(39, 95, 212, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: var(--primary-light);
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 25px rgba(39, 95, 212, 0.4);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
  
  .emergency-btn {
    width: 100%;
    justify-content: center;
  }
  
  .pulse-icon {
    margin: 0 auto;
  }
  
  .back-to-top {
    width: 45px;
    height: 45px;
    font-size: 1rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
@media (max-width: 1100px) {
  .modern-services-grid {
    flex-direction: column;
    gap: 2rem;
    align-items: stretch;
  }
  .modern-service-block {
    max-width: 100%;
    min-width: 0;
  }
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.our-services-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.our-services-content {
  flex: 1;
  padding: 2rem 5%;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.services-intro {
  text-align: center;
  margin: 2rem 0 4rem;
  padding: 0 1rem;
}

.services-intro h1 {
  font-size: 2.8rem;
  color: #275FD4;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(45deg, #275FD4, #5C9EF0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.services-intro .subtitle {
  font-size: 1.2rem;
  color: #ffffff;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-box {
  display: flex;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  min-height: 300px;
}

.service-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.service-content {
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.service-content h3 {
  font-size: 1.8rem;
  margin: 1rem 0;
  color: #2c3e50;
}

.service-content p {
  color: #ffffff;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.service-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1rem;
}

.service-icon.appointment { background: #5C9EF0; }
.service-icon.online { background: #4CAF50; }
.service-icon.medicine { background: #FF9800; }
.service-icon.insurance { background: #9C27B0; }

.service-img-right {
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 300px;
}

.service-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.service-box:hover .service-gif {
  transform: scale(1.05);
}

.learn-more-btn {
  align-self: flex-start;
  background: none;
  border: none;
  color: #275FD4;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-top: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.learn-more-btn:hover {
  color: #1a4a9e;
  transform: translateX(5px);
}

.emergency-note {
  background: linear-gradient(135deg, #fff5f5 0%, #ffebee 100%);
  border-left: 5px solid #f44336;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  margin: 3rem auto;
  max-width: 800px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: pulse 2s infinite;
}

.pulse-icon {
  background: #f44336;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

.emergency-note p {
  margin: 0;
  font-size: 1.1rem;
  color: #d32f2f;
  font-weight: 500;
}

.emergency-note strong {
  font-weight: 700;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(244, 67, 54, 0); }
  100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Responsive Design */
@media (max-width: 992px) {
  .service-box {
    flex-direction: column;
  }
  
  .service-img-right {
    order: -1;
    min-height: 200px;
  }
  
  .services-intro h1 {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .our-services-content {
    padding: 1rem;
  }
  
  .services-intro h1 {
    font-size: 1.8rem;
  }
  
  .service-content {
    padding: 1.5rem;
  }
  
  .service-content h3 {
    font-size: 1.5rem;
  }
  
  .emergency-note {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .services-intro h1 {
    font-size: 1.6rem;
  }
  
  .service-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .emergency-note p {
    font-size: 1rem;
  }
}
/* Header styles */
.header {
  /* background: #275FD4; */
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
.services-fixed-container {
  background: #f9fbff;
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
/* Ensure footer stays at the bottom */
.our-services-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #764ba2;
}
.our-services-content {
  flex: 1 0 auto;
}
</style>

