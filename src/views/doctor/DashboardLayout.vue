<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>DoctorBaddy</h3>
        <div class="doctor-info">
          <img :src="doctor.photoUrl || '/default-avatar.png'" alt="Doctor" class="doctor-avatar" />
          <div class="doctor-details">
            <h4>{{ doctor.name || 'Doctor' }}</h4>
            <span class="doctor-specialty">{{ doctor.specialty || 'General Practitioner' }}</span>
          </div>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/doctor-dashboard" class="nav-item" active-class="active">
          <i class="fas fa-home"></i>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/doctor-dashboard/appointments" class="nav-item" active-class="active">
          <i class="fas fa-calendar-alt"></i>
          <span>Appointments</span>
        </router-link>
        <router-link to="/doctor-dashboard/patients" class="nav-item" active-class="active">
          <i class="fas fa-users"></i>
          <span>Patients</span>
        </router-link>
        <router-link to="/doctor-dashboard/schedule" class="nav-item" active-class="active">
          <i class="fas fa-calendar-day"></i>
          <span>Schedule</span>
        </router-link>
        <router-link to="/doctor-dashboard/reviews" class="nav-item" active-class="active">
          <i class="fas fa-star"></i>
          <span>Reviews</span>
        </router-link>
        <router-link to="/doctor-dashboard/earnings" class="nav-item" active-class="active">
          <i class="fas fa-wallet"></i>
          <span>Earnings</span>
        </router-link>
        <router-link to="/doctor-dashboard/notifications" class="nav-item" active-class="active">
          <i class="fas fa-bell"></i>
          <span>Notifications</span>
          <span v-if="unreadNotifications > 0" class="badge">{{ unreadNotifications }}</span>
        </router-link>
        <router-link to="/doctor-dashboard/settings" class="nav-item" active-class="active">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </router-link>
      </nav>
      
      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Navigation -->
      <header class="top-nav">
        <div class="nav-left">
          <button class="menu-toggle" @click="toggleSidebar">
            <i class="fas fa-bars"></i>
          </button>
          <h2 class="page-title">{{ $route.meta.title || 'Dashboard' }}</h2>
        </div>
        <div class="nav-right">
          <div class="notification-icon">
            <i class="fas fa-bell"></i>
            <span v-if="unreadNotifications > 0" class="notification-badge">{{ unreadNotifications }}</span>
          </div>
          <div class="user-profile" @click="toggleUserMenu">
            <img :src="doctor.photoUrl || '/default-avatar.png'" alt="User" />
            <span>{{ doctor.name || 'Doctor' }}</span>
            <i class="fas fa-chevron-down"></i>
            
            <div v-if="showUserMenu" class="user-menu">
              <router-link to="/doctor-dashboard/profile" class="user-menu-item">
                <i class="fas fa-user"></i> My Profile
              </router-link>
              <router-link to="/doctor-dashboard/settings" class="user-menu-item">
                <i class="fas fa-cog"></i> Settings
              </router-link>
              <div class="divider"></div>
              <button @click="logout" class="user-menu-item">
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="content">
        <router-view :doctor="doctor" @update-doctor="updateDoctor" />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  name: 'DashboardLayout',
  
  setup() {
    const router = useRouter();
    const store = useStore();
    const doctor = ref({
      name: '',
      email: '',
      specialty: '',
      photoUrl: ''
    });
    const unreadNotifications = ref(0);
    const showUserMenu = ref(false);
    const isSidebarCollapsed = ref(false);
    
    // Fetch doctor profile data
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/doctors/dashboard/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        doctor.value = response.data;
        store.commit('setDoctor', response.data);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
        if (error.response?.status === 401) {
          // Token expired or invalid, redirect to login
          localStorage.removeItem('token');
          router.push('/doctor-dashboard/login');
        }
      }
    };
    
    // Fetch unread notifications count
    const fetchUnreadNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/doctors/dashboard/notifications/count', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        unreadNotifications.value = response.data.count;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    // Update doctor data from child components
    const updateDoctor = (updatedDoctor) => {
      doctor.value = { ...doctor.value, ...updatedDoctor };
      store.commit('setDoctor', doctor.value);
    };
    
    // Toggle sidebar on mobile
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
      document.body.classList.toggle('sidebar-collapsed', isSidebarCollapsed.value);
    };
    
    // Toggle user menu
    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value;
    };
    
    // Close user menu when clicking outside
    const closeUserMenu = (event) => {
      const userProfile = document.querySelector('.user-profile');
      if (userProfile && !userProfile.contains(event.target)) {
        showUserMenu.value = false;
      }
    };
    
    // Logout function
    const logout = () => {
      localStorage.removeItem('token');
      store.commit('clearAuth');
      router.push('/doctor-dashboard/login');
    };
    
    // Initialize component
    onMounted(async () => {
      await fetchDoctorProfile();
      await fetchUnreadNotifications();
      
      // Set up event listeners
      document.addEventListener('click', closeUserMenu);
      
      // Set up WebSocket for real-time notifications
      setupWebSocket();
      
      return () => {
        document.removeEventListener('click', closeUserMenu);
        // Clean up WebSocket connection
        if (window.notificationSocket) {
          window.notificationSocket.close();
        }
      };
    });
    
    // Set up WebSocket for real-time notifications
    const setupWebSocket = () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      // Replace with your WebSocket endpoint
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${wsProtocol}//${window.location.host}/api/notifications`;
      
      try {
        const socket = new WebSocket(`${wsUrl}?token=${token}`);
        window.notificationSocket = socket;
        
        socket.onopen = () => {
          console.log('WebSocket connected');
        };
        
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'NEW_NOTIFICATION') {
            unreadNotifications.value++;
            // Show notification toast
            showNotification(data.message);
          }
        };
        
        socket.onclose = () => {
          console.log('WebSocket disconnected');
          // Attempt to reconnect after a delay
          setTimeout(setupWebSocket, 5000);
        };
        
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } catch (error) {
        console.error('Error setting up WebSocket:', error);
      }
    };
    
    // Show notification toast
    const showNotification = (message) => {
      // You can use a toast library or implement your own notification system
      const toast = document.createElement('div');
      toast.className = 'notification-toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('show');
      }, 100);
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 5000);
    };
    
    return {
      doctor,
      unreadNotifications,
      showUserMenu,
      isSidebarCollapsed,
      updateDoctor,
      toggleSidebar,
      toggleUserMenu,
      logout
    };
  }
};
</script>

