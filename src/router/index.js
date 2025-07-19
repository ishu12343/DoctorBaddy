import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Doctors from '../views/Doctors.vue'
import Appointments from '../views/Appointments.vue'
import LoginPage from '../views/Login.vue'
import DashboardPage from '../views/Dashboard.vue'
import PatientPage from '../views/Patient.vue'
import AboutPage from '../views/About.vue'
import ContactPage from '../views/Contact.vue'
import ProfilePage from '../views/Profile.vue'
import OurServices from '../views/OurServices.vue'
import Signup from '../views/Signup.vue'
import DoctorLogin from '../components/DoctorLogin.vue'
import PatientLogin from '../components/PatientLogin.vue'

const routes = [
  { path: '/patient-login', name: 'PatientLogin', component: PatientLogin },
  { path: '/doctor-login', name: 'DoctorLogin', component: DoctorLogin },
  { path: '/', component: Home },
  { path: '/doctors', component: Doctors },
  { path: '/appointments', component: Appointments },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  { path: '/patient', name: 'Patient', component: PatientPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  {
    path: '/services',
    name: 'Services',
    component: OurServices
  },
  { path: '/signup', name: 'Signup', component: Signup }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

