<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <!-- Main Content with proper spacing for fixed header -->
    <main class="flex-1 pt-5 lg:pt-5">
      
      <!-- Hero Section -->
      <section v-if="!showSmartDoctorSection" class="bg-gradient-to-br from-medical-primary via-medical-secondary to-blue-600 text-white section">
        <div class="container mx-auto px-4">
          <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <!-- Hero Text Content -->
            <div class="text-left space-y-6 animate-fade-in">
              <h1 class="heading-1 text-blue-100 mb-6">
                <span class="text-highlight">Online doctor visits,</span>
                <transition-group name="fade" tag="span" class="block">
                  <span :key="currentHeroPhrase" class="inline-block">{{ currentHeroPhrase }}</span>
                </transition-group>
              </h1>
              
              <div class="text-large text-blue-100 space-y-2">
                <p class="font-medium">Your health, <span class="text-blue-100 font-bold">your way.</span></p>
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
                <button @click="showAllDoctorsList" class="btn btn-outline btn-large text-white border-white hover:bg-white hover:text-medical-primary">
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
                    <button @click="showAllDoctorsList" class="btn btn-primary btn-small">Find All Doctors</button>
                  </div>
                </div>
                
                <!-- Doctor Cards -->
                <div class="grid gap-4">
                  <div v-if="loadingDoctors" class="text-center text-white py-10">
                    <i class="fas fa-spinner fa-spin text-2xl"></i>
                    <p class="mt-2">Loading doctors...</p>
                  </div>
                  <div v-else-if="topRatedDoctors.length === 0" class="text-center text-white py-10">
                    <p>No top rated doctors available at the moment.</p>
                  </div>
                  <div
                    v-else
                    v-for="(doctor, index) in topRatedDoctors"
                    :key="doctor.id" 
                    class="relative bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-gray-800"
                    :style="{ animationDelay: `${index * 0.2}s` }"
                  >
                    <button @click="openDoctorProfileModal(doctor)" class="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 transition-colors z-10" title="View Profile">
                      <i class="fas fa-eye text-sm"></i> View
                    </button>

                    <div class="flex items-start gap-4">
                      <!-- Avatar -->
                      <div class="relative flex-shrink-0">
                        <img v-if="doctor.profile_photo" :src="doctor.profile_photo" :alt="doctor.full_name" class="w-16 h-16 rounded-lg object-cover" />
                        <div v-else class="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span class="text-xl font-bold text-gray-500">{{ getInitials(doctor.full_name) }}</span>
                        </div>
                        <div class="absolute -top-2 -right-2 bg-yellow-400 text-white px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
                            <i class="fas fa-star text-xs"></i>
                            <span class="font-bold text-sm">{{ doctor.average_rating > 0 ? doctor.average_rating.toFixed(1) : 'New' }}</span>
                        </div>
                      </div>
                      <!-- Info -->
                      <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-gray-900 truncate">{{ doctor.full_name || doctor.name }}</h4>
                        <p class="text-sm text-medical-secondary font-medium">{{ doctor.specialty }}</p>
                        <div class="text-xs text-gray-500 mt-2 space-y-1">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-briefcase-medical w-3 text-center text-gray-400"></i>
                                <span>{{ doctor.experience }} years exp.</span>
                            </div>
                            <div class="flex items-center gap-2" v-if="doctor.languages && doctor.languages.length">
                                <i class="fas fa-language w-3 text-center text-gray-400"></i>
                                <span class="truncate">{{ doctor.languages.join(', ') }}</span>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-4">
                        <button @click="bookAppointment(doctor)" class="btn btn-primary w-full btn-small">
                            Book Appointment
                        </button>
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
      <section v-else class="section bg-gray-50" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-4">
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
            <div class="flex flex-wrap justify-center gap-3 mb-8">
              <button 
                v-for="specialty in availableSpecialties" 
                :key="specialty"
                @click="currentSpecialty = specialty"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200',
                  currentSpecialty === specialty
                    ? 'bg-medical-secondary text-white border-medical-secondary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-medical-secondary'
                ]"
              >
                <span>{{ specialty }}</span>
              </button>
            </div>

            <!-- Doctor Cards Grid -->
            <div v-if="loadingAllDoctors" class="text-center py-10"><i class="fas fa-spinner fa-spin text-3xl text-medical-primary"></i></div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="doctor in filteredDoctors" 
                :key="doctor.id"
                class="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div class="card-body">
                  <div class="flex items-start gap-4">
                    <div class="relative flex-shrink-0">
                      <img v-if="doctor.profile_photo" :src="doctor.profile_photo" :alt="doctor.full_name" class="w-20 h-20 rounded-lg object-cover shadow-md" />
                      <div v-else class="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span class="text-2xl font-bold text-gray-500">{{ getInitials(doctor.full_name) }}</span>
                      </div>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-start justify-between mb-2">
                        <div>
                          <h3 class="font-bold text-gray-900 truncate">{{ doctor.full_name }}</h3>
                          <p class="text-sm text-medical-secondary font-medium">{{ doctor.specialty }}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 mb-2">
                        <div class="flex items-center gap-1 text-yellow-500">
                            <i class="fas fa-star"></i>
                            <span class="font-bold text-gray-800">{{ doctor.average_rating > 0 ? doctor.average_rating.toFixed(1) : 'New' }}</span>
                        </div>
                        <span class="text-xs text-gray-500 ml-1">({{ doctor.total_reviews }} reviews)</span>
                      </div>
                      <div class="text-xs text-gray-500 space-y-1">
                          <div class="flex items-center gap-2">
                              <i class="fas fa-briefcase-medical w-3 text-center text-gray-400"></i>
                              <span>{{ doctor.experience }} years exp.</span>
                          </div>
                          <div class="flex items-center gap-2" v-if="doctor.languages && doctor.languages.length">
                              <i class="fas fa-language w-3 text-center text-gray-400"></i>
                              <span class="truncate">{{ doctor.languages.join(', ') }}</span>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 border-t pt-3 flex items-center justify-between">
                      <span class="text-lg font-bold text-medical-primary">${{ doctor.consultation_fee || 'N/A' }}</span>
                      <button @click="bookAppointment(doctor)" class="btn btn-primary btn-small">
                          Book Now
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section ref="servicesSection" v-if="showLearnMore && !showSmartDoctorSection" class="section bg-slate-50" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center mb-12">
            <div class="text-center md:text-left mb-4 md:mb-0">
              <h2 class="heading-2 text-gray-900 mb-2">Our Services</h2>
              <p class="text-large text-gray-600">Comprehensive healthcare for your needs.</p>
            </div>
            <!-- <button 
              @click="navigateToServices"
              class="flex items-center text-medical-primary hover:text-medical-secondary font-medium transition-colors duration-200 group"
            >
              View All Services
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button> -->
          </div>

          <div class="overflow-hidden">
            <div ref="servicesContainer" class="flex space-x-8 overflow-x-auto py-8 px-4 scrollbar-hide snap-x snap-mandatory">
              <div
                v-for="(service, index) in services"
                :key="service.id"
                :data-index="index"
                @click="scrollToServicesStep(index)"
                class="flex-shrink-0 w-[85vw] sm:w-80 card transition-all duration-500 snap-center border-2 cursor-pointer"
                :class="servicesIndex === index ? 'transform scale-105 shadow-xl border-medical-primary' : 'border-transparent opacity-80'">
                <div class="card-body text-center">
                  <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl transition-transform duration-300">
                    <svg v-if="service.iconSvg" v-html="service.iconSvg" class="service-icon"></svg>
                    <i v-else :class="service.icon" class="service-icon-fallback"></i>
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
              <div class="flex-shrink-0 w-[85vw] sm:w-80 snap-center flex items-center justify-center p-6">
                <button @click="navigateToServices" class="w-full h-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-medical-primary hover:bg-blue-50 text-medical-primary transition-all duration-300">
                    <i class="fas fa-th-large text-4xl mb-4"></i>
                    <span class="text-xl font-bold">View All Services</span>
                    <p class="text-sm text-gray-600 mt-1">Explore our full range of offerings.</p>
                </button>
              </div>
            </div>
            <!-- Dots for Services -->
            <div class="flex justify-center mt-4 space-x-2">
              <button
                v-for="(service, index) in services"
                :key="`service-dot-${index}`"
                @click="scrollToServicesStep(index)"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="servicesIndex === index ? 'bg-medical-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'"
                :aria-label="`Go to service ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section ref="howItWorksSection" v-if="showLearnMore && !showSmartDoctorSection" class="section bg-white" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-gray-900 mb-4">{{ howItWorks[howItWorksView].title }}</h2>
            <p class="text-large text-gray-600">Simple steps to get started on our platform</p>
            
            <!-- Toggle Buttons -->
            <div class="mt-6 inline-flex rounded-lg shadow-sm">
              <button @click="howItWorksView = 'patient'" :class="['px-6 py-2 rounded-l-lg border border-gray-300 transition-colors', howItWorksView === 'patient' ? 'bg-medical-primary text-white border-medical-primary' : 'bg-white text-gray-700 hover:bg-gray-50']">
                <i class="fas fa-user mr-2"></i> For Patients
              </button>
              <button @click="howItWorksView = 'doctor'" :class="['px-6 py-2 rounded-r-lg border border-gray-300 -ml-px transition-colors', howItWorksView === 'doctor' ? 'bg-medical-primary text-white border-medical-primary' : 'bg-white text-gray-700 hover:bg-gray-50']">
                <i class="fas fa-user-md mr-2"></i> For Doctors
              </button>
            </div>
          </div>

          <div class="overflow-hidden">
            <div ref="howItWorksContainer" class="flex space-x-8 overflow-x-auto py-8 px-4 scrollbar-hide snap-x snap-mandatory">
              <div
                v-for="(step, index) in howItWorks[howItWorksView].steps"
                :key="step.id"
                :data-index="index"
                @click="scrollToHowItWorksStep(index)"
                class="flex-shrink-0 w-80 text-center snap-center p-6 rounded-2xl transition-all duration-500 border-2 cursor-pointer"
                :class="howItWorksIndex === index ? 'bg-white transform scale-105 shadow-xl border-medical-primary' : 'bg-gray-50 border-transparent'">
                <div class="relative mb-6">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    <i :class="step.icon"></i>
                  </div>
                </div>
                <h3 class="heading-3 text-gray-900 mb-3">{{ step.title }}</h3>
                <p class="text-gray-600">{{ step.description }}</p>
              </div>
            </div>
            <!-- Dots for How It Works -->
            <div class="flex justify-center mt-4 space-x-2">
              <button
                v-for="(step, index) in howItWorks[howItWorksView].steps"
                :key="`howitworks-dot-${index}`"
                @click="scrollToHowItWorksStep(index)"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="howItWorksIndex === index ? 'bg-medical-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'"
                :aria-label="`Go to step ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
      </section>

      <!-- Health Tips Section -->
      <section ref="healthTipsSection" class="section bg-emerald-50" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center mb-12">
            <div class="text-center md:text-left mb-4 md:mb-0">
              <h2 class="heading-2 text-gray-900 mb-2">Health & Wellness Tips</h2>
              <p class="text-large text-gray-600">Expert advice to help you maintain a healthy lifestyle</p>
            </div>
            <!-- <button 
              @click="navigateToTips"
              class="flex items-center text-medical-primary hover:text-medical-secondary font-medium transition-colors duration-200 group"
            >
              View All Health Tips
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button> -->
          </div>
          
          <div class="overflow-hidden">
            <!-- Health Tips Container -->
            <div ref="healthTipsContainer" class="flex space-x-8 overflow-x-auto py-8 px-4 scrollbar-hide snap-x snap-mandatory">
              <div v-for="(tip, index) in healthTips" :key="tip.id"
                   :data-index="index"
                   @click="scrollToHealthTipsStep(index)"
                   class="flex-shrink-0 w-80 bg-white rounded-xl p-6 transform transition-all duration-500 cursor-pointer snap-center border-2"
                   :class="healthTipsIndex === index ? 'scale-105 shadow-xl border-medical-primary' : 'shadow-md border-transparent'">
                <div class="h-48 overflow-hidden rounded-lg mb-4">
                  <img 
                    :src="tip.image" 
                    :alt="tip.title" 
                    class="w-full h-full object-cover transition-transform duration-700"
                    :class="{ 'scale-110': healthTipsIndex === index }"
                  />
                </div>
                <div class="flex items-center mb-3">
                  <div :class="tip.tagClass">{{ tip.tag }}</div>
                  <div v-if="healthTipsIndex === index" class="ml-auto text-medical-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ tip.title }}</h3>
                <p class="text-gray-600 mb-4">{{ tip.description }}</p>
                <button @click="viewTipDetails(tip)" class="text-medical-primary font-medium flex items-center group">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div class="flex-shrink-0 w-80 snap-center flex items-center justify-center p-6">
                <button @click="navigateToTips" class="w-full h-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-medical-primary hover:bg-emerald-50 text-medical-primary transition-all duration-300">
                    <i class="fas fa-book-heart text-4xl mb-4"></i>
                    <span class="text-xl font-bold">View All Tips</span>
                    <p class="text-sm text-gray-600 mt-1">Discover more wellness advice.</p>
                </button>
              </div>
            </div>
            <!-- Dots for Health Tips -->
            <div class="flex justify-center mt-4 space-x-2">
              <button
                v-for="(tip, index) in healthTips"
                :key="`healthtip-dot-${index}`"
                @click="scrollToHealthTipsStep(index)"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="healthTipsIndex === index ? 'bg-medical-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'"
                :aria-label="`Go to health tip ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section ref="testimonialsSection" class="section bg-gradient-to-br from-red-500" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-white mb-4">Patient & Doctor Stories</h2>
            <p class="text-large text-red-100">Real experiences from our community</p>
          </div>

          <div class="overflow-hidden">
            <div ref="allTestimonialsContainer" class="flex space-x-8 overflow-x-auto py-8 px-4 scrollbar-hide snap-x snap-mandatory">
              <div
                v-for="(story, index) in allTestimonials"
                :key="story.storyId"
                :data-index="index"
                @click="scrollToTestimonialsStep(index)"
                class="flex-shrink-0 w-[90vw] sm:w-96 card snap-center transition-all duration-500 border-2 cursor-pointer"
                :class="testimonialsIndex === index ? 'transform scale-105 shadow-2xl border-white' : 'opacity-80 border-transparent'">
                <div class="card-body">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-1 text-yellow-500">
                      <i v-for="star in 5" :key="star" class="fas fa-star"></i>
                    </div>
                    <span class="text-xs font-semibold px-3 py-1 rounded-full" :class="story.type === 'Patient' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'">
                      {{ story.type }} Story
                    </span>
                  </div>
                  <p class="text-gray-600 mb-4 italic">"{{ story.text }}"</p>
                  <div class="flex items-center gap-3">
                    <img :src="story.avatar" :alt="story.name" class="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div class="font-semibold text-gray-900">{{ story.name }}</div>
                      <div class="text-sm text-gray-500">{{ story.location || story.specialty }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Dots for Testimonials -->
            <div class="flex justify-center mt-4 space-x-2">
              <button
                v-for="(story, index) in allTestimonials"
                :key="`testimonial-dot-${index}`"
                @click="scrollToTestimonialsStep(index)"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="testimonialsIndex === index ? 'bg-white scale-125' : 'bg-red-200 hover:bg-red-300'"
                :aria-label="`Go to story ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section bg-gradient-to-r from-medical-primary to-medical-secondary text-white">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div class="text-center lg:text-left">
              <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Ready to Get Started?</h2>
              <p class="text-base text-blue-100">
                Join thousands of patients who trust DoctorBuddy for their healthcare needs.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="$router.push('/patient-login')" class="btn btn-secondary group">
                <i class="fas fa-user-plus mr-2"></i>
                Sign Up as Patient
                <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-200"></i>
              </button>
              <button @click="$router.push('/doctor-login')" class="btn btn-outline text-white border-white hover:bg-white hover:text-medical-primary group">
                <i class="fas fa-stethoscope mr-2"></i>
                Join as Doctor
                <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-200"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
    <ChatButton @open-chat="openChat" />
    <FloatingActionButton @click="$router.push('/patient-login')" />
    <FloatingActionButton @click="$router.push('/doctor-login')" />
    
    <!-- Tip Detail Modal -->
    <div v-if="selectedTip" class="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50" @click.self="closeModal">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          @click="closeModal"
          class="fixed sm:absolute top-4 right-4 bg-white/80 hover:bg-gray-100 rounded-full p-2 shadow-lg text-gray-700 hover:text-gray-900 z-10"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="h-64 overflow-hidden">
          <img 
            :src="selectedTip.image" 
            :alt="selectedTip.title"
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <span :class="selectedTip.tagClass" class="text-xs font-semibold px-3 py-1 rounded-full">
              {{ selectedTip.tag }}
            </span>
            <span class="text-sm text-gray-500">Today</span>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedTip.title }}</h2>
          
          <div class="prose max-w-none text-gray-600 mb-6">
            <p class="mb-4">{{ selectedTip.description }}</p>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 class="font-semibold text-blue-800 mb-2">Key Benefits</h3>
              <ul class="space-y-2">
                <li v-for="(benefit, index) in ['Improved health', 'Better lifestyle', 'Increased energy']" 
                    :key="index" 
                    class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" 
                       fill="none" 
                       viewBox="0 0 24 24" 
                       stroke="currentColor">
                    <path stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ benefit }}</span>
                </li>
              </ul>
            </div>
            
            <p class="text-gray-700">For more detailed information and personalized advice, please consult with our healthcare professionals.</p>
          </div>
          
          <div class="flex justify-between items-center">
            <button 
              @click="closeModal"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Close
            </button>
            <button 
              @click="navigateToTips"
              class="px-6 py-2.5 bg-medical-primary text-white rounded-lg hover:bg-medical-secondary transition-colors duration-200 font-medium"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Doctor Profile Modal -->
    <div v-if="selectedDoctorProfile" class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" @click.self="closeDoctorProfileModal">
      <div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-xl animate-fade-in" style="min-height: 300px;">
        <!-- Loading Spinner -->
        <div v-if="loadingDoctorProfile" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-20">
          <i class="fas fa-spinner fa-spin text-4xl text-medical-primary"></i>
        </div>
        
        <template v-else-if="selectedDoctorProfile.id">
          <!-- Close Button -->
          <button @click="closeDoctorProfileModal" class="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <!-- Modal Content -->
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-start gap-4 mb-6">
              <img v-if="selectedDoctorProfile.profile_photo" :src="selectedDoctorProfile.profile_photo" :alt="selectedDoctorProfile.full_name" class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
              <div v-else class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                <span class="text-3xl font-bold text-gray-500">{{ getInitials(selectedDoctorProfile.full_name) }}</span>
              </div>
              <div class="pt-2">
                <h2 class="text-2xl font-bold text-gray-900">{{ selectedDoctorProfile.full_name }}</h2>
                <p class="text-md text-medical-secondary font-semibold">{{ selectedDoctorProfile.specialty }}</p>
                <p class="text-sm text-gray-500">{{ selectedDoctorProfile.degree }}</p>
              </div>
            </div>

            <!-- Details & Rating -->
            <div class="space-y-4 border-t pt-4 mt-6">
                <dl class="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4 text-sm">
                    <dt class="font-semibold text-gray-500">Experience</dt>
                    <dd class="sm:col-span-2 text-gray-800">{{ selectedDoctorProfile.experience }}+ Years Experience</dd>

                    <dt class="font-semibold text-gray-500">Languages</dt>
                    <dd class="sm:col-span-2 text-gray-800">{{ selectedDoctorProfile.languages.join(', ') }}</dd>

                    <dt class="font-semibold text-gray-500">Clinic/City</dt>
                    <dd class="sm:col-span-2 text-gray-800">{{ selectedDoctorProfile.clinic_name }}, {{ selectedDoctorProfile.city }}</dd>

                    <dt class="font-semibold text-gray-500">Availability</dt>
                    <dd class="sm:col-span-2 text-gray-800">{{ formatAvailability(selectedDoctorProfile) }}</dd>
                    
                    <dt class="font-semibold text-gray-500">Rating</dt>
                    <dd class="sm:col-span-2 flex items-center gap-2">
                        <div class="flex items-center gap-0.5"><i v-for="star in 5" :key="star" class="fas fa-star" :class="star <= Math.round(selectedDoctorProfile.average_rating || 0) ? 'text-yellow-400' : 'text-gray-300'"></i></div>
                        <span class="font-bold text-gray-800">{{ selectedDoctorProfile.average_rating > 0 ? selectedDoctorProfile.average_rating.toFixed(1) : 'New' }}</span>
                    </dd>

                    <dt class="font-semibold text-gray-500">Reviewed patients</dt>
                    <dd class="sm:col-span-2 text-gray-800">{{ selectedDoctorProfile.total_reviews }} reviews</dd>
                </dl>
            </div>
          </div>

          <!-- Footer with CTA -->
          <div class="bg-gray-50 p-4 rounded-b-2xl">
            <button @click="bookAppointment(selectedDoctorProfile)" class="btn btn-primary w-full">Book Appointment</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';
