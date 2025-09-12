<style scoped>
@media (width <= 900px) {
  .dashboard-container {
    flex-direction: column !important;
    padding: 1rem !important;
    gap: 1.5rem !important;
  }
}

@media (width <= 600px) {
  .dashboard-container {
    padding: 0.5rem 0.2rem !important;
    margin: 0 !important;
    width: 100vw;
    min-width: 0;
    box-sizing: border-box;
  }

  .dashboard-card {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
}
</style>
<template>
  <div class="dashboard-layout">
    <!-- Toast Notifications -->
    <ToastNotification ref="toast" />
    
    <!-- Modern Sidebar -->
    <aside class="sidebar" :class="{ 'collapsed': sidebarCollapsed, 'mobile-open': mobileMenuOpen }">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="logo-container">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" class="logo-svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <div class="logo-text" v-show="!sidebarCollapsed">
            <h3 class="logo-title">DoctorBuddy</h3>
            <p class="logo-subtitle">Professional</p>
          </div>
        </div>
        <!-- Collapse Button -->
        <button class="sidebar-collapse-btn" @click="toggleSidebar" v-show="!sidebarCollapsed">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <p class="nav-section-title" v-show="!sidebarCollapsed">MAIN MENU</p>
          <ul class="nav-list">
            <li class="nav-item">
              <button 
                class="nav-btn" 
                :class="{ 'active': showDashboard }"
                @click="showDashboardPage"
                :title="sidebarCollapsed ? 'Dashboard' : ''"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <path d="M9 9h6m-6 4h6m-3-2V7"/>
                  </svg>
                </div>
                <span class="nav-text" v-show="!sidebarCollapsed">Dashboard</span>
                <div class="nav-indicator"></div>
              </button>
            </li>
            
            <li class="nav-item">
              <button 
                class="nav-btn" 
                :class="{ 'active': showHome }"
                @click="goHome"
                :title="sidebarCollapsed ? 'Appointments' : ''"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="nav-text" v-show="!sidebarCollapsed">Appointments</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button 
                class="nav-btn"
                :class="{ 'active': showPatients }"
                @click="showPatientsPage"
                :title="sidebarCollapsed ? 'Patients' : ''"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <span class="nav-text" v-show="!sidebarCollapsed">Patients</span>
                <div class="nav-indicator"></div>
              </button>
            </li>

            <li class="nav-item">
              <button 
                class="nav-btn"
                :title="sidebarCollapsed ? 'Medical Records' : ''"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <span class="nav-text" v-show="!sidebarCollapsed">Medical Records</span>
                <div class="nav-indicator"></div>
              </button>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <p class="nav-section-title" v-show="!sidebarCollapsed">SETTINGS</p>
          <ul class="nav-list">
            <li class="nav-item">
              <button 
                class="nav-btn"
                :title="sidebarCollapsed ? 'Settings' : ''"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                  </svg>
                </div>
                <span class="nav-text" v-show="!sidebarCollapsed">Settings</span>
                <div class="nav-indicator"></div>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      <!-- Expand Button for Collapsed State -->
      <button class="sidebar-expand-btn" @click="toggleSidebar" v-show="sidebarCollapsed">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
        </svg>
      </button>
    </aside>

    <!-- Main Content -->
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Top Header with User Profile -->
      <header class="top-header">
        <div class="header-left">
          <!-- Mobile Menu Button -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu" v-show="isMobile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span class="dashboard-title">{{ getPageTitle() }}</span>
        </div>
        <div class="header-right">
          <div class="header-user-profile" @click="toggleUserDropdown" :class="{ 'dropdown-open': showUserDropdown }">
            <div class="header-user-info">
              <span class="header-user-name">{{ doctorStatus?.full_name || 'Loading...' }}</span>
              <span class="header-user-specialty">{{ doctorStatus?.specialty || 'Loading...' }}</span>
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
        <!-- Dashboard Overview Page -->
        <template v-if="showDashboard">
          <div class="dashboard-overview">
            <!-- Dashboard Header -->
            <div class="dashboard-header">
              <h2>Dashboard Overview</h2>
              <button class="refresh-stats-btn" @click="loadDashboardStats" title="Refresh Statistics">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 3a5 5 0 104.546 2.914.5.5 0 00-.908-.417A4 4 0 118 4v1z"/>
                  <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z"/>
                </svg>
              </button>
            </div>
            
            <!-- Stats Cards -->
            <div class="stats-grid">
              <!-- Today's Appointments Card -->
              <div class="stat-card appointments-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <h3 class="stat-value">{{ dashboardStats.todayAppointments }}</h3>
                  <p class="stat-label">Today's Appointments</p>
                  <div class="stat-trend">
                    <span class="trend-icon positive">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </span>
                    <span class="trend-text">+12% from yesterday</span>
                  </div>
                </div>
              </div>

              <!-- Total Patients Card -->
              <div class="stat-card patients-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <h3 class="stat-value">{{ dashboardStats.totalPatients }}</h3>
                  <p class="stat-label">Total Patients</p>
                  <div class="stat-trend">
                    <span class="trend-icon positive">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </span>
                    <span class="trend-text">+8% this month</span>
                  </div>
                </div>
              </div>

              <!-- Monthly Revenue Card -->
              <div class="stat-card revenue-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <h3 class="stat-value">${{ dashboardStats.monthlyRevenue.toLocaleString() }}</h3>
                  <p class="stat-label">Monthly Revenue</p>
                  <div class="stat-trend">
                    <span class="trend-icon positive">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </span>
                    <span class="trend-text">+15% from last month</span>
                  </div>
                </div>
              </div>

              <!-- Rating Card -->
              <div class="stat-card rating-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <h3 class="stat-value">{{ dashboardStats.rating }}/5</h3>
                  <p class="stat-label">Average Rating</p>
                  <div class="stat-rating-stars">
                    <div class="rating-stars">
                      <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= Math.floor(dashboardStats.rating) }">★</span>
                    </div>
                    <span class="rating-count">({{ dashboardStats.reviewCount }} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Activity Section - Modern Single Line Design -->
            <div class="recent-activity-section">
              <div class="section-header">
                <h3 class="section-title">
                  <div class="title-with-pulse">
                    <svg class="activity-pulse-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Recent Activity
                    <div class="live-indicator">
                      <span class="pulse-dot"></span>
                      <span class="live-text">Live</span>
                    </div>
                  </div>
                  <span class="activity-counter" v-if="recentActivities.length > 0">{{ recentActivities.length }}</span>
                </h3>
                <div class="section-actions">
                  <button class="refresh-btn" @click="loadRecentActivities" title="Refresh">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 3a5 5 0 104.546 2.914.5.5 0 00-.908-.417A4 4 0 118 4v1z"/>
                      <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z"/>
                    </svg>
                  </button>
                  <button class="view-all-btn" @click="goHome" title="View All">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path fill-rule="evenodd" d="M1.5 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H2a.5.5 0 01-.5-.5z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Modern Horizontal Activity Stream -->
              <div class="activity-stream" v-if="recentActivities.length > 0">
                <div class="activity-timeline">
                  <div v-for="(activity, index) in recentActivities" :key="activity.id" 
                       class="activity-card"
                       :class="[activity.status, { 'latest': index === 0 }]"
                       :style="{ animationDelay: `${index * 0.1}s` }">
                    
                    <div class="activity-card-header">
                      <div class="activity-icon" :class="activity.status">
                        <svg v-if="activity.type === 'appointment'" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                        </svg>
                        <svg v-else viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <div class="activity-status-badge" :class="activity.status">
                        <span class="status-text">{{ formatStatus(activity.status) }}</span>
                      </div>
                    </div>
                    
                    <div class="activity-card-content">
                      <h5 class="activity-title">{{ activity.title }}</h5>
                      <p class="activity-description">{{ activity.description }}</p>
                      <div class="activity-meta">
                        <span class="activity-time">{{ activity.time }}</span>
                        <div class="activity-type-indicator" :class="activity.type">
                          {{ activity.type }}
                        </div>
                      </div>
                    </div>

                    <!-- Connection Line to Next Activity -->
                    <div v-if="index < recentActivities.length - 1" class="activity-connector">
                      <div class="connector-line"></div>
                      <div class="connector-arrow">
                        <svg viewBox="0 0 16 16" fill="currentColor">
                          <path fill-rule="evenodd" d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Enhanced No Activities State -->
              <div v-else class="no-activities-modern">
                <div class="no-activities-content">
                  <div class="empty-state-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div class="empty-state-text">
                    <h4>No recent activity</h4>
                    <p>Your recent activities will appear here</p>
                  </div>
                  <button class="create-activity-btn" @click="goHome">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    View Appointments
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions-section">
              <h2 class="section-title">Quick Actions</h2>
              <div class="quick-actions-grid">
                <button class="quick-action-card" @click="goHome">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <span>View Appointments</span>
                </button>
                
                <button class="quick-action-card" @click="goProfile">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <span>Update Profile</span>
                </button>
                
                <button class="quick-action-card">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <span>Medical Records</span>
                </button>
                
                <button class="quick-action-card">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                    </svg>
                  </div>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Profile Page - Show only profile when profile is selected -->
        <template v-else-if="showProfile">
          <DoctorProfileCard :onStatusUpdate="refreshStatus" @profileUpdated="handleProfileUpdate" />
        </template>

        <!-- Patients Page - Show only when patients is selected -->
        <template v-else-if="showPatients">
          <PatientsList />
        </template>

        <!-- Appointments Page - Show only when home/appointments is selected -->
        <template v-else-if="showHome">
          <DoctorAppointments />
        </template>

        <!-- Default Welcome Page - Show when no specific page is selected -->
        <template v-else>
          <div class="welcome-container">
            <div class="welcome-card">
              <div class="welcome-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <h2 class="welcome-title">Welcome to Doctor Dashboard</h2>
              <p class="welcome-subtitle">Select an option from the sidebar to get started</p>
              <div class="quick-actions">
                <button class="quick-action-btn" @click="showDashboardPage">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <path d="M9 9h6m-6 4h6m-3-2V7"/>
                  </svg>
                  View Dashboard
                </button>
                <button class="quick-action-btn" @click="goHome">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  View Appointments
                </button>
                <button class="quick-action-btn" @click="showProfile = true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import DoctorProfileCard from './DoctorProfileCard.vue';
import DoctorAppointments from './DoctorAppointments.vue';
import PatientsList from './PatientsList.vue';
import ToastNotification from '../ToastNotification.vue';

import axios from 'axios';

export default {
  components: { DoctorProfileCard, DoctorAppointments, PatientsList, ToastNotification },
  data() {
    return {
      showProfile: false,
      showHome: false,
      showDashboard: true, // Default to dashboard view
      showPatients: false, // Add patients view flag
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      isMobile: false,
      doctorStatus: null,
      lastToastShown: null,
      hasShownActiveToast: false, // Track if active toast has been shown
      showUserDropdown: false, // Track dropdown visibility
      dashboardStats: {
        todayAppointments: 0,
        totalPatients: 0,
        monthlyRevenue: 0,
        rating: 0,
        reviewCount: 0
      },
      recentActivities: [
        {
          id: 1,
          type: 'appointment',
          title: 'Appointment Completed',
          description: 'John Smith - Routine Checkup',
          time: '2 hours ago'
        },
        {
          id: 2,
          type: 'patient',
          title: 'New Patient Registered',
          description: 'Sarah Johnson joined your practice',
          time: '4 hours ago'
        },
        {
          id: 3,
          type: 'appointment',
          title: 'Appointment Scheduled',
          description: 'Mike Davis - Follow-up consultation',
          time: '6 hours ago'
        }
      ]
    };
  },
  async mounted() {
    await this.checkDoctorStatus();
    this.showStatusToast();
    this.checkMobile();
    this.loadDashboardData();
    
    // Check if active toast was already shown in this session
    const activeToastShown = sessionStorage.getItem('activeToastShown');
    if (activeToastShown === 'true') {
      this.hasShownActiveToast = true;
    }

    // Add click outside listener for dropdown
    document.addEventListener('click', this.handleClickOutside);
    // Add resize listener for mobile detection
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    // Remove event listeners
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    async checkDoctorStatus() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/api/doctor/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data) {
          this.doctorStatus = response.data;
        }
      } catch (error) {
        console.error('Error checking doctor status:', error);
      }
    },
    showStatusToast() {
      if (!this.doctorStatus) return;
      
      let currentStatus = '';
      if (this.doctorStatus.suspended) {
        currentStatus = 'suspended';
      } else if (!this.doctorStatus.approved) {
        currentStatus = 'pending';
      } else if (this.doctorStatus.approved && !this.doctorStatus.suspended) {
        currentStatus = 'approved';
      }
      
      // Don't show the same toast again
      if (this.lastToastShown === currentStatus) return;
      this.lastToastShown = currentStatus;
      
      // Show toast notification based on approval status
      if (this.doctorStatus.suspended) {
        this.$refs.toast.showError(
          'Your account has been suspended by the administrator. Please contact support for assistance.',
          'Account Suspended',
          0 // Persistent toast
        );
      } else if (!this.doctorStatus.approved) {
        this.$refs.toast.showWarning(
          'Your account is pending approval by the administrator. You will be notified once approved.',
          'Pending Approval',
          0 // Persistent toast
        );
      } else if (this.doctorStatus.approved && !this.doctorStatus.suspended) {
        // Only show active toast if it hasn't been shown in this session
        if (!this.hasShownActiveToast) {
          this.$refs.toast.showSuccess(
            'Your account is approved and active. You can now manage appointments and patients.',
            'Account Active',
            3000 // Show for 3 seconds
          );
          this.hasShownActiveToast = true;
          // Store in session storage to persist across page refreshes
          sessionStorage.setItem('activeToastShown', 'true');
        }
      }
    },
    async logout() {
      this.showUserDropdown = false; // Close dropdown
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://127.0.0.1:5000/api/doctor/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Logout API error:', err);
      }
      
      // Clear all session data including toast tracking
      localStorage.removeItem('token');
      sessionStorage.removeItem('activeToastShown');
      
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
    goProfile() {
      this.showProfile = true;
      this.showHome = false;
      this.showDashboard = false;
      this.showPatients = false;
      this.showUserDropdown = false; // Close dropdown
    },
    goHome() {
      this.showHome = true;
      this.showProfile = false;
      this.showDashboard = false;
      this.showPatients = false;
      this.mobileMenuOpen = false;
    },
    showDashboardPage() {
      this.showDashboard = true;
      this.showHome = false;
      this.showProfile = false;
      this.showPatients = false;
      this.mobileMenuOpen = false;
    },
    showPatientsPage() {
      this.showPatients = true;
      this.showDashboard = false;
      this.showHome = false;
      this.showProfile = false;
      this.mobileMenuOpen = false;
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.mobileMenuOpen = false;
      }
    },
    getPageTitle() {
      if (this.showDashboard) return 'Dashboard Overview';
      if (this.showHome) return 'Appointments';
      if (this.showProfile) return 'Doctor Profile';
      if (this.showPatients) return 'Patients Management';
      return 'Doctor Dashboard';
    },
    async loadDashboardData() {
      try {
        // Load real dashboard statistics
        await this.loadDashboardStats();
        
        // Load real recent activities
        await this.loadRecentActivities();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    },
    
    async loadDashboardStats() {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch appointment stats, patients, and ratings
        const [statsResponse, patientsResponse, ratingsResponse] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/doctor/appointments/stats', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://127.0.0.1:5000/api/doctor/patients', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://127.0.0.1:5000/api/doctor/ratings/summary', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        
        if (statsResponse.data.success && patientsResponse.data.success && ratingsResponse.data.success) {
          const stats = statsResponse.data.stats;
          const patients = patientsResponse.data.patients;
          const ratings = ratingsResponse.data;
          
          // Get unique patients count
          const uniquePatients = new Set(patients.map(p => p.patient_id));
          
          this.dashboardStats = {
            todayAppointments: stats.today_appointments || 0,
            totalPatients: uniquePatients.size || 0,
            monthlyRevenue: Math.floor(Math.random() * 20000) + 10000, // Keep mock for now
            rating: ratings.rating || 0,
            reviewCount: ratings.reviewCount || 0
          };
        } else {
          // Fallback to mock data if API fails
          this.dashboardStats = {
            todayAppointments: 0,
            totalPatients: 0,
            monthlyRevenue: Math.floor(Math.random() * 20000) + 10000,
            rating: 0,
            reviewCount: 0
          };
        }
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
        // Fallback to mock data if API fails
        this.dashboardStats = {
          todayAppointments: 0,
          totalPatients: 0,
          monthlyRevenue: Math.floor(Math.random() * 20000) + 10000,
          rating: 0,
          reviewCount: 0
        };
      }
    },
    
    async loadRecentActivities() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/api/doctor/recent-activities', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          // Format activities for display and limit to 3 most recent
          this.recentActivities = response.data.activities
            .slice(0, 3) // Limit to only 3 most recent activities
            .map(activity => ({
              id: activity.id,
              type: activity.type,
              title: activity.title,
              description: activity.description,
              time: this.formatTimeAgo(activity.time),
              patient_name: activity.patient_name,
              status: activity.status,
              appointment_datetime: activity.appointment_datetime,
              reason: activity.reason
            }));
        } else {
          console.error('Failed to load recent activities:', response.data.error);
          // Keep default mock data if API fails
        }
      } catch (error) {
        console.error('Error loading recent activities:', error);
        // Keep default mock data if API fails
      }
    },
    
    formatTimeAgo(dateString) {
      try {
        const now = new Date();
        const activityTime = new Date(dateString);
        const diffInSeconds = Math.floor((now - activityTime) / 1000);
        
        if (diffInSeconds < 60) {
          return 'Just now';
        } else if (diffInSeconds < 3600) {
          const minutes = Math.floor(diffInSeconds / 60);
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
          const hours = Math.floor(diffInSeconds / 3600);
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 604800) {
          const days = Math.floor(diffInSeconds / 86400);
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
          return activityTime.toLocaleDateString();
        }
      } catch (error) {
        return 'Recently';
      }
    },
    
    formatStatus(status) {
      if (!status) return '';
      return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },
    
    formatAppointmentDate(dateString) {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        return dateString;
      }
    },
    async refreshStatus() {
      await this.checkDoctorStatus();
      this.showStatusToast();
    },
    handleProfileUpdate() {
      // Show success toast when profile is updated
      this.$refs.toast.showSuccess(
        'Your profile has been updated successfully!',
        'Profile Updated',
        4000
      );
      // Refresh status to show any changes, but don't reset active toast flag
      // since profile update shouldn't trigger the initial active account toast again
      this.checkDoctorStatus();
    }
  }
};
</script>

