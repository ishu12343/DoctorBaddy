<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="classes"
  >
    <span v-if="loading" class="mr-2 inline-flex">
      <i class="fas fa-spinner fa-spin"></i>
    </span>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    block: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    classes() {
      const base = 'btn transition-transform duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
      const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
      }
      const variants = {
        primary: 'bg-gradient-to-r from-brand-500 to-teal-500 text-white shadow-lg hover:shadow-xl hover:brightness-105',
        secondary: 'bg-medical-secondary text-white hover:bg-teal-600 shadow-md',
        outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white',
        subtle: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      }
      const block = this.block ? 'w-full' : ''
      return [base, sizes[this.size], variants[this.variant], block].join(' ')
    }
  }
}
</script>

<style scoped>
</style>


