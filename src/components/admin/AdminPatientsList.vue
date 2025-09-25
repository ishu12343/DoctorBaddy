<template>
  <div class="patients-list">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Patients Management</h2>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search patients..."
            class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent"
          >
          <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <button 
          @click="showFilters = !showFilters"
          class="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
        >
          <i class="fas fa-filter"></i>
          <span>Filters</span>
        </button>
      </div>
    </div>

    <!-- Filters Panel -->
    <div v-if="showFilters" class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filters.status" class="w-full p-2 border rounded">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select v-model="filters.gender" class="w-full p-2 border rounded">
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex items-end">
          <button 
            @click="applyFilters"
            class="px-4 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-primary/90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Patients Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input 
                  type="checkbox" 
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  class="h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"
                >
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('full_name')">
                  Patient
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('email')">
                  Email
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('phone')">
                  Phone
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('gender')">
                  Gender
                  <i class="fas fa-sort ml-1 text-gray-400"></i>
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="patient in paginatedPatients" :key="patient.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input 
                  type="checkbox" 
                  :value="patient.id"
                  v-model="selectedPatients"
                  class="h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img 
                      class="h-10 w-10 rounded-full" 
                      :src="patient.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(patient.full_name) + '&background=random'" 
                      :alt="patient.full_name"
                    >
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ patient.full_name }}</div>
                    <div class="text-sm text-gray-500">ID: {{ patient.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ patient.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ patient.phone || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatGender(patient.gender) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': patient.is_active,
                    'bg-red-100 text-red-800': !patient.is_active
                  }"
                >
                  {{ patient.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button 
                    @click="viewPatient(patient.id)"
                    class="text-medical-primary hover:text-medical-primary/80"
                    title="View Details"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button 
                    v-if="!patient.is_active"
                    @click="activatePatient(patient.id)"
                    class="text-green-600 hover:text-green-800"
                    title="Activate Account"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button 
                    v-if="patient.is_active"
                    @click="deactivatePatient(patient.id)"
                    class="text-yellow-600 hover:text-yellow-800"
                    title="Deactivate Account"
                  >
                    <i class="fas fa-pause"></i>
                  </button>
                  <button 
                    @click="deletePatient(patient.id)"
                    class="text-red-600 hover:text-red-800"
                    title="Delete Patient"
                  >
                    <i class="fas fa-trash"></i>
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
      </div>

      <!-- Bulk Actions -->
      <div v-if="selectedPatients.length > 0" class="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div class="text-sm text-gray-700">
          <span class="font-medium">{{ selectedPatients.length }}</span> selected
        </div>
        <div class="flex space-x-2">
          <button 
            @click="bulkAction('activate')"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                            patient.gender === filters.value.gender;
        
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
          patients.value = response.data.map(patient => ({
            id: patient.id,
            full_name: patient.full_name || 'Unknown Patient',
            email: patient.email || '',
            phone: patient.mobile || 'N/A',
            is_active: patient.is_active === 1,
            // Add default values for any additional fields your UI might expect
            gender: 'other',
            date_of_birth: '',
            address: 'Address not provided',
            profile_image: null,
            blood_group: 'Unknown',
            last_visit: 'Never',
            registered_date: new Date().toISOString().split('T')[0],
            notes: '',
            allergies: [],
            medications: []
          }));
          
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
      if (!confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
        return;
      }
      
      try {
        // Replace with your actual API call
        // await api.delete(`/api/admin/patients/${id}`);
        
        // Update local state
        patients.value = patients.value.filter(patient => patient.id !== id);
        
        // Remove from selected patients if present
        selectedPatients.value = selectedPatients.value.filter(patientId => patientId !== id);
        
        // Show success message
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'success',
            message: 'Patient deleted successfully.'
          });
        } else {
          console.log('Patient deleted successfully.');
        }
      } catch (err) {
        console.error('Error deleting patient:', err);
        if (store && store.dispatch) {
          store.dispatch('showNotification', {
            type: 'error',
            message: 'Failed to delete patient. Please try again.'
          });
        } else {
          console.error('Failed to delete patient. Please try again.');
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
    
    const bulkAction = (action) => {
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
        if (confirm(`Are you sure you want to delete ${selectedPatients.value.length} selected patient(s)? This action cannot be undone.`)) {
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
    
    const applyFilters = () => {
      currentPage.value = 1; // Reset to first page when filters change
    };
    
    const formatGender = (gender) => {
      if (!gender) return 'N/A';
      return gender.charAt(0).toUpperCase() + gender.slice(1);
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
      applyFilters,
      formatGender,
      handleActivate: activatePatient,
      handleDeactivate: deactivatePatient
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
