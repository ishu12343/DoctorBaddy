<template>
  <div id="app" class="min-h-screen flex flex-col w-full">
    <RouterView v-slot="{ Component, route }">
      <transition name="route-fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView>
  </div>
  
</template>

<script>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const route = useRoute();

    // On every route change (including initial load), scroll to the top of the page.
    watch(() => route.fullPath, () => {
      window.scrollTo(0, 0);
    }, { immediate: true });
  }
}
</script>

<style>
/* Keep minimal global styles - Tailwind handles most styling */
#app {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure no layout shifts */
* {
  box-sizing: border-box;
}

/* Remove default margins and ensure full height */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  /* overflow-x: hidden; */
}

/* Route transition - subtle and fast */
.route-fade-enter-active, .route-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.route-fade-enter-from, .route-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
