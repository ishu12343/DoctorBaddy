<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeader />
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-medical-primary to-medical-secondary py-12 sm:py-16 lg:py-20">
      <div class="container mx-auto px-3 sm:px-4 text-center">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4">Health & Wellness Tips</h1>
        <p class="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">Expert advice and practical tips for a healthier lifestyle</p>
      </div>
    </div>

    <!-- Tips Grid -->
    <div class="container mx-auto px-3 sm:px-4 py-12 sm:py-16">
      <!-- Categories -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="activeCategory = category.id"
          class="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 touch-button"
          :class="activeCategory === category.id 
            ? 'bg-medical-primary text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto mb-8 sm:mb-12">
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search health tips..."
            class="w-full px-4 sm:px-6 py-3 sm:py-4 pr-10 sm:pr-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-medical-primary focus:border-transparent transition-all duration-200 shadow-sm text-base"
          >
          <svg 
            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Tips Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div 
          v-for="tip in filteredTips" 
          :key="tip.id"
          class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="h-40 sm:h-48 lg:h-56 overflow-hidden">
            <img 
              :src="tip.image" 
              :alt="tip.title"
              class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            >
          </div>
          <div class="p-4 sm:p-6">
            <div class="flex justify-between items-center mb-2 sm:mb-3">
              <span :class="tip.tagClass" class="text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
                {{ tip.tag }}
              </span>
              <span class="text-xs sm:text-sm text-gray-500">{{ formatDate(tip.date) }}</span>
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">{{ tip.title }}</h3>
            <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">{{ tip.description }}</p>
            <div class="flex justify-between items-center">
              <button 
                @click="viewTipDetails(tip)"
                class="text-medical-primary font-medium hover:text-medical-secondary transition-colors duration-200 flex items-center touch-button text-sm sm:text-base"
              >
                Read more
                <svg class="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <div class="flex items-center text-gray-400">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
                <span class="text-xs sm:text-sm">{{ tip.likes || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="mt-8 sm:mt-12 text-center">
        <button 
          v-if="hasMoreTips"
          @click="loadMoreTips"
          class="px-8 py-3 bg-medical-primary text-white rounded-full hover:bg-medical-secondary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-primary"
        >
          Load More Tips
        </button>
      </div>
    </div>

    <!-- Tip Detail Modal -->
    <div v-if="selectedTip" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button 
          @click="selectedTip = null"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div class="h-96 overflow-hidden">
          <img 
            :src="selectedTip.image" 
            :alt="selectedTip.title"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="p-8">
          <div class="flex justify-between items-center mb-6">
            <div>
              <span :class="selectedTip.tagClass" class="text-xs font-semibold px-3 py-1 rounded-full">
                {{ selectedTip.tag }}
              </span>
              <span class="text-sm text-gray-500 ml-3">{{ formatDate(selectedTip.date) }}</span>
            </div>
            <button class="text-gray-400 hover:text-red-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ selectedTip.title }}</h2>
          <div class="prose max-w-none text-gray-700 mb-8">
            <p class="text-lg leading-relaxed mb-6">{{ selectedTip.description }}</p>
            <div class="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 class="text-xl font-semibold text-blue-800 mb-3">Key Benefits</h3>
              <ul class="space-y-2">
                <li v-for="(benefit, index) in selectedTip.benefits || ['Improved health', 'Better lifestyle', 'Increased energy']" :key="index" class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{{ benefit }}</span>
                </li>
              </ul>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mt-10 mb-4">More Details</h3>
            <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div class="bg-gray-50 p-6 rounded-lg my-8">
              <h4 class="font-semibold text-lg mb-3">Quick Tips</h4>
              <ul class="list-disc pl-5 space-y-2">
                <li>Practice this tip daily for best results</li>
                <li>Combine with a balanced diet</li>
                <li>Stay consistent with your routine</li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-6 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button class="flex items-center text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
                <span>Like ({{ selectedTip.likes || 0 }})</span>
              </button>
              <button class="flex items-center text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span>Comment</span>
              </button>
            </div>
            <button class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </button>
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
  components: { AppHeader, AppFooter },
  name: 'TipsPage',
  data() {
    return {
      searchQuery: '',
      activeCategory: 'all',
      selectedTip: null,
      visibleTips: 6,
      categories: [
        { id: 'all', name: 'All Tips' },
        { id: 'nutrition', name: 'Nutrition' },
        { id: 'fitness', name: 'Fitness' },
        { id: 'mental', name: 'Mental Health' },
        { id: 'sleep', name: 'Sleep' },
        { id: 'wellness', name: 'Wellness' },
      ],
      tips: [
        {
          id: 1,
          title: 'Balanced Diet Essentials',
          description: 'Learn the key components of a balanced diet and how to incorporate them into your daily meals for optimal health and energy.',
          image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'NUTRITION',
          tagClass: 'bg-green-100 text-green-800',
          date: '2023-05-15',
          likes: 128,
          category: 'nutrition'
        },
        {
          id: 2,
          title: 'Morning Workout Routine',
          description: 'Start your day right with this 20-minute morning workout that will boost your energy and metabolism.',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'FITNESS',
          tagClass: 'bg-blue-100 text-blue-800',
          date: '2023-05-12',
          likes: 89,
          category: 'fitness'
        },
        {
          id: 3,
          title: 'Mindfulness Meditation',
          description: 'Discover the benefits of daily mindfulness meditation and how it can reduce stress and improve focus.',
          image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'MENTAL HEALTH',
          tagClass: 'bg-purple-100 text-purple-800',
          date: '2023-05-10',
          likes: 156,
          category: 'mental'
        },
        {
          id: 4,
          title: 'Stay Hydrated',
          description: 'Drink at least 8 glasses of water daily to maintain proper body function and energy levels.',
          image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'HYDRATION',
          tagClass: 'bg-cyan-100 text-cyan-800',
          date: '2023-05-08',
          likes: 92,
          category: 'wellness'
        },
        {
          id: 5,
          title: 'Quality Sleep',
          description: 'Get 7-9 hours of quality sleep each night to support overall health and well-being.',
          image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'SLEEP',
          tagClass: 'bg-amber-100 text-amber-800',
          date: '2023-05-05',
          likes: 134,
          category: 'sleep'
        },
        {
          id: 6,
          title: 'Healthy Snacking',
          description: 'Smart snacking ideas that keep you full and energized throughout the day without the guilt.',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'NUTRITION',
          tagClass: 'bg-green-100 text-green-800',
          date: '2023-05-03',
          likes: 78,
          category: 'nutrition'
        },
        {
          id: 7,
          title: 'Desk Stretches',
          description: 'Simple stretches to do at your desk to prevent stiffness and improve posture.',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'FITNESS',
          tagClass: 'bg-blue-100 text-blue-800',
          date: '2023-05-01',
          likes: 102,
          category: 'fitness'
        },
        {
          id: 8,
          title: 'Gratitude Journaling',
          description: 'How keeping a gratitude journal can improve your mental health and overall happiness.',
          image: 'https://images.unsplash.com/photo-1517842645767-c67904289db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          tag: 'MENTAL HEALTH',
          tagClass: 'bg-purple-100 text-purple-800',
          date: '2023-04-28',
          likes: 145,
          category: 'mental'
        }
      ]
    }
  },
  computed: {
    filteredTips() {
      let filtered = [...this.tips];
      
      // Filter by category
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter(tip => tip.category === this.activeCategory);
      }
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(tip => 
          tip.title.toLowerCase().includes(query) || 
          tip.description.toLowerCase().includes(query) ||
          tip.tag.toLowerCase().includes(query)
        );
      }
      
      // Limit visible tips
      return filtered.slice(0, this.visibleTips);
    },
    hasMoreTips() {
      return this.visibleTips < this.tips.length;
    }
  },
  methods: {
    viewTipDetails(tip) {
      this.selectedTip = { ...tip };
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    },
    loadMoreTips() {
      this.visibleTips += 3;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    }
  },
  watch: {
    selectedTip(newVal) {
      if (!newVal) {
        document.body.style.overflow = ''; // Re-enable scrolling when modal is closed
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''; // Make sure to re-enable scrolling if component is unmounted
  }
}
</script>

<style scoped>
/* Custom scrollbar for the modal */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth scrolling for the tips container */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Hide scrollbar but allow scrolling */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Animation for the modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