<style scoped>
/* Dashboard Layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  position: relative;
}

/* Modern Sidebar Styling - Fixed Width with Dynamic Behavior */
.sidebar {
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  width: 320px; /* Fixed width for desktop */
  min-width: 320px; /* Prevent shrinking */
  max-width: 320px; /* Prevent growing */
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgb(0 0 0 / 15%);
  position: fixed; /* Fixed positioning for consistent behavior */
  left: 0;
  top: 0;
  z-index: 1000;
  overflow: hidden auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.collapsed {
  width: 80px;
  min-width: 80px;
  max-width: 80px;
}

.sidebar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgb(59 130 246 / 10%) 0%, rgb(147 51 234 / 10%) 100%);
  pointer-events: none;
}

/* Sidebar Header */
.sidebar-header {
  padding: 1.5rem 1.5rem 2rem; /* Reduced top padding */
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start; /* Align items to top */
  justify-content: space-between;
}

.sidebar.collapsed .sidebar-header {
  padding: 1.5rem 1rem 2rem; /* Consistent padding when collapsed */
  justify-content: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
  margin-top: 0.25rem; /* Small top margin for better alignment */
}

.sidebar.collapsed .logo-container {
  justify-content: center;
  margin-top: 0.25rem;
}

.sidebar-collapse-btn {
  background: rgb(255 255 255 / 10%);
  border: none;
  border-radius: 10px; /* Slightly larger border radius */
  width: 36px; /* Slightly larger button */
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255 255 255 / 80%); /* Better visibility */
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 0.125rem; /* Move button slightly up */
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%); /* Subtle shadow */
}

