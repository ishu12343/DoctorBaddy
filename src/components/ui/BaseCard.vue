<template>
  <div :class="wrapper">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    interactive: { type: Boolean, default: false },
    padded: { type: Boolean, default: true }
  },
  computed: {
    wrapper() {
      const base = 'card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden'
      const hover = this.interactive ? 'transform hover:-translate-y-1' : ''
      return [base, hover].join(' ')
    }
  }
}
</script>

<style scoped>
</style>


