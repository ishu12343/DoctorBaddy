<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1 pt-16 lg:pt-20">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-medical-primary via-medical-secondary to-blue-600 text-white section-sm">
        <div class="container mx-auto px-3 sm:px-4">
          <div class="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div class="text-center lg:text-left space-y-4 sm:space-y-6 animate-fade-in">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white mb-4 sm:mb-6">
                Healthcare Services <span class="text-blue-200">You Can Trust</span>
              </h1>
              <p class="text-base sm:text-lg lg:text-xl leading-relaxed text-blue-100">
                From routine check-ups to specialized treatments, we're here to provide 
                comprehensive healthcare solutions tailored to your needs.
              </p>
              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button @click="scrollToServices" class="btn btn-secondary btn-large w-full sm:w-auto">
                  <i class="fas fa-search mr-2"></i>
                  Explore Services
                </button>
                <button @click="$router.push('/patient-signup')" class="btn btn-outline btn-large text-white border-white hover:bg-white hover:text-medical-primary w-full sm:w-auto">
                  <i class="fas fa-user-plus mr-2"></i>
                  Get Started Today
                </button>
              </div>
            </div>
            <div class="animate-slide-up mt-6 lg:mt-0">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl">
                <h3 class="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 text-center">Quick Service Access</h3>
                <div class="grid grid-cols-2 gap-3 sm:gap-4">
                  <button @click="$router.push('/patient-signup')" class="bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 text-center touch-button">
                    <i class="fas fa-calendar-check text-xl sm:text-2xl text-white mb-2"></i>
                    <p class="text-xs sm:text-sm font-medium text-white">Book Appointment</p>
                  </button>
                  <button @click="$router.push('/patient-signup')" class="bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 text-center touch-button">
                    <i class="fas fa-video text-xl sm:text-2xl text-white mb-2"></i>
                    <p class="text-xs sm:text-sm font-medium text-white">Video Consult</p>
                  </button>
                  <button @click="$router.push('/patient-signup')" class="bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 text-center touch-button">
                    <i class="fas fa-prescription-bottle text-xl sm:text-2xl text-white mb-2"></i>
                    <p class="text-xs sm:text-sm font-medium text-white">E-Prescription</p>
                  </button>
                  <button @click="$router.push('/patient-signup')" class="bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-lg transition-all duration-300 text-center touch-button">
                    <i class="fas fa-file-medical text-xl sm:text-2xl text-white mb-2"></i>
                    <p class="text-xs sm:text-sm font-medium text-white">Health Records</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Overview -->
      <section class="section bg-gray-50">
        <div class="container mx-auto px-3 sm:px-4">
          <div class="text-center mb-8 sm:mb-12">
            <h2 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-900 mb-3 sm:mb-4">Why Choose Our Services?</h2>
            <p class="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
              We combine advanced technology with compassionate care to deliver healthcare 
              that's accessible, reliable, and tailored to your needs.
            </p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div class="text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <i class="fas fa-shield-alt text-white text-lg sm:text-xl"></i>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p class="text-sm sm:text-base text-gray-600">Your health data is protected with enterprise-grade security and HIPAA compliance.</p>
            </div>
            
            <div class="text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <i class="fas fa-clock text-white text-lg sm:text-xl"></i>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Available 24/7</h3>
              <p class="text-sm sm:text-base text-gray-600">Round-the-clock access to healthcare professionals whenever you need them.</p>
            </div>
            
            <div class="text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <i class="fas fa-user-md text-white" style="font-size: 1.5rem;"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Expert Doctors</h3>
              <p class="text-gray-600">Licensed and experienced healthcare professionals across 30+ specialties.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- All Services Section -->
      <section id="services" ref="servicesSection" class="section bg-white">
        <div class="container mx-auto px-3 sm:px-4">
          <div class="text-center mb-8 sm:mb-12">
            <h2 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-900 mb-3 sm:mb-4">All Our Services</h2>
            <p class="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
              Complete healthcare solutions at your fingertips. Choose from our comprehensive range of medical services.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div
              v-for="(service, index) in services"
              :key="service.id"
              class="group bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 hover:shadow-xl hover:border-medical-primary/30 transition-all duration-300 transform hover:-translate-y-1"
              :class="{ 'sm:col-span-2 lg:col-span-1': index === 9 && services.length % 3 === 1 }"
            >
              <div class="text-center">
                <!-- Service Icon -->
                <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <!-- Always show emoji if available, with fallback to Font Awesome -->
                  <div class="flex items-center justify-center w-full h-full">
                    <span v-if="service.emoji" class="text-2xl sm:text-3xl">{{ service.emoji }}</span>
                    <i v-else-if="service.icon" :class="service.icon" class="text-xl sm:text-2xl text-white"></i>
                    <span v-else class="text-xl sm:text-2xl font-bold text-white">{{ service.title.charAt(0) }}</span>
                  </div>
                </div>

                <!-- Service Title -->
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{{ service.title }}</h3>
                
                <!-- Service Description -->
                <p class="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{{ service.description }}</p>
                
                <!-- Service Features -->
                <div class="text-left mb-4 sm:mb-6">
                  <h4 class="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wide">Key Features:</h4>
                  <ul class="space-y-1 sm:space-y-2">
                    <li v-for="feature in service.features" :key="feature" class="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                      <i class="fas fa-check text-green-500 text-xs mt-0.5 sm:mt-1 flex-shrink-0"></i>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col gap-2 sm:gap-3">
                  <button 
                    @click="getStarted(service)"
                    class="btn btn-primary w-full group-hover:shadow-lg transition-all duration-300 touch-button"
                  >
                    <i class="fas fa-arrow-right mr-2 text-xs sm:text-sm"></i>
                    Get Started
                  </button>
                  <button 
                    @click="learnMore(service)"
                    class="btn btn-outline w-full text-xs sm:text-sm touch-button"
                  >
                    <i class="fas fa-info-circle mr-2 text-xs sm:text-sm"></i>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section bg-gradient-to-r from-medical-primary to-medical-secondary text-white">
        <div class="container mx-auto px-3 sm:px-4">
          <div class="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div class="text-center lg:text-left">
              <h2 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-white mb-3 sm:mb-4">Ready to Get Started?</h2>
              <p class="text-base sm:text-lg lg:text-xl leading-relaxed text-blue-100 mb-6 sm:mb-8">
                Join thousands of patients who trust us with their healthcare needs. 
                Sign up today and experience the future of medicine.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button @click="$router.push('/patient-signup')" class="btn bg-white text-medical-primary hover:bg-blue-50 w-full sm:w-auto touch-button">
                  <i class="fas fa-user-plus mr-2 text-sm sm:text-base"></i>
                  Sign Up as Patient
                </button>
                <button @click="$router.push('/doctor-signup')" class="btn border-white text-white hover:bg-white/10 w-full sm:w-auto touch-button">
                  <i class="fas fa-stethoscope mr-2 text-sm sm:text-base"></i>
                  Join as Doctor
                </button>
              </div>
            </div>
            <div class="text-center mt-6 lg:mt-0">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                <h3 class="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6">Join Our Community</h3>
                <div class="grid grid-cols-2 gap-4 sm:gap-6">
                  <div class="text-center">
                    <i class="fas fa-user-md text-2xl sm:text-4xl mb-3 sm:mb-4"></i>
                    <div class="text-2xl sm:text-3xl font-bold text-white">98%</div>
                    <div class="text-xs sm:text-sm text-blue-100">Satisfaction Rate</div>
                  </div>
                  <div class="text-center">
                    <i class="fas fa-clock text-2xl sm:text-4xl mb-3 sm:mb-4"></i>
                    <div class="text-2xl sm:text-3xl font-bold text-white">15min</div>
                    <div class="text-xs sm:text-sm text-blue-100">Avg Wait Time</div>
                  </div>
                  <div class="text-center">
                    <i class="fas fa-user-friends text-md text-2xl sm:text-4xl mb-3 sm:mb-4"></i>
                    <div class="text-2xl sm:text-3xl font-bold text-white">500k+</div>
                    <div class="text-xs sm:text-sm text-blue-100">Consultations</div>
                  </div>
                  <div class="text-center">
                    <i class="fas fa-calendar text-2xl sm:text-4xl mb-3 sm:mb-4"></i>
                    <div class="text-2xl sm:text-3xl font-bold text-white">24/7</div>
                    <div class="text-xs sm:text-sm text-blue-100">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

