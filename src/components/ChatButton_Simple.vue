<template>
  <div>
    <!-- Simple Chat Button -->
    <button 
      @click="toggleChat"
      class="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300"
      :class="{ 'transform scale-110': isOpen }"
    >
      <span v-if="!isOpen" class="text-xl">💬</span>
      <span v-else class="text-xl">✕</span>
    </button>

    <!-- Chat Window -->
    <div 
      v-if="isOpen"
      class="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200"
    >
      <!-- Header -->
      <div class="bg-blue-600 text-white p-4 rounded-t-lg">
        <h3 class="font-semibold">Health Assistant</h3>
      </div>

      <!-- Messages -->
      <div class="h-64 overflow-y-auto p-4 space-y-3">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="flex"
          :class="{ 'justify-end': message.sender === 'user', 'justify-start': message.sender === 'ai' }"
        >
          <div 
            class="max-w-xs px-3 py-2 rounded-lg"
            :class="{
              'bg-blue-600 text-white': message.sender === 'user',
              'bg-gray-100 text-gray-800': message.sender === 'ai'
            }"
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex">
          <input 
            v-model="userInput"
            @keyup.enter="sendMessage"
            type="text" 
            placeholder="Type your message..."
            class="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <button 
            @click="sendMessage"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatButton',
  data() {
    return {
      isOpen: false,
      userInput: '',
      messages: [
        {
          text: 'Hello! I\'m your AI Health Assistant. How can I help you today?',
          sender: 'ai',
          time: new Date().toLocaleTimeString()
        }
      ]
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    
    sendMessage() {
      if (this.userInput.trim()) {
        // Add user message
        this.messages.push({
          text: this.userInput,
          sender: 'user',
          time: new Date().toLocaleTimeString()
        });
        
        const userMessage = this.userInput;
        this.userInput = '';
        
        // Add AI response after a short delay
        setTimeout(() => {
          this.messages.push({
            text: this.getAIResponse(userMessage),
            sender: 'ai',
            time: new Date().toLocaleTimeString()
          });
        }, 1000);
      }
    },
    
    getAIResponse(message) {
      const responses = [
        "Thank you for your question about " + message + ". For specific medical concerns, please consult with a healthcare professional.",
        "I understand you're asking about " + message + ". While I can provide general health information, it's always best to speak with your doctor.",
        "That's a great question. For medical advice regarding " + message + ", I recommend scheduling an appointment with a healthcare provider.",
        "I can offer general wellness tips, but for concerns about " + message + ", please consult with a medical professional for personalized advice."
      ];
      
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
};
</script>

<style scoped>
/* Component styles are handled by Tailwind classes */
</style>