<template>
  <button
    @click="toggleTheme"
    :aria-pressed="isDark"
    class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
  >
    <i v-if="!isDark" class="fas fa-moon"></i>
    <i v-else class="fas fa-sun"></i>
    <span class="text-sm">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<script>
import { useTheme } from '@/composables/useTheme'

export default {
  name: 'ThemeToggle',
  setup() {
    const { isDark, toggleTheme } = useTheme()
    return { isDark, toggleTheme }
  }
}
</script>

<style scoped>
</style>


