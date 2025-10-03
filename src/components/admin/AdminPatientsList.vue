<template>
  <div class="patients-list px-2 sm:px-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Patients Management</h2>
      <div class="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div class="relative w-full sm:w-48 md:w-64">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search patients..."
            class="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent text-sm sm:text-base"
          >
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 touch-action-manipulation"
            type="button"
            title="Clear search"
          >
            <i class="fas fa-times text-xs sm:text-sm"></i>
          </button>
        </div>
        <div class="flex gap-2 w-full sm:w-auto">
          <button 
            @click="showFilters = !showFilters"
            class="flex-1 sm:flex-none px-4 py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 text-sm sm:text-base min-h-[2.5rem] touch-action-manipulation"
          >
            <i class="fas fa-filter text-xs sm:text-sm"></i>
            <span class="whitespace-nowrap">{{ showFilters ? 'Hide' : '' }} Advance Filters</span>
          </button>
          <button 
            @click="quickResetFilters"
            class="px-3 py-2 border rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-gray-500 text-sm sm:text-base min-h-[2.5rem] touch-action-manipulation transition-colors duration-200"
            title="Reset all filters"
          >
            <i class="fas fa-undo text-xs sm:text-sm"></i>
          </button>
        </div>
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
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              v-model="filters.status" 
              class="w-full p-2 border rounded text-sm sm:text-base focus:ring-2 focus:ring-medical-primary focus:border-transparent touch-action-manipulation"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select 
              v-model="filters.gender" 
              class="w-full p-2 border rounded text-sm sm:text-base focus:ring-2 focus:ring-medical-primary focus:border-transparent touch-action-manipulation"
              @change="onGenderFilterChange"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </transition>

    <!-- Patients Table -->
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
                  Patient
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
                <div class="flex items-center cursor-pointer" @click="sortBy('phone')">
                  Phone
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                <div class="flex items-center cursor-pointer" @click="sortBy('gender')">
                  Gender
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="patient in paginatedPatients" :key="patient.id" class="hover:bg-gray-50">
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap">
                <input 
                  type="checkbox" 
                  :value="patient.id"
                  v-model="selectedPatients"
                  class="h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"
                >
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img 
                      class="h-10 w-10 rounded-full" 
                      :src="patient.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(patient.full_name) + '&background=random'" 
                      :alt="patient.full_name"
                    >
                  </div>
                  <div class="ml-2 sm:ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ patient.full_name }}</div>
                    <div class="text-xs sm:text-sm text-gray-500">ID: {{ patient.id }}</div>
                    <div class="md:hidden text-xs text-gray-500 truncate max-w-[180px]" :title="patient.email">
                      {{ patient.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                <div class="truncate max-w-[180px]" :title="patient.email">
                  {{ patient.email }}
                </div>
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                {{ patient.phone || 'N/A' }}
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                {{ formatGender(patient.gender) }}
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': patient.is_active,
                    'bg-red-100 text-red-800': !patient.is_active
                  }"
                >
                  {{ patient.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-3 sm:px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-1 sm:space-x-2">
                  <button 
                    @click="viewPatient(patient.id)"
                    class="p-1 sm:p-1.5 text-medical-primary hover:text-medical-primary/80 rounded-full hover:bg-gray-100"
                    title="View Details"
                  >
                    <i class="fas fa-eye text-sm sm:text-base"></i>
                  </button>
                  <button 
                    v-if="!patient.is_active"
                    @click="activatePatient(patient.id)"
                    class="p-1 sm:p-1.5 text-green-600 hover:text-green-800 rounded-full hover:bg-green-50"
                    title="Activate Account"
                  >
                    <i class="fas fa-check text-sm sm:text-base"></i>
                  </button>
                  <button 
                    v-if="patient.is_active"
                    @click="deactivatePatient(patient.id)"
                    class="p-1 sm:p-1.5 text-yellow-600 hover:text-yellow-800 rounded-full hover:bg-yellow-50"
                    title="Deactivate Account"
                  >
                    <i class="fas fa-pause text-sm sm:text-base"></i>
                  </button>
                  <button 
                    @click="deletePatient(patient.id)"
                    class="p-1 sm:p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                    title="Delete Patient"
                  >
                    <i class="fas fa-trash text-sm sm:text-base"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredPatients.length === 0">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                No patients found matching your criteria.
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile Cards -->
        <div class="sm:hidden space-y-3 p-3">
          <div v-for="patient in paginatedPatients" :key="'mobile-' + patient.id" class="bg-white rounded-lg shadow p-4 border border-gray-100">
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  :value="patient.id"
                  v-model="selectedPatients"
                  class="h-5 w-5 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"
                >
                <img 
                  class="h-12 w-12 rounded-full" 
                  :src="patient.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(patient.full_name) + '&background=random'" 
                  :alt="patient.full_name"
                >
                <div>
                  <div class="font-medium text-gray-900">{{ patient.full_name }}</div>
                  <div class="text-sm text-gray-500">ID: {{ patient.id }}</div>
                </div>
              </div>
              <span 
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': patient.is_active,
                  'bg-red-100 text-red-800': !patient.is_active
                }"
              >
                {{ patient.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="mt-3 text-sm text-gray-600 space-y-1">
              <div class="flex items-center">
                <i class="fas fa-envelope text-gray-400 w-5"></i>
                <span class="truncate ml-2">{{ patient.email }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-phone text-gray-400 w-5"></i>
                <span class="ml-2">{{ patient.phone || 'N/A' }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-venus-mars text-gray-400 w-5"></i>
                <span class="ml-2">{{ formatGender(patient.gender) }}</span>
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <button 
                @click="viewPatient(patient.id)"
                class="text-medical-primary hover:text-medical-primary/80 text-sm font-medium px-2 py-1 rounded hover:bg-gray-50"
              >
                View
              </button>
              <div class="flex space-x-2">
                <button 
                  v-if="!patient.is_active"
                  @click="activatePatient(patient.id)"
                  class="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                  title="Activate Account"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button 
                  v-if="patient.is_active"
                  @click="deactivatePatient(patient.id)"
                  class="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50"
                  title="Deactivate Account"
                >
                  <i class="fas fa-pause"></i>
                </button>
                <button 
                  @click="deletePatient(patient.id)"
                  class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                  title="Delete Patient"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div v-if="filteredPatients.length === 0" class="text-center py-6 text-gray-500">
            No patients found matching your criteria.
          </div>
        </div>

      </div>

      <!-- Bulk Actions -->
      <div v-if="selectedPatients.length > 0" class="bg-gray-50 px-3 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-200">
        <div class="text-sm text-gray-700 flex items-center">
          <input 
            type="checkbox" 
            :checked="selectedPatients.length > 0"
            @change="selectAll = !selectAll; toggleSelectAll()"
            class="h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary mr-2"
          >
          <span class="font-medium">{{ selectedPatients.length }}</span> selected
        </div>
        <div class="flex flex-wrap gap-2 w-full sm:w-auto">
          <button 
            @click="bulkAction('activate')"
            class="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex-1 sm:flex-none"
          >
            <i class="fas fa-check mr-1"></i> Activate
          </button>
          <button 
            @click="bulkAction('deactivate')"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <i class="fas fa-pause mr-1"></i> Deactivate
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
              to <span class="font-medium">{{ Math.min(currentPage * perPage, filteredPatients.length) }}</span>
              of <span class="font-medium">{{ filteredPatients.length }}</span> results
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

    <!-- View Patient Modal -->
    <PatientPopup 
      v-if="selectedPatient"
      :patient="selectedPatient"
      @close="selectedPatient = null"
      @activate="handleActivate"
      @deactivate="handleDeactivate"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { BASE_URL } from '@/config/api';
import PatientPopup from './PatientPopup.vue';

export default {
  name: 'PatientsList',
  components: {
    PatientPopup
  },
  setup() {
    const store = useStore();
    
    // State
    const patients = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selectedPatient = ref(null);
    const selectedPatients = ref([]);
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
      gender: ''
    });
    
    // Computed properties
    const filteredPatients = computed(() => {
      return patients.value.filter(patient => {
        const matchesSearch = patient.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            patient.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            patient.phone?.toLowerCase().includes(searchQuery.value.toLowerCase());
        
        const matchesStatus = !filters.value.status || 
                            (filters.value.status === 'active' && patient.is_active) ||
                            (filters.value.status === 'inactive' && !patient.is_active);
        
        const matchesGender = !filters.value.gender || 
                            (patient.gender && patient.gender.toLowerCase() === filters.value.gender.toLowerCase());
        
        return matchesSearch && matchesStatus && matchesGender;
      }).sort((a, b) => {
        let modifier = 1;
        if (sortDirection.value === 'desc') modifier = -1;
        
        if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
        if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
        return 0;
      });
    });
    
    const totalPages = computed(() => {
      return Math.ceil(filteredPatients.value.length / perPage);
    });
    
    const paginatedPatients = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return filteredPatients.value.slice(start, end);
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
    const fetchPatients = async () => {
      try {
        loading.value = true;
        const response = await axios.get(`${BASE_URL}/admin/patients`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('Patients API Response:', response.data);
        
        if (Array.isArray(response.data)) {
          // Map the API response to match your component's expected data structure
          patients.value = response.data.map(patient => {
            const mappedPatient = {
              id: patient.id,
              full_name: patient.full_name || 'Unknown Patient',
              email: patient.email || '',
              phone: patient.mobile || 'N/A',
              is_active: patient.is_active === 1,
              // Normalize gender field to lowercase for consistent filtering
              gender: patient.gender ? patient.gender.toLowerCase() : 'other',
              date_of_birth: '',
              address: 'Address not provided',
              profile_image: null,
              blood_group: 'Unknown',
              last_visit: 'Never',
              registered_date: new Date().toISOString().split('T')[0],
              notes: '',
              allergies: [],
              medications: []
            };
            console.log('Mapped patient gender:', mappedPatient.gender, 'from:', patient.gender);
            return mappedPatient;
          });
          
          console.log('Total patients loaded:', patients.value.length);
          console.log('Sample patient genders:', patients.value.slice(0, 3).map(p => p.gender));
          console.log('Mapped patients:', patients.value);
        }
      } catch (err) {
        console.error('Error fetching patients:', err);
        error.value = 'Failed to load patients. Please try again later.';
      } finally {
        loading.value = false;
      }
    };
    
    const viewPatient = async (id) => {
      try {
        loading.value = true;
        const response = await axios.get(`${BASE_URL}/admin/patient/view?id=${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('Patient details response:', response.data);
        
        if (response.data && response.data.success && response.data.data) {
          const patientData = response.data.data;
          // Map the API response to match your component's expected data structure
          selectedPatient.value = {
            id: patientData.id,
            full_name: patientData.full_name,
            role: patientData.role,
            email: patientData.email,
            mobile: patientData.mobile || 'N/A',
            gender: patientData.gender || 'other',
            date_of_birth: patientData.date_of_birth || '',
            address: patientData.address || 'Address not provided',
            profile_image: patientData.profile_image || null,
            blood_group: patientData.blood_group || 'Unknown',
            is_active: patientData.is_active === 1,
            last_visit: patientData.last_visit || 'Never',
            registered_date: patientData.registered_date || new Date().toISOString().split('T')[0],
            // Additional fields that might be in the response
            emergency_contact: patientData.emergency_contact,
            medical_history: patientData.medical_history || [],
            allergies: patientData.allergies || [],
            medications: patientData.medications || []
          };
          
          console.log('Mapped patient details:', selectedPatient.value);
        }
      } catch (err) {
        console.error('Error fetching patient details:', err);
        // You might want to show an error message to the user here
      } finally {
        loading.value = false;
      }
    };
    
    const activatePatient = async (id) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/admin/patients/${id}/activate`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        console.log('Activate patient response:', response.data);
        
        // Check if we got a successful response (2xx status code)
        if (response.status >= 200 && response.status < 300) {
          // Update local state
          const index = patients.value.findIndex(patient => patient.id === id);
          if (index !== -1) {
            patients.value[index].is_active = true;
          }
          // Show success message
          const successMessage = response.data?.message || 'Patient activated successfully.';
          if (store && store.dispatch) {
            store.dispatch('showNotification', {
              type: 'success',
              message: successMessage
            });
          } else {
            alert(successMessage);
          }
          return true;
        } else {
          throw new Error(response.data?.message || 'Failed to activate patient');
        }
      } catch (err) {
        console.error('Error activating patient:', err);
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'error',
            message: err.response?.data?.message || 'Failed to activate patient. Please try again.'
          });
        } else {
          alert(err.response?.data?.message || 'Failed to activate patient. Please try again.');
        }
        return false;
      }
    };
    
    const deactivatePatient = async (id) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/admin/patients/${id}/deactivate`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        console.log('Deactivate patient response:', response.data);
        
        // Check if we got a successful response (2xx status code)
        if (response.status >= 200 && response.status < 300) {
          // Update local state
          const index = patients.value.findIndex(patient => patient.id === id);
          if (index !== -1) {
            patients.value[index].is_active = false;
          }
          // Show success message
          const successMessage = response.data?.message || 'Patient deactivated successfully.';
          if (store && store.dispatch) {
            store.dispatch('showNotification', {
              type: 'success',
              message: successMessage
            });
          } else {
            alert(successMessage);
          }
          return true;
        } else {
          throw new Error(response.data?.message || 'Failed to deactivate patient');
        }
      } catch (err) {
        console.error('Error deactivating patient:', err);
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'error',
            message: err.response?.data?.message || 'Failed to deactivate patient. Please try again.'
          });
        } else {
          alert(err.response?.data?.message || 'Failed to deactivate patient. Please try again.');
        }
        return false;
      }
    };
    
    const deletePatient = async (id) => {
      if (!confirm('Are you sure you want to delete this patient? This action cannot be undone. All related appointments will also be deleted.')) {
        return;
      }
      
      try {
        const response = await axios.delete(`${BASE_URL}/admin/patients/${id}/delete`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('Delete patient response:', response.data);
        
        // Update local state
        patients.value = patients.value.filter(patient => patient.id !== id);
        
        // Remove from selected patients if present
        selectedPatients.value = selectedPatients.value.filter(patientId => patientId !== id);
        
        // Show success message
        const successMessage = response.data?.message || 'Patient deleted successfully.';
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'success',
            message: successMessage
          });
        } else {
          alert(successMessage);
        }
      } catch (err) {
        console.error('Error deleting patient:', err);
        const errorMessage = err.response?.data?.message || 'Failed to delete patient. Please try again.';
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'error',
            message: errorMessage
          });
        } else {
          alert(errorMessage);
        }
      }
    };
    
    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedPatients.value = paginatedPatients.value.map(patient => patient.id);
      } else {
        selectedPatients.value = [];
      }
    };
    
    const bulkAction = async (action) => {
      if (selectedPatients.value.length === 0) return;
      
      if (action === 'activate') {
        if (confirm(`Activate ${selectedPatients.value.length} selected patient(s)?`)) {
          selectedPatients.value.forEach(id => {
            const patient = patients.value.find(p => p.id === id);
            if (patient && !patient.is_active) {
              activatePatient(id);
            }
          });
          selectedPatients.value = [];
          selectAll.value = false;
        }
      } else if (action === 'deactivate') {
        if (confirm(`Deactivate ${selectedPatients.value.length} selected patient(s)?`)) {
          selectedPatients.value.forEach(id => {
            const patient = patients.value.find(p => p.id === id);
            if (patient && patient.is_active) {
              deactivatePatient(id);
            }
          });
          selectedPatients.value = [];
          selectAll.value = false;
        }
      } else if (action === 'delete') {
        if (confirm(`Are you sure you want to delete ${selectedPatients.value.length} selected patient(s)? This action cannot be undone. All related appointments will also be deleted.`)) {
          selectedPatients.value.forEach(id => {
            deletePatient(id);
          });
          selectedPatients.value = [];
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
    
    const clearSearch = () => {
      searchQuery.value = '';
      currentPage.value = 1; // Reset to first page when search is cleared
    };
    
    const quickResetFilters = () => {
      // Reset all filter values to empty/default state
      filters.value.status = '';
      filters.value.gender = '';
      searchQuery.value = '';
      currentPage.value = 1; // Reset to first page when filters change
      
      // Show success notification
      if (store && store.dispatch) {
        store.dispatch('showNotification', {
          type: 'success',
          message: 'All filters cleared successfully.'
        });
      }
    };
    
    const onGenderFilterChange = () => {
      console.log('Gender filter changed to:', filters.value.gender);
      console.log('Current patients with gender:', patients.value.map(p => ({ name: p.full_name, gender: p.gender })));
      currentPage.value = 1; // Reset pagination when filter changes
    };
    
    const formatGender = (gender) => {
      if (!gender) return 'N/A';
      // Handle the display formatting for various gender values
      const normalizedGender = gender.toLowerCase();
      switch (normalizedGender) {
        case 'male':
        case 'm':
          return 'Male';
        case 'female':
        case 'f':
          return 'Female';
        case 'other':
        case 'others':
          return 'Other';
        default:
          return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
      }
    };
    
    // Watchers
    watch(selectedPatients, (newVal) => {
      if (newVal.length === 0) {
        selectAll.value = false;
      } else if (newVal.length === paginatedPatients.value.length) {
        selectAll.value = true;
      } else {
        selectAll.value = false;
      }
    });
    
    // Watch for filter changes to reset pagination
    watch([() => filters.value.status, () => filters.value.gender, searchQuery], () => {
      currentPage.value = 1;
    }, { deep: true });
    
    // Lifecycle hooks
    onMounted(() => {
      fetchPatients();
    });
    
    // Expose to template
    return {
      // State
      patients,
      loading,
      error,
      selectedPatient,
      selectedPatients,
      selectAll,
      searchQuery,
      showFilters,
      currentPage,
      perPage,
      totalPages,
      paginatedPatients,
      visiblePages,
      filters,
      filteredPatients,
      
      // Methods
      viewPatient,
      activatePatient,
      deactivatePatient,
      deletePatient,
      toggleSelectAll,
      bulkAction,
      sortBy,
      clearSearch,
      quickResetFilters,
      onGenderFilterChange,
      formatGender,
      handleActivate: activatePatient,
      handleDeactivate: deactivatePatient
    };
  }
};
</script>

<style scoped>
/* Responsive table styles */
@media (max-width: 767px) {
  .patients-list {
    padding: 0 0.5rem;
  }
  
  .patients-list h2 {
    font-size: 1.25rem;
  }
  
  .patients-list .relative input {
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

/* Search input clear button styles */
.patients-list .relative button[title="Clear search"] {
  min-height: 1.5rem;
  min-width: 1.5rem;
  padding: 0.25rem;
}

.patients-list .relative button[title="Clear search"]:hover {
  background-color: rgba(243, 244, 246, 1);
}

/* Quick reset button styles */
.patients-list button[title="Reset all filters"] {
  min-width: 2.75rem;
  transition: all 0.2s ease-in-out;
}

.patients-list button[title="Reset all filters"]:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
}

/* Enhanced mobile responsiveness for filters */
@media (max-width: 639px) {
  .patients-list {
    padding: 0 0.25rem;
  }
  
  .patients-list h2 {
    font-size: 1.1rem;
  }
  
  .patients-list .relative {
    width: 100%;
  }
  
  .patients-list button {
    padding: 0.75rem;
    min-height: 3rem;
  }
  
  .fa, .fas {
    font-size: 0.875rem;
  }
  
  /* Search clear button mobile styles */
  .patients-list .relative button[title="Clear search"] {
    min-height: 2rem;
    min-width: 2rem;
    padding: 0.375rem;
    right: 0.5rem;
  }
  
  /* Quick reset button mobile styles */
  .patients-list button[title="Reset all filters"] {
    min-width: 3rem;
    min-height: 3rem;
    padding: 0.75rem;
  }
  
  /* Filter buttons container mobile layout */
  .patients-list .flex.gap-2 {
    gap: 0.75rem;
  }
  
  /* Filter panel mobile optimization */
  .patients-list .bg-white.p-4 {
    padding: 1rem;
    margin: 0 -0.25rem 1.5rem -0.25rem;
  }
  
  /* Filter grid mobile stacking */
  .patients-list .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  /* Ensure filters use full width on mobile */
  .patients-list .grid > div {
    width: 100%;
  }
  
  /* Select elements mobile friendly */
  .patients-list select {
    padding: 0.75rem;
    font-size: 1rem;
    min-height: 3rem;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }
  
  .patients-list select:focus {
    outline: none;
    border-color: var(--medical-primary, #3b82f6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .patients-list {
    padding: 0 0.125rem;
  }
  
  .patients-list h2 {
    font-size: 1rem;
  }
  
  .patients-list button {
    padding: 0.625rem;
    min-height: 2.75rem;
  }
  
  /* Filter labels mobile friendly */
  .patients-list label {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  
  /* Search clear button extra small screens */
  .patients-list .relative button[title="Clear search"] {
    min-height: 1.75rem;
    min-width: 1.75rem;
    padding: 0.25rem;
    right: 0.375rem;
  }
  
  .patients-list .relative button[title="Clear search"] .fa,
  .patients-list .relative button[title="Clear search"] .fas {
    font-size: 0.75rem;
  }
  
  /* Quick reset button extra small screens */
  .patients-list button[title="Reset all filters"] {
    min-width: 2.75rem;
    min-height: 2.75rem;
    padding: 0.625rem;
  }
  
  .patients-list button[title="Reset all filters"] .fa,
  .patients-list button[title="Reset all filters"] .fas {
    font-size: 0.75rem;
  }
  
  /* Filter buttons container extra small layout */
  .patients-list .flex.gap-2 {
    gap: 0.5rem;
  }
  
  /* Select elements extra small screens */
  .patients-list select {
    padding: 0.625rem 2.25rem 0.625rem 0.625rem;
    font-size: 0.875rem;
    min-height: 2.75rem;
    background-size: 1.25em 1.25em;
    background-position: right 0.375rem center;
  }
  
  /* Enhanced select focus for touch devices */
  .patients-list select:focus,
  .patients-list select:active {
    transform: scale(1.02);
    transition: transform 0.1s ease-in-out;
  }
}
</style>
