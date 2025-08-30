<template>
  <div class="chat-container">
    <transition name="fade">
      <div v-if="isOpen" class="chat-window">
        <div class="chat-header">
          <h3>AI Health Assistant</h3>
          <button class="close-btn" @click="toggleChat">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="chat-messages" ref="messagesContainer">
          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
            <div class="message-content">{{ msg.text }}</div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>
        <div class="chat-input">
          <input
            v-model="userInput"
            type="text"
            placeholder="Type your message..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage" :disabled="!userInput.trim()">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </transition>
    
    <button class="floating-chat-btn" @click="toggleChat" :class="{ 'active': isOpen }" :title="isOpen ? 'Close Chat' : 'Chat with Health Assistant'">
      <i v-if="!isOpen" class="fas fa-stethoscope"></i>
      <i v-else class="fas fa-times"></i>
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
      messages: [
        {
          text: 'Hello! I\'m your AI Health Assistant. How can I help you today?',
          sender: 'ai',
          time: this.getCurrentTime()
        }
      ]
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
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
      
      const userInput = this.userInput;
      this.userInput = '';
      
      // Scroll to bottom after user message
      this.scrollToBottom();
      
      try {
        // Show typing indicator
        this.messages.push({
          text: '...',
          sender: 'ai',
          time: this.getCurrentTime(),
          isTyping: true
        });
        
        // Simulate API call (replace with actual API call)
        const aiResponse = await this.getAIResponse(userInput);
        
        // Remove typing indicator
        this.messages = this.messages.filter(msg => !msg.isTyping);
        
        // Add AI response
        this.messages.push({
          text: aiResponse,
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
