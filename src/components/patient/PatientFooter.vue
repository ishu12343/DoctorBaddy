<template>
  <footer class="footer-singleline">
    <div class="footer-singleline__container">
      <div class="footer-logo">
        <img src="@/assets/images/Footer1.svg" alt="DoctorBuddy logo (blue)" class="footer-logo-image-single" />
      </div>
      
      <nav class="footer-social-links-single">
        <a v-for="icon in socialIcons" :key="icon.label" :href="icon.url" class="footer-social-icon-link-single" :aria-label="icon.label" rel="noopener" target="_blank">
          <span v-html="icon.svg" class="footer-social-icon-single"></span>
        </a>
      </nav>
      
      <nav class="footer-utility-links-single" role="navigation" aria-label="Footer Utility Links">
        <button @click="$emit('navigate', 'dashboard')" class="footer-utility-link-single">Dashboard</button>
        <button @click="$emit('navigate', 'appointments')" class="footer-utility-link-single">Appointments</button>
        <button @click="$emit('navigate', 'profile')" class="footer-utility-link-single">Profile</button>
      </nav>
      
      <span class="footer-copyright-single">
        &copy; <span>{{ year }}</span> DoctorBuddy - Patient Portal
      </span>
      
      <button class="footer-cta-btn-single stylish-cta pulse-animation" @click="$emit('navigate', 'profile')">
        <i class="fas fa-user"></i>
        View Profile
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PatientFooter',
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
          label: 'Linkedin',
          url: 'https://www.linkedin.com/company/doctorbuddy/',
          svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.369-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.069 0-1.144.925-2.069 2.069-2.069 1.144 0 2.069.925 2.069 2.069 0 1.143-.925 2.069-2.069 2.069zm1.777 13.019H3.56V9h3.554v11.452z"/></svg>`
        },
        {
          label: 'Youtube',
          url: 'https://www.youtube.com/DoctorBuddy',
          svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
        }
      ],
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer-singleline {
  width: 100%;
  background: linear-gradient(90deg, #1a2746 0%, #223a5e 100%);
  box-shadow: 0 2px 12px 0 rgb(30 40 90 / 10%);
  border-top: 2px solid #2b3a5e;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  position: relative;
  z-index: 2;
}

.footer-singleline__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  max-width: 1200px;
  padding: 0 0.7rem;
  gap: 0.7rem;
  box-sizing: border-box;
}

.footer-logo-image-single {
  width: 28px;
  max-height: 14px;
}

.footer-social-links-single {
  display: flex;
  gap: 0.3rem;
}

.footer-social-icon-link-single {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.footer-social-icon-single {
  width: 14px;
  height: 14px;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.footer-social-icon-link-single:hover .footer-social-icon-single {
  color: #60a5fa;
  transform: scale(1.1);
}

.footer-utility-links-single {
  display: flex;
  gap: 0.5rem;
}

.footer-utility-link-single {
  padding: 0.3rem 0.6rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.footer-utility-link-single:hover {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
}

.footer-copyright-single {
  color: #64748b;
  font-size: 0.7rem;
  font-weight: 400;
  white-space: nowrap;
}

.footer-cta-btn-single {
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
}

.footer-cta-btn-single:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
}

.footer-cta-btn-single i {
  font-size: 0.7rem;
}

/* Pulse Animation */
.pulse-animation::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.pulse-animation:hover::before {
  left: 100%;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .footer-singleline__container {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .footer-utility-links-single {
    order: 1;
    width: 100%;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .footer-logo {
    order: 2;
  }

  .footer-social-links-single {
    order: 3;
  }

  .footer-copyright-single {
    order: 4;
    font-size: 0.65rem;
    text-align: center;
  }

  .footer-cta-btn-single {
    order: 5;
    font-size: 0.65rem;
    padding: 0.3rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .footer-singleline__container {
    padding: 0.3rem;
    min-height: 40px;
  }

  .footer-utility-link-single {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }

  .footer-logo-image-single {
    width: 24px;
    max-height: 12px;
  }

  .footer-social-icon-link-single {
    width: 24px;
    height: 24px;
  }

  .footer-social-icon-single {
    width: 12px;
    height: 12px;
  }

  .footer-copyright-single {
    font-size: 0.6rem;
  }
}

/* Ultra-small screens */
@media (max-width: 360px) {
  .footer-utility-links-single {
    gap: 0.2rem;
  }
  
  .footer-utility-link-single {
    font-size: 0.65rem;
    padding: 0.2rem 0.3rem;
  }
  
  .footer-cta-btn-single {
    font-size: 0.6rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>