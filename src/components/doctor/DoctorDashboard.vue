<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Doctor Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DoctorProfileCard />
      <!-- <EarningsSummary />
      <DoctorAvailability />
      <UpcomingAppointments />
      <PrescriptionUpload />
      <DoctorNotifications /> -->
    </div>
    <div class="mt-6">
      <DoctorLogout />
    </div>
  </div>
</template>

<script>
import DoctorProfileCard from './DoctorProfileCard.vue';
// import EarningsSummary from './EarningsSummary.vue';
// import DoctorAvailability from './DoctorAvailability.vue';
// import UpcomingAppointments from './UpcomingAppointments.vue';
// import PrescriptionUpload from './PrescriptionUpload.vue';
// import DoctorNotifications from './DoctorNotifications.vue';
// import DoctorLogout from './DoctorLogout.vue';

export default {
  components: {
    DoctorProfileCard
    // EarningsSummary,
    // DoctorAvailability,
    // UpcomingAppointments,
    // PrescriptionUpload,
    // DoctorNotifications,
    // DoctorLogout
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