export default {
  name: 'OurServices',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      services: [
        {
          id: 1,
          title: 'Doctor Appointments',
          description: 'Both In-clinic & Online Consultations. Instant booking, no waiting lines.',
          icon: 'fas fa-calendar-check',
          emoji: '📅',
          features: ['Instant Booking', 'No Waiting Lines', 'In-clinic Visits', 'Online Consultations']
        },
        {
          id: 2,
          title: 'Video Consultations',
          description: 'Safe & secure telemedicine. Patients can connect anytime, anywhere.',
          icon: 'fas fa-video',
          emoji: '📹',
          features: ['HD Video Quality', 'Secure & Private', 'Connect Anywhere', 'Multiple Devices']
        },
        {
          id: 3,
          title: 'E-Prescriptions',
          description: 'Instant digital prescription after consultation. Paperless, easy to store & share.',
          icon: 'fas fa-prescription-bottle',
          emoji: '💊',
          features: ['Instant Digital Rx', 'Paperless System', 'Easy Storage', 'Quick Sharing']
        },
        {
          id: 4,
          title: 'Digital Health Records',
          description: 'Store reports, prescriptions, and past consultations. Access anytime in the app.',
          icon: 'fas fa-file-medical',
          emoji: '📋',
          features: ['Cloud Storage', 'Complete History', 'Easy Access', 'Secure Backup']
        },
        {
          id: 5,
          title: 'Specialist Doctors',
          description: 'Cover 20–30+ specialties (Cardiology, Dermatology, Pediatrics, etc.). Find the right doctor quickly.',
          icon: 'fas fa-stethoscope',
          emoji: '🩺',
          features: ['30+ Specialties', 'Expert Doctors', 'Quick Search', 'Verified Specialists']
        },
        {
          id: 6,
          title: 'Mental Health Support',
          description: 'Counseling & therapy services. Confidential, safe space for emotional health.',
          icon: 'fas fa-brain',
          emoji: '🧠',
          features: ['Licensed Therapists', 'Confidential Sessions', 'Safe Environment', 'Emotional Support']
        },
        {
          id: 7,
          title: '24/7 Availability',
          description: 'Doctors and emergency support available round the clock. Your health never waits, neither do we.',
          icon: 'fas fa-clock',
          emoji: '⏰',
          features: ['Always Available', 'Emergency Support', 'Round the Clock', 'Instant Response']
        },
        {
          id: 8,
          title: 'Lab Tests & Diagnostics',
          description: 'Book blood tests, X-rays, or other diagnostics. At-home sample collection option.',
          icon: 'fas fa-flask',
          emoji: '🧪',
          features: ['Online Booking', 'Home Collection', 'Digital Reports', 'Quick Results']
        },
        {
          id: 9,
          title: 'Medicine Ordering',
          description: 'Tie up with pharmacies for prescriptions with doorstep delivery.',
          icon: 'fas fa-pills',
          emoji: '💊',
          features: ['Pharmacy Network', 'Doorstep Delivery', 'Easy Ordering', 'Medicine Tracking']
        },
        {
          id: 10,
          title: 'Insurance & Payments',
          description: 'Support insurance coverage & secure payments. Building patient trust with transparency.',
          icon: 'fas fa-shield-alt',
          emoji: '🛡️',
          features: ['Insurance Support', 'Secure Payments', 'Transparent Billing', 'Multiple Options']
        }
      ]
    };
  },
  mounted() {
    // Reset body overflow in case coming from a page with modals
    document.body.style.overflow = '';
    // Smooth scroll behavior
    this.setupSmoothScroll();
  },
  methods: {
    scrollToServices() {
      const servicesSection = this.$refs.servicesSection;
      if (servicesSection) {
        servicesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    
    getStarted(service) {
      // Route based on service type
      if (service.id === 1 || service.id === 2 || service.id === 5) {
        // Appointment, Video consultation, or Specialist services
        this.$router.push('/patient-signup');
      } else if (service.id === 3 || service.id === 4) {
        // E-prescriptions or Health records
        this.$router.push('/patient-login');
      } else if (service.id === 6) {
        // Mental health support
        this.$router.push('/patient-signup');
      } else if (service.id === 8 || service.id === 9) {
        // Lab tests or Medicine ordering
        this.$router.push('/patient-signup');
      } else {
        // Default to patient signup
        this.$router.push('/patient-signup');
      }
    },
    
    learnMore(service) {
      // Scroll to service section or show more info
      this.scrollToServices();
      
      // You can add a toast notification or modal here
      this.$nextTick(() => {
        // Optional: Highlight the specific service
        const serviceElements = document.querySelectorAll('.group');
        serviceElements.forEach((el, index) => {
          if (index === service.id - 1) {
            el.classList.add('ring-2', 'ring-medical-primary', 'ring-opacity-50');
            setTimeout(() => {
              el.classList.remove('ring-2', 'ring-medical-primary', 'ring-opacity-50');
            }, 3000);
          }
        });
      });
    },
    
    setupSmoothScroll() {
      // Add smooth scrolling for better UX
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover .service-icon {
  transform: scale(1.1);
}

/* Scrollbar hide for better mobile experience */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Ensure proper spacing and responsive design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .grid {
    gap: 1.5rem;
  }
}

/* Custom styling for service cards */
.service-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Ensure Font Awesome icons are properly displayed */
.fas, .fa, .far, .fab {
  font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 5 Free", "Font Awesome 5 Pro" !important;
  font-weight: 900 !important;
  display: inline-block;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

/* Service icon specific styles */
.service-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Fallback for when Font Awesome doesn't load */
.icon-fallback {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Button icon styles */
.btn i {
  font-size: 0.875rem;
  margin-right: 0.5rem;
}

/* Hero section icon styles */
.hero-btn i {
  font-size: 1rem;
  margin-right: 0.5rem;
}
</style>