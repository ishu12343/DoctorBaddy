<template>
  <footer class="footer-singleline">
    <div class="footer-singleline__container">
      <div class="footer-logo">
        <img src="@/assets/images/Footer1.svg" alt="DoctorBuddy logo" class="footer-logo-image-single" />
      </div>
      
      <nav class="footer-social-links-single">
        <a v-for="icon in socialIcons" :key="icon.label" :href="icon.url" class="footer-social-icon-link-single" :aria-label="icon.label" rel="noopener" target="_blank">
          <span v-html="icon.svg" class="footer-social-icon-single"></span>
        </a>
      </nav>
      
      <nav class="footer-utility-links-single" role="navigation" aria-label="Footer Utility Links">
        <button 
          v-for="item in menuItems" 
          :key="item.key"
          @click="navigateTo(item.key)" 
          class="footer-utility-link-single"
        >
          {{ item.label }}
        </button>
      </nav>
      
      <span class="footer-copyright-single">
        &copy; <span>{{ year }}</span> DoctorBuddy - {{ getRolePortalName() }}
      </span>
      
      <button class="footer-cta-btn-single stylish-cta pulse-animation" @click="navigateTo('profile')">
        <i :class="getProfileIcon()"></i>
        <span class="profile-text">View Profile</span>
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CommonFooter',
  props: {
    userRole: {
      type: String,
      required: true,
      validator: value => ['admin', 'doctor', 'patient'].includes(value)
    }
  },
  emits: ['navigate'],
  data() {
    return {
      socialIcons: [
        {
          label: 'Facebook',
          url: 'https://www.facebook.com/doctorbuddy',
          svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>`
        },
        {
          label: 'Instagram',
          url: 'https://www.instagram.com/doctorbuddy/',
          svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.333 3.374C2.013 5.668 2 6.077 2 9.333v5.334c0 3.256.013 3.665.072 4.945.059 1.282.353 2.394 1.333 3.374.98.98 2.092 1.274 3.374 1.333 1.28.059 1.689.072 4.945.072s3.665-.013 4.945-.072c1.282-.059 2.394-.353 3.374-1.333.98-.98 1.274-2.092 1.333-3.374.059-1.28.072-1.689.072-4.945V9.333c0-3.256-.013-3.665-.072-4.945-.059-1.282-.353-2.394-1.333-3.374-.98-.98-2.092-1.274-3.374-1.333C15.668.013 15.259 0 12 0z"/><circle cx="12" cy="12" r="3.5"/><circle cx="18.406" cy="5.594" r="1.44"/></svg>`
        },
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/company/doctorbuddy',
          svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/doctorbuddy',
          svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`
        },
        {
          label: 'Youtube',
          url: 'https://www.youtube.com/DoctorBuddy',
          svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
        }
      ],
      year: new Date().getFullYear()
    }
  },
  computed: {
    menuItems() {
      const menus = {
        admin: [
          { key: 'dashboard', label: 'Dashboard' },
          { key: 'doctors', label: 'Doctors' },
          { key: 'patients', label: 'Patients' }
        ],
        doctor: [
          { key: 'dashboard', label: 'Dashboard' },
          { key: 'appointments', label: 'Appointments' },
          { key: 'patients', label: 'Patients' }
        ],
        patient: [
          { key: 'dashboard', label: 'Dashboard' },
          { key: 'appointments', label: 'Appointments' }
        ]
      };
      return menus[this.userRole] || [];
    }
  },
  methods: {
    getRolePortalName() {
      const portals = {
        admin: 'Admin Portal',
        doctor: 'Professional Portal',
        patient: 'Patient Portal'
      };
      return portals[this.userRole] || 'Portal';
    },
    getProfileIcon() {
      const icons = {
        admin: 'fas fa-user-shield',
        doctor: 'fas fa-user-md',
        patient: 'fas fa-user'
      };
      return icons[this.userRole] || 'fas fa-user';
    },
    navigateTo(page) {
      this.$emit('navigate', page);
    }
  }
}
</script>

<style scoped>
.footer-singleline {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: #fff;
  backdrop-filter: blur(4px);
  padding: 0.4rem 0;
  position: relative;
  z-index: 10;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  min-height: 48px;
}

.footer-singleline__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow: hidden;
}

.footer-logo {
  flex-shrink: 0;
  order: 1;
}

.footer-logo-image-single {
  width: 28px;
  max-height: 14px;
  object-fit: contain;
  opacity: 0.95;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
}

.footer-social-links-single {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  order: 2;
}

.footer-social-icon-link-single {
  width: 32px;
  height: 32px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5C9EF0;
  background: rgb(255 255 255 / 10%);
  border-radius: 50%;
  transition: all 0.2s ease;
  text-decoration: none;
}

.footer-social-icon-link-single:hover {
  background: #5C9EF0;
  color: #fff;
  transform: scale(1.1);
}

.footer-social-icon-single {
  width: 0.9rem;
  height: 0.9rem;
  fill: currentcolor;
}

.footer-utility-links-single {
  display: flex;
  gap: 0.5rem;
  font-size: 0.78rem;
  flex-shrink: 1;
  min-width: 0;
  order: 3;
}

.footer-utility-link-single {
  color: #b0b8c9;
  text-decoration: none;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 1;
}

.footer-utility-link-single:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.footer-copyright-single {
  font-size: 0.65rem;
  color: #b0b8c9;
  margin: 0;
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  order: 4;
}

.footer-cta-btn-single {
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  position: relative;
  z-index: 1;
  letter-spacing: 0.01em;
  flex-shrink: 0;
  order: 5;
}

/* Stylish CTA Button */
.stylish-cta {
  background: linear-gradient(90deg, #5C9EF0 0%, #3b5998 100%);
  color: #fff;
  border: none;
  border-radius: 18px;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  box-shadow: 0 1px 8px 0 rgb(44 100 200 / 15%);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  letter-spacing: 0.01em;
}

.stylish-cta:hover {
  background: linear-gradient(90deg, #3b5998 0%, #5C9EF0 100%);
  box-shadow: 0 4px 18px 0 rgb(44 100 200 / 18%);
  transform: translateY(-2px);
}

.stylish-cta:active {
  background: linear-gradient(90deg, #4a69bd 0%, #5C9EF0 100%);
  transform: translateY(0);
  box-shadow: 0 2px 8px 0 rgb(44 100 200 / 10%);
}

/* Pulse animation for CTA */
.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(92, 158, 240, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(92, 158, 240, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(92, 158, 240, 0);
  }
}

/* Responsive styles */
@media (max-width: 1024px) {
  .footer-singleline__container {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    flex-wrap: nowrap;
  }
  
  .footer-utility-links-single {
    gap: 0.5rem;
    font-size: 0.75rem;
  }
  
  .footer-utility-link-single {
    padding: 0.2rem 0.4rem;
  }
  
  .footer-copyright-single {
    font-size: 0.7rem;
    margin: 0 0.25rem;
  }
  
  .footer-cta-btn-single {
    font-size: 0.8rem;
    padding: 0.35rem 0.9rem;
  }
}

@media (max-width: 768px) {
  .footer-singleline {
    min-height: 40px;
    padding: 0.25rem 0;
  }
  
  .footer-singleline__container {
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
  }
  
  .footer-logo-image-single {
    height: 14px;
    opacity: 1;
  }
  
  .footer-social-icon-link-single {
    width: 26px;
    height: 26px;
    font-size: 0.7rem;
  }
  
  .footer-social-icon-single {
    width: 0.7rem;
    height: 0.7rem;
  }
  
  .footer-utility-link-single {
    font-size: 0.65rem;
    padding: 0.15rem 0.3rem;
    border-radius: 4px;
    white-space: nowrap;
  }
  
  .footer-copyright-single {
    font-size: 0.6rem;
    text-align: center;
    margin: 0;
    opacity: 0.8;
  }
  
  .footer-cta-btn-single {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    margin-top: 0;
    border-radius: 16px;
    box-shadow: 0 1px 8px rgba(92, 158, 240, 0.2);
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .footer-singleline {
    min-height: 36px;
  }
  
  .footer-singleline__container {
    padding: 0.3rem 0.4rem;
    gap: 0.25rem;
  }
  
  .footer-logo-image-single {
    height: 12px;
  }
  
  .footer-social-links-single {
    gap: 0.25rem;
  }
  
  .footer-social-icon-link-single {
    width: 24px;
    height: 24px;
  }
  
  .footer-social-icon-single {
    width: 0.65rem;
    height: 0.65rem;
  }
  
  .footer-utility-links-single {
    gap: 0.2rem;
    display: none; /* Hide utility links on very small screens to save space */
  }
  
  .footer-copyright-single {
    font-size: 0.55rem;
    max-width: 80px;
  }
  
  .footer-cta-btn-single {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 14px;
  }
  
  .footer-cta-btn-single i {
    font-size: 0.6rem;
  }
  
  .profile-text {
    display: none; /* Hide text on very small screens, keep only icon */
  }
}

/* Touch-friendly improvements */
@media (hover: none) and (pointer: coarse) {
  .footer-social-icon-link-single,
  .footer-utility-link-single,
  .footer-cta-btn-single {
    min-height: 44px;
    min-width: 44px;
    touch-action: manipulation;
  }
  
  .footer-utility-link-single {
    padding: 0.5rem 0.75rem;
  }
  
  .footer-cta-btn-single {
    padding: 0.6rem 1.5rem;
    min-width: auto;
  }
}

/* High DPI screens */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .footer-logo-image-single {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}
</style>