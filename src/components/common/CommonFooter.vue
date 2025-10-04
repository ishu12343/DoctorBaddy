<template>
  <footer class="modern-footer" role="contentinfo">
    <!-- Desktop & Tablet Layout -->
    <div class="footer-desktop hidden-mobile">
      <div class="footer-container">
        <!-- Left Section: Logo & Branding -->
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="@/assets/images/Footer1.svg" alt="DoctorBuddy" class="footer-logo-img" />
            <span class="footer-brand-text">{{ getRolePortalName() }}</span>
          </div>
        </div>
        
        <!-- Center Section: Quick Navigation -->
        <nav class="footer-nav" role="navigation" aria-label="Footer Navigation">
          <button 
            v-for="item in menuItems" 
            :key="item.key"
            @click="navigateTo(item.key)" 
            class="footer-nav-link"
            :aria-label="`Navigate to ${item.label}`"
          >
            <i :class="getMenuIcon(item.key)" class="nav-icon"></i>
            <span>{{ item.label }}</span>
          </button>
        </nav>
        
        <!-- Right Section: Social Links & CTA -->
        <div class="footer-actions">
          <nav class="footer-social" aria-label="Social Media Links">
            <a 
              v-for="icon in socialIcons" 
              :key="icon.label" 
              :href="icon.url" 
              class="social-link" 
              :aria-label="`Follow us on ${icon.label}`" 
              rel="noopener noreferrer" 
              target="_blank"
            >
              <span v-html="icon.svg" class="social-icon"></span>
            </a>
          </nav>
          
          <button class="footer-cta-btn" @click="navigateTo('profile')" :aria-label="`View ${userRole} profile`">
            <i :class="getProfileIcon()" class="cta-icon"></i>
            <span class="cta-text">Profile</span>
          </button>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="footer-copyright">
        <span>&copy; {{ year }} DoctorBuddy. All rights reserved.</span>
        <span class="separator">•</span>
        <span>{{ getRolePortalName() }}</span>
      </div>
    </div>
    
    <!-- Mobile Layout -->
    <div class="footer-mobile visible-mobile">
      <div class="mobile-footer-top">
        <div class="mobile-brand">
          <img src="@/assets/images/Footer1.svg" alt="DoctorBuddy" class="mobile-logo" />
          <span class="mobile-brand-text">{{ getRolePortalName() }}</span>
        </div>
        
        <button class="mobile-profile-btn" @click="navigateTo('profile')" :aria-label="`View ${userRole} profile`">
          <i :class="getProfileIcon()" class="mobile-profile-icon"></i>
        </button>
      </div>
      
      <div class="mobile-footer-content">
        <nav class="mobile-nav" role="navigation" aria-label="Mobile Footer Navigation">
          <button 
            v-for="item in menuItems" 
            :key="item.key"
            @click="navigateTo(item.key)" 
            class="mobile-nav-btn"
            :aria-label="`Navigate to ${item.label}`"
          >
            <i :class="getMenuIcon(item.key)" class="mobile-nav-icon"></i>
            <span class="mobile-nav-text">{{ item.label }}</span>
          </button>
        </nav>
        
        <div class="mobile-social">
          <a 
            v-for="icon in socialIcons.slice(0, 4)" 
            :key="icon.label" 
            :href="icon.url" 
            class="mobile-social-link" 
            :aria-label="`Follow us on ${icon.label}`" 
            rel="noopener noreferrer" 
            target="_blank"
          >
            <span v-html="icon.svg" class="mobile-social-icon"></span>
          </a>
        </div>
      </div>
      
      <div class="mobile-copyright">
        <span>&copy; {{ year }} DoctorBuddy</span>
      </div>
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
    getMenuIcon(menuKey) {
      const icons = {
        dashboard: 'fas fa-tachometer-alt',
        appointments: 'fas fa-calendar-alt',
        doctors: 'fas fa-user-md',
        patients: 'fas fa-users',
        profile: this.getProfileIcon()
      };
      return icons[menuKey] || 'fas fa-circle';
    },
    navigateTo(page) {
      // Add some visual feedback
      const event = new Event('footerNavigation');
      document.dispatchEvent(event);
      this.$emit('navigate', page);
    }
  }
}
</script>

<style scoped>
/* Modern Footer Base Styles */
.modern-footer {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: #ffffff;
  position: relative;
  z-index: 10;
  box-shadow: 0 -4px 25px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Segoe UI', 'Inter', system-ui, sans-serif;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.modern-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  z-index: 1;
}

