<template>
  <div class="layout-container">
    <div class="layout-content">
      <AppHeader @login="goToLogin" />
      <div class="main-content">
        <!-- Hero/Masthead or Smart Doctor Recommendations -->
        <section v-if="!showSmartDoctorSection" class="masthead">
          <div class="masthead__content">
            <div class="masthead__text">
              <h1 class="animated-title dynamic-hero-title">
                <span class="highlight">Online doctor visits,</span>
                <transition-group name="swap-fade" tag="span">
                  <span :key="currentHeroPhrase" class="swap-phrase">{{ currentHeroPhrase }}</span>
                </transition-group>
              </h1>
              <div class="masthead-subtitle stylish-paragraph">
                <span class="fade-in-text">
                  <span class="subtitle-main">Your health, <span class="subtitle-highlight">your way.</span></span>
                  <span class="subtitle-animated">
                    <transition-group name="swap-fade" tag="span">
                      <span :key="currentSubtitle" class="subtitle-swap">{{ currentSubtitle }}</span>
                    </transition-group>
                  </span>
                </span>
              </div>
              <div class="cta-buttons">
                <button @click="scrollToServices" class="btn btn--secondary btn--large">
                  <i class="fas fa-info-circle"></i>
                  Learn More
                </button>
              </div>
              <div class="stats-row">
                <div class="stat-item">
                  <div class="stat-number">{{ animatedStats.doctors }}+</div>
                  <div class="stat-label">Expert Doctors</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">{{ animatedStats.patients }}+</div>
                  <div class="stat-label">Happy Patients</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">{{ animatedStats.consultations }}+</div>
                  <div class="stat-label">Consultations</div>
                </div>
              </div>
            </div>
            <div class="masthead__image">
              <div class="hero-visual-container">
                <div class="top-doctors-showcase">
                  <div class="showcase-header">
                    <h3>Top Rated Doctors</h3>
                    <div class="header-actions">
                      <span class="live-badge">
                        <i class="fas fa-circle"></i>
                        Live Now
                      </span>
                      <button @click="showSmartDoctorSection = true" class="btn btn--primary btn--compact pulse-animation">
                        <i class="fas fa-video"></i>
                        See a doctor now
                      </button>
                    </div>
                  </div>
                  <div class="doctors-carousel">
                    <div 
                      v-for="(doctor, index) in topRatedDoctors.slice(0, 3)" 
                      :key="doctor.id"
                      class="doctor-mini-card"
                      :style="{ animationDelay: `${index * 0.2}s` }">
                      <div class="doctor-mini-avatar">
                        <img :src="doctor.image" :alt="doctor.name" />
                        <div class="rating-badge">
                          <i class="fas fa-star"></i>
                          {{ doctor.rating }}
                        </div>
                      </div>
                      <div class="doctor-mini-info">
                        <h4>{{ doctor.name }}</h4>
                        <p>{{ doctor.specialty }}</p>
                        <div class="consultation-info">
                          <span class="price">${{ doctor.consultationFee }}</span>
                          <button class="quick-book-btn">
                            <i class="fas fa-video"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="showcase-stats">
                    <div class="stat-mini">
                      <div class="stat-icon">
                        <i class="fas fa-users"></i>
                      </div>
                      <div class="stat-text">
                        <span class="number">2.5k+</span>
                        <span class="label">Patients Served</span>
                      </div>
                    </div>
                    <div class="stat-mini">
                      <div class="stat-icon">
                        <i class="fas fa-clock"></i>
                      </div>
                      <div class="stat-text">
                        <span class="number">24/7</span>
                        <span class="label">Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section v-else class="smart-suggestions smart-suggestions--main">
          <div class="suggestions-container">
            <div class="suggestions-header">
              <div class="header-content">
                <h2 class="suggestions-title">
                  <i class="fas fa-brain"></i>
                  Smart Doctor Recommendations
                </h2>
                <p class="suggestions-subtitle">Based on availability, ratings, and your needs</p>
              </div>
              <button @click="showSmartDoctorSection = false" class="back-btn stylish-back-btn">
                <span class="back-icon-wrapper">
                  <i class="fas fa-arrow-left"></i>
                </span>
                <span class="back-text">Back</span>
              </button>
            </div>
            <div class="suggestion-categories">
              <div class="category-tabs">
                <button 
                  v-for="category in suggestionCategories" 
                  :key="category.id"
                  @click="currentSuggestionCategory = category.id"
                  :class="['category-tab', { active: currentSuggestionCategory === category.id }]">
                  <i :class="category.icon"></i>
                  {{ category.name }}
                  <span class="count">{{ category.count }}</span>
                </button>
              </div>
            </div>
            <div class="suggestions-grid">
              <div 
                v-for="doctor in currentSuggestions" 
                :key="doctor.id"
                class="suggestion-card"
                @click="selectDoctorForConsultation(doctor)">
                <div class="suggestion-badge">
                  <span v-if="doctor.isTopRated" class="badge top-rated">
                    <i class="fas fa-crown"></i>
                    Top Rated
                  </span>
                  <span v-if="doctor.isOnline" class="badge available">
                    <i class="fas fa-circle"></i>
                    Available Now
                  </span>
                  <span v-if="doctor.isSpecialist" class="badge specialist">
                    <i class="fas fa-star"></i>
                    Specialist
                  </span>
                </div>
                <div class="doctor-suggestion-info">
                  <div class="doctor-avatar-large">
                    <img :src="doctor.image" :alt="doctor.name" />
                    <div class="availability-indicator" :class="{ online: doctor.isOnline }"></div>
                  </div>
                  <div class="doctor-details-extended">
                    <h3>{{ doctor.name }}</h3>
                    <p class="specialty-detail">{{ doctor.specialty }}</p>
                    <div class="experience-rating">
                      <span class="experience">{{ doctor.experience }}+ years</span>
                      <div class="rating-stars">
                        <i v-for="star in 5" :key="star" 
                          :class="['fas fa-star', { filled: star <= Math.floor(doctor.rating) }]"></i>
                        <span class="rating-number">{{ doctor.rating }}</span>
                      </div>
                    </div>
                    <div class="consultation-options-extended">
                      <div class="option video-option">
                        <i class="fas fa-video"></i>
                        <span>Video Call</span>
                        <span class="price">${{ doctor.consultationFee }}</span>
                      </div>
                      <div class="option chat-option">
                        <i class="fas fa-comments"></i>
                        <span>Chat</span>
                        <span class="price">${{ doctor.consultationFee - 20 }}</span>
                      </div>
                    </div>
                    <div class="quick-stats">
                      <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>{{ doctor.totalPatients }}+ patients</span>
                      </div>
                      <div class="stat">
                        <i class="fas fa-clock"></i>
                        <span>{{ doctor.isOnline ? 'Available now' : doctor.nextAvailable }}</span>
                      </div>
                    </div>
                    <button class="book-now-btn" @click.stop="bookConsultation(doctor)">
                      <i class="fas fa-calendar-check"></i>
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="suggestions-footer">
              <button @click="showAllDoctors" class="btn btn--outline">
                <i class="fas fa-th-large"></i>
                View All Doctors
              </button>
              <button @click="emergencyContact" class="btn btn--emergency">
                <i class="fas fa-exclamation-triangle"></i>
                Emergency? Call 911
              </button>
            </div>
          </div>
        </section>
      
      <!-- Smart Doctor Suggestions -->
      <section class="smart-suggestions" v-if="showSuggestions">
        <div class="suggestions-container">
          <div class="suggestions-header">
            <div class="header-content">
              <h2 class="suggestions-title">
                <i class="fas fa-brain"></i>
                Smart Doctor Recommendations
              </h2>
              <p class="suggestions-subtitle">Based on availability, ratings, and your needs</p>
            </div>
            <button @click="closeSuggestions" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="suggestion-categories">
            <div class="category-tabs">
              <button 
                v-for="category in suggestionCategories" 
                :key="category.id"
                @click="currentSuggestionCategory = category.id"
                :class="['category-tab', { active: currentSuggestionCategory === category.id }]">
                <i :class="category.icon"></i>
                {{ category.name }}
                <span class="count">{{ category.count }}</span>
              </button>
            </div>
          </div>
          
          <div class="suggestions-grid">
            <div 
              v-for="doctor in currentSuggestions" 
              :key="doctor.id"
              class="suggestion-card"
              @click="selectDoctorForConsultation(doctor)">
              <div class="suggestion-badge">
                <span v-if="doctor.isTopRated" class="badge top-rated">
                  <i class="fas fa-crown"></i>
                  Top Rated
                </span>
                <span v-if="doctor.isOnline" class="badge available">
                  <i class="fas fa-circle"></i>
                  Available Now
                </span>
                <span v-if="doctor.isSpecialist" class="badge specialist">
                  <i class="fas fa-star"></i>
                  Specialist
                </span>
              </div>
              
              <div class="doctor-suggestion-info">
                <div class="doctor-avatar-large">
                  <img :src="doctor.image" :alt="doctor.name" />
                  <div class="availability-indicator" :class="{ online: doctor.isOnline }"></div>
                </div>
                
                <div class="doctor-details-extended">
                  <h3>{{ doctor.name }}</h3>
                  <p class="specialty-detail">{{ doctor.specialty }}</p>
                  <div class="experience-rating">
                    <span class="experience">{{ doctor.experience }}+ years</span>
                    <div class="rating-stars">
                      <i v-for="star in 5" :key="star" 
                         :class="['fas fa-star', { filled: star <= Math.floor(doctor.rating) }]"></i>
                      <span class="rating-number">{{ doctor.rating }}</span>
                    </div>
                  </div>
                  
                  <div class="consultation-options-extended">
                    <div class="option video-option">
                      <i class="fas fa-video"></i>
                      <span>Video Call</span>
                      <span class="price">${{ doctor.consultationFee }}</span>
                    </div>
                    <div class="option chat-option">
                      <i class="fas fa-comments"></i>
                      <span>Chat</span>
                      <span class="price">${{ doctor.consultationFee - 20 }}</span>
                    </div>
                  </div>
                  
                  <div class="quick-stats">
                    <div class="stat">
                      <i class="fas fa-users"></i>
                      <span>{{ doctor.totalPatients }}+ patients</span>
                    </div>
                    <div class="stat">
                      <i class="fas fa-clock"></i>
                      <span>{{ doctor.isOnline ? 'Available now' : doctor.nextAvailable }}</span>
                    </div>
                  </div>
                  
                  <button class="book-now-btn" @click.stop="bookConsultation(doctor)">
                    <i class="fas fa-calendar-check"></i>
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="suggestions-footer">
            <button @click="showAllDoctors" class="btn btn--outline">
              <i class="fas fa-th-large"></i>
              View All Doctors
            </button>
            <button @click="emergencyContact" class="btn btn--emergency">
              <i class="fas fa-exclamation-triangle"></i>
              Emergency? Call 911
            </button>
          </div>
        </div>
      </section>
      
      <!-- <h3>Prescriptions</h3>
      <p>Prescriptions are sent electronically to the pharmacy of your choice.</p> -->
      <!-- Available Doctors List -->
      <section class="doctors-list slide-up" v-if="showTestimonials">
        <h2 class="section-title">Available Doctors</h2>
        <p class="section-subtitle">Choose from our qualified medical professionals</p>
        
        <div class="doctors-filter">
          <div class="filter-tabs">
            <button 
              v-for="specialty in availableSpecialties" 
              :key="specialty"
              @click="currentSpecialty = specialty"
              :class="['filter-tab', { active: currentSpecialty === specialty }]">
              {{ specialty }}
            </button>
          </div>
        </div>

        <div class="doctors-grid">
          <div 
            v-for="doctor in filteredDoctors" 
            :key="doctor.id"
            class="doctor-card"
            @click="selectDoctor(doctor)">
            <div class="doctor-status">
              <div :class="['status-indicator', doctor.isOnline ? 'online' : 'offline']"></div>
              <span class="status-text">{{ doctor.isOnline ? 'Available Now' : 'Offline' }}</span>
            </div>
            
            <div class="doctor-avatar-section">
              <img :src="doctor.image" :alt="doctor.name" class="doctor-avatar-img" />
              <div class="doctor-rating">
                <i class="fas fa-star"></i>
                <span>{{ doctor.rating }}</span>
              </div>
            </div>
            
            <div class="doctor-info-section">
              <h3 class="doctor-name">{{ doctor.name }}</h3>
              <p class="doctor-specialty">{{ doctor.specialty }}</p>
              <p class="doctor-experience">{{ doctor.experience }} years experience</p>
              
              <div class="consultation-price">
                <span class="price-label">Consultation:</span>
                <span class="price-amount">${{ doctor.consultationFee }}</span>
              </div>
              
              <div class="quick-actions">
                <button class="btn btn--primary btn--small">
                  <i class="fas fa-video"></i>
                  Video Call
                </button>
                <button class="btn btn--secondary btn--small">
                  <i class="fas fa-calendar"></i>
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="load-more-section" v-if="hasMoreDoctors">
          <button @click="loadMoreDoctors" class="btn btn--outline">
            <i class="fas fa-plus"></i>
            Load More Doctors
          </button>
        </div>
      </section>
      <!-- Benefits Icon Cards -->
      <section class="benefits-showcase slide-up">
        <h2 class="section-title">Why Choose DoctorBuddy?</h2>
        <div class="benefits-horizontal">
          <div class="benefit-item">
            <div class="benefit-icon-circle">
              <i class="fas fa-globe-americas"></i>
            </div>
            <div class="benefit-content">
              <h4>Visit Anywhere</h4>
              <p>Global Access</p>
            </div>
          </div>
          <div class="benefit-separator"></div>
          <div class="benefit-item">
            <div class="benefit-icon-circle">
              <i class="fas fa-clock"></i>
            </div>
            <div class="benefit-content">
              <h4>24/7 Available</h4>
              <p>Round the Clock</p>
            </div>
          </div>
          <div class="benefit-separator"></div>
          <div class="benefit-item">
            <div class="benefit-icon-circle">
              <i class="fas fa-prescription-bottle-alt"></i>
            </div>
            <div class="benefit-content">
              <h4>Prescriptions</h4>
              <p>Direct to Pharmacy</p>
            </div>
          </div>
          <div class="benefit-separator"></div>
          <div class="benefit-item">
            <div class="benefit-icon-circle">
              <i class="fas fa-pills"></i>
            </div>
            <div class="benefit-content">
              <h4>Medicine Delivery</h4>
              <p>To Your Door</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- How it Works Section -->
      <section class="how-it-works">
        <div class="container">
          <h2 class="section-title">Get Expert Care in 4 Simple Steps</h2>
          <p class="section-subtitle">From sign-up to treatment - experience healthcare made simple</p>
          
          <div class="process-timeline">
            <div class="timeline-step">
              <div class="step-visual">
                <div class="step-image">
                  <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop" 
                       alt="Sign up process" />
                </div>
                <div class="step-number">01</div>
              </div>
              <div class="step-content">
                <h3>Quick Sign Up</h3>
                <p>Create your secure account in under 2 minutes. Add your basic health information and insurance details.</p>
                <ul class="step-features">
                  <li><i class="fas fa-check"></i> HIPAA compliant security</li>
                  <li><i class="fas fa-check"></i> Insurance verification</li>
                  <li><i class="fas fa-check"></i> Medical history upload</li>
                </ul>
                <div class="time-estimate">
                  <i class="fas fa-clock"></i>
                  <span>Takes 2 minutes</span>
                </div>
              </div>
            </div>

            <div class="timeline-step reverse">
              <div class="step-visual">
                <div class="step-image">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop" 
                       alt="Choose doctor" />
                </div>
                <div class="step-number">02</div>
              </div>
              <div class="step-content">
                <h3>Choose Your Doctor</h3>
                <p>Browse our network of board-certified doctors. Filter by specialty, availability, and patient ratings.</p>
                <ul class="step-features">
                  <li><i class="fas fa-check"></i> 500+ certified doctors</li>
                  <li><i class="fas fa-check"></i> Real patient reviews</li>
                  <li><i class="fas fa-check"></i> Instant availability</li>
                </ul>
                <div class="time-estimate">
                  <i class="fas fa-clock"></i>
                  <span>Find doctor in 1 minute</span>
                </div>
              </div>
            </div>

            <div class="timeline-step">
              <div class="step-visual">
                <div class="step-image">
                  <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop" 
                       alt="Video consultation" />
                </div>
                <div class="step-number">03</div>
              </div>
              <div class="step-content">
                <h3>Start Consultation</h3>
                <p>Connect via HD video call from any device. Discuss symptoms, get diagnosis, and receive treatment plan.</p>
                <ul class="step-features">
                  <li><i class="fas fa-check"></i> HD video & audio</li>
                  <li><i class="fas fa-check"></i> Screen sharing</li>
                  <li><i class="fas fa-check"></i> Real-time notes</li>
                </ul>
                <div class="time-estimate">
                  <i class="fas fa-clock"></i>
                  <span>Average 15-20 minutes</span>
                </div>
              </div>
            </div>

            <div class="timeline-step reverse">
              <div class="step-visual">
                <div class="step-image">
                  <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop" 
                       alt="Get treatment" />
                </div>
                <div class="step-number">04</div>
              </div>
              <div class="step-content">
                <h3>Receive Treatment</h3>
                <p>Get e-prescriptions sent to your pharmacy, treatment plans, and follow-up care recommendations.</p>
                <ul class="step-features">
                  <li><i class="fas fa-check"></i> E-prescriptions</li>
                  <li><i class="fas fa-check"></i> Treatment summary</li>
                  <li><i class="fas fa-check"></i> Follow-up reminders</li>
                </ul>
                <div class="time-estimate">
                  <i class="fas fa-clock"></i>
                  <span>Instant delivery</span>
                </div>
              </div>
            </div>
          </div>

          <div class="cta-section">
            <div class="cta-content">
              <h3>Ready to experience better healthcare?</h3>
              <p>Join thousands of satisfied patients who chose convenience without compromising quality.</p>
              <button @click="showTestimonials = true" class="btn btn--primary btn--large">
                <i class="fas fa-play-circle"></i>
                Start Free Consultation
              </button>
              <div class="guarantee">
                <i class="fas fa-shield-check"></i>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Patient Reviews Section -->
      <section class="patient-reviews">
        <div class="container">
          <h2 class="section-title">What Our Patients Say</h2>
          <div class="reviews-grid">
            <div class="review-card">
              <div class="review-content">
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p>"Amazing experience! Got consultation at 2 AM when my fever spiked. Doctor was very professional and caring."</p>
              </div>
              <div class="review-author">
                <div class="author-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="Sarah M." />
                </div>
                <div class="author-info">
                  <h4>Sarah M.</h4>
                  <span>Mother of 2</span>
                </div>
              </div>
            </div>
            <div class="review-card">
              <div class="review-content">
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p>"Saved me a trip to the ER! Quick diagnosis and prescription delivered to my door. Highly recommend!"</p>
              </div>
              <div class="review-author">
                <div class="author-avatar">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Michael R." />
                </div>
                <div class="author-info">
                  <h4>Michael R.</h4>
                  <span>Business Executive</span>
                </div>
              </div>
            </div>
            <div class="review-card">
              <div class="review-content">
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p>"Perfect for busy parents. No waiting rooms, no exposure to other illnesses. Just quality healthcare!"</p>
              </div>
              <div class="review-author">
                <div class="author-avatar">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" alt="Emily C." />
                </div>
                <div class="author-info">
                  <h4>Emily C.</h4>
                  <span>Working Mom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div> <!-- Close main-content -->
      
      <!-- CTA Footer Section -->
      <section class="cta-footer">
        <div class="cta-footer__bg">
          <div class="cta-footer__container">
            <div class="cta-footer__icon">
              <i class="fas fa-user-md fa-3x"></i>
            </div>
            <div class="cta-footer__text">
              <h2>Ready to start your health journey?</h2>
              <div>Experience the future of healthcare with our expert doctors available 24/7. Join thousands of satisfied patients today!</div>
            </div>
            <div class="cta-footer__button">
              <router-link to="/patient-signup" class="btn btn--primary btn--large pulse-animation">
                <i class="fas fa-rocket"></i>
                Start Your Journey
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div> <!-- Close layout-content -->
  </div> <!-- Close layout-container -->
  <AppFooter />
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';

