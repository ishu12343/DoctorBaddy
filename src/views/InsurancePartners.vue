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
               class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-6">
              <div class="h-32 flex items-center justify-center mb-4">
                <img :src="partner.logo" :alt="partner.name" class="max-h-20 max-w-full object-contain" />
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
          name: 'HealthGuard',
          description: 'Comprehensive health insurance plans with extensive network coverage.',
          logo: 'https://via.placeholder.com/200x100?text=HealthGuard',
          website: 'https://example.com/healthguard'
        },
        {
          name: 'MediCare Plus',
          description: 'Affordable healthcare solutions for individuals and families.',
          logo: 'https://via.placeholder.com/200x100?text=MediCare+Plus',
          website: 'https://example.com/medicareplus'
        },
        {
          name: 'Wellness First',
          description: 'Prioritizing preventive care and wellness programs.',
          logo: 'https://via.placeholder.com/200x100?text=Wellness+First',
          website: 'https://example.com/wellnessfirst'
        },
        {
          name: 'Global Health',
          description: 'International health coverage with premium benefits.',
          logo: 'https://via.placeholder.com/200x100?text=Global+Health',
          website: 'https://example.com/globalhealth'
        },
        {
          name: 'Family Care',
          description: 'Specialized plans for family healthcare needs.',
          logo: 'https://via.placeholder.com/200x100?text=Family+Care',
          website: 'https://example.com/familycare'
        },
        {
          name: 'Senior Shield',
          description: 'Dedicated healthcare solutions for seniors.',
          logo: 'https://via.placeholder.com/200x100?text=Senior+Shield',
          website: 'https://example.com/seniorshield'
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