/* Desktop Footer */
.footer-desktop {
  position: relative;
  z-index: 2;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  gap: 2rem;
  min-height: 60px;
}

.footer-brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.footer-brand-text {
  font-size: 1rem;
  font-weight: 600;
  color: #e2e8f0;
  letter-spacing: 0.5px;
}

.footer-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  justify-content: center;
}

.footer-nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.footer-nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.footer-nav-link:active {
  transform: translateY(0);
}

.nav-icon {
  font-size: 0.875rem;
  opacity: 0.9;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #94a3b8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.social-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.footer-cta-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: none;
  border-radius: 25px;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
}

.footer-cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.footer-cta-btn:hover::before {
  left: 100%;
}

.footer-cta-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.footer-cta-btn:active {
  transform: translateY(0);
}

.cta-icon {
  font-size: 1rem;
}

.footer-copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  color: #94a3b8;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.separator {
  opacity: 0.5;
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

/* Mobile Footer */
.footer-mobile {
  position: relative;
  z-index: 2;
}

.mobile-footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(1.1);
}

.mobile-brand-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e2e8f0;
}

.mobile-profile-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-profile-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.mobile-profile-icon {
  font-size: 1rem;
}

.mobile-footer-content {
  padding: 0.75rem 1rem;
}

.mobile-nav {
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.mobile-nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-height: 56px;
}

.mobile-nav-btn:hover,
.mobile-nav-btn:active {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: translateY(-1px);
}

.mobile-nav-icon {
  font-size: 1.1rem;
}

.mobile-nav-text {
  font-size: 0.7rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
}

.mobile-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.mobile-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.mobile-social-link:hover,
.mobile-social-link:active {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: scale(1.1);
}

.mobile-social-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.mobile-copyright {
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #94a3b8;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
}

/* Responsive Breakpoints */
@media (min-width: 769px) {
  .footer-mobile {
    display: none;
  }
  .visible-mobile {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .footer-desktop {
    display: none;
  }
  .hidden-mobile {
    display: none !important;
  }
  .visible-mobile {
    display: block !important;
  }
}

@media (max-width: 1200px) {
  .footer-container {
    padding: 1rem 1.5rem;
    gap: 1.5rem;
  }
  
  .footer-nav {
    gap: 1rem;
  }
  
  .footer-nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 992px) {
  .footer-container {
    padding: 1rem;
    gap: 1rem;
  }
  
  .footer-nav {
    gap: 0.75rem;
  }
  
  .footer-nav-link span {
    display: none;
  }
  
  .footer-nav-link {
    padding: 0.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-content: center;
  }
  
  .footer-brand-text {
    font-size: 0.875rem;
  }
  
  .footer-cta-btn .cta-text {
    display: none;
  }
  
  .footer-cta-btn {
    padding: 0.75rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    justify-content: center;
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

/* Touch-friendly and Accessibility Improvements */
@media (hover: none) and (pointer: coarse) {
  .footer-nav-link,
  .social-link,
  .footer-cta-btn,
  .mobile-nav-btn,
  .mobile-social-link,
  .mobile-profile-btn {
    min-height: 44px;
    min-width: 44px;
    touch-action: manipulation;
  }
  
  .mobile-nav-btn {
    min-height: 60px;
  }
  
  .footer-nav-link:hover,
  .social-link:hover,
  .footer-cta-btn:hover {
    transform: none;
  }
}

/* Focus States for Accessibility */
.footer-nav-link:focus,
.social-link:focus,
.footer-cta-btn:focus,
.mobile-nav-btn:focus,
.mobile-social-link:focus,
.mobile-profile-btn:focus {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .modern-footer {
    background: #000000;
    border-top: 2px solid #ffffff;
  }
  
  .footer-nav-link,
  .social-link,
  .mobile-nav-btn,
  .mobile-social-link {
    border: 1px solid #ffffff;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .footer-nav-link,
  .social-link,
  .footer-cta-btn,
  .mobile-nav-btn,
  .mobile-social-link,
  .mobile-profile-btn {
    transition: none;
  }
  
  .modern-footer *:hover {
    transform: none !important;
  }
}

/* Print Styles */
@media print {
  .modern-footer {
    background: none !important;
    color: #000000 !important;
    box-shadow: none !important;
    border-top: 1px solid #000000 !important;
  }
  
  .footer-social,
  .mobile-social,
  .footer-cta-btn,
  .mobile-profile-btn {
    display: none !important;
  }
}

/* High DPI Screens */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .footer-logo-img,
  .mobile-logo {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .modern-footer {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
}
</style>