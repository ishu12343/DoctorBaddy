<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <!-- Main Content with proper spacing for fixed header -->
    <main class="flex-1 pt-16 lg:pt-2">
      
      <!-- Hero Section -->
      <section v-if="!showSmartDoctorSection" class="bg-gradient-to-br from-medical-primary via-medical-secondary to-blue-600 text-white section">
        <div class="container">
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

      <!-- Health Tips Section -->
      <section class="section bg-white py-16">
        <div class="container mx-auto px-4 relative">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Health & Wellness Tips</h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">Expert advice to help you maintain a healthy lifestyle and prevent illness</p>
          </div>
          
          <div class="relative group">
            <!-- Left Arrow -->
            <button @click="scrollHealthTips('left')" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 z-10 opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-medical-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <!-- Health Tips Container -->
            <div ref="healthTipsContainer" class="flex space-x-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
              <!-- Tip 1 -->
              <div v-for="tip in healthTips" :key="tip.id" 
                   class="flex-shrink-0 w-80 bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 cursor-pointer snap-center"
                   :class="{ 'scale-105 shadow-xl border-2 border-medical-primary': tip.isHovered }"
                   @mouseenter="setHoveredTip(tip.id)"
                   @mouseleave="tip.isHovered = false">
                <div class="h-48 overflow-hidden rounded-lg mb-4">
                  <img 
                    :src="tip.image" 
                    :alt="tip.title" 
                    class="w-full h-full object-cover transition-transform duration-700"
                    :class="{ 'scale-110': tip.isHovered }"
                  />
                </div>
                <div class="flex items-center mb-3">
                  <div :class="tip.tagClass">{{ tip.tag }}</div>
                  <div v-if="tip.isHovered" class="ml-auto text-medical-primary">
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
            </div>
            
            <!-- Right Arrow -->
            <button @click="scrollHealthTips('right')" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 z-10 opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-medical-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <!-- Dots and View All Button -->
          <div class="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <!-- Dots Indicator -->
            <div class="flex justify-center space-x-2">
              <button v-for="(tip, index) in healthTips" :key="'dot-'+tip.id" 
                      @click="scrollToHealthTip(index)"
                      class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                      :class="currentTipIndex === index ? 'bg-medical-primary w-6' : 'bg-gray-300'">
                <span class="sr-only">Go to tip {{ index + 1 }}</span>
              </button>
            </div>
            
            <!-- View All Tips Button -->
            <button 
              @click="navigateToTips"
              class="flex items-center text-medical-primary hover:text-medical-secondary font-medium transition-colors duration-200 group mt-4 sm:mt-0"
            >
              View All Health Tips
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Insurance Partners Section -->
      <section class="section bg-gray-50 py-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col sm:flex-row justify-between items-center mb-10">
            <div class="text-center sm:text-left mb-4 sm:mb-0">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Insurance Partners</h2>
              <p class="text-lg text-gray-600 max-w-2xl">We work with leading insurance providers to bring you the best healthcare coverage</p>
            </div>
            <button 
              @click="navigateToInsurancePartners"
              class="flex items-center text-medical-primary hover:text-medical-secondary font-medium transition-colors duration-200 group"
            >
              View All Partners
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
          
          <div class="relative">
            <div ref="partnersContainer" class="insurance-partners-container flex items-center space-x-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
              <!-- Insurance Partner Items -->
              <div v-for="(partner, index) in insurancePartners" :key="index" 
                   class="flex-shrink-0 w-48 h-32 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-2 hover:border-medical-primary cursor-pointer"
                   :class="{ 'ring-2 ring-medical-primary': partner.isHovered }"
                   @mouseover="partner.isHovered = true"
                   @mouseleave="partner.isHovered = false">
                <div class="h-16 w-full flex items-center justify-center mb-3 p-2 rounded-lg overflow-hidden" :class="partner.bgClass">
                  <img 
                    :src="partner.logo" 
                    :alt="partner.name" 
                    class="h-full w-full object-contain" 
                    :class="{ 'p-1': partner.id === 4 }"
                    loading="lazy"
                  />
                </div>
                <div class="text-center">
                  <h4 class="font-medium text-gray-800">{{ partner.name }}</h4>
                  <p class="text-sm text-gray-500">{{ partner.tagline }}</p>
                </div>
                <div v-if="partner.isHovered" class="absolute -right-4">
                  <div class="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md border-2 border-medical-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-medical-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Navigation Arrows -->
              <button @click="scrollPartners('left')" class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-medical-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button @click="scrollPartners('right')" class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-medical-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
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
            <button @click="$router.push('/patient-login')" class="btn btn-secondary btn-large">
              <i class="fas fa-user-plus mr-2"></i>
              Sign Up as Patient
            </button>
            <button @click="$router.push('/doctor-login')" class="btn btn-outline btn-large text-white border-white hover:bg-white hover:text-medical-primary">
              <i class="fas fa-stethoscope mr-2"></i>
              Join as Doctor
            </button>
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
              View All Tips
            </button>
          </div>
        </div>
      </div>
    </div>
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
      selectedTip: null,
      currentTipIndex: 0,
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
      // Insurance Partners
      insurancePartners: [
        { 
          id: 1, 
          name: 'Blue Cross', 
          tagline: 'Nationwide Coverage', 
          logo: 'https://www.bluecrossmn.com/sites/default/files/2022-07/blue-cross-logo-full-color-rgb.svg',
          isHovered: false,
          bgClass: 'bg-blue-50'
        },
        { 
          id: 2, 
          name: 'Aetna', 
          tagline: 'Health Benefits', 
          logo: 'https://www.aetna.com/content/dam/aetna/images/logos/Aetna_Logo_Vertical_BlueBlack_RGB.svg',
          isHovered: false,
          bgClass: 'bg-red-50'
        },
        { 
          id: 3, 
          name: 'Cigna', 
          tagline: 'Global Health', 
          logo: 'https://www.cigna.com/static/www-cigna-com/images/logo-cigna-combined.svg',
          isHovered: false,
          bgClass: 'bg-green-50'
        },
        { 
          id: 4, 
          name: 'UnitedHealth', 
          tagline: 'Optum Care', 
          logo: 'https://www.uhc.com/content/dam/uhcdotcom/header/UHC_Logo_RGB_No_Background.png',
          isHovered: false,
          bgClass: 'bg-purple-50'
        },
        { 
          id: 5, 
          name: 'Humana', 
          tagline: 'Wellness First', 
          logo: 'https://www.humana.com/content/dam/portal/web/humana-logo.svg',
          isHovered: false,
          bgClass: 'bg-yellow-50'
        },
        { 
          id: 6, 
          name: 'Kaiser', 
          tagline: 'Permanente', 
          logo: 'https://healthy.kaiserpermanente.org/static/health/images/kaiser-permanente-logo.svg',
          isHovered: false,
          bgClass: 'bg-blue-50'
        },
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
    
    // Navigate to insurance partners page
    navigateToInsurancePartners() {
      this.$router.push('/insurance-partners');
    },
    
    // Set hovered tip
    setHoveredTip(tipId) {
      this.healthTips = this.healthTips.map(tip => ({
        ...tip,
        isHovered: tip.id === tipId
      }));
    },
    
    scrollHealthTips(direction) {
      const container = this.$refs.healthTipsContainer;
      const scrollAmount = 320; // Width of card + gap
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      
      // Update current tip index based on scroll position
      this.updateCurrentTipIndex();
    },
    
    scrollToHealthTip(index) {
      const container = this.$refs.healthTipsContainer;
      const card = container.children[index];
      if (card) {
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        this.currentTipIndex = index;
      }
    },
    
    updateCurrentTipIndex() {
      const container = this.$refs.healthTipsContainer;
      if (!container) return;
      
      const scrollPosition = container.scrollLeft;
      const cardWidth = 320; // Width of card + gap
      const newIndex = Math.round(scrollPosition / cardWidth);
      
      if (newIndex !== this.currentTipIndex) {
        this.currentTipIndex = newIndex;
      }
    },
    
    // Smooth scroll to section
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    
    scrollPartners(direction) {
      const container = this.$el.querySelector('.insurance-partners-container');
      const scrollAmount = 300; // Adjust this value to control scroll distance
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    },
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