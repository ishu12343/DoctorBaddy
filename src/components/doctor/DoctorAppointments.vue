<template>
  <div class="appointments-container">
    <!-- Header Section -->
    <header class="appointments-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="page-title">My Appointments</h1>
          <p class="page-subtitle">Manage your patient appointments and requests</p>
        </div>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-number">{{ totalAppointments }}</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-card pending">
            <div class="stat-number">{{ pendingAppointments }}</div>
            <div class="stat-label">Pending</div>
          </div>
          <div class="stat-card confirmed">
            <div class="stat-number">{{ confirmedAppointments }}</div>
            <div class="stat-label">Today</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Filter and Search Section -->
    <div class="filters-section">
      <div class="filters-container">
        <div class="search-bar">
          <div class="search-input-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search patients by name..."
              class="search-input"
              @input="filterAppointments"
            />
          </div>
        </div>
        
        <div class="filter-controls">
          <select v-model="selectedStatus" @change="filterAppointments" class="filter-select">
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          
          <select v-model="selectedDate" @change="filterAppointments" class="filter-select">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="week">This Week</option>
          </select>
          
          <button class="refresh-btn" @click="loadAppointments" :disabled="loading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ 'spinning': loading }">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading appointments...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3>Unable to load appointments</h3>
        <p>{{ error }}</p>
        <button @click="loadAppointments" class="retry-btn">Try Again</button>
      </div>
    </div>

    <!-- Appointments List -->
    <div v-else-if="filteredAppointments.length > 0" class="appointments-list">
      <div 
        v-for="appointment in filteredAppointments" 
        :key="appointment.id" 
        class="appointment-card"
        :class="{ 
          'pending': appointment.status === 'PENDING',
          'confirmed': appointment.status === 'CONFIRMED',
          'completed': appointment.status === 'COMPLETED',
          'cancelled': appointment.status === 'CANCELLED'
        }"
      >
        <div class="appointment-header">
          <div class="patient-info">
            <div class="patient-avatar">
              <div class="patient-initials">
                {{ getInitials(appointment.patient_name) }}
              </div>
            </div>
            <div class="patient-details">
              <h3 class="patient-name">{{ appointment.patient_name }}</h3>
              <p class="patient-contact">{{ appointment.patient_email }}</p>
              <p class="patient-phone">{{ appointment.patient_phone }}</p>
            </div>
          </div>
          <div class="appointment-status">
            <span class="status-badge" :class="appointment.status.toLowerCase()">
              {{ appointment.status }}
            </span>
          </div>
        </div>

        <div class="appointment-details">
          <div class="details-grid">
            <div class="detail-item">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <div class="detail-content">
                <span class="detail-label">Date & Time</span>
                <span class="detail-value">{{ formatDateTime(appointment.appointment_datetime) }}</span>
              </div>
            </div>
            
            <div class="detail-item" v-if="appointment.reason">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <div class="detail-content">
                <span class="detail-label">Reason for Visit</span>
                <span class="detail-value">{{ appointment.reason }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <div class="detail-content">
                <span class="detail-label">Duration</span>
                <span class="detail-value">30 minutes</span>
              </div>
            </div>
            
            <div class="detail-item">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              <div class="detail-content">
                <span class="detail-label">Type</span>
                <span class="detail-value">In-Person Visit</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="appointment-actions" v-if="appointment.status === 'PENDING'">
          <button 
            class="action-btn approve-btn"
            @click="approveAppointment(appointment.id)"
            :disabled="processingAppointment === appointment.id"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            {{ processingAppointment === appointment.id ? 'Approving...' : 'Approve' }}
          </button>
          
          <button 
            class="action-btn reject-btn"
            @click="rejectAppointment(appointment.id)"
            :disabled="processingAppointment === appointment.id"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            {{ processingAppointment === appointment.id ? 'Rejecting...' : 'Reject' }}
          </button>
          
          <button class="action-btn chat-btn" @click="openChatModalWithPatient(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Chat with Patient
          </button>
          
          <button class="action-btn reschedule-btn" @click="openRescheduleModal(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Reschedule
          </button>
        </div>

        <!-- Confirmed/Completed Actions -->
        <div class="appointment-actions" v-else-if="appointment.status === 'CONFIRMED'">
          <button 
            class="action-btn complete-btn"
            @click="completeAppointment(appointment.id)"
            :disabled="processingAppointment === appointment.id"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            Mark Complete
          </button>
          
          <button class="action-btn chat-btn" @click="openChatModalWithPatient(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Chat with Patient
          </button>
          
          <button class="action-btn contact-btn" @click="contactPatient(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Contact Patient
          </button>
        </div>

        <!-- Completed Appointments Actions -->
        <div class="appointment-actions" v-else-if="appointment.status === 'COMPLETED'">
          <button class="action-btn chat-btn" @click="openChatModalWithPatient(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Chat with Patient
          </button>
          
          <button class="action-btn reschedule-btn" @click="openRescheduleModal(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Follow-up Appointment
          </button>
          
          <button class="action-btn contact-btn" @click="contactPatient(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Contact Patient
          </button>
        </div>

        <!-- Cancelled Appointments Actions -->
        <div class="appointment-actions" v-else-if="appointment.status === 'CANCELLED'">
          <button class="action-btn chat-btn" @click="openChatModalWithPatient(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Chat with Patient
          </button>
          
          <button class="action-btn reschedule-btn" @click="openRescheduleModal(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Reschedule Appointment
          </button>
          
          <button class="action-btn contact-btn" @click="contactPatient(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 714.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Contact Patient
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-state-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      <h3>No appointments found</h3>
      <p>You don't have any appointments matching the current filters.</p>
      <button @click="clearFilters" class="clear-filters-btn">Clear Filters</button>
    </div>

    <!-- Reschedule Modal -->
    <div v-if="showRescheduleModal" class="modal-overlay" @click="closeRescheduleModal" @touchstart.passive="handleModalTouchStart">
      <div class="reschedule-modal" @click.stop @touchstart.stop>
        <div class="modal-header">
          <h3>Reschedule Appointment</h3>
          <button class="close-btn" @click="closeRescheduleModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="modal-content">
          <div class="patient-summary">
            <h4>Patient: {{ selectedAppointment?.patient_name }}</h4>
            <p>Current: {{ formatDateTime(selectedAppointment?.appointment_datetime) }}</p>
          </div>

          <div class="reschedule-form">
            <div class="form-group">
              <label for="newDate">New Date:</label>
              <input 
                id="newDate"
                v-model="rescheduleForm.date"
                type="date" 
                class="form-input"
                :min="getTodayDate()"
              />
            </div>

            <div class="form-group">
              <label for="newTime">New Time:</label>
              <select id="newTime" v-model="rescheduleForm.time" class="form-select">
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="09:30">09:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="14:30">02:30 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="15:30">03:30 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="16:30">04:30 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="17:30">05:30 PM</option>
              </select>
            </div>

            <div class="form-group">
              <label for="rescheduleReason">Reason for rescheduling:</label>
              <textarea 
                id="rescheduleReason"
                v-model="rescheduleForm.reason"
                class="form-textarea"
                placeholder="Optional: Explain why you need to reschedule..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="modal-actions">
            <button 
              class="submit-btn"
              @click="submitReschedule"
              :disabled="!rescheduleForm.date || !rescheduleForm.time || submittingReschedule"
            >
              {{ submittingReschedule ? 'Rescheduling...' : 'Reschedule Appointment' }}
            </button>
            <button class="cancel-btn" @click="closeRescheduleModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Modal -->
    <div v-if="showChatModal" class="modal-overlay" @click="closeChatModal">
      <div class="chat-modal" @click.stop>
        <div class="chat-header">
          <div class="chat-patient-info">
            <div class="chat-patient-avatar">
              <div class="avatar-initials">
                {{ selectedChatPatient ? getInitials(selectedChatPatient.patient_name) : '' }}
              </div>
            </div>
            
            <div class="chat-patient-details">
              <h4>{{ selectedChatPatient?.patient_name }}</h4>
              <p>Patient</p>
            </div>
          </div>
          
          <button class="close-btn" @click="closeChatModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="chat-messages" ref="chatMessages">
          <div v-if="chatMessages.length === 0" class="chat-welcome">
            <div class="welcome-avatar">
              <div class="avatar-initials">
                {{ selectedChatPatient ? getInitials(selectedChatPatient.patient_name) : '' }}
              </div>
            </div>
            <h3>Start conversation with {{ selectedChatPatient?.patient_name }}</h3>
            <p>Send a message to begin your consultation.</p>
          </div>
          
          <div v-for="message in chatMessages" :key="message.id" class="message" :class="message.sender">
            <div class="message-avatar">
              <div class="avatar-initials">
                {{ message.sender === 'doctor' ? 'Dr' : getInitials(selectedChatPatient?.patient_name || '') }}
              </div>
            </div>
            <div class="message-content">
              <div class="message-text">{{ message.text }}</div>
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <div class="input-container">
            <textarea 
              v-model="newMessage"
              placeholder="Type your message..."
              class="message-input"
              rows="2"
              @keypress.enter.prevent="sendMessage"
            ></textarea>
            <button class="send-btn" @click="sendMessage" :disabled="!newMessage.trim()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22,2 15,22 11,13 2,9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '@/config/api';

export default {
  name: "DoctorAppointments",
  data() {
    return {
      appointments: [],
      filteredAppointments: [],
      loading: false,
      error: null,
      processingAppointment: null,
      
      // Search and filters
      searchQuery: '',
      selectedStatus: '',
      selectedDate: '',
      
      // Reschedule modal
      showRescheduleModal: false,
      selectedAppointment: null,
      submittingReschedule: false,
      rescheduleForm: {
        date: '',
        time: '',
        reason: ''
      },
      
      // Chat modal
      showChatModal: false,
      selectedChatPatient: null,
      chatMessages: [],
      newMessage: '',
      
      // Touch handling
      touchStartY: 0
    }
  },
  computed: {
    totalAppointments() {
      return this.appointments.length;
    },
    pendingAppointments() {
      return this.appointments.filter(apt => apt.status === 'PENDING').length;
    },
    confirmedAppointments() {
      const today = new Date().toDateString();
      return this.appointments.filter(apt => 
        apt.status === 'CONFIRMED' && 
        new Date(apt.appointment_datetime).toDateString() === today
      ).length;
    }
  },
  mounted() {
    this.loadAppointments();
  },
  methods: {
    async loadAppointments() {
      console.log('Loading appointments...');
      this.loading = true;
      this.error = null;
      const token = localStorage.getItem('token');
      console.log('Token for loading appointments:', !!token);
      
      try {
        const response = await axios.get(`${BASE_URL}/api/doctor/appointments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Load appointments response:', response.data);
        
        if (response.data.success) {
          this.appointments = response.data.appointments;
          this.filteredAppointments = this.appointments;
          console.log('Loaded appointments:', this.appointments.length);
          console.log('Appointments data:', this.appointments);
        } else {
          console.log('Load appointments returned success: false');
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
        console.log('Load appointments error response:', error.response?.data);
        this.error = 'Failed to load appointments. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async approveAppointment(appointmentId) {
      console.log('Approve button clicked for appointment ID:', appointmentId);
      this.processingAppointment = appointmentId;
      const token = localStorage.getItem('token');
      console.log('Token available:', !!token);
      
      try {
        console.log('Making API call to approve appointment...');
        const response = await axios.post(
          `${BASE_URL}/api/doctor/appointments/${appointmentId}/approve`, 
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log('API Response:', response.data);
        
        if (response.data.success) {
          // Update the appointment status locally
          const appointment = this.appointments.find(apt => apt.id === appointmentId);
          if (appointment) {
            console.log('Updating appointment status to CONFIRMED');
            appointment.status = 'CONFIRMED';
          }
          this.filterAppointments();
          
          // Show success message
          this.$toast?.success('Appointment approved successfully!');
          
          // Refresh appointments to ensure data consistency
          await this.loadAppointments();
        } else {
          console.log('API returned success: false');
        }
      } catch (error) {
        console.error('Error approving appointment:', error);
        console.log('Error response:', error.response?.data);
        const errorMessage = error.response?.data?.error || 'Failed to approve appointment. Please try again.';
        this.$toast?.error(errorMessage);
      } finally {
        this.processingAppointment = null;
      }
    },

    async rejectAppointment(appointmentId) {
      this.processingAppointment = appointmentId;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.post(
          `${BASE_URL}/api/doctor/appointments/${appointmentId}/reject`, 
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          // Update the appointment status locally
          const appointment = this.appointments.find(apt => apt.id === appointmentId);
          if (appointment) {
            appointment.status = 'CANCELLED';
          }
          this.filterAppointments();
          
          // Show success message
          this.$toast?.success('Appointment rejected successfully!');
          
          // Refresh appointments to ensure data consistency
          await this.loadAppointments();
        }
      } catch (error) {
        console.error('Error rejecting appointment:', error);
        const errorMessage = error.response?.data?.error || 'Failed to reject appointment. Please try again.';
        this.$toast?.error(errorMessage);
      } finally {
        this.processingAppointment = null;
      }
    },

    async completeAppointment(appointmentId) {
      this.processingAppointment = appointmentId;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.post(
          `${BASE_URL}/api/doctor/appointments/${appointmentId}/complete`, 
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          // Update the appointment status locally
          const appointment = this.appointments.find(apt => apt.id === appointmentId);
          if (appointment) {
            appointment.status = 'COMPLETED';
          }
          this.filterAppointments();
          
          // Show success message
          this.$toast?.success('Appointment marked as completed!');
          
          // Refresh appointments to ensure data consistency
          await this.loadAppointments();
        }
      } catch (error) {
        console.error('Error completing appointment:', error);
        const errorMessage = error.response?.data?.error || 'Failed to complete appointment. Please try again.';
        this.$toast?.error(errorMessage);
      } finally {
        this.processingAppointment = null;
      }
    },

    filterAppointments() {
      let filtered = [...this.appointments];
      
      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter(apt => 
          apt.patient_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      // Filter by status
      if (this.selectedStatus) {
        filtered = filtered.filter(apt => apt.status === this.selectedStatus);
      }
      
      // Filter by date
      if (this.selectedDate) {
        const now = new Date();
        filtered = filtered.filter(apt => {
          const aptDate = new Date(apt.appointment_datetime);
          
          switch (this.selectedDate) {
            case 'today': {
              return aptDate.toDateString() === now.toDateString();
            }
            case 'tomorrow': {
              const tomorrow = new Date(now);
              tomorrow.setDate(tomorrow.getDate() + 1);
              return aptDate.toDateString() === tomorrow.toDateString();
            }
            case 'week': {
              const weekFromNow = new Date(now);
              weekFromNow.setDate(weekFromNow.getDate() + 7);
              return aptDate >= now && aptDate <= weekFromNow;
            }
            default: {
              return true;
            }
          }
        });
      }
      
      this.filteredAppointments = filtered;
    },

    openRescheduleModal(appointment) {
      this.selectedAppointment = appointment;
      this.showRescheduleModal = true;
      this.rescheduleForm = {
        date: '',
        time: '',
        reason: ''
      };
    },

    closeRescheduleModal() {
      this.showRescheduleModal = false;
      this.selectedAppointment = null;
      this.submittingReschedule = false;
      this.rescheduleForm = {
        date: '',
        time: '',
        reason: ''
      };
    },

    async submitReschedule() {
      this.submittingReschedule = true;
      const token = localStorage.getItem('token');
      
      // Validate form data
      if (!this.rescheduleForm.date || !this.rescheduleForm.time) {
        this.$toast?.error('Please select both date and time.');
        this.submittingReschedule = false;
        return;
      }
      
      try {
        const requestData = {
          new_date: this.rescheduleForm.date,
          new_time: this.rescheduleForm.time,
          reason: this.rescheduleForm.reason || ''
        };
        
        console.log('Rescheduling appointment with data:', requestData);
        
        const response = await axios.post(
          `${BASE_URL}/api/doctor/appointments/${this.selectedAppointment.id}/reschedule`,
          requestData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log('Reschedule response:', response.data);
        
        if (response.data.success) {
          // Update the appointment locally
          const appointment = this.appointments.find(apt => apt.id === this.selectedAppointment.id);
          if (appointment) {
            appointment.appointment_datetime = `${this.rescheduleForm.date} ${this.rescheduleForm.time}:00`;
            appointment.status = 'CONFIRMED';
          }
          this.filterAppointments();
          this.closeRescheduleModal();
          
          // Show success message with details
          const formattedDate = new Date(`${this.rescheduleForm.date} ${this.rescheduleForm.time}`).toLocaleString();
          this.$toast?.success(`Appointment rescheduled to ${formattedDate}`);
          
          // Refresh appointments to ensure data consistency
          await this.loadAppointments();
        } else {
          const errorMessage = response.data.error || 'Failed to reschedule appointment';
          this.$toast?.error(errorMessage);
        }
      } catch (error) {
        console.error('Error rescheduling appointment:', error);
        console.log('Error response data:', error.response?.data);
        
        let errorMessage = 'Failed to reschedule appointment. Please try again.';
        
        if (error.response?.data) {
          if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (error.response.data.details) {
            errorMessage = `Database error: ${error.response.data.details}`;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.$toast?.error(errorMessage);
      } finally {
        this.submittingReschedule = false;
      }
    },

    contactPatient(appointment) {
      // Open phone dialer or messaging app
      window.open(`tel:${appointment.patient_phone}`);
    },

    clearFilters() {
      this.searchQuery = '';
      this.selectedStatus = '';
      this.selectedDate = '';
      this.filterAppointments();
    },

    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    },

    formatDateTime(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    getTomorrowDate() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    },

    getTodayDate() {
      const today = new Date();
      return today.toISOString().split('T')[0];
    },

    handleModalTouchStart(event) {
      // Prevent modal from closing on touch scroll
      if (event.target.classList.contains('modal-overlay')) {
        // Only close if the touch is directly on the overlay, not on scroll
        this.touchStartY = event.touches[0].clientY;
      }
    },
    
    // Chat methods
    openChatModalWithPatient(appointment) {
      // Create a patient object from appointment data
      const patient = {
        id: appointment.patient_id || appointment.id,
        patient_name: appointment.patient_name,
        patient_phone: appointment.patient_phone
      };
      this.selectedChatPatient = patient;
      this.showChatModal = true;
      this.chatMessages = [
        {
          id: 1,
          sender: 'doctor',
          text: `Hello ${appointment.patient_name}! I'm Dr. ${localStorage.getItem('doctor_name') || 'Doctor'}. How can I help you today regarding your appointment?`,
          timestamp: new Date()
        }
      ];
      // Auto scroll to bottom when opened
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    
    closeChatModal() {
      this.showChatModal = false;
      this.selectedChatPatient = null;
      this.chatMessages = [];
      this.newMessage = '';
    },
    
    sendMessage() {
      if (!this.newMessage.trim()) return;
      
      const message = {
        id: Date.now(),
        sender: 'doctor',
        text: this.newMessage.trim(),
        timestamp: new Date()
      };
      
      this.chatMessages.push(message);
      this.newMessage = '';
      
      // Auto scroll to bottom after sending
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
      // Simulate patient response (remove this in real implementation)
      setTimeout(() => {
        this.chatMessages.push({
          id: Date.now(),
          sender: 'patient',
          text: 'Thank you for reaching out, Doctor. I appreciate your help.',
          timestamp: new Date()
        });
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }, 2000);
    },
    
    scrollToBottom() {
      if (this.$refs.chatMessages) {
        this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
      }
    },
    
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.appointments-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* Header Section */
.appointments-header {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 20%);
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.header-info .page-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.5rem;
}

.header-info .page-subtitle {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  min-width: 120px;
  box-shadow: 0 8px 25px rgb(102 126 234 / 30%);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgb(102 126 234 / 40%);
}

.stat-card.pending {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 8px 25px rgb(245 87 108 / 30%);
}

.stat-card.pending:hover {
  box-shadow: 0 15px 35px rgb(245 87 108 / 40%);
}

.stat-card.confirmed {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 8px 25px rgb(79 172 254 / 30%);
}

.stat-card.confirmed:hover {
  box-shadow: 0 15px 35px rgb(79 172 254 / 40%);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

/* Filters Section */
.filters-section {
  margin-bottom: 2rem;
}

.filters-container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgb(0 0 0 / 10%);
}

.search-bar {
  flex: 1;
}

.search-input-wrapper {
  position: relative;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #f9fafb;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-width: 140px;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
}

.refresh-btn {
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(102 126 234 / 30%);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 18px;
  height: 18px;
}

.refresh-btn svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Loading and Error States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgb(0 0 0 / 10%);
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-spinner p {
  color: #6b7280;
  font-size: 1.1rem;
}

.error-container {
  display: flex;
  justify-content: center;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgb(0 0 0 / 10%);
}

.error-message {
  text-align: center;
  max-width: 400px;
}

.error-message svg {
  width: 64px;
  height: 64px;
  color: #ef4444;
  margin-bottom: 1rem;
}

.error-message h3 {
  color: #374151;
  margin-bottom: 0.5rem;
}

.error-message p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.retry-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(102 126 234 / 30%);
}

/* Appointments List */
.appointments-list {
  display: grid;
  gap: 1.5rem;
}

.appointment-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgb(0 0 0 / 10%);
  border-left: 6px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.appointment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgb(102 126 234 / 20%), transparent);
}

