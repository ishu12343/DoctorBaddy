<template>
  <div class="patients-list-container">
    <!-- Header Section -->
    <div class="patients-header">
      <div class="header-content">
        <h1 class="page-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          Patients Management
        </h1>
        <p class="page-subtitle">Manage and view all your patients information</p>
      </div>
      
      <!-- Search and Filter Section -->
      <div class="search-filter-section">
        <div class="search-container">
          <div class="search-input-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search patients by name, email, or phone..."
              class="search-input"
              @input="filterPatients"
            />
            <button v-if="searchQuery" @click="clearSearch" class="clear-search-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="filter-controls">
          <select v-model="statusFilter" @change="filterPatients" class="filter-select">
            <option value="">All Statuses</option>
            <option value="PENDING">Pending Appointments</option>
            <option value="CONFIRMED">Confirmed Appointments</option>
            <option value="COMPLETED">Completed Appointments</option>
            <option value="CANCELLED">Cancelled Appointments</option>
          </select>
          <select v-model="genderFilter" @change="filterPatients" class="filter-select">
            <option value="">All Genders</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          
          <button @click="refreshPatients" class="refresh-btn" :disabled="loading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="stats-section">
      <div class="stat-card clickable" @click="filterByStatus('PENDING')" :class="{ active: statusFilter === 'PENDING' }">
        <div class="stat-icon pending">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ pendingCount }}</h3>
          <p class="stat-label">Pending Appointments</p>
        </div>
      </div>
      
      <div class="stat-card clickable" @click="filterByStatus('CONFIRMED')" :class="{ active: statusFilter === 'CONFIRMED' }">
        <div class="stat-icon confirmed">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <path d="M22 4L12 14.01l-3-3"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ confirmedCount }}</h3>
          <p class="stat-label">Confirmed Appointments</p>
        </div>
      </div>
      
      <div class="stat-card clickable" @click="filterByStatus('COMPLETED')" :class="{ active: statusFilter === 'COMPLETED' }">
        <div class="stat-icon completed">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ completedCount }}</h3>
          <p class="stat-label">Completed Appointments</p>
        </div>
      </div>
      
      <div class="stat-card clickable" @click="filterByStatus('CANCELLED')" :class="{ active: statusFilter === 'CANCELLED' }">
        <div class="stat-icon cancelled">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M15 9l-6 6"/>
            <path d="M9 9l6 6"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ cancelledCount }}</h3>
          <p class="stat-label">Cancelled Appointments</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading patients...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <h3 class="error-title">Error Loading Patients</h3>
      <p class="error-message">{{ error }}</p>
      <button @click="refreshPatients" class="retry-btn">Try Again</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!filteredPatients.length && !loading" class="empty-container">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      </div>
      <h3 class="empty-title">
        {{ searchQuery || bloodGroupFilter || genderFilter || statusFilter ? 'No Patients Found' : 'No Patients Yet' }}
      </h3>
      <p class="empty-message">
        {{ searchQuery || bloodGroupFilter || genderFilter || statusFilter ? 'Try adjusting your search criteria' : 'Patients will appear here once they book appointments with you' }}
      </p>
      <button v-if="searchQuery || bloodGroupFilter || genderFilter || statusFilter" @click="clearAllFilters" class="clear-filters-btn">
        Clear All Filters
      </button>
    </div>

    <!-- Patients Grid -->
    <div v-else class="patients-grid">
      <div 
        v-for="(patient, index) in paginatedPatients" 
        :key="`${patient.patient_id}_${patient.appointment_id}_${index}`" 
        class="patient-card"
        :class="{ 'highlighted': highlightedPatientId === patient.patient_id }"
        :data-patient-id="patient.patient_id"
        @click="openPatientDetails(patient)"
      >
        <!-- Patient Avatar -->
        <div class="patient-avatar">
          <div class="avatar-circle" :class="getAvatarClass(patient.gender)">
            <span class="avatar-text">{{ getPatientInitials(patient.full_name) }}</span>
          </div>
          <div class="patient-status" :class="{ 'active': patient.is_active }">
            <div class="status-dot"></div>
          </div>
        </div>

        <!-- Patient Info -->
        <div class="patient-info">
          <h3 class="patient-name">{{ patient.full_name }}</h3>
          <p class="patient-email">{{ patient.email }}</p>
          
          <!-- Current Appointment Status Badge -->
          <div class="patient-status-badge" :class="getStatusBadgeClass(patient.appointment_status)">
            <div class="status-indicator"></div>
            <span class="status-text">{{ getStatusText(patient.appointment_status) }}</span>
          </div>
          
          <!-- Appointment Info -->
          <div class="appointment-info">
            <div class="appointment-item" v-if="patient.appointment_datetime">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span class="detail-text">{{ formatDate(patient.appointment_datetime) }}</span>
            </div>
            
            <div class="appointment-item" v-if="patient.reason">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
              <span class="detail-text">{{ patient.reason }}</span>
            </div>
          </div>
          <div class="patient-details">
            <div class="detail-item" v-if="patient.mobile">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span class="detail-text">{{ patient.mobile }}</span>
            </div>
            
            <div class="detail-item" v-if="patient.blood_group">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3v18m-4-6h8"/>
              </svg>
              <span class="detail-text">{{ patient.blood_group }}</span>
            </div>
            
            <div class="detail-item" v-if="patient.gender">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="m15 9-6 6"/>
                <path d="m9 9h6v6"/>
              </svg>
              <span class="detail-text">{{ formatGender(patient.gender) }}</span>
            </div>
            
            <div class="detail-item" v-if="patient.age">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span class="detail-text">{{ patient.age }} years</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="patient-actions">
          <button 
            @click.stop="viewPatientHistory(patient)" 
            class="action-btn history-btn"
            title="View Medical History"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </button>
          
          <button 
            @click.stop="contactPatient(patient)" 
            class="action-btn contact-btn"
            title="Contact Patient"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination-container">
      <div class="pagination-info">
        <span>Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredPatients.length }} patients</span>
      </div>
      
      <div class="pagination-controls">
        <button 
          @click="previousPage" 
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Previous
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="goToPage(page)"
            :class="['page-btn', { 'active': page === currentPage }]"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          Next
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Patient Details Modal -->
    <div v-if="showPatientModal" class="modal-overlay" @click="closePatientModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Patient Details</h2>
          <button @click="closePatientModal" class="modal-close-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="modal-content">
          <div v-if="selectedPatient" class="patient-detail-view">
            <!-- Patient Header -->
            <div class="patient-header">
              <div class="patient-avatar-large">
                <div class="avatar-circle large" :class="getAvatarClass(selectedPatient.gender)">
                  <span class="avatar-text">{{ getPatientInitials(selectedPatient.full_name) }}</span>
                </div>
              </div>
              <div class="patient-basic-info">
                <h3 class="patient-name-large">{{ selectedPatient.full_name }}</h3>
                <p class="patient-email-large">{{ selectedPatient.email }}</p>
                <div class="patient-status-badge" :class="{ 'active': selectedPatient.is_active }">
                  {{ selectedPatient.is_active ? 'Active' : 'Inactive' }}
                </div>
              </div>
            </div>

            <!-- Patient Details Grid -->
            <div class="patient-details-grid">
              <div class="detail-section">
                <h4 class="section-title">Contact Information</h4>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">{{ selectedPatient.mobile || 'Not provided' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">{{ selectedPatient.email }}</span>
                </div>
                <div class="detail-row" v-if="selectedPatient.address">
                  <span class="detail-label">Address:</span>
                  <span class="detail-value">{{ selectedPatient.address }}</span>
                </div>
                <div class="detail-row" v-if="selectedPatient.city || selectedPatient.state">
                  <span class="detail-label">Location:</span>
                  <span class="detail-value">{{ [selectedPatient.city, selectedPatient.state].filter(Boolean).join(', ') }}</span>
                </div>
              </div>

              <div class="detail-section">
                <h4 class="section-title">Medical Information</h4>
                <div class="detail-row">
                  <span class="detail-label">Blood Group:</span>
                  <span class="detail-value">{{ selectedPatient.blood_group || 'Not provided' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Gender:</span>
                  <span class="detail-value">{{ formatGender(selectedPatient.gender) || 'Not specified' }}</span>
                </div>
                <div class="detail-row" v-if="selectedPatient.date_of_birth">
                  <span class="detail-label">Date of Birth:</span>
                  <span class="detail-value">{{ formatDate(selectedPatient.date_of_birth) }}</span>
                </div>
                <div class="detail-row" v-if="selectedPatient.age">
                  <span class="detail-label">Age:</span>
                  <span class="detail-value">{{ selectedPatient.age }} years</span>
                </div>
              </div>

              <div class="detail-section" v-if="selectedPatient.allergies || selectedPatient.conditions">
                <h4 class="section-title">Medical History</h4>
                <div class="detail-row" v-if="selectedPatient.allergies">
                  <span class="detail-label">Allergies:</span>
                  <span class="detail-value">{{ selectedPatient.allergies }}</span>
                </div>
                <div class="detail-row" v-if="selectedPatient.conditions">
                  <span class="detail-label">Conditions:</span>
                  <span class="detail-value">{{ selectedPatient.conditions }}</span>
                </div>
                <div class="detail-row" v-if="selectedPatient.medications">
                  <span class="detail-label">Medications:</span>
                  <span class="detail-value">{{ selectedPatient.medications }}</span>
                </div>
              </div>

              <div class="detail-section" v-if="selectedPatient.emergency_contact_name">
                <h4 class="section-title">Emergency Contact</h4>
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value">{{ selectedPatient.emergency_contact_name }}</span>
                </div>
                <div class="detail-row" v-if="selectedPatient.emergency_contact_number">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">{{ selectedPatient.emergency_contact_number }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="modal-actions">
              <button @click="viewPatientHistory(selectedPatient)" class="modal-action-btn primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                View Medical History
              </button>
              <button @click="contactPatient(selectedPatient)" class="modal-action-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Contact Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '@/config/api';

export default {
  name: 'PatientsList',
  data() {
    return {
      allPatients: [],
      filteredPatients: [],
      loading: false,
      error: null,
      searchQuery: '',
      bloodGroupFilter: '',
      genderFilter: '',
      statusFilter: '', // Add status filter
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 12,
      
      // Modal
      showPatientModal: false,
      selectedPatient: null,
      
      // Highlighting
      highlightedPatientId: null
    }
  },
  computed: {
    
    activePatients() {
      return this.allPatients.filter(patient => patient.is_active).length;
    },
    
    // Computed properties for status counts based on appointment entries
    pendingCount() {
      return this.allPatients.filter(patient => patient.appointment_status === 'PENDING').length;
    },
    
    confirmedCount() {
      return this.allPatients.filter(patient => patient.appointment_status === 'CONFIRMED').length;
    },
    
    completedCount() {
      return this.allPatients.filter(patient => patient.appointment_status === 'COMPLETED').length;
    },
    
    cancelledCount() {
      return this.allPatients.filter(patient => patient.appointment_status === 'CANCELLED').length;
    },
    
    totalPages() {
      return Math.ceil(this.filteredPatients.length / this.itemsPerPage);
    },
    
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    
    endIndex() {
      return Math.min(this.startIndex + this.itemsPerPage, this.filteredPatients.length);
    },
    
    paginatedPatients() {
      return this.filteredPatients.slice(this.startIndex, this.endIndex);
    },
    
    visiblePages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    }
  },
  
  async mounted() {
    await this.fetchPatients();
    
    // Check if we need to highlight a specific patient from dashboard navigation
    const patientContext = sessionStorage.getItem('patientContext');
    if (patientContext) {
      try {
        const context = JSON.parse(patientContext);
        console.log('Patient context for highlighting:', context);
        
        if (context.patientId) {
          this.highlightedPatientId = parseInt(context.patientId);
          
          // Scroll to highlighted patient after data loads
          this.$nextTick(() => {
            setTimeout(() => {
              this.scrollToHighlightedPatient(context);
            }, 500);
          });
        }
        
        // Clean up context
        sessionStorage.removeItem('patientContext');
      } catch (error) {
        console.error('Error parsing patient context:', error);
      }
    }
  },
  
  methods: {
    async fetchPatients() {
      this.loading = true;
      this.error = null;
      
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${BASE_URL}/api/doctor/patients`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.allPatients = response.data.patients.map(patient => ({
            ...patient,
            // Use patient_id as the main ID for uniqueness
            id: patient.patient_id,
            age: this.calculateAge(patient.date_of_birth)
          }));
          this.filteredPatients = [...this.allPatients];
        } else {
          this.error = response.data.error || 'Failed to fetch patients';
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
        this.error = error.response?.data?.error || 'Failed to fetch patients. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    filterPatients() {
      let filtered = [...this.allPatients];
      
      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(patient => 
          patient.full_name.toLowerCase().includes(query) ||
          patient.email.toLowerCase().includes(query) ||
          (patient.mobile && patient.mobile.includes(query))
        );
      }
      
      // Status filter - filter by specific appointment status
      if (this.statusFilter) {
        filtered = filtered.filter(patient => patient.appointment_status === this.statusFilter);
      }
      
      // Blood group filter
      if (this.bloodGroupFilter) {
        filtered = filtered.filter(patient => patient.blood_group === this.bloodGroupFilter);
      }
      
      // Gender filter
      if (this.genderFilter) {
        filtered = filtered.filter(patient => patient.gender === this.genderFilter);
      }
      
      this.filteredPatients = filtered;
      this.currentPage = 1; // Reset to first page when filtering
    },
    
    clearSearch() {
      this.searchQuery = '';
      this.filterPatients();
    },
    
    clearAllFilters() {
      this.searchQuery = '';
      this.bloodGroupFilter = '';
      this.genderFilter = '';
      this.statusFilter = '';
      this.filterPatients();
    },
    
    filterByStatus(status) {
      // If clicking the same status, clear the filter; otherwise set the new status
      if (this.statusFilter === status) {
        this.statusFilter = '';
      } else {
        this.statusFilter = status;
        // Clear other filters to show only status-based results
        this.searchQuery = '';
        this.genderFilter = '';
        this.bloodGroupFilter = '';
      }
      this.filterPatients();
    },
    
    async refreshPatients() {
      await this.fetchPatients();
    },
    
    // Pagination methods
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
    goToPage(page) {
      this.currentPage = page;
    },
    
    // Modal methods
    openPatientDetails(patient) {
      this.selectedPatient = patient;
      this.showPatientModal = true;
      document.body.style.overflow = 'hidden';
    },
    
    closePatientModal() {
      this.showPatientModal = false;
      this.selectedPatient = null;
      document.body.style.overflow = 'auto';
    },
    
    // Utility methods
    getPatientInitials(name) {
      if (!name) return '?';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    },
    
    getAvatarClass(gender) {
      switch(gender?.toUpperCase()) {
        case 'MALE': return 'male';
        case 'FEMALE': return 'female';
        default: return 'other';
      }
    },
    
    formatGender(gender) {
      if (!gender) return '';
      return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    },
    
    getStatusText(status) {
      switch(status) {
        case 'PENDING': return 'Pending';
        case 'CONFIRMED': return 'Confirmed';
        case 'COMPLETED': return 'Completed';
        case 'CANCELLED': return 'Cancelled';
        default: return 'Unknown';
      }
    },
    
    getStatusBadgeClass(status) {
      switch(status) {
        case 'PENDING': return 'pending';
        case 'CONFIRMED': return 'confirmed';
        case 'COMPLETED': return 'completed';
        case 'CANCELLED': return 'cancelled';
        default: return 'unknown';
      }
    },
    
    calculateAge(dateOfBirth) {
      if (!dateOfBirth) return null;
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    },
    
    // Action methods
    viewPatientHistory(patient) {
      // TODO: Implement patient history view
      console.log('View history for patient:', patient.full_name);
      alert(`View medical history for ${patient.full_name} - Feature coming soon!`);
    },
    
    contactPatient(patient) {
      // TODO: Implement contact functionality
      console.log('Contact patient:', patient.full_name);
      if (patient.mobile) {
        // Try to open phone dialer
        window.open(`tel:${patient.mobile}`);
      } else {
        alert(`Contact ${patient.full_name} at ${patient.email}`);
      }
    },
    
    scrollToHighlightedPatient(context) {
      if (this.highlightedPatientId) {
        const element = document.querySelector(`[data-patient-id="${this.highlightedPatientId}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add highlight effect
          element.classList.add('highlighted-patient');
          
          // Show toast with patient details
          if (this.$toast && context.patientName) {
            this.$toast.success(
              `Found patient: ${context.patientName}`,
              3000
            );
          }
          
          setTimeout(() => {
            element.classList.remove('highlighted-patient');
            this.highlightedPatientId = null;
          }, 3000);
        } else {
          console.warn('Patient element not found for highlighting');
        }
      }
    }
  },
  
  beforeUnmount() {
    // Ensure body overflow is reset when component is destroyed
    document.body.style.overflow = 'auto';
  }
}
</script>

