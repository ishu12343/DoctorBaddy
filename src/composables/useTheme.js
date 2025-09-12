import { ref, onMounted } from 'vue'

const THEME_KEY = 'doctorbuddy-theme'

const isDark = ref(false)

function applyThemeClass() {
  const root = document.documentElement
  if (isDark.value) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
    applyThemeClass()
  }

  const setTheme = (theme) => {
    isDark.value = theme === 'dark'
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
    applyThemeClass()
  }

  onMounted(() => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark') {
      isDark.value = true
    } else if (saved === 'light') {
      isDark.value = false
    } else {
      isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyThemeClass()
  })

  return { isDark, toggleTheme, setTheme }
}


