<style scoped>
@media (max-width: 900px) {
  .dashboard-container {
    flex-direction: column !important;
    padding: 1rem !important;
    gap: 1.5rem !important;
  }
}
@media (max-width: 600px) {
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
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="logo-text" v-show="!sidebarCollapsed">
            <h3 class="logo-title">AdminBuddy</h3>
            <p class="logo-subtitle">Control Panel</p>
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
                :class="{ 'active': showDoctors }"
                @click="showDoctorsPage"
                :title="sidebarCollapsed ? 'Doctors' : ''"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <span class="nav-text" v-show="!sidebarCollapsed">Doctors</span>
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
                :title="sidebarCollapsed ? 'Reports' : ''"
              >
                <div class="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <span class="nav-text" v-show="!sidebarCollapsed">Reports</span>
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
              <span class="header-user-name">{{ adminData.full_name || adminData.username || 'Admin User' }}</span>
              <span class="header-user-specialty">{{ adminData.role || 'System Administrator' }}</span>
            </div>
            <div class="header-user-avatar">
              <img v-if="adminData.profile_photo" :src="adminData.profile_photo" :alt="adminData.full_name" class="profile-photo" />
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
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
              <!-- Total Doctors Card -->
              <div class="stat-card doctors-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <h3 class="stat-value">{{ dashboardStats.totalDoctors }}</h3>
                  <p class="stat-label">Total Doctors</p>
                  <div class="stat-trend">
                    <span class="trend-icon positive">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </span>
                    <span class="trend-text">+{{ dashboardStats.newDoctors }} this month</span>
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
                    <span class="trend-text">+{{ dashboardStats.newPatients }} this month</span>
                  </div>
                </div>
              </div>

              <!-- Pending Approvals Card -->
              <div class="stat-card pending-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <h3 class="stat-value">{{ dashboardStats.pendingApprovals }}</h3>
                  <p class="stat-label">Pending Approvals</p>
                  <div class="stat-trend">
                    <span class="trend-icon warning">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                      </svg>
                    </span>
                    <span class="trend-text">Requires attention</span>
                  </div>
                </div>
              </div>

              <!-- System Health Card -->
              <div class="stat-card health-card">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <h3 class="stat-value">{{ dashboardStats.systemHealth }}%</h3>
                  <p class="stat-label">System Health</p>
                  <div class="stat-trend">
                    <span class="trend-icon positive">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </span>
                    <span class="trend-text">All systems operational</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions-section">
              <h2 class="section-title">Quick Actions</h2>
              <div class="quick-actions-grid">
                <button class="quick-action-card" @click="showDoctorsPage">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  </div>
                  <span>Manage Doctors</span>
                </button>

                <button class="quick-action-card" @click="showPatientsPage">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  </div>
                  <span>Manage Patients</span>
                </button>

                <button class="quick-action-card">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <span>View Reports</span>
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

        <!-- Doctors Management Page -->
        <template v-else-if="showDoctors">
          <div class="doctors-management">
            <div class="management-header">
              <h2>Doctors Management</h2>
              <div class="management-actions">
                <button class="action-btn primary" @click="refreshData">
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 3a5 5 0 104.546 2.914.5.5 0 00-.908-.417A4 4 0 118 4v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z"/>
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            <!-- Doctors Table -->
            <div class="table-container">
              <div v-if="doctors.length === 0" class="no-data">
                <div class="no-data-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <h3>No doctors found</h3>
                <p>There are no doctors registered in the system yet.</p>
              </div>
              <div v-else class="modern-table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          v-model="selectAllDoctors"
                          @change="toggleSelectAll('doctors')"
                          class="table-checkbox"
                        />
                      </th>
                      <th>Doctor</th>
                      <th>Email</th>
                      <th>Specialty</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="doc in doctors" :key="doc.id" class="table-row">
                      <td>
                        <input
                          type="checkbox"
                          v-model="selectedDoctors"
                          :value="doc.id"
                          class="table-checkbox"
                        />
                      </td>
                      <td class="user-info">
                        <div class="user-avatar">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div class="user-details">
                          <div class="user-name">{{ doc.full_name }}</div>
                          <div class="user-id">ID: {{ doc.id }}</div>
                        </div>
                      </td>
                      <td class="email-cell">{{ doc.email }}</td>
                      <td class="specialty-cell">{{ doc.specialty || 'General Practice' }}</td>
                      <td>
                        <div class="status-badges">
                          <span :class="doc.approved ? 'status-badge approved' : 'status-badge pending'">
                            {{ doc.approved ? 'Approved' : 'Pending' }}
                          </span>
                          <span :class="doc.suspended ? 'status-badge suspended' : 'status-badge active'">
                            {{ doc.suspended ? 'Suspended' : 'Active' }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="action-buttons">
                          <button
                            class="action-btn approve"
                            @click="approveDoctor(doc.id)"
                            :disabled="doc.approved"
                            title="Approve Doctor"
                          >
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 011.02-.12z"/>
                            </svg>
                          </button>
                          <button
                            class="action-btn reject"
                            @click="rejectDoctor(doc.id)"
                            :disabled="!doc.approved"
                            title="Reject Doctor"
                          >
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M5.93 5.93L1.07 1.07a.75.75 0 00-1.06 1.06L4.87 7.5.01 12.36a.75.75 0 101.06 1.06L5.93 8.57l3.91 3.91a.75.75 0 001.06-1.06L7.05 7.5l3.85-3.85a.75.75 0 00-1.06-1.06L5.93 5.93z"/>
                            </svg>
                          </button>
                          <button
                            class="action-btn view"
                            @click="viewDoctor(doc.id)"
                            title="View Details"
                          >
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M8 2a6 6 0 100 12 6 6 0 000-12zM8 4a4 4 0 110 8 4 4 0 010-8z"/>
                              <path d="M8 6a2 2 0 100 4 2 2 0 000-4z"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- Patients Management Page -->
        <template v-else-if="showPatients">
          <div class="patients-management">
            <div class="management-header">
              <h2>Patients Management</h2>
              <div class="management-actions">
                <button class="action-btn primary" @click="refreshData">
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 3a5 5 0 104.546 2.914.5.5 0 00-.908-.417A4 4 0 118 4v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z"/>
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            <!-- Patients Table -->
            <div class="table-container">
              <div v-if="patients.length === 0" class="no-data">
                <div class="no-data-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <h3>No patients found</h3>
                <p>There are no patients registered in the system yet.</p>
              </div>
              <div v-else class="modern-table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          v-model="selectAllPatients"
                          @change="toggleSelectAll('patients')"
                          class="table-checkbox"
                        />
                      </th>
                      <th>Patient</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="pat in patients" :key="pat.id" class="table-row">
                      <td>
                        <input
                          type="checkbox"
                          v-model="selectedPatients"
                          :value="pat.id"
                          class="table-checkbox"
                        />
                      </td>
                      <td class="user-info">
                        <div class="user-avatar">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div class="user-details">
                          <div class="user-name">{{ pat.full_name }}</div>
                          <div class="user-id">ID: {{ pat.id }}</div>
                        </div>
                      </td>
                      <td class="email-cell">{{ pat.email }}</td>
                      <td class="mobile-cell">{{ pat.mobile }}</td>
                      <td>
                        <span :class="pat.is_active ? 'status-badge active' : 'status-badge deactivated'">
                          {{ pat.is_active ? 'Active' : 'Deactivated' }}
                        </span>
                      </td>
                      <td>
                        <div class="action-buttons">
                          <button
                            class="action-btn deactivate"
                            @click="deactivatePatient(pat.id)"
                            :disabled="!pat.is_active"
                            title="Deactivate Patient"
                          >
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M8 2a1 1 0 00-1 1v4.586L4.707 6.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L9 7.586V3a1 1 0 00-1-1z"/>
                              <path d="M3 9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                            </svg>
                          </button>
                          <button
                            class="action-btn activate"
                            @click="activatePatient(pat.id)"
                            :disabled="pat.is_active"
                            title="Activate Patient"
                          >
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M8 15a7 7 0 100-14 7 7 0 000 14z"/>
                              <path d="M8 6a1 1 0 011 1v3h2a1 1 0 110 2H7a1 1 0 01-1-1V7a1 1 0 011-1z" fill="white"/>
                            </svg>
                          </button>
                          <button
                            class="action-btn view"
                            @click="viewPatient(pat.id)"
                            title="View Details"
                          >
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M8 2a6 6 0 100 12 6 6 0 000-12zM8 4a4 4 0 110 8 4 4 0 010-8z"/>
                              <path d="M8 6a2 2 0 100 4 2 2 0 000-4z"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- Default Welcome Page -->
        <template v-else>
          <div class="welcome-container">
            <div class="welcome-card">
              <div class="welcome-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h2 class="welcome-title">Welcome to Admin Dashboard</h2>
              <p class="welcome-subtitle">Select an option from the sidebar to get started</p>
              <div class="quick-actions">
                <button class="quick-action-btn" @click="showDashboardPage">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <path d="M9 9h6m-6 4h6m-3-2V7"/>
                  </svg>
                  View Dashboard
                </button>
                <button class="quick-action-btn" @click="showDoctorsPage">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                  Manage Doctors
                </button>
                <button class="quick-action-btn" @click="showPatientsPage">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                  Manage Patients
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>

    <!-- Popups -->
    <PatientPopup
      v-if="showPatientPopup"
      :patient="patientPopupData"
      @close="closePatientPopup"
    />

    <DoctorPopup
      v-if="showDoctorPopup"
      :doctor="doctorPopupData"
      @close="closeDoctorPopup"
      @approve="handleApproveDoctor"
      @suspend="handleSuspendDoctor"
      @unsuspend="handleUnsuspendDoctor"
    />
  </div>
</template>

<script>
import axios from 'axios';
import PatientPopup from './PatientPopup.vue';
import DoctorPopup from './DoctorPopup.vue';
import ToastNotification from '../ToastNotification.vue';

export default {
  name: 'AdminDashboard',
  components: {
    PatientPopup,
    DoctorPopup,
    ToastNotification,
  },
  data() {
    return {
      // View states
      showDashboard: true,
      showDoctors: false,
      showPatients: false,

      // Sidebar state
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      isMobile: false,

      // User dropdown
      showUserDropdown: false,

      // Admin user data
      adminData: {
        email: '',
        full_name: '',
        id: null,
        mobile: '',
        profile_photo: null,
        role: '',
        username: ''
      },

      // Dashboard stats
      dashboardStats: {
        totalDoctors: 0,
        totalPatients: 0,
        pendingApprovals: 0,
        systemHealth: 98,
        newDoctors: 0,
        newPatients: 0
      },

      // Existing data
      doctors: [],
      patients: [],
      selectAllDoctors: false,
      selectAllPatients: false,
      selectedDoctors: [],
      selectedPatients: [],
      showPatientPopup: false,
      patientPopupData: null,
      showDoctorPopup: false,
      doctorPopupData: null,
    };
  },
  async mounted() {
    await this.fetchAdminData();
    await this.fetchData();
    await this.loadDashboardStats();
    this.checkMobile();

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
    async fetchData() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [doctorsRes, patientsRes] = await Promise.all([
          axios.get('http://localhost:5000/admin/doctors', { headers }),
          axios.get('http://localhost:5000/admin/patients', { headers }),
        ]);

        this.doctors = doctorsRes.data;
        this.patients = patientsRes.data;

        // Update dashboard stats
        this.updateDashboardStats();
      } catch (err) {
        console.error('Error fetching data:', err);
        this.$refs.toast?.showError('Failed to fetch dashboard data. Please make sure you are logged in.', 'Error', 5000);
      }
    },

    updateDashboardStats() {
      // Calculate stats from fetched data
      this.dashboardStats.totalDoctors = this.doctors.length;
      this.dashboardStats.totalPatients = this.patients.length;
      this.dashboardStats.pendingApprovals = this.doctors.filter(d => !d.approved).length;
      // Mock new registrations for demo
      this.dashboardStats.newDoctors = Math.floor(Math.random() * 5) + 1;
      this.dashboardStats.newPatients = Math.floor(Math.random() * 10) + 5;
    },

    async loadDashboardStats() {
      await this.fetchData();
    },

    // Navigation methods
    showDashboardPage() {
      this.showDashboard = true;
      this.showDoctors = false;
      this.showPatients = false;
      this.mobileMenuOpen = false;
    },

    showDoctorsPage() {
      this.showDashboard = false;
      this.showDoctors = true;
      this.showPatients = false;
      this.mobileMenuOpen = false;
    },

    showPatientsPage() {
      this.showDashboard = false;
      this.showDoctors = false;
      this.showPatients = true;
      this.mobileMenuOpen = false;
    },

    // Sidebar methods
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
      if (this.showDoctors) return 'Doctors Management';
      if (this.showPatients) return 'Patients Management';
      return 'Admin Dashboard';
    },

    // User dropdown methods
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },

    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.header-user-profile');
      if (dropdown && !dropdown.contains(event.target)) {
        this.showUserDropdown = false;
      }
    },

    async refreshData() {
      await this.fetchData();
      await this.fetchAdminData();
      this.$refs.toast?.showSuccess('Data refreshed successfully!', 'Success', 3000);
    },

    async fetchAdminData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        // Get admin data from localStorage (from login response)
        const adminDataStr = localStorage.getItem('admin');
        if (adminDataStr) {
          this.adminData = JSON.parse(adminDataStr);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    },

    async approveDoctor(id) {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/admin/doctors/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.fetchData();
    },

    async rejectDoctor(id) {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/admin/doctors/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.fetchData();
    },

    async deactivatePatient(id) {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/admin/patients/${id}/deactivate`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.fetchData();
    },

    async activatePatient(id) {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/admin/patients/${id}/activate`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.fetchData();
    },

    async viewDoctor(id) {
      try {
        console.log('View doctor clicked, ID:', id);
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:5000/admin/doctors/view?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Doctor API Response:', response);

        const doc = response.data.data ? response.data.data : response.data;
        console.log('Processed doctor data:', doc);

        if (!doc || Object.keys(doc).length === 0) {
          console.error('Doctor details not found or empty');
          alert('Doctor details not found.');
          return;
        }

        this.doctorPopupData = doc;
        this.showDoctorPopup = true;
        console.log('Doctor popup should be visible');

        await this.$nextTick();
      } catch (err) {
        console.error('Error in viewDoctor:', err);
        alert('Failed to load doctor details.');
      }
    },

    async viewPatient(id) {
      try {
        console.log('1. View patient clicked, ID:', id);
        const token = localStorage.getItem('token');
        console.log('2. Token exists:', !!token);

        // Log the current state before making the API call
        console.log('3. Current popup state - showPatientPopup:', this.showPatientPopup);
        console.log('4. Current popup data - patientPopupData:', this.patientPopupData);

        const response = await axios.get(`http://127.0.0.1:5000/admin/patient/view?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('5. API Response status:', response.status);
        console.log('6. API Response data:', response.data);

        const pat = response.data.data ? response.data.data : response.data;
        console.log('7. Processed patient data:', pat);

        if (!pat || Object.keys(pat).length === 0) {
          console.error('8. Patient details not found or empty');
          alert('Patient details not found.');
          return;
        }

        // Set the data first
        this.patientPopupData = pat;
        console.log('9. Set patientPopupData:', this.patientPopupData);

        // Then show the popup
        this.showPatientPopup = true;
        console.log('10. Set showPatientPopup to true');

        // Force Vue to update the DOM
        await this.$nextTick();
        console.log('11. After $nextTick - popup should be visible');
      } catch (err) {
        console.error('Error in viewPatient:', err);
        alert('Failed to load patient details.');
      }
    },

    closePatientPopup() {
      console.log('Closing patient popup');
      this.showPatientPopup = false;
      this.patientPopupData = null;
      console.log('Popup state after close - showPatientPopup:', this.showPatientPopup);
    },

    closeDoctorPopup() {
      console.log('Closing doctor popup');
      this.showDoctorPopup = false;
      this.doctorPopupData = null;
      console.log('Popup state after close - showDoctorPopup:', this.showDoctorPopup);
    },

    async handleApproveDoctor(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/admin/doctors/${id}/approve`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.closeDoctorPopup();
        this.fetchData();
      } catch (err) {
        console.error('Error approving doctor:', err);
        alert('Failed to approve doctor.');
      }
    },

    async handleSuspendDoctor(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/admin/doctors/${id}/suspend`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.closeDoctorPopup();
        this.fetchData();
      } catch (err) {
        console.error('Error suspending doctor:', err);
        alert('Failed to suspend doctor.');
      }
    },

    async handleUnsuspendDoctor(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/admin/doctors/${id}/unsuspend`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.closeDoctorPopup();
        this.fetchData();
      } catch (err) {
        console.error('Error unsuspending doctor:', err);
        alert('Failed to unsuspend doctor.');
      }
    },
    toggleSelectAll(type) {
      if (type === 'doctors') {
        this.selectedDoctors = this.selectAllDoctors ? this.doctors.map(doc => doc.id) : [];
      } else if (type === 'patients') {
        this.selectedPatients = this.selectAllPatients ? this.patients.map(pat => pat.id) : [];
      }
    },
    async logout() {
      this.showUserDropdown = false;
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://127.0.0.1:5000/api/admin/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Logout API error:', err);
      }
      localStorage.removeItem('token');
      this.$router.replace('/'); // Prevent going back to dashboard
    },
  },
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

