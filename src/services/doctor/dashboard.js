import axios from 'axios';

export default {
  getDashboard(doctorId) {
    return axios.get(`/api/doctors/dashboard/${doctorId}`);
  },
  // You can add more API methods here for actions (set availability, cancel appt, etc.)
};
