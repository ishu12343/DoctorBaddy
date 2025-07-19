import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';
import Chart from 'chart.js/auto';

export default {
  name: 'DashboardHome',
  props: {
    doctor: {
      type: Object,
      required: true
    }
  },
  
  setup() {
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
    
    return {
      stats,
      appointments,
      reviews,
      earnings,
      loading,
      showResponseForm,
      responseText,
      earningsChart,
      isMorning,
      isAfternoon,
      monthlyEarnings,
      monthlyTrend,
      formatTime,
      formatDate,
      getTrendIcon,
      updateAppointmentStatus,
      viewPatientDetails,
      startVideoCall,
      showResponseDialog,
      closeResponseDialog,
      submitResponse
    };
  }
};
