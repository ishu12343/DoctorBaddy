<template>
  <div class="doctors-list px-2 sm:px-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Doctors Management</h2>
      <div class="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div class="relative w-full sm:w-48 md:w-64">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search doctors..."
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent text-sm sm:text-base"
          >
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <button 
          @click="showFilters = !showFilters"
          class="w-full sm:w-auto px-4 py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 text-sm sm:text-base"
        >
          <i class="fas fa-filter"></i>
          <span class="whitespace-nowrap">{{ showFilters ? 'Hide' : 'Show' }} Filters</span>
        </button>
      </div>
    </div>

    <!-- Filters Panel -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showFilters" class="bg-white p-4 rounded-lg shadow-md mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="filters.status" class="w-full p-2 border rounded text-sm sm:text-base">
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <select v-model="filters.specialty" class="w-full p-2 border rounded text-sm sm:text-base">
              <option value="">All Specialties</option>
              <option v-for="spec in specialties" :key="spec" :value="spec">
                {{ spec }}
              </option>
            </select>
          </div>
          <div class="flex items-end sm:col-span-2 md:col-span-1">
            <button 
              @click="applyFilters"
              class="w-full px-4 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-primary/90 transition-colors text-sm sm:text-base"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Doctors Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <!-- Desktop Table -->
        <table class="min-w-full divide-y divide-gray-200 hidden sm:table">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input 
                  type="checkbox" 
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  class="h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"
                >
              </th>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('full_name')">
                  Doctor
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                <div class="flex items-center cursor-pointer" @click="sortBy('email')">
                  Email
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                <div class="flex items-center cursor-pointer" @click="sortBy('specialty')">
                  Specialty
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="doctor in paginatedDoctors" :key="doctor.id" class="hover:bg-gray-50">
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap">
                <input 
                  type="checkbox" 
                  :value="doctor.id"
                  v-model="selectedDoctors"
                  class="h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"
                >
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img 
                      class="h-10 w-10 rounded-full" 
                      :src="doctor.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(doctor.full_name) + '&background=random'" 
                      :alt="doctor.full_name"
                    >
                  </div>
                  <div class="ml-2 sm:ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ doctor.full_name }}</div>
                    <div class="text-xs sm:text-sm text-gray-500">{{ doctor.qualification }}</div>
                    <div class="md:hidden text-xs text-gray-500 truncate max-w-[180px]" :title="doctor.email">
                      {{ doctor.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                <div class="truncate max-w-[180px]" :title="doctor.email">
                  {{ doctor.email }}
                </div>
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                {{ doctor.specialty }}
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': doctor.approved && !doctor.suspended,
                    'bg-yellow-100 text-yellow-800': !doctor.approved,
                    'bg-red-100 text-red-800': doctor.suspended
                  }"
                >
                  {{ getStatusText(doctor) }}
                </span>
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-1 sm:space-x-2">
                  <button 
                    @click="viewDoctor(doctor.id)"
                    class="p-1 sm:p-1.5 text-medical-primary hover:text-medical-primary/80 rounded-full hover:bg-gray-100"
                    title="View Details"
                  >
                    <i class="fas fa-eye text-sm sm:text-base"></i>
                  </button>
                  <button 
                    v-if="!doctor.approved"
                    @click="approveDoctor(doctor.id)"
                    class="p-1 sm:p-1.5 text-green-600 hover:text-green-800 rounded-full hover:bg-green-50"
                    title="Approve Doctor"
                  >
                    <i class="fas fa-check text-sm sm:text-base"></i>
                  </button>
                  <button 
                    v-if="!doctor.suspended && doctor.approved"
                    @click="suspendDoctor(doctor.id)"
                    class="p-1 sm:p-1.5 text-yellow-600 hover:text-yellow-800 rounded-full hover:bg-yellow-50"
                    title="Suspend Account"
                  >
                    <i class="fas fa-pause text-sm sm:text-base"></i>
                  </button>
                  <button 
                    v-if="doctor.suspended"
                    @click="unsuspendDoctor(doctor.id)"
                    class="p-1 sm:p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
                    title="Unsuspend Account"
                  >
                    <i class="fas fa-play text-sm sm:text-base"></i>
                  </button>
                  <button 
                    @click="deleteDoctor(doctor.id)"
                    class="p-1 sm:p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                    title="Delete Doctor"
                  >
                    <i class="fas fa-trash text-sm sm:text-base"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredDoctors.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                No doctors found matching your criteria.
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile Cards -->
        <div class="sm:hidden space-y-3 p-3">
          <div v-for="doctor in paginatedDoctors" :key="'mobile-' + doctor.id" class="bg-white rounded-lg shadow p-4 border border-gray-100">
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  :value="doctor.id"
                  v-model="selectedDoctors"
                  class="h-5 w-5 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"
                >
                <img 
                  class="h-12 w-12 rounded-full" 
                  :src="doctor.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(doctor.full_name) + '&background=random'" 
                  :alt="doctor.full_name"
                >
                <div>
                  <div class="font-medium text-gray-900">{{ doctor.full_name }}</div>
                  <div class="text-sm text-gray-500">{{ doctor.qualification }}</div>
                </div>
              </div>
              <span 
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': doctor.approved && !doctor.suspended,
                  'bg-yellow-100 text-yellow-800': !doctor.approved,
                  'bg-red-100 text-red-800': doctor.suspended
                }"
              >
                {{ getStatusText(doctor) }}
              </span>
            </div>
            <div class="mt-3 text-sm text-gray-600 space-y-1">
              <div class="flex items-center">
                <i class="fas fa-envelope text-gray-400 w-5"></i>
                <span class="truncate ml-2">{{ doctor.email }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-stethoscope text-gray-400 w-5"></i>
                <span class="ml-2">{{ doctor.specialty || 'N/A' }}</span>
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <button 
                @click="viewDoctor(doctor.id)"
                class="text-medical-primary hover:text-medical-primary/80 text-sm font-medium px-2 py-1 rounded hover:bg-gray-50"
              >
                View
              </button>
              <div class="flex space-x-2">
                <button 
                  v-if="!doctor.approved"
                  @click="approveDoctor(doctor.id)"
                  class="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                  title="Approve Doctor"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button 
                  v-if="!doctor.suspended && doctor.approved"
                  @click="suspendDoctor(doctor.id)"
                  class="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50"
                  title="Suspend Account"
                >
                  <i class="fas fa-pause"></i>
                </button>
                <button 
                  v-if="doctor.suspended"
                  @click="unsuspendDoctor(doctor.id)"
                  class="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                  title="Unsuspend Account"
                >
                  <i class="fas fa-play"></i>
                </button>
                <button 
                  @click="deleteDoctor(doctor.id)"
                  class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                  title="Delete Doctor"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div v-if="filteredDoctors.length === 0" class="text-center py-6 text-gray-500">
            No doctors found matching your criteria.
          </div>
        </div>

      </div>

      <!-- Bulk Actions -->
      <div v-if="selectedDoctors.length > 0" class="bg-gray-50 px-3 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-200">
        <div class="text-sm text-gray-700 flex items-center">
          <input 
            type="checkbox" 
            :checked="selectedDoctors.length > 0"
            @change="selectAll = !selectAll; toggleSelectAll()"
            class="h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary mr-2"
          >
          <span class="font-medium">{{ selectedDoctors.length }}</span> selected
        </div>
        <div class="flex flex-wrap gap-2 w-full sm:w-auto">
          <button 
            @click="bulkAction('approve')"
            class="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex-1 sm:flex-none"
          >
            <i class="fas fa-check mr-1"></i> Approve
          </button>
          <button 
            @click="bulkAction('suspend')"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <i class="fas fa-pause mr-1"></i> Suspend
          </button>
          <button 
            @click="bulkAction('delete')"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <i class="fas fa-trash mr-1"></i> Delete
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button 
            @click="currentPage++" 
            :disabled="currentPage >= totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
              to <span class="font-medium">{{ Math.min(currentPage * perPage, filteredDoctors.length) }}</span>
              of <span class="font-medium">{{ filteredDoctors.length }}</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span>
                <i class="fas fa-chevron-left h-5 w-5"></i>
              </button>
              
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :aria-current="currentPage === page ? 'page' : undefined"
                :class="[
                  currentPage === page 
                    ? 'z-10 bg-medical-primary border-medical-primary text-white' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                ]"
              >
                {{ page }}
              </button>
              
              <button 
                @click="currentPage++" 
                :disabled="currentPage >= totalPages"
                :class="{'opacity-50 cursor-not-allowed': currentPage >= totalPages}"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span>
                <i class="fas fa-chevron-right h-5 w-5"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- View Doctor Modal -->
    <DoctorPopup 
      v-if="selectedDoctor"
      :doctor="selectedDoctor"
      @close="selectedDoctor = null"
      @approve="handleApprove"
      @suspend="handleSuspend"
      @unsuspend="handleUnsuspend"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { BASE_URL} from '@/config/api';
