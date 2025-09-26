<template>
  <button
    class="fixed bottom-6 right-6 z-40 rounded-full shadow-xl text-white w-14 h-14 flex items-center justify-center bg-gradient-to-br from-teal-500 to-brand-600 hover:from-teal-400 hover:to-brand-500 active:scale-95 transition-transform"
    @click="$emit('click')"
    aria-label="Quick action"
  >
    <i class="fas fa-calendar-plus text-xl"></i>
  </button>
</template>

<script>
export default {
  name: 'FloatingActionButton'
}
</script>

<style scoped>
</style>