export default {
  name: 'DoctorHome',
  components: { AppHeader, AppFooter },
  props: {
    msg: String
  },
  data() {
    return {
      heroPhrases: [
        '24/7',
        'Instant Care',
        'Expert Advice',
        'Video Consults',
        'From Anywhere',
        'No Waiting Rooms'
      ],
      currentHeroPhrase: '24/7',
      heroPhraseIndex: 0,
      heroPhraseInterval: null,
      subtitlePhrases: [
        'Caring, expert medical advice whenever you need it, from the comfort of your home.',
        'Connect instantly with trusted doctors for any health concern.',
        'Private video consultations, quick e-prescriptions, and gentle guidance.',
        'Support for your well-being, day or night—no waiting rooms.',
        'For emergencies, call 101 or visit your nearest hospital. Your health matters!'
      ],
      currentSubtitle: 'Caring, expert medical advice whenever you need it, from the comfort of your home.',
      subtitleIndex: 0,
      subtitleInterval: null,
      showSmartDoctorSection: false,
      showTestimonials: false,
      showSuggestions: false,
      currentSpecialty: 'All',
      currentSuggestionCategory: 'top-rated',
      hasMoreDoctors: true,
      animatedStats: {
        doctors: 0,
        patients: 0,
        consultations: 0
      },
      finalStats: {
        doctors: 500,
        patients: 10000,
        consultations: 50000
      },
      suggestionCategories: [
        {
          id: 'top-rated',
          name: 'Top Rated',
          icon: 'fas fa-crown',
          count: 8
        },
        {
          id: 'available-now',
          name: 'Available Now',
          icon: 'fas fa-circle',
          count: 12
        },
        {
          id: 'specialists',
          name: 'Specialists',
          icon: 'fas fa-star',
          count: 15
        },
        {
          id: 'recommended',
          name: 'Recommended',
          icon: 'fas fa-thumbs-up',
          count: 6
        }
      ],
      availableSpecialties: [
        'All',
        'Family Medicine',
        'Cardiology',
        'Dermatology',
        'Pediatrics',
        'Neurology',
        'Orthopedics',
        'Psychiatry'
      ],
      allDoctors: [
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialty: 'Family Medicine',
          experience: 15,
          rating: 4.9,
          consultationFee: 49,
          isOnline: true,
          isTopRated: true,
          isSpecialist: false,
          totalPatients: 2500,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          specialty: 'Cardiology',
          experience: 20,
          rating: 4.8,
          consultationFee: 75,
          isOnline: true,
          isTopRated: true,
          isSpecialist: true,
          totalPatients: 3200,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          specialty: 'Dermatology',
          experience: 12,
          rating: 4.9,
          consultationFee: 65,
          isOnline: false,
          isTopRated: true,
          isSpecialist: true,
          totalPatients: 1800,
          nextAvailable: '2:00 PM',
          image: 'https://images.unsplash.com/photo-1594824804732-ca8db5ac6d34?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 4,
          name: 'Dr. David Kim',
          specialty: 'Pediatrics',
          experience: 18,
          rating: 4.7,
          consultationFee: 55,
          isOnline: true,
          isTopRated: false,
          isSpecialist: true,
          totalPatients: 2100,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 5,
          name: 'Dr. Lisa Thompson',
          specialty: 'Neurology',
          experience: 22,
          rating: 4.8,
          consultationFee: 85,
          isOnline: true,
          isTopRated: true,
          isSpecialist: true,
          totalPatients: 2800,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 6,
          name: 'Dr. Robert Wilson',
          specialty: 'Orthopedics',
          experience: 25,
          rating: 4.6,
          consultationFee: 80,
          isOnline: false,
          isTopRated: false,
          isSpecialist: true,
          totalPatients: 3500,
          nextAvailable: '4:30 PM',
          image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 7,
          name: 'Dr. Maria Garcia',
          specialty: 'Psychiatry',
          experience: 16,
          rating: 4.9,
          consultationFee: 70,
          isOnline: true,
          isTopRated: true,
          isSpecialist: true,
          totalPatients: 1900,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1594824804732-ca8db5ac6d34?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 8,
          name: 'Dr. James Lee',
          specialty: 'Family Medicine',
          experience: 14,
          rating: 4.7,
          consultationFee: 45,
          isOnline: true,
          isTopRated: false,
          isSpecialist: false,
          totalPatients: 2200,
          nextAvailable: 'Now',
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
        }
      ],
      specialties: [
        'Cardiology',
        'Dermatology',
        'Pediatrics',
        'Neurology',
        'Orthopedics',
        'Psychiatry'
      ],
      searchIssue: '',
      searchSpecialist: '',
      searchLocation: '',
      topRatedDoctors: [
        { 
          id: 1,
          name: 'Dr. Sarah Johnson', 
          specialty: 'Family Medicine', 
          rating: 4.9,
          consultationFee: 49,
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face'
        },
        { 
          id: 2,
          name: 'Dr. Michael Chen', 
          specialty: 'Cardiology', 
          rating: 4.8,
          consultationFee: 75,
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face'
        },
        { 
          id: 3,
          name: 'Dr. Emily Rodriguez', 
          specialty: 'Dermatology', 
          rating: 4.9,
          consultationFee: 65,
          image: 'https://images.unsplash.com/photo-1594824804732-ca8db5ac6d34?w=80&h=80&fit=crop&crop=face'
        },
        { 
          id: 4,
          name: 'Dr. James Wilson', 
          specialty: 'Pediatrics', 
          rating: 4.7,
          consultationFee: 55,
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face'
        }
      ]
    }
  },
  methods: {
    animateStats() {
      const duration = 2000;
      const stepTime = 50;
      const steps = duration / stepTime;
      
      Object.keys(this.finalStats).forEach(key => {
        const increment = this.finalStats[key] / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= this.finalStats[key]) {
            this.animatedStats[key] = this.finalStats[key];
            clearInterval(timer);
          } else {
            this.animatedStats[key] = Math.floor(current);
          }
        }, stepTime);
      });
    },
    showDoctorSuggestions() {
      this.showSmartDoctorSection = true;
      // Optionally scroll to the section
      setTimeout(() => {
        const element = document.querySelector('.smart-suggestions--main');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    },
    closeSuggestions() {
      this.showSuggestions = false;
    },
    selectDoctorForConsultation(doctor) {
      console.log('Selected doctor for consultation:', doctor);
      // Add logic to handle doctor selection for consultation
      alert(`Starting consultation with ${doctor.name}`);
    },
    bookConsultation(doctor) {
      console.log('Booking consultation with:', doctor);
      // Add logic to book consultation
      alert(`Booking consultation with ${doctor.name} - $${doctor.consultationFee}`);
    },
    showAllDoctors() {
      this.showTestimonials = true;
      this.showSuggestions = false;
      setTimeout(() => {
        const element = document.querySelector('.doctors-list');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    },
    emergencyContact() {
      alert('For immediate emergency, call 911 or visit your nearest emergency room!');
    },
    scrollToServices() {
      const element = document.querySelector('.icon-card-row');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    selectDoctor(doctor) {
      console.log('Selected doctor:', doctor);
      // Add logic to handle doctor selection
      // For example, navigate to booking page or open modal
    },
    loadMoreDoctors() {
      // Simulate loading more doctors
      console.log('Loading more doctors...');
      // In a real app, this would make an API call
      // For now, we'll just set hasMoreDoctors to false after first click
      this.hasMoreDoctors = false;
    },
    getListOfAllDoctors() {

    },
    getStarted() {
      // Logic for Get Started button
      // e.g., navigate to registration or doctor search
    },
    learnMore() {
      // Logic for Learn More button
      // e.g., show modal or navigate to info page
    },
    findSpecialist() {
      // Logic to suggest specialist based on searchIssue
      // e.g., call API or match keywords
    },
    searchDoctors() {
      // Logic to search doctors by name, condition, location
      // e.g., call API or filter list
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    }
  },
  mounted() {
    // Start stat animations when component mounts
    setTimeout(() => {
      this.animateStats();
    }, 500);
    // Start hero phrase swap animation
    this.heroPhraseInterval = setInterval(() => {
      this.heroPhraseIndex = (this.heroPhraseIndex + 1) % this.heroPhrases.length;
      this.currentHeroPhrase = this.heroPhrases[this.heroPhraseIndex];
    }, 2200);
    // Start subtitle swap animation
    this.subtitleInterval = setInterval(() => {
      this.subtitleIndex = (this.subtitleIndex + 1) % this.subtitlePhrases.length;
      this.currentSubtitle = this.subtitlePhrases[this.subtitleIndex];
    }, 3200);
  },
  beforeUnmount() {
    if (this.heroPhraseInterval) clearInterval(this.heroPhraseInterval);
    if (this.subtitleInterval) clearInterval(this.subtitleInterval);
  },
  emits: [],
  computed: {
    filteredDoctors() {
      if (this.currentSpecialty === 'All') {
        return this.allDoctors;
      }
      return this.allDoctors.filter(doctor => doctor.specialty === this.currentSpecialty);
    },
    currentSuggestions() {
      switch (this.currentSuggestionCategory) {
        case 'top-rated':
          return this.allDoctors.filter(doctor => doctor.isTopRated).slice(0, 6);
        case 'available-now':
          return this.allDoctors.filter(doctor => doctor.isOnline).slice(0, 6);
        case 'specialists':
          return this.allDoctors.filter(doctor => doctor.isSpecialist).slice(0, 6);
        case 'recommended':
          // Show a mix of top-rated and available doctors
          return this.allDoctors
            .filter(doctor => doctor.isTopRated || doctor.isOnline)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6);
        default:
          return this.allDoctors.slice(0, 6);
      }
    }
  }
}
</script>

<style scoped>
/* Stylish and dynamic back button for Smart Doctor Recommendations */
.stylish-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 0.7rem 1.6rem 0.7rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.18);
  cursor: pointer;
  transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
  outline: none;
  margin-right: 10px;
}
.stylish-back-btn:hover, .stylish-back-btn:focus {
  background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.28);
}
.back-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.13);
  border-radius: 50%;
  width: 2.1rem;
  height: 2.1rem;
  margin-right: 0.2rem;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.12);
  transition: background 0.2s;
}
.stylish-back-btn:hover .back-icon-wrapper {
  background: rgba(255,255,255,0.22);
}
.back-icon-wrapper i {
  font-size: 1.2rem;
  color: #fff;
  transition: color 0.2s;
}
.back-text {
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 1.08rem;
  transition: color 0.2s;
}
/* Import Font Awesome for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes floatingIcon {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(5deg);
  }
  75% {
    transform: translateY(10px) rotate(-5deg);
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Modern masthead styles */
.masthead {
  padding: 2rem 0rem 0rem;
  background: linear-gradient(135deg, #6d25b7 0%, #540c1f 100%);
  /* Fixed background color, no animation */
  background-size: cover;
  /* animation: slideDownFadeIn 1.2s ease-out; */
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.masthead:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation-play-state: paused;
}

/* Dynamic Background Elements */
.dynamic-bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: floatingIcon 8s infinite ease-in-out;
}

