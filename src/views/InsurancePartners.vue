<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="max-w-7xl mx-auto text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Our Insurance Partners
        </h1>
        <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          We work with leading insurance providers to bring you the best healthcare coverage
        </p>
      </div>

      <!-- Insurance Partners Grid -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div v-for="(partner, index) in insurancePartners" :key="index"
               class="bg-white rounded-xl shadow-md overflow-hidden group transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div class="p-6">
              <div class="h-32 flex items-center justify-center mb-4 relative">
                <img 
                  :src="partner.logo" 
                  :alt="partner.name" 
                  class="max-h-20 max-w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                  loading="lazy"
                />
                <span class="absolute text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {{ partner.icon }}
                </span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ partner.name }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ partner.description }}</p>
              <a :href="partner.website" target="_blank" rel="noopener noreferrer"
                 class="text-sm font-medium text-medical-primary hover:text-medical-secondary">
                Visit Website <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="px-6 py-12 sm:px-12 text-center">
          <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            Don't see your insurance provider?
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Contact us to see if we can work with your insurance provider.
          </p>
          <div class="mt-8">
            <router-link to="/contact" 
                        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-medical-primary hover:bg-medical-secondary shadow-sm">
              Contact Us
            </router-link>
          </div>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';

export default {
  name: 'InsurancePartners',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      insurancePartners: [
        {
          name: 'Family Health Plus',
          description: 'Comprehensive family health coverage with extensive pediatric care options.',
          logo: 'https://img.icons8.com/color/480/family--v1.png',
          icon: '👨‍👩‍👧‍👦',
          website: '#'
        },
        {
          name: 'Senior Care Plus',
          description: 'Specialized healthcare plans for seniors with comprehensive coverage.',
          logo: 'https://img.icons8.com/color/480/elderly-person.png',
          icon: '👵',
          website: '#'
        },
        {
          name: 'Wellness First',
          description: 'Preventive care and wellness programs for a healthier lifestyle.',
          logo: 'https://img.icons8.com/color/480/health-check.png',
          icon: '💪',
          website: '#'
        },
        {
          name: 'Global Health',
          description: 'Worldwide coverage for travelers and expatriates.',
          logo: 'https://img.icons8.com/color/480/globe--v1.png',
          icon: '🌎',
          website: '#'
        },
        {
          name: 'Dental Care',
          description: 'Comprehensive dental insurance for the whole family.',
          logo: 'https://img.icons8.com/color/480/dental-braces.png',
          icon: '🦷',
          website: '#'
        },
        {
          name: 'Vision Plus',
          description: 'Affordable vision care and eyewear coverage.',
          logo: 'https://img.icons8.com/color/480/eye-checked.png',
          icon: '👓',
          website: '#'
        },
        {
          name: 'Emergency Care',
          description: '24/7 emergency medical coverage and support.',
          logo: 'https://img.icons8.com/color/480/emergency-room.png',
          icon: '🚑',
          website: '#'
        },
        {
          name: 'Mental Wellness',
          description: 'Therapy and mental health support services.',
          logo: 'https://img.icons8.com/color/480/mental-health.png',
          icon: '🧠',
          website: '#'
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
