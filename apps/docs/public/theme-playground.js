(() => {
  const picker = document.querySelector('#theme-picker');
  const resolveTheme = (mode) =>
    mode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : mode;

  const applyTheme = (mode) => {
    document.documentElement.dataset.theme = resolveTheme(mode);
  };

  if (picker) {
    picker.addEventListener('change', (event) => {
      applyTheme(event.currentTarget.value);
    });
  }
})();
