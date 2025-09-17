<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <main class="flex-1 pt-16 sm:pt-20 lg:pt-24">
      <div class="max-w-7xl mx-auto py-8 sm:py-12 px-3 sm:px-4 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8 sm:mb-12">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Patient & Doctor Stories</h1>
          <p class="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">Real experiences from our community of patients and healthcare professionals</p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div v-for="story in visibleStories" :key="story.id" 
               class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="p-4 sm:p-6 flex flex-col h-full">
              <div class="flex items-center justify-between mb-3 sm:mb-4">
                <div class="flex items-center gap-1 text-yellow-500">
                  <i v-for="star in 5" :key="star" class="fas fa-star text-sm"></i>
                </div>
                <span class="text-xs font-semibold px-2 sm:px-3 py-1 rounded-full"
                      :class="story.type === 'Patient' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'">
                  {{ story.type }} Story
                </span>
              </div>
              <p class="text-gray-600 mb-4 sm:mb-6 italic text-sm sm:text-base lg:text-lg flex-grow">"{{ story.text }}"</p>
              <div class="flex items-center gap-3 sm:gap-4 border-t border-gray-100 pt-3 sm:pt-4 mt-auto">
                <img :src="story.avatar" :alt="story.name" class="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover" />
                <div>
                  <!-- Patient Details -->
                  <template v-if="story.type === 'Patient'">
                    <div class="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">{{ story.name }}</div>
                    <div class="text-gray-500 text-xs sm:text-sm">{{ story.location }}</div>
                    <div v-if="story.condition" class="text-xs sm:text-sm text-blue-600 mt-1">Treated for: {{ story.condition }}</div>
                  </template>
                  <!-- Doctor Details -->
                  <template v-if="story.type === 'Doctor'">
                    <div class="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Dr. {{ story.name }}</div>
                    <div class="text-gray-500 text-xs sm:text-sm">{{ story.specialty }}</div>
                    <div class="text-xs sm:text-sm text-green-600 mt-1">{{ story.experience }} of experience</div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="mt-8 sm:mt-12 text-center flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <button v-if="hasMoreStories" @click="loadMore" 
                  class="px-6 py-3 bg-medical-primary text-white font-medium rounded-lg hover:bg-medical-secondary transition-colors duration-300 w-full sm:w-auto touch-button">
            Load More Stories
          </button>
          <button @click="$router.go(-1)" 
                  class="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 w-full sm:w-auto touch-button">
            <i class="fas fa-arrow-left mr-2"></i> Back to Home
          </button>
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
  name: 'TestimonialsPage',
  components: { AppHeader, AppFooter },
  data() {
    return {
      visibleCount: 6,
      allStories: [
        {
          id: 'p1',
          type: 'Patient',
          name: 'Sarah Johnson',
          location: 'New York, USA',
          text: 'The care I received was exceptional. The doctors were knowledgeable and took the time to explain everything to me. I\'m so grateful for the support during my recovery.',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          condition: 'Knee Replacement Surgery',
          rating: 5
        },
        {
          id: 'd1',
          type: 'Doctor',
          name: 'Robert Taylor',
          specialty: 'Cardiologist',
          experience: '15 years',
          text: 'This platform has transformed how I connect with my patients. The ability to provide continuous care through the app has improved outcomes and patient satisfaction significantly.',
          avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
          rating: 5
        },
        {
          id: 'p2',
          type: 'Patient',
          name: 'Michael Chen',
          location: 'San Francisco, USA',
          text: 'As someone with a chronic condition, finding the right specialist was crucial. The platform made it easy to connect with experts who truly understood my needs.',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          condition: 'Diabetes Management',
          rating: 5
        },
        {
          id: 'd2',
          type: 'Doctor',
          name: 'Lisa Wong',
          specialty: 'Pediatrician',
          experience: '12 years',
          text: 'As a pediatrician, building trust with both children and parents is crucial. The platform\'s features help me provide personalized care while maintaining the human touch.',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          rating: 5
        },
        {
          id: 'p3',
          type: 'Patient',
          name: 'Emma Williams',
          location: 'Chicago, USA',
          text: 'The telehealth feature was a game-changer for my busy schedule. I could consult with my doctor without taking time off work or dealing with traffic.',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          condition: 'Prenatal Care',
          rating: 5
        },
        {
          id: 'd3',
          type: 'Doctor',
          name: 'David Kim',
          specialty: 'Orthopedic Surgeon',
          experience: '20 years',
          text: 'The pre and post-operative care management through this platform has streamlined my practice. I can monitor my patients\' recovery in real-time and provide timely interventions.',
          avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
          rating: 5
        },
        {
          id: 'p4',
          type: 'Patient',
          name: 'James Brown',
          location: 'Miami, USA',
          text: 'Fantastic experience. The app is user-friendly and the support team is very responsive. I got an appointment with a specialist in less than a day.',
          avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
          condition: 'Dermatology Consultation',
          rating: 5
        },
        {
          id: 'd4',
          type: 'Doctor',
          name: 'Jessica Miller',
          specialty: 'Neurologist',
          experience: '18 years',
          text: 'The diagnostic tools and secure messaging have allowed me to provide more accurate and timely care. It\'s a powerful tool for modern medicine.',
          avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
          rating: 5
        }
      ]
    }
  },
  computed: {
    visibleStories() {
      // Return a sliced array of stories
      return this.allStories.slice(0, this.visibleCount);
    },
    hasMoreStories() {
      return this.visibleCount < this.allStories.length;
    }
  },
  methods: {
    loadMore() {
      this.visibleCount += 6; // Load 6 more stories
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
