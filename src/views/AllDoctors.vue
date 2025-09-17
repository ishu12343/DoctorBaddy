<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    
    <main class="flex-1 pt-20 lg:pt-24">
      <!-- Header Section -->
      <section class="bg-gradient-to-br from-medical-primary via-medical-secondary to-blue-600 text-white section-sm">
        <div class="container text-center px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto">
            <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
              <i class="fas fa-user-md text-2xl sm:text-3xl"></i>
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4">Find Your Specialist</h1>
            <p class="text-lg lg:text-xl leading-relaxed text-blue-100">
              Browse our extensive network of expert doctors and find the right one for your needs.
            </p>
          </div>
        </div>
      </section>

      <!-- Doctors List Section -->
      <section class="section">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-5xl mx-auto">
            <!-- Filter & Search -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 mb-8 sm:mb-12 sticky top-20 z-30">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div class="sm:col-span-2">
                  <label for="specialty-filter" class="block text-sm font-medium text-gray-700 mb-1">Filter by Specialty</label>
                  <select 
                    id="specialty-filter"
                    v-model="currentSpecialty"
                    class="form-input w-full"
                  >
                    <option 
                      v-for="specialty in availableSpecialties" 
                      :key="specialty"
                      :value="specialty"
                    >
                      {{ specialty }}
                    </option>
                  </select>
                </div>
                <div>
                  <label for="doctor-search" class="block text-sm font-medium text-gray-700 mb-1">Search by Name</label>
                  <div class="relative">
                    <input 
                      id="doctor-search"
                      type="text" 
                      v-model="searchQuery"
                      placeholder="e.g., Dr. Smith"
                      class="form-input w-full pr-10"
                    />
                    <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Doctor Cards Grid -->
            <div v-if="loadingAllDoctors" class="text-center py-16">
              <i class="fas fa-spinner fa-spin text-4xl text-medical-primary"></i>
              <p class="mt-4 text-gray-600">Loading doctors...</p>
            </div>
            <div v-else-if="filteredDoctors.length === 0" class="bg-gray-100 rounded-2xl p-8 sm:p-12 text-center">
                <i class="fas fa-user-slash text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700">No Doctors Found</h3>
                <p class="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div 
                v-for="doctor in filteredDoctors" 
                :key="doctor.id"
                class="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
              >
                <div class="p-5">
                  <div class="flex items-center gap-4">
                    <div class="relative flex-shrink-0">
                      <img v-if="doctor.profile_photo" :src="doctor.profile_photo" :alt="doctor.full_name" class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
                      <div v-else class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                          <span class="text-2xl font-bold text-gray-500">{{ getInitials(doctor.full_name) }}</span>
                      </div>
                      <!-- Rating Badge -->
                      <div class="absolute -top-1 -right-1 bg-yellow-400 text-white px-2 py-1 rounded-lg shadow-md flex items-center gap-1 text-xs">
                          <i class="fas fa-star text-xs"></i>
                          <span class="font-bold">{{ doctor.average_rating > 0 ? doctor.average_rating.toFixed(1) : 'New' }}</span>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg font-bold text-gray-900 truncate">{{ doctor.full_name }}</h3>
                      <p class="text-sm text-medical-secondary font-medium">{{ doctor.specialty }}</p>
                      <p class="text-xs text-gray-500 mt-1">({{ doctor.total_reviews }} reviews)</p>
                    </div>
                  </div>

                  <div class="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-700 space-y-2">
                      <div class="flex items-center gap-3">
                          <i class="fas fa-briefcase-medical w-4 text-center text-gray-400"></i>
                          <span>{{ doctor.experience }} years of experience</span>
                      </div>
                      <div class="flex items-center gap-3" v-if="doctor.languages && doctor.languages.length">
                          <i class="fas fa-language w-4 text-center text-gray-400"></i>
                          <span class="truncate">{{ doctor.languages.join(', ') }}</span>
                      </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div class="text-center sm:text-left">
                      <p class="text-xs text-gray-500">Consultation Fee</p>
                      <span class="text-xl font-bold text-medical-primary">${{ doctor.consultation_fee || 'N/A' }}</span>
                    </div>
                    <button @click="bookAppointment(doctor)" class="btn btn-primary w-full sm:w-auto">
                          Book Now
                    </button>
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
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import axios from 'axios';

export default {
  name: 'AllDoctors',
  components: { AppHeader, AppFooter },
  data() {
    return {
      loadingAllDoctors: false,
      allDoctors: [],
      currentSpecialty: 'All',
      availableSpecialties: ['All'],
      searchQuery: '',
    };
  },
  computed: {
    filteredDoctors() {
      let doctors = this.allDoctors;

      // Filter by specialty
      if (this.currentSpecialty !== 'All') {
        doctors = doctors.filter(doctor => doctor.specialty === this.currentSpecialty);
      }

      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        doctors = doctors.filter(doctor => 
          (doctor.full_name && doctor.full_name.toLowerCase().includes(query)) ||
          (doctor.specialty && doctor.specialty.toLowerCase().includes(query))
        );
      }

      return doctors;
    },
  },
  methods: {
    async fetchAllDoctors() {
      this.loadingAllDoctors = true;
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/patient/doctors');
        if (response.data && response.data.doctors) {
          this.allDoctors = response.data.doctors;
          const specialties = [...new Set(response.data.doctors.map(d => d.specialty).filter(Boolean))];
          this.availableSpecialties = ['All', ...specialties.sort()];
        }
      } catch (error) {
        console.error('Error fetching all doctors:', error);
        this.allDoctors = [];
      } finally {
        this.loadingAllDoctors = false;
      }
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
  },
  mounted() {
    this.fetchAllDoctors();
  },
};
</script>

<style scoped>
/* Add any page-specific styles here */
.form-input {
  @apply block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-primary focus:border-transparent sm:text-sm transition-all duration-200;
}
</style>