/* Modern Sidebar Styling */
.sidebar {
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  width: 320px;
  min-width: 320px;
  max-width: 320px;
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
  pointer-events: none;
}

/* Sidebar Header */
.sidebar-header {
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.sidebar.collapsed .sidebar-header {
  padding: 1.5rem 1rem 2rem 1rem;
  justify-content: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
  margin-top: 0.25rem;
}

.sidebar.collapsed .logo-container {
  justify-content: center;
  margin-top: 0.25rem;
}

.sidebar-collapse-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 0.125rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-collapse-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sidebar-collapse-btn svg {
  width: 18px;
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
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  z-index: 1001;
}

.sidebar-expand-btn:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
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
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
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
  margin: 0.25rem 0 0 0;
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
  color: rgba(255, 255, 255, 0.85);
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
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.05));
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
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.2), rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.05));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
  filter: drop-shadow(0 2px 4px rgba(14, 165, 233, 0.4));
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
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.5);
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 320px;
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

/* Top Header */
.top-header {
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
  border-bottom: 3px solid;
  border-image: linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981) 1;
  padding: 1rem 2rem;
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.15);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 320px;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 60px;
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
  background: rgba(14, 165, 233, 0.1);
}

.mobile-menu-btn svg {
  width: 24px;
  height: 24px;
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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(14, 165, 233, 0.1);
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 100%);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: visible;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-user-profile:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(14, 165, 233, 0.18);
}

