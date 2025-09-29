import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactPage from '../views/Contact.vue'
import OurServices from '../views/OurServices.vue'
import DoctorLogin from '../components/doctor/DoctorLogin.vue'
import PatientLogin from '../components/patient/PatientLogin.vue'
import DoctorSignUp from '../components/doctor/DoctorSignUp.vue'
import PatientSignUp from '../components/patient/PatientSignUp.vue'
import PatientDashboard from '@/components/patient/PatientDashboard.vue'
import DoctorDashboard from '@/components/doctor/DoctorDashboard.vue'
import AdminLogin from '@/components/admin/AdminLogin.vue'
import AdminSignUp from '@/components/admin/AdminSignUp.vue'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import TipsPage from '@/views/TipsPage.vue'
import Testimonials from '@/views/Testimonials.vue'
import DoctorsList from '@/views/DoctorsList.vue'

const routes = [
  { path: '/patient-login', name: 'PatientLogin', component: PatientLogin },
  { path: '/doctor-login', name: 'DoctorLogin', component: DoctorLogin },
  { path: '/patient-signup', name: 'PatientSignUp', component: PatientSignUp },
  { path: '/doctor-signup', name: 'DoctorSignUp', component: DoctorSignUp },
  { path: '/', component: Home },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/services', name: 'Services', component: OurServices },
  {
    path: '/patient-dashboard',
    name: 'PatientDashboard',
    component: PatientDashboard
  },
  {
    path: '/doctor-dashboard',
    name: 'DoctorDashboard',
    component: DoctorDashboard
  },
  { path: '/admin-login', name: 'AdminLogin', component: AdminLogin },
  { path: '/admin-signup', name: 'AdminSignUp', component: AdminSignUp },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/health-tips', name: 'HealthTips', component: TipsPage },
  { path: '/testimonials', name: 'Testimonials', component: Testimonials },
  { path: '/doctors', name: 'DoctorsList', component: DoctorsList, props: route => ({ specialty: route.query.specialty, search: route.query.q }) },
  // {
  //   path: '/doctor-dashboard/profile',
  //   name: 'DoctorProfilePage',
  //   component: DoctorProfilePage
  // }
  // { path: '/signup', name: 'Signup', component: Signup, redirect: '/patient-signup' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to block access to protected routes if not authenticated
router.beforeEach((to, from, next) => {
  const publicPages = [
    '/doctor-login', '/patient-login', '/doctor-signup', '/patient-signup', '/', '/contact', '/services', '/admin-login', '/admin-signup', '/health-tips', '/testimonials', '/doctors'
  ];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');
  if (authRequired && !token) {
    // If not authenticated, redirect to login (choose doctor/patient based on last userType)
    const userType = localStorage.getItem('userType');
    if (userType === 'doctor') {
      next({ path: '/doctor-login', replace: true });
    } else {
      next({ path: '/patient-login', replace: true });
    }
  } else {
    next();
  }
});

export default router

