import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactPage from '../views/Contact.vue'
import OurServices from '../views/OurServices.vue'
import DoctorLogin from '../components/doctor/DoctorLogin.vue'
import PatientLogin from '../components/patient/PatientLogin.vue'
import DoctorSignUp from '../components/doctor/DoctorSignUp.vue'
import PatientSignUp from '../components/patient/PatientSignUp.vue'

const routes = [
  { path: '/patient-login', name: 'PatientLogin', component: PatientLogin },
  { path: '/doctor-login', name: 'DoctorLogin', component: DoctorLogin },
  { path: '/patient-signup', name: 'PatientSignUp', component: PatientSignUp },
  { path: '/doctor-signup', name: 'DoctorSignUp', component: DoctorSignUp },
  { path: '/', component: Home },
  { path: '/contact', name: 'Contact', component: ContactPage },
  {
    path: '/services',
    name: 'Services',
    component: OurServices
  },
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

export default router

