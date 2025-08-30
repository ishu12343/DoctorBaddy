<template>
  <div 
    class="floating-chat-btn"
    @click="openChat"
  >
    <i class="fas fa-comments"></i>
    <span class="pulse-animation"></span>
  </div>
</template>

<script>
export default {
  name: 'ChatButton',
  methods: {
    openChat() {
      // Add your chat opening logic here
      alert('Chat feature will open here!');
      // You can integrate with your chat component or service
      // Example: this.$emit('open-chat');
    }
  }
}
</script>

<style scoped>
/* Floating Chat Button Styles */
.floating-chat-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4361ee 0%, #3f37c9 100%);
  border-radius: 50%;
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
}

.floating-chat-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(67, 97, 238, 0.4);
}

.floating-chat-btn:active {
  transform: scale(0.95);
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
