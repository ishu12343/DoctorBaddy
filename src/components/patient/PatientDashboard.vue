<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <span class="brand-text">PatientBuddy</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <ul class="nav-list">
            <li class="nav-item">
              <button 
                class="nav-btn" 
                :class="{ 'active': showHome }"
                @click="goHome"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                <span class="nav-text">Dashboard</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button 
                class="nav-btn"
                :class="{ 'active': showAppointments }"
                @click="goToAppointments"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <span class="nav-text">Appointments</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button class="nav-btn">
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <span class="nav-text">Medical Records</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button class="nav-btn">
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                  </svg>
                </div>
                <span class="nav-text">Settings</span>
                <div class="nav-indicator"></div>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Header with User Profile -->
      <header class="top-header">
        <div class="header-left">
          <span class="dashboard-title">Patient Dashboard</span>
          <!-- Edit Profile Button in Navbar -->
          <button 
            v-if="showProfile" 
            class="navbar-edit-btn" 
            @click="toggleProfileEdit"
            :class="{ 'active': isProfileEditing }"
          >
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit Profile
          </button>
        </div>
        <div class="header-right">
          <div class="header-user-profile" @click="toggleUserDropdown" :class="{ 'dropdown-open': showUserDropdown }">
            <div class="header-user-info">
              <span class="header-user-name">{{ patientInfo?.full_name || 'Patient' }}</span>
              <span class="header-user-specialty">{{ getPatientDisplayInfo() }}</span>
            </div>
            <div class="header-user-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div class="dropdown-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <!-- Dropdown Menu -->
            <div v-if="showUserDropdown" class="user-dropdown-menu">
              <button @click="goProfile" class="dropdown-menu-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>View Profile</span>
              </button>
              <div class="dropdown-divider"></div>
              <button @click="logout" class="dropdown-signout-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="content-wrapper">
        <!-- Profile Page - Show only profile when profile is selected -->
        <template v-if="showProfile">
          <PatientProfileCard ref="profileCard" :is-editing-prop="isProfileEditing" @update:editing="isProfileEditing = $event" />
        </template>

        <!-- Appointments Page -->
        <template v-else-if="showAppointments">
          <div class="appointments-container">
            <div class="appointments-header">
              <h2 class="page-title">My Appointments</h2>
              <p class="page-subtitle">Manage your upcoming and past appointments</p>
            </div>

            <!-- Loading State -->
            <div v-if="loadingAppointments" class="loading-container">
              <div class="loading-spinner"></div>
              <p>Loading appointments...</p>
            </div>

            <!-- Appointments List -->
            <div v-else class="appointments-list">
              <div 
                v-for="appointment in appointments" 
                :key="appointment.id" 
                class="appointment-card"
                :class="{ 
                  'pending': appointment.status === 'PENDING',
                  'confirmed': appointment.status === 'CONFIRMED',
                  'cancelled': appointment.status === 'CANCELLED',
                  'completed': appointment.status === 'COMPLETED'
                }"
              >
                <div class="appointment-header">
                  <div class="appointment-doctor">
                    <h4>{{ appointment.doctor_name.startsWith('Dr.') ? appointment.doctor_name : 'Dr. ' + appointment.doctor_name }}</h4>
                    <p class="specialty">{{ appointment.specialty }}</p>
                  </div>
                  <div class="appointment-status">
                    <span class="status-badge">{{ appointment.status }}</span>
                  </div>
                </div>

                <div class="appointment-details">
                  <div class="detail-item">
                    <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{{ formatDateTime(appointment.appointment_datetime) }}</span>
                  </div>
                  
                  <div class="detail-item">
                    <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{{ appointment.clinic_name }}</span>
                  </div>
                  
                  <div class="detail-item" v-if="appointment.reason">
                    <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    <span>{{ appointment.reason }}</span>
                  </div>
                </div>

                <div class="appointment-actions" v-if="appointment.status === 'PENDING' || appointment.status === 'CONFIRMED'">
                  <button 
                    class="cancel-btn"
                    @click="cancelAppointment(appointment.id)"
                    :disabled="cancellingAppointment === appointment.id"
                  >
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    {{ cancellingAppointment === appointment.id ? 'Cancelling...' : 'Cancel' }}
                  </button>
                  
                  <!-- Chat button for doctor -->
                  <button 
                    class="chat-btn"
                    @click="openChatModalFromAppointment(appointment)"
                  >
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    Chat with Doctor
                  </button>
                  
                  <!-- Only show doctor contact button for confirmed appointments -->
                  <button v-if="appointment.status === 'CONFIRMED'" class="contact-doctor-btn">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    {{ appointment.doctor_mobile }}
                  </button>
                </div>

                <!-- Actions for completed appointments -->
                <div class="appointment-actions" v-if="appointment.status === 'COMPLETED'">
                  <button 
                    class="chat-btn"
                    @click="openChatModalFromAppointment(appointment)"
                  >
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    Chat with Doctor
                  </button>
                  
                  <button 
                    class="rate-btn"
                    @click="openRatingModal(appointment)"
                    v-if="!appointment.has_rating"
                  >
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                    Rate Doctor
                  </button>
                  
                  <span v-else class="rating-completed">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                    Rated
                  </span>
                </div>

                <!-- Actions for cancelled appointments -->
                <div class="appointment-actions" v-if="appointment.status === 'CANCELLED'">
                  <button 
                    class="chat-btn"
                    @click="openChatModalFromAppointment(appointment)"
                  >
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    Chat with Doctor
                  </button>
                  
                  <button 
                    class="reschedule-btn"
                    @click="openRescheduleModal(appointment)"
                  >
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      <polyline points="9,22 9,12 15,12 15,22"/>
                      <path d="M1 12l6-6 6 6"/>
                    </svg>
                    Reschedule Appointment
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loadingAppointments && appointments.length === 0" class="empty-state">
              <div class="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3>No appointments yet</h3>
              <p>Book your first appointment with a doctor</p>
              <button class="cta-btn" @click="goHome">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Find Doctors
              </button>
            </div>
          </div>
        </template>

        <!-- Dashboard Home - Show only when home is selected -->
        <template v-else-if="showHome">
          <div class="doctors-container">
            <div class="doctors-header">
              <h2 class="page-title">Find & Book Doctors</h2>
              <p class="page-subtitle">Search and book appointments with qualified healthcare professionals</p>
              
              <!-- Search and Filter Section -->
              <div class="search-filters">
                <div class="search-bar">
                  <div class="search-input-wrapper">
                    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input 
                      v-model="searchQuery"
                      type="text" 
                      placeholder="Search doctors by name or specialty..."
                      class="search-input"
                      @input="searchDoctors"
                    />
                  </div>
                </div>
                
                <div class="filter-section">
                  <select v-model="selectedSpecialty" @change="searchDoctors" class="filter-select">
                    <option value="">All Specialties</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="ENT">ENT</option>
                  </select>
                  
                  <button class="refresh-btn" @click="loadDoctors" :disabled="loading">
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
                <p>Loading doctors...</p>
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
                <h3>Unable to load doctors</h3>
                <p>{{ error }}</p>
                <button @click="loadDoctors" class="retry-btn">Try Again</button>
              </div>
            </div>

            <!-- Doctors Grid -->
            <div v-else-if="filteredDoctors.length > 0" class="doctors-grid">
              <div 
                v-for="doctor in filteredDoctors" 
                :key="doctor.id" 
                class="doctor-card"
                @click="selectDoctor(doctor)"
              >
                <!-- Card Header with Status -->
                <div class="card-header">
                  <div class="doctor-status">
                    <div :class="['status-indicator', getAvailabilityStatus(doctor)]"></div>
                    <span :class="['status-text', getAvailabilityStatus(doctor)]">{{ getAvailabilityStatusText(doctor) }}</span>
                  </div>
                  <div class="card-favorite">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                </div>

                <!-- Doctor Profile Section -->
                <div class="doctor-profile">
                  <div class="doctor-avatar">
                    <div class="avatar-background"></div>
                    <img 
                      v-if="doctor.profile_photo" 
                      :src="doctor.profile_photo" 
                      :alt="doctor.full_name"
                      class="doctor-profile-image"
                    />
                    <div v-else class="doctor-initials">
                      {{ getInitials(doctor.full_name) }}
                    </div>
                    <div class="online-indicator"></div>
                  </div>
                  
                  <div class="doctor-details">
                    <h3 class="doctor-name">{{ doctor.full_name.startsWith('Dr.') ? doctor.full_name : 'Dr. ' + doctor.full_name }}</h3>
                    <div class="doctor-specialty">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                      {{ doctor.specialty || doctor.specialization || 'General Medicine' }}
                    </div>
                    
                    <!-- Clinic Name -->
                    <div v-if="doctor.clinic_name" class="doctor-clinic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>
                      </svg>
                      {{ doctor.clinic_name }}
                    </div>
                    
                    <!-- Languages -->
                    <div v-if="doctor.languages" class="doctor-languages">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                      </svg>
                      {{ doctor.languages }}
                    </div>
                    
                    <div class="doctor-rating">
                      <div class="stars">
                        <div class="stars-fill" :style="`width: ${(doctor.average_rating / 5) * 100}%`">
                          <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <div class="stars-empty">
                          <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      </div>
                      <span class="rating-text">{{ doctor.average_rating || 'No ratings' }}</span>
                      <span class="review-count" v-if="doctor.total_reviews > 0">({{ doctor.total_reviews }})</span>
                      <span class="review-count" v-else>(No reviews)</span>
                    </div>
                  </div>
                </div>

                <!-- Quick Stats -->
                <div class="quick-stats">
                  <div class="stat-item">
                    <div class="stat-icon experience">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                    </div>
                    <div class="stat-info">
                      <span class="stat-value">{{ doctor.experience || '5+' }}</span>
                      <span class="stat-label">Years</span>
                    </div>
                  </div>
                  
                  <div class="stat-item">
                    <div class="stat-icon patients">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                        <path d="M16 3.13a4 4 0 010 7.75"/>
                      </svg>
                    </div>
                    <div class="stat-info">
                      <span class="stat-value">1.2k+</span>
                      <span class="stat-label">Patients</span>
                    </div>
                  </div>
                  
                  <div class="stat-item">
                    <div class="stat-icon location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div class="stat-info">
                      <span class="stat-value">{{ doctor.city || doctor.location || 'Not specified' }}</span>
                      <span class="stat-label">{{ doctor.state ? doctor.city + ', ' + doctor.state : 'Location' }}</span>
                    </div>
                  </div>
                </div>

                <!-- Available Days Section -->
                <div v-if="doctor.available_days" class="availability-info">
                  <h4 class="availability-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Available Days
                  </h4>
                  <p class="available-days">{{ doctor.available_days }}</p>
                  <div v-if="doctor.available_from || doctor.available_to" class="available-hours">
                    <span class="hours-label">Hours:</span>
                    <span class="hours-time">
                      {{ formatTimeString(doctor.available_from) }} - {{ formatTimeString(doctor.available_to) }}
                    </span>
                  </div>
                </div>

                <!-- Pricing & Availability -->
                <div class="pricing-availability">
                  <div class="price-section">
                    <div class="consultation-fee">
                      <span class="fee-amount">₹500</span>
                      <span class="fee-label">Consultation</span>
                    </div>
                    <div class="discount-badge">
                      20% OFF
                    </div>
                  </div>
                  
                  <div class="availability-section">
                    <div class="next-slot">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <span>{{ getAvailabilityText(doctor) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Contact Info -->
                <div class="contact-summary">
                  <div class="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <span>Contact after booking</span>
                  </div>
                  <div class="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{{ getFullAddress(doctor) }}</span>
                  </div>
                  <div class="clinic-info">
                    <span>{{ doctor.clinic_name || 'Private Practice' }}</span>
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="card-actions">
                  <button class="btn-primary" @click.stop="openBookingModal(doctor)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Book Now
                  </button>
                  <button class="btn-secondary" @click.stop="openChatModal(doctor)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    Chat
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="empty-state">
              <div class="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>No doctors found</h3>
              <p>Try adjusting your search criteria or check back later.</p>
              <button @click="clearFilters" class="clear-filters-btn">Clear Filters</button>
            </div>
          </div>
        </template>
      </div>

      <!-- Booking Modal -->
      <div v-if="showBookingModal" class="modal-overlay" @click="closeBookingModal">
        <div class="booking-modal" @click.stop>
          <div class="modal-header">
            <h3>Book Appointment</h3>
            <button class="close-btn" @click="closeBookingModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="modal-content">
            <div class="doctor-summary">
              <div class="doctor-avatar">
                <img 
                  v-if="selectedDoctor?.profile_photo" 
                  :src="selectedDoctor.profile_photo" 
                  :alt="selectedDoctor.full_name"
                  class="doctor-profile-image"
                />
                <div v-else class="doctor-initials">
                  {{ selectedDoctor ? getInitials(selectedDoctor.full_name) : '' }}
                </div>
              </div>
              <div class="doctor-info">
                <h4>{{ selectedDoctor?.full_name.startsWith('Dr.') ? selectedDoctor.full_name : 'Dr. ' + selectedDoctor?.full_name }}</h4>
                <p>{{ selectedDoctor?.specialty || selectedDoctor?.specialization }}</p>
                <p v-if="selectedDoctor?.clinic_name">{{ selectedDoctor.clinic_name }}</p>
                <p v-if="selectedDoctor?.city || selectedDoctor?.state">
                  {{ [selectedDoctor?.city, selectedDoctor?.state].filter(Boolean).join(', ') }}
                </p>
                <p v-if="selectedDoctor?.available_days" class="available-info">
                  <strong>Available:</strong> {{ selectedDoctor.available_days }}
                </p>
              </div>
            </div>

            <form @submit.prevent="bookAppointment" class="booking-form">
              <div class="form-group">
                <label for="appointment-date">Appointment Date</label>
                <input 
                  id="appointment-date"
                  v-model="bookingForm.date"
                  type="date" 
                  required
                  :min="getTomorrowDate()"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="appointment-time">Appointment Time</label>
                <select 
                  id="appointment-time"
                  v-model="bookingForm.time"
                  required
                  class="form-select"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>

              <div class="form-group">
                <label for="appointment-reason">Reason for Visit</label>
                <textarea 
                  id="appointment-reason"
                  v-model="bookingForm.reason"
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  required
                  rows="4"
                  class="form-textarea"
                ></textarea>
              </div>

              <div class="form-actions">
                <button type="button" @click="closeBookingModal" class="cancel-btn">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="submit-btn"
                  :disabled="submittingBooking"
                >
                  {{ submittingBooking ? 'Booking...' : 'Book Appointment' }}
                </button>
              </div>
            </form>
          </div>
        </div>
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
            <div class="doctor-summary">
              <h4>Doctor: {{ selectedAppointment?.doctor_name }}</h4>
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

      <!-- Chat Modal -->
      <div v-if="showChatModal" class="modal-overlay" @click="closeChatModal">
        <div class="chat-modal" @click.stop>
          <div class="chat-header">
            <div class="chat-doctor-info">
              <div class="chat-doctor-avatar">
                <div class="doctor-initials">
                  {{ selectedChatDoctor ? getInitials(selectedChatDoctor.full_name) : '' }}
                </div>
                <div class="online-indicator-small"></div>
              </div>
              <div class="chat-doctor-details">
                <h4>{{ selectedChatDoctor ? (selectedChatDoctor.full_name.startsWith('Dr.') ? selectedChatDoctor.full_name : 'Dr. ' + selectedChatDoctor.full_name) : '' }}</h4>
                <p>{{ selectedChatDoctor?.specialization }}</p>
                <span class="online-status">Online now</span>
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
            <div class="chat-welcome">
              <div class="welcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </div>
              <h3>Start conversation with {{ selectedChatDoctor ? (selectedChatDoctor.full_name.startsWith('Dr.') ? selectedChatDoctor.full_name : 'Dr. ' + selectedChatDoctor.full_name) : '' }}</h3>
              <p>Feel free to ask any health-related questions. This doctor is available to help you.</p>
            </div>
            
            <div v-for="message in chatMessages" :key="message.id" :class="['message', message.sender]">
              <div class="message-avatar" v-if="message.sender === 'doctor'">
                <div class="doctor-initials-small">
                  {{ selectedChatDoctor ? getInitials(selectedChatDoctor.full_name) : '' }}
                </div>
              </div>
              <div class="message-content">
                <div class="message-bubble">
                  <p>{{ message.text }}</p>
                  <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                </div>
              </div>
              <div class="message-avatar" v-if="message.sender === 'patient'">
                <div class="patient-initials-small">
                  {{ patientInfo ? getInitials(patientInfo.full_name) : 'P' }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="chat-input-section">
            <div class="chat-input-container">
              <button class="attachment-btn" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 01-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>
              <input 
                type="text" 
                v-model="newMessage" 
                @keypress.enter="sendMessage"
                placeholder="Type your message here..."
                class="chat-input"
              />
              <button 
                class="send-btn" 
                @click="sendMessage"
                :disabled="!newMessage.trim()"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
              </button>
            </div>
            <div class="chat-suggestions">
              <button 
                v-for="suggestion in chatSuggestions" 
                :key="suggestion"
                @click="sendSuggestion(suggestion)"
                class="suggestion-btn"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Rating Modal -->
      <div v-if="showRatingModal" class="modal-overlay" @click="closeRatingModal">
        <div class="rating-modal" @click.stop>
          <div class="modal-header">
            <h3>Rate Your Experience</h3>
            <button class="close-btn" @click="closeRatingModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div class="modal-content">
            <div v-if="selectedAppointmentForRating" class="doctor-summary">
              <h4>Dr. {{ selectedAppointmentForRating.doctor_name }}</h4>
              <p>{{ selectedAppointmentForRating.specialty }}</p>
              <p class="appointment-info">
                {{ formatAppointmentDate(selectedAppointmentForRating.appointment_datetime) }}
              </p>
            </div>
            
            <form @submit.prevent="submitRating" class="rating-form">
              <div class="form-group">
                <label>Rate your experience (1-5 stars):</label>
                <div class="star-rating">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    class="star-btn"
                    :class="{ 'active': star <= selectedRating }"
                    @click="selectRating(star)"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  </button>
                </div>
                <p class="rating-label">{{ getRatingLabel(selectedRating) }}</p>
              </div>
              
              <div class="form-group">
                <label for="review">Write a review (optional):</label>
                <textarea
                  id="review"
                  v-model="reviewText"
                  placeholder="Share your experience with this doctor..."
                  rows="4"
                  class="form-textarea"
                ></textarea>
              </div>
              
              <div class="form-actions">
                <button type="button" class="cancel-btn" @click="closeRatingModal">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="submit-btn" 
                  :disabled="!selectedRating || submittingRating"
                >
                  {{ submittingRating ? 'Submitting...' : 'Submit Rating' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import PatientProfileCard from './PatientProfileCard.vue';

export default {
  components: {
    PatientProfileCard
  },
  data() {
    return {
      showProfile: false,
      showHome: true, // Start with dashboard view
      showAppointments: false,
      showUserDropdown: false,
      isProfileEditing: false, // Track profile editing state
      patientInfo: null, // Store patient information
      
      // Doctors data
      doctors: [],
      filteredDoctors: [],
      loadingDoctors: false,
      loading: false,
      error: null,
      searchQuery: '',
      selectedSpecialty: '',
      selectedCity: '',
      
      // Appointments data
      appointments: [],
      loadingAppointments: false,
      cancellingAppointment: null,
      refreshInterval: null, // For auto-refreshing appointments
      
      // Booking modal
      showBookingModal: false,
      selectedDoctor: null,
      submittingBooking: false,
      bookingForm: {
        date: '',
        time: '',
        reason: ''
      },
      
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
      selectedChatDoctor: null,
      chatMessages: [],
      newMessage: '',
      chatSuggestions: [
        "What are your consultation hours?",
        "Can you help with my symptoms?",
        "What should I bring to the appointment?",
        "Do you accept insurance?"
      ],
      
      // Rating modal
      showRatingModal: false,
      selectedAppointmentForRating: null,
      selectedRating: 0,
      reviewText: '',
      submittingRating: false
    };
  },
  mounted() {
    // Add click outside listener for dropdown
    document.addEventListener('click', this.handleClickOutside);
    // Fetch patient information
    this.fetchPatientInfo();
    // Load doctors for the dashboard
    this.loadDoctors();
    // Start auto-refresh for appointments when viewing appointments
    this.startAppointmentRefresh();
  },
  beforeUnmount() {
    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside);
    // Clear appointment refresh interval
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  },
  methods: {
    async logout() {
      this.showUserDropdown = false; // Close dropdown
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://127.0.0.1:5000/api/patient/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Logout API error:', err);
      }
      localStorage.removeItem('token');
      this.$router.replace('/');
    },
    
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },
    
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.header-user-profile');
      if (dropdown && !dropdown.contains(event.target)) {
        this.showUserDropdown = false;
      }
    },
    
    // Navigation methods
    goProfile() {
      this.resetViews();
      this.showProfile = true;
      this.showUserDropdown = false; // Close dropdown
    },
    
    goHome() {
      this.resetViews();
      this.showHome = true;
    },
    
    goToAppointments() {
      this.resetViews();
      this.showAppointments = true;
      this.fetchAppointments();
    },
    
    resetViews() {
      this.showHome = false;
      this.showProfile = false;
      this.showAppointments = false;
    },
    
    // Fetch patient info
    async fetchPatientInfo() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/patient/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data?.patient) {
          this.patientInfo = response.data.patient;
        }
      } catch (error) {
        console.error('Error fetching patient info:', error);
      }
    },
    
    getPatientDisplayInfo() {
      if (!this.patientInfo) return 'Healthcare Access';
      
      // Create a meaningful display string based on available patient info
      const parts = [];
      
      if (this.patientInfo.blood_group) {
        parts.push(`Blood Group: ${this.patientInfo.blood_group}`);
      }
      
      if (this.patientInfo.gender) {
        parts.push(this.patientInfo.gender);
      }
      
      if (this.patientInfo.city) {
        parts.push(this.patientInfo.city);
      }
      
      return parts.length > 0 ? parts.join(' • ') : 'Healthcare Access';
    },
    
    toggleProfileEdit() {
      this.isProfileEditing = !this.isProfileEditing;
      // Emit event to child component or use refs to trigger edit mode
      this.$refs.profileCard?.toggleEdit();
    },
    
    // Doctor related methods
    loadDoctors() {
      this.fetchDoctors();
    },
    
    async fetchDoctors() {
      this.loading = true;
      this.error = null;
      const token = localStorage.getItem('token');
      
      try {
        const params = new URLSearchParams();
        if (this.selectedSpecialty) params.append('specialty', this.selectedSpecialty);
        if (this.selectedCity) params.append('city', this.selectedCity);
        if (this.searchQuery) params.append('search', this.searchQuery);
        
        const response = await axios.get(`http://127.0.0.1:5000/api/patient/doctors?${params}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.doctors = response.data.doctors;
          this.filteredDoctors = this.doctors;
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        this.error = 'Failed to load doctors. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    searchDoctors() {
      // Debounce the search
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.fetchDoctors();
      }, 300);
    },
    
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    },
    
    clearFilters() {
      this.searchQuery = '';
      this.selectedSpecialty = '';
      this.selectedCity = '';
      this.loadDoctors();
    },
    
    selectDoctor(doctor) {
      // You can add additional logic here if needed
      console.log('Selected doctor:', doctor);
    },
    
    // Booking modal methods
    openBookingModal(doctor) {
      this.selectedDoctor = doctor;
      this.showBookingModal = true;
      this.bookingForm = {
        date: '',
        time: '',
        reason: ''
      };
    },
    
    closeBookingModal() {
      this.showBookingModal = false;
      this.selectedDoctor = null;
      this.bookingForm = {
        date: '',
        time: '',
        reason: ''
      };
    },
    
    getTomorrowDate() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    },
    
    async bookAppointment() {
      this.submittingBooking = true;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/patient/appointments/book', {
          doctor_id: this.selectedDoctor.id,
          appointment_date: this.bookingForm.date,
          appointment_time: this.bookingForm.time,
          reason: this.bookingForm.reason
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          alert(`Appointment booked successfully with Dr. ${response.data.doctor_name}!`);
          this.closeBookingModal();
          // Refresh appointments if we're on that page
          if (this.showAppointments) {
            this.fetchAppointments();
          }
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        const errorMessage = error.response?.data?.error || 'Failed to book appointment';
        alert(errorMessage);
      } finally {
        this.submittingBooking = false;
      }
    },
    
    // Appointments methods
    async fetchAppointments() {
      this.loadingAppointments = true;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/patient/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.appointments = response.data.appointments;
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        alert('Failed to load appointments. Please try again.');
      } finally {
        this.loadingAppointments = false;
      }
    },
    
    async cancelAppointment(appointmentId) {
      if (!confirm('Are you sure you want to cancel this appointment?')) return;
      
      this.cancellingAppointment = appointmentId;
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.put(`http://127.0.0.1:5000/api/patient/appointments/${appointmentId}/cancel`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          alert('Appointment cancelled successfully');
          this.fetchAppointments(); // Refresh the list
        }
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        const errorMessage = error.response?.data?.error || 'Failed to cancel appointment';
        alert(errorMessage);
      } finally {
        this.cancellingAppointment = null;
      }
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
          `http://127.0.0.1:5000/api/patient/appointments/${this.selectedAppointment.id}/reschedule`,
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
            appointment.status = 'PENDING'; // Reset status to pending after reschedule
          }
          this.closeRescheduleModal();
          
          // Show success message
          alert('Appointment rescheduled successfully! The doctor will confirm the new time.');
        }
      } catch (error) {
        console.error('Error rescheduling appointment:', error);
        const errorMessage = error.response?.data?.error || 'Failed to reschedule appointment. Please try again.';
        alert(errorMessage);
      } finally {
        this.submittingReschedule = false;
      }
    },
    
    formatDateTime(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    // Auto-refresh methods for appointments
    startAppointmentRefresh() {
      // Refresh appointments every 30 seconds when appointments view is active
      this.refreshInterval = setInterval(() => {
        if (this.showAppointments && !this.loadingAppointments) {
          this.fetchAppointments();
        }
      }, 30000); // 30 seconds
    },
    
    stopAppointmentRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
    },
    
    // Chat methods
    openChatModal(doctor) {
      this.selectedChatDoctor = doctor;
      this.showChatModal = true;
      this.chatMessages = [
        {
          id: 1,
          sender: 'doctor',
          text: `Hello! I'm ${doctor.full_name.startsWith('Dr.') ? doctor.full_name : 'Dr. ' + doctor.full_name}. How can I help you today?`,
          timestamp: new Date()
        }
      ];
      // Auto scroll to bottom when opened
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    
    openChatModalFromAppointment(appointment) {
      // Create a doctor object from appointment data
      const doctor = {
        id: appointment.doctor_id || appointment.id, // Use doctor_id if available, fallback to appointment id
        full_name: appointment.doctor_name,
        specialization: appointment.specialization || 'General Medicine',
        mobile: appointment.doctor_mobile
      };
      this.openChatModal(doctor);
    },
    
    closeChatModal() {
      this.showChatModal = false;
      this.selectedChatDoctor = null;
      this.chatMessages = [];
      this.newMessage = '';
    },
    
    sendMessage() {
      if (!this.newMessage.trim()) return;
      
      const message = {
        id: this.chatMessages.length + 1,
        sender: 'patient',
        text: this.newMessage.trim(),
        timestamp: new Date()
      };
      
      this.chatMessages.push(message);
      this.newMessage = '';
      
      // Auto scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
      // Simulate doctor response after a delay
      setTimeout(() => {
        this.simulateDoctorResponse();
      }, 1000 + Math.random() * 2000);
    },
    
    sendSuggestion(suggestion) {
      this.newMessage = suggestion;
      this.sendMessage();
    },
    
    simulateDoctorResponse() {
      const responses = [
        "Thank you for reaching out. Can you tell me more about your symptoms?",
        "I understand your concern. When did you first notice these symptoms?",
        "Based on what you've described, I'd recommend scheduling an appointment for a proper examination.",
        "That's a good question. Let me provide you with some helpful information.",
        "I'm here to help. Could you provide more details about your medical history?",
        "For a proper diagnosis, we should schedule a consultation. Would you like to book an appointment?"
      ];
      
      const response = {
        id: this.chatMessages.length + 1,
        sender: 'doctor',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      this.chatMessages.push(response);
      
      // Auto scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });
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
    },
    
    formatAppointmentDate(dateTimeString) {
      if (!dateTimeString) return 'Date not available';
      
      try {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
      }
    },
    
    getAvailabilityText(doctor) {
      // Check if doctor has availability data
      if (doctor.available_from && doctor.available_to) {
        const now = new Date();
        const availableFrom = this.convertTo12Hour(doctor.available_from);
        const availableTo = this.convertTo12Hour(doctor.available_to);
        
        // Check if currently available
        const currentTime = now.getHours() * 100 + now.getMinutes();
        const fromTime = this.timeStringToNumber(doctor.available_from);
        const toTime = this.timeStringToNumber(doctor.available_to);
        
        if (currentTime >= fromTime && currentTime <= toTime) {
          return `Available now (${availableFrom} - ${availableTo})`;
        } else {
          return `Available ${availableFrom} - ${availableTo}`;
        }
      }
      
      // Fallback if no availability data
      return 'Available today';
    },
    
    convertTo12Hour(time24) {
      if (!time24) return '';
      
      const [hours, minutes] = time24.split(':');
      const hour = parseInt(hours);
      
      if (hour === 0) {
        return `12:${minutes.padStart(2, '0')} AM`;
      } else if (hour < 12) {
        return `${hour}:${minutes.padStart(2, '0')} AM`;
      } else if (hour === 12) {
        return `12:${minutes.padStart(2, '0')} PM`;
      } else {
        return `${hour - 12}:${minutes.padStart(2, '0')} PM`;
      }
    },
    
    timeStringToNumber(timeString) {
      if (!timeString) return 0;
      const [hours, minutes] = timeString.split(':');
      return parseInt(hours) * 100 + parseInt(minutes);
    },
    
    getAvailabilityStatus(doctor) {
      // Check if doctor has availability data
      if (doctor.available_from && doctor.available_to) {
        const now = new Date();
        const currentTime = now.getHours() * 100 + now.getMinutes();
        const fromTime = this.timeStringToNumber(doctor.available_from);
        const toTime = this.timeStringToNumber(doctor.available_to);
        
        if (currentTime >= fromTime && currentTime <= toTime) {
          return 'online'; // Available now
        } else {
          return 'offline'; // Not available now
        }
      }
      
      // If no availability data, assume offline
      return 'offline';
    },
    
    getAvailabilityStatusText(doctor) {
      // Check if doctor has availability data
      if (doctor.available_from && doctor.available_to) {
        const now = new Date();
        const currentTime = now.getHours() * 100 + now.getMinutes();
        const fromTime = this.timeStringToNumber(doctor.available_from);
        const toTime = this.timeStringToNumber(doctor.available_to);
        
        if (currentTime >= fromTime && currentTime <= toTime) {
          return 'Available Now';
        } else {
          // Calculate next available time
          const availableFrom = this.convertTo12Hour(doctor.available_from);
          
          // Check if it's the same day or next day
          if (currentTime < fromTime) {
            return `Available at ${availableFrom}`;
          } else {
            return `Available tomorrow at ${availableFrom}`;
          }
        }
      }
      
      // Fallback if no availability data
      return 'Check Availability';
    },
    
    // Helper method to format time (for available_from and available_to)
    formatTimeString(timeString) {
      if (!timeString) return 'Not specified';
      
      // Handle different time formats
      if (typeof timeString === 'string') {
        if (timeString.includes(':')) {
          return this.convertTo12Hour(timeString);
        }
        return timeString;
      }
      
      return 'Not specified';
    },
    
    // Helper method to get full address
    getFullAddress(doctor) {
      const addressParts = [];
      
      if (doctor.clinic_address) {
        addressParts.push(doctor.clinic_address);
      }
      
      if (doctor.city) {
        addressParts.push(doctor.city);
      }
      
      if (doctor.state) {
        addressParts.push(doctor.state);
      }
      
      if (addressParts.length === 0) {
        return doctor.location || 'Location not specified';
      }
      
      return addressParts.join(', ');
    },
    
    // Rating methods
    openRatingModal(appointment) {
      this.selectedAppointmentForRating = appointment;
      this.selectedRating = 0;
      this.reviewText = '';
      this.showRatingModal = true;
    },
    
    closeRatingModal() {
      this.showRatingModal = false;
      this.selectedAppointmentForRating = null;
      this.selectedRating = 0;
      this.reviewText = '';
      this.submittingRating = false;
    },
    
    selectRating(rating) {
      this.selectedRating = rating;
    },
    
    getRatingLabel(rating) {
      const labels = {
        1: 'Poor',
        2: 'Fair', 
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
      };
      return labels[rating] || 'Select rating';
    },
    
    async submitRating() {
      if (!this.selectedRating || !this.selectedAppointmentForRating) {
        return;
      }
      
      this.submittingRating = true;
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `http://127.0.0.1:5000/api/patient/appointments/${this.selectedAppointmentForRating.id}/rate`,
          {
            rating: this.selectedRating,
            review: this.reviewText.trim()
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        if (response.data.success) {
          // Mark appointment as rated
          const appointmentIndex = this.appointments.findIndex(
            a => a.id === this.selectedAppointmentForRating.id
          );
          if (appointmentIndex !== -1) {
            this.appointments[appointmentIndex].has_rating = true;
          }
          
          // Show success message
          alert('Thank you for your rating!');
          
          // Close modal
          this.closeRatingModal();
          
          // Refresh appointments to show updated status
          this.fetchAppointments();
        }
      } catch (error) {
        console.error('Error submitting rating:', error);
        alert(error.response?.data?.error || 'Failed to submit rating. Please try again.');
      } finally {
        this.submittingRating = false;
      }
    }
  },
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Sidebar Styling */
.sidebar {
  width: 320px;
  background: linear-gradient(180deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%);
  box-shadow: 4px 0 20px rgba(30, 64, 175, 0.15);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.025em;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
}

.nav-section {
  padding: 0 1.5rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(4px);
}

.nav-btn.active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-btn.active .nav-indicator {
  opacity: 1;
  transform: scaleY(1);
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-text {
  flex: 1;
  text-align: left;
}

.nav-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 4px;
  height: 1.5rem;
  background: white;
  border-radius: 0 2px 2px 0;
  opacity: 0;
  transition: all 0.3s ease;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 320px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

/* Top Header */
.top-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 320px;
  right: 0;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
}

/* Navbar Edit Button Styling */
.navbar-edit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #4f46e5;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 1.5rem;
}