<style scoped>
/* Base styles */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* Sidebar styles */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h3 {
  margin: 0 0 20px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #3498db;
}

.doctor-info {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.doctor-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  border: 2px solid #3498db;
}

.doctor-details h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.doctor-specialty {
  font-size: 0.8rem;
  color: #bdc3c7;
  display: block;
  margin-top: 2px;
}

.sidebar-nav {
  flex: 1;
  padding: 15px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item i {
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.active {
  background-color: #3498db;
  color: white;
  border-left: 4px solid white;
}

.nav-item .badge {
  position: absolute;
  right: 15px;
  background-color: #e74c3c;
  color: white;
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 0.7rem;
  font-weight: bold;
}

.sidebar-footer {
  padding: 15px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  color: #bdc3c7;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.logout-btn i {
  margin-right: 10px;
}

/* Main content styles */
.main-content {
  flex: 1;
  margin-left: 250px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin 0.3s ease;
}

/* Top navigation */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
  position: sticky;
  top: 0;
}

.nav-left {
  display: flex;
  align-items: center;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  margin-right: 15px;
  cursor: pointer;
  color: #2c3e50;
  display: none;
}

.page-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
}

.nav-right {
  display: flex;
  align-items: center;
}

.notification-icon {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  color: #2c3e50;
  font-size: 1.2rem;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: bold;
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 5px 10px;
  border-radius: 20px;
  transition: background-color 0.2s ease;
}

.user-profile:hover {
  background-color: #f5f7fa;
}

.user-profile img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.user-profile span {
  margin-right: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.user-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 200px;
  overflow: hidden;
  z-index: 1000;
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;
  transition: all 0.2s ease;
}

.user-profile:hover .user-menu {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

.user-menu-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.2s ease;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
}

.user-menu-item i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.user-menu-item:hover {
  background-color: #f5f7fa;
  color: #3498db;
}

.divider {
  height: 1px;
  background-color: #eee;
  margin: 5px 0;
}

/* Content area */
.content {
  flex: 1;
  padding: 25px;
  background-color: #f5f7fa;
  overflow-y: auto;
}

/* Notification toast */
.notification-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2c3e50;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2000;
  max-width: 350px;
}

.notification-toast.show {
  transform: translateY(0);
  opacity: 1;
}

/* Responsive styles */
@media (max-width: 992px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.show {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .page-title {
    font-size: 1.2rem;
  }
}

/* Animation for sidebar toggle */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
