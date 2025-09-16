<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1 pt-16 lg:pt-20">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-medical-primary via-medical-secondary to-blue-600 text-white section-sm">
        <div class="container mx-auto px-4">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="text-left space-y-6 animate-fade-in">
              <h1 class="heading-1 text-blue-100 mb-6">
                Comprehensive <span class="text-highlight">Healthcare Services</span>
              </h1>
              <p class="text-large text-blue-100 mb-8">
                Discover our complete range of healthcare solutions designed to meet all your medical needs. 
                From routine consultations to specialized treatments, we're here for you.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="scrollToServices" class="btn bg-white text-medical-primary hover:bg-blue-50">
                  <i class="fas fa-heart mr-2"></i>
                  Explore Services
                </button>
                <button @click="$router.push('/contact')" class="btn border-white text-white hover:bg-white/10">
                  <i class="fas fa-phone mr-2"></i>
                  Emergency: 911
                </button>
              </div>
            </div>
            <div class="animate-slide-up">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-center bg-white/20 rounded-xl p-4">
                    <div class="text-2xl font-bold text-white">24/7</div>
                    <div class="text-sm text-blue-100">Available</div>
                  </div>
                  <div class="text-center bg-white/20 rounded-xl p-4">
                    <div class="text-2xl font-bold text-white">30+</div>
                    <div class="text-sm text-blue-100">Specialties</div>
                  </div>
                  <div class="text-center bg-white/20 rounded-xl p-4">
                    <div class="text-2xl font-bold text-white">1000+</div>
                    <div class="text-sm text-blue-100">Doctors</div>
                  </div>
                  <div class="text-center bg-white/20 rounded-xl p-4">
                    <div class="text-2xl font-bold text-white">50K+</div>
                    <div class="text-sm text-blue-100">Patients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Overview -->
      <section class="section bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p class="text-large text-gray-600 max-w-3xl mx-auto">
              We combine advanced technology with compassionate care to deliver healthcare 
              that's accessible, reliable, and tailored to your needs.
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <i class="fas fa-shield-alt text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p class="text-gray-600">Your health data is protected with enterprise-grade security and HIPAA compliance.</p>
            </div>
            
            <div class="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <i class="fas fa-clock text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Available 24/7</h3>
              <p class="text-gray-600">Round-the-clock access to healthcare professionals whenever you need them.</p>
            </div>
            
            <div class="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <i class="fas fa-user-md text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Expert Doctors</h3>
              <p class="text-gray-600">Licensed and experienced healthcare professionals across 30+ specialties.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- All Services Section -->
      <section id="services" ref="servicesSection" class="section bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-gray-900 mb-4">All Our Services</h2>
            <p class="text-large text-gray-600 max-w-3xl mx-auto">
              Complete healthcare solutions at your fingertips. Choose from our comprehensive range of medical services.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(service, index) in services"
              :key="service.id"
              class="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-medical-primary/30 transition-all duration-300 transform hover:-translate-y-1"
              :class="{ 'md:col-span-2 lg:col-span-1': index === 9 && services.length % 3 === 1 }"
            >
              <div class="text-center">
                <!-- Service Icon -->
                <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                  <div style="font-size: 2.5rem; line-height: 1;">
                    <!-- Use emoji first, then Font Awesome as fallback -->
                    <span v-if="service.emoji">{{ service.emoji }}</span>
                    <i v-else-if="service.icon" :class="service.icon" class="fas" style="font-size: 2.5rem; font-weight: 900;"></i>
                    <span v-else style="font-size: 1.5rem; font-weight: bold;">{{ service.title.charAt(0) }}</span>
                  </div>
                </div>

                <!-- Service Title -->
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.title }}</h3>
                
                <!-- Service Description -->
                <p class="text-gray-600 mb-6 leading-relaxed">{{ service.description }}</p>
                
                <!-- Service Features -->
                <div class="text-left mb-6">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Key Features:</h4>
                  <ul class="space-y-2">
                    <li v-for="feature in service.features" :key="feature" class="flex items-start gap-3 text-sm text-gray-600">
                      <i class="fas fa-check text-green-500 text-xs mt-1 flex-shrink-0"></i>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col gap-3">
                  <button 
                    @click="getStarted(service)"
                    class="btn btn-primary w-full group-hover:shadow-lg transition-all duration-300"
                  >
                    <i class="fas fa-arrow-right mr-2"></i>
                    Get Started
                  </button>
                  <button 
                    @click="learnMore(service)"
                    class="btn btn-outline w-full text-sm"
                  >
                    <i class="fas fa-info-circle mr-2"></i>
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
        <div class="container mx-auto px-4">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="heading-2 text-white mb-4">Ready to Get Started?</h2>
              <p class="text-large text-blue-100 mb-8">
                Join thousands of patients who trust us with their healthcare needs. 
                Sign up today and experience the future of medicine.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="$router.push('/patient-signup')" class="btn bg-white text-medical-primary hover:bg-blue-50">
                  <i class="fas fa-user-plus mr-2"></i>
                  Sign Up as Patient
                </button>
                <button @click="$router.push('/doctor-signup')" class="btn border-white text-white hover:bg-white/10">
                  <i class="fas fa-stethoscope mr-2"></i>
                  Join as Doctor
                </button>
              </div>
            </div>
            <div class="text-center">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 class="text-2xl font-bold text-white mb-6">Join Our Community</h3>
                <div class="grid grid-cols-2 gap-6">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-white">98%</div>
                    <div class="text-sm text-blue-100">Satisfaction Rate</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-white">15min</div>
                    <div class="text-sm text-blue-100">Avg Wait Time</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-white">500k+</div>
                    <div class="text-sm text-blue-100">Consultations</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-white">24/7</div>
                    <div class="text-sm text-blue-100">Support</div>
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
</style>