<template>
  <div class="contact-root">
    <AppHeader @login="goToLogin" />
    <div class="contact-content">
      <div class="tab-container">
        <h1 class="contact-title">
          <i class="fi fi-rr-syringe"></i>
          We're Here to Help
        </h1>
        <p class="contact-subtitle">Choose the most convenient way to reach our support team</p>
        
        <!-- Tabs Navigation -->
        <div class="tabs">
          <button 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="['tab-button', { 'active': activeTab === index }]"
            @click="activeTab = index"
          >
            <span class="tab-icon" v-html="tab.icon"></span>
            {{ tab.name }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Contact Form Tab -->
          <div v-if="activeTab === 0" class="tab-pane contact-pane">
            <div class="contact-methods">
              <div class="contact-card doctor-card">
                <div class="contact-card-header">
                  <div class="icon-circle" style="background-color: #e3f2fd; color: #1976d2;">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5z"/>
                      <path d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3.5 10.5h-7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h7c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                    </svg> -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72zM380 384.8C374.6 384.3 369 384 363.4 384L276.5 384C270.9 384 265.4 384.3 259.9 384.8L259.9 452.3C276.4 459.9 287.9 476.6 287.9 495.9C287.9 522.4 266.4 543.9 239.9 543.9C213.4 543.9 191.9 522.4 191.9 495.9C191.9 476.5 203.4 459.8 219.9 452.3L219.9 393.9C157 417 112 477.6 112 548.6C112 563.7 124.3 576 139.4 576L500.5 576C515.6 576 527.9 563.7 527.9 548.6C527.9 477.6 482.9 417.1 419.9 394L419.9 431.4C443.2 439.6 459.9 461.9 459.9 488L459.9 520C459.9 531 450.9 540 439.9 540C428.9 540 419.9 531 419.9 520L419.9 488C419.9 477 410.9 468 399.9 468C388.9 468 379.9 477 379.9 488L379.9 520C379.9 531 370.9 540 359.9 540C348.9 540 339.9 531 339.9 520L339.9 488C339.9 461.9 356.6 439.7 379.9 431.4L379.9 384.8z"/></svg>
                    <div class="icon-badge" style="background-color: #4caf50; color: white;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="header-text">
                    <h3>For Doctors</h3>
                    <p class="header-subtitle">Professional Support</p>
                  </div>
                </div>
                <ul>
                  <li class="contact-item email-item">
                    <div class="icon-wrapper email" style="color: #2c5282; display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <a href="mailto:doctors@doctorbuddy.com" class="contact-link">
                      <span>doctors@doctorbuddy.com</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 8px;">
                        <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                      </svg>
                    </a>
                  </li>
                  <li class="contact-item phone-item">
                    <div class="icon-wrapper phone" style="color: #2c5282; display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <a href="tel:+919876543210" class="contact-link">
                      <span>+91 98765 43210</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 8px;">
                        <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                      </svg>
                    </a>
                  </li>
                  <li class="whatsapp-item">
                    <div class="icon-wrapper whatsapp" style="color: #25D366; display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.498 14.382l-1.106-1.613c-.322-.46-.214-1.075.244-1.388.459-.312 1.074-.213 1.387.245l1.388 2.022c.32.467.21 1.1-.25 1.413-3.23 2.26-7.5 1.99-10.19-1.38-2.7-3.38-3.12-8.15-1.05-11.8.3-.53.9-.85 1.53-.85.53 0 1.05.22 1.42.62l1.5 1.68c.38.42.5 1.02.3 1.57l-.7 1.8c-.2.52.04 1.1.53 1.4 1.6.9 3.6 2.2 4.9 3.3.5.4 1.2.5 1.7.1.9-.6 1.9-1.6 2.5-2.4z"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                    </div>
                    <a href="https://wa.me/919876543210" target="_blank" class="whatsapp-link">
                      <span>Chat on WhatsApp</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 8px;">
                        <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                      </svg>
                    </a>
                  </li>
                  <li class="contact-item time-item">
                    <div class="icon-wrapper time" style="color: #2c5282; display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                    </div>
                    <span class="time-text">Mon-Fri, 9am-7pm IST</span>
                  </li>
                </ul>
                <button class="btn-secondary" @click="startChat('doctor')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <path d="M8 10h.01"></path>
                    <path d="M12 10h.01"></path>
                    <path d="M16 10h.01"></path>
                  </svg>
                  Live Chat with Support
                </button>
              </div>

              <div class="contact-card patient-card">
                <div class="contact-card-header">
                  <div class="icon-circle" style="background-color: #fce4ec; color: #c2185b;">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M531.2 41.6L572 96L616 96C629.3 96 640 106.7 640 120C640 133.3 629.3 144 616 144L560 144C552.4 144 545.3 140.4 540.8 134.4L516.7 102.3L469.7 202.2C466 210 458.4 215.3 449.8 215.9C441.2 216.5 432.9 212.5 428.1 205.3L387.2 144L344 144C330.7 144 320 133.3 320 120C320 106.7 330.7 96 344 96L400 96C408 96 415.5 100 420 106.7L444.4 143.3L490.3 45.8C493.9 38.2 501.2 33 509.6 32.1C518 31.2 526.2 34.8 531.2 41.6zM320 224C320 206.3 334.3 192 352 192L361.5 192L388.1 231.9C402.5 253.5 427.4 265.7 453.3 263.8C479.2 261.9 502.1 246.2 513.1 222.7L527 193.2C572.9 200.4 608 240.1 608 288L608 512C608 529.7 593.7 544 576 544C558.3 544 544 529.7 544 512L544 448L96 448L96 512C96 529.7 81.7 544 64 544C46.3 544 32 529.7 32 512L32 128C32 110.3 46.3 96 64 96C81.7 96 96 110.3 96 128L96 352L320 352L320 224zM144 256C144 220.7 172.7 192 208 192C243.3 192 272 220.7 272 256C272 291.3 243.3 320 208 320C172.7 320 144 291.3 144 256z"/></svg>
                    <div class="icon-badge" style="background-color: #f44336; color: white;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M11 7h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="header-text">
                    <h3>For Patients</h3>
                    <p class="header-subtitle">24/7 Care Available</p>
                  </div>
                </div>
                <ul>
                  <li class="contact-item email-item">
                    <div class="icon-wrapper email" style="color: #2c5282; display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <a href="mailto:patients@doctorbuddy.com" class="contact-link">
                      <span>patients@doctorbuddy.com</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 8px;">
                        <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                      </svg>
                    </a>
                  </li>
                  <li class="contact-item phone-item">
                    <div class="icon-wrapper emergency" style="color: #e53e3e; display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17c0 1.38 1.12 2.5 2.5 2.5h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
                      </svg>
                    </div>
                    <a href="tel:+919123456789" class="contact-link">
                      <span>+91 91234 56789</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 8px;">
                        <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                      </svg>
                    </a>
                    <span class="badge">24/7 Emergency</span>
                  </li>
                  <li class="whatsapp-item">
                    <div class="icon-wrapper whatsapp" style="color: #25D366; display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.498 14.382l-1.106-1.613c-.322-.46-.214-1.075.244-1.388.459-.312 1.074-.213 1.387.245l1.388 2.022c.32.467.21 1.1-.25 1.413-3.23 2.26-7.5 1.99-10.19-1.38-2.7-3.38-3.12-8.15-1.05-11.8.3-.53.9-.85 1.53-.85.53 0 1.05.22 1.42.62l1.5 1.68c.38.42.5 1.02.3 1.57l-.7 1.8c-.2.52.04 1.1.53 1.4 1.6.9 3.6 2.2 4.9 3.3.5.4 1.2.5 1.7.1.9-.6 1.9-1.6 2.5-2.4z"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                    </div>
                    <a href="https://wa.me/919123456789" target="_blank" class="whatsapp-link">
                      <span>Chat on WhatsApp</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 8px;">
                        <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                      </svg>
                    </a>
                  </li>
                  <li class="contact-item emergency-item">
                    <div class="icon-wrapper emergency" style="color: #e53e3e; display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                    </div>
                    <span class="emergency-text">24/7 Emergency Support</span>
                  </li>
                </ul>
                <button class="btn-primary" @click="startChat('patient')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    <path d="M14.05 2a9 9 0 0 1 8 7.94"></path>
                    <path d="M14.05 6a5 5 0 0 1 4 3.94"></path>
                  </svg>
                  Start Emergency Chat
                </button>
              </div>
            </div>

            <div class="contact-form-section">
              <h3 style="display: flex; align-items: center; gap: 8px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2c5282">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                Send Us a Message
              </h3>
              <form class="contact-form" @submit.prevent="submitContactForm">
                <div class="form-group">
                  <label>I am a...</label>
                  <div class="role-selector">
                    <button 
                      type="button"
                      :class="['role-btn', { 'active': contactForm.role === 'Doctor' }]"
                      @click="contactForm.role = 'Doctor'"
                      style="display: flex; align-items: center; gap: 8px;"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="1"/>
                        <path d="M12 17v4"/>
                        <path d="M8 21h8"/>
                      </svg>
                      Doctor
                    </button>
                    <button 
                      type="button"
                      :class="['role-btn', { 'active': contactForm.role === 'Patient' }]"
                      @click="contactForm.role = 'Patient'"
                      style="display: flex; align-items: center; gap: 8px;"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      Patient
                    </button>
                  </div>
                </div>

                <div class="form-group">
                  <input 
                    v-model="contactForm.name" 
                    type="text" 
                    placeholder="Your Full Name" 
                    required 
                    class="form-control"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <input 
                      v-model="contactForm.email" 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <input 
                      v-model="contactForm.phone" 
                      type="tel" 
                      placeholder="Phone Number" 
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <select v-model="contactForm.subject" required class="form-control">
                    <option value="" disabled>What can we help you with?</option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <textarea 
                    v-model="contactForm.message" 
                    placeholder="Please describe your issue in detail..." 
                    rows="4" 
                    required
                    class="form-control"
                  ></textarea>
                </div>

                <div class="form-actions">
                  <button type="submit" class="btn-submit" :disabled="isSubmitting">
                    <span v-if="!isSubmitting" style="display: flex; align-items: center; gap: 8px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                      Send Message
                    </span>
                    <span v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="animation: spin 1s linear infinite; margin-right: 8px;">
                      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                    </svg> Sending...
                    </span>
                  </button>
                  <div v-if="formSubmitted" class="form-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#4caf50" style="margin-right: 8px;">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg> Thank you! We've received your message and will respond within 24 hours.
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- FAQ Tab -->
          <div v-else-if="activeTab === 1" class="tab-pane faqs-pane">
            <div class="faq-section">
              <h3>Frequently Asked Questions</h3>
              <div class="faq-list">
                <div 
                  v-for="(faq, index) in faqs" 
                  :key="index"
                  class="faq-item"
                  :class="{ 'active': activeFaq === index }"
                >
                  <div class="faq-question" @click="toggleFaq(index)">
                    {{ faq.question }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path v-if="activeFaq === index" d="M19 13H5v-2h14v2z"/>
                      <path v-else d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </div>
                  <div v-if="activeFaq === index" class="faq-answer">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Live Chat Tab -->
          <div v-else class="tab-pane chat-pane">
            <div class="chat-container">
              <div class="chat-header">
                <div class="agent-status">
                  <span class="status-dot online"></span>
                  <span>Support Team</span>
                  <span class="status-text">Online</span>
                </div>
              </div>
              
              <div class="chat-messages" ref="chatMessages">
                <div v-for="(msg, index) in chatMessages" :key="index" :class="['message', msg.sender]">
                  <div class="message-avatar">
                    <svg v-if="msg.sender === 'agent'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headset"><path d="M4 17v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="17" width="4" height="4" rx="2"/><rect x="18" y="17" width="4" height="4" rx="2"/><path d="M8 21v-4M16 21v-4"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div class="message-content">
                    <div class="message-text">{{ msg.text }}</div>
                    <div class="message-time">{{ msg.time }}</div>
                  </div>
                </div>
              </div>
              
              <div class="chat-input">
                <input 
                  v-model="chatMessage" 
                  @keyup.enter="sendChatMessage"
                  type="text" 
                  placeholder="Type your message here..." 
                  class="chat-message-input"
                />
                <button @click="sendChatMessage" class="chat-send-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';

export default {
  name: 'ContactPage',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      activeTab: 0,
      activeFaq: null,
      isSubmitting: false,
      chatMessage: '',
      chatMessages: [
        { text: 'Hello! How can we help you today?', sender: 'agent', time: 'Just now' }
      ],
      tabs: [
        { 
          name: 'Contact Us', 
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>` 
        },
        { 
          name: 'FAQs', 
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
          </svg>` 
        },
        { 
          name: 'Live Chat', 
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
            <path d="M7 9h10v2H7zm0 4h7v2H7z"/>
          </svg>`
        }
      ],
      contactForm: {
        name: '',
        role: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      formSubmitted: false,
      faqs: [
        {
          question: 'How do I book an appointment?',
          answer: 'You can book an appointment by logging into your account, selecting your preferred doctor, and choosing an available time slot.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI, net banking, and popular digital wallets like Paytm and Google Pay.'
        },
        {
          question: 'How do I reschedule my appointment?',
          answer: 'You can reschedule your appointment by going to the My Appointments section and selecting the reschedule option next to your upcoming appointment.'
        },
        {
          question: 'Is my medical information secure?',
          answer: 'Yes, we use bank-level encryption and follow strict data protection protocols to ensure your medical information remains private and secure.'
        },
        {
          question: 'How do I contact emergency support?',
          answer: 'For medical emergencies, please call our 24/7 emergency helpline at +91 91234 56789 or use the emergency chat option.'
        }
      ]
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    },
    startChat(role) {
      this.activeTab = 2; // Switch to chat tab
      this.contactForm.role = role === 'doctor' ? 'Doctor' : 'Patient';
      this.$nextTick(() => {
        this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
      });
    },
    sendChatMessage() {
      if (!this.chatMessage.trim()) return;
      
      // Add user message
      this.chatMessages.push({
        text: this.chatMessage,
        sender: 'user',
        time: 'Just now'
      });
      
      const userMessage = this.chatMessage;
      this.chatMessage = '';
      
      // Simulate agent response
      setTimeout(() => {
        let response = "I'll help you with that. Could you please provide more details?";
        
        if (userMessage.toLowerCase().includes('emergency')) {
          response = "We've received your emergency request. A medical professional will contact you immediately. Please stay on the line.";
        } else if (userMessage.toLowerCase().includes('appointment')) {
          response = "To book an appointment, please visit our 'Book Appointment' page or would you like me to guide you through the process?";
        } else if (userMessage.toLowerCase().includes('prescription') || userMessage.toLowerCase().includes('medicine')) {
          response = "For prescription refills, please contact your doctor directly through the 'My Doctors' section of your account.";
        }
        
        this.chatMessages.push({
          text: response,
          sender: 'agent',
          time: 'Just now'
        });
        
        this.$nextTick(() => {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
        });
      }, 1000);
      
      this.$nextTick(() => {
        this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
      });
    },
    async submitContactForm() {
      if (this.isSubmitting) return;
      
      try {
        this.isSubmitting = true;
        
        // Here you would typically make an API call to submit the form
        // For demonstration, we'll simulate an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.formSubmitted = true;
        this.contactForm = { 
          name: '', 
          role: '', 
          email: '', 
          phone: '', 
          subject: '',
          message: '' 
        };
        
        // Reset form after 5 seconds
        setTimeout(() => {
          this.formSubmitted = false;
        }, 5000);
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your message. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

:root {
  --primary: #4361ee;
  --primary-light: #4cc9f0;
  --primary-dark: #3a0ca3;
  --secondary: #7209b7;
  --accent: #f72585;
  --success: #4cc9f0;
  --error: #f44336;
  --warning: #ff9e00;
  --text: #2b2d42;
  --text-light: #8d99ae;
  --border: #e2e8f0;
  --background: #f8fafc;
  --white: #ffffff;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --gradient-primary: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  --gradient-accent: linear-gradient(135deg, #f72585 0%, #b5179e 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.contact-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%);
  position: relative;
  overflow-x: hidden;
}

.contact-root::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 10% 20%, rgba(67, 97, 238, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(114, 9, 183, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, transparent 50%);
  z-index: 0;
}

.contact-content {
  flex: 1 0 auto;
  padding: 3rem 1rem;
  position: relative;
  z-index: 1;
}

.tab-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.tab-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--gradient-primary);
  box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
}

.contact-title {
  text-align: center;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
  font-weight: 700;
}

.contact-subtitle {
  text-align: center;
  color: var(--text-light);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

/* Contact Cards */
.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  z-index: 1;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.7);
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 8px 8px 25px rgba(0, 0, 0, 0.1), 
              -8px -8px 25px rgba(255, 255, 255, 0.8);
}

.contact-card:hover::before {
  height: 6px;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.contact-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.fas, .far, .fab {
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Icon Circle */
.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.icon-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: var(--primary);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.icon-badge.emergency {
  background: #ff4757;
  animation: pulse 1.5s infinite;
}

.header-text {
  margin-left: 1rem;
}

.header-subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
}

.contact-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.contact-card-header:hover .icon-circle {
  transform: rotate(5deg) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.icon-wrapper.whatsapp {
  background: rgba(37, 211, 102, 0.15);
  color: #25D366;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.icon-wrapper.whatsapp::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.3) 0%, rgba(37, 211, 102, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.whatsapp-item:hover .icon-wrapper.whatsapp {
  transform: scale(1.1);
  background: rgba(37, 211, 102, 0.25);
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
}

.whatsapp-item:hover .icon-wrapper.whatsapp::before {
  opacity: 1;
}

.whatsapp-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #075E54;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.whatsapp-item:hover .whatsapp-link {
  color: #128C7E;
  transform: translateX(3px);
}

.whatsapp-link i {
  font-size: 0.8em;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.whatsapp-item:hover .whatsapp-link i {
  opacity: 1;
  transform: translateX(2px);
}

/* Icon Wrapper Base */
.icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* Email Icon */
.icon-wrapper.email {
  background: rgba(66, 133, 244, 0.1);
  color: #EA4335;
}

/* Phone Icon */
.icon-wrapper.phone {
  background: rgba(52, 168, 83, 0.1);
  color: #34A853;
}

/* Time Icon */
.icon-wrapper.time {
  background: rgba(249, 171, 0, 0.1);
  color: #FBBC05;
}

/* Emergency Icon */
.icon-wrapper.emergency {
  background: rgba(234, 67, 53, 0.1);
  color: #EA4335;
  animation: pulse 2s infinite;
}

/* WhatsApp Icon */
.icon-wrapper.whatsapp {
  background: rgba(37, 211, 102, 0.1);
  color: #25D366;
}

/* Chat Interface Styles */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-header {
  padding: 16px;
  background: linear-gradient(135deg, #4a6cf7 0%, #2541b2 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 500;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #4ade80;
}

.status-dot.online {
  background-color: #4ade80;
  box-shadow: 0 0 8px #4ade80;
}

.status-text {
  font-size: 13px;
  opacity: 0.9;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  max-width: 80%;
  gap: 12px;
}

.message.agent {
  align-self: flex-start;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a6cf7 0%, #2541b2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message.user .message-avatar {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: calc(100% - 48px);
}

.message-text {
  padding: 10px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
}

.agent .message-text {
  background: white;
  border-top-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user .message-text {
  background: #4a6cf7;
  color: white;
  border-top-right-radius: 4px;
}

.message-time {
  font-size: 11px;
  color: #6b7280;
  padding: 0 4px;
}

.user .message-time {
  text-align: right;
}

.chat-input {
  display: flex;
  padding: 16px;
  background: white;
  border-top: 1px solid #e5e7eb;
  gap: 8px;
}

.chat-message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.chat-message-input:focus {
  border-color: #4a6cf7;
  box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
}

.chat-send-btn {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a6cf7 0%, #2541b2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.chat-send-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 108, 247, 0.3);
}

/* Scrollbar styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Distinct backgrounds for each tab and card */

/* Vibrant, glassy, and colorful backgrounds for each tab */
.contact-pane {
  background: linear-gradient(135deg, #030a14 0%, #072c11 100%);
  border-radius: 22px;
  padding: 2rem 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(168, 237, 234, 0.25);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255,255,255,0.25);
}

.chat-pane {
  background: linear-gradient(135deg, #030a14 0%, #072c11 100%);
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(195, 207, 226, 0.18);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255,255,255,0.25);
}

/* Hover Effects */
.contact-item:hover .icon-wrapper {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contact-item:hover .icon-wrapper::before {
  opacity: 1;
}

/* Contact Links */
.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.contact-item:hover .contact-link {
  color: var(--primary);
  transform: translateX(3px);
}

.contact-link i {
  font-size: 0.8em;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.contact-item:hover .contact-link i {
  opacity: 1;
  transform: translateX(2px);
}

/* Time and Emergency Text */
.time-text, .emergency-text {
  color: var(--text);
  transition: all 0.3s ease;
  font-weight: 500;
}

.contact-item:hover .time-text,
.contact-item:hover .emergency-text {
  color: var(--primary);
  transform: translateX(3px);
}

/* Pulse Animation for Emergency */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.contact-card li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-card li:last-child {
  border-bottom: none;
}

.contact-card a {
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.contact-card a:hover {
  text-decoration: underline;
  opacity: 0.9;
}

.badge {
  display: inline-block;
  background: rgba(255, 59, 48, 0.2);
  color: #FF3B30;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  animation: pulse 2s infinite;
}

.contact-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-card-header h3 {
  margin: 0;
  color: white;
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
}

.contact-card-header h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.contact-card-header:hover h3::after {
  width: 100%;
}

.contact-card:hover .contact-card-header i {
  transform: translateY(-3px) scale(1.05);
  background: linear-gradient(135deg, rgba(67, 97, 238, 0.15) 0%, rgba(67, 97, 238, 0.1) 100%);
  box-shadow: 0 10px 15px -3px rgba(67, 97, 238, 0.15), 0 4px 6px -2px rgba(67, 97, 238, 0.1);
}

.contact-card ul i {
  color: var(--primary);
  width: 24px;
  height: 24px;
  text-align: center;
  font-size: 1.1rem;
  opacity: 0.9;
  background: rgba(67, 97, 238, 0.08);
  border-radius: 6px;
  padding: 4px;
  transition: all 0.3s ease;
}

.contact-card ul li:hover i {
  transform: scale(1.1);
  background: rgba(67, 97, 238, 0.15);
}

.contact-card h3 {
  color: var(--text);
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
}

.contact-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-card li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text);
  font-size: 0.95rem;
}

.contact-card i {
  color: var(--primary);
  width: 20px;
  text-align: center;
}

.contact-card a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s;
}

.contact-card a:hover {
  text-decoration: underline;
  color: var(--primary-light);
}
.nav-icon {
    margin-right: 0.5em;
    font-size: 1.15em;
    vertical-align: middle;
    color: #5C9EF0;
    transition: color 0.2s;
  }

/* Buttons */
.btn-primary, .btn-secondary, .btn-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.75rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 0.75rem;
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-primary {
  background: linear-gradient(90deg, #4361ee 0%, #4cc9f0 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
  border: 2px solid #4361ee;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--primary-dark);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #4cc9f0 0%, #4361ee 100%);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-secondary {
  background: linear-gradient(90deg, #f72585 0%, #b5179e 100%);
  color: #fff;
  border: 2px solid #b5179e;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(183, 23, 158, 0.15);
}

.btn-secondary:hover {
  background: linear-gradient(90deg, #b5179e 0%, #f72585 100%);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(183, 23, 158, 0.25);
  border-color: #f72585;
}

.btn-submit {
  background: linear-gradient(90deg, #121413 0%, #190a36 100%);
  color: #fff;
  padding: 1rem 2rem;
  font-weight: 600;
  margin-top: 1.25rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(67, 233, 123, 0.25);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-submit::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #43e97b;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(90deg, #383819 0%, #2e3808 100%);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(56, 249, 215, 0.35);
}

.btn-submit:hover::before {
  opacity: 0.15;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Button Icons */
.btn-primary i, 
.btn-secondary i, 
.btn-submit i {
  font-size: 1.1em;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Primary Button Icons */
.btn-primary i {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover i {
  transform: translateX(4px) scale(1.1);
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
}

/* Secondary Button Icons */
.btn-secondary i {
  color: var(--primary);
}

.btn-secondary:hover i {
  transform: translateX(4px) scale(1.1);
  color: var(--primary-dark);
}

/* Submit Button Icons */
.btn-submit i {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.btn-submit:hover:not(:disabled) i {
  transform: translateX(4px) scale(1.1);
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
}

/* Form Styles */
.contact-form-section {
  background: linear-gradient(145deg, #ffffff, #f8faff);
  border-radius: 16px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05), 
              -5px -5px 15px rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  margin-top: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.contact-form-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-primary);
}

.contact-form-section h3 {
  color: var(--text);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-form-section h3 i {
  color: var(--primary);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  margin-bottom: 1.75rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  color: var(--text);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.9rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.05);
  color: var(--text);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-light);
  opacity: 0.7;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
  outline: none;
  background: white;
}

/* Form Focus Effect */
.form-group:focus-within label {
  color: var(--primary);
  transform: translateX(3px);
}

/* Form Icons */
.form-group.with-icon {
  position: relative;
}

.form-group.with-icon i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(67, 97, 238, 0.05);
  border-radius: 6px;
  font-size: 0.95rem;
}

.form-group.with-icon input,
.form-group.with-icon textarea {
  padding-left: 50px;
}

.form-group:focus-within i {
  color: white;
  background: var(--gradient-primary);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 2px 8px rgba(67, 97, 238, 0.2);
}

/* Success Message Icon */
.form-success i {
  font-size: 1.3rem;
  margin-right: 0.75rem;
  color: var(--success);
  animation: bounce 2s infinite;
  background: rgba(76, 201, 240, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px) scale(1.1); }
  60% { transform: translateY(-3px) scale(1.05); }
}

/* Loading Spinner */
.fa-spinner {
  animation: spin 1s linear infinite;
  color: white;
  font-size: 1.2rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

textarea.form-control {
  min-height: 120px;
  resize: vertical;
}

.role-selector {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.role-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  color: var(--text-light);
}

.role-btn i {
  font-size: 1.1rem;
}

.role-btn:hover {
  border-color: var(--primary-light);
  color: var(--primary);
}

.role-btn.active {
  background: rgba(39, 95, 212, 0.05);
  border-color: var(--primary);
  color: var(--primary);
  font-weight: 500;
}

/* Form Success Message */
.form-actions {
  margin-top: 1rem;
  text-align: right;
}

.form-success {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--success);
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  font-size: 0.95rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .tab-container {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .role-selector {
    flex-direction: column;
  }
  
  .contact-title {
    font-size: 1.8rem;
  }
}

/* Tabs Navigation */
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
  flex-wrap: wrap;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.tab-button i {
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: currentColor;
}

.tab-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.tab-button:hover {
  background: rgba(67, 97, 238, 0.05);
  color: var(--primary);
  transform: translateY(-2px);
}

.tab-button:hover i {
  transform: translateY(-2px);
}

.tab-button.active {
  background: rgba(67, 97, 238, 0.1);
  color: var(--primary);
  font-weight: 600;
  box-shadow: 0 4px 15px -3px rgba(67, 97, 238, 0.1);
}

.tab-button.active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.tab-button.active i {
  transform: translateY(-2px);
  text-shadow: 0 4px 8px rgba(67, 97, 238, 0.2);
}

/* Chat Styles */
.chat-container {
  background: var(--white);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 500px;
}

.chat-header {
  padding: 1.25rem;
  background: var(--primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.agent-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4caf50;
}

.status-dot.online {
  background: #4caf50;
  box-shadow: 0 0 10px #4caf50;
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 0.75rem;
  max-width: 80%;
  align-self: flex-start;
}

.message.agent {
  align-self: flex-start;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px -3px rgba(67, 97, 238, 0.3), 0 4px 6px -2px rgba(67, 97, 238, 0.2);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.message.user .message-avatar {
  background: var(--accent);
}

.message-content {
  background: #f5f7fa;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.message.user .message-content {
  background: var(--primary);
  color: white;
  border-top-right-radius: 4px;
}

.message.agent .message-content {
  border-top-left-radius: 4px;
}

.message-time {
  font-size: 0.75rem;
  color: var(--text-light);
  margin-top: 0.25rem;
  text-align: right;
}

.message.user .message-time {
  color: rgba(255, 255, 255, 0.8);
}

.chat-input {
  display: flex;
  padding: 1rem;
  border-top: 1px solid var(--border);
  background: var(--white);
}

.chat-input input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  margin-right: 0.5rem;
}

.chat-input button {
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 12px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 15px -3px rgba(67, 97, 238, 0.3);
}

.chat-input button i {
  font-size: 1.4rem;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chat-input button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px -1px rgba(67, 97, 238, 0.4);
}

.chat-input button:hover i {
  transform: translateX(3px) scale(1.1);
}

/* FAQ Styles */
.faq-section {
  max-width: 800px;
  margin: 0 auto;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.active {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(39, 95, 212, 0.1);
}

.faq-question {
  padding: 1.25rem;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  transition: all 0.2s ease;
}

.faq-question:hover {
  background: #f9f9f9;
}

.faq-answer {
  padding: 0 1.25rem 1.25rem;
  color: var(--text-light);
  line-height: 1.6;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 300px; }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .tab-container {
    padding: 1rem;
    margin: 1rem;
  }
  
  .tabs {
    gap: 0.25rem;
    padding-bottom: 0.5rem;
  }
  
  .tab-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .chat-container {
    height: 400px;
  }
  
  .message {
    max-width: 90%;
  }
}

.header__logo {
  height: 40px;
}

.header__nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.header__nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.btn--primary {
  background: #5C9EF0;
  color: #fff;
  border-radius: 6px;
  border: none;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

.btn--small { font-size: 0.9rem; padding: 0.4rem 1rem; }
</style>
