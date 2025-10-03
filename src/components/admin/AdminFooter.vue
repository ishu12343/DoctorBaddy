<template>
  <footer class="footer-singleline">
    <div class="footer-singleline__container">
      <div class="footer-logo">
        <img src="@/assets/images/Footer1.svg" alt="DoctorBuddy Admin" class="footer-logo-image-single" />
      </div>
      
      <nav class="footer-social-links-single">
        <a v-for="icon in socialIcons" :key="icon.label" :href="icon.url" class="footer-social-icon-link-single" :aria-label="icon.label" rel="noopener" target="_blank">
          <span v-html="icon.svg" class="footer-social-icon-single"></span>
        </a>
      </nav>
      
      <nav class="footer-utility-links-single" role="navigation" aria-label="Footer Utility Links">
        <button @click="navigate('dashboard')" class="footer-utility-link-single">Dashboard</button>
        <button @click="navigate('doctors')" class="footer-utility-link-single">Doctors</button>
        <button @click="navigate('patients')" class="footer-utility-link-single">Patients</button>
      </nav>
      
      <span class="footer-copyright-single">
        &copy; <span>{{ year }}</span> DoctorBuddy - Admin Portal
      </span>
      
      <button class="footer-cta-btn-single stylish-cta pulse-animation" @click="navigate('profile')">
        <i class="fas fa-user-shield"></i>
        Admin Profile
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AdminFooter',
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
  },
  methods: {
    navigate(page) {
      this.$emit('navigate', page);
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
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  gap: 1rem;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.footer-logo-image-single {
  height: 14px;
  width: auto;
  opacity: 0.9;
}

.footer-social-links-single {
  display: flex;
  gap: 0.5rem;
}

.footer-social-icon-link-single {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5C9EF0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.2s ease;
  text-decoration: none;
}

.footer-social-icon-link-single:hover {
  background: #5C9EF0;
  color: white;
  transform: translateY(-2px);
}

.footer-social-icon-single {
  width: 0.9rem;
  height: 0.9rem;
  fill: currentColor;
}

.footer-utility-links-single {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
}

.footer-utility-link-single {
  color: #b0b8c9;
  text-decoration: none;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.footer-utility-link-single:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.footer-copyright-single {
  font-size: 0.75rem;
  color: #b0b8c9;
  margin: 0 0.5rem;
  white-space: nowrap;
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
}

/* Stylish CTA Button */
.stylish-cta {
  background: linear-gradient(90deg, #5C9EF0 0%, #3b5998 100%);
  color: #fff;
  border: none;
  border-radius: 22px;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.4rem 1.2rem;
  box-shadow: 0 2px 12px 0 rgb(44 100 200 / 13%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  }
  
  .footer-utility-links-single {
    display: none;
  }
  
  .footer-copyright-single {
    font-size: 0.7rem;
  }
  
  .footer-cta-btn-single {
    font-size: 0.8rem;
    padding: 0.35rem 0.9rem;
  }
}

@media (max-width: 768px) {
  .footer-singleline__container {
    justify-content: center;
    gap: 1rem;
  }
  
  .footer-logo,
  .footer-copyright-single {
    display: none;
  }
  
  .footer-social-links-single {
    gap: 0.75rem;
  }
  
  .footer-cta-btn-single {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
  }
  
  .footer-cta-btn-single span {
    display: none;
  }
  
  .footer-cta-btn-single i {
    margin: 0;
    font-size: 1.2rem;
  }
}
</style>
