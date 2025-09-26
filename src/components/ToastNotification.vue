<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="[toast.type]"
      >
        <div class="toast-content">
          <div class="toast-icon">
            <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else-if="toast.type === 'error'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else-if="toast.type === 'warning'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="toast-message">
            <div class="toast-title" v-if="toast.title">{{ toast.title }}</div>
            <div class="toast-text">{{ toast.message }}</div>
          </div>
          <button @click="removeToast(toast.id)" class="toast-close">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'ToastNotification',
  data() {
    return {
      toasts: []
    };
  },
  methods: {
    addToast(toast) {
      const id = Date.now() + Math.random();
      const newToast = {
        id,
        type: toast.type || 'info',
        title: toast.title || '',
        message: toast.message || '',
        duration: toast.duration || 5000
      };
      
      this.toasts.push(newToast);
      
      if (newToast.duration > 0) {
        setTimeout(() => {
          this.removeToast(id);
        }, newToast.duration);
      }
      
      return id;
    },
    removeToast(id) {
      const index = this.toasts.findIndex(toast => toast.id === id);
      if (index > -1) {
        this.toasts.splice(index, 1);
      }
    },
    showSuccess(message, title = '', duration = 5000) {
      return this.addToast({ type: 'success', title, message, duration });
    },
    showError(message, title = '', duration = 7000) {
      return this.addToast({ type: 'error', title, message, duration });
    },
    showWarning(message, title = '', duration = 6000) {
      return this.addToast({ type: 'warning', title, message, duration });
    },
    showInfo(message, title = '', duration = 5000) {
      return this.addToast({ type: 'info', title, message, duration });
    }
  }
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 420px;
  pointer-events: none;
}

.toast {
  margin-bottom: 12px;
  pointer-events: auto;
  transform: translateX(0);
  transition: all 0.3s ease;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgb(0 0 0 / 10%);
  backdrop-filter: blur(10px);
  border: 1px solid rgb(255 255 255 / 20%);
}

.toast.success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.toast.error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.toast.warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.toast.info {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.toast-icon {
  margin-right: 12px;
  margin-top: 2px;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.toast-text {
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.95;
}

.toast-close {
  margin-left: 12px;
  margin-top: 2px;
  padding: 2px;
  border: none;
  background: none;
  color: currentcolor;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  opacity: 1;
}

/* Transition animations */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