.sidebar-collapse-btn:hover {
  background: rgb(255 255 255 / 25%); /* More prominent hover */
  color: white;
  transform: translateY(-1px); /* Slight lift on hover */
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
}

.sidebar-collapse-btn svg {
  width: 18px; /* Slightly larger icon */
  height: 18px;
}

.sidebar-expand-btn {
  position: fixed;
  top: 20%;
  left: 20px;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgb(59 130 246 / 30%);
  z-index: 1001;
}

.sidebar-expand-btn:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 16px rgb(59 130 246 / 40%);
}

.sidebar-expand-btn svg {
  width: 20px;
  height: 20px;
}

.logo-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgb(59 130 246 / 30%);
  flex-shrink: 0;
}

.logo-svg {
  width: 2rem;
  height: 2rem;
  color: white;
}

.logo-text {
  color: white;
  flex: 1;
  min-width: 0;
}

.logo-title {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logo-subtitle {
  font-size: 0.8rem;
  color: #cbd5e1;
  margin: 0.25rem 0 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Sidebar Navigation */
.sidebar-nav {
  flex: 1;
  padding: 2rem 0;
  position: relative;
  z-index: 1;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 2.5rem;
}

.nav-section:last-child {
  margin-bottom: 1rem;
}

.nav-section-title {
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin: 0 0 1.25rem 2rem;
  padding-left: 0.5rem;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.375rem;
}

.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  color: rgb(255 255 255 / 85%);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 0;
  min-height: 3.5rem;
}

.nav-btn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981);
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(14 165 233 / 10%), rgb(6 182 212 / 5%));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-btn:hover,
.nav-btn.active {
  color: white;
  transform: translateX(8px);
}