import DoctorPopup from './DoctorPopup.vue';

export default {
  name: 'DoctorsList',
  components: {
    DoctorPopup
  },
  setup() {
    const store = useStore();
    
    // State
    const doctors = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selectedDoctor = ref(null);
    const selectedDoctors = ref([]);
    const selectAll = ref(false);
    const searchQuery = ref('');
    const showFilters = ref(false);
    const currentPage = ref(1);
    const perPage = 10;
    const sortField = ref('full_name');
    const sortDirection = ref('asc');
    
    // Filters
    const filters = ref({
      status: '',
      specialty: ''
    });
    
    // Sample specialties - replace with API call in production
    const specialties = ref([
      'Cardiology',
      'Dermatology',
      'Endocrinology',
      'Gastroenterology',
      'Neurology',
      'Oncology',
      'Pediatrics',
      'Psychiatry',
      'Radiology',
      'Urology'
    ]);
    
    // Computed properties
    const filteredDoctors = computed(() => {
      return doctors.value.filter(doctor => {
        const matchesSearch = doctor.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            doctor.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            doctor.specialty?.toLowerCase().includes(searchQuery.value.toLowerCase());
        
        const matchesStatus = !filters.value.status || 
                             (filters.value.status === 'approved' && doctor.approved) ||
                             (filters.value.status === 'pending' && !doctor.approved) ||
                             (filters.value.status === 'suspended' && doctor.suspended);
        
        const matchesSpecialty = !filters.value.specialty || 
                               doctor.specialty === filters.value.specialty;
        
        return matchesSearch && matchesStatus && matchesSpecialty;
      }).sort((a, b) => {
        let modifier = 1;
        if (sortDirection.value === 'desc') modifier = -1;
        
        if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
        if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
        return 0;
      });
    });
    
    const totalPages = computed(() => {
      return Math.ceil(filteredDoctors.value.length / perPage);
    });
    
    const paginatedDoctors = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return filteredDoctors.value.slice(start, end);
    });
    
    const visiblePages = computed(() => {
      const range = [];
      const maxVisible = 5; // Maximum number of page buttons to show
      
      if (totalPages.value <= maxVisible) {
        // Show all pages if total pages are less than max visible
        for (let i = 1; i <= totalPages.value; i++) {
          range.push(i);
        }
      } else {
        // Always show first page
        range.push(1);
        
        // Calculate start and end of the range
        let start = Math.max(2, currentPage.value - 1);
        let end = Math.min(totalPages.value - 1, currentPage.value + 1);
        
        // Adjust if we're at the start or end
        if (currentPage.value <= 3) {
          end = 4;
        } else if (currentPage.value >= totalPages.value - 2) {
          start = totalPages.value - 3;
        }
        
        // Add ellipsis if needed
        if (start > 2) {
          range.push('...');
        }
        
        // Add middle range
        for (let i = start; i <= end; i++) {
          if (i > 1 && i < totalPages.value) {
            range.push(i);
          }
        }
        
        // Add ellipsis if needed
        if (end < totalPages.value - 1) {
          range.push('...');
        }
        
        // Always show last page
        if (totalPages.value > 1) {
          range.push(totalPages.value);
        }
      }
      
      return range;
    });
    
    // Methods
    const fetchDoctors = async () => {
      try {
        loading.value = true;
        const response = await axios.get(`${BASE_URL}/admin/doctors`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('Doctors API Response:', response.data);
        
        if (response.data) {
          // Map the API response to match your component's expected data structure
          doctors.value = response.data.map(doctor => ({
            id: doctor._id || doctor.id,
            full_name: `${doctor.full_name || ''}`.trim(),
            email: doctor.email || '',
            specialty: doctor.specialty || 'General Practitioner',
            qualification: doctor.qualification || '',
            approved: doctor.isApproved || doctor.approved || false,
            suspended: doctor.isSuspended || doctor.suspended || false,
            profile_image: doctor.profileImage || doctor.profile_image || null,
            phone: doctor.phone || 'N/A',
            address: doctor.address || 'Address not provided',
            bio: doctor.bio || 'No bio available',
            experience: doctor.experience || 0,
            rating: doctor.rating || 0,
            patients: doctor.patientCount || doctor.patients || 0
          }));
          
          console.log('Mapped doctors:', doctors.value);
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
        error.value = 'Failed to load doctors. Please try again later.';
      } finally {
        loading.value = false;
      }
    };
    
    const viewDoctor = async (id) => {
      try {
        loading.value = true;
        const response = await axios.get(`${BASE_URL}/admin/doctors/view?id=${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('Doctor details response:', response.data);
        
        if (response.data && response.data.success && response.data.data) {
          const doctorData = response.data.data;
          // Map the API response to match your component's expected data structure
          selectedDoctor.value = {
            id: doctorData.id,
            full_name: doctorData.full_name,
            email: doctorData.email,
            role: doctorData.role,
            specialty: doctorData.specialty || 'General Practitioner',
            degree: doctorData.degree || '',
            approved: doctorData.approved === 1,
            suspended: doctorData.suspended === 1,
            profile_image: doctorData.profile_image || null, // Not in the API response
            mobile: doctorData.mobile || 'N/A',
            clinic_address: doctorData.clinic_address || 'Address not provided',
            clinic_name: doctorData.clinic_name || 'Not specified',
            experience: parseInt(doctorData.experience) || 0,
            rating: 0, // Not in the API response
            patients: 0, // Not in the API response
            // Additional fields from the API
            registration_number: doctorData.registration_number,
            council: doctorData.council,
            location: doctorData.location,
            documents_verified: doctorData.documents_verified === 1
          };
          
          console.log('Mapped doctor details:', selectedDoctor.value);
        }
      } catch (err) {
        console.error('Error fetching doctor details:', err);
        // You might want to show an error message to the user here
      } finally {
        loading.value = false;
      }
    };
    
    const approveDoctor = async (id) => {
      try {
        // Replace with your actual API call
        // await api.put(`/api/admin/doctors/${id}/approve`);
        
        // Update local state
        const index = doctors.value.findIndex(doc => doc.id === id);
        if (index !== -1) {
          doctors.value[index].approved = true;
          doctors.value[index].suspended = false;
        }
        
        // Show success message
        store.dispatch('showNotification', {
          type: 'success',
          message: 'Doctor approved successfully.'
        });
      } catch (err) {
        console.error('Error approving doctor:', err);
        store.dispatch('showNotification', {
          type: 'error',
          message: 'Failed to approve doctor. Please try again.'
        });
      }
    };
    
    const suspendDoctor = async (id) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/admin/doctors/${id}/suspend`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        console.log('Suspend doctor response:', response.data);
        
        // Check if we got a successful response (2xx status code)
        if (response.status >= 200 && response.status < 300) {
          // Update local state
          const index = doctors.value.findIndex(doc => doc.id === id);
          if (index !== -1) {
            doctors.value[index].suspended = true;
          }
          
          // Show success message
          const successMessage = response.data?.message || 'Doctor suspended successfully.';
          if (store && store.dispatch) {
            store.dispatch('showNotification', {
              type: 'success',
              message: successMessage
            });
          } else {
            console.log(successMessage);
          }
        }
      } catch (err) {
        console.error('Error suspending doctor:', err);
        const errorMessage = err.response?.data?.message || 'Failed to suspend doctor. Please try again.';
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'error',
            message: errorMessage
          });
        } else {
          console.error(errorMessage);
        }
      }
    };
    
    const unsuspendDoctor = async (id) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/admin/doctors/${id}/unsuspend`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        console.log('Unsuspend doctor response:', response.data);
        
        // Check if we got a successful response (2xx status code)
        if (response.status >= 200 && response.status < 300) {
          // Update local state
          const index = doctors.value.findIndex(doc => doc.id === id);
          if (index !== -1) {
            doctors.value[index].suspended = false;
          }
          
          // Show success message
          const successMessage = response.data?.message || 'Doctor unsuspended successfully.';
          if (store && store.dispatch) {
            store.dispatch('showNotification', {
              type: 'success',
              message: successMessage
            });
          } else {
            console.log(successMessage);
          }
        }
      } catch (err) {
        console.error('Error unsuspending doctor:', err);
        const errorMessage = err.response?.data?.message || 'Failed to unsuspend doctor. Please try again.';
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'error',
            message: errorMessage
          });
        } else {
          console.error(errorMessage);
        }
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'error',
            message: 'Failed to unsuspend doctor. Please try again.'
          });
        } else {
          console.error('Failed to unsuspend doctor. Please try again.');
        }
      }
    };
    
    const deleteDoctor = async (id) => {
      if (!confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) {
        return;
      }
      
      try {
        // Replace with your actual API call
        // await api.delete(`/api/admin/doctors/${id}`);
        
        // Update local state
        doctors.value = doctors.value.filter(doc => doc.id !== id);
        
        // Remove from selected doctors if present
        selectedDoctors.value = selectedDoctors.value.filter(docId => docId !== id);
        
        // Show success message
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'success',
            message: 'Doctor deleted successfully.'
          });
        } else {
          console.log('Doctor deleted successfully.');
        }
      } catch (err) {
        console.error('Error deleting doctor:', err);
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'error',
            message: 'Failed to delete doctor. Please try again.'
          });
        } else {
          console.error('Failed to delete doctor. Please try again.');
        }
      }
    };
    
    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedDoctors.value = paginatedDoctors.value.map(doctor => doctor.id);
      } else {
        selectedDoctors.value = [];
      }
    };
    
    const bulkAction = (action) => {
      if (selectedDoctors.value.length === 0) return;
      
      if (action === 'approve') {
        if (confirm(`Approve ${selectedDoctors.value.length} selected doctor(s)?`)) {
          selectedDoctors.value.forEach(id => {
            const doctor = doctors.value.find(doc => doc.id === id);
            if (doctor && !doctor.approved) {
              approveDoctor(id);
            }
          });
          selectedDoctors.value = [];
          selectAll.value = false;
        }
      } else if (action === 'suspend') {
        if (confirm(`Suspend ${selectedDoctors.value.length} selected doctor(s)?`)) {
          selectedDoctors.value.forEach(id => {
            const doctor = doctors.value.find(doc => doc.id === id);
            if (doctor && !doctor.suspended) {
              suspendDoctor(id);
            }
          });
          selectedDoctors.value = [];
          selectAll.value = false;
        }
      } else if (action === 'delete') {
        if (confirm(`Are you sure you want to delete ${selectedDoctors.value.length} selected doctor(s)? This action cannot be undone.`)) {
          selectedDoctors.value.forEach(id => {
            deleteDoctor(id);
          });
          selectedDoctors.value = [];
          selectAll.value = false;
        }
      }
    };
    
    const sortBy = (field) => {
      if (field === sortField.value) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortField.value = field;
        sortDirection.value = 'asc';
      }
    };
    
    const applyFilters = () => {
      currentPage.value = 1; // Reset to first page when filters change
    };
    
    const getStatusText = (doctor) => {
      if (doctor.suspended) return 'Suspended';
      return doctor.approved ? 'Active' : 'Pending Approval';
    };
    
    // Watchers
    watch(selectedDoctors, (newVal) => {
      if (newVal.length === 0) {
        selectAll.value = false;
      } else if (newVal.length === paginatedDoctors.value.length) {
        selectAll.value = true;
      } else {
        selectAll.value = false;
      }
    });
    
    // Lifecycle hooks
    onMounted(() => {
      fetchDoctors();
    });
    
    // Expose to template
    return {
      // State
      doctors,
      loading,
      error,
      selectedDoctor,
      selectedDoctors,
      selectAll,
      searchQuery,
      showFilters,
      currentPage,
      perPage,
      totalPages,
      paginatedDoctors,
      visiblePages,
      filters,
      specialties,
      filteredDoctors,
      
      // Methods
      viewDoctor,
      approveDoctor,
      suspendDoctor,
      unsuspendDoctor,
      deleteDoctor,
      toggleSelectAll,
      bulkAction,
      sortBy,
      applyFilters,
      getStatusText,
      handleApprove: approveDoctor,
      handleSuspend: suspendDoctor,
      handleUnsuspend: unsuspendDoctor
    };
  }
};
</script>

<style scoped>
/* Responsive table styles */
@media (max-width: 767px) {
  .doctors-list {
    padding: 0 0.5rem;
  }
  
  .doctors-list h2 {
    font-size: 1.25rem;
  }
  
  .doctors-list .relative input {
    width: 100%;
  }
}

/* Touch-friendly buttons */
button {
  touch-action: manipulation;
  min-height: 2.5rem;
  min-width: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Ensure icons are properly sized on mobile */
.fa, .fas {
  font-size: 1rem;
}

/* Better spacing for mobile cards */
@media (max-width: 639px) {
  .doctors-list {
    padding: 0 0.25rem;
  }
  
  .doctors-list h2 {
    font-size: 1.1rem;
  }
  
  .doctors-list .relative {
    width: 100%;
  }
  
  .doctors-list button {
    padding: 0.5rem;
  }
  
  .fa, .fas {
    font-size: 0.875rem;
  }
}
</style>
