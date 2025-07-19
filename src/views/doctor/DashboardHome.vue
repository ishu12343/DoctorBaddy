<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';
import Chart from 'chart.js/auto';

const router = useRouter();
const stats = ref([
  { title: 'Today\'s Appointments', value: '0', icon: 'fas fa-calendar-day', variant: 'primary' },
  { title: 'Pending Approvals', value: '0', icon: 'fas fa-clock', variant: 'warning' },
  { title: 'Total Patients', value: '0', icon: 'fas fa-user-friends', variant: 'success' },
  { title: 'Earnings (This Month)', value: '$0', icon: 'fas fa-wallet', variant: 'info', trend: 0 }
]);

const appointments = ref([]);
const reviews = ref([]);
const earnings = ref([]);
const loading = ref({
  appointments: true,
  reviews: true,
  earnings: true
});

const showResponseForm = ref(false);
const responseText = ref('');
const selectedReview = ref(null);
const earningsChart = ref(null);

// Computed properties
const isMorning = computed(() => {
  const hour = new Date().getHours();
  return hour >= 5 && hour < 12;
});

const isAfternoon = computed(() => {
  const hour = new Date().getHours();
  return hour >= 12 && hour < 17;
});

const monthlyEarnings = computed(() => {
  return earnings.value
    .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0);
});

const monthlyTrend = computed(() => {
  // This is a simplified example - in a real app, you'd compare with previous month's data
  return 12.5; // Example trend value
});

// Methods
const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    
    // Fetch dashboard stats
    const statsRes = await fetch('/api/doctors/dashboard/stats', { headers });
    const statsData = await statsRes.json();
    updateStats(statsData);
    
    // Fetch upcoming appointments
    const appointmentsRes = await fetch('/api/doctors/dashboard/appointments?limit=3', { headers });
    appointments.value = await appointmentsRes.json();
    loading.value.appointments = false;
    
    // Fetch recent reviews
    const reviewsRes = await fetch('/api/doctors/dashboard/reviews?limit=3', { headers });
    reviews.value = await reviewsRes.json();
    loading.value.reviews = false;
    
    // Fetch recent earnings
    const earningsRes = await fetch('/api/doctors/dashboard/earnings?limit=5', { headers });
    earnings.value = await earningsRes.json();
    loading.value.earnings = false;
    
    // Initialize chart after data is loaded
    if (earnings.value.length > 0) {
      initializeEarningsChart();
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Handle error (show toast/notification)
  }
};

const updateStats = (data) => {
  stats.value = [
    { title: 'Today\'s Appointments', value: data.todayAppointments || '0', icon: 'fas fa-calendar-day', variant: 'primary' },
    { title: 'Pending Approvals', value: data.pendingApprovals || '0', icon: 'fas fa-clock', variant: 'warning' },
    { title: 'Total Patients', value: data.totalPatients || '0', icon: 'fas fa-user-friends', variant: 'success' },
    { 
      title: 'Earnings (This Month)', 
      value: `$${data.monthlyEarnings?.toFixed(2) || '0.00'}`, 
      icon: 'fas fa-wallet', 
      variant: 'info',
      trend: data.earningsTrend || 0
    }
  ];
};

