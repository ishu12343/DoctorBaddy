<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    
    <main class="flex-grow py-8 sm:py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-medical-primary to-medical-secondary text-white py-8 sm:py-12 mb-2">
        <div class="container mx-auto px-4 sm:px-6">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-2xl sm:text-4xl font-bold mb-3">Find the Right Doctor for You</h1>
            <p class="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
              Browse our network of experienced healthcare professionals and book appointments instantly.
            </p>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 sm:px-6">
        <!-- Search and Filter Bar -->
        <div class="bg-white rounded-xl shadow-sm p-4 mb-3">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Search Input -->
            <div class="flex-1">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by name, specialty, or condition..."
                  class="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
                >
                <i class="fas fa-search absolute left-3 top-3.5 text-gray-500"></i>
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Reset search"
                >
                  <i class="fas fa-times-circle"></i>
                </button>
              </div>
            </div>
            
            <!-- Specialty Filter -->
            <div class="w-full md:w-64">
              <div class="relative">
                <select 
                  v-model="currentSpecialty"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent appearance-none bg-white text-gray-800"
                >
                  <option v-for="specialty in availableSpecialties" :key="specialty" :value="specialty" class="text-gray-800">
                    {{ specialty === 'All' ? 'All Specialties' : specialty }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                  <i class="fas fa-chevron-down text-sm"></i>
                </div>
              </div>
            </div>
            
            <!-- Sort By -->
            <div class="w-full md:w-48">
              <div class="relative">
                <select 
                  v-model="sortBy"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent appearance-none bg-white text-gray-800"
                >
                  <option value="recommended" class="text-gray-800">Recommended</option>
                  <option value="rating" class="text-gray-800">Highest Rated</option>
                  <option value="experience" class="text-gray-800">Most Experienced</option>
                  <option value="availability" class="text-gray-800">Earliest Available</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                  <i class="fas fa-sort text-sm"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Filter Toggle -->
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="md:hidden flex items-center justify-center w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
        >
          <i class="fas fa-filter mr-2 text-medical-primary"></i>
          {{ showMobileFilters ? 'Hide Filters' : 'Show Filters' }}
        </button>

        <div class="flex flex-col md:flex-row gap-6">
          <!-- Sidebar Filters - Hidden on mobile -->
          <div 
            :class="['md:w-64 flex-shrink-0 transition-all duration-300', 
                   showMobileFilters ? 'block' : 'hidden md:block']"
          >
            <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
              <h3 class="font-semibold text-gray-800 mb-3">Filter by</h3>
              
              <!-- Availability Filter -->
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Availability</h4>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" v-model="filters.availableNow" class="rounded text-medical-primary">
                    <span class="ml-2 text-sm text-gray-700">Available Now</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="filters.videoConsult" class="rounded text-medical-primary">
                    <span class="ml-2 text-sm text-gray-700">Video Consult</span>
                  </label>
                </div>
              </div>
              
              <!-- Rating Filter -->
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Rating</h4>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="radio" v-model="filters.rating" value="4" class="rounded-full text-medical-primary">
                    <span class="ml-2 text-sm text-gray-700">4.0+</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" v-model="filters.rating" value="4.5" class="rounded-full text-medical-primary">
                    <span class="ml-2 text-sm text-gray-700">4.5+</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" v-model="filters.rating" value="5" class="rounded-full text-medical-primary">
                    <span class="ml-2 text-sm text-gray-700">5.0 Only</span>
                  </label>
                </div>
              </div>
              
              <!-- Experience Filter -->
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Experience</h4>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="radio" v-model="filters.experience" value="5" class="rounded-full text-medical-primary">
                    <span class="ml-2 text-sm text-gray-700">5+ years</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" v-model="filters.experience" value="10" class="rounded-full text-medical-primary">
                    <span class="ml-2 text-sm text-gray-700">10+ years</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" v-model="filters.experience" value="20" class="rounded-full text-medical-primary">
                    <span class="ml-2 text-sm text-gray-700">20+ years</span>
                  </label>
                </div>
              </div>
              
              <!-- Reset Filters Button -->
              <button 
                @click="resetFilters"
                class="w-full mt-4 px-4 py-2 text-sm font-medium text-medical-primary border border-medical-primary rounded-lg hover:bg-blue-50 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
            
            <!-- Mobile Apply Button -->
            <button 
              v-if="showMobileFilters"
              @click="showMobileFilters = false"
              class="w-full md:hidden px-4 py-3 bg-medical-primary text-white font-medium rounded-lg hover:bg-medical-secondary transition-colors"
            >
              Apply Filters
            </button>
          </div>
          
          <!-- Main Content -->
          <div class="flex-1">
            <!-- Results Summary -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div class="mb-3 sm:mb-0">
                <h2 class="text-xl font-bold text-gray-900">
                  {{ filteredDoctors.length }} Doctor{{ filteredDoctors.length !== 1 ? 's' : '' }} Found
                </h2>
                <p v-if="searchQuery || currentSpecialty !== 'All'" class="text-sm text-gray-500 mt-1">
                  <span v-if="searchQuery">Search: "{{ searchQuery }}"</span>
                  <span v-if="currentSpecialty !== 'All'">{{ searchQuery ? ' • ' : '' }}Specialty: {{ currentSpecialty }}</span>
                </p>
              </div>
              <div class="w-full sm:w-auto">
                <div class="relative">
                  <select 
                    v-model="resultsPerPage"
                    class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent appearance-none bg-white text-sm"
                  >
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <i class="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-primary"></div>
            </div>
            
            <!-- No Results -->
            <div v-else-if="filteredDoctors.length === 0" class="bg-white rounded-xl shadow-sm p-8 text-center">
              <div class="text-5xl mb-4 text-gray-300">
                <i class="fas fa-user-md"></i>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p class="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button 
                @click="resetFilters"
                class="px-4 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-secondary transition-colors"
              >
                Reset Filters
              </button>
            </div>
            
            <!-- Doctors List -->
            <div v-else class="space-y-4">
              <div 
                v-for="doctor in paginatedDoctors" 
                :key="doctor.id"
                class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-medical-primary/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="p-4">
                  <!-- Top Row: Photo, Name, Rating, View Button -->
                  <div class="flex items-center gap-4 mb-4">
                    <!-- Doctor Avatar -->
                    <div class="flex-shrink-0 relative">
                      <img 
                        v-if="doctor.profile_photo" 
                        :src="doctor.profile_photo" 
                        :alt="doctor.full_name"
                        class="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg ring-2 ring-gray-100"
                        onerror="this.onerror=null; this.src='https://via.placeholder.com/64?text=DR'"
                      />
                      <div v-else class="w-16 h-16 rounded-full bg-gradient-to-br from-medical-primary to-medical-secondary flex items-center justify-center shadow-lg ring-2 ring-gray-100">
                        <span class="text-xl font-bold text-white">{{ getInitials(doctor.full_name) }}</span>
                      </div>
                      <!-- Online Status Indicator -->
                      <div v-if="doctor.available" class="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full w-4 h-4 border-2 border-white shadow-sm flex items-center justify-center">
                        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <!-- Doctor Name and Info -->
                    <div class="flex-1 min-w-0">
                      <!-- Doctor Name and View Button Side by Side -->
                      <div class="flex items-center gap-2 mb-1">
                        <h3 class="text-base sm:text-lg font-bold text-gray-900 truncate leading-tight flex-1">{{ doctor.full_name }}</h3>
                        <button 
                          @click="viewDoctorProfile(doctor)" 
                          class="flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 text-medical-primary px-1.5 py-1 rounded-md text-xs font-semibold transition-all duration-200 hover:shadow-sm transform hover:scale-105 flex items-center"
                        >
                          <i class="fas fa-eye text-xs"></i>
                        </button>
                      </div>
                      <!-- Specialty -->
                      <div class="mb-1">
                        <p class="text-xs sm:text-sm text-medical-secondary font-semibold truncate">{{ doctor.specialty || 'General Practitioner' }}</p>
                      </div>
                      <!-- Rating Row -->
                      <div class="flex flex-col sm:flex-row sm:items-center mt-1 gap-1">
                        <!-- Rating and Total Reviews -->
                        <div class="flex items-center flex-wrap">
                          <div v-if="doctor.average_rating" class="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-2 py-1 rounded-lg border border-yellow-200">
                            <div class="flex items-center mr-1">
                              <i v-for="star in Math.min(5, Math.round(doctor.average_rating))" :key="star" class="fas fa-star text-yellow-500 text-xs"></i>
                              <i v-for="star in (5 - Math.min(5, Math.round(doctor.average_rating)))" :key="star + 'empty'" class="far fa-star text-yellow-300 text-xs"></i>
                            </div>
                            <span class="text-yellow-700 text-xs font-bold ml-0.5">{{ doctor.average_rating.toFixed(1) }}</span>
                            <span class="text-yellow-600 text-xs ml-1">({{ doctor.review_count || doctor.total_reviews || 0 }} reviews)</span>
                          </div>
                          <div v-else class="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                            <div class="flex items-center mr-1">
                              <i v-for="star in 5" :key="star" class="far fa-star text-gray-300 text-xs"></i>
                            </div>
                            <span class="text-gray-500 text-xs font-medium">New</span>
                          </div>
                        </div>
                        <!-- Available Days/Time -->
                        <div v-if="doctor.available_days && doctor.available_from && doctor.available_to" class="flex items-center text-xs text-gray-600 bg-blue-50 rounded px-2 py-1 mt-1 sm:mt-0 sm:ml-2">
                          <i class="far fa-calendar text-medical-primary mr-1"></i>
                          <span class="truncate">{{ doctor.available_days }} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Doctor Details -->
                  <div class="space-y-2 mb-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      <!-- Experience -->
                      <div class="flex items-center">
                        <div class="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <i class="fas fa-briefcase text-blue-600 text-xs"></i>
                        </div>
                        <span class="truncate">{{ doctor.experience || '5' }}+ years exp</span>
                      </div>
                      
                      <!-- Hospital/Clinic -->
                      <div v-if="doctor.hospital" class="flex items-center">
                        <div class="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <i class="fas fa-hospital text-green-600 text-xs"></i>
                        </div>
                        <span class="truncate">{{ doctor.hospital }}</span>
                      </div>
                      
                      <!-- Qualification -->
                      <div v-if="doctor.qualification" class="flex items-center sm:col-span-2">
                        <div class="w-6 h-6 bg-purple-50 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <i class="fas fa-graduation-cap text-purple-600 text-xs"></i>
                        </div>
                        <span class="truncate">{{ doctor.qualification }}</span>
                      </div>
                    </div>
                    
                    <!-- Languages -->
                    <div v-if="doctor.languages && doctor.languages.length" class="flex items-center flex-wrap gap-1">
                      <div class="w-6 h-6 bg-orange-50 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                        <i class="fas fa-language text-orange-600 text-xs"></i>
                      </div>
                      <div class="flex flex-wrap gap-1">
                        <span v-for="(lang, index) in doctor.languages.slice(0, 3)" :key="index" 
                              class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
                          {{ lang }}
                        </span>
                        <span v-if="doctor.languages.length > 3" 
                              class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600">
                          +{{ doctor.languages.length - 3 }}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Bottom Section: Availability & Book Button -->
                  <div class="border-t border-gray-100 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <!-- Availability Status -->
                    <div class="flex items-center text-sm">
                      <div class="w-6 h-6 rounded-lg flex items-center justify-center mr-2 flex-shrink-0"
                           :class="doctor.available ? 'bg-green-50' : 'bg-orange-50'">
                        <i class="fas fa-clock text-xs" 
                           :class="doctor.available ? 'text-green-600' : 'text-orange-600'"></i>
                      </div>
                      <span :class="doctor.available ? 'text-green-700 font-medium' : 'text-orange-700'">
                        {{ doctor.available ? 'Available Now' : 'Availability: ' + (doctor.next_available || 'Time') }}
                      </span>
                        <span v-if="doctor.available_from && doctor.available_to" class="ml-2 px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold whitespace-nowrap">
                          {{ doctor.available_from }} - {{ doctor.available_to }}
                        </span>
                    </div>
                    
                    <!-- Book Appointment Button -->
                    <button 
                      @click="bookAppointment(doctor)" 
                      class="w-full sm:w-auto bg-gradient-to-r from-medical-primary to-medical-secondary hover:from-medical-secondary hover:to-medical-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-calendar-plus text-sm"></i>
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Pagination -->
              <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between mt-8 space-y-4 sm:space-y-0">
                <div class="text-sm text-gray-600">
                  Showing {{ (currentPage - 1) * resultsPerPage + 1 }} to {{ Math.min(currentPage * resultsPerPage, filteredDoctors.length) }} of {{ filteredDoctors.length }} doctors
                </div>
                <div class="flex space-x-1">
                  <button 
                    @click="currentPage--" 
                    :disabled="currentPage === 1"
                    :class="['px-3 py-1.5 rounded-lg border', 
                           currentPage === 1 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 
                           'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
                  >
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  
                  <template v-for="page in visiblePages" :key="page">
                    <button 
                      v-if="page === '...'"
                      class="px-3 py-1.5 text-gray-500"
                      disabled
                    >
                      {{ page }}
                    </button>
                    <button 
                      v-else
                      @click="currentPage = page"
                      :class="['px-3 py-1.5 rounded-lg border',
                             currentPage === page ? 'bg-medical-primary text-white border-medical-primary' : 
                             'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
                    >
                      {{ page }}
                    </button>
                  </template>
                  
                  <button 
                    @click="currentPage++" 
                    :disabled="currentPage === totalPages"
                    :class="['px-3 py-1.5 rounded-lg border', 
                           currentPage === totalPages ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 
                           'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
                  >
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Doctor Profile Modal -->
     <div v-if="selectedDoctorProfile" class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" @click.self="closeDoctorProfileModal">
       <div class="bg-gray-50 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-xl animate-fade-in" style="min-height: 300px;">
         <!-- Loading Spinner -->
         <div v-if="loadingDoctorProfile" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-20">
           <i class="fas fa-spinner fa-spin text-4xl text-medical-primary"></i>
         </div>
        
         <template v-else-if="selectedDoctorProfile.id">
           <!-- Close Button -->
           <button @click="closeDoctorProfileModal" class="absolute top-3 right-3 bg-white/50 hover:bg-white/80 rounded-full p-2 z-30 text-gray-800">
             <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
           </button>

           <!-- Modal Content -->
           <div>
             <!-- Header with Gradient -->
             <div class="bg-gradient-to-br from-medical-primary to-medical-secondary p-6 rounded-t-2xl text-white relative">
               <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                 <img v-if="selectedDoctorProfile.profile_photo" :src="selectedDoctorProfile.profile_photo" :alt="selectedDoctorProfile.full_name" class="w-24 h-24 rounded-full object-cover border-4 border-white/50 shadow-lg" />
                 <div v-else class="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center border-4 border-white/50 shadow-lg">
                   <span class="text-3xl font-bold text-white">{{ getInitials(selectedDoctorProfile.full_name) }}</span>
                 </div>
                 <div class="pt-2 text-center sm:text-left">
                   <h2 class="text-2xl font-bold">{{ selectedDoctorProfile.full_name }}</h2>
                   <p class="text-md font-semibold opacity-90">{{ selectedDoctorProfile.specialty }}</p>
                   <p class="text-sm opacity-80">{{ selectedDoctorProfile.degree }}</p>
                 </div>
               </div>
             </div>

             <!-- Details & Rating -->
             <div class="p-6">
               <div class="space-y-4">
                   <div class="grid grid-cols-[auto,1fr] items-start gap-x-3 gap-y-4 text-sm">
                       <i class="fas fa-briefcase w-5 text-center text-gray-400 mt-1"></i>
                       <div>
                           <p class="font-semibold text-gray-600">Experience</p>
                           <p class="text-gray-800">{{ selectedDoctorProfile.experience }}+ Years</p>
                       </div>

                       <i class="fas fa-language w-5 text-center text-gray-400 mt-1"></i>
                       <div>
                           <p class="font-semibold text-gray-600">Languages</p>
                           <p class="text-gray-800">{{ Array.isArray(selectedDoctorProfile.languages) ? selectedDoctorProfile.languages.join(', ') : selectedDoctorProfile.languages || 'Not specified' }}</p>
                       </div>

                       <i class="fas fa-hospital w-5 text-center text-gray-400 mt-1"></i>
                       <div>
                           <p class="font-semibold text-gray-600">Clinic/City</p>
                           <p class="text-gray-800">{{ selectedDoctorProfile.clinic_name || 'Not specified' }}{{ selectedDoctorProfile.city ? ', ' + selectedDoctorProfile.city : '' }}</p>
                       </div>

                       <i class="far fa-clock w-5 text-center text-gray-400 mt-1"></i>
                       <div class="min-w-0">
                           <p class="font-semibold text-gray-600">Availability</p>
                           <p class="text-gray-800 break-words">{{ formatAvailability(selectedDoctorProfile) }}</p>
                       </div>

                       <i class="fas fa-star w-5 text-center text-gray-400 mt-1"></i>
                       <div>
                           <p class="font-semibold text-gray-600">Rating</p>
                           <div class="flex items-center gap-2">
                               <div class="flex items-center gap-0.5"><i v-for="star in 5" :key="star" class="fas fa-star" :class="star <= Math.round(selectedDoctorProfile.average_rating || 0) ? 'text-yellow-400' : 'text-gray-300'"></i></div>
                               <span class="font-bold text-gray-800">{{ selectedDoctorProfile.average_rating > 0 ? selectedDoctorProfile.average_rating.toFixed(1) : 'New' }}</span>
                               <span class="text-gray-500">({{ selectedDoctorProfile.total_reviews || 0 }} reviews)</span>
                           </div>
                       </div>
                   </div>
               </div>
             </div>

             <!-- Footer with CTA -->
             <div class="bg-gray-100 p-4 rounded-b-2xl border-t">
               <button @click="bookAppointment(selectedDoctorProfile)" class="btn btn-primary w-full">Book Appointment</button>
             </div>
           </div>
         </template>
       </div>
     </div>
    
    <AppFooter />
    
    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-medical-primary hover:bg-gray-50 transition-colors z-40"
      aria-label="Back to top"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import axios from 'axios';
