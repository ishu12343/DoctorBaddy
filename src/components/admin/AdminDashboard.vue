<template>
  <div class="admin-layout">
    <AdminHeader 
      :current-page="currentView" 
      :admin-info="adminInfo"
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
              Welcome back, <span class="font-semibold text-medical-primary">{{ adminInfo?.username || 'Admin' }}</span>
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
    <AdminFooter @navigate="handleNavigation" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdminHeader from './AdminHeader.vue';
import AdminFooter from './AdminFooter.vue';
import DoctorsList from './AdminDoctorsList.vue';
import PatientsList from './AdminPatientsList.vue';

export default {
  name: 'AdminDashboard',
  components: {
    AdminHeader,
    AdminFooter,
    DoctorsList,
    PatientsList
  },
  setup() {
    const router = useRouter();
    const currentView = ref('dashboard');
    
    // Admin info
    const adminInfo = ref({
      username: 'Admin',
      role: 'Administrator',
      email: 'admin@doctorbaddy.com',
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
      localStorage.removeItem('adminToken');
      // Redirect to login page
      router.push('/admin/login');
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
      logout
    };
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-content {
  flex: 1;
  padding-top: 80px; /* Height of the header */
  padding-bottom: 60px; /* Height of the footer */
  background-color: #f5f7fa;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
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
</style>
