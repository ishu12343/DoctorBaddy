<template>
  <div class="fixed bottom-4 right-4 z-40">
    <!-- Chat Window -->
    <transition name="chat-fade">
      <div v-if="isOpen" class="chat-window bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col overflow-hidden">
        <!-- Chat Header -->
        <div class="bg-gradient-to-r from-medical-primary to-medical-secondary text-white p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <i class="fas fa-robot"></i>
            </div>
            <div>
              <h3 class="font-semibold text-sm">AI Health Assistant</h3>
              <p class="text-xs opacity-75">Online • Ready to help</p>
            </div>
          </div>
          <button @click="toggleChat" class="w-8 h-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <!-- Chat Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3" ref="messagesContainer">
          <div v-for="(msg, index) in messages" :key="index" class="message-group">
            <div :class="[
              'flex items-start gap-2',
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            ]">
              <div v-if="msg.sender === 'ai'" class="w-6 h-6 bg-medical-secondary rounded-full flex items-center justify-center text-white text-xs">
                <i class="fas fa-robot"></i>
              </div>
              <div :class="[
                'max-w-xs p-3 rounded-lg text-sm',
                msg.sender === 'user' 
                  ? 'bg-medical-secondary text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none',
                msg.isTyping && 'animate-pulse'
              ]">
                <p class="leading-relaxed">{{ msg.text }}</p>
                <p class="text-xs opacity-70 mt-1">{{ msg.time }}</p>
              </div>
              <div v-if="msg.sender === 'user'" class="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                <i class="fas fa-user"></i>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Chat Input -->
        <div class="p-4 border-t border-gray-100">
          <div class="flex items-center gap-2">
            <input
              v-model="userInput"
              type="text"
              placeholder="Type your health question..."
              @keyup.enter="sendMessage"
              class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-medical-secondary focus:border-transparent outline-none"
            />
            <button 
              @click="sendMessage" 
              :disabled="!userInput.trim()"
              class="w-10 h-10 bg-medical-secondary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <i class="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Floating Chat Button -->
    <button 
      @click="toggleChat" 
      :class="[
        'w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center text-white text-xl',
        'hover:scale-110 hover:shadow-xl transform',
        isOpen 
          ? 'bg-gray-500 hover:bg-gray-600' 
          : 'bg-gradient-to-r from-medical-secondary to-blue-600 hover:from-blue-600 hover:to-medical-secondary'
      ]"
      :title="isOpen ? 'Close Chat' : 'Chat with Health Assistant'"
    >
      <transition name="icon-fade" mode="out-in">
        <i v-if="!isOpen" key="chat" class="fas fa-stethoscope"></i>
        <i v-else key="close" class="fas fa-times"></i>
      </transition>
      
      <!-- Notification Badge -->
      <div v-if="!isOpen && hasNewMessage" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs animate-bounce">
        !
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChatButton',
  data() {
    return {
      isOpen: false,
      userInput: '',
      hasNewMessage: false,
      messages: [
        {
          text: 'Hello! I\'m your AI Health Assistant. I can help answer general health questions, provide wellness tips, and guide you to appropriate care. How can I assist you today?',
          sender: 'ai',
          time: this.getCurrentTime()
        }
      ],
      aiResponses: {
        greetings: [
          'Hello! How can I help with your health questions today?',
          'Hi there! I\'m here to help with your health and wellness questions.',
          'Greetings! What health topic would you like to discuss?'
        ],
        symptoms: [
          'I understand you\'re experiencing symptoms. While I can provide general information, it\'s important to consult with a healthcare professional for proper diagnosis and treatment.',
          'For any concerning symptoms, I recommend booking a consultation with one of our qualified doctors who can provide personalized medical advice.',
          'Symptoms can have various causes. Would you like me to help you schedule a consultation with a medical professional?'
        ],
        emergency: [
          'If this is a medical emergency, please call 911 or visit your nearest emergency room immediately.',
          'For urgent medical situations, please contact emergency services. I\'m here for non-emergency health information only.',
          'This sounds like it may require immediate medical attention. Please seek emergency care right away.'
        ],
        general: [
          'That\'s a great health question! For specific medical advice, I\'d recommend consulting with one of our certified doctors.',
          'I can provide general health information. For personalized medical advice, would you like to schedule a consultation?',
          'While I can share general wellness information, our licensed physicians can provide the most accurate guidance for your specific situation.'
        ]
      }
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.hasNewMessage = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    
    getCurrentTime() {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    
    async sendMessage() {
      if (!this.userInput.trim()) return;
      
      // Add user message
      const userMessage = {
        text: this.userInput,
        sender: 'user',
        time: this.getCurrentTime()
      };
      this.messages.push(userMessage);
      
      const userInput = this.userInput.toLowerCase();
      this.userInput = '';
      
      // Scroll to bottom after user message
      this.scrollToBottom();
      
      try {
        // Show typing indicator
        this.messages.push({
          text: 'Typing...',
          sender: 'ai',
          time: this.getCurrentTime(),
          isTyping: true
        });
        
        this.scrollToBottom();
        
        // Simulate API processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get AI response
        const aiResponse = this.getAIResponse(userInput);
        
        // Remove typing indicator
        this.messages = this.messages.filter(msg => !msg.isTyping);
        
        // Add AI response
        this.messages.push({
          text: aiResponse,
          sender: 'ai',
          time: this.getCurrentTime()
        });
        
        if (!this.isOpen) {
          this.hasNewMessage = true;
        }
        
        this.scrollToBottom();
        
      } catch (error) {
        // Remove typing indicator on error
        this.messages = this.messages.filter(msg => !msg.isTyping);
        
        this.messages.push({
          text: 'I\'m sorry, I\'m having trouble responding right now. Please try again or contact our support team.',
          sender: 'ai',
          time: this.getCurrentTime()
        });
        
        this.scrollToBottom();
      }
    },
    
    getAIResponse(input) {
      // Simple keyword-based response system
      const lowerInput = input.toLowerCase();
      
      // Emergency keywords
      if (lowerInput.includes('emergency') || lowerInput.includes('urgent') || 
          lowerInput.includes('chest pain') || lowerInput.includes('can\'t breathe') ||
          lowerInput.includes('severe') || lowerInput.includes('911')) {
        return this.getRandomResponse('emergency');
      }
      
      // Greeting keywords
      if (lowerInput.includes('hello') || lowerInput.includes('hi') || 
          lowerInput.includes('hey') || lowerInput.includes('good')) {
        return this.getRandomResponse('greetings');
      }
      
      // Symptom keywords
      if (lowerInput.includes('pain') || lowerInput.includes('hurt') || 
          lowerInput.includes('sick') || lowerInput.includes('fever') ||
          lowerInput.includes('symptom') || lowerInput.includes('feel')) {
        return this.getRandomResponse('symptoms');
      }
      
      // Doctor/consultation keywords
      if (lowerInput.includes('doctor') || lowerInput.includes('appointment') || 
          lowerInput.includes('consultation') || lowerInput.includes('book')) {
        return 'I can help you connect with our qualified doctors! You can book a consultation through our services section or by signing up as a patient. Would you like me to guide you through the process?';
      }
      
      // Default response
      return this.getRandomResponse('general');
    },
    
    getRandomResponse(category) {
      const responses = this.aiResponses[category] || this.aiResponses.general;
      return responses[Math.floor(Math.random() * responses.length)];
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },
  
  mounted() {
    // Welcome message after a delay
    setTimeout(() => {
      this.messages.push({
        text: 'Feel free to ask me about symptoms, wellness tips, or how to book a consultation with our doctors!',
        sender: 'ai',
        time: this.getCurrentTime()
      });
      if (!this.isOpen) {
        this.hasNewMessage = true;
      }
    }, 3000);
  }
}
</script>

<style scoped>
/* Chat animations */
.chat-fade-enter-active, .chat-fade-leave-active {
  transition: all 0.3s ease;
}

.chat-fade-enter-from, .chat-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.icon-fade-enter-active, .icon-fade-leave-active {
  transition: opacity 0.2s ease;
}

.icon-fade-enter-from, .icon-fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for chat messages */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .chat-window {
    width: calc(100vw - 2rem);
    height: 80vh;
    max-height: 500px;
  }
}

/* Pulse animation for typing */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
          sender: 'ai',
          time: this.getCurrentTime()
        });
      } catch (error) {
        console.error('Error getting AI response:', error);
        this.messages = this.messages.filter(msg => !msg.isTyping);
        this.messages.push({
          text: 'Sorry, I encountered an error. Please try again later.',
          sender: 'ai',
          time: this.getCurrentTime()
        });
      }
      
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    // TODO: Replace with actual AI service integration
    async getAIResponse(message) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple response logic (replace with actual AI service call)
      const responses = [
        "I understand you're asking about " + message + ". While I can provide general health information, please consult with a healthcare professional for personalized advice.",
        "That's an interesting question about " + message + ". I recommend discussing this with your doctor for the most accurate information.",
        "Thank you for your question. For concerns about " + message + ", it's best to consult with a medical professional.",
        "I can provide general information about " + message + ", but please remember I'm not a substitute for professional medical advice."
      ];
      
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
};
</script>