const initializeEarningsChart = () => {
  const ctx = earningsChart.value.getContext('2d');
  
  // Group earnings by day for the chart
  const earningsByDay = {};
  const today = new Date();
  
  // Initialize last 7 days with 0 earnings
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = format(date, 'MMM dd');
    earningsByDay[dateStr] = 0;
  }
  
  // Fill in actual earnings
  earnings.value.forEach(earning => {
    const date = new Date(earning.date);
    const dateStr = format(date, 'MMM dd');
    if (earningsByDay[dateStr] !== undefined) {
      earningsByDay[dateStr] += earning.amount;
    }
  });
  
  const labels = Object.keys(earningsByDay);
  const data = Object.values(earningsByDay);
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Daily Earnings ($)',
        data,
        borderColor: '#4e73df',
        backgroundColor: 'rgba(78, 115, 223, 0.05)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4e73df',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#4e73df',
        pointHoverBorderColor: '#fff',
        pointHitRadius: 10,
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'white',
          titleColor: '#6c757d',
          bodyColor: '#858796',
          borderColor: '#dddfeb',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          intersect: false,
          mode: 'index',
          callbacks: {
            label: function(context) {
              return `$${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 7,
            maxRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          ticks: {
            callback: function(value) {
              return '$' + value;
            },
            maxTicks: 5
          }
        }
      }
    }
  });
};

const formatTime = (dateTime) => {
  return format(new Date(dateTime), 'h:mm a');
};

const formatDate = (dateString) => {
  return format(new Date(dateString), 'MMM d, yyyy');
};

const getTrendIcon = (trend) => {
  return trend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
};

const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`/api/doctors/dashboard/appointments/${appointmentId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    
    // Update local state
    const appointment = appointments.value.find(a => a.id === appointmentId);
    if (appointment) {
      appointment.status = status;
    }
    
    // Show success message
    alert(`Appointment ${status.toLowerCase()} successfully`);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    alert('Failed to update appointment status');
  }
};

const viewPatientDetails = (patientId) => {
  router.push(`/doctor/patients/${patientId}`);
};

const startVideoCall = (appointmentId) => {
  // In a real app, this would initiate a video call
  alert(`Starting video call for appointment ${appointmentId}`);
};

const showResponseDialog = (review) => {
  selectedReview.value = review;
  responseText.value = '';
  showResponseForm.value = true;
};

const closeResponseDialog = () => {
  showResponseForm.value = false;
  selectedReview.value = null;
  responseText.value = '';
};

const submitResponse = async () => {
  if (!selectedReview.value || !responseText.value.trim()) return;
  
  try {
    const token = localStorage.getItem('token');
    await fetch(`/api/doctors/dashboard/reviews/${selectedReview.value.id}/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ response: responseText.value })
    });
    
    // Update local state
    const review = reviews.value.find(r => r.id === selectedReview.value.id);
    if (review) {
      review.response = responseText.value;
    }
    
    closeResponseDialog();
    // Show success message
    alert('Response submitted successfully');
  } catch (error) {
    console.error('Error submitting response:', error);
    alert('Failed to submit response');
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchDashboardData();
});
</script>

<template>
  <div class="dashboard-home">
    <!-- Welcome Section -->
    <div class="welcome-section">
      <h1>Welcome back, Dr. {{ doctor.lastName || 'Doctor' }}!</h1>
      <p v-if="isMorning">Good morning! Have a great day ahead.</p>
      <p v-else-if="isAfternoon">Good afternoon! Hope you're having a wonderful day.</p>
      <p v-else>Good evening! Hope you had a great day.</p>
    </div>
    
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.title" :class="stat.variant">
        <div class="stat-icon">
          <i :class="stat.icon"></i>
        </div>
        <div class="stat-details">
          <h3>{{ stat.title }}</h3>
          <div class="stat-value">{{ stat.value }}</div>
          <div v-if="stat.trend !== undefined" class="stat-trend" :class="{ 'up': stat.trend > 0, 'down': stat.trend < 0 }">
            <i :class="getTrendIcon(stat.trend)"></i>
            {{ Math.abs(stat.trend) }}% {{ stat.trend > 0 ? 'increase' : 'decrease' }} from last week
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Upcoming Appointments -->
      <div class="content-card appointments">
        <div class="card-header">
          <h3>Upcoming Appointments</h3>
          <router-link to="/doctor/appointments" class="view-all">View All</router-link>
        </div>
        <div v-if="loading.appointments" class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i> Loading...
        </div>
        <div v-else-if="appointments.length === 0" class="no-data">
          No upcoming appointments
        </div>
        <div v-else class="appointments-list">
          <div v-for="appointment in appointments" :key="appointment.id" class="appointment-item">
            <div class="appointment-time">
              <div class="time">{{ formatTime(appointment.appointmentTime) }}</div>
              <div class="date">{{ formatDate(appointment.appointmentTime) }}</div>
            </div>
            <div class="appointment-details">
              <div class="patient-info">
                <img :src="appointment.patient.photoUrl || '/default-avatar.png'" :alt="appointment.patient.name" class="patient-avatar" />
                <div>
                  <h4>{{ appointment.patient.name }}</h4>
                  <span class="appointment-type">{{ appointment.type || 'General Consultation' }}</span>
                </div>
              </div>
              <div class="appointment-actions">
                <button v-if="appointment.status === 'PENDING'" class="btn btn-sm btn-success" @click="updateAppointmentStatus(appointment.id, 'CONFIRMED')">
                  <i class="fas fa-check"></i> Confirm
                </button>
                <button v-if="appointment.status === 'PENDING'" class="btn btn-sm btn-outline-danger" @click="updateAppointmentStatus(appointment.id, 'CANCELLED')">
                  <i class="fas fa-times"></i> Cancel
                </button>
                <button class="btn btn-sm btn-primary" @click="viewPatientDetails(appointment.patient.id)">
                  <i class="fas fa-user"></i> Profile
                </button>
                <button class="btn btn-sm btn-outline-primary" @click="startVideoCall(appointment.id)">
                  <i class="fas fa-video"></i> Start Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Reviews -->
      <div class="content-card reviews">
        <div class="card-header">
          <h3>Recent Reviews</h3>
          <router-link to="/doctor/reviews" class="view-all">View All</router-link>
        </div>
        <div v-if="loading.reviews" class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i> Loading...
        </div>
        <div v-else-if="reviews.length === 0" class="no-data">
          No reviews yet
        </div>
        <div v-else class="reviews-list">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <div class="reviewer-info">
                <img :src="review.patient.photoUrl || '/default-avatar.png'" :alt="review.patient.name" class="reviewer-avatar" />
                <div>
                  <h4>{{ review.patient.name }}</h4>
                  <div class="rating">
                    <i v-for="i in 5" :key="i" class="fas fa-star" :class="{ 'filled': i <= review.rating }"></i>
                  </div>
                </div>
              </div>
              <span class="review-date">{{ formatDate(review.createdAt) }}</span>
            </div>
            <p class="review-comment">{{ review.comment }}</p>
            <div v-if="review.response" class="doctor-response">
              <strong>Your response:</strong>
              <p>{{ review.response }}</p>
            </div>
            <button v-else class="btn btn-sm btn-outline-primary" @click="showResponseDialog(review)">
              <i class="fas fa-reply"></i> Respond
            </button>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="content-card quick-actions">
        <div class="card-header">
          <h3>Quick Actions</h3>
        </div>
        <div class="actions-grid">
          <button class="action-btn" @click="$router.push('/doctor/schedule')">
            <div class="action-icon">
              <i class="fas fa-calendar-plus"></i>
            </div>
            <span>Add Availability</span>
          </button>
          <button class="action-btn" @click="$router.push('/doctor/patients/new')">
            <div class="action-icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <span>Add Patient</span>
          </button>
          <button class="action-btn" @click="$router.push('/doctor/prescriptions/new')">
            <div class="action-icon">
              <i class="fas fa-prescription"></i>
            </div>
            <span>Write Prescription</span>
          </button>
          <button class="action-btn" @click="$router.push('/doctor/medical-records/upload')">
            <div class="action-icon">
              <i class="fas fa-file-medical"></i>
            </div>
            <span>Upload Record</span>
          </button>
        </div>
      </div>
      
      <!-- Recent Earnings -->
      <div class="content-card earnings">
        <div class="card-header">
          <h3>Recent Earnings</h3>
          <router-link to="/doctor/earnings" class="view-all">View All</router-link>
        </div>
        <div v-if="loading.earnings" class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i> Loading...
        </div>
        <div v-else-if="earnings.length === 0" class="no-data">
          No earnings data available
        </div>
        <div v-else>
          <div class="earnings-summary">
            <div class="earning-total">
              <span class="label">This Month</span>
              <span class="amount">${{ monthlyEarnings.toFixed(2) }}</span>
            </div>
            <div class="earning-trend">
              <span class="label">vs Last Month</span>
              <span class="trend" :class="{ 'up': monthlyTrend >= 0, 'down': monthlyTrend < 0 }">
                <i :class="getTrendIcon(monthlyTrend)"></i>
                {{ Math.abs(monthlyTrend) }}%
              </span>
            </div>
          </div>
          <div class="earnings-chart">
            <canvas ref="earningsChart"></canvas>
          </div>
          <div class="recent-transactions">
            <h4>Recent Transactions</h4>
            <div v-for="earning in earnings" :key="earning.id" class="transaction-item">
              <div class="transaction-info">
                <div class="transaction-type">{{ earning.type }}</div>
                <div class="transaction-date">{{ formatDate(earning.date) }}</div>
              </div>
              <div class="transaction-amount" :class="{ 'credit': earning.amount >= 0, 'debit': earning.amount < 0 }">
                {{ earning.amount >= 0 ? '+' : '' }}${{ Math.abs(earning.amount).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Response Dialog -->
    <div v-if="showResponseForm" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Respond to Review</h4>
            <button class="close-btn" @click="closeResponseDialog">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Your Response</label>
              <textarea v-model="responseText" class="form-control" rows="4" placeholder="Type your response here..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeResponseDialog">Cancel</button>
            <button class="btn btn-primary" @click="submitResponse" :disabled="!responseText.trim()">
              <i class="fas fa-paper-plane"></i> Send Response
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './DashboardHome.styles.css';
</style>