.navbar-edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
  background: linear-gradient(135deg, #3730a3, #6b21a8);
}

.navbar-edit-btn.active {
  background: linear-gradient(135deg, #10b981, #059669);
  border-color: #10b981;
}

.navbar-edit-btn .btn-icon {
  width: 16px;
  height: 16px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-user-profile {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.header-user-profile:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.header-user-profile.dropdown-open {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.header-user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
}

.header-user-specialty {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.2;
}

.header-user-avatar {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.header-user-avatar svg {
  width: 1.125rem;
  height: 1.125rem;
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.header-user-profile.dropdown-open .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-arrow svg {
  width: 100%;
  height: 100%;
}

/* User Dropdown Menu */
.user-dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid rgba(229, 231, 235, 0.8);
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  overflow: hidden;
  z-index: 1000;
  animation: dropdownSlide 0.2s ease-out;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-menu-btn, .dropdown-signout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.875rem;
  text-align: left;
}

.dropdown-menu-btn:hover {
  background: #f3f4f6;
}

.dropdown-signout-btn {
  color: #dc2626;
}

.dropdown-signout-btn:hover {
  background: #fef2f2;
}

.dropdown-menu-btn svg, .dropdown-signout-btn svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.25rem 0;
}

/* Content Wrapper */
.content-wrapper {
  flex: 1;
  padding: 2rem;
  padding-top: 90px; /* Account for fixed header height + spacing */
  background: transparent;
  min-height: calc(100vh - 70px);
}

/* Welcome Container */
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 140px);
}

.welcome-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.welcome-header {
  margin-bottom: 2rem;
}

.welcome-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.welcome-icon svg {
  width: 2rem;
  height: 2rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.quick-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
}

.quick-action-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .doctors-grid {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .sidebar {
    width: 280px;
  }
  
  .main-content {
    margin-left: 280px;
  }
  
  .top-header {
    left: 280px;
  }
  
  .page-title {
    font-size: 2.25rem;
  }
  
  .doctors-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .top-header {
    left: 0;
    padding: 0 1rem;
  }
  
  .content-wrapper {
    padding: 1.5rem;
    padding-top: 90px;
  }
  
  .page-title {
    font-size: 1.875rem;
  }
  
  .page-subtitle {
    font-size: 1.125rem;
  }
  
  .doctors-grid {
    grid-template-columns: 1fr;
  }
  
  .search-filters {
    padding: 1.5rem;
  }
  
  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select {
    min-width: auto;
  }
  
  .doctor-card {
    padding: 1.5rem;
  }
  
  .doctor-header {
    gap: 1rem;
  }
  
  .doctor-avatar {
    width: 4rem;
    height: 4rem;
  }
  
  .doctor-name {
    font-size: 1.25rem;
  }
  
  .doctor-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 1rem;
    padding-top: 90px;
  }
  
  .top-header {
    height: 60px;
    padding: 0 0.75rem;
  }
  
  .content-wrapper {
    padding-top: 80px; /* Adjusted for smaller header on mobile */
  }
  
  .doctors-container {
    padding: 0;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .search-filters {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .search-input-wrapper {
    max-width: none;
  }
  
  .doctor-card {
    padding: 1.25rem;
  }
  
  .doctor-header {
    flex-direction: column;
    text-align: center;
  }
  
  .doctor-avatar {
    align-self: center;
  }
  
  .doctor-details {
    padding: 1rem;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Doctors Container */
.doctors-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.doctors-header {
  margin-bottom: 3rem;
  text-align: center;
}

.page-title {
  font-size: 2.75rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 0;
  font-weight: 500;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.search-filters {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  margin-bottom: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.search-bar {
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  position: relative;
  max-width: 600px;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.375rem;
  height: 1.375rem;
  color: #94a3b8;
  pointer-events: none;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 1.125rem 1.25rem 1.125rem 3.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 1.25rem;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 
    0 0 0 4px rgba(102, 126, 234, 0.15),
    0 8px 25px rgba(0, 0, 0, 0.1);
  background: white;
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.filter-section {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-select {
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 180px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  color: #475569;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 
    0 0 0 4px rgba(102, 126, 234, 0.15),
    0 8px 25px rgba(0, 0, 0, 0.1);
  background: white;
}

.filter-select:hover {
  border-color: #cbd5e1;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.refresh-btn {
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.refresh-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.refresh-btn svg.spinning {
  animation: spin 1s linear infinite;
}

.clear-filters-btn {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #475569;
  border: 2px solid #e2e8f0;
  border-radius: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.clear-filters-btn:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* ===== DOCTORS GRID & CARDS ===== */
.doctors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem 0;
}

.doctor-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1.5rem;
  padding: 1.75rem;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 4px 20px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 420px;
}

.doctor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6, #06B6D4);
  border-radius: 1.5rem 1.5rem 0 0;
}

.doctor-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 
    0 25px 60px rgba(0, 0, 0, 0.12),
    0 10px 30px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.doctor-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 2rem;
  backdrop-filter: blur(10px);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22C55E;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
  position: relative;
}

.status-indicator.offline {
  background: #EF4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
}

.status-indicator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
}

.status-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: #22C55E;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-text.offline {
  color: #EF4444;
}

.card-favorite {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-favorite:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3B82F6;
  transform: scale(1.1);
}

.card-favorite svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748B;
  transition: color 0.3s ease;
}

.card-favorite:hover svg {
  color: #3B82F6;
}

/* Doctor Profile */
.doctor-profile {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.doctor-avatar {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 1.25rem;
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.avatar-background {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4);
  border-radius: 1.25rem;
  z-index: -1;
  opacity: 0.7;
}

.doctor-initials {
  color: white;
  font-weight: 800;
  font-size: 1.25rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.online-indicator {
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  width: 1rem;
  height: 1rem;
  background: #22C55E;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.doctor-details {
  flex: 1;
  min-width: 0;
}

.doctor-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.doctor-specialty {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #3B82F6;
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding: 0.375rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1.5rem;
  backdrop-filter: blur(10px);
}

.doctor-specialty svg {
  width: 0.875rem;
  height: 0.875rem;
}

/* New doctor info elements */
.doctor-clinic {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #059669;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.2);
  border-radius: 1rem;
}

.doctor-clinic svg {
  width: 0.75rem;
  height: 0.75rem;
}

.doctor-languages {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #7C3AED;
  font-weight: 500;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 1rem;
}

.doctor-languages svg {
  width: 0.75rem;
  height: 0.75rem;
}

/* Profile photo styling */
.doctor-profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.25rem;
  z-index: 2;
}

/* Available Days Section */
.availability-info {
  margin-bottom: 1.25rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 0.875rem;
  backdrop-filter: blur(10px);
}

.availability-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.5rem;
}

.availability-title svg {
  width: 1rem;
  height: 1rem;
  color: #3B82F6;
}

.available-days {
  font-size: 0.8rem;
  color: #475569;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.available-hours {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.hours-label {
  color: #64748B;
  font-weight: 600;
}

.hours-time {
  color: #059669;
  font-weight: 700;
  padding: 0.125rem 0.5rem;
  background: rgba(5, 150, 105, 0.1);
  border-radius: 0.375rem;
}

.doctor-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.stars {
  display: flex;
  position: relative;
  width: 5rem;
  height: 1rem;
}

.stars-fill,
.stars-empty {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 0.125rem;
}

.stars-fill {
  overflow: hidden;
  z-index: 2;
}

.stars-fill svg {
  width: 0.875rem;
  height: 0.875rem;
  color: #F59E0B;
  flex-shrink: 0;
}

.stars-empty svg {
  width: 0.875rem;
  height: 0.875rem;
  color: #E5E7EB;
  flex-shrink: 0;
}

.rating-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1E293B;
}

.review-count {
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 500;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.stat-icon.experience {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);
}

.stat-icon.patients {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
}

.stat-icon.location {
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.25);
}

.stat-icon svg {
  width: 1.125rem;
  height: 1.125rem;
  color: white;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.stat-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1E293B;
  line-height: 1;
}

.stat-label {
  font-size: 0.625rem;
  color: #64748B;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Pricing & Availability */
.pricing-availability {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.price-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.consultation-fee {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.fee-amount {
  font-size: 1.375rem;
  font-weight: 800;
  color: #059669;
  line-height: 1;
}

.fee-label {
  font-size: 0.625rem;
  color: #64748B;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.discount-badge {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.availability-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.next-slot {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #059669;
  font-weight: 600;
}

.next-slot svg {
  width: 0.875rem;
  height: 0.875rem;
}

/* Contact Summary */
.contact-summary {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: #475569;
  font-weight: 500;
}

.contact-item svg {
  width: 1rem;
  height: 1rem;
  color: #64748B;
  flex-shrink: 0;
}

.clinic-info {
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 600;
  padding-left: 1.75rem;
}

/* Card Actions */
.card-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  border: none;
  border-radius: 0.875rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3B82F6;
  transform: translateY(-2px);
}

.btn-primary svg,
.btn-secondary svg {
  width: 1rem;
  height: 1rem;
}

/* Doctor degree and rating styles */

.doctor-degree {
  font-size: 0.875rem;
  color: #6b7280;
}

.doctor-rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.rating-stars {
  display: flex;
  gap: 0.125rem;
}

.star {
  width: 1rem;
  height: 1rem;
  color: #d1d5db;
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .doctors-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
  }
  
  .doctor-card {
    padding: 2rem;
  }
  
  .doctor-header {
    gap: 1.5rem;
  }
  
  .doctor-avatar {
    width: 5rem;
    height: 5rem;
  }
  
  .doctor-initials {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .doctors-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .doctor-card {
    padding: 1.5rem;
    border-radius: 1.5rem;
  }
  
  .doctor-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding-right: 0;
    margin-bottom: 1.5rem;
  }
  
  .doctor-status-badge {
    position: static;
    align-self: flex-end;
    margin-bottom: 1rem;
  }
  
  .doctor-avatar {
    width: 4rem;
    height: 4rem;
  }
  
  .doctor-initials {
    font-size: 1.25rem;
  }
  
  .doctor-name {
    font-size: 1.25rem;
    text-align: center;
  }
  
  .doctor-metrics {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .metric-item {
    justify-content: center;
    text-align: center;
  }
  
  .doctor-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .book-appointment-btn,
  .contact-btn {
    width: 100%;
  }
}

/* ===== RESPONSIVE DESIGN ===== */

/* Large Tablets and Small Laptops */
@media (max-width: 1024px) {
  .doctors-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }
  
  .doctor-card {
    padding: 1.5rem;
    min-height: 380px;
  }
  
  .quick-stats {
    padding: 1rem;
  }
  
  .stat-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .stat-icon svg {
    width: 1rem;
    height: 1rem;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .doctors-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
  }
  
  .doctor-card {
    padding: 1.25rem;
    min-height: 350px;
  }
  
  .doctor-profile {
    gap: 1rem;
  }
  
  .doctor-avatar {
    width: 4rem;
    height: 4rem;
  }
  
  .doctor-initials {
    font-size: 1.125rem;
  }
  
  .doctor-name {
    font-size: 1.125rem;
  }
  
  .quick-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 1rem;
  }
  
  .stat-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .stat-icon {
    width: 1.75rem;
    height: 1.75rem;
    margin: 0 auto;
  }
  
  .stat-value {
    font-size: 0.75rem;
  }
  
  .stat-label {
    font-size: 0.5rem;
  }
  
  .pricing-availability {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }
  
  .card-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1rem;
  }
}