.header-user-profile.dropdown-open {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.2);
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
  -webkit-background-clip: text;
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
  box-shadow: 0 8px 16px rgba(14, 165, 233, 0.3);
  flex-shrink: 0;
  border: 3px solid rgba(255, 255, 255, 0.8);
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
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.header-user-avatar .profile-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.8);
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
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
  border: 1px solid rgba(14, 165, 233, 0.1);
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
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
  color: #dc2626;
  transform: translateX(4px);
}

.dropdown-signout-btn svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* Content Wrapper */
.content-wrapper {
  flex: 1;
  padding: 2rem;
  padding-top: 4rem;
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
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
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
  margin: 0 auto 2rem auto;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
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
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0 0 2rem 0;
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
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
  min-width: 180px;
  justify-content: center;
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
  background: linear-gradient(135deg, #059669, #047857);
}

.quick-action-btn svg {
  width: 1.375rem;
  height: 1.375rem;
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
  width: 2.5rem;
  height: 2.5rem;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  width: 1.125rem;
  height: 1.125rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.stat-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 1.25rem 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 120px;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.doctors-card::before {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.patients-card::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.pending-card::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.health-card::before {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 0.75rem;
}

.doctors-card .stat-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.patients-card .stat-icon {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.pending-card .stat-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.health-card .stat-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.stat-icon svg {
  width: 1.25rem;
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
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 0.25rem 0;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
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
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.trend-icon.positive {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.trend-icon.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.trend-icon svg {
  width: 0.625rem;
  height: 0.625rem;
}

.trend-text {
  font-size: 0.7rem;
  color: #10b981;
  font-weight: 600;
}

.trend-icon.warning + .trend-text {
  color: #f59e0b;
}

/* Quick Actions Section */
.quick-actions-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.quick-action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
  min-height: 140px;
  justify-content: center;
}

.quick-action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #3b82f6;
}

.action-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
}

.action-icon svg {
  width: 1.75rem;
  height: 1.75rem;
  color: white;
}

.quick-action-card span {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
}

/* Management Pages Styles */
.doctors-management,
.patients-management {
  padding: 0;
}

.management-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.management-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.management-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn.primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.35);
}

.action-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

/* Table Styles */
.table-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.no-data {
  text-align: center;
  padding: 3rem;
}

.no-data-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem auto;
  color: #cbd5e1;
}