.element-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  background: rgba(255, 107, 107, 0.2);
  animation-delay: 0s;
  animation-duration: 6s;
}

.element-2 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 15%;
  background: rgba(254, 202, 87, 0.2);
  animation-delay: 1s;
  animation-duration: 8s;
}

.element-3 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 20%;
  background: rgba(79, 172, 254, 0.2);
  animation-delay: 2s;
  animation-duration: 7s;
}

.element-4 {
  width: 100px;
  height: 100px;
  bottom: 10%;
  right: 10%;
  background: rgba(102, 126, 234, 0.2);
  animation-delay: 0.5s;
  animation-duration: 9s;
}

/* Particle effects */
.floating-element::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: pulse 3s infinite;
}

.floating-element:hover {
  transform: scale(1.2);
  background: rgba(255, 255, 255, 0.2);
}

.masthead::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.masthead__content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  /* gap: 4rem; */
  position: relative;
  z-index: 2;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.masthead__content:hover {
  transform: translateY(-5px);
}

.masthead__text {
  /* margin-top: -12rem; */
  flex: 1;
  animation: slideInLeft 1s ease-out;
  position: relative;
}

.masthead__text::before {
  content: '';
  position: absolute;
  top: 0;
  left: -20px;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #ff6b6b, #feca57);
  border-radius: 2px;
  opacity: 0;
  animation: slideInLeft 1.5s ease-out 0.5s both;
}

