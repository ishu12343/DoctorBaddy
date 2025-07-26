<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__container">
        <div class="footer__top-section">
          <div class="footer__info">
            <a class="footer__logo" href="/">
              <img 
                src="@/assets/images/Footer1.svg" 
                alt="DoctorBuddy logo (blue)" 
                class="footer__logo-image"
              >
            </a>
            <div class="footer__social-links-wraper">
              <h5 class="footer__social-title">
                DoctorBuddy on social media:
              </h5>
              <nav class="footer__social-links">
                <a 
                  href="https://www.facebook.com/doctorbuddy" 
                  class="footer__social-icon-link" 
                  aria-label="Facebook" 
                  rel="noopener" 
                  target="_blank"
                >
                  <svg class="footer__social-icon" role="presentation">
                    <use xlink:href="#icon-facebook"></use>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/doctorbuddy/" 
                  class="footer__social-icon-link" 
                  aria-label="Instagram" 
                  rel="noopener" 
                  target="_blank"
                >
                  <svg class="footer__social-icon" role="presentation">
                    <use xlink:href="#icon-instagram"></use>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/doctorbuddy/" 
                  class="footer__social-icon-link" 
                  aria-label="Linkedin" 
                  rel="noopener" 
                  target="_blank"
                >
                  <svg class="footer__social-icon" role="presentation">
                    <use xlink:href="#icon-linkedin"></use>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/DoctorBuddy" 
                  class="footer__social-icon-link" 
                  aria-label="Youtube" 
                  rel="noopener" 
                  target="_blank"
                >
                  <svg class="footer__social-icon" role="presentation">
                    <use xlink:href="#icon-youtube"></use>
                  </svg>
                </a>
              </nav>
            </div>
          </div>
          <div class="footer__links">
            <!-- <div class="footer__link-group">
              <h2 class="footer__link-group-title">Who We Serve</h2>
              <nav class="footer__link-list-wrapper" aria-label="Footer Navigation - Who We Serve">
                <ul class="footer__link-list">
                  <li class="footer__link-list-item">
                    <a href="/who-we-serve/providers" class="link link--primary link--small">
                      Providers
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="/who-we-serve/payers" class="link link--primary link--small">
                      Payers
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="/who-we-serve/government" class="link link--primary link--small">
                      Government
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="/who-we-serve/higher-education" class="link link--primary link--small">
                      Higher Education
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="https://patients.amwell.com/" class="link link--primary link--small">
                      See a doctor now
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="https://providers.amwell.com/" class="link link--primary link--small">
                      Join Amwell Medical Group
                    </a>
                  </li>
                </ul>
              </nav>
            </div> -->
            <!-- <div class="footer__link-group">
              <h2 class="footer__link-group-title">What We Offer</h2>
              <nav class="footer__link-list-wrapper" aria-label="Footer Navigation - What We Offer">
                <ul class="footer__link-list">
                  <li class="footer__link-list-item">
                    <a href="/what-we-offer/for-providers" class="link link--primary link--small">
                      Provider Solutions
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="/what-we-offer/for-payers" class="link link--primary link--small">
                      Payer Solutions
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="/converge-hybrid-care-platform" class="link link--primary link--small">
                      Amwell Converge™ Platform
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="/what-we-offer/specialty-consults" class="link link--primary link--small">
                      Specialty Consults
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="/what-we-offer/provider-networks" class="link link--primary link--small">
                      Provider Networks
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="https://community.amwell.com/" class="link link--primary link--small" target="_blank" rel="noreferrer">
                      Customer Community
                    </a>
                  </li>
                </ul>
              </nav>
            </div> -->
            <div class="footer__link-group">
              <h2 class="footer__link-group-title">About Us</h2>
              <nav class="footer__link-list-wrapper" aria-label="Footer Navigation - About Us">
                <ul class="footer__link-list">
                  <li class="footer__link-list-item">
                    <a href="/contact-us" class="link link--primary link--small" id="la_em_track_0">
                      Contact Us
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="/about-us" class="link link--primary link--small" target="_blank" rel="noreferrer">
                      About DoctorBuddy
                    </a>
                  </li>
                  <li class="footer__link-list-item">
                    <a href="https://www.silvercloudhealth.com/?utm_source=other&utm_medium=cta&utm_campaign=SCH_Amwell-corporate-site" class="link link--primary link--small" target="_blank" rel="noreferrer">
                      Silvercloud® by DoctorBuddy® International
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="footer__bottom-section">
          <div class="footer__bottom-section-info">
            <div class="footer__info">
              <nav class="footer__utility-links" role="navigation" aria-label="Footer Utility Links">
                <a href="/company/privacy-policy" class="footer__utility-link">
                  Privacy Policy
                </a>
                <a href="/company/terms-of-use" class="footer__utility-link">
                  Terms Of Use
                </a>
                <a href="/sitemap" class="footer__utility-link">
                  Sitemap
                </a>
              </nav>
            </div>
            <p class="footer__copyright">
              ©2025 Indian DoctorBuddy.  is a registered trademark of DoctorBuddy Corporation.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
:root {
  --footer-height: 200px;
}

.footer {
  background: linear-gradient(90deg, #5C9EF0 60%, #fff 100%);
  padding: 4rem 0;
  min-height: var(--footer-height);
}

.footer__logo-image {
  width: 100px;
  height: auto;
  max-height: 40px;
}

.footer__wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer__container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer__top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer__info {
  flex: 0 0 300px;
}

.footer__logo {
  display: block;
  margin-bottom: 1rem;
}

.footer__social-links-wraper {
  margin-top: 1rem;
}

.footer__social-title {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.footer__social-links {
  display: flex;
  gap: 1rem;
}

.footer__social-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.footer__social-icon-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.footer__social-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.footer__links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  flex: 1;
}

.footer__link-group {
  flex: 1;
  min-width: 200px;
}

.footer__link-group-title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
}

.footer__link-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__link-list-item {
  margin: 0;
}

.link {
  text-decoration: none;
  color: #666;
  transition: color 0.3s ease;
}

.link:hover {
  color: #007bff;
}

.footer__bottom-section {
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.footer__bottom-section-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__utility-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__utility-link {
  text-decoration: none;
  color: #666;
  font-size: 0.875rem;
}

.footer__copyright {
  color: #666;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .footer__top-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer__info {
    flex: 0 0 100%;
  }

  .footer__links {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer__link-group {
    flex: 0 0 100%;
    text-align: center;
  }

  .footer__bottom-section-info {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer__utility-links {
    justify-content: center;
  }
}

/* Add this to your main layout component */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-content {
  flex: 1;
}

</style>
