<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>

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
                v-if="!pat.is_active"
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
  </div>
</template>

<script>
import axios from 'axios';
import PatientPopup from './PatientPopup.vue'; // Import the popup

export default {
  name: 'AdminDashboard',
  components: {
    PatientPopup, // Register the popup
  },
  data() {
    return {
      doctors: [],
      patients: [],
      selectAllDoctors: false,
      selectAllPatients: false,
      selectedDoctors: [],
      selectedPatients: [],
      showPatientPopup: false, // Popup visibility
      patientPopupData: null,  // Data for popup
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
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:5000/admin/doctors/view?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Try both possible structures
        const doc = response.data.data ? response.data.data : response.data;
        if (!doc || Object.keys(doc).length === 0) {
          alert('Doctor details not found.');
          return;
        }
        alert(
          `Doctor Details:\n
ID: ${doc.id}
Name: ${doc.full_name}
Email: ${doc.email}
Mobile: ${doc.mobile}
Role: ${doc.role}
Specialty: ${doc.specialty}
Degree: ${doc.degree}
Council: ${doc.council}
Experience: ${doc.experience}
Registration Number: ${doc.registration_number}
Clinic Name: ${doc.clinic_name}
Clinic Address: ${doc.clinic_address}
Location: ${doc.location}
Approved: ${doc.approved === 1 ? 'Yes' : 'No'}
Suspended: ${doc.suspended === 1 ? 'Yes' : 'No'}
Documents Verified: ${doc.documents_verified === 1 ? 'Yes' : 'No'}`
        );
      } catch (err) {
        alert('Failed to load doctor details.');
      }
    },

    async viewPatient(id) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:5000/admin/patient/view?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pat = response.data.data ? response.data.data : response.data;
        if (!pat || Object.keys(pat).length === 0) {
          alert('Patient details not found.');
          return;
        }
        this.patientPopupData = pat; // Set data for popup
        this.showPatientPopup = true; // Show popup
        console.log('Popup should open:', this.showPatientPopup, this.patientPopupData); // Debug log
      } catch (err) {
        alert('Failed to load patient details.');
      }
    },
    closePatientPopup() {
      this.showPatientPopup = false;
      this.patientPopupData = null;
    },
    toggleSelectAll(type) {
      if (type === 'doctors') {
        this.selectedDoctors = this.selectAllDoctors ? this.doctors.map(doc => doc.id) : [];
      } else if (type === 'patients') {
        this.selectedPatients = this.selectAllPatients ? this.patients.map(pat => pat.id) : [];
      }
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