import { BASE_URL } from '@/config/api';

// Add fade-in animation for modal
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default {
  name: 'DoctorsList',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      loading: true,
      doctors: [],
      searchQuery: '',
      currentSpecialty: 'All',
      availableSpecialties: [],
      filters: {
        availability: [],
        rating: null,
        experience: null,
      },
      sortBy: 'recommended',
      showMobileFilters: false,
      currentPage: 1,
      resultsPerPage: 10,
      showBackToTop: false,
      loadingDoctorProfile: false,
      selectedDoctorProfile: null,
      allDoctors: [],
      scrollPosition: 0
    };
  },
  computed: {
    filteredDoctors() {
      let filtered = [...this.allDoctors];
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(doctor => 
          (doctor.full_name && doctor.full_name.toLowerCase().includes(query)) ||
          (doctor.specialty && doctor.specialty.toLowerCase().includes(query)) ||
          (doctor.qualification && doctor.qualification.toLowerCase().includes(query)) ||
          (doctor.hospital && doctor.hospital.toLowerCase().includes(query)) ||
          (doctor.languages && doctor.languages.some(lang => lang.toLowerCase().includes(query)))
        );
      }
      
      // Filter by specialty
      if (this.currentSpecialty !== 'All') {
        filtered = filtered.filter(doctor => doctor.specialty === this.currentSpecialty);
      }
      
      // Apply additional filters
      if (this.filters.availableNow) {
        filtered = filtered.filter(doctor => doctor.available);
      }
      
      if (this.filters.videoConsult) {
        filtered = filtered.filter(doctor => doctor.video_consultation);
      }
      
      if (this.filters.rating) {
        filtered = filtered.filter(doctor => doctor.average_rating >= parseFloat(this.filters.rating));
      }
      
      if (this.filters.experience) {
        filtered = filtered.filter(doctor => 
          parseInt(doctor.experience || 0) >= parseInt(this.filters.experience)
        );
      }
      
      // Sort results
      if (this.sortBy === 'rating') {
        filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
      } else if (this.sortBy === 'experience') {
        filtered.sort((a, b) => (parseInt(b.experience) || 0) - (parseInt(a.experience) || 0));
      } else if (this.sortBy === 'availability') {
        filtered.sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));
      }
      
      return filtered;
    },
    
    // Pagination
    totalPages() {
      return Math.ceil(this.filteredDoctors.length / this.resultsPerPage);
    },
    
    paginatedDoctors() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      const end = start + parseInt(this.resultsPerPage);
      return this.filteredDoctors.slice(start, end);
    },
    
    visiblePages() {
      const range = [];
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 1; // Number of pages to show around the current page
      
      for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
          range.push(i);
        } else if (i === current - delta - 1 || i === current + delta + 1) {
          range.push('...');
        }
      }
      
      // Remove consecutive duplicates for '...'
      return range.filter((item, index, array) => {
        return !(item === '...' && array[index - 1] === '...');
      });
    }
  },
  
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    currentSpecialty() {
      this.currentPage = 1;
    },
    resultsPerPage() {
      this.currentPage = 1;
    },
    filters: {
      handler() {
        this.currentPage = 1;
      },
      deep: true
    },
    sortBy() {
      // Reset to first page when changing sort order
      this.currentPage = 1;
    },
    $route() {
      // Reset filters when route changes
      this.resetFilters();
      this.fetchDoctors();
    }
  },
  
  created() {
    this.fetchDoctors();
  },
  
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    
    // Check for specialty in route params
    if (this.$route.query.specialty) {
      this.currentSpecialty = this.$route.query.specialty;
    }
    
    // Check for search query in route params
    if (this.$route.query.q) {
      this.searchQuery = this.$route.query.q;
    }
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  
  methods: {
    async fetchDoctors() {
      this.loading = true;
      try {
        const response = await axios.get(`${BASE_URL}/api/patient/doctors`);
        if (response.data && response.data.doctors) {
          this.allDoctors = response.data.doctors;
          
          // Extract unique specialties
          const specialties = [...new Set(
            response.data.doctors
              .map(d => d.specialty)
              .filter(Boolean)
              .sort()
          )];
          
          this.availableSpecialties = ['All', ...specialties];
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async viewDoctorProfile(doctor) {
      this.selectedDoctorProfile = {}; // Open modal shell
      this.loadingDoctorProfile = true;
      document.body.style.overflow = 'hidden';

      try {
        const response = await axios.get(`${BASE_URL}/api/patient/doctors?doctor_id=${doctor.id}`);
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
    
    bookAppointment(doctor) {
      const token = localStorage.getItem('token');
      if (token) {
        this.$router.push({
          name: 'BookAppointment',
          params: { doctorId: doctor.id }
        });
      } else {
        // Redirect to login with return URL
        this.$router.push({
          path: '/patient-login',
          query: { redirect: `/doctors/${doctor.id}/book` }
        });
      }
    },
    
    resetFilters() {
      this.searchQuery = '';
      this.currentSpecialty = 'All';
      this.sortBy = 'recommended';
      this.filters = {
        availableNow: false,
        videoConsult: false,
        rating: null,
        experience: null
      };
      this.currentPage = 1;
      this.showMobileFilters = false;
    },
    
    getInitials(name) {
      if (!name) return '';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    },
    
    handleScroll() {
      this.scrollPosition = window.scrollY;
      this.showBackToTop = this.scrollPosition > 300;
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Animation for doctor cards */
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

.doctor-card {
  animation: fadeInUp 0.3s ease-out forwards;
  opacity: 0;
}

/* Add delay for each card */
.doctor-card:nth-child(1) { animation-delay: 0.05s; }
.doctor-card:nth-child(2) { animation-delay: 0.1s; }
.doctor-card:nth-child(3) { animation-delay: 0.15s; }
.doctor-card:nth-child(4) { animation-delay: 0.2s; }
.doctor-card:nth-child(5) { animation-delay: 0.25s; }
.doctor-card:nth-child(6) { animation-delay: 0.3s; }
.doctor-card:nth-child(7) { animation-delay: 0.35s; }
.doctor-card:nth-child(8) { animation-delay: 0.4s; }
.doctor-card:nth-child(9) { animation-delay: 0.45s; }
.doctor-card:nth-child(10) { animation-delay: 0.5s; }

/* Modern card hover effects */
.bg-white:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth transitions for buttons */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Gradient hover effects for buttons */
.bg-gradient-to-r:hover {
  background-size: 110% 110%;
}

/* Mobile-first responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  /* Ensure cards don't get too narrow on mobile */
  .bg-white {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  
  /* Better button spacing on mobile */
  button {
    min-height: 44px; /* Apple's recommended touch target size */
  }
}

/* Extra small screens - custom breakpoint */
@media (max-width: 475px) {
  /* Hide text on very small screens to save space */
  .hidden.xs\:inline {
    display: none;
  }
  
  /* Make small view button even more compact on xs screens */
  .bg-gradient-to-r.from-blue-50 {
    padding: 0.25rem 0.375rem; /* More compact padding */
    min-width: 24px; /* Ensure minimum touch target */
    min-height: 24px;
  }
  
  /* Adjust star rating spacing */
  .fa-star {
    margin-right: 1px;
  }
  
  /* Ensure proper spacing between view button and name */
  .flex.items-start.gap-2 {
    gap: 0.375rem;
  }
}

/* Show text on screens 475px and above */
@media (min-width: 475px) {
  .xs\:inline {
    display: inline;
  }
  
  /* Ensure proper touch target size on larger screens */
  .bg-gradient-to-r.from-blue-50 {
    min-width: 32px;
    min-height: 32px;
  }
}

/* General button improvements for small view button */
.bg-gradient-to-r.from-blue-50 {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem; /* rounded-md */
  font-weight: 600;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.bg-gradient-to-r.from-blue-50:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Ensure doctor name doesn't get cut off */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* Pulse animation for online status */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhance focus states for accessibility */
button:focus,
input:focus,
select:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

/* Modern rating stars */
.fa-star {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

/* Card entrance animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply animation to cards */
.bg-white {
  animation: slideInUp 0.6s ease-out forwards;
}
</style>