.appointment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgb(0 0 0 / 15%);
}

.appointment-card.pending {
  border-left-color: #f59e0b;
  background: linear-gradient(135deg, rgb(245 158 11 / 5%) 0%, white 100%);
}

.appointment-card.confirmed {
  border-left-color: #10b981;
  background: linear-gradient(135deg, rgb(16 185 129 / 5%) 0%, white 100%);
}

.appointment-card.completed {
  border-left-color: #6366f1;
  background: linear-gradient(135deg, rgb(99 102 241 / 5%) 0%, white 100%);
}

.appointment-card.cancelled {
  border-left-color: #ef4444;
  background: linear-gradient(135deg, rgb(239 68 68 / 5%) 0%, white 100%);
}

/* Appointment Header */
.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.patient-info {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
}

.patient-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 8px 25px rgb(102 126 234 / 30%);
}

.patient-details h3 {
  margin: 0 0 0.25rem;
  color: #374151;
  font-size: 1.3rem;
  font-weight: 600;
}

.patient-details p {
  margin: 0.1rem 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.appointment-status {
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.pending {
  background: rgb(245 158 11 / 10%);
  color: #d97706;
  border: 2px solid rgb(245 158 11 / 20%);
}

.status-badge.confirmed {
  background: rgb(16 185 129 / 10%);
  color: #059669;
  border: 2px solid rgb(16 185 129 / 20%);
}

.status-badge.completed {
  background: rgb(99 102 241 / 10%);
  color: #4f46e5;
  border: 2px solid rgb(99 102 241 / 20%);
}

.status-badge.cancelled {
  background: rgb(239 68 68 / 10%);
  color: #dc2626;
  border: 2px solid rgb(239 68 68 / 20%);
}

/* Appointment Details */
.appointment-details {
  margin-bottom: 1.5rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.detail-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
  margin-top: 2px;
  flex-shrink: 0;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  color: #374151;
  font-weight: 500;
  font-size: 0.95rem;
}

/* Action Buttons */
.appointment-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / 30%), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn:disabled::before {
  display: none;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.approve-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 15px rgb(16 185 129 / 30%);
}

.approve-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(16 185 129 / 40%);
}

