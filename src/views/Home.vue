<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <!-- Main Content with proper spacing for fixed header -->
    <main class="flex-1 pt-5 lg:pt-5">
      
      <!-- Hero Section -->
      <section v-if="!showSmartDoctorSection" class="bg-gradient-to-br from-medical-primary via-medical-secondary to-blue-600 text-white section">
        <div class="container mx-auto px-3 sm:px-4">
          <div class="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                        <!-- Hero Visual Content -->
                        <div class="animate-slide-up mt-6 lg:mt-0">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <h3 class="text-lg sm:text-xl font-semibold text-white">Top Rated Doctors</h3>
                  <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                    <span class="flex items-center gap-1 text-green-300 text-sm">
                      <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                      Live Now
                    </span>
                    <button @click="showAllDoctorsList" class="btn btn-primary btn-small w-full sm:w-auto">Find All Doctors</button>
                  </div>
                </div>
                
                <!-- Doctor Cards -->
                <div class="space-y-3 sm:space-y-4">
                  <div v-if="loadingDoctors" class="text-center text-white py-8 sm:py-10">
                    <i class="fas fa-spinner fa-spin text-xl sm:text-2xl"></i>
                    <p class="mt-2 text-sm sm:text-base">Loading doctors...</p>
                  </div>
                  <div v-else-if="topRatedDoctors.length === 0" class="text-center text-white py-8 sm:py-10">
                    <p class="text-sm sm:text-base">No top rated doctors available at the moment.</p>
                  </div>
                  <div
                    v-else
                    v-for="(doctor, index) in topRatedDoctors"
                    :key="doctor.id" 
                    class="relative bg-white rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-gray-800"
                    :style="{ animationDelay: `${index * 0.2}s` }"
                  >
                    <button @click="openDoctorProfileModal(doctor)" class="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gray-100 hover:bg-gray-200 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 transition-colors z-10 touch-friendly" title="View Profile">
                      <span class="text-lg sm:text-xl">👁️</span>
                    </button>

                    <div class="flex items-start gap-3 sm:gap-4">
                      <!-- Avatar -->
                      <div class="relative flex-shrink-0">
                        <img v-if="doctor.profile_photo" :src="doctor.profile_photo" :alt="doctor.full_name" class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover" />
                        <div v-else class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span class="text-lg sm:text-xl font-bold text-gray-500">{{ getInitials(doctor.full_name) }}</span>
                        </div>
                        <div class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg shadow-md flex items-center gap-1">
                            <span class="text-xs">⭐</span>
                            <span class="font-bold text-xs sm:text-sm">{{ doctor.average_rating > 0 ? doctor.average_rating.toFixed(1) : 'New' }}</span>
                        </div>
                      </div>
                      <!-- Info -->
                      <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-gray-900 truncate text-sm sm:text-base">{{ doctor.full_name || doctor.name }}</h4>
                        <p class="text-xs sm:text-sm text-medical-secondary font-medium">{{ doctor.specialty }}</p>
                        <div class="text-xs text-gray-500 mt-1 sm:mt-2 space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="w-3 text-center text-gray-400">💼</span>
                                <span>{{ doctor.experience }} years exp.</span>
                            </div>
                            <div class="flex items-center gap-2" v-if="doctor.languages && doctor.languages.length">
                                <span class="w-3 text-center text-gray-400">🌐</span>
                                <span class="truncate">{{ doctor.languages.join(', ') }}</span>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3 sm:mt-4">
                        <button @click="bookAppointment(doctor)" class="btn btn-primary w-full btn-small touch-button text-xs sm:text-sm">
                            Book Appointment
                        </button>
                    </div>
                  </div>
                </div>
                
                <!-- Bottom Stats -->
                <div class="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/20">
                  <div class="flex items-center gap-2 text-white">
                    <span class="text-blue-200 text-base sm:text-lg">👥</span>
                    <div>
                      <div class="font-bold text-sm sm:text-base">2.5k+</div>
                      <div class="text-xs sm:text-sm opacity-75">Patients Served</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-white">
                    <span class="text-blue-200 text-base sm:text-lg">🕐</span>
                    <div>
                      <div class="font-bold text-sm sm:text-base">24/7</div>
                      <div class="text-xs sm:text-sm opacity-75">Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Hero Text Content -->
            <div class="text-center lg:text-left space-y-4 sm:space-y-6 animate-fade-in">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-blue-100 mb-4 sm:mb-6">
                <span class="text-highlight">Online doctor visits,</span>
                <transition-group name="fade" tag="span" class="block">
                  <span :key="currentHeroPhrase" class="inline-block">{{ currentHeroPhrase }}</span>
                </transition-group>
              </h1>
              
              <div class="text-base sm:text-lg lg:text-xl leading-relaxed text-blue-100 space-y-2">
                <p class="font-medium">Your health, <span class="text-blue-100 font-bold">your way.</span></p>
                <transition-group name="fade" tag="div">
                  <p :key="currentSubtitle" class="opacity-90">{{ currentSubtitle }}</p>
                </transition-group>
              </div>
              
              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full">
                <button @click="showLearnMoreSections" class="btn btn-secondary btn-large w-full sm:w-auto">
                  <span class="mr-2">ℹ️</span>
                  Learn More
                </button>
                <button @click="showAllDoctorsList" class="btn btn-outline btn-large text-white border-white hover:bg-white hover:text-medical-primary w-full sm:w-auto">
                  <span class="mr-2">🩺</span>
                  Find Specialists
                </button>
              </div>
              
              <!-- Stats Row -->
              <div class="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8">
                <div class="text-center">
                  <i class="fas fa-user-md text-2xl sm:text-4xl mb-3 sm:mb-4"></i>
                  <div class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{{ animatedStats.doctors }}+</div>
                  <div class="text-xs sm:text-sm text-blue-100">Expert Doctors</div>
                </div>
                <div class="text-center">
                  <i class="fas fa-user text-2xl sm:text-4xl mb-3 sm:mb-4"></i>
                  <div class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{{ animatedStats.patients }}+</div>
                  <div class="text-xs sm:text-sm text-blue-100">Happy Patients</div>
                </div>
                <div class="text-center">
                  <i class="fas fa-user-friends text-md text-2xl sm:text-4xl mb-3 sm:mb-4"></i>
                    <div class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{{ animatedStats.consultations }}+</div>
                  <div class="text-xs sm:text-sm text-blue-100">Consultations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Smart Doctor Recommendations Section -->
      <section v-else class="section bg-gray-50" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-3 sm:px-4">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-6 sm:mb-8">
              <h2 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-900 mb-3 sm:mb-4">
                <span class="text-medical-secondary mr-2 sm:mr-3 text-2xl sm:text-3xl">🧠</span>
                Smart Doctor Recommendations
              </h2>
              <p class="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600">Based on availability, ratings, and your needs</p>
              <button @click="showSmartDoctorSection = false" class="mt-3 sm:mt-4 text-medical-secondary hover:text-medical-primary transition-colors touch-button">
                <span class="mr-2">⬅️</span>
                Back to Home
              </button>
            </div>

            <!-- Filter Categories -->
            <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <button 
                v-for="specialty in availableSpecialties" 
                :key="specialty"
                @click="currentSpecialty = specialty"
                :class="[
                  'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border-2 transition-all duration-200 text-xs sm:text-sm touch-button',
                  currentSpecialty === specialty
                    ? 'bg-medical-secondary text-white border-medical-secondary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-medical-secondary'
                ]"
              >
                <span>{{ specialty }}</span>
              </button>
            </div>

            <!-- Search and Filter -->
            <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                  <div class="relative">
                    <input
                      v-model="searchQuery"
                      @input="handleSearch"
                      type="text"
                      placeholder="Search by name or specialty..."
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent transition-all duration-200"
                    >
                    <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                  </div>
                </div>
                <div class="w-full md:w-64">
                  <select 
                    v-model="currentSpecialty" 
                    @change="handleSpecialtyChange"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white"
                  >
                    <option v-for="specialty in availableSpecialties" :key="specialty" :value="specialty">
                      {{ specialty }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Doctor Cards Grid -->
            <div v-if="loadingAllDoctors" class="text-center py-12">
              <i class="fas fa-spinner fa-spin text-3xl text-medical-primary"></i>
              <p class="mt-2 text-gray-600">Loading doctors...</p>
            </div>
            <div v-else-if="filteredDoctors.length === 0" class="text-center py-12">
              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <i class="fas fa-exclamation-circle text-yellow-400 text-xl"></i>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-yellow-700">
                      No doctors found matching your criteria. Try adjusting your search or filters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <template v-else>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div 
                  v-for="doctor in displayedFilteredDoctors" 
                  :key="doctor.id"
                  class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div class="card-body">
                    <div class="p-4">
                      <div class="flex items-start gap-4">
                        <div class="relative flex-shrink-0">
                          <img 
                            v-if="doctor.profile_photo" 
                            :src="doctor.profile_photo" 
                            :alt="doctor.full_name" 
                            class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-white shadow-md"
                            onerror="this.onerror=null; this.src='https://via.placeholder.com/80?text=DR'"
                          />
                          <div v-else class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-md">
                            <span class="text-xl sm:text-2xl font-bold text-blue-600">{{ getInitials(doctor.full_name) }}</span>
                          </div>
                          <div v-if="doctor.available" class="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 border-2 border-white"></div>
                        </div>
                        <div class="flex-1">
                          <div class="flex items-start justify-between mb-2">
                            <div>
                              <h3 class="font-bold text-gray-900 truncate">{{ doctor.full_name }}</h3>
                              <p class="text-sm text-medical-secondary font-medium">{{ doctor.specialty }}</p>
                            </div>
                            <div v-if="doctor.average_rating" class="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                              <span class="text-yellow-500 text-sm font-semibold">{{ doctor.average_rating.toFixed(1) }}</span>
                              <i class="fas fa-star text-yellow-400 ml-1 text-xs"></i>
                            </div>
                          </div>
                          
                          <div class="mt-2 text-sm text-gray-600 space-y-1">
                            <div class="flex items-center">
                              <i class="fas fa-briefcase text-gray-400 w-4 mr-2 text-center"></i>
                              <span>{{ doctor.experience || '5' }} years experience</span>
                            </div>
                            <div v-if="doctor.qualification" class="flex items-center">
                              <i class="fas fa-graduation-cap text-gray-400 w-4 mr-2 text-center"></i>
                              <span class="truncate">{{ doctor.qualification }}</span>
                            </div>
                            <div v-if="doctor.hospital" class="flex items-center">
                              <i class="fas fa-hospital text-gray-400 w-4 mr-2 text-center"></i>
                              <span class="truncate">{{ doctor.hospital }}</span>
                            </div>
                          </div>
                          
                          <div v-if="doctor.languages && doctor.languages.length" class="mt-2 flex flex-wrap gap-1">
                            <span v-for="(lang, index) in doctor.languages.slice(0, 2)" :key="index" 
                                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {{ lang }}
                            </span>
                            <span v-if="doctor.languages.length > 2" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              +{{ doctor.languages.length - 2 }} more
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Action Buttons -->
                      <div class="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <button @click="openDoctorProfileModal(doctor)" 
                                class="text-sm font-medium text-medical-primary hover:text-medical-secondary transition-colors">
                          <i class="fas fa-eye mr-1"></i> View Profile
                        </button>
                        <button @click="bookAppointment(doctor)" 
                                class="bg-gradient-to-r from-medical-primary to-medical-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Load More Button -->
              <div v-if="hasMoreDoctors" class="flex justify-center mt-6">
                <button @click="loadMoreDoctors" class="bg-medical-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Load More ({{ filteredDoctors.length - visibleDoctorsCount }} more)
                </button>
              </div>
              
              <!-- End of doctors list message -->
              <div v-else-if="filteredDoctors.length > 0" class="text-center py-4 text-gray-500 text-sm">
                You've reached the end of the list
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section ref="servicesSection" v-if="showLearnMore && !showSmartDoctorSection" class="section bg-slate-50" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-3 sm:px-4">
          <div class="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-4">
            <div class="text-center md:text-left mb-4 md:mb-0">
              <h2 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-900 mb-2">Our Services</h2>
              <p class="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600">Comprehensive healthcare for your needs.</p>
            </div>
          </div>

          <div class="overflow-hidden">
            <div ref="servicesContainer" class="flex space-x-4 sm:space-x-8 overflow-x-auto pt-6 sm:pt-8 pb-4 px-2 sm:px-4 scrollbar-hide snap-x snap-mandatory">
              <div
                v-for="(service, index) in services"
                :key="service.id"
                :data-index="index"
                @click="scrollToServicesStep(index)"
                class="flex-shrink-0 w-[85vw] sm:w-80 card transition-all duration-500 snap-center border-2 cursor-pointer"
                :class="servicesIndex === index ? 'transform scale-105 shadow-xl border-medical-primary' : 'border-transparent opacity-80'">
                <div class="card-body text-center p-4 sm:p-6">
                  <div class="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 service-container">
                    <!-- Test both approaches -->
                    <div class="text-2xl sm:text-3xl lg:text-4xl">
                      <!-- Emoji (should always work) -->
                      <span v-if="service.emoji">{{ service.emoji }}</span>
                      <!-- Font Awesome (if emoji doesn't exist) -->
                      <i v-else :class="service.icon" class="fas" style="font-size: 2rem; font-weight: 900;"></i>
                      <!-- Text fallback -->
                      <span v-if="!service.emoji && !service.icon" class="text-lg sm:text-xl font-bold">{{ service.title.charAt(0) }}</span>
                    </div>
                  </div>
                  <h3 class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold leading-tight text-gray-900 mb-2 sm:mb-3">{{ service.title }}</h3>
                  <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{{ service.description }}</p>
                  <ul class="text-left space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <i class="fas fa-check text-green-500 text-xs"></i>
                      {{ feature }}
                    </li>
                  </ul>
                  <!-- Read More Button -->
                  <button @click="viewServiceDetails(service)" class="text-medical-primary font-medium flex items-center group justify-center w-full touch-button">
                    <span class="text-xs sm:text-sm">Read More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex-shrink-0 w-[85vw] sm:w-80 snap-center flex items-center justify-center p-4 sm:p-6">
                <button @click="navigateToServices" class="w-full h-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-medical-primary hover:bg-blue-50 text-medical-primary transition-all duration-300 touch-button min-h-[200px] sm:min-h-[250px]">
                    <i class="fas fa-th-large text-2xl sm:text-4xl mb-3 sm:mb-4"></i>
                    <span class="text-lg sm:text-xl font-bold">View All Services</span>
                    <p class="text-xs sm:text-sm text-gray-600 mt-1">Explore our full range of offerings.</p>
                </button>
              </div>
            </div>
          </div>
          <!-- Dots for Services -->
          <div class="flex justify-center mt-4 space-x-1 sm:space-x-2">
            <button
              v-for="(service, index) in services"
              :key="`service-dot-${index}`"
              @click="scrollToServicesStep(index)"
              class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 dot-indicator"
              :class="servicesIndex === index ? 'bg-medical-primary dot-active' : 'bg-gray-300 hover:bg-gray-400'"
              :aria-label="`Go to service ${index + 1}`"
            ></button>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section ref="howItWorksSection" v-if="showLearnMore && !showSmartDoctorSection" class="section bg-white" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="heading-2 text-gray-900 mb-4">{{ howItWorks[howItWorksView].title }}</h2>
            <p class="text-large text-gray-600">Simple steps to get started on our platform</p>
            
            <!-- Toggle Buttons -->
            <div class="mt-6 inline-flex rounded-lg shadow-sm">
              <button @click="howItWorksView = 'patient'" :class="['px-6 py-2 rounded-l-lg border border-gray-300 transition-colors', howItWorksView === 'patient' ? 'bg-medical-primary text-white border-medical-primary' : 'bg-white text-gray-700 hover:bg-gray-50']">
                <span class="mr-2">🏥</span> For Patients
              </button>
              <button @click="howItWorksView = 'doctor'" :class="['px-6 py-2 rounded-r-lg border border-gray-300 -ml-px transition-colors', howItWorksView === 'doctor' ? 'bg-medical-primary text-white border-medical-primary' : 'bg-white text-gray-700 hover:bg-gray-50']">
                <span class="mr-2">👨‍⚕️</span> For Doctors
              </button>
            </div>
          </div>

          <div class="overflow-hidden">
            <div ref="howItWorksContainer" class="flex space-x-8 overflow-x-auto pt-8 pb-4 px-4 scrollbar-hide snap-x snap-mandatory">
              <div
                v-for="(step, index) in howItWorks[howItWorksView].steps"
                :key="step.id"
                :data-index="index"
                @click="scrollToHowItWorksStep(index)"
                class="flex-shrink-0 w-80 text-center snap-center p-6 rounded-2xl transition-all duration-500 border-2 cursor-pointer"
                :class="howItWorksIndex === index ? 'bg-white transform scale-105 shadow-xl border-medical-primary' : 'bg-gray-50 border-transparent'">
                <div class="relative mb-6">
                  <div class="w-24 h-24 mx-auto bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 shadow-lg">
                    <!-- Test both approaches - same as services section -->
                    <div style="font-size: 3rem; line-height: 1;">
                      <!-- Emoji (should always work) -->
                      <span v-if="step.emoji">{{ step.emoji }}</span>
                      <!-- Font Awesome (if emoji doesn't exist) -->
                      <i v-else :class="step.icon" class="fas" style="font-size: 3rem; font-weight: 900;"></i>
                      <!-- Text fallback -->
                      <span v-if="!step.emoji && !step.icon" style="font-size: 1.5rem; font-weight: bold;">{{ step.title.charAt(0) }}</span>
                    </div>
                  </div>
                </div>
                <h3 class="heading-3 text-gray-900 mb-3">{{ step.title }}</h3>
                <p class="text-gray-600">{{ step.description }}</p>
              </div>
            </div>
          </div>
          <!-- Dots for How It Works -->
          <div class="flex justify-center mt-4 space-x-1 sm:space-x-2">
            <button
              v-for="(step, index) in howItWorks[howItWorksView].steps"
              :key="`howitworks-dot-${index}`"
              @click="scrollToHowItWorksStep(index)"
              class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 dot-indicator"
              :class="howItWorksIndex === index ? 'bg-medical-primary dot-active' : 'bg-gray-300 hover:bg-gray-400'"
              :aria-label="`Go to step ${index + 1}`"
            ></button>
          </div>
        </div>
      </section>

      <!-- Health Tips Section -->
      <section ref="healthTipsSection" class="section bg-emerald-50" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center mb-8">
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
            <div ref="healthTipsContainer" class="flex space-x-8 overflow-x-auto pt-8 pb-4 px-4 scrollbar-hide snap-x snap-mandatory">
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
          </div>
          <!-- Dots for Health Tips -->
          <div class="flex justify-center mt-4 space-x-1 sm:space-x-2">
            <button
              v-for="(tip, index) in healthTips"
              :key="`healthtip-dot-${index}`"
              @click="scrollToHealthTipsStep(index)"
              class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 dot-indicator"
              :class="healthTipsIndex === index ? 'bg-medical-primary dot-active' : 'bg-gray-300 hover:bg-gray-400'"
              :aria-label="`Go to health tip ${index + 1}`"
            ></button>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section ref="testimonialsSection" class="section bg-gradient-to-br from-red-500" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="heading-2 text-white mb-4">Patient & Doctor Stories</h2>
            <p class="text-large text-red-100">Real experiences from our community</p>
          </div>

          <div class="overflow-hidden">
            <div ref="allTestimonialsContainer" class="flex space-x-8 overflow-x-auto pt-8 pb-4 px-4 scrollbar-hide snap-x snap-mandatory">
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
              <div class="flex-shrink-0 w-[90vw] sm:w-96 snap-center flex items-center justify-center p-6">
                <button @click="navigateToTestimonials" class="w-full h-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-red-500 hover:bg-red-50 text-red-500 transition-all duration-300">
                    <i class="fas fa-comments text-4xl mb-4"></i>
                    <span class="text-xl font-bold">View All Stories</span>
                    <p class="text-sm text-gray-600 mt-1">Read more from our community.</p>
                </button>
              </div>
            </div>
          </div>
          <!-- Dots for Testimonials -->
          <div class="flex justify-center mt-4 space-x-1 sm:space-x-2">
            <button
              v-for="(story, index) in allTestimonials"
              :key="`testimonial-dot-${index}`"
              @click="scrollToTestimonialsStep(index)"
              class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 dot-indicator"
              :class="testimonialsIndex === index ? 'bg-white dot-active' : 'bg-red-200 hover:bg-red-300'"
              :aria-label="`Go to story ${index + 1}`"
            ></button>
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

    <!-- Service Detail Modal -->
    <div v-if="selectedService" class="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50" @click.self="closeServiceModal">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          @click="closeServiceModal"
          class="fixed sm:absolute top-4 right-4 bg-white/80 hover:bg-gray-100 rounded-full p-2 shadow-lg text-gray-700 hover:text-gray-900 z-10"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Service Icon Header -->
        <div class="bg-gradient-to-br from-medical-primary to-medical-secondary p-8 text-center text-white">
          <div class="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div style="font-size: 3rem; line-height: 1;">
              <span v-if="selectedService.emoji">{{ selectedService.emoji }}</span>
              <i v-else-if="selectedService.icon" :class="selectedService.icon" class="fas" style="font-size: 3rem; font-weight: 900; color: white;"></i>
              <span v-else style="font-size: 2rem; font-weight: bold;">{{ selectedService.title.charAt(0) }}</span>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">{{ selectedService.title }}</h2>
          <p class="text-blue-100">{{ selectedService.description }}</p>
        </div>
        
        <div class="p-6">
          <!-- Key Features -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-900 mb-4 text-lg">Key Features & Benefits</h3>
            <div class="grid md:grid-cols-2 gap-3">
              <div v-for="feature in selectedService.features" :key="feature" class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fas fa-check text-green-600 text-xs"></i>
                </div>
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>
          
          <!-- How It Works -->
          <div class="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 class="font-semibold text-blue-800 mb-4">How It Works</h3>
            <div class="space-y-3">
              <div v-for="(step, index) in getServiceSteps(selectedService)" :key="index" class="flex items-start gap-3">
                <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  {{ index + 1 }}
                </div>
                <span class="text-blue-800">{{ step }}</span>
              </div>
            </div>
          </div>
          
          <!-- Detailed Description -->
          <div class="prose max-w-none text-gray-600 mb-6">
            <p>{{ getServiceDetailedDescription(selectedService) }}</p>
          </div>
          
          <div class="flex justify-between items-center">
            <button 
              @click="closeServiceModal"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Close
            </button>
            <div class="flex gap-3">
              <button 
                @click="navigateToServices"
                class="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                View All Services
              </button>
              <button 
                @click="getStartedWithService(selectedService)"
                class="px-6 py-2.5 bg-medical-primary text-white rounded-lg hover:bg-medical-secondary transition-colors duration-200 font-medium"
              >
                Get Started
              </button>
            </div>
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
import config from '@/config/api';
import ChatButton from '@/components/ChatButton.vue';
import FloatingActionButton from '@/components/ui/FloatingActionButton.vue';
import axios from 'axios';

export default {
  name: 'DoctorHome',
  components: { AppHeader, AppFooter, ChatButton, FloatingActionButton },
  data() {
    return {
      selectedTip: null,
      selectedService: null,
      loadingDoctorProfile: false,
      selectedDoctorProfile: null,
      loadingDoctors: false,
      loadingAllDoctors: false,
      allDoctors: [],
      displayedDoctors: [],
      visibleDoctorsCount: 3,
      searchQuery: '',
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
      ],
      
      howItWorks: {
        patient: {
          title: 'How It Works for Patients',
          description: 'Simple steps to get the care you need, anytime, anywhere.',
          steps: [
            { id: 1, icon: 'fas fa-user-plus', emoji: '👤', title: 'Sign Up', description: 'Create your secure account and complete your medical profile in minutes.' },
            { id: 2, icon: 'fas fa-search', emoji: '🔍', title: 'Find Your Doctor', description: 'Browse our network of certified doctors and choose the right one for you.' },
            { id: 3, icon: 'fas fa-video', emoji: '📹', title: 'Start Consultation', description: 'Begin your video consultation and get the expert care you need instantly.' }
          ]
        },
        doctor: {
          title: 'How It Works for Doctors',
          description: 'Join our network to expand your practice and connect with patients.',
          steps: [
            { id: 1, icon: 'fas fa-id-card', emoji: '🆔', title: 'Register & Verify', description: 'Join our platform by completing a simple registration and verification process.' },
            { id: 2, icon: 'fas fa-calendar-alt', emoji: '📅', title: 'Set Your Schedule', description: 'Manage your availability and appointments with our flexible scheduling tools.' },
            { id: 3, icon: 'fas fa-laptop-medical', emoji: '💻', title: 'Conduct Consultations', description: 'Provide high-quality care to patients through secure video calls.' }
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
      let filtered = [...this.allDoctors];
      
      // Filter by specialty
      if (this.currentSpecialty !== 'All') {
        filtered = filtered.filter(doctor => doctor.specialty === this.currentSpecialty);
      }
      
      // Filter by search query (name or specialty)
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(doctor => 
          (doctor.full_name && doctor.full_name.toLowerCase().includes(query)) ||
          (doctor.specialty && doctor.specialty.toLowerCase().includes(query))
        );
      }
      
      return filtered;
    },
    
    displayedFilteredDoctors() {
      return this.filteredDoctors.slice(0, this.visibleDoctorsCount);
    },
    
    hasMoreDoctors() {
      return this.visibleDoctorsCount < this.filteredDoctors.length;
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
        const response = await axios.get(`${config.baseURL}/api/patient/doctors?doctor_id=${doctor.id}`);
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
    
    loadMoreDoctors() {
      this.visibleDoctorsCount += 3;
    },
    
    resetPagination() {
      this.visibleDoctorsCount = 3;
    },
    
    handleSearch() {
      this.resetPagination();
    },
    
    handleSpecialtyChange() {
      this.resetPagination();
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
      // Reset body overflow in case a modal was open
      document.body.style.overflow = '';
      this.$router.push('/services');
    },
    
    // Service modal methods
    viewServiceDetails(service) {
      this.selectedService = { ...service };
      document.body.style.overflow = 'hidden';
    },
    
    closeServiceModal() {
      this.selectedService = null;
      document.body.style.overflow = '';
    },
    
    getServiceSteps(service) {
      const steps = {
        'Doctor Appointments': [
          'Select your preferred doctor and specialty',
          'Choose your appointment time and type',
          'Complete booking with secure payment',
          'Receive confirmation and reminders'
        ],
        'Video Consultations': [
          'Book your video consultation',
          'Join the secure video call at scheduled time',
          'Discuss your health concerns with the doctor',
          'Receive digital prescription and advice'
        ],
        'E-Prescriptions': [
          'Complete your consultation with doctor',
          'Receive instant digital prescription',
          'Download or share prescription easily',
          'Order medicines through our pharmacy partners'
        ],
        'Digital Health Records': [
          'Your health data is automatically stored',
          'Access records anytime through the app',
          'Share records with doctors securely',
          'Keep track of your health history'
        ],
        'Specialist Doctors': [
          'Browse specialists by category',
          'Read doctor profiles and reviews',
          'Book appointment with your chosen specialist',
          'Get expert care for your specific condition'
        ],
        'Mental Health Support': [
          'Book session with licensed therapist',
          'Join confidential video consultation',
          'Discuss your concerns in safe environment',
          'Get ongoing support and treatment plan'
        ],
        '24/7 Availability': [
          'Access doctors anytime, day or night',
          'Emergency consultations available instantly',
          'No waiting for clinic hours',
          'Get immediate medical advice'
        ],
        'Lab Tests & Diagnostics': [
          'Browse and book required tests online',
          'Schedule home collection if available',
          'Get tested at partner labs',
          'Receive digital reports instantly'
        ],
        'Medicine Ordering': [
          'Upload prescription from consultation',
          'Browse medicines from partner pharmacies',
          'Place order with home delivery',
          'Track your order status'
        ],
        'Insurance & Payments': [
          'Add your insurance details to profile',
          'Check coverage for treatments',
          'Pay securely through multiple options',
          'Get transparent billing and receipts'
        ]
      };
      return steps[service.title] || ['Step 1', 'Step 2', 'Step 3'];
    },
    
    getServiceDetailedDescription(service) {
      const descriptions = {
        'Doctor Appointments': 'Our comprehensive appointment system allows you to book both in-clinic and online consultations with certified doctors. Skip the waiting rooms and get instant access to quality healthcare.',
        'Video Consultations': 'Connect with licensed doctors through secure, HD video calls from anywhere. Our telemedicine platform ensures patient privacy while providing convenient access to healthcare.',
        'E-Prescriptions': 'Receive digital prescriptions instantly after consultations. Our paperless system makes it easy to store, share, and access your prescriptions whenever needed.',
        'Digital Health Records': 'Securely store all your medical records, test results, and prescriptions in one place. Access your complete health history anytime and share with healthcare providers.',
        'Specialist Doctors': 'Access a network of 30+ medical specialties including cardiology, dermatology, pediatrics, and more. Find the right expert for your specific health needs.',
        'Mental Health Support': 'Professional counseling and therapy services with licensed mental health professionals. Get confidential support in a safe, judgment-free environment.',
        '24/7 Availability': 'Round-the-clock access to healthcare professionals for emergencies and urgent consultations. Your health emergencies don\'t wait for business hours.',
        'Lab Tests & Diagnostics': 'Book blood tests, imaging, and other diagnostic services online. Many tests offer convenient home sample collection with fast, accurate results.',
        'Medicine Ordering': 'Order prescribed medications through our partner pharmacy network. Enjoy doorstep delivery and easy tracking of your medicine orders.',
        'Insurance & Payments': 'Seamless integration with major insurance providers and secure payment processing. Transparent billing with multiple payment options for your convenience.'
      };
      return descriptions[service.title] || 'This service provides comprehensive healthcare solutions tailored to your needs.';
    },
    
    getStartedWithService(service) {
      // Route to specific service pages or general services page
      const routes = {
        'Doctor Appointments': '/patient-login',
        'Video Consultations': '/patient-login',
        'E-Prescriptions': '/patient-login',
        'Digital Health Records': '/patient-login',
        'Specialist Doctors': '/services',
        'Mental Health Support': '/services',
        '24/7 Availability': '/patient-login',
        'Lab Tests & Diagnostics': '/services',
        'Medicine Ordering': '/services',
        'Insurance & Payments': '/patient-login'
      };
      
      this.closeServiceModal();
      this.$router.push(routes[service.title] || '/services');
    },
    
    navigateToTestimonials() {
      this.$router.push('/testimonials');
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
      this.$router.push({ name: 'DoctorsList' });
    },
    async fetchAllDoctors() {
      this.loadingAllDoctors = true;
      try {
        const response = await axios.get(`${config.baseURL}/api/patient/doctors`);
        if (response.data && response.data.doctors) {
          this.allDoctors = response.data.doctors;
          const specialties = [...new Set(response.data.doctors.map(d => d.specialty).filter(Boolean))];
          this.availableSpecialties = ['All', ...specialties];
          this.resetPagination();
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
        const response = await axios.get(`${config.baseURL}/api/patient/doctors`);

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
    
    // Reset body overflow when leaving the page
    document.body.style.overflow = '';
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
  width: 48px;
  height: 48px;
  fill: currentColor;
  display: block;
}

.service-icon-fallback {
  font-size: 3rem !important;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900 !important;
}

/* Ensure Font Awesome icons are visible */
.fas, .far, .fab {
  font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands" !important;
  font-weight: 900 !important;
  font-style: normal !important;
}

/* Service container icon styling */
.service-container i {
  font-size: 3rem !important;
  font-family: "Font Awesome 6 Free" !important;
  font-weight: 900 !important;
  display: inline-block !important;
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

/* Responsive Navigation Dots */
.dot-indicator {
  min-width: 8px;
  min-height: 8px;
  cursor: pointer;
  position: relative;
}

.dot-active {
  transform: scale(1.2);
}

/* Mobile-specific dot adjustments */
@media (max-width: 640px) {
  .dot-indicator {
    min-width: 6px;
    min-height: 6px;
  }
  
  .dot-active {
    transform: scale(1.15);
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .dot-indicator {
    min-width: 5px;
    min-height: 5px;
  }
  
  .dot-active {
    transform: scale(1.1);
  }
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