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
        <button @click="$emit('navigate', 'patients')" class="footer-utility-link-single">Patients</button>
      </nav>
      
      <span class="footer-copyright-single">
        &copy; <span>{{ year }}</span> DoctorBuddy - Professional Portal
      </span>
      
      <button class="footer-cta-btn-single stylish-cta pulse-animation" @click="$emit('navigate', 'profile')">
        <i class="fas fa-user-md"></i>
        View Profile
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'DoctorFooter',
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
  width: 1.2rem;
  height: 1.2rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5C9EF0;
  background: rgb(255 255 255 / 10%);
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
}

.footer-social-icon-link-single:hover {
  background: #5C9EF0;
  color: #fff;
}

.footer-social-icon-single {
  width: 0.9rem;
  height: 0.9rem;
  fill: currentcolor;
}

.footer-utility-links-single {
  display: flex;
  gap: 0.4rem;
  font-size: 0.78rem;
}

.footer-utility-link-single {
  color: #b0b8c9;
  text-decoration: none;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
}

.footer-utility-link-single:hover {
  color: #fff;
}

.footer-copyright-single {
  font-size: 0.7rem;
  color: #b0b8c9;
  margin: 0 0.2rem;
  white-space: nowrap;
}

.footer-cta-btn-single {
  font-size: 0.85rem;
  padding: 0.3rem 0.9rem;
  border-radius: 16px;
  font-weight: 700;
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border: none;
  cursor: pointer;
}

/* Stylish CTA Button */
.stylish-cta {
  background: linear-gradient(90deg, #5C9EF0 0%, #3b5998 100%);
  color: #fff;
  border: none;
  border-radius: 22px;
  font-weight: 700;
  font-size: 0.93rem;
  padding: 0.38rem 1.3rem;
  box-shadow: 0 2px 12px 0 rgb(44 100 200 / 13%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, box-shadow 0.2s, transform 0.18s;
  outline: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  letter-spacing: 0.01em;
}

.stylish-cta:hover, .stylish-cta:focus {
  background: linear-gradient(90deg, #3b5998 0%, #5C9EF0 100%);
  box-shadow: 0 4px 18px 0 rgb(44 100 200 / 18%);
  transform: scale(1.045);
}

.stylish-cta:active {
  background: linear-gradient(90deg, #4a69bd 0%, #5C9EF0 100%);
  box-shadow: 0 2px 8px 0 rgb(44 100 200 / 10%);
  transform: scale(0.98);
}

.stylish-cta i {
  font-size: 1.1em;
  margin-right: 0.2em;
}

.pulse-animation {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
  }
}

/* Responsive design */
@media (width <= 900px) {
  .footer-singleline__container {
    max-width: 100vw;
    padding: 0 0.3rem;
    gap: 0.3rem;
  }

  .footer-logo-image-single {
    width: 22px;
    max-height: 11px;
  }
}

@media (width <= 700px) {
  .footer-singleline__container {
    flex-wrap: wrap;
    gap: 0.2rem;
    padding: 0 0.1rem;
  }

  .footer-logo-image-single {
    width: 18px;
    max-height: 9px;
  }

  .footer-copyright-single {
    font-size: 0.62rem;
  }

  .footer-cta-btn-single {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}

@media (width <= 500px) {
  .footer-singleline__container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
    padding: 0.05rem;
    min-height: 60px;
  }

  .footer-logo-image-single {
    width: 14px;
    max-height: 7px;
  }
  
  .footer-utility-links-single {
    order: 2;
  }
  
  .footer-social-links-single {
    order: 3;
  }
  
  .footer-copyright-single {
    order: 4;
  }
  
  .footer-cta-btn-single {
    order: 1;
    margin: 0.2rem 0;
  }
}
</style>