import FloatingActionButton from '@/components/ui/FloatingActionButton.vue';
import axios from 'axios';

export default {
  name: 'DoctorHome',
  components: { AppHeader, AppFooter, ChatButton, FloatingActionButton },
  data() {
    return {
      selectedTip: null,
      loadingDoctorProfile: false,
      selectedDoctorProfile: null,
      loadingDoctors: false,
      loadingAllDoctors: false,
      allDoctors: [],
      servicesIndex: 0,
      servicesInterval: null,
      healthTipsIndex: 0,
      healthTipsInterval: null,
      servicesObserver: null,
      howItWorksObserver: null,
      healthTipsObserver: null,
      testimonialsObserver: null,
      testimonialsIndex: 0,
      testimonialsInterval: null,
      healthTips: [
        {
          id: 1,
          title: 'Eat a Balanced Diet',
          description: 'Incorporate a variety of fruits, vegetables, whole grains, and lean proteins into your meals for optimal health.',
          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'NUTRITION',
          tagClass: 'bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full',
          isHovered: false
        },
        {
          id: 2,
          title: 'Stay Active Daily',
          description: 'Aim for at least 30 minutes of moderate exercise most days of the week to maintain good health.',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'FITNESS',
          tagClass: 'bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full',
          isHovered: false
        },
        {
          id: 3,
          title: 'Manage Stress',
          description: 'Practice mindfulness, meditation, or deep breathing exercises to reduce stress and improve mental health.',
          image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'WELLBEING',
          tagClass: 'bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full',
          isHovered: false
        },
        {
          id: 4,
          title: 'Stay Hydrated',
          description: 'Drink at least 8 glasses of water daily to maintain proper body function and energy levels.',
          image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'HYDRATION',
          tagClass: 'bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full',
          isHovered: false
        },
        {
          id: 5,
          title: 'Quality Sleep',
          description: 'Get 7-9 hours of quality sleep each night to support overall health and well-being.',
          image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'SLEEP',
          tagClass: 'bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full',
          isHovered: false
        }
      ],
      
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
      currentSpecialty: 'All',
      howItWorksIndex: 0,
      howItWorksInterval: null,
      howItWorksView: 'patient',
      availableSpecialties: ['All'],
      
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
      topRatedDoctors: [],
      
      
      
      services: [
        {
          id: 1,
          title: 'Video Consultations',
          description: 'Face-to-face consultations with certified doctors from anywhere.',
          icon: 'fas fa-video',
          iconSvg: '<path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>',
          features: ['HD Video Quality', 'Secure & Private', 'Record Sessions', 'Multiple Devices']
        },
        {
          id: 2,
          title: 'E-Prescriptions',
          description: 'Get prescriptions delivered directly to your preferred pharmacy.',
          icon: 'fas fa-prescription-bottle',
          iconSvg: '<path fill="currentColor" d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm11 12H5v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/>',
          features: ['Digital Prescriptions', 'Pharmacy Integration', 'Medication Reminders', 'Refill Alerts']
        },
        {
          id: 3,
          title: 'Health Records',
          description: 'Secure digital health records accessible anytime, anywhere.',
          icon: 'fas fa-file-medical',
          iconSvg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
          features: ['Cloud Storage', 'Easy Sharing', 'Medical History', 'Lab Results']
        },
        {
          id: 4,
          title: 'Specialist Care',
          description: 'Access to specialists for complex medical conditions.',
          icon: 'fas fa-stethoscope',
          iconSvg: '<path fill="currentColor" d="M19 14c1.49-1.46 2.26-3.5 2.26-5.5 0-4.14-3.36-7.5-7.5-7.5S6.24 4.36 6.24 8.5c0 2 .77 4.04 2.26 5.5L8 16l2 2 2-2-1.5-1.5c-.96-.94-1.5-2.25-1.5-3.5 0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.25-.54 2.56-1.5 3.5L16 16l2 2 2-2-1.5-1.5z"/>',
          features: ['Expert Specialists', 'Second Opinions', 'Treatment Plans', 'Follow-up Care']
        },
        {
          id: 5,
          title: 'Mental Health',
          description: 'Professional mental health support and counseling services.',
          icon: 'fas fa-brain',
          iconSvg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
          features: ['Licensed Therapists', 'Confidential Sessions', 'Crisis Support', 'Wellness Programs']
        },
        {
          id: 6,
          title: '24/7 Support',
          description: 'Round-the-clock medical support for urgent health concerns.',
          icon: 'fas fa-clock',
          iconSvg: '<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>',
          features: ['Always Available', 'Emergency Support', 'Quick Response', 'Medical Guidance']
        }
      ],
      
      howItWorks: {
        patient: {
          title: 'How It Works for Patients',
          description: 'Simple steps to get the care you need, anytime, anywhere.',
          steps: [
            { id: 1, icon: 'fas fa-user-plus', title: 'Sign Up', description: 'Create your secure account and complete your medical profile in minutes.' },
            { id: 2, icon: 'fas fa-search', title: 'Find Your Doctor', description: 'Browse our network of certified doctors and choose the right one for you.' },
            { id: 3, icon: 'fas fa-video', title: 'Start Consultation', description: 'Begin your video consultation and get the expert care you need instantly.' }
          ]
        },
        doctor: {
          title: 'How It Works for Doctors',
          description: 'Join our network to expand your practice and connect with patients.',
          steps: [
            { id: 1, icon: 'fas fa-id-card', title: 'Register & Verify', description: 'Join our platform by completing a simple registration and verification process.' },
            { id: 2, icon: 'fas fa-calendar-alt', title: 'Set Your Schedule', description: 'Manage your availability and appointments with our flexible scheduling tools.' },
            { id: 3, icon: 'fas fa-laptop-medical', title: 'Conduct Consultations', description: 'Provide high-quality care to patients through secure video calls.' }
          ]
        }
      },
      
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
      ],
      doctorTestimonials: [
        {
          id: 1,
          name: 'Dr. John Doe',
          specialty: 'Cardiology',
          text: 'DoctorBuddy has revolutionized how I connect with my patients. It\'s efficient, secure, and incredibly user-friendly.',
          avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop&crop=face'
        },
        {
          id: 2,
          name: 'Dr. Jane Smith',
          specialty: 'Pediatrics',
          text: 'The platform allows me to provide quality care to children and their families, no matter where they are. A game-changer for pediatric medicine.',
          avatar: 'https://images.unsplash.com/photo-1537368910025-7003507965b6?w=60&h=60&fit=crop&crop=face'
        },
        {
          id: 3,
          name: 'Dr. Alex Richards',
          specialty: 'Dermatology',
          text: 'I can now consult with more patients and provide timely advice, which is crucial in dermatology. Highly recommended!',
          avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=60&h=60&fit=crop&crop=face'
        }
      ]
    }
  },
  
  computed: {
    filteredDoctors() {
      if (this.currentSpecialty === 'All') {
        return this.allDoctors;
      }
      return this.allDoctors.filter(doctor => doctor.specialty === this.currentSpecialty);
    },
    allTestimonials() {
      const patientStories = this.testimonials.map(t => ({ ...t, type: 'Patient', storyId: `p-${t.id}` }));
      const doctorStories = this.doctorTestimonials.map(t => ({ ...t, type: 'Doctor', storyId: `d-${t.id}` }));
      
      // Interleave them for a mixed view
      const combined = [];
      const maxLength = Math.max(patientStories.length, doctorStories.length);
      for (let i = 0; i < maxLength; i++) {
        if (patientStories[i]) combined.push(patientStories[i]);
        if (doctorStories[i]) combined.push(doctorStories[i]);
      }
      return combined;
    }
  },
  
  methods: {
    async openDoctorProfileModal(doctor) {
      this.selectedDoctorProfile = {}; // Open modal shell
      this.loadingDoctorProfile = true;
      document.body.style.overflow = 'hidden';

      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/patient/doctors?doctor_id=${doctor.id}`);
        if (response.data && response.data.doctors && response.data.doctors.length > 0) {
          this.selectedDoctorProfile = response.data.doctors[0];
        } else {
          console.error('Doctor not found');
          this.closeDoctorProfileModal();
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        this.closeDoctorProfileModal();
      } finally {
        this.loadingDoctorProfile = false;
      }
    },
    closeDoctorProfileModal() {
      this.selectedDoctorProfile = null;
      this.loadingDoctorProfile = false;
      document.body.style.overflow = '';
    },
    formatAvailability(doctor) {
      if (!doctor) return 'Availability not specified';
      const days = doctor.available_days || 'Not specified';
      if (doctor.available_from && doctor.available_to) {
        return `Available ${days}, ${doctor.available_from}–${doctor.available_to}`;
      }
      return `Available on ${days}`;
    },
    getInitials(name) {
      if (!name) return '';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    },
    bookAppointment(doctor) {
      const token = localStorage.getItem('token');
      if (token) {
        console.log(`Booking appointment with ${doctor.full_name}`);
        this.$router.push(`/patient-dashboard`); // Or a specific booking page
      } else {
        // User not logged in, redirect to login
        this.$router.push('/patient-login');
      }
    },
    setupCarouselSyncing() {
      this.addScrollListener('servicesContainer', 'servicesIndex');
      this.addScrollListener('howItWorksContainer', 'howItWorksIndex');
      this.addScrollListener('healthTipsContainer', 'healthTipsIndex');
      this.addScrollListener('allTestimonialsContainer', 'testimonialsIndex');
    },
    addScrollListener(containerRef, indexProp) {
      const container = this.$refs[containerRef];
      if (!container) return;

      let scrollTimeout;

      const scrollListener = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const children = container.querySelectorAll('[data-index]');
          if (children.length === 0) return;

          let closestIndex = -1;
          let minDistance = Infinity;
          const containerCenter = container.scrollLeft + container.offsetWidth / 2;

          children.forEach(child => {
            const childCenter = child.offsetLeft + child.offsetWidth / 2;
            const distance = Math.abs(containerCenter - childCenter);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = parseInt(child.dataset.index, 10);
            }
          });

          if (closestIndex !== -1 && this[indexProp] !== closestIndex) {
            this[indexProp] = closestIndex;
            // Reset autoplay timer on manual scroll
            if (indexProp === 'servicesIndex') this.startServicesRotation();
            else if (indexProp === 'howItWorksIndex') this.startHowItWorksRotation();
            else if (indexProp === 'healthTipsIndex') this.startHealthTipsRotation();
            else if (indexProp === 'testimonialsIndex') this.startTestimonialsRotation();
          }
        }, 150);
      };
      const listenerProp = `${containerRef}ScrollListener`;
      if (this[listenerProp]) { container.removeEventListener('scroll', this[listenerProp]); }
      container.addEventListener('scroll', scrollListener);
      this[listenerProp] = scrollListener;
    },
    // Close modal and reset body overflow
    closeModal() {
      this.selectedTip = null;
      document.body.style.overflow = '';
    },
    
    // Method to view tip details
    viewTipDetails(tip) {
      this.selectedTip = { ...tip };
      document.body.style.overflow = 'hidden';
    },
    
    // Navigate to tips page
    navigateToTips() {
      // Close modal if open when navigating to tips page
      if (this.selectedTip) {
        this.closeModal();
      }
      this.$router.push('/health-tips');
    },
    
    navigateToServices() {
      this.$router.push('/services');
    },
    
    startHowItWorksRotation() {
      if (this.howItWorksInterval) {
        clearInterval(this.howItWorksInterval);
      }
      this.howItWorksInterval = setInterval(() => {
        this.advanceHowItWorksStep();
      }, 5000); // Swap every 5 seconds
    },

    advanceHowItWorksStep() {
      const stepsCount = this.howItWorks[this.howItWorksView].steps.length;
      if (stepsCount === 0) return;
      const newIndex = (this.howItWorksIndex + 1) % stepsCount;
      this.scrollToHowItWorksStep(newIndex);
    },

    scrollToHowItWorksStep(index) {
      const container = this.$refs.howItWorksContainer;
      if (!container || !container.children[index]) return;

      const card = container.children[index];
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
      this.howItWorksIndex = index;
      
      // Reset the timer on manual interaction
      this.startHowItWorksRotation();
    },

    // --- Services Carousel ---
    startServicesRotation() {
      if (this.servicesInterval) clearInterval(this.servicesInterval);
      this.servicesInterval = setInterval(() => {
        this.advanceServicesStep();
      }, 5000);
    },
    advanceServicesStep() {
      const newIndex = (this.servicesIndex + 1) % this.services.length;
      this.scrollToServicesStep(newIndex);
    },
    scrollToServicesStep(index) {
      const container = this.$refs.servicesContainer;
      if (!container || !container.children[index]) return;
      container.children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      this.servicesIndex = index;
      this.startServicesRotation(); // Reset timer on interaction
    },

    // --- Health Tips Carousel ---
    startHealthTipsRotation() {
      if (this.healthTipsInterval) clearInterval(this.healthTipsInterval);
      this.healthTipsInterval = setInterval(() => {
        this.advanceHealthTipsStep();
      }, 5000);
    },
    advanceHealthTipsStep() {
      const newIndex = (this.healthTipsIndex + 1) % this.healthTips.length;
      this.scrollToHealthTipsStep(newIndex);
    },
    scrollToHealthTipsStep(index) {
      const container = this.$refs.healthTipsContainer;
      if (!container || !container.children[index]) return;
      container.children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      this.healthTipsIndex = index;
      this.startHealthTipsRotation(); // Reset timer on interaction
    },

    // --- Testimonials Carousel ---
    startTestimonialsRotation() {
      if (this.testimonialsInterval) clearInterval(this.testimonialsInterval);
      this.testimonialsInterval = setInterval(() => {
        this.advanceTestimonialsStep();
      }, 5000);
    },
    advanceTestimonialsStep() {
      const newIndex = (this.testimonialsIndex + 1) % this.allTestimonials.length;
      this.scrollToTestimonialsStep(newIndex);
    },
    scrollToTestimonialsStep(index) {
      const container = this.$refs.allTestimonialsContainer;
      if (!container || !container.children[index]) return;
      container.children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      this.testimonialsIndex = index;
      this.startTestimonialsRotation(); // Reset timer on interaction
    },
    showAllDoctorsList() {
        this.showSmartDoctorSection = true;
        if (this.allDoctors.length === 0) {
            this.fetchAllDoctors();
        }
    },
    async fetchAllDoctors() {
      this.loadingAllDoctors = true;
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/patient/doctors');
        if (response.data && response.data.doctors) {
          this.allDoctors = response.data.doctors;
          const specialties = [...new Set(response.data.doctors.map(d => d.specialty).filter(Boolean))];
          this.availableSpecialties = ['All', ...specialties];
        }
      } catch (error) {
        console.error('Error fetching all doctors:', error);
        this.allDoctors = [];
      } finally {
        this.loadingAllDoctors = false;
      }
    },
    async fetchTopRatedDoctors() {
      this.loadingDoctors = true;
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/patient/doctors');

        if (response.data && response.data.doctors) {
            this.topRatedDoctors = response.data.doctors
                .sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
                .slice(0, 3);
        }
      } catch (error) {
        console.error('Error fetching top rated doctors:', error);
        // This error is expected for unauthenticated users. The UI will gracefully fall back to the empty state.
        this.topRatedDoctors = [];
      } finally {
        this.loadingDoctors = false;
      }
    },
    showLearnMoreSections() {
      this.showLearnMore = true;
      this.$nextTick(() => {
        this.setupObservers(); // Re-run to attach observers to new elements
        this.setupCarouselSyncing();
        const servicesSectionEl = this.$refs.servicesSection;
        if (servicesSectionEl) {
          servicesSectionEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
    
    selectDoctorForConsultation(doctor) {
      console.log('Selected doctor for consultation:', doctor);
      alert(`Starting consultation with ${doctor.name}`);
      // Add navigation logic here
    },
    
    setupObservers() {
      const options = { threshold: 0.1 };

      const initObserver = (refName, startFn, intervalProp, observerProp) => {
        if (this[observerProp]) this[observerProp].disconnect();
        const section = this.$refs[refName];
        if (section) {
          this[observerProp] = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              startFn();
            } else {
              if (this[intervalProp]) clearInterval(this[intervalProp]);
            }
          }, options);
          this[observerProp].observe(section);
        }
      };

      initObserver('servicesSection', this.startServicesRotation, 'servicesInterval', 'servicesObserver');
      initObserver('howItWorksSection', this.startHowItWorksRotation, 'howItWorksInterval', 'howItWorksObserver');
      initObserver('healthTipsSection', this.startHealthTipsRotation, 'healthTipsInterval', 'healthTipsObserver');
      initObserver('testimonialsSection', this.startTestimonialsRotation, 'testimonialsInterval', 'testimonialsObserver');
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
  
  watch: {
    howItWorksView() {
      // Reset the carousel when the user toggles between Patient/Doctor views
      this.howItWorksIndex = 0;
      this.$nextTick(() => {
        this.scrollToHowItWorksStep(0);
      // Re-setup the scroll listener for the new set of items
      this.addScrollListener('howItWorksContainer', 'howItWorksIndex');
      });
    }
  },

  mounted() {
    this.animateStats();
    this.startHeroPhraseRotation();
    this.startSubtitleRotation();
    this.fetchTopRatedDoctors();
    this.setupObservers();
    this.setupCarouselSyncing();
  },
  
  beforeUnmount() {
    if (this.heroPhraseInterval) {
      clearInterval(this.heroPhraseInterval);
    }
    if (this.subtitleInterval) {
      clearInterval(this.subtitleInterval);
    }
    if (this.howItWorksInterval) {
      clearInterval(this.howItWorksInterval);
    }
    if (this.servicesInterval) {
      clearInterval(this.servicesInterval);
    }
    if (this.healthTipsInterval) {
      clearInterval(this.healthTipsInterval);
    }
    if (this.testimonialsInterval) {
      clearInterval(this.testimonialsInterval);
    }

    const cleanupScrollListener = (containerRef) => {
      const container = this.$refs[containerRef];
      const listenerProp = `${containerRef}ScrollListener`;
      if (container && this[listenerProp]) {
        container.removeEventListener('scroll', this[listenerProp]);
      }
    };
    cleanupScrollListener('servicesContainer');
    cleanupScrollListener('howItWorksContainer');
    cleanupScrollListener('healthTipsContainer');
    cleanupScrollListener('allTestimonialsContainer');
    if (this.servicesObserver) this.servicesObserver.disconnect();
    if (this.howItWorksObserver) this.howItWorksObserver.disconnect();
    if (this.healthTipsObserver) this.healthTipsObserver.disconnect();
    if (this.testimonialsObserver) this.testimonialsObserver.disconnect();
  }
}
</script>

<style scoped>
/* Custom scrollbar for horizontal containers */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
  height: 8px;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 4px;
}

.scrollbar-hide::-webkit-scrollbar-track {
  background-color: #f3f4f6;
  border-radius: 4px;
}

/* Health Tips hover effect */
.health-tip-card {
  transition: all 0.3s ease;
}

.health-tip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom scrollbar for insurance partners */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

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

/* Service Icons Styling */
.service-icon {
  width: 32px;
  height: 32px;
  fill: currentColor;
  display: block;
}

.service-icon-fallback {
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ensure Font Awesome icons are visible */
.fas, .far, .fab {
  font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands" !important;
  font-weight: 900;
}

/* Insurance Partner Icons Styling */
.insurance-partner-icon {
  width: 48px;
  height: 48px;
  fill: currentColor;
  display: block;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.insurance-partner-icon:hover {
  opacity: 1;
}

.insurance-partner-fallback {
  font-size: 3rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.insurance-partner-fallback:hover {
  opacity: 1;
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