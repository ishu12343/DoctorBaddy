<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      // Initialize anything you need on app mount
    });
  }
}
</script>

<style>
/* Global scrollbar styles */
html {
  height: 100%;
  overflow-y: scroll;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Global styles for fixed header layout */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-content {
  flex: 1;
}

.main-content {
  padding-top: 80px; /* Account for fixed header height */
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
