import {createSignal} from 'solid-js';
import {AVAILABLE_THEMES} from './Editor/themes';

export function createThemeStore() {
  const [themeId, internalSetThemeId] = createSignal<string>(getInitialValue());

  function getInitialValue() {
    if (window.utools) {
      return (
        window.utools.dbStorage.getItem('highlight_theme_default') ??
        AVAILABLE_THEMES[0].id
      );
    }

    return (
      localStorage.getItem('highlight_theme_default') ?? AVAILABLE_THEMES[0].id
    );
  }

  const theme = () => AVAILABLE_THEMES.find(theme => theme.id === themeId())!;

  return [
    theme,
    (themeId: string) => {
      internalSetThemeId(themeId);

      if (window.utools) {
        window.utools.dbStorage.setItem('highlight_theme_default', themeId);
      } else {
        localStorage.setItem('highlight_theme_default', themeId);
      }
    },
  ] as const;
}