.no-data h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #64748b;
  margin: 0 0 0.5rem 0;
}

.no-data p {
  color: #94a3b8;
  margin: 0;
}

.modern-table {
  overflow-x: auto;
}

.modern-table table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th {
  background: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.table-row:hover {
  background: #f8fafc;
}

.table-checkbox {
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-avatar svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.user-id {
  font-size: 0.75rem;
  color: #94a3b8;
}

.email-cell,
.mobile-cell,
.specialty-cell {
  color: #64748b;
  font-size: 0.875rem;
}

.status-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.approved {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.status-badge.pending {
  background: #fef3c7;
  color: #d97706;
  border: 1px solid #fde68a;
}

.status-badge.active {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.status-badge.suspended {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.status-badge.deactivated {
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn.approve,
.action-btn.activate {
  width: 2.5rem !important;
  height: 2.5rem !important;
  background: #dcfce7 !important;
  border: 2px solid #bbf7d0 !important;
  border-radius: 8px !important;
  color: #16a34a !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2) !important;
  padding: 0 !important;
  gap: 0 !important;
}

.action-btn.approve:hover,
.action-btn.activate:hover {
  background: #bbf7d0 !important;
  transform: scale(1.05) !important;
  box-shadow: 0 4px 8px rgba(34, 197, 94, 0.3) !important;
}

.action-btn.reject,
.action-btn.deactivate {
  width: 2.5rem !important;
  height: 2.5rem !important;
  background: #fee2e2 !important;
  border: 2px solid #fecaca !important;
  border-radius: 8px !important;
  color: #dc2626 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2) !important;
  padding: 0 !important;
  gap: 0 !important;
}

.action-btn.reject:hover,
.action-btn.deactivate:hover {
  background: #fecaca !important;
  transform: scale(1.05) !important;
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3) !important;
}

.action-btn.view {
  width: 2.5rem !important;
  height: 2.5rem !important;
  background: #dbeafe !important;
  border: 2px solid #bfdbfe !important;
  border-radius: 8px !important;
  color: #1d4ed8 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2) !important;
  padding: 0 !important;
  gap: 0 !important;
}

.action-btn.view:hover {
  background: #bfdbfe !important;
  transform: scale(1.05) !important;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3) !important;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .top-header {
    left: 0;
  }

  .main-content.sidebar-collapsed .top-header {
    left: 0;
  }

  .content-wrapper {
    padding: 1rem;
    padding-top: 5rem;
  }

  .management-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions-grid {
    grid-template-columns: 1fr;
  }

  .modern-table {
    font-size: 0.875rem;
  }

  .modern-table th,
  .modern-table td {
    padding: 0.75rem 0.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