.nav-btn:hover::after,
.nav-btn.active::after {
  opacity: 1;
}

.nav-btn:hover::before,
.nav-btn.active::before {
  transform: scaleY(1);
}

.nav-btn.active {
  background: linear-gradient(90deg, rgb(14 165 233 / 20%), rgb(6 182 212 / 10%), rgb(16 185 129 / 5%));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn:hover .nav-icon svg,
.nav-btn.active .nav-icon svg {
  transform: scale(1.15);
  filter: drop-shadow(0 2px 4px rgb(14 165 233 / 40%));
}

.nav-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 1;
}

.nav-indicator {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981);
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.nav-btn.active .nav-indicator {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 2px 8px rgb(6 182 212 / 50%);
}

/* Main Content - Adjusted for fixed sidebar */
.main-content {
  flex: 1;
  margin-left: 320px; /* Account for fixed sidebar width */
  padding: 0;
  background: #f8fafc;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}

/* Top Header with User Profile */
.top-header {
  background: linear-gradient(135deg, #fff 0%, #f0f9ff 50%, #e0f2fe 100%);
  border-bottom: 3px solid;
  border-image: linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981) 1;
  padding: 1rem 2rem; /* Reduced padding */
  box-shadow: 0 8px 32px rgb(14 165 233 / 15%);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 320px; /* Account for sidebar width */
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 60px; /* Fixed height for reduced navbar */
}

.main-content.sidebar-collapsed .top-header {
  left: 80px;
}

.mobile-menu-btn {
  background: none;
  border: none;
  color: #0ea5e9;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 1rem;
}

.mobile-menu-btn:hover {
  background: rgb(14 165 233 / 10%);
}

.mobile-menu-btn svg {
  width: 24px;
  height: 24px;
}

.top-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgb(14 165 233 / 3%) 0%, rgb(16 185 129 / 2%) 100%);
  pointer-events: none;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-left .dashboard-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: transparent;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #10b981 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgb(14 165 233 / 10%);
  position: relative;
}

