export const RawJavascript = {
  ForceDarkMode: "window.document.documentElement.classList.add('dark')",
  PreventMouseNavigation: `
      document.addEventListener('mouseup', (event) => {
        if ([3, 4].includes(event.button)) {
          event.preventDefault()
          event.stopPropagation()
        }
      })
    `
} as const