.animated-title.dynamic-hero-title {
  font-size: 3.2rem;
  margin-bottom: 2rem;
  color: #fff;
  line-height: 1.2;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  white-space: normal;
  word-break: break-word;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

.animated-title .highlight {
  display: block;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #fff;
}

.swap-phrase {
  display: inline-block;
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
  margin-left: 0.5rem;
  min-width: 120px;
  transition: color 0.3s;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

@media (max-width: 900px) {
  .animated-title.dynamic-hero-title {
    font-size: 2.1rem;
  }
  .swap-phrase {
    font-size: 1.3rem;
    min-width: 80px;
  }
}

@media (max-width: 600px) {
  .animated-title.dynamic-hero-title {
    font-size: 1.3rem;
    max-width: 95vw;
  }
  .swap-phrase {
    font-size: 1rem;
    min-width: 60px;
  }
}

/* Swap animation */
.swap-fade-enter-active, .swap-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.swap-fade-enter-from, .swap-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.swap-fade-enter-to, .swap-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.masthead-subtitle.stylish-paragraph {
  position: relative;
  background: rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 1.1rem 2rem 1.1rem 1.5rem;
  margin-bottom: 1.7rem;
  box-shadow: 0 4px 24px 0 rgba(102,126,234,0.10);
  overflow: hidden;
  min-height: 3.2em;
  display: flex;
  align-items: center;
  border-left: 5px solid #feca57;
  animation: fadeInUp 1s;
}
.subtitle-main {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-right: 1.1rem;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.13);
}
.subtitle-highlight {
  background: linear-gradient(45deg, #feca57, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: 1px;
}
.subtitle-animated {
  display: inline-block;
  min-width: 180px;
  margin-left: 0.5rem;
  vertical-align: middle;
}
.subtitle-swap {
  color: #fff;
  font-size: 1.08rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.10);
  animation: fadeInUp 0.7s;
}
@media (max-width: 900px) {
  .masthead-subtitle.stylish-paragraph {
    font-size: 1rem;
    padding: 0.8rem 1.1rem 0.8rem 1rem;
  }
  .subtitle-main {
    font-size: 1.05rem;
  }
  .subtitle-animated {
    min-width: 100px;
  }
}
@media (max-width: 600px) {
  .masthead-subtitle.stylish-paragraph {
    font-size: 0.95rem;
    padding: 0.7rem 0.7rem 0.7rem 0.7rem;
    min-height: 2.2em;
  }
  .subtitle-main {
    font-size: 0.95rem;
  }
  .subtitle-animated {
    min-width: 60px;
  }
}

.fade-in-text {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.7;
  animation: fadeInUp 1s ease-out 0.5s both;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: fadeInUp 1s ease-out 0.8s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn--primary {
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.6);
}

.btn--secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn--secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.btn--outline {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn--outline:hover {
  background: #667eea;
  color: white;
}

.btn--large {
  font-size: 1.2rem;
  padding: 1.2rem 2.5rem;
}

.btn--small {
  font-size: 0.9rem;
  padding: 0.8rem 1.5rem;
}

.btn--compact {
  font-size: 0.85rem;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  margin-top: 0.5rem;
  min-width: auto;
  flex-shrink: 0;
}

.pulse-animation {
  animation: pulse 2s infinite;
}

.stats-row {
  display: flex;
  gap: 3rem;
  animation: fadeInUp 1s ease-out 1.2s both;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #feca57;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.masthead__image {
  flex: 1;
  animation: slideInRight 1s ease-out 0.3s both;
}

/* Realistic Hero Visual Container */
.hero-visual-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

/* Top Doctors Showcase */
.top-doctors-showcase {
  background: white;
  border-radius: 25px;
  padding: 2rem 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.1);
  /* animation: float 6s ease-in-out infinite; */
  position: relative;
  overflow: hidden;
}

.top-doctors-showcase::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 25px 25px 0 0;
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.showcase-header h3 {
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
}

.live-badge {
  background: linear-gradient(45deg, #00d4aa, #4facfe);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 212, 170, 0.3);
}

.live-badge i {
  animation: pulse 2s infinite;
  font-size: 0.6rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.doctors-carousel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.doctor-mini-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  transition: all 0.3s ease;
  animation: slideInRight 0.6s ease-out both;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.doctor-mini-card:hover {
  transform: translateX(5px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.doctor-mini-avatar {
  position: relative;
  flex-shrink: 0;
}

.doctor-mini-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.rating-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(45deg, #feca57, #ff9ff3);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  box-shadow: 0 2px 10px rgba(254, 202, 87, 0.4);
}

.doctor-mini-info {
  flex: 1;
  min-width: 0;
}

.doctor-mini-info h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: inherit;
}

.doctor-mini-info p {
  font-size: 0.8rem;
  margin: 0 0 0.5rem 0;
  opacity: 0.8;
  color: inherit;
}

.consultation-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.consultation-info .price {
  font-weight: 700;
  font-size: 1rem;
  color: #667eea;
}

.doctor-mini-card:hover .consultation-info .price {
  color: white;
}

.quick-book-btn {
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.quick-book-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.5);
}

.showcase-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-mini {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.stat-icon {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-text {
  display: flex;
  flex-direction: column;
}

.stat-text .number {
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
  line-height: 1.2;
}

.stat-text .label {
  font-size: 0.75rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trust-indicators {
  position: absolute;
  top: -15px;
  right: -20px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 10;
}

.trust-badge {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  box-shadow: 0 6px 15px rgba(255, 107, 107, 0.3);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  animation: fadeInUp 1s ease-out both;
}

.floating-badge-1 {
  animation-delay: 0.5s;
  background: linear-gradient(45deg, #00d4aa, #4facfe);
}

.floating-badge-2 {
  animation-delay: 1s;
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.floating-badge-3 {
  animation-delay: 1.5s;
  background: linear-gradient(45deg, #feca57, #ff9ff3);
}

.doctor-consultation-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  animation: float 6s ease-in-out infinite;
}

.consultation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.doctor-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.doctor-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #00d4aa;
  object-fit: cover;
}

.doctor-details h4 {
  color: #2c3e50;
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.specialty {
  color: #667eea;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-live {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00d4aa;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

.live-indicator {
  width: 8px;
  height: 8px;
  background: #00d4aa;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.consultation-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.8rem;
}

.video-consultation-demo {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.consultation-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
  background: white;
}

.consultation-info {
  text-align: center;
}

.consultation-type {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.consultation-duration {
  font-size: 0.8rem;
  opacity: 0.9;
}

.consultation-features {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-size: 0.75rem;
  font-weight: 600;
}

.feature-item i {
  font-size: 1.2rem;
  color: #00d4aa;
}

.trust-indicators {
  position: absolute;
  top: -20px;
  right: -30px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trust-badge {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
  animation: fadeInUp 1s ease-out both;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.trust-badge i {
  font-size: 0.9rem;
}

/* Section titles */
.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 2px;
}

/* Smart Doctor Suggestions */
.smart-suggestions {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.suggestions-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.suggestions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  flex: 1;
}

.suggestions-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.suggestions-title i {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
}

.suggestions-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.suggestion-categories {
  margin-bottom: 3rem;
}

.category-tabs {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.category-tab {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  backdrop-filter: blur(10px);
  font-size: 1rem;
}

.category-tab:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.category-tab.active {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border-color: transparent;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.category-tab .count {
  background: rgba(255, 255, 255, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 700;
}

.category-tab.active .count {
  background: rgba(255, 255, 255, 0.4);
}

.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.suggestion-card {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  color: #2c3e50;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.suggestion-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.suggestion-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.suggestion-badge {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.top-rated {
  background: linear-gradient(45deg, #feca57, #ff9ff3);
  color: white;
}

.badge.available {
  background: linear-gradient(45deg, #00d4aa, #4facfe);
  color: white;
}

.badge.specialist {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.doctor-suggestion-info {
  display: flex;
  gap: 1.5rem;
}

.doctor-avatar-large {
  position: relative;
  flex-shrink: 0;
}

.doctor-avatar-large img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f8f9fa;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.availability-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #dc3545;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.availability-indicator.online {
  background: #00d4aa;
  animation: pulse 2s infinite;
}

.doctor-details-extended {
  flex: 1;
  min-width: 0;
}

.doctor-details-extended h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.specialty-detail {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.experience-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 15px;
}

.experience {
  color: #6c757d;
  font-weight: 600;
  font-size: 0.9rem;
}

.rating-stars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating-stars i {
  color: #ddd;
  font-size: 0.9rem;
}

.rating-stars i.filled {
  color: #feca57;
}

.rating-number {
  margin-left: 0.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.consultation-options-extended {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.option {
  flex: 1;
  padding: 0.75rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.option:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.option i {
  color: #667eea;
  font-size: 1.1rem;
}

.option span:first-of-type {
  flex: 1;
  font-weight: 600;
  color: #2c3e50;
}

.option .price {
  font-weight: 700;
  color: #667eea;
}

.quick-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.85rem;
  font-weight: 500;
}

.stat i {
  color: #667eea;
}

.book-now-btn {
  width: 100%;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.book-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
}

.suggestions-footer {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.btn--emergency {
  background: linear-gradient(45deg, #dc3545, #e74c3c);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
}

.btn--emergency:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.5);
}

/* Enhanced doctor list section */
.doctors-list {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.doctors-filter {
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  background: white;
  border: 2px solid #e9ecef;
  color: #6c757d;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-tab:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.filter-tab.active {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-color: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.doctors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.doctor-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 126, 234, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.doctor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.doctor-card:hover::before {
  transform: scaleX(1);
}

.doctor-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-indicator.online {
  background: #00d4aa;
}

.status-indicator.offline {
  background: #dc3545;
  animation: none;
}

.status-text {
  color: #6c757d;
}

.doctor-card:hover .status-text {
  color: #667eea;
}

.doctor-avatar-section {
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
}

.doctor-avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f8f9fa;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.doctor-card:hover .doctor-avatar-img {
  border-color: #667eea;
  transform: scale(1.05);
}

.doctor-rating {
  position: absolute;
  top: -5px;
  right: 20px;
  background: linear-gradient(45deg, #feca57, #ff9ff3);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 4px 15px rgba(254, 202, 87, 0.3);
}

.doctor-info-section {
  text-align: center;
}

.doctor-name {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.doctor-specialty {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.doctor-experience {
  color: #6c757d;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.consultation-price {
  background: rgba(102, 126, 234, 0.1);
  padding: 0.75rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-label {
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
}

.price-amount {
  color: #667eea;
  font-size: 1.1rem;
  font-weight: 700;
}

.quick-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.quick-actions .btn {
  flex: 1;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;
}

.load-more-section {
  text-align: center;
  margin-top: 3rem;
}

.load-more-section .btn {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.load-more-section .btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

/* Remove old testimonials styles and replace with new ones */

.section-subtitle {
  text-align: center;
  color: #6c757d;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  font-weight: 400;
}

/* Modern benefits section */
.benefits-showcase {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
}

.benefits-showcase::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23e0e0e0" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.1;
}

.benefits-horizontal {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 25px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
  gap: 1rem;
  border: 2px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(10px);
}

.benefits-horizontal::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #667eea, #764ba2, #ff6b6b, #feca57);
  border-radius: 27px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefits-horizontal:hover::before {
  opacity: 0.1;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  flex: 1;
  min-width: 250px;
  overflow: hidden;
}

.benefit-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.05), transparent);
  transition: left 0.6s ease;
}

.benefit-item:hover::before {
  left: 100%;
}

.benefit-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
  background: rgba(102, 126, 234, 0.02);
}

.benefit-icon-circle {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

.benefit-icon-circle::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: rotate(-45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.benefit-item:hover .benefit-icon-circle::before {
  opacity: 1;
  transform: rotate(-45deg) translate(50%, 50%);
}

.benefit-item:hover .benefit-icon-circle {
  transform: rotate(360deg) scale(1.1);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.benefit-content {
  flex: 1;
}

.benefit-content h4 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 0 0 0.3rem 0;
  font-weight: 700;
}

.benefit-content p {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
  font-weight: 500;
}

.benefit-separator {
  width: 2px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, #e9ecef, transparent);
  flex-shrink: 0;
  position: relative;
}

.benefit-separator::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(102, 126, 234, 0.3), transparent);
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefits-horizontal:hover .benefit-separator::before {
  opacity: 1;
}

/* Responsive design */
@media (max-width: 768px) {
  .masthead {
    padding: 4rem 1rem 3rem;
    margin-top: 10px;
  }
  
  .masthead__content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .masthead__content:hover {
    transform: none;
  }
  
  .floating-element {
    display: none;
  }
  
  .animated-title {
    font-size: 2.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-row {
    gap: 1.5rem;
  }
  
  .doctors-grid {
    grid-template-columns: 1fr;
  }
  
  .suggestions-grid {
    grid-template-columns: 1fr;
  }
  
  .suggestions-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .suggestions-title {
    font-size: 2rem;
    justify-content: center;
  }
  
  .category-tabs {
    gap: 0.5rem;
  }
  
  .category-tab {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .doctor-suggestion-info {
    flex-direction: column;
    text-align: center;
  }
  
  .consultation-options-extended {
    flex-direction: column;
  }
  
  .suggestions-footer {
    flex-direction: column;
    gap: 1rem;
  }
  
  .benefits-horizontal {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .benefit-separator {
    width: 80%;
    height: 2px;
    background: linear-gradient(to right, transparent, #e9ecef, transparent);
  }
  
  .benefit-item {
    min-width: auto;
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .animated-title {
    font-size: 2rem;
  }
  
  .fade-in-text {
    font-size: 1.1rem;
  }
  
  .floating-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}

/* CTA Footer enhancements */
.cta-footer {
  margin-top: 0;
}

.cta-footer__bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

.cta-footer__container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.cta-footer__text h2 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.cta-footer__text div {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-footer__button .btn {
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  color: white;
  border-radius: 50px;
  font-size: 1.2rem;
  padding: 1.2rem 2.5rem;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  transition: all 0.3s ease;
}

.cta-footer__button .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
}

/* Enhanced How it Works Section */
.how-it-works {
  padding: 6rem 2rem;
  background: white;
}

.process-timeline {
  max-width: 1000px;
  margin: 0 auto;
}

.timeline-step {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
  position: relative;
}

.timeline-step.reverse {
  flex-direction: row-reverse;
}

.timeline-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2rem;
  transform: translateX(-50%);
  width: 2px;
  height: 2rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.step-visual {
  flex: 1;
  position: relative;
  max-width: 350px;
}

.step-image {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  position: relative;
}

.step-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.timeline-step:hover .step-image img {
  transform: scale(1.05);
}

.step-number {
  position: absolute;
  top: -15px;
  right: -15px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
  z-index: 2;
}

.step-content {
  flex: 1;
  max-width: 400px;
}

.step-content h3 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.step-content p {
  color: #6c757d;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.step-features {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.step-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #495057;
  font-weight: 500;
}

.step-features i {
  color: #00d4aa;
  font-size: 0.9rem;
  background: rgba(0, 212, 170, 0.1);
  padding: 0.25rem;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-estimate {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-weight: 600;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  width: fit-content;
}

.time-estimate i {
  color: #667eea;
}

.cta-section {
  text-align: center;
  margin-top: 4rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 25px;
  color: white;
}

.cta-content h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

.guarantee i {
  color: #00d4aa;
}

/* Patient Reviews Section */
.patient-reviews {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.patient-reviews .section-title {
  color: white;
}

.patient-reviews .section-title::after {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.review-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.review-content .stars {
  color: #feca57;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.review-content p {
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info h4 {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.author-info span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* Enhanced CTA Footer */
.cta-footer__icon {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
  animation: pulse 2s infinite;
}

/* Enhanced responsive improvements */
@media (max-width: 768px) {
  .masthead {
    padding: 6rem 1rem 4rem;
  }
  
  .masthead__content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .animated-title {
    font-size: 2.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-row {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  .doctors-showcase {
    grid-template-columns: 1fr;
  }
  
  .doctors-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-tabs {
    gap: 0.5rem;
  }
  
  .filter-tab {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .benefits-horizontal {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .benefit-item {
    flex-direction: column;
    text-align: center;
    min-width: auto;
    gap: 0.8rem;
  }
  
  .benefit-separator {
    display: none;
  }
  
  .trust-indicators {
    position: static;
    flex-direction: row;
    justify-content: center;
    margin-top: 2rem;
    gap: 0.5rem;
  }
  
  .top-doctors-showcase {
    margin: 0 1rem;
    padding: 1.5rem 1rem;
  }
  
  .showcase-header h3 {
    font-size: 1.2rem;
  }
  
  .header-actions {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  
  .header-actions .btn--compact {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    width: 100%;
  }
  
  .showcase-stats {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .trust-badge {
    font-size: 0.65rem;
    padding: 0.3rem 0.6rem;
  }
  
  .timeline-step, .timeline-step.reverse {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .timeline-step:not(:last-child)::after {
    left: 50%;
    width: 2px;
    height: 2rem;
  }
  
  .consultation-options {
    flex-direction: column;
  }
  
  .hero-visual-container {
    order: 1;
  }
  
  .masthead__text {
    order: 2;
  }
  
  .cta-section {
    padding: 2rem 1rem;
  }
  
  .cta-content h3 {
    font-size: 1.5rem;
  }
  
  .steps-container {
    flex-direction: column;
  }
  
  .step-connector {
    display: none;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-footer__container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .animated-title {
    font-size: 2rem;
  }
  
  .fade-in-text {
    font-size: 1.1rem;
  }
  
  .trust-badge {
    padding: 0.4rem 0.8rem;
    font-size: 0.7rem;
  }
  
  .doctor-consultation-card {
    padding: 1rem;
  }
  
  .consultation-features {
    gap: 0.5rem;
  }
  
  .feature-item {
    font-size: 0.7rem;
  }
  
  .step-content h3 {
    font-size: 1.4rem;
  }
  
  .step-content p {
    font-size: 1rem;
  }
  
  .doctor-profile-card {
    padding: 1.5rem;
  }
  
  .trust-indicators {
    flex-direction: column;
    align-items: center;
  }
  
  .top-doctors-showcase {
    margin: 0 0.5rem;
    padding: 1rem;
  }
  
  .showcase-header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .doctor-mini-card {
    padding: 0.5rem;
  }
  
  .doctor-mini-info h4 {
    font-size: 0.9rem;
  }
  
  .doctor-mini-info p {
    font-size: 0.75rem;
  }
  
  .stat-mini {
    padding: 0.75rem;
  }
  
  .stat-text .number {
    font-size: 1rem;
  }
}

/* Layout fixes */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-content {
  flex: 1;
}

.main-content {
  padding-top: 0;
  margin-top: 40px;
}
</style>
