import {createI18nContext, I18nContext, useI18n} from '@codeimage/locale';
import {getRootEditorStore} from '@codeimage/store/editor';
import {EditorConfigStore} from '@codeimage/store/editor/config.store';
import {getThemeStore} from '@codeimage/store/theme/theme.store';
import {getUiStore} from '@codeimage/store/ui';
import {
  backgroundColorVar,
  CodeImageThemeProvider,
  SnackbarHost,
  ThemeProviderProps,
} from '@codeimage/ui';
import '@codeimage/ui/themes/lightTheme';
import {appEnvironment} from '@core/configuration';
import {snackbarHostAppStyleCss} from '@ui/snackbarHostAppStyle.css';
import {setElementVars} from '@vanilla-extract/dynamic';
import {Component, createEffect, lazy, on, Show, Suspense} from 'solid-js';
import {render} from 'solid-js/web';
import {provideState, StateProvider} from 'statebuilder';
import './assets/styles/app.scss';
import {SidebarPopoverHost} from './components/PropertyEditor/SidebarPopoverHost';
import {Scaffold} from './components/Scaffold/Scaffold';
import {locale} from './i18n';
import {EditorPageSkeleton} from './pages/Editor/components/EditorSkeleton';
import './theme/global.css';

console.debug('💻 CodeImage version:', appEnvironment.version);

const i18n = createI18nContext(locale);

function lazyWithNoLauncher(cp: () => Promise<{default: Component<any>}>) {
  return lazy(() => {
    queueMicrotask(() => {
      document.querySelector('#launcher')?.remove();
    });
    return cp();
  });
}

const tokens: ThemeProviderProps['tokens'] = {
  text: {
    weight: 'medium',
  },
};

const Editor = () => {
  const Page = lazyWithNoLauncher(() => import('./pages/Editor/Editor'));
  getThemeStore().loadThemes();

  const editorConfig = provideState(EditorConfigStore);

  return (
    <Suspense fallback={<EditorPageSkeleton />}>
      <Show fallback={<EditorPageSkeleton />} when={editorConfig.get.ready}>
        <Page />
      </Show>
    </Suspense>
  );
};

export function Bootstrap() {
  getRootEditorStore();
  const [, {locale}] = useI18n();
  const uiStore = getUiStore();
  createEffect(on(() => uiStore.get.locale, locale));
  const mode = () => uiStore.currentTheme();

  createEffect(
    on(mode, theme => {
      const scheme = document.querySelector('meta[name="theme-color"]');
      const color = theme === 'dark' ? '#151516' : '#FFFFFF';
      if (scheme) {
        scheme.setAttribute('content', color);
      }
      setElementVars(document.documentElement, {
        [backgroundColorVar]: color,
      });
      document.documentElement.setAttribute('data-cui-theme', theme as string);
    }),
  );

  return (
    <Scaffold>
      <CodeImageThemeProvider tokens={tokens} theme={mode()}>
        <SnackbarHost containerClassName={snackbarHostAppStyleCss} />
        <Suspense>
          <Editor />
        </Suspense>
      </CodeImageThemeProvider>
      <SidebarPopoverHost />
    </Scaffold>
  );
}

render(
  () => (
    <I18nContext.Provider value={i18n}>
      <StateProvider>
        <Bootstrap />
      </StateProvider>
    </I18nContext.Provider>
  ),
  document.getElementById('root') as HTMLElement,
);
