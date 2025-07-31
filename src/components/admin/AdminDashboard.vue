<template>
  <div class="p-6">
    <div class="flex items-center mb-6">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <div class="ml-auto">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Doctors Table -->
    <div class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Doctors</h2>
      <div v-if="doctors.length === 0">No doctors found.</div>
      <table v-else class="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th class="px-4 py-2">
              <input
                type="checkbox"
                v-model="selectAllDoctors"
                @change="toggleSelectAll('doctors')"
              />
            </th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Approved</th>
            <th class="px-4 py-2">Suspended</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in doctors" :key="doc.id">
            <td class="border px-4 py-2">
              <input
                type="checkbox"
                v-model="selectedDoctors"
                :value="doc.id"
              />
            </td>
            <td class="border px-4 py-2">{{ doc.full_name }}</td>
            <td class="border px-4 py-2">{{ doc.email }}</td>
            <td class="border px-4 py-2">{{ doc.approved ? 'Yes' : 'No' }}</td>
            <td class="border px-4 py-2">{{ doc.suspended ? 'Yes' : 'No' }}</td>
            <td class="border px-4 py-2 space-x-2">
              <button
                class="bg-green-600 text-white px-4 py-1 rounded"
                @click="approveDoctor(doc.id)"
                :disabled="doc.approved"
              >
                Approve
              </button>
              <button
                class="bg-red-600 text-white px-4 py-1 rounded"
                @click="rejectDoctor(doc.id)"
                :disabled="!doc.approved"
              >
                Reject
              </button>
              <button
                class="bg-blue-600 text-white px-4 py-1 rounded"
                @click="viewDoctor(doc.id)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Patients Table -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Patients</h2>
      <div v-if="patients.length === 0">No patients found.</div>
      <table v-else class="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th class="px-4 py-2">
              <input
                type="checkbox"
                v-model="selectAllPatients"
                @change="toggleSelectAll('patients')"
              />
            </th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Mobile</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pat in patients" :key="pat.id">
            <td class="border px-4 py-2">
              <input
                type="checkbox"
                v-model="selectedPatients"
                :value="pat.id"
              />
            </td>
            <td class="border px-4 py-2">{{ pat.full_name }}</td>
            <td class="border px-4 py-2">{{ pat.email }}</td>
            <td class="border px-4 py-2">{{ pat.mobile }}</td>
            <td class="border px-4 py-2">{{ pat.is_active ? 'Active' : 'Deactivated' }}</td>
            <td class="border px-4 py-2">
              <button
                class="bg-yellow-600 text-white px-4 py-1 rounded"
                @click="deactivatePatient(pat.id)"
                :disabled="!pat.is_active"
              >
                Deactivate
              </button>
              <button
                class="bg-green-600 text-white px-4 py-1 rounded"
                @click="activatePatient(pat.id)"
                :disabled="pat.is_active"
              >
                Activate
              </button>
              <button
                class="bg-blue-600 text-white px-4 py-1 rounded"
                @click="viewPatient(pat.id)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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

export default {
  name: 'AdminDashboard',
  components: {
    PatientPopup,
    DoctorPopup,
  },
  data() {
    return {
      doctors: [],
      patients: [],
      selectAllDoctors: false,
      selectAllPatients: false,
      selectedDoctors: [],
      selectedPatients: [],
      showPatientPopup: false, // Patient popup visibility
      patientPopupData: null,  // Data for patient popup
      showDoctorPopup: false,  // Doctor popup visibility
      doctorPopupData: null,   // Data for doctor popup
    };
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
      } catch (err) {
        console.error('Error fetching data:', err);
        alert('Failed to fetch dashboard data. Please make sure you are logged in.');
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
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
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
