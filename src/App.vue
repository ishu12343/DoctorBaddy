/* Global responsive image and section styles */
img, svg, video {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

section, .section, .main-content, .layout-content {
  width: 100vw;
  max-width: 100vw;
  box-sizing: border-box;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (max-width: 900px) {
  section, .section, .main-content, .layout-content {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
@media (max-width: 600px) {
  section, .section, .main-content, .layout-content {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
}
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
  font-size: 16px;
  box-sizing: border-box;
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
  width: 100vw;
  box-sizing: border-box;
}


/* Global styles for fixed header layout */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}


.layout-content {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}


.main-content {
  padding-top: 80px; /* Account for fixed header height */
  width: 100%;
  box-sizing: border-box;
}
/* Responsive adjustments */
@media (max-width: 900px) {
  #app, .layout-container, .layout-content, .main-content {
    padding-left: 0;
    padding-right: 0;
    width: 100vw;
  }
}

@media (max-width: 600px) {
  #app, .layout-container, .layout-content, .main-content {
    padding: 0 !important;
    margin: 0 !important;
    width: 100vw;
    min-width: 0;
  }
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
