<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <!-- Main Content with proper spacing for fixed header -->
    <main class="flex-1 pt-16 lg:pt-20">
      
      <!-- Hero Section -->
      <section v-if="!showSmartDoctorSection" class="hero-pattern bg-gradient-to-br from-medical-primary via-medical-secondary to-blue-600 text-white section">
        <div class="container">
          <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <!-- Hero Text Content -->
            <div class="text-left space-y-6 animate-fade-in">
              <h1 class="heading-1 text-white">
                <span class="text-highlight">Online doctor visits,</span>
                <transition-group name="fade" tag="span" class="block">
                  <span :key="currentHeroPhrase" class="inline-block">{{ currentHeroPhrase }}</span>
                </transition-group>
              </h1>
              
              <div class="text-large text-blue-100 space-y-2">
                <p class="font-medium">Your health, <span class="text-white font-bold">your way.</span></p>
                <transition-group name="fade" tag="div">
                  <p :key="currentSubtitle" class="opacity-90">{{ currentSubtitle }}</p>
                </transition-group>
              </div>
              
              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button @click="showLearnMoreSections" class="btn btn-secondary btn-large">
                  <i class="fas fa-info-circle mr-2"></i>
                  Learn More
                </button>
                <button @click="showSmartDoctorSection = true" class="btn btn-outline btn-large text-white border-white hover:bg-white hover:text-medical-primary">
                  <i class="fas fa-stethoscope mr-2"></i>
                  Find Specialists
                </button>
              </div>
              
              <!-- Stats Row -->
              <div class="grid grid-cols-3 gap-4 pt-8">
                <div class="text-center">
                  <div class="text-2xl lg:text-3xl font-bold text-white">{{ animatedStats.doctors }}+</div>
                  <div class="text-sm text-blue-100">Expert Doctors</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl lg:text-3xl font-bold text-white">{{ animatedStats.patients }}+</div>
                  <div class="text-sm text-blue-100">Happy Patients</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl lg:text-3xl font-bold text-white">{{ animatedStats.consultations }}+</div>
                  <div class="text-sm text-blue-100">Consultations</div>
                </div>
              </div>
            </div>
            
            <!-- Hero Visual Content -->
            <div class="animate-slide-up">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-xl font-semibold text-white">Top Rated Doctors</h3>
                  <div class="flex items-center gap-2">
                    <span class="flex items-center gap-1 text-green-300 text-sm">
                      <i class="fas fa-circle text-xs"></i>
                      Live Now
                    </span>
                    <button @click="showSmartDoctorSection = true" class="btn btn-primary btn-small">
                      <i class="fas fa-stethoscope mr-1"></i>
                      Find Specialist
                      <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Doctor Cards -->
                <div class="grid gap-4">
                  <div 
                    v-for="(doctor, index) in topRatedDoctors.slice(0, 3)" 
                    :key="doctor.id"
                    class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    :style="{ animationDelay: `${index * 0.2}s` }"
                  >
                    <div class="flex items-center gap-3">
                      <div class="relative">
                        <img :src="doctor.image" :alt="doctor.name" class="w-12 h-12 rounded-full object-cover" />
                        <div class="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1 py-0.5 rounded-full flex items-center gap-1">
                          <i class="fas fa-star text-yellow-800"></i>
                          <span class="text-yellow-800 font-bold">{{ doctor.rating }}</span>
                        </div>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-semibold text-gray-900">{{ doctor.name }}</h4>
                        <p class="text-sm text-gray-600">{{ doctor.specialty }}</p>
                        <div class="flex items-center justify-between mt-2">
                          <span class="text-lg font-bold text-medical-primary">${{ doctor.consultationFee }}</span>
                          <button class="bg-medical-secondary text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                            <i class="fas fa-video"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Bottom Stats -->
                <div class="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
                  <div class="flex items-center gap-2 text-white">
                    <i class="fas fa-users text-blue-200"></i>
                    <div>
                      <div class="font-bold">2.5k+</div>
                      <div class="text-sm opacity-75">Patients Served</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-white">
                    <i class="fas fa-clock text-blue-200"></i>
                    <div>
                      <div class="font-bold">24/7</div>
                      <div class="text-sm opacity-75">Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Smart Doctor Recommendations Section -->
      <section v-else class="section bg-gray-50">
        <div class="container">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="heading-2 text-gray-900 mb-4">
                <i class="fas fa-brain text-medical-secondary mr-3"></i>
                Smart Doctor Recommendations
              </h2>
              <p class="text-large text-gray-600">Based on availability, ratings, and your needs</p>
              <button @click="showSmartDoctorSection = false" class="mt-4 text-medical-secondary hover:text-medical-primary transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>
                Back to Home
              </button>
            </div>

            <!-- Filter Categories -->
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                v-for="category in suggestionCategories" 
                :key="category.id"
                @click="currentSuggestionCategory = category.id"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200',
                  currentSuggestionCategory === category.id 
                    ? 'bg-medical-secondary text-white border-medical-secondary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-medical-secondary'
                ]"
              >
                <i :class="category.icon"></i>
                <span>{{ category.name }}</span>
                <span class="bg-white/20 text-xs px-2 py-1 rounded-full">{{ category.count }}</span>
              </button>
            </div>

            <!-- Doctor Cards Grid -->
            <div class="grid-cards">
              <div 
                v-for="doctor in filteredDoctors" 
                :key="doctor.id"
                class="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div class="card-body">
                  <div class="flex items-start gap-4">
                    <div class="relative">
                      <img :src="doctor.image" :alt="doctor.name" class="w-16 h-16 rounded-full object-cover" />
                      <div v-if="doctor.isOnline" class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-start justify-between mb-2">
                        <div>
                          <h3 class="font-semibold text-gray-900">{{ doctor.name }}</h3>
                          <p class="text-medical-secondary">{{ doctor.specialty }}</p>
                          <p class="text-sm text-gray-500">{{ doctor.experience }} years experience</p>
                        </div>
                        <div class="text-right">
                          <div class="flex items-center gap-1 text-yellow-500 mb-1">
                            <i class="fas fa-star"></i>
                            <span class="font-semibold">{{ doctor.rating }}</span>
                          </div>
                          <div class="text-lg font-bold text-medical-primary">${{ doctor.consultationFee }}</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4 text-sm">
                          <span class="flex items-center gap-1">
                            <i class="fas fa-users text-gray-400"></i>
                            {{ doctor.totalPatients }}+ patients
                          </span>
                          <span :class="[
                            'flex items-center gap-1',
                            doctor.isOnline ? 'text-green-600' : 'text-orange-600'
                          ]">
                            <i class="fas fa-clock"></i>
                            {{ doctor.nextAvailable }}
                          </span>
                        </div>
                        
                        <button 
                          @click="selectDoctorForConsultation(doctor)"
                          class="btn btn-primary btn-small"
                        >
                          <i class="fas fa-video mr-1"></i>
                          Consult Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section v-if="showLearnMore && !showSmartDoctorSection" class="section bg-white">
        <div class="container">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-gray-900 mb-4">Our Services</h2>
            <p class="text-large text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare services designed to meet all your medical needs from the comfort of your home.
            </p>
          </div>

          <div class="grid-cards">
            <div v-for="service in services" :key="service.id" class="card group hover:shadow-xl transition-all duration-300">
              <div class="card-body text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <i :class="service.icon"></i>
                </div>
                <h3 class="heading-3 text-gray-900 mb-3">{{ service.title }}</h3>
                <p class="text-gray-600 mb-4">{{ service.description }}</p>
                <ul class="text-left space-y-2">
                  <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-sm text-gray-600">
                    <i class="fas fa-check text-green-500"></i>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section v-if="showLearnMore && !showSmartDoctorSection" class="section bg-gray-50">
        <div class="container">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-gray-900 mb-4">How It Works</h2>
            <p class="text-large text-gray-600">Simple steps to get the care you need</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div v-for="(step, index) in howItWorksSteps" :key="step.id" class="text-center">
              <div class="relative mb-6">
                <div class="w-20 h-20 mx-auto bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {{ index + 1 }}
                </div>
                <div v-if="index < howItWorksSteps.length - 1" class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-medical-secondary to-blue-600 opacity-30"></div>
              </div>
              <h3 class="heading-3 text-gray-900 mb-3">{{ step.title }}</h3>
              <p class="text-gray-600">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section v-if="showLearnMore && !showSmartDoctorSection" class="section bg-white">
        <div class="container">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-gray-900 mb-4">What Our Patients Say</h2>
            <p class="text-large text-gray-600">Real experiences from real people</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="card">
              <div class="card-body">
                <div class="flex items-center gap-1 text-yellow-500 mb-4">
                  <i v-for="star in 5" :key="star" class="fas fa-star"></i>
                </div>
                <p class="text-gray-600 mb-4 italic">"{{ testimonial.text }}"</p>
                <div class="flex items-center gap-3">
                  <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                    <div class="text-sm text-gray-500">{{ testimonial.location }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section bg-gradient-to-r from-medical-primary to-medical-secondary text-white">
        <div class="container text-center">
          <h2 class="heading-2 text-white mb-4">Ready to Get Started?</h2>
          <p class="text-large text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust DoctorBuddy for their healthcare needs. Start your consultation today.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="$router.push('/patient-signup')" class="btn btn-secondary btn-large">
              <i class="fas fa-user-plus mr-2"></i>
              Sign Up as Patient
            </button>
            <button @click="$router.push('/doctor-signup')" class="btn btn-outline btn-large text-white border-white hover:bg-white hover:text-medical-primary">
              <i class="fas fa-stethoscope mr-2"></i>
              Join as Doctor
            </button>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
    <ChatButton @open-chat="openChat" />
    <FloatingActionButton @click="$router.push('/patient-signup')" />
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';
import FloatingActionButton from '@/components/ui/FloatingActionButton.vue';

export default {
  name: 'DoctorHome',
  components: { AppHeader, AppFooter, ChatButton, FloatingActionButton },
  data() {
    return {
      // Hero content
      heroPhrases: [
        '24/7',
        'Instant Care',
        'Expert Advice',
        'Video Consults',
        'From Anywhere',
        'No Waiting Rooms'
      ],
      currentHeroPhrase: '24/7',
      heroPhraseIndex: 0,
      heroPhraseInterval: null,
      
      subtitlePhrases: [
        'Caring, expert medical advice whenever you need it, from the comfort of your home.',
        'Connect instantly with trusted doctors for any health concern.',
        'Private video consultations, quick e-prescriptions, and gentle guidance.',
        'Support for your well-being, day or night—no waiting rooms.',
        'For emergencies, call 101 or visit your nearest hospital. Your health matters!'
      ],
      currentSubtitle: 'Caring, expert medical advice whenever you need it, from the comfort of your home.',
      subtitleIndex: 0,
      subtitleInterval: null,
      
      // UI state
      showSmartDoctorSection: false,
      showLearnMore: false,
      currentSuggestionCategory: 'top-rated',
      
      // Animated stats
      animatedStats: {
        doctors: 0,
        patients: 0,
        consultations: 0
      },
      finalStats: {
        doctors: 500,
        patients: 10000,
        consultations: 50000
      },
      
      // Categories
      suggestionCategories: [
        {
          id: 'top-rated',
          name: 'Top Rated',
          icon: 'fas fa-crown',
          count: 8
        },
        {
          id: 'available-now',
          name: 'Available Now',
          icon: 'fas fa-circle',
          count: 12
        },
        {
          id: 'specialists',
          name: 'Specialists',
          icon: 'fas fa-star',
          count: 15
        },
        {
          id: 'recommended',
          name: 'Recommended',
          icon: 'fas fa-thumbs-up',
          count: 6
        }
      ],
      
      // Mock data
      topRatedDoctors: [
        { 
          id: 1,
          name: 'Dr. Sarah Johnson', 
          specialty: 'Family Medicine', 
          rating: 4.9,
          consultationFee: 49,
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face'
        },
        { 
          id: 2,
          name: 'Dr. Michael Chen', 
          specialty: 'Cardiology', 
          rating: 4.8,
          consultationFee: 75,
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face'
        },
        { 
          id: 3,
          name: 'Dr. Emily Rodriguez', 
          specialty: 'Dermatology', 
          rating: 4.9,
          consultationFee: 65,
          image: 'https://images.unsplash.com/photo-1594824804732-ca8db5ac6d34?w=80&h=80&fit=crop&crop=face'
        }
      ],
      
      allDoctors: [
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialty: 'Family Medicine',
          experience: 15,
          rating: 4.9,
          consultationFee: 49,
          isOnline: true,
          isTopRated: true,
          isSpecialist: false,
          totalPatients: 2500,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          specialty: 'Cardiology',
          experience: 20,
          rating: 4.8,
          consultationFee: 75,
          isOnline: true,
          isTopRated: true,
          isSpecialist: true,
          totalPatients: 3200,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          specialty: 'Dermatology',
          experience: 12,
          rating: 4.9,
          consultationFee: 65,
          isOnline: false,
          isTopRated: true,
          isSpecialist: true,
          totalPatients: 1800,
          nextAvailable: '2:00 PM',
          image: 'https://images.unsplash.com/photo-1594824804732-ca8db5ac6d34?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 4,
          name: 'Dr. David Kim',
          specialty: 'Pediatrics',
          experience: 18,
          rating: 4.7,
          consultationFee: 55,
          isOnline: true,
          isTopRated: false,
          isSpecialist: true,
          totalPatients: 2100,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
        }
      ],
      
      services: [
        {
          id: 1,
          title: 'Video Consultations',
          description: 'Face-to-face consultations with certified doctors from anywhere.',
          icon: 'fas fa-video',
          features: ['HD Video Quality', 'Secure & Private', 'Record Sessions', 'Multiple Devices']
        },
        {
          id: 2,
          title: 'E-Prescriptions',
          description: 'Get prescriptions delivered directly to your preferred pharmacy.',
          icon: 'fas fa-prescription-bottle',
          features: ['Digital Prescriptions', 'Pharmacy Integration', 'Medication Reminders', 'Refill Alerts']
        },
        {
          id: 3,
          title: 'Health Records',
          description: 'Secure digital health records accessible anytime, anywhere.',
          icon: 'fas fa-file-medical',
          features: ['Cloud Storage', 'Easy Sharing', 'Medical History', 'Lab Results']
        },
        {
          id: 4,
          title: 'Specialist Care',
          description: 'Access to specialists for complex medical conditions.',
          icon: 'fas fa-stethoscope',
          features: ['Expert Specialists', 'Second Opinions', 'Treatment Plans', 'Follow-up Care']
        },
        {
          id: 5,
          title: 'Mental Health',
          description: 'Professional mental health support and counseling services.',
          icon: 'fas fa-brain',
          features: ['Licensed Therapists', 'Confidential Sessions', 'Crisis Support', 'Wellness Programs']
        },
        {
          id: 6,
          title: '24/7 Support',
          description: 'Round-the-clock medical support for urgent health concerns.',
          icon: 'fas fa-clock',
          features: ['Always Available', 'Emergency Support', 'Quick Response', 'Medical Guidance']
        }
      ],
      
      howItWorksSteps: [
        {
          id: 1,
          title: 'Sign Up',
          description: 'Create your account and complete your medical profile in minutes.'
        },
        {
          id: 2,
          title: 'Choose Doctor',
          description: 'Browse and select from our network of certified healthcare professionals.'
        },
        {
          id: 3,
          title: 'Start Consultation',
          description: 'Begin your video consultation and get the care you need instantly.'
        }
      ],
      
      testimonials: [
        {
          id: 1,
          name: 'Sarah Williams',
          location: 'New York',
          text: 'Amazing service! Got consultation within minutes and received excellent care.',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b589?w=60&h=60&fit=crop&crop=face'
        },
        {
          id: 2,
          name: 'John Martinez',
          location: 'California',
          text: 'The doctors are professional and the platform is so easy to use.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
        },
        {
          id: 3,
          name: 'Emily Chen',
          location: 'Texas',
          text: 'Saved me a trip to the ER! Quick diagnosis and prescription delivered.',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
        }
      ]
    }
  },
  
  computed: {
    filteredDoctors() {
      switch (this.currentSuggestionCategory) {
        case 'top-rated':
          return this.allDoctors.filter(doctor => doctor.isTopRated);
        case 'available-now':
          return this.allDoctors.filter(doctor => doctor.isOnline);
        case 'specialists':
          return this.allDoctors.filter(doctor => doctor.isSpecialist);
        case 'recommended':
          return this.allDoctors.filter(doctor => doctor.rating >= 4.8);
        default:
          return this.allDoctors;
      }
    }
  },
  
  methods: {
    showLearnMoreSections() {
      this.showLearnMore = true;
      setTimeout(() => {
        const servicesSection = document.querySelector('.section.bg-white');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    },
    
    selectDoctorForConsultation(doctor) {
      console.log('Selected doctor for consultation:', doctor);
      alert(`Starting consultation with ${doctor.name}`);
      // Add navigation logic here
    },
    
    openChat() {
      alert('Chat feature will open here!');
    },
    
    animateStats() {
      const duration = 2000;
      const stepTime = 50;
      const steps = duration / stepTime;
      
      Object.keys(this.finalStats).forEach(key => {
        const increment = this.finalStats[key] / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= this.finalStats[key]) {
            this.animatedStats[key] = this.finalStats[key];
            clearInterval(timer);
          } else {
            this.animatedStats[key] = Math.floor(current);
          }
        }, stepTime);
      });
    },
    
    startHeroPhraseRotation() {
      this.heroPhraseInterval = setInterval(() => {
        this.heroPhraseIndex = (this.heroPhraseIndex + 1) % this.heroPhrases.length;
        this.currentHeroPhrase = this.heroPhrases[this.heroPhraseIndex];
      }, 3000);
    },
    
    startSubtitleRotation() {
      this.subtitleInterval = setInterval(() => {
        this.subtitleIndex = (this.subtitleIndex + 1) % this.subtitlePhrases.length;
        this.currentSubtitle = this.subtitlePhrases[this.subtitleIndex];
      }, 5000);
    }
  },
  
  mounted() {
    this.animateStats();
    this.startHeroPhraseRotation();
    this.startSubtitleRotation();
  },
  
  beforeUnmount() {
    if (this.heroPhraseInterval) {
      clearInterval(this.heroPhraseInterval);
    }
    if (this.subtitleInterval) {
      clearInterval(this.subtitleInterval);
    }
  }
}
</script>

<style scoped>
/* Transition animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out 0.3s both;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .heading-1 {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .text-large {
    font-size: 1rem;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>