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
          
          <button class="action-btn contact-btn" @click="contactPatient(appointment)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
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
    <div v-if="showRescheduleModal" class="modal-overlay" @click="closeRescheduleModal">
      <div class="reschedule-modal" @click.stop>
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
                :min="getTomorrowDate()"
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
  </div>
</template>

<script>
import axios from 'axios'

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
      }
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
      this.loading = true;
      this.error = null;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/doctor/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.appointments = response.data.appointments;
          this.filteredAppointments = this.appointments;
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
        this.error = 'Failed to load appointments. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async approveAppointment(appointmentId) {
      this.processingAppointment = appointmentId;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/api/doctor/appointments/${appointmentId}/approve`, 
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          // Update the appointment status locally
          const appointment = this.appointments.find(apt => apt.id === appointmentId);
          if (appointment) {
            appointment.status = 'CONFIRMED';
          }
          this.filterAppointments();
          
          // Show success message
          this.$toast?.success('Appointment approved successfully!');
        }
      } catch (error) {
        console.error('Error approving appointment:', error);
        this.$toast?.error('Failed to approve appointment. Please try again.');
      } finally {
        this.processingAppointment = null;
      }
    },

    async rejectAppointment(appointmentId) {
      this.processingAppointment = appointmentId;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/api/doctor/appointments/${appointmentId}/reject`, 
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
        }
      } catch (error) {
        console.error('Error rejecting appointment:', error);
        this.$toast?.error('Failed to reject appointment. Please try again.');
      } finally {
        this.processingAppointment = null;
      }
    },

    async completeAppointment(appointmentId) {
      this.processingAppointment = appointmentId;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/api/doctor/appointments/${appointmentId}/complete`, 
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
        }
      } catch (error) {
        console.error('Error completing appointment:', error);
        this.$toast?.error('Failed to complete appointment. Please try again.');
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
      this.rescheduleForm = {
        date: '',
        time: '',
        reason: ''
      };
    },

    async submitReschedule() {
      this.submittingReschedule = true;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/api/doctor/appointments/${this.selectedAppointment.id}/reschedule`,
          {
            new_date: this.rescheduleForm.date,
            new_time: this.rescheduleForm.time,
            reason: this.rescheduleForm.reason
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          // Update the appointment locally
          const appointment = this.appointments.find(apt => apt.id === this.selectedAppointment.id);
          if (appointment) {
            appointment.appointment_datetime = `${this.rescheduleForm.date} ${this.rescheduleForm.time}`;
          }
          this.filterAppointments();
          this.closeRescheduleModal();
          
          // Show success message
          this.$toast?.success('Appointment rescheduled successfully!');
        }
      } catch (error) {
        console.error('Error rescheduling appointment:', error);
        this.$toast?.error('Failed to reschedule appointment. Please try again.');
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
    }
  }
};
</script>

<style scoped>
.appointments-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* Header Section */
.appointments-header {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.5rem 0;
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.stat-card.pending {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 8px 25px rgba(245, 87, 108, 0.3);
}

.stat-card.pending:hover {
  box-shadow: 0 15px 35px rgba(245, 87, 108, 0.4);
}

.stat-card.confirmed {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);
}

.stat-card.confirmed:hover {
  box-shadow: 0 15px 35px rgba(79, 172, 254, 0.4);
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
}

.appointment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.appointment-card.pending {
  border-left-color: #f59e0b;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, white 100%);
}

.appointment-card.confirmed {
  border-left-color: #10b981;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, white 100%);
}

.appointment-card.completed {
  border-left-color: #6366f1;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, white 100%);
}

.appointment-card.cancelled {
  border-left-color: #ef4444;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, white 100%);
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.patient-details h3 {
  margin: 0 0 0.25rem 0;
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
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
  border: 2px solid rgba(245, 158, 11, 0.2);
}

.status-badge.confirmed {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 2px solid rgba(16, 185, 129, 0.2);
}

.status-badge.completed {
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  border: 2px solid rgba(99, 102, 241, 0.2);
}

.status-badge.cancelled {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 2px solid rgba(239, 68, 68, 0.2);
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
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
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.approve-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.reject-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.reject-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

.reschedule-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.reschedule-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.complete-btn {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.complete-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.contact-btn {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
}

.contact-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(6, 182, 212, 0.4);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.reschedule-modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
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
  margin: 0 0 0.5rem 0;
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
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
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
@media (max-width: 768px) {
  .appointments-container {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .header-stats {
    justify-content: center;
    flex-wrap: wrap;
  }

  .filters-container {
    flex-direction: column;
    gap: 1rem;
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
    gap: 1rem;
    text-align: center;
  }

  .patient-info {
    flex-direction: column;
    text-align: center;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .appointment-actions {
    justify-content: center;
  }

  .action-btn {
    flex: 1;
    min-width: 120px;
  }

  .modal-content {
    padding: 1rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .submit-btn,
  .cancel-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .appointments-container {
    padding: 0.5rem;
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
}
</style>