<style scoped>
/* Chat Container */
.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  width: auto;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
}

/* Chat Window */
.chat-window {
  width: 350px;
  max-width: 90vw;
  height: 500px;
  max-height: 80vh;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 15px;
  transform-origin: bottom right;
  animation: scaleIn 0.2s ease-out;
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Chat Header */
.chat-header {
  background: linear-gradient(135deg, #4a6cf7 0%, #2541b2 100%);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 1;
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f5f7fb;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.user {
  margin-left: auto;
}

.message.ai {
  margin-right: auto;
}

.message-content {
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.message.user .message-content {
  background: #4a6cf7;
  color: white;
  border-bottom-right-radius: 5px;
}

.message.ai .message-content {
  background: white;
  color: #333;
  border: 1px solid #e1e4e8;
  border-bottom-left-radius: 5px;
}

.message-time {
  font-size: 11px;
  color: #999;
  margin-top: 5px;
  text-align: right;
}

/* Chat Input */
.chat-input {
  display: flex;
  padding: 15px;
  background: white;
  border-top: 1px solid #e1e4e8;
}

.chat-input input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e1e4e8;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.chat-input input:focus {
  border-color: #4a6cf7;
}

.chat-input button {
  background: #4a6cf7;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-input button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.chat-input button:not(:disabled):hover {
  background: #3a5bd9;
}

/* Floating Chat Button */
.floating-chat-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  margin: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #4a6cf7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(67, 97, 238, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  user-select: none;
  border: none;
  outline: none;
}

.floating-chat-btn:hover {
  background: #3a5bd9;
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(67, 97, 238, 0.4);
}

.floating-chat-btn.active {
  background: #ff4d4f;
  transform: rotate(90deg) scale(1.05);
}

.floating-chat-btn.active:hover {
  background: #ff7875;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  padding: 10px 15px;
  background: white;
  border-radius: 18px;
  width: fit-content;
  margin-bottom: 15px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.typing-dot {
  width: 8px;
  height: 8px;
  background-color: #4a6cf7;
  border-radius: 50%;
  margin: 0 2px;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
}

/* Scrollbar Styling */
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

/* Responsive Design */
@media (max-width: 480px) {
  .chat-window {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    margin: 0;
  }
  
  .chat-container {
    position: static;
  }
  
  .floating-chat-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Pulse Animation for New Messages */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(74, 108, 247, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(74, 108, 247, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 108, 247, 0); }
}

.new-message-pulse {
  animation: pulse 1.5s infinite;
}

/* Loading Animation */
.loading-dots:after {
  content: '.';
  animation: dots 1.5s steps(5, end) infinite;
  display: inline-block;
  width: 0;
  overflow: hidden;
  vertical-align: bottom;
}

@keyframes dots {
  0%, 20% { width: 0; }
  40% { width: 1em; }
  60%, 100% { width: 2em; }
}

.floating-chat-btn .pulse-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: 50%;
  z-index: -1;
  opacity: 0.7;
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-chat-btn {
    width: 56px;
    height: 56px;
    font-size: 22px;
    bottom: 20px;
    right: 15px;
  }
}
</style>
