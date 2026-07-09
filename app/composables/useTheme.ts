/** Light / dark theme toggle with localStorage persistence. */
export function useTheme() {
  const apply = (dark: boolean) => {
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    root.classList.toggle('light', !dark)
  }

  const toggle = () => {
    const isDark = !document.documentElement.classList.contains('dark')
    apply(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  onMounted(() => {
    if (localStorage.getItem('theme') === 'dark') apply(true)
  })

  return { toggle }
}