.header-left .dashboard-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #0ea5e9, #10b981);
  border-radius: 2px;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-user-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgb(255 255 255 / 95%) 0%, rgb(240 249 255 / 90%) 100%);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgb(14 165 233 / 12%);
  border: 1px solid rgb(14 165 233 / 10%);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: visible; /* Changed from hidden to visible for dropdown */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-user-profile:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgb(14 165 233 / 18%);
}

.header-user-profile.dropdown-open {
  border-color: rgb(14 165 233 / 30%);
  box-shadow: 0 8px 24px rgb(14 165 233 / 20%);
}

.header-user-profile::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981);
}

.header-user-info {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.header-user-name {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-user-specialty {
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-user-avatar {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #10b981 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgb(14 165 233 / 30%);
  flex-shrink: 0;
  border: 3px solid rgb(255 255 255 / 80%);
  position: relative;
}

.header-user-avatar::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #0ea5e9, #10b981);
  border-radius: 50%;
  z-index: -1;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.header-user-avatar svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  filter: drop-shadow(0 2px 4px rgb(0 0 0 / 10%));
}

.dropdown-arrow {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.dropdown-arrow svg {
  width: 1rem;
  height: 1rem;
  color: #0ea5e9;
  transition: transform 0.3s ease;
}

.header-user-profile.dropdown-open .dropdown-arrow svg {
  transform: rotate(180deg);
}

.user-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgb(14 165 233 / 20%);
  border: 1px solid rgb(14 165 233 / 10%);
  backdrop-filter: blur(20px);
  min-width: 200px;
  z-index: 1001;
  overflow: hidden;
  transform-origin: top right;
  animation: dropdownAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes dropdownAppear {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.dropdown-signout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

.dropdown-signout-btn:hover {
  background: linear-gradient(135deg, rgb(239 68 68 / 10%), rgb(220 38 38 / 5%));
  color: #dc2626;
  transform: translateX(4px);
}

.dropdown-menu-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #0ea5e9;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

.dropdown-menu-btn:hover {
  background: linear-gradient(135deg, rgb(14 165 233 / 10%), rgb(6 182 212 / 5%));
  color: #0284c7;
  transform: translateX(4px);
}

.dropdown-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgb(14 165 233 / 20%), transparent);
  margin: 0.5rem 0;
}

.dropdown-menu-btn svg,
.dropdown-signout-btn svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.header-signout-btn {
  display: none; /* Hide the old sign out button */
}

/* Content Wrapper */
.content-wrapper {
  flex: 1;
  padding: 2rem;
  padding-top: 4rem; /* Reduced from 6rem to account for smaller header */
  overflow-y: auto;
}

/* Welcome Page Styles */
.welcome-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.welcome-card {
  background: linear-gradient(135deg, #fff, #f8fafc);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 80%);
  backdrop-filter: blur(10px);
  max-width: 500px;
  width: 100%;
}

.welcome-icon {
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 8px 24px rgb(59 130 246 / 30%);
}

.welcome-icon svg {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0 0 2rem;
  line-height: 1.6;
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
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgb(16 185 129 / 25%);
  min-width: 160px;
  justify-content: center;
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgb(16 185 129 / 35%);
  background: linear-gradient(135deg, #059669, #047857);
}

.quick-action-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.navbar {
  background: linear-gradient(135deg, #fff, #f1f5f9);
  padding: 1.5rem 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  border: 1px solid rgb(255 255 255 / 80%);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgb(59 130 246 / 2%), rgb(147 51 234 / 2%));
  pointer-events: none;
}

.navbar span {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

/* Fixed Styles */
.fixed {
  backdrop-filter: blur(12px);
  z-index: 9999;
}

.fixed > div {
  max-width: 95vw !important;
  max-height: 95vh;
  overflow: auto;
  border-radius: 24px !important;
  box-shadow: 0 25px 50px rgb(0 0 0 / 25%) !important;
  border: 1px solid rgb(255 255 255 / 20%) !important;
}

/* Dashboard Overview Styles */
.dashboard-overview {
  padding: 0;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dashboard-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.refresh-stats-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-stats-btn:hover {
  background: #e2e8f0;
  color: #475569;
  transform: scale(1.05);
}

.refresh-stats-btn:active {
  transform: scale(0.95);
}

.refresh-stats-btn:hover svg {
  animation: spin 0.6s ease-in-out;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.refresh-stats-btn svg {
  width: 0.9rem;
  height: 0.9rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Fixed 4 columns for single line */
  gap: 1.5rem;
  margin-bottom: 3rem;
}

/* For smaller screens, maintain responsive behavior */
@media (width <= 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr); /* 2x2 grid on medium screens */
    gap: 1.25rem;
  }
}

@media (width <= 768px) {
  .stats-grid {
    grid-template-columns: 1fr; /* Single column on mobile */
    gap: 1rem;
  }
}

.stat-card {
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border-radius: 16px; /* Smaller border radius */
  padding: 1.25rem 1rem; /* Much smaller padding */
  box-shadow: 0 4px 20px rgb(0 0 0 / 6%); /* Lighter shadow */
  border: 1px solid rgb(255 255 255 / 80%);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column; /* Stack content vertically for better single-line layout */
  align-items: center;
  text-align: center;
  min-height: 120px; /* Much smaller height */
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px; /* Thinner top border */
  background: linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981);
}

.stat-card:hover {
  transform: translateY(-3px); /* Smaller hover effect */
  box-shadow: 0 8px 24px rgb(0 0 0 / 10%); /* Lighter hover shadow */
}

.appointments-card::before {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.patients-card::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.revenue-card::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.rating-card::before {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.stat-icon {
  width: 2.5rem; /* Much smaller icon */
  height: 2.5rem;
  border-radius: 12px; /* Smaller border radius */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%); /* Lighter shadow */
  margin-bottom: 0.75rem; /* Smaller margin */
}

.appointments-card .stat-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.patients-card .stat-icon {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.revenue-card .stat-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.rating-card .stat-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.stat-icon svg {
  width: 1.25rem; /* Much smaller icon */
  height: 1.25rem;
}

.stat-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 1.75rem; /* Much smaller value text */
  font-weight: 800;
  margin: 0 0 0.25rem; /* Smaller margin */
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem; /* Much smaller label */
  color: #64748b;
  margin: 0 0 0.5rem; /* Smaller margin */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-trend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.trend-icon {
  width: 1rem; /* Smaller trend icon */
  height: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.trend-icon.positive {
  background: rgb(16 185 129 / 10%);
  color: #10b981;
}

.trend-icon svg {
  width: 0.625rem; /* Smaller icon */
  height: 0.625rem;
}

.trend-text {
  font-size: 0.7rem; /* Much smaller trend text */
  color: #10b981;
  font-weight: 600;
}

.stat-rating-stars {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.rating-stars {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.star {
  font-size: 1rem; /* Smaller stars */
  color: #e5e7eb;
  transition: color 0.3s ease;
}

.star.filled {
  color: #fbbf24;
}

.rating-count {
  font-size: 0.7rem; /* Much smaller rating count */
  color: #64748b;
  font-weight: 500;
}

/* Recent Activity Section - Modern Single Line Design */
.recent-activity-section {
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgb(0 0 0 / 8%);
  border: 1px solid rgb(255 255 255 / 80%);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.recent-activity-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 200% 0; }
  50% { background-position: -200% 0; }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-with-pulse {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.activity-pulse-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pulse-dot {
  width: 4px;
  height: 4px;
  background: #34d399;
  border-radius: 50%;
  animation: livePulse 1.5s ease-in-out infinite;
}

@keyframes livePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}

.live-text {
  font-size: 0.6rem;
}

.activity-counter {
  font-size: 0.7rem;
  color: #3b82f6;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  font-weight: 700;
  border: 1px solid #93c5fd;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.refresh-btn,
.view-all-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.refresh-btn {
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  color: #64748b;
  border: 1px solid #cbd5e1;
}

.refresh-btn:hover {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  color: #475569;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
}

.view-all-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: 1px solid #2563eb;
}

.view-all-btn:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgb(59 130 246 / 40%);
}

.refresh-btn svg,
.view-all-btn svg {
  width: 0.9rem;
  height: 0.9rem;
  transition: transform 0.3s ease;
}

.refresh-btn:hover svg {
  transform: rotate(180deg);
}

/* Modern Horizontal Activity Stream */
.activity-stream {
  position: relative;
  overflow: auto hidden;
  padding-bottom: 0.5rem;
}

.activity-timeline {
  display: flex;
  gap: 1rem;
  min-height: 140px;
  padding: 0.5rem 0;
}

.activity-card {
  min-width: 280px;
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.6s ease-out both;
  cursor: pointer;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgb(0 0 0 / 15%);
  border-color: #3b82f6;
}

.activity-card.latest {
  background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
  border: 2px solid #3b82f6;
  box-shadow: 0 8px 24px rgb(59 130 246 / 20%);
}

.activity-card.latest::before {
  content: 'Latest';
  position: absolute;
  top: -1px;
  right: 1rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 0 0 8px 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.activity-card.confirmed {
  border-left: 4px solid #10b981;
}

.activity-card.pending {
  border-left: 4px solid #f59e0b;
}

.activity-card.cancelled {
  border-left: 4px solid #ef4444;
}

.activity-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.activity-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgb(255 255 255 / 50%) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.activity-card:hover .activity-icon::before {
  transform: translateX(100%);
}

.activity-icon.confirmed {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #16a34a;
  border: 1px solid #86efac;
}

.activity-icon.pending {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #d97706;
  border: 1px solid #fbbf24;
}

.activity-icon.cancelled {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
  border: 1px solid #f87171;
}

.activity-icon svg {
  width: 1.2rem;
  height: 1.2rem;
  z-index: 1;
}

.activity-status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.activity-status-badge.confirmed {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #16a34a;
  border: 1px solid #86efac;
}

.activity-status-badge.pending {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #d97706;
  border: 1px solid #fbbf24;
}

.activity-status-badge.cancelled {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
  border: 1px solid #f87171;
}

.activity-card-content {
  flex: 1;
}

.activity-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.activity-description {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.4;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.activity-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.activity-time {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 600;
}

.activity-type-indicator {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.activity-type-indicator.appointment {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  color: #2563eb;
  border-color: #93c5fd;
}

/* Activity Connector */
.activity-connector {
  display: flex;
  align-items: center;
  min-width: 2rem;
  position: relative;
}

.connector-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #e2e8f0, #cbd5e1, #e2e8f0);
  background-size: 200% 100%;
  animation: flow 2s ease-in-out infinite;
}

@keyframes flow {
  0%, 100% { background-position: 200% 0; }
  50% { background-position: -200% 0; }
}

.connector-arrow {
  position: absolute;
  right: -6px;
  width: 12px;
  height: 12px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
}

.connector-arrow svg {
  width: 0.6rem;
  height: 0.6rem;
  color: #64748b;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(90deg, transparent, rgb(248 250 252 / 90%));
  padding: 1rem 0.5rem 1rem 2rem;
  pointer-events: none;
}

.scroll-hint {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #94a3b8;
  font-size: 0.7rem;
  font-weight: 600;
  animation: fadeInOut 3s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.scroll-hint svg {
  width: 0.8rem;
  height: 0.8rem;
}

/* Enhanced No Activities State */
.no-activities-modern {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
}

.no-activities-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 300px;
}

.empty-state-icon {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.empty-state-icon svg {
  width: 2rem;
  height: 2rem;
}

.empty-state-text h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem;
}

.empty-state-text p {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

.create-activity-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgb(59 130 246 / 30%);
}

.create-activity-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgb(59 130 246 / 40%);
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}

.create-activity-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Scrollbar Styling */
.activity-stream::-webkit-scrollbar {
  height: 6px;
}

.activity-stream::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.activity-stream::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #cbd5e1, #94a3b8);
  border-radius: 3px;
}

.activity-stream::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #94a3b8, #64748b);
}

/* Responsive Design */
@media (width <= 768px) {
  .recent-activity-section {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .title-with-pulse {
    flex-wrap: wrap;
  }
  
  .activity-card {
    min-width: 250px;
  }
  
  .activity-timeline {
    gap: 0.75rem;
  }
  
  .scroll-indicator {
    display: none;
  }
  
  .no-activities-content {
    padding: 1rem;
  }
  
  .empty-state-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .empty-state-icon svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* Quick Actions Section */
.quick-actions-section {
  margin-bottom: 2rem;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.quick-action-card {
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border: 1px solid rgb(255 255 255 / 80%);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgb(0 0 0 / 6%);
  backdrop-filter: blur(10px);
  text-align: center;
  color: #1e293b;
  font-weight: 600;
}

.quick-action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgb(0 0 0 / 12%);
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.action-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 16px rgb(14 165 233 / 30%);
}

.action-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

/* Responsive Design with Fixed Widths */
@media (width <= 1440px) {
  .sidebar {
    width: 300px;
    min-width: 300px;
    max-width: 300px;
  }
  
  .sidebar.collapsed {
    width: 80px;
    min-width: 80px;
    max-width: 80px;
  }
  
  .main-content {
    margin-left: 300px;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 80px;
  }
  
  .top-header {
    left: 300px;
  }
  
  .main-content.sidebar-collapsed .top-header {
    left: 80px;
  }
}

@media (width <= 1200px) {
  .sidebar {
    width: 280px;
    min-width: 280px;
    max-width: 280px;
  }
  
  .sidebar.collapsed {
    width: 70px;
    min-width: 70px;
    max-width: 70px;
  }
  
  .main-content {
    margin-left: 280px;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 70px;
  }
  
  .top-header {
    left: 280px;
    padding: 1.25rem 1.5rem;
  }
  
  .main-content.sidebar-collapsed .top-header {
    left: 70px;
  }
  
  .content-wrapper {
    padding: 1.5rem;
    padding-top: 5.5rem;
  }
  
  .sidebar-header {
    padding: 1.5rem 1.25rem;
  }
  
  .sidebar.collapsed .sidebar-header {
    padding: 1.5rem 0.75rem;
  }
  
  .nav-btn {
    padding: 0.875rem 1.5rem;
    gap: 1rem;
  }
  
  .sidebar.collapsed .nav-btn {
    padding: 0.875rem 0.75rem;
    justify-content: center;
  }
  
  .header-user-profile {
    gap: 1rem;
    padding: 0.625rem 1rem;
  }
  
  .header-user-name {
    font-size: 0.95rem;
  }
  
  .header-user-specialty {
    font-size: 0.8rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr); /* 2x2 grid on medium screens */
    gap: 1.25rem;
  }
  
  .stat-card {
    min-height: 110px; /* Smaller for medium screens */
  }
}

@media (width <= 992px) {
  .sidebar {
    width: 260px;
    min-width: 260px;
    max-width: 260px;
  }
  
  .sidebar.collapsed {
    width: 70px;
    min-width: 70px;
    max-width: 70px;
  }
  
  .main-content {
    margin-left: 260px;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 70px;
  }
  
  .top-header {
    left: 260px;
    padding: 1rem 1.25rem;
  }
  
  .main-content.sidebar-collapsed .top-header {
    left: 70px;
  }
  
  .content-wrapper {
    padding-top: 5rem;
  }
  
  .logo-title {
    font-size: 1.25rem;
  }
  
  .nav-btn {
    font-size: 0.95rem;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
  }
  
  .header-user-profile {
    gap: 0.75rem;
  }
  
  .header-user-avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on smaller tablets */
    gap: 1rem;
  }
  
  .stat-card {
    min-height: 100px;
    padding: 1rem 0.875rem; /* Smaller padding */
  }
  
  .activity-cards {
    grid-template-columns: 1fr;
  }
  
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (width <= 768px) {
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
    width: 280px;
    min-width: 280px;
    max-width: 280px;
    z-index: 9998;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    width: 280px;
    min-width: 280px;
    max-width: 280px;
  }
  
  .main-content {
    margin-left: 0;
    width: 100%;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
  
  .top-header {
    left: 0;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .main-content.sidebar-collapsed .top-header {
    left: 0;
  }
  
  .content-wrapper {
    padding: 1rem;
    padding-top: 8rem; /* Increased for mobile stacked header */
  }
  
  .header-left {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dashboard-title {
    font-size: 1.375rem;
  }
  
  .header-right {
    justify-content: center;
  }
  
  .header-user-profile {
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .stats-grid {
    grid-template-columns: 1fr; /* Single column on mobile */
    gap: 1rem;
  }
  
  .stat-card {
    min-height: 90px; /* Smaller mobile cards */
    padding: 1rem;
    flex-direction: row; /* Horizontal layout on mobile for better space usage */
    text-align: left;
  }
  
  .stat-icon {
    margin-bottom: 0;
    margin-right: 0.75rem; /* Smaller margin */
    width: 2.25rem; /* Smaller mobile icon */
    height: 2.25rem;
  }
  
  .stat-content {
    align-items: flex-start;
    text-align: left;
  }
  
  .stat-trend {
    justify-content: flex-start;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .activity-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .quick-actions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .view-all-btn {
    align-self: center;
  }
  
  .sidebar-expand-btn {
    display: none;
  }
  
  .navbar {
    padding: 1rem 1.5rem;
    border-radius: 16px;
  }
  
  .navbar span {
    font-size: 1.5rem;
  }
}

@media (width <= 480px) {
  .sidebar {
    width: 100vw;
    min-width: 100vw;
    max-width: 100vw;
  }
  
  .content-wrapper {
    padding: 0.75rem;
    padding-top: 10rem; /* Increased for mobile vertical layout */
  }
  
  .top-header {
    padding: 0.75rem;
  }
  
  .dashboard-title {
    font-size: 1.25rem;
  }
  
  .header-user-profile {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .header-user-info {
    text-align: center;
  }
  
  .header-user-avatar {
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 auto;
  }
  
  .welcome-card {
    padding: 2rem 1.5rem;
  }
  
  .welcome-title {
    font-size: 1.75rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
  
  .quick-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .quick-action-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .stat-card {
    flex-direction: column; /* Back to vertical on very small screens */
    text-align: center;
    padding: 0.875rem; /* Smaller padding */
    min-height: 80px; /* Much smaller height */
  }
  
  .stat-icon {
    margin-right: 0;
    margin-bottom: 0.5rem; /* Smaller margin */
    width: 2rem; /* Much smaller icon */
    height: 2rem;
  }
  
  .stat-content {
    align-items: center;
    text-align: center;
  }
  
  .stat-value {
    font-size: 1.5rem; /* Smaller value text */
  }
  
  .stat-trend {
    justify-content: center;
  }
  
  .activity-card {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem;
  }
  
  .quick-action-card {
    padding: 1.5rem;
  }
  
  .navbar {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 12px;
  }
  
  .navbar span {
    font-size: 1.1rem;
  }
  
  .sidebar-header {
    padding: 1.25rem;
  }
  
  .logo-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .logo-svg {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .nav-btn {
    padding: 1rem 1.5rem;
    min-height: 3.25rem;
  }
}

/* Custom Scrollbar for Sidebar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgb(255 255 255 / 5%);
}

.sidebar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgb(59 130 246 / 50%), rgb(147 51 234 / 50%));
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgb(59 130 246 / 70%), rgb(147 51 234 / 70%));
}

.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgb(255 255 255 / 20%);
  border-radius: 2px;
}

/* Animations and Transitions */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.sidebar {
  animation: slideInFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn:hover {
  transform: translateX(8px);
}

/* Focus States for Accessibility */
.nav-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.logout-btn:focus {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .sidebar {
    display: none;
  }
  
  .main-content {
    margin-left: 0;
    padding: 0;
  }
}
</style>