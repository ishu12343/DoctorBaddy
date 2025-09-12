<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1 pt-16 lg:pt-20">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-medical-primary to-medical-secondary text-white section-sm">
        <div class="container">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h1 class="heading-1 text-white mb-6">
                Comprehensive <span class="text-blue-200">Healthcare</span> Services
              </h1>
              <p class="text-large text-blue-100 mb-8">
                From routine checkups to emergency care, we provide complete healthcare solutions 
                designed around your needs and schedule.
              </p>
              <div class="flex flex-wrap gap-4">
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
            <div data-aos="fade-left" class="relative">
              <div class="relative max-w-lg mx-auto">
                <img 
                  src="@/assets/images/10.webp" 
                  alt="Healthcare Services"
                  class="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div class="absolute -top-4 -right-4 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <i class="fas fa-stethoscope text-2xl text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="section-sm bg-white border-b">
        <div class="container">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="text-center" data-aos="fade-up">
              <div class="text-3xl lg:text-4xl font-bold text-medical-primary mb-2">{{ stat.number }}</div>
              <div class="text-gray-600">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Navigation -->
      <section class="section-sm bg-gray-50">
        <div class="container">
          <div class="text-center mb-8">
            <h2 class="heading-2 text-gray-900 mb-4">Choose Your Service Type</h2>
            <p class="text-large text-gray-600">Select the category that best fits your healthcare needs</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6 mb-12">
            <button 
              v-for="(service, index) in serviceCategories" 
              :key="index"
              @click="activeCategory = service.key"
              :class="[
                'p-6 rounded-xl border-2 transition-all duration-300 text-left',
                activeCategory === service.key 
                  ? 'border-medical-secondary bg-blue-50 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              ]"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <div :class="[
                'w-12 h-12 rounded-full flex items-center justify-center mb-4',
                activeCategory === service.key ? service.activeColor : 'bg-gray-100'
              ]">
                <i :class="[
                  service.icon, 'text-xl',
                  activeCategory === service.key ? 'text-white' : 'text-gray-600'
                ]"></i>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ service.title }}</h3>
              <p class="text-sm text-gray-600">{{ service.description }}</p>
            </button>
          </div>
        </div>
      </section>

      <!-- Detailed Services -->
      <section id="services" ref="servicesSection" class="section bg-white">
        <div class="container">
          <div class="max-w-6xl mx-auto">
            <div v-for="(category, categoryKey) in detailedServices" :key="categoryKey" 
                 v-show="activeCategory === categoryKey" class="space-y-12">
              
              <div class="text-center mb-12">
                <h2 class="heading-2 text-gray-900 mb-4">{{ category.title }}</h2>
                <p class="text-large text-gray-600 max-w-3xl mx-auto">{{ category.description }}</p>
              </div>

              <div class="grid lg:grid-cols-2 gap-8">
                <div v-for="(service, index) in category.services" :key="index" 
                     class="group" data-aos="fade-up" :data-aos-delay="index * 100">
                  <div class="h-full bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group-hover:border-medical-secondary/30">
                    <div class="flex items-start gap-4">
                      <div :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                        service.bgColor
                      ]">
                        <i :class="[service.icon, 'text-xl text-white']"></i>
                      </div>
                      <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ service.title }}</h3>
                        <p class="text-gray-600 mb-4">{{ service.description }}</p>
                        
                        <ul class="space-y-2 mb-6">
                          <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 text-xs"></i>
                            {{ feature }}
                          </li>
                        </ul>
                        
                        <div class="flex flex-wrap gap-3">
                          <button @click="navigateToService(service)" :class="[
                            'btn text-sm',
                            service.primary ? 'btn-primary' : 'btn-secondary'
                          ]">
                            <i :class="[service.ctaIcon, 'mr-2']"></i>
                            {{ service.ctaText }}
                          </button>
                          <button v-if="service.secondaryAction" @click="learnMore(service)" class="btn btn-outline text-sm">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Emergency Services Banner -->
      <section class="section-sm bg-red-50 border-y border-red-200">
        <div class="container">
          <div class="bg-red-500 rounded-2xl p-6 lg:p-8 text-white">
            <div class="grid lg:grid-cols-3 gap-6 items-center">
              <div class="lg:col-span-2">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <i class="fas fa-exclamation-triangle text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold">24/7 Emergency Support</h3>
                    <p class="text-red-100">Immediate medical assistance when you need it most</p>
                  </div>
                </div>
                <div class="grid sm:grid-cols-2 gap-4 text-sm">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-clock"></i>
                    <span>Round-the-clock availability</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-ambulance"></i>
                    <span>Emergency dispatch coordination</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-phone"></i>
                    <span>Direct line to emergency services</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-heart"></i>
                    <span>Life-saving support</span>
                  </div>
                </div>
              </div>
              <div class="text-center lg:text-right">
                <div class="space-y-3">
                  <button @click="callEmergency" class="btn bg-white text-red-500 hover:bg-red-50 w-full lg:w-auto">
                    <i class="fas fa-phone mr-2"></i>
                    Call 911 Now
                  </button>
                  <button @click="$router.push('/contact')" class="btn border-white text-white hover:bg-white/10 w-full lg:w-auto">
                    <i class="fas fa-headset mr-2"></i>
                    Non-Emergency Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="section bg-gray-50">
        <div class="container">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-gray-900 mb-4">What Our Patients Say</h2>
            <p class="text-large text-gray-600">Real experiences from real people</p>
          </div>
          
          <div class="grid lg:grid-cols-3 gap-8">
            <div v-for="(testimonial, index) in testimonials" :key="index" 
                 class="bg-white rounded-2xl p-6 shadow-sm" data-aos="fade-up" :data-aos-delay="index * 100">
              <div class="flex items-center gap-1 mb-4">
                <i v-for="i in 5" :key="i" class="fas fa-star text-yellow-400 text-sm"></i>
              </div>
              <p class="text-gray-600 mb-4 italic">"{{ testimonial.content }}"</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-medical-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  {{ testimonial.name.charAt(0) }}
                </div>
                <div>
                  <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                  <div class="text-sm text-gray-500">{{ testimonial.service }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section bg-medical-primary text-white">
        <div class="container text-center">
          <div class="max-w-3xl mx-auto">
            <h2 class="heading-2 text-white mb-4">Ready to Get Started?</h2>
            <p class="text-large text-blue-100 mb-8">
              Join thousands of patients who trust us with their healthcare needs.
              Book your consultation today.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="$router.push('/patient-signup')" class="btn bg-white text-medical-primary hover:bg-blue-50">
                <i class="fas fa-user-plus mr-2"></i>
                Sign Up as Patient
              </button>
              <button @click="$router.push('/doctor-signup')" class="btn border-white text-white hover:bg-white/10">
                <i class="fas fa-user-md mr-2"></i>
                Join as Doctor
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
    <ChatButton />

    <!-- Back to Top Button -->
    <button 
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 w-12 h-12 bg-medical-primary text-white rounded-full shadow-lg hover:bg-medical-primary/90 transition-all duration-300 z-40"
      aria-label="Back to top"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'OurServices',
  components: { AppHeader, AppFooter, ChatButton },
  data() {
    return {
      activeCategory: 'patient',
      showBackToTop: false,
      stats: [
        { number: '500+', label: 'Expert Doctors' },
        { number: '10K+', label: 'Happy Patients' },
        { number: '24/7', label: 'Support Available' },
        { number: '50+', label: 'Medical Specialties' }
      ],
      serviceCategories: [
        {
          key: 'patient',
          title: 'Patient Services',
          description: 'Comprehensive healthcare for individuals and families',
          icon: 'fas fa-user',
          activeColor: 'bg-orange-500'
        },
        {
          key: 'doctor',
          title: 'Healthcare Providers',
          description: 'Professional tools and resources for medical practitioners',
          icon: 'fas fa-stethoscope',
          activeColor: 'bg-medical-secondary'
        },
        {
          key: 'general',
          title: 'General Services',
          description: 'Support services and platform features for everyone',
          icon: 'fas fa-heart',
          activeColor: 'bg-green-500'
        }
      ],
      detailedServices: {
        patient: {
          title: 'Patient Healthcare Services',
          description: 'Complete healthcare solutions designed for patients and their families, from routine checkups to specialized treatments.',
          services: [
            {
              title: 'Online Consultations',
              description: 'Connect with certified doctors from the comfort of your home',
              icon: 'fas fa-video',
              bgColor: 'bg-blue-500',
              primary: true,
              features: [
                'Video calls with licensed doctors',
                'Instant messaging support',
                'Digital prescriptions',
                'Medical record access',
                'Follow-up reminders'
              ],
              ctaText: 'Book Consultation',
              ctaIcon: 'fas fa-calendar-check',
              route: '/patient-signup'
            },
            {
              title: 'Appointment Booking',
              description: 'Schedule in-person visits with your preferred healthcare providers',
              icon: 'fas fa-calendar-alt',
              bgColor: 'bg-green-500',
              features: [
                'Real-time availability',
                'Preferred doctor selection',
                'Flexible scheduling',
                'Automatic reminders',
                'Easy rescheduling'
              ],
              ctaText: 'Schedule Now',
              ctaIcon: 'fas fa-clock',
              route: '/patient-signup'
            },
            {
              title: 'Health Records Management',
              description: 'Secure digital storage and management of your medical history',
              icon: 'fas fa-folder-medical',
              bgColor: 'bg-purple-500',
              features: [
                'Centralized health records',
                'Lab results storage',
                'Vaccination tracking',
                'Family health history',
                'Export capabilities'
              ],
              ctaText: 'Access Records',
              ctaIcon: 'fas fa-database',
              route: '/patient-signup'
            },
            {
              title: 'Prescription Services',
              description: 'Digital prescription management and pharmacy coordination',
              icon: 'fas fa-pills',
              bgColor: 'bg-orange-500',
              features: [
                'Digital prescriptions',
                'Pharmacy integration',
                'Medication reminders',
                'Refill requests',
                'Drug interaction alerts'
              ],
              ctaText: 'Manage Prescriptions',
              ctaIcon: 'fas fa-prescription-bottle',
              route: '/patient-signup'
            }
          ]
        },
        doctor: {
          title: 'Healthcare Provider Services',
          description: 'Professional tools and resources to help healthcare providers deliver excellent patient care and manage their practice efficiently.',
          services: [
            {
              title: 'Practice Management',
              description: 'Comprehensive tools to streamline your medical practice operations',
              icon: 'fas fa-chart-line',
              bgColor: 'bg-medical-secondary',
              primary: true,
              features: [
                'Patient scheduling system',
                'Electronic health records',
                'Billing and invoicing',
                'Staff management tools',
                'Performance analytics'
              ],
              ctaText: 'Join Platform',
              ctaIcon: 'fas fa-user-md',
              route: '/doctor-signup'
            },
            {
              title: 'Telemedicine Platform',
              description: 'Conduct secure video consultations with your patients',
              icon: 'fas fa-laptop-medical',
              bgColor: 'bg-indigo-500',
              features: [
                'HD video consultations',
                'Screen sharing capabilities',
                'Digital prescription tools',
                'Session recording',
                'Multi-device support'
              ],
              ctaText: 'Start Consultations',
              ctaIcon: 'fas fa-video',
              route: '/doctor-signup'
            },
            {
              title: 'Revenue Management',
              description: 'Track earnings, manage payments, and optimize your income',
              icon: 'fas fa-dollar-sign',
              bgColor: 'bg-green-600',
              features: [
                'Real-time earnings tracking',
                'Payment processing',
                'Tax reporting tools',
                'Performance metrics',
                'Financial analytics'
              ],
              ctaText: 'View Earnings',
              ctaIcon: 'fas fa-chart-pie',
              route: '/doctor-signup'
            },
            {
              title: 'Professional Development',
              description: 'Continuing education and professional growth resources',
              icon: 'fas fa-graduation-cap',
              bgColor: 'bg-purple-600',
              features: [
                'CME credit courses',
                'Medical research access',
                'Peer networking',
                'Industry updates',
                'Certification tracking'
              ],
              ctaText: 'Explore Learning',
              ctaIcon: 'fas fa-book-medical',
              route: '/doctor-signup'
            }
          ]
        },
        general: {
          title: 'General Platform Services',
          description: 'Essential platform features and support services available to all users for the best possible healthcare experience.',
          services: [
            {
              title: '24/7 Customer Support',
              description: 'Round-the-clock assistance for all your healthcare needs',
              icon: 'fas fa-headset',
              bgColor: 'bg-red-500',
              primary: true,
              features: [
                'Live chat support',
                'Phone assistance',
                'Email support',
                'Emergency protocols',
                'Multi-language support'
              ],
              ctaText: 'Get Support',
              ctaIcon: 'fas fa-phone',
              route: '/contact'
            },
            {
              title: 'Secure Platform',
              description: 'HIPAA-compliant security for all your health information',
              icon: 'fas fa-shield-alt',
              bgColor: 'bg-blue-600',
              features: [
                'End-to-end encryption',
                'HIPAA compliance',
                'Secure data storage',
                'Privacy controls',
                'Audit trails'
              ],
              ctaText: 'Learn About Security',
              ctaIcon: 'fas fa-lock',
              route: '/contact'
            },
            {
              title: 'Mobile Access',
              description: 'Full platform functionality on any device, anywhere',
              icon: 'fas fa-mobile-alt',
              bgColor: 'bg-green-500',
              features: [
                'Mobile-responsive design',
                'iOS & Android apps',
                'Offline capabilities',
                'Cross-device sync',
                'Push notifications'
              ],
              ctaText: 'Download App',
              ctaIcon: 'fas fa-download',
              route: '/contact'
            },
            {
              title: 'Insurance Integration',
              description: 'Seamless integration with major insurance providers',
              icon: 'fas fa-file-medical',
              bgColor: 'bg-purple-500',
              features: [
                'Insurance verification',
                'Claims processing',
                'Coverage checking',
                'Prior authorization',
                'Benefits explanation'
              ],
              ctaText: 'Check Coverage',
              ctaIcon: 'fas fa-search',
              route: '/contact'
            }
          ]
        }
      },
      testimonials: [
        {
          name: 'Sarah Johnson',
          service: 'Online Consultation',
          content: 'The online consultation was incredibly convenient. Dr. Smith was thorough and professional, and I received my prescription within minutes.'
        },
        {
          name: 'Michael Chen',
          service: 'Emergency Care',
          content: 'When I needed emergency care at 2 AM, the platform connected me with a doctor immediately. Truly life-saving service.'
        },
        {
          name: 'Dr. Emily Rodriguez',
          service: 'Practice Management',
          content: 'As a healthcare provider, this platform has revolutionized how I manage my practice. The tools are intuitive and comprehensive.'
        }
      ]
    }
  },
  mounted() {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true
    });
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.scrollY > 500;
    },
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    scrollToServices() {
      this.$refs.servicesSection?.scrollIntoView({ behavior: 'smooth' });
    },
    
    navigateToService(service) {
      this.$router.push(service.route);
    },
    
    learnMore() {
      this.$router.push('/contact');
    },
    
    callEmergency() {
      window.location.href = 'tel:911';
    }
  }
}
</script>

<style scoped>
/* Additional smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Hover effects for service cards */
.group:hover .fas {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* Back to top button animation */
.fixed {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .heading-1 {
    font-size: 2.5rem;
  }
  
  .heading-2 {
    font-size: 2rem;
  }
}
</style>