<style scoped>
.patients-list-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

/* Header Section */
.patients-header {
  background: rgb(255 255 255 / 95%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgb(0 0 0 / 10%);
}

.header-content {
  margin-bottom: 2rem;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem;
}

.title-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #667eea;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.page-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

.search-filter-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-container {
  flex: 1;
}

.search-input-wrapper {
  position: relative;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: #ef4444;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.clear-search-btn:hover {
  background: #dc2626;
  transform: translateY(-50%) scale(1.1);
}

.clear-search-btn svg {
  width: 0.75rem;
  height: 0.75rem;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background: white;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgb(102 126 234 / 40%);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Statistics Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgb(255 255 255 / 95%);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 20px rgb(0 0 0 / 10%);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 15%);
}

.stat-card.clickable {
  cursor: pointer;
  border: 2px solid transparent;
}

.stat-card.clickable:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 30px rgb(0 0 0 / 15%);
}

.stat-card.clickable.active {
  border-color: #3b82f6;
  background: rgb(59 130 246 / 10%);
  box-shadow: 0 4px 20px rgb(59 130 246 / 30%);
}

.stat-card.clickable.active:hover {
  transform: translateY(-2px) scale(1.01);
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-icon.total {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.stat-icon.completed {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.cancelled {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.stat-icon.pending {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-icon.confirmed {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-icon.filtered {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.stat-label {
  color: #64748b;
  font-size: 0.8rem;
  margin: 0;
  line-height: 1.2;
}

/* Loading, Error, Empty States */
.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: rgb(255 255 255 / 95%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgb(0 0 0 / 10%);
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #64748b;
  font-size: 1.1rem;
}

.error-icon,
.empty-icon {
  width: 4rem;
  height: 4rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.error-title,
.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem;
}

.error-message,
.empty-message {
  color: #64748b;
  font-size: 1rem;
  margin: 0 0 1.5rem;
}

.retry-btn,
.clear-filters-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover,
.clear-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgb(102 126 234 / 40%);
}

/* Patients Grid */
.patients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.patient-card {
  background: rgb(255 255 255 / 95%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgb(0 0 0 / 10%);
  border: 2px solid transparent;
}

.patient-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 15%);
  border-color: #667eea;
}

.patient-card.highlighted {
  border: 2px solid #3b82f6;
  box-shadow: 0 8px 30px rgb(59 130 246 / 20%);
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.highlighted-patient {
  animation: patientHighlightPulse 2s ease-in-out;
}

@keyframes patientHighlightPulse {
  0%, 100% { 
    box-shadow: 0 8px 30px rgb(59 130 246 / 20%);
  }
  50% { 
    box-shadow: 0 12px 40px rgb(59 130 246 / 40%);
    transform: translateY(-2px);
  }
}

.patient-avatar {
  position: relative;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.avatar-circle {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  font-size: 1.25rem;
}

.avatar-circle.large {
  width: 5rem;
  height: 5rem;
  font-size: 1.5rem;
}

.avatar-circle.male {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.avatar-circle.female {
  background: linear-gradient(135deg, #ec4899, #be185d);
}

.avatar-circle.other {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.patient-status {
  position: absolute;
  bottom: 0;
  right: 35%;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid white;
}

.status-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ef4444;
}

.patient-status.active .status-dot {
  background: #10b981;
}

.patient-info {
  text-align: center;
  margin-bottom: 1rem;
}

.patient-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem;
}

.patient-email {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 1rem;
}

.patient-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.patient-status-badge.pending {
  background: #fef3c7;
  color: #d97706;
}

.patient-status-badge.confirmed {
  background: #dbeafe;
  color: #1d4ed8;
}

.patient-status-badge.completed {
  background: #dcfce7;
  color: #16a34a;
}

.patient-status-badge.cancelled {
  background: #fee2e2;
  color: #dc2626;
}

.patient-status-badge.unknown {
  background: #f3f4f6;
  color: #6b7280;
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentcolor;
}

.appointment-counts {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.count-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  min-width: 50px;
}

.count-item.pending {
  background: #fef3c7;
  color: #d97706;
}

.count-item.confirmed {
  background: #dbeafe;
  color: #1d4ed8;
}

.count-item.completed {
  background: #dcfce7;
  color: #16a34a;
}

.count-item.cancelled {
  background: #fee2e2;
  color: #dc2626;
}

.count-item .count {
  font-weight: 700;
  font-size: 1rem;
}

.count-item .label {
  font-size: 0.65rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Appointment Info Styles */
.appointment-info {
  margin: 0.75rem 0;
  padding: 0.5rem;
  background: rgb(99 102 241 / 5%);
  border-radius: 8px;
  border-left: 3px solid #6366f1;
}

.appointment-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: #4b5563;
}

.appointment-item:last-child {
  margin-bottom: 0;
}

.appointment-summary {
  margin: 0.75rem 0;
  padding: 0.5rem;
  background: rgb(243 244 246 / 80%);
  border-radius: 6px;
}

.summary-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-counts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.summary-counts .count-item {
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 500;
}

.summary-counts .count-item.pending {
  background: rgb(245 158 11 / 10%);
  color: #d97706;
}

.summary-counts .count-item.confirmed {
  background: rgb(59 130 246 / 10%);
  color: #1d4ed8;
}

.summary-counts .count-item.completed {
  background: rgb(16 185 129 / 10%);
  color: #059669;
}

.summary-counts .count-item.cancelled {
  background: rgb(239 68 68 / 10%);
  color: #dc2626;
}

.summary-counts .count {
  font-weight: 700;
}

.patient-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
}

.detail-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.patient-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.action-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

.history-btn {
  background: #f3f4f6;
  color: #374151;
}

.history-btn:hover {
  background: #e5e7eb;
  transform: scale(1.1);
}

.contact-btn {
  background: #dbeafe;
  color: #1d4ed8;
}

.contact-btn:hover {
  background: #bfdbfe;
  transform: scale(1.1);
}

/* Pagination */
.pagination-container {
  background: rgb(255 255 255 / 95%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  justify-content: between;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 20px rgb(0 0 0 / 10%);
  flex-wrap: wrap;
}

.pagination-info {
  color: #64748b;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.pagination-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #667eea;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 1rem;
  height: 1rem;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #374151;
  transition: all 0.2s ease;
}

.page-btn:hover {
  background: #f8fafc;
  border-color: #667eea;
}

.page-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 50%);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgb(0 0 0 / 20%);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.modal-close-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: rgb(255 255 255 / 20%);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: rgb(255 255 255 / 30%);
  transform: scale(1.1);
}

.modal-close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-content {
  padding: 2rem;
  max-height: calc(90vh - 180px);
  overflow-y: auto;
}

.patient-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.patient-avatar-large {
  flex-shrink: 0;
}

.patient-basic-info {
  flex: 1;
}

.patient-name-large {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem;
}

.patient-email-large {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0 0 0.75rem;
}

.patient-status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background: #fee2e2;
  color: #dc2626;
}

.patient-status-badge.active {
  background: #dcfce7;
  color: #16a34a;
}

.patient-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.detail-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-weight: 500;
  color: #374151;
  flex-shrink: 0;
  min-width: 100px;
}

.detail-value {
  color: #64748b;
  text-align: right;
  word-break: break-word;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.modal-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-action-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.modal-action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgb(102 126 234 / 40%);
}

.modal-action-btn.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e2e8f0;
}

.modal-action-btn.secondary:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.modal-action-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

/* Responsive Design */
@media (width <= 1024px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }

  .search-filter-section {
    flex-direction: column;
  }
}

@media (width <= 768px) {
  .patients-list-container {
    padding: 1rem;
  }
  
  .patients-header {
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .title-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .title-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .search-filter-section {
    gap: 1rem;
  }
  
  .filter-controls {
    justify-content: flex-start;
  }
  
  .patients-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .patient-card {
    padding: 1rem;
  }
  
  .patient-details-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .modal-container {
    margin: 0.5rem;
  }
  
  .modal-content {
    padding: 1rem;
  }
  
  .patient-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .pagination-container {
    flex-direction: column;
    text-align: center;
  }
  
  .pagination-controls {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (width <= 480px) {
  .search-input-wrapper {
    max-width: none;
  }
  
  .patients-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select {
    min-width: auto;
  }
}
</style>
