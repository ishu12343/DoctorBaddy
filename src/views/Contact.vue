<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1 pt-16 lg:pt-20">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-medical-primary to-medical-secondary text-white section-sm">
        <div class="container text-center px-3 sm:px-4">
          <div class="max-w-3xl mx-auto">
            <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-full flex items-center justify-center">
              <i class="fas fa-envelope text-xl sm:text-2xl"></i>
            </div>
            <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-white mb-3 sm:mb-4">Get in Touch</h1>
            <p class="text-base sm:text-lg lg:text-xl leading-relaxed text-blue-100">
              We're here to help! Choose the most convenient way to reach our support team.
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Options -->
      <section class="section bg-white">
        <div class="container px-3 sm:px-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <!-- For Patients -->
            <div class="card text-center group hover:shadow-xl transition-all duration-300">
              <div class="card-body p-4 sm:p-6">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <i class="fas fa-user"></i>
                </div>
                <h3 class="heading-3 text-gray-900 mb-3">For Patients</h3>
                <p class="text-gray-600 mb-6">Get help with appointments, consultations, and health records.</p>
                <div class="space-y-3">
                  <button @click="activeTab = 'patient'" class="btn btn-primary w-full">
                    <i class="fas fa-comments mr-2"></i>
                    Patient Support
                  </button>
                  <a href="tel:+1-800-PATIENT" class="btn btn-outline w-full">
                    <i class="fas fa-phone mr-2"></i>
                    Call Patient Line
                  </a>
                </div>
              </div>
            </div>

            <!-- For Doctors -->
            <div class="card text-center group hover:shadow-xl transition-all duration-300">
              <div class="card-body">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-medical-secondary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <i class="fas fa-stethoscope"></i>
                </div>
                <h3 class="heading-3 text-gray-900 mb-3">For Doctors</h3>
                <p class="text-gray-600 mb-6">Professional support for practice management and platform issues.</p>
                <div class="space-y-3">
                  <button @click="activeTab = 'doctor'" class="btn btn-secondary w-full">
                    <i class="fas fa-user-md mr-2"></i>
                    Doctor Support
                  </button>
                  <a href="tel:+1-800-DOCTOR" class="btn btn-outline w-full">
                    <i class="fas fa-phone mr-2"></i>
                    Call Doctor Line
                  </a>
                </div>
              </div>
            </div>

            <!-- General Inquiries -->
            <div class="card text-center group hover:shadow-xl transition-all duration-300">
              <div class="card-body">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <i class="fas fa-question-circle"></i>
                </div>
                <h3 class="heading-3 text-gray-900 mb-3">General Inquiries</h3>
                <p class="text-gray-600 mb-6">Partnership opportunities, media inquiries, and general questions.</p>
                <div class="space-y-3">
                  <button @click="activeTab = 'general'" class="btn bg-green-600 text-white hover:bg-green-700 w-full">
                    <i class="fas fa-envelope mr-2"></i>
                    General Support
                  </button>
                  <a href="tel:+1-800-GENERAL" class="btn btn-outline w-full">
                    <i class="fas fa-phone mr-2"></i>
                    Call Main Line
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form Section -->
          <div class="max-w-4xl mx-auto" v-if="activeTab">
            <div class="bg-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8">
              <div class="text-center mb-6 sm:mb-8">
                <h2 class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold leading-tight text-gray-900 mb-2">
                  {{ getFormTitle() }}
                </h2>
                <p class="text-sm sm:text-base text-gray-600">{{ getFormDescription() }}</p>
              </div>

              <form @submit.prevent="submitForm" class="space-y-4 sm:space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label">First Name *</label>
                    <input 
                      v-model="form.firstName" 
                      type="text" 
                      required 
                      class="form-input"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last Name *</label>
                    <input 
                      v-model="form.lastName" 
                      type="text" 
                      required 
                      class="form-input"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <input 
                      v-model="form.email" 
                      type="email" 
                      required 
                      class="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input 
                      v-model="form.phone" 
                      type="tel" 
                      class="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div class="form-group" v-if="activeTab === 'doctor'">
                  <label class="form-label">Medical License Number</label>
                  <input 
                    v-model="form.licenseNumber" 
                    type="text" 
                    class="form-input"
                    placeholder="Enter your medical license number"
                  />
                </div>

                <div class="form-group" v-if="activeTab === 'patient'">
                  <label class="form-label">Patient ID (if applicable)</label>
                  <input 
                    v-model="form.patientId" 
                    type="text" 
                    class="form-input"
                    placeholder="Enter your patient ID"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Subject *</label>
                  <select v-model="form.subject" required class="form-input">
                    <option value="">Select a subject</option>
                    <option v-for="subject in getSubjectOptions()" :key="subject" :value="subject">
                      {{ subject }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Message *</label>
                  <textarea 
                    v-model="form.message" 
                    required 
                    rows="6" 
                    class="form-input resize-y"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>

                <div class="form-group">
                  <label class="flex items-center gap-3">
                    <input 
                      v-model="form.priority" 
                      type="checkbox" 
                      class="w-4 h-4 text-medical-secondary focus:ring-medical-secondary border-gray-300 rounded"
                    />
                    <span class="text-sm text-gray-700">This is a high priority or urgent matter</span>
                  </label>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-end">
                  <button type="button" @click="resetForm" class="btn btn-outline">
                    <i class="fas fa-undo mr-2"></i>
                    Reset Form
                  </button>
                  <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
                    <i v-if="!isSubmitting" class="fas fa-paper-plane mr-2"></i>
                    <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Information -->
      <section class="section bg-gray-50">
        <div class="container px-3 sm:px-4">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-8 sm:mb-12">
              <h2 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-900 mb-3 sm:mb-4">Other Ways to Reach Us</h2>
              <p class="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600">Multiple ways to get the help you need</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <!-- Emergency -->
              <div class="bg-red-50 rounded-xl p-4 sm:p-6 text-center border border-red-200">
                <div class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 bg-red-500 rounded-full flex items-center justify-center text-white">
                  <i class="fas fa-exclamation-triangle text-sm sm:text-base"></i>
                </div>
                <h3 class="font-semibold text-red-800 mb-2 text-sm sm:text-base">Emergency</h3>
                <p class="text-xs sm:text-sm text-red-600 mb-3">Medical emergencies only</p>
                <a href="tel:911" class="text-red-600 hover:text-red-800 font-semibold text-sm sm:text-base touch-button inline-block">
                  Call 911
                </a>
              </div>

              <!-- Live Chat -->
              <div class="bg-blue-50 rounded-xl p-4 sm:p-6 text-center border border-blue-200">
                <div class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 bg-medical-secondary rounded-full flex items-center justify-center text-white">
                  <i class="fas fa-comments text-sm sm:text-base"></i>
                </div>
                <h3 class="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Live Chat</h3>
                <p class="text-xs sm:text-sm text-blue-600 mb-3">Available 24/7</p>
                <button @click="openChat" class="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base touch-button">
                  Start Chat
                </button>
              </div>

              <!-- Email Support -->
              <div class="bg-green-50 rounded-xl p-4 sm:p-6 text-center border border-green-200">
                <div class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <i class="fas fa-envelope"></i>
                </div>
                <h3 class="font-semibold text-green-800 mb-2">Email</h3>
                <p class="text-sm text-green-600 mb-3">Response within 24 hours</p>
                <a href="mailto:support@doctorbuddy.com" class="text-green-600 hover:text-green-800 font-semibold">
                  support@doctorbuddy.com
                </a>
              </div>

              <!-- Office Hours -->
              <div class="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
                <div class="w-12 h-12 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center text-white">
                  <i class="fas fa-clock"></i>
                </div>
                <h3 class="font-semibold text-purple-800 mb-2">Office Hours</h3>
                <p class="text-sm text-purple-600 mb-1">Mon-Fri: 8AM-8PM</p>
                <p class="text-sm text-purple-600">Sat-Sun: 10AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="section bg-white">
        <div class="container">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="heading-2 text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p class="text-large text-gray-600">Quick answers to common questions</p>
            </div>

            <div class="space-y-4">
              <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg">
                <button 
                  @click="toggleFaq(index)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                  <i :class="['fas fa-chevron-down transition-transform', openFaq === index && 'rotate-180']"></i>
                </button>
                <div v-if="openFaq === index" class="px-6 pb-4">
                  <p class="text-gray-600">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
    <ChatButton @open-chat="openChat" />

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showSuccessModal = false">
      <div class="bg-white rounded-2xl p-6 max-w-md w-full text-center animate-bounce-in">
        <div class="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center text-white">
          <i class="fas fa-check text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p class="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
        <button @click="showSuccessModal = false" class="btn btn-primary">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import ChatButton from '@/components/ChatButton.vue';

export default {
  name: 'ContactPage',
  components: { AppHeader, AppFooter, ChatButton },
  data() {
    return {
      activeTab: null,
      isSubmitting: false,
      showSuccessModal: false,
      openFaq: null,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        patientId: '',
        subject: '',
        message: '',
        priority: false
      },
      faqs: [
        {
          question: 'How quickly can I get a consultation?',
          answer: 'Most consultations can be scheduled within 15-30 minutes. For urgent matters, our doctors are available 24/7.'
        },
        {
          question: 'Is my health information secure?',
          answer: 'Yes, we use industry-standard encryption and comply with HIPAA regulations to ensure your health information is completely secure and private.'
        },
        {
          question: 'Do you accept insurance?',
          answer: 'We work with most major insurance providers. Please check with your insurance company or contact our support team to verify coverage.'
        },
        {
          question: 'Can I get prescriptions through the platform?',
          answer: 'Yes, our licensed doctors can prescribe medications when medically appropriate. Prescriptions are sent directly to your preferred pharmacy.'
        },
        {
          question: 'What if I need emergency medical care?',
          answer: 'For medical emergencies, please call 911 or visit your nearest emergency room. Our platform is designed for non-emergency consultations and routine care.'
        }
      ]
    }
  },
  methods: {
    getFormTitle() {
      const titles = {
        patient: 'Patient Support Request',
        doctor: 'Healthcare Provider Support',
        general: 'General Inquiry'
      };
      return titles[this.activeTab] || 'Contact Form';
    },
    
    getFormDescription() {
      const descriptions = {
        patient: 'Get help with your appointments, consultations, health records, or any patient-related questions.',
        doctor: 'Professional support for practice management, platform features, and technical assistance.',
        general: 'Partnership opportunities, media inquiries, feedback, or any other general questions.'
      };
      return descriptions[this.activeTab] || 'Please fill out the form below and we\'ll get back to you soon.';
    },
    
    getSubjectOptions() {
      const options = {
        patient: [
          'Appointment Scheduling',
          'Technical Issues',
          'Billing Questions',
          'Health Records Access',
          'Prescription Issues',
          'Platform Navigation',
          'Other'
        ],
        doctor: [
          'Platform Setup',
          'Technical Support',
          'Payment Issues',
          'Patient Management',
          'Feature Requests',
          'Account Settings',
          'Other'
        ],
        general: [
          'Partnership Inquiry',
          'Media Request',
          'Feedback',
          'Business Development',
          'Careers',
          'Legal Questions',
          'Other'
        ]
      };
      return options[this.activeTab] || [];
    },
    
    async submitForm() {
      this.isSubmitting = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success modal
        this.showSuccessModal = true;
        this.resetForm();
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        patientId: '',
        subject: '',
        message: '',
        priority: false
      };
    },
    
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index;
    },
    
    openChat() {
      // This would trigger the chat component
      this.$emit('open-chat');
    }
  }
}
</script>

<style scoped>
/* Custom animation for success modal */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
}

/* Smooth transitions */
.transition-transform {
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Responsive adjustments */
@media (width <= 576px) {
  .card-body {
    padding: 1.5rem;
  }
  
  .form-input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>