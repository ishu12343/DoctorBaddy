import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactPage from '../views/Contact.vue'
import OurServices from '../views/OurServices.vue'
import CommonLogin from '../components/common/CommonLogin.vue'
import DoctorSignUp from '../components/doctor/DoctorSignUp.vue'
import PatientSignUp from '../components/patient/PatientSignUp.vue'
import PatientDashboard from '@/components/patient/PatientDashboard.vue'
import DoctorDashboard from '@/components/doctor/DoctorDashboard.vue'
import AdminSignUp from '@/components/admin/AdminSignUp.vue'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import TipsPage from '@/views/TipsPage.vue'
import Testimonials from '@/views/Testimonials.vue'
import DoctorsList from '@/views/DoctorsList.vue'

const routes = [
  // Unified Login Routes
  { path: '/login', name: 'Login', component: CommonLogin },
  { path: '/login/:role', name: 'RoleLogin', component: CommonLogin, props: true },
  
  // Legacy redirects for backward compatibility
  { path: '/patient-login', redirect: '/login?role=patient' },
  { path: '/doctor-login', redirect: '/login?role=doctor' },
  { path: '/admin-login', redirect: '/login?role=admin' },
  
  // Signup Routes
  { path: '/patient-signup', name: 'PatientSignUp', component: PatientSignUp },
  { path: '/doctor-signup', name: 'DoctorSignUp', component: DoctorSignUp },
  { path: '/admin-signup', name: 'AdminSignUp', component: AdminSignUp },
  
  // Main Pages
  { path: '/', component: Home },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/services', name: 'Services', component: OurServices },
  { path: '/health-tips', name: 'HealthTips', component: TipsPage },
  { path: '/testimonials', name: 'Testimonials', component: Testimonials },
  { path: '/doctors', name: 'DoctorsList', component: DoctorsList, props: route => ({ specialty: route.query.specialty, search: route.query.q }) },
  
  // Dashboard Routes
  {
    path: '/patient-dashboard',
    name: 'PatientDashboard',
    component: PatientDashboard,
    meta: { requiresAuth: true, role: 'patient' }
  },
  {
    path: '/doctor-dashboard',
    name: 'DoctorDashboard',
    component: DoctorDashboard,
    meta: { requiresAuth: true, role: 'doctor' }
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication and role-based access
router.beforeEach((to, from, next) => {
  const publicPages = [
    '/login', '/doctor-signup', '/patient-signup', '/', '/contact', '/services', 
    '/admin-signup', '/health-tips', '/testimonials', '/doctors',
    // Legacy redirects
    '/doctor-login', '/patient-login', '/admin-login'
  ];
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const requiredRole = to.meta.role
    let isAuthenticated = false
    let userRole = ''
    
    if (requiredRole === 'patient') {
      const patientInfo = localStorage.getItem('patientInfo')
      isAuthenticated = !!patientInfo
      userRole = 'patient'
    } else if (requiredRole === 'doctor') {
      const doctorInfo = localStorage.getItem('doctorInfo')
      isAuthenticated = !!doctorInfo
      userRole = 'doctor'
    } else if (requiredRole === 'admin') {
      const adminInfo = localStorage.getItem('adminInfo')
      const token = localStorage.getItem('token')
      isAuthenticated = !!(adminInfo && token)
      userRole = 'admin'
    }
    
    if (!isAuthenticated) {
      // Redirect to login with role parameter
      next({ path: '/login', query: { role: requiredRole, redirect: to.fullPath } })
    } else if (userRole !== requiredRole) {
      // User has wrong role, redirect to appropriate dashboard
      const redirectPath = `/${userRole}-dashboard`
      next(redirectPath)
    } else {
      next()
    }
  } else if (!publicPages.includes(to.path)) {
    // Legacy authentication check for routes without meta
    const token = localStorage.getItem('token')
    const patientInfo = localStorage.getItem('patientInfo')
    const doctorInfo = localStorage.getItem('doctorInfo')
    const adminInfo = localStorage.getItem('adminInfo')
    
    if (!token && !patientInfo && !doctorInfo && !adminInfo) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router