.reject-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 15px rgb(239 68 68 / 30%);
}

.reject-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(239 68 68 / 40%);
}

.reschedule-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 4px 15px rgb(139 92 246 / 30%);
}

.reschedule-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(139 92 246 / 40%);
}

.complete-btn {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  box-shadow: 0 4px 15px rgb(99 102 241 / 30%);
}

.complete-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(99 102 241 / 40%);
}

.contact-btn {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: white;
  box-shadow: 0 4px 15px rgb(6 182 212 / 30%);
}

.contact-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(6 182 212 / 40%);
}

.chat-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 15px rgb(16 185 129 / 30%);
}

.chat-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(16 185 129 / 40%);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgb(0 0 0 / 10%);
}

.empty-state-icon {
  margin: 0 auto 1.5rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.empty-state-icon svg {
  width: 40px;
  height: 40px;
}

.empty-state h3 {
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.clear-filters-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(102 126 234 / 30%);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 60%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: 1rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.reschedule-modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgb(0 0 0 / 20%);
  transform: scale(0.9);
  animation: modalOpen 0.3s ease forwards;
}

@keyframes modalOpen {
  to {
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #374151;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #6b7280;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.modal-content {
  padding: 2rem;
}

.patient-summary {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;
}

.patient-summary h4 {
  margin: 0 0 0.5rem;
  color: #374151;
}

.patient-summary p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.reschedule-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f9fafb;
  -webkit-appearance: none;
  appearance: none;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
}

.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(102 126 234 / 30%);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #374151;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (width <= 768px) {
  .appointments-container {
    padding: 5rem 1rem 1rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    align-items: stretch;
    gap: 1.5rem;
  }

  .header-stats {
    justify-content: center;
    flex-wrap: wrap;
  }

  .filters-container {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .filter-controls {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .search-input-wrapper {
    max-width: none;
  }

  .appointment-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    text-align: center;
  }

  .patient-info {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .appointment-actions {
    flex-direction: column;
    justify-content: center;
  }

  .action-btn {
    flex: 1;
    min-width: 120px;
  }

  .reschedule-modal {
    width: 95%;
    max-height: 95vh;
    margin: 1rem;
    border-radius: 16px;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-header h3 {
    font-size: 1.25rem;
  }

  .modal-content {
    padding: 1rem 1.5rem;
  }

  .patient-summary {
    padding: 0.75rem;
    margin-bottom: 1rem;
  }

  .reschedule-form {
    gap: 1rem;
  }

  .form-input,
  .form-select,
  .form-textarea {
    padding: 0.75rem;
    font-size: 1rem;
  }

  .modal-actions {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .submit-btn,
  .cancel-btn {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
}

@media (width <= 480px) {
  .appointments-container {
    padding: 4.5rem 0.5rem 0.5rem;
  }

  .appointments-header, .filters-container, .appointment-card, .empty-state {
    padding: 1.5rem;
  }

  .appointments-header,
  .filters-container,
  .appointment-card {
    border-radius: 12px;
  }

  .header-info .page-title {
    font-size: 2rem;
  }

  .stat-card {
    min-width: 100px;
    padding: 1rem;
  }

  .appointment-card {
    padding: 1.5rem;
  }

  .reschedule-modal {
    width: 98%;
    max-height: 98vh;
    margin: 0.5rem;
    border-radius: 12px;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-header h3 {
    font-size: 1.1rem;
  }

  .modal-content {
    padding: 1rem;
  }

  .patient-summary {
    padding: 0.75rem;
    margin-bottom: 1rem;
  }

  .patient-summary h4 {
    font-size: 1rem;
  }

  .patient-summary p {
    font-size: 0.85rem;
  }

  .form-group label {
    font-size: 0.85rem;
  }

  .form-input,
  .form-select,
  .form-textarea {
    padding: 0.625rem;
    font-size: 0.9rem;
  }

  .form-textarea {
    min-height: 70px;
  }

  .submit-btn,
  .cancel-btn {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }
}

/* Chat Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.chat-modal {
  background: white;
  border-radius: 16px;
  width: 90vw;
  max-width: 600px;
  height: 80vh;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgb(0 0 0 / 25%);
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.chat-patient-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chat-patient-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgb(255 255 255 / 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.avatar-initials {
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
}

.chat-patient-details h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.chat-patient-details p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.8;
}

.close-btn {
  background: rgb(255 255 255 / 10%);
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgb(255 255 255 / 20%);
  transform: scale(1.05);
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: linear-gradient(to bottom, #f8fafc 0%, #fff 100%);
}

.chat-welcome {
  text-align: center;
  padding: 2rem;
  color: #64748b;
}

.welcome-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.welcome-avatar .avatar-initials {
  font-size: 1.5rem;
  font-weight: 700;
}

.chat-welcome h3 {
  margin: 0 0 0.5rem;
  color: #1e293b;
  font-size: 1.25rem;
}

.chat-welcome p {
  margin: 0;
  font-size: 0.875rem;
}

.message {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.3s ease;
}

.message.doctor {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message.doctor .message-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.message.patient .message-avatar {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.message-avatar .avatar-initials {
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.message-content {
  flex: 1;
  max-width: 70%;
}

.message.doctor .message-content {
  text-align: right;
}

.message-text {
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1e293b;
  border: 1px solid #e2e8f0;
}

.message.doctor .message-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.message-time {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
  padding: 0 0.5rem;
}

.chat-input {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.input-container {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  resize: none;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
}

.message-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
}

.send-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgb(102 126 234 / 30%);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.send-btn svg {
  width: 20px;
  height: 20px;
}

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

/* Responsive Chat Modal */
@media (width <= 768px) {
  .chat-modal {
    width: 95vw;
    height: 90vh;
    border-radius: 12px;
  }
  
  .chat-header {
    padding: 1rem;
  }
  
  .chat-messages {
    padding: 1rem;
  }
  
  .chat-input {
    padding: 1rem;
  }
  
  .message-content {
    max-width: 85%;
  }
}
</style>