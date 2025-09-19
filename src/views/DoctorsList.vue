<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    
    <main class="flex-grow py-6 sm:py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-medical-primary to-medical-secondary text-white py-8 sm:py-12 mb-8">
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
        <div class="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Search Input -->
            <div class="flex-1">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by name, specialty, or condition..."
                  class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
                >
                <i class="fas fa-search absolute left-3 top-3.5 text-gray-500"></i>
              </div>
            </div>
            
            <!-- Specialty Filter -->
            <div class="w-full md:w-64">
              <div class="relative">
                <select 
                  v-model="currentSpecialty"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent appearance-none bg-white text-gray-800"
                >
                  <option value="All" class="text-gray-800">All Specialties</option>
                  <option v-for="specialty in availableSpecialties" :key="specialty" :value="specialty" class="text-gray-800">
                    {{ specialty }}
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
                class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div class="p-4 sm:p-6">
                  <div class="flex flex-col sm:flex-row">
                    <!-- Doctor Avatar -->
                    <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <div class="relative">
                        <img 
                          v-if="doctor.profile_photo" 
                          :src="doctor.profile_photo" 
                          :alt="doctor.full_name"
                          class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border-2 border-white shadow-sm"
                          onerror="this.onerror=null; this.src='https://via.placeholder.com/100?text=DR'"
                        />
                        <div v-else class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                          <span class="text-2xl font-bold text-blue-600">{{ getInitials(doctor.full_name) }}</span>
                        </div>
                        <div v-if="doctor.available" class="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 border-2 border-white"></div>
                      </div>
                    </div>
                    
                    <!-- Doctor Info -->
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div class="mb-2 sm:mb-0">
                          <h3 class="text-lg font-bold text-gray-900 truncate">{{ doctor.full_name }}</h3>
                          <p class="text-sm text-medical-secondary font-medium">{{ doctor.specialty || 'General Practitioner' }}</p>
                        </div>
                        <div class="flex items-center mb-2 sm:mb-0">
                          <div v-if="doctor.average_rating" class="flex items-center bg-yellow-50 px-2.5 py-1 rounded-full">
                            <span class="text-yellow-600 text-sm font-semibold">{{ doctor.average_rating.toFixed(1) }}</span>
                            <i class="fas fa-star text-yellow-400 ml-1 text-xs"></i>
                            <span class="text-xs text-gray-500 ml-1">({{ doctor.review_count || 0 }})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="mt-3 text-sm text-gray-600 space-y-1.5">
                        <div class="flex items-center">
                          <i class="fas fa-briefcase text-gray-400 w-4 mr-2 text-center"></i>
                          <span>{{ doctor.experience || '5' }}+ years experience</span>
                        </div>
                        <div v-if="doctor.qualification" class="flex items-center">
                          <i class="fas fa-graduation-cap text-gray-400 w-4 mr-2 text-center"></i>
                          <span class="truncate">{{ doctor.qualification }}</span>
                        </div>
                        <div v-if="doctor.hospital" class="flex items-center">
                          <i class="fas fa-hospital text-gray-400 w-4 mr-2 text-center"></i>
                          <span class="truncate">{{ doctor.hospital }}</span>
                        </div>
                        <div v-if="doctor.languages && doctor.languages.length" class="flex items-center flex-wrap gap-1 mt-1">
                          <i class="fas fa-language text-gray-400 w-4 mr-2"></i>
                          <span v-for="(lang, index) in doctor.languages.slice(0, 3)" :key="index" 
                                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {{ lang }}
                          </span>
                          <span v-if="doctor.languages.length > 3" class="text-xs text-gray-500 ml-1">
                            +{{ doctor.languages.length - 3 }} more
                          </span>
                        </div>
                      </div>
                      
                      <div class="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div class="flex items-center text-sm text-gray-600">
                          <i class="far fa-clock text-medical-primary mr-1.5"></i>
                          <span>{{ doctor.available ? 'Available Today' : 'Next Available: ' + (doctor.next_available || 'Check calendar') }}</span>
                        </div>
                        <div class="flex space-x-2 w-full sm:w-auto">
                          <button 
                            @click="viewDoctorProfile(doctor)" 
                            class="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <i class="fas fa-eye mr-1.5"></i> View Profile
                          </button>
                          <button 
                            @click="bookAppointment(doctor)" 
                            class="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-medical-primary to-medical-secondary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                          >
                            <i class="fas fa-calendar-plus mr-1.5"></i> Book Now
                          </button>
                        </div>
                      </div>
                    </div>
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
                    <dd class="sm:col-span-2 text-gray-800">{{ Array.isArray(selectedDoctorProfile.languages) ? selectedDoctorProfile.languages.join(', ') : selectedDoctorProfile.languages || 'Not specified' }}</dd>

                    <dt class="font-semibold text-gray-500">Clinic/City</dt>
                    <dd class="sm:col-span-2 text-gray-800">{{ selectedDoctorProfile.clinic_name || 'Not specified' }}{{ selectedDoctorProfile.city ? ', ' + selectedDoctorProfile.city : '' }}</dd>

                    <dt class="font-semibold text-gray-500">Availability</dt>
                    <dd class="sm:col-span-2 text-gray-800">{{ formatAvailability(selectedDoctorProfile) }}</dd>
                    
                    <dt class="font-semibold text-gray-500">Rating</dt>
                    <dd class="sm:col-span-2 flex items-center gap-2">
                        <div class="flex items-center gap-0.5">
                          <i v-for="star in 5" :key="star" class="fas fa-star" :class="star <= Math.round(selectedDoctorProfile.average_rating || 0) ? 'text-yellow-400' : 'text-gray-300'"></i>
                        </div>
                        <span class="font-bold text-gray-800">{{ selectedDoctorProfile.average_rating > 0 ? selectedDoctorProfile.average_rating.toFixed(1) : 'New' }}</span>
                    </dd>

                    <dt class="font-semibold text-gray-500">Reviewed patients</dt>
                    <dd class="sm:col-span-2 text-gray-800">{{ selectedDoctorProfile.total_reviews || 0 }} reviews</dd>
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
        const response = await axios.get('http://127.0.0.1:5000/api/patient/doctors');
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
    transform: translateY(10px);
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
</style>