/* Mobile Phones */
@media (max-width: 480px) {
  .doctors-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .doctor-card {
    padding: 1rem;
    min-height: 320px;
    border-radius: 1.25rem;
  }
  
  .card-header {
    margin-bottom: 1rem;
  }
  
  .doctor-status {
    padding: 0.375rem 0.75rem;
  }
  
  .status-text {
    font-size: 0.625rem;
  }
  
  .card-favorite {
    width: 2rem;
    height: 2rem;
  }
  
  .card-favorite svg {
    width: 1rem;
    height: 1rem;
  }
  
  .doctor-profile {
    margin-bottom: 1rem;
  }
  
  .doctor-avatar {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .doctor-initials {
    font-size: 1rem;
  }
  
  .doctor-name {
    font-size: 1rem;
  }
  
  .doctor-specialty {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
  
  .doctor-specialty svg {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  .doctor-rating {
    gap: 0.375rem;
  }
  
  .stars {
    width: 4rem;
    height: 0.875rem;
  }
  
  .stars-fill svg,
  .stars-empty svg {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  .rating-text {
    font-size: 0.75rem;
  }
  
  .review-count {
    font-size: 0.625rem;
  }
  
  .quick-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    padding: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .stat-item {
    gap: 0.375rem;
  }
  
  .stat-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .stat-icon svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .stat-value {
    font-size: 0.625rem;
  }
  
  .stat-label {
    font-size: 0.5rem;
  }
  
  .pricing-availability {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .fee-amount {
    font-size: 1.125rem;
  }
  
  .fee-label {
    font-size: 0.5rem;
  }
  
  .discount-badge {
    font-size: 0.5rem;
    padding: 0.125rem 0.375rem;
  }
  
  .next-slot {
    font-size: 0.625rem;
  }
  
  .next-slot svg {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  .contact-summary {
    padding: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .contact-item {
    font-size: 0.625rem;
    gap: 0.5rem;
    margin-bottom: 0.375rem;
  }
  
  .contact-item svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .clinic-info {
    font-size: 0.625rem;
    padding-left: 1.375rem;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.625rem 0.75rem;
    font-size: 0.75rem;
  }
  
  .btn-primary svg,
  .btn-secondary svg {
    width: 0.875rem;
    height: 0.875rem;
  }
}

/* Extra Small Phones */
@media (max-width: 360px) {
  .doctor-card {
    padding: 0.875rem;
  }
  
  .quick-stats {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .stat-item {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
  
  .card-actions {
    gap: 0.5rem;
  }
}

/* Enhanced Animations and Micro-interactions */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Enhanced Hover Effects */
.doctor-card:hover .doctor-name {
  background: linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 2s linear infinite;
}

.doctor-card:hover .doctor-avatar {
  animation: float 2s ease-in-out infinite;
  box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
}

.doctor-card:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
}

.doctor-card:hover .discount-badge {
  animation: pulse-glow 1.5s ease-in-out infinite;
}

.doctor-card:hover .btn-primary {
  background: linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%);
  background-size: 200% auto;
  animation: gradient-shift 2s ease infinite;
}

/* Focus States for Accessibility */
.doctor-card:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

.card-favorite:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

.doctor-card:hover .metric-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}

.doctor-card:hover .doctor-specialty-badge {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  border-color: rgba(102, 126, 234, 0.4);
  transform: scale(1.05);
}

/* Loading states */
.metric-value, .contact-text, .price-amount {
  transition: all 0.3s ease;
}

.doctor-card:hover .metric-value {
  color: #667eea;
  font-weight: 900;
}

/* Focus states for accessibility */
.book-appointment-btn:focus,
.contact-btn:focus {
  outline: 3px solid rgba(102, 126, 234, 0.3);
  outline-offset: 2px;
}

/* Advanced glassmorphism effects */
.doctor-contact-info .contact-row:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(102, 126, 234, 0.2);
  transform: translateX(5px);
}

.doctor-details {
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.detail-icon {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  flex-shrink: 0;
}

.doctor-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.book-appointment-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}

.book-appointment-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background: #3b82f6;
  color: white;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

/* Loading States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.loading-spinner p {
  font-size: 1.125rem;
  font-weight: 600;
  color: #475569;
  margin: 0;
}

/* Error States */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.error-message {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 500px;
}

.error-message svg {
  width: 4rem;
  height: 4rem;
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.error-message h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.error-message p {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.retry-btn {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
}

/* Empty States */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-state-icon {
  width: 5rem;
  height: 5rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
  background: rgba(203, 213, 225, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 400px;
  line-height: 1.6;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

/* Appointments Page Styles */
.appointments-container {
  max-width: 800px;
  margin: 0 auto;
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.appointment-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
}

.appointment-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 4px 0 0 4px;
}

.appointment-card.pending::before {
  background: #f59e0b;
}

.appointment-card.confirmed::before {
  background: #10b981;
}

.appointment-card.cancelled::before {
  background: #ef4444;
}

.appointment-card.completed::before {
  background: #6b7280;
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.appointment-doctor h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.specialty {
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.875rem;
}

.appointment-status {
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.appointment-card.pending .status-badge {
  background: #fef3c7;
  color: #d97706;
}

.appointment-card.confirmed .status-badge {
  background: #d1fae5;
  color: #059669;
}

.appointment-card.cancelled .status-badge {
  background: #fee2e2;
  color: #dc2626;
}

.appointment-card.completed .status-badge {
  background: #f3f4f6;
  color: #6b7280;
}

.appointment-details {
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.appointment-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.cancel-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #fee2e2;
  color: #dc2626;
  border: 2px solid #dc2626;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover:not(:disabled) {
  background: #dc2626;
  color: white;
}

.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact-doctor-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-doctor-btn:hover {
  background: #3b82f6;
  color: white;
}

.chat-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 2px solid #10b981;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chat-btn:hover {
  background: #10b981;
  color: white;
}

.reschedule-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reschedule-btn:hover {
  background: #3b82f6;
  color: white;
}

/* Booking Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.booking-modal {
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
  margin-bottom: 1rem;
}

.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e5e7eb;
}

.close-btn svg {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

.modal-content {
  padding: 0 1.5rem 1.5rem;
}

.doctor-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
}

.doctor-summary .doctor-info h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.doctor-summary .doctor-info p {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.125rem;
}

.doctor-summary .doctor-info .available-info {
  font-size: 0.8rem;
  color: #059669;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: rgba(5, 150, 105, 0.1);
  border-radius: 0.375rem;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.form-actions .cancel-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.form-actions .cancel-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Reschedule Modal Styles */
.reschedule-modal {
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.reschedule-modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
  margin-bottom: 1rem;
}

.reschedule-modal .modal-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.reschedule-modal .modal-content {
  padding: 0 1.5rem 1.5rem;
}

.doctor-summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
}

.doctor-summary h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.doctor-summary p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.reschedule-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reschedule-modal .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reschedule-modal .form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.reschedule-modal .form-input,
.reschedule-modal .form-select,
.reschedule-modal .form-textarea {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  font-family: inherit;
}

.reschedule-modal .form-input:focus,
.reschedule-modal .form-select:focus,
.reschedule-modal .form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.reschedule-modal .form-textarea {
  resize: vertical;
  min-height: 80px;
}

.reschedule-modal .modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.reschedule-modal .cancel-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reschedule-modal .cancel-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.reschedule-modal .submit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.reschedule-modal .submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.reschedule-modal .submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Chat Modal Styles */
.chat-modal {
  width: 90%;
  max-width: 500px;
  height: 70vh;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.chat-header {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-doctor-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chat-doctor-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.online-indicator-small {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}

.chat-doctor-details h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.chat-doctor-details p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

.online-status {
  font-size: 0.75rem;
  opacity: 0.8;
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #f8fafc;
}

.chat-welcome {
  text-align: center;
  padding: 2rem 1rem;
  color: #64748b;
}

.welcome-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.welcome-icon svg {
  width: 24px;
  height: 24px;
}

.chat-welcome h3 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  color: #334155;
}

.chat-welcome p {
  margin: 0;
  font-size: 0.875rem;
}

.message {
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-end;
  gap: 0.5rem;
}

.message.doctor {
  justify-content: flex-start;
}

.message.patient {
  justify-content: flex-end;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.doctor-initials-small {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.patient-initials-small {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-content {
  max-width: 75%;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  position: relative;
}

.message.doctor .message-bubble {
  background: white;
  border: 1px solid #e2e8f0;
  border-bottom-left-radius: 0.25rem;
}

.message.patient .message-bubble {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.message-bubble p {
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

.chat-input-section {
  padding: 1rem;
  background: white;
  border-top: 1px solid #e2e8f0;
}

.chat-input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 2rem;
  padding: 0.5rem;
  transition: all 0.2s ease;
}

.chat-input-container:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.attachment-btn,
.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.attachment-btn {
  background: transparent;
  color: #64748b;
}

.attachment-btn:hover {
  background: #e2e8f0;
  color: #334155;
}

.send-btn {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.attachment-btn svg,
.send-btn svg {
  width: 18px;
  height: 18px;
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: #334155;
}

.chat-input::placeholder {
  color: #94a3b8;
}

.chat-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.suggestion-btn {
  padding: 0.5rem 0.75rem;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  font-size: 0.75rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suggestion-btn:hover {
  background: #e2e8f0;
  color: #334155;
  border-color: #cbd5e1;
}

/* Contact Info Improvements */
.contact-summary {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  margin: 1rem 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.contact-item:last-of-type {
  margin-bottom: 0.75rem;
}

.contact-item svg {
  width: 16px;
  height: 16px;
  color: #3b82f6;
}

.clinic-info {
  font-size: 0.75rem;
  color: #94a3b8;
  font-style: italic;
}

/* Responsive Design for Chat */
@media (max-width: 768px) {
  .chat-modal {
    width: 95%;
    height: 80vh;
  }
  
  .chat-doctor-avatar {
    width: 40px;
    height: 40px;
    font-size: 0.75rem;
  }
  
  .chat-doctor-details h4 {
    font-size: 0.875rem;
  }
  
  .chat-doctor-details p {
    font-size: 0.75rem;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .chat-suggestions {
    gap: 0.25rem;
  }
  
  .suggestion-btn {
    font-size: 0.6875rem;
    padding: 0.375rem 0.5rem;
  }
}

/* Rating Modal Styles */
.rating-modal {
  background: white;
  border-radius: 16px;
  padding: 0;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: modalSlide 0.3s ease-out;
}

.rating-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.star-rating {
  display: flex;
  gap: 0.25rem;
  margin: 0.5rem 0;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: #d1d5db;
}

.star-btn:hover {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.1);
}

.star-btn.active {
  color: #fbbf24;
}

.star-btn svg {
  width: 2rem;
  height: 2rem;
}

.rating-label {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0.5rem 0;
  text-align: center;
}

.rate-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.rate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(251, 191, 36, 0.4);
}

.rating-completed {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.rating-completed svg {
  width: 1rem;
  height: 1rem;
  color: #fbbf24;
}

/* Responsive rating modal */
@media (max-width: 768px) {
  .rating-modal {
    width: 95%;
    max-width: none;
    margin: 1rem;
  }
  
  .star-btn svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>