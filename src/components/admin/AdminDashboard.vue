<template>
  <div class="admin-layout">
    <CommonHeader 
      :current-page="currentView" 
      :user-info="adminInfo"
      :user-role="'admin'"
      @navigate="handleNavigation"
      @logout="logout"
    />
    
    <main class="main-content">
      <div class="container mx-auto px-4 py-6">
        <!-- Dynamic content based on current view -->
        <div v-if="currentView === 'dashboard'" class="dashboard-view">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div class="text-sm text-gray-600">
              Welcome back, <span class="font-semibold text-medical-primary">{{ adminInfo?.full_name || 'Admin' }}</span>
            </div>
          </div>
          
          <!-- Dashboard Stats -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                  <i class="fas fa-user-md text-xl"></i>
                </div>
                <div class="ml-4">
                  <p class="text-gray-500">Total Doctors</p>
                  <p class="text-2xl font-bold">{{ stats.totalDoctors || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100 text-green-600">
                  <i class="fas fa-users text-xl"></i>
                </div>
                <div class="ml-4">
                  <p class="text-gray-500">Total Patients</p>
                  <p class="text-2xl font-bold">{{ stats.totalPatients || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <i class="fas fa-calendar-check text-xl"></i>
                </div>
                <div class="ml-4">
                  <p class="text-gray-500">Today's Appointments</p>
                  <p class="text-2xl font-bold">{{ stats.todaysAppointments || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                  <i class="fas fa-clock text-xl"></i>
                </div>
                <div class="ml-4">
                  <p class="text-gray-500">Pending Approvals</p>
                  <p class="text-2xl font-bold">{{ stats.pendingApprovals || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button class="text-sm text-medical-primary hover:text-medical-primary/80">View All</button>
            </div>
            <div class="space-y-4">
              <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <i :class="activity.icon"></i>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-700">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
                </div>
              </div>
              <div v-if="recentActivities.length === 0" class="text-center py-4 text-gray-500">
                No recent activities found.
              </div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button 
              @click="currentView = 'doctors'"
              class="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-medical-primary hover:bg-medical-primary/5 transition-colors text-left"
            >
              <div class="flex items-center">
                <div class="p-2 rounded-full bg-blue-100 text-blue-600">
                  <i class="fas fa-user-md"></i>
                </div>
                <span class="ml-3 font-medium">Manage Doctors</span>
              </div>
            </button>
            
            <button 
              @click="currentView = 'patients'"
              class="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors text-left"
            >
              <div class="flex items-center">
                <div class="p-2 rounded-full bg-green-100 text-green-600">
                  <i class="fas fa-users"></i>
                </div>
                <span class="ml-3 font-medium">Manage Patients</span>
              </div>
            </button>
            
            <button 
              @click="currentView = 'appointments'"
              class="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-colors text-left"
            >
              <div class="flex items-center">
                <div class="p-2 rounded-full bg-yellow-100 text-yellow-600">
                  <i class="fas fa-calendar-check"></i>
                </div>
                <span class="ml-3 font-medium">View Appointments</span>
              </div>
            </button>
            
            <button 
              @click="currentView = 'settings'"
              class="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
            >
              <div class="flex items-center">
                <div class="p-2 rounded-full bg-purple-100 text-purple-600">
                  <i class="fas fa-cog"></i>
                </div>
                <span class="ml-3 font-medium">System Settings</span>
              </div>
            </button>
          </div>
        </div>
        
        <!-- Doctors View -->
        <DoctorsList 
          v-else-if="currentView === 'doctors'" 
          @navigate="handleNavigation"
        />
        
        <!-- Patients View -->
        <PatientsList 
          v-else-if="currentView === 'patients'" 
          @navigate="handleNavigation"
        />
        
        <!-- Profile View -->
        <AdminProfileCard 
          v-else-if="currentView === 'profile'" 
          @profile-updated="handleProfileUpdate"
        />
        
        <!-- Placeholder for other views -->
        <div v-else class="flex flex-col items-center justify-center py-12">
          <div class="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <div class="text-5xl text-gray-300 mb-4">
              <i v-if="currentView === 'appointments'" class="fas fa-calendar-check"></i>
              <i v-else-if="currentView === 'settings'" class="fas fa-cog"></i>
              <i v-else class="fas fa-folder-open"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">
              {{ getViewTitle(currentView) }}
            </h2>
            <p class="text-gray-500 mb-6">This section is under development.</p>
            <button 
              @click="currentView = 'dashboard'"
              class="px-4 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-primary/90 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
    <CommonFooter 
      :user-role="'admin'"
      @navigate="handleNavigation" 
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '@/config/api';
import CommonHeader from '../common/CommonHeader.vue';
import CommonFooter from '../common/CommonFooter.vue';
import DoctorsList from './AdminDoctorsList.vue';
import PatientsList from './AdminPatientsList.vue';
import AdminProfileCard from './AdminProfileCard.vue';

export default {
  name: 'AdminDashboard',
  components: {
    CommonHeader,
    CommonFooter,
    DoctorsList,
    PatientsList,
    AdminProfileCard
  },
  setup() {
    const router = useRouter();
    const currentView = ref('dashboard');
    
    // Admin info
    const adminInfo = ref({
      username: 'Admin',
      full_name: 'Administrator',
      role: 'Administrator',
      email: 'admin@doctorbaddy.com',
      profile_photo: null,
      lastLogin: new Date().toLocaleString()
    });
    
    // Dashboard stats
    const stats = ref({
      totalDoctors: 0,
      totalPatients: 0,
      todaysAppointments: 0,
      pendingApprovals: 0
    });
    
    // Recent activities
    const recentActivities = ref([
      {
        icon: 'fas fa-user-plus text-green-500',
        description: 'New doctor registration: Dr. Sarah Johnson',
        time: '10 minutes ago'
      },
      {
        icon: 'fas fa-calendar-check text-blue-500',
        description: 'New appointment booked with Dr. Michael Chen',
        time: '1 hour ago'
      },
      {
        icon: 'fas fa-file-medical text-purple-500',
        description: 'Medical report uploaded for patient #PAT-10023',
        time: '3 hours ago'
      },
      {
        icon: 'fas fa-user-md text-yellow-500',
        description: 'Dr. Robert Wilson updated his profile',
        time: '5 hours ago'
      },
      {
        icon: 'fas fa-comment-medical text-indigo-500',
        description: 'New patient review received',
        time: '1 day ago'
      }
    ]);
    
    // Navigation handler
    const handleNavigation = (view) => {
      currentView.value = view;
    };
    
    // Get view title
    const getViewTitle = (view) => {
      const titles = {
        'dashboard': 'Dashboard',
        'doctors': 'Doctors Management',
        'patients': 'Patients Management',
        'appointments': 'Appointments',
        'settings': 'System Settings'
      };
      return titles[view] || 'Page';
    };
    
    // Logout function
    const logout = () => {
      // Clear authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('adminInfo');
      // Redirect to login page and block back navigation
      router.replace('/login?role=admin');
    };
    
    // Load admin profile
    const loadAdminProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found, redirecting to login');
          router.replace('/admin-login');
          return;
        }

        const response = await axios.get(`${BASE_URL}/admin/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        adminInfo.value = { ...response.data };
        console.log('Admin profile loaded:', adminInfo.value);
      } catch (error) {
        console.error('Error loading admin profile:', error);
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          localStorage.removeItem('adminInfo');
          router.replace('/login?role=admin');
        }
        // Keep default admin info if profile loading fails
      }
    };

    // Handle profile update
    const handleProfileUpdate = (updatedProfile) => {
      adminInfo.value = { ...updatedProfile };
      console.log('Admin profile updated:', adminInfo.value);
    };

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Replace with actual API calls
        // const response = await axios.get(`${BASE_URL}/admin/dashboard`);
        // stats.value = response.data;
        
        // Mock data - remove in production
        stats.value = {
          totalDoctors: 42,
          totalPatients: 1287,
          todaysAppointments: 24,
          pendingApprovals: 5
        };
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    // Lifecycle hook
    onMounted(() => {
      loadAdminProfile();
      fetchDashboardData();
    });
    
    return {
      // State
      currentView,
      adminInfo,
      stats,
      recentActivities,
      
      // Methods
      handleNavigation,
      getViewTitle,
      logout,
      handleProfileUpdate
    };
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-content {
  flex: 1;
  padding-top: 80px; /* Height of the header */
  padding-bottom: 60px; /* Height of the footer */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 140px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

/* New Activity Pulse Animation */
@keyframes newActivityPulse {
  0% { box-shadow: 0 0 0 0 rgba(96, 245, 161, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(96, 245, 161, 0); }
  100% { box-shadow: 0 0 0 0 rgba(96, 245, 161, 0); }
}

.new-activity-pulse {
  animation: newActivityPulse 1s ease-out 3;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .main-content {
    padding-top: 70px;
    padding-bottom: 50px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 60px;
    padding-bottom: 40px;
  }
  
  .container {
    padding: 0.75rem;
  }
}

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

/* Existing styles */
h1, h2 {
  color: #2c3e50;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
}

th, td {
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  text-align: left;
}

th {
  background-color: #f8fafc;
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 1024px) {
  .container {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .grid {
    gap: 1rem !important;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0 !important;
  }
  
  .container {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  
  /* Dashboard header */
  .flex.items-center.justify-between {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.75rem !important;
    margin-bottom: 1.5rem !important;
  }
  
  .text-2xl {
    font-size: 1.5rem !important;
  }
  
  .text-sm {
    font-size: 0.875rem !important;
  }
  
  /* Stats grid - stack on mobile */
  .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.75rem !important;
    margin-bottom: 1.5rem !important;
  }
  
  /* Stats cards */
  .bg-white.p-6 {
    padding: 1rem !important;
  }
  
  .p-3.rounded-full {
    padding: 0.625rem !important;
  }
  
  .text-xl {
    font-size: 1rem !important;
  }
  
  .text-2xl.font-bold {
    font-size: 1.375rem !important;
  }
  
  .ml-4 {
    margin-left: 0.75rem !important;
  }
  
  .mb-8 {
    margin-bottom: 1.5rem !important;
  }
  
  /* Table responsiveness */
  table {
    font-size: 0.875rem;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border: 1px solid #e2e8f0;
  }
  
  thead, tbody, tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  
  th, td {
    padding: 0.5rem 0.75rem;
    word-wrap: break-word;
  }
  
  /* Buttons */
  .btn, button {
    font-size: 0.875rem !important;
    padding: 0.5rem 0.875rem !important;
  }
  
  /* Modal adjustments */
  .fixed.inset-0 {
    padding: 1rem !important;
  }
  
  .bg-white.rounded-lg {
    border-radius: 0.75rem !important;
    margin: 0 !important;
    max-height: 90vh !important;
    overflow-y: auto !important;
  }
}

@media (max-width: 480px) {
  .container {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  
  /* Single column stats on very small screens */
  .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
    grid-template-columns: 1fr !important;
    gap: 0.5rem !important;
  }
  
  /* Smaller stats cards */
  .bg-white.p-6 {
    padding: 0.75rem !important;
  }
  
  .text-2xl {
    font-size: 1.375rem !important;
  }
  
  .text-2xl.font-bold {
    font-size: 1.25rem !important;
  }
  
  /* Header adjustments */
  .flex.items-center.justify-between {
    margin-bottom: 1rem !important;
  }
  
  h1 {
    font-size: 1.375rem !important;
    margin-bottom: 0.5rem !important;
  }
  
  /* Table for very small screens */
  table {
    font-size: 0.8rem;
  }
  
  th, td {
    padding: 0.375rem 0.5rem;
    min-width: 80px;
  }
  
  /* Action buttons */
  .btn, button {
    font-size: 0.8rem !important;
    padding: 0.375rem 0.75rem !important;
    min-width: unset !important;
  }
  
  /* Hide less important columns on mobile */
  .mobile-hide {
    display: none !important;
  }
  
  /* Stack action buttons vertically */
  .action-buttons {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.25rem !important;
  }
  
  .action-buttons .btn {
    width: 100% !important;
    justify-content: center !important;
  }
}

@media (max-width: 360px) {
  .container {
    padding-left: 0.25rem !important;
    padding-right: 0.25rem !important;
  }
  
  .bg-white.p-6 {
    padding: 0.5rem !important;
    border-radius: 0.5rem !important;
  }
  
  .p-3.rounded-full {
    padding: 0.5rem !important;
  }
  
  .ml-4 {
    margin-left: 0.5rem !important;
  }
  
  .text-2xl {
    font-size: 1.25rem !important;
  }
  
  .text-2xl.font-bold {
    font-size: 1.125rem !important;
  }
  
  /* Very compact table */
  table {
    font-size: 0.75rem;
  }
  
  th, td {
    padding: 0.25rem 0.375rem;
    min-width: 60px;
  }
  
  .btn, button {
    font-size: 0.75rem !important;
    padding: 0.25rem 0.5rem !important;
  }
}
</style>
