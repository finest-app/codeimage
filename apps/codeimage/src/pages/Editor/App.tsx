import {getExportCanvasStore} from '@codeimage/store/canvas';
import {getActiveEditorStore} from '@codeimage/store/editor/activeEditor';
import {getFrameState} from '@codeimage/store/editor/frame';
import {dispatchRandomTheme} from '@codeimage/store/effects/onThemeChange';
import {adaptiveFullScreenHeight, Box, HStack, PortalHost} from '@codeimage/ui';
import {Button} from '@codeui/kit';
import {useModality} from '@core/hooks/isMobile';
import {createSignal, lazy, onMount, Show, Suspense} from 'solid-js';
import {BottomBar} from '../../components/BottomBar/BottomBar';
import {FrameHandler} from '../../components/Frame/FrameHandler';
import {FrameSkeleton} from '../../components/Frame/FrameSkeleton';
import {PreviewFrame} from '../../components/Frame/PreviewFrame';
import {ColorSwatchIcon} from '../../components/Icons/ColorSwatch';
import {SparklesIcon} from '../../components/Icons/SparklesIcon';
import {KeyboardShortcuts} from '../../components/KeyboardShortcuts/KeyboardShortcuts';
import {SuspenseEditorItem} from '../../components/PropertyEditor/SuspenseEditorItem';
import {Canvas} from '../../components/Scaffold/Canvas/Canvas';
import {Sidebar} from '../../components/Scaffold/Sidebar/Sidebar';
import {ThemeSwitcher} from '../../components/ThemeSwitcher/ThemeSwitcher';
import {ExportButton} from '../../components/Toolbar/ExportButton';
import {ExportSettingsButton} from '../../components/Toolbar/ExportSettingsButton';
import {FrameToolbar} from '../../components/Toolbar/FrameToolbar';
import {ShareButton} from '../../components/Toolbar/ShareButton';
import {Toolbar} from '../../components/Toolbar/Toolbar';
import * as styles from './App.css';
import {EditorLeftSidebar} from './components/LeftSidebar';

const ManagedFrame = lazy(() =>
  import('../../components/Frame/ManagedFrame').then(c => ({
    default: c.ManagedFrame,
  })),
);

export function App() {
  const [frameRef, setFrameRef] = createSignal<HTMLElement>();
  const [portalHostRef, setPortalHostRef] = createSignal<HTMLElement>();
  const modality = useModality();
  const frameStore = getFrameState();
  const exportCanvasStore = getExportCanvasStore();

  onMount(() => exportCanvasStore.initCanvas(frameRef));

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      class={adaptiveFullScreenHeight}
    >
      <Toolbar canvasRef={frameRef()} />
      <div class={styles.wrapper}>
        <EditorLeftSidebar />

        <PortalHost ref={setPortalHostRef} />

        <Canvas>
          <SuspenseEditorItem
            fallback={
              <Box
                height={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <FrameSkeleton />
              </Box>
            }
          >
            <Show when={modality === 'full'}>
              <Box display={'flex'} paddingTop={3} paddingX={4}>
                <HStack spacing={'2'}>
                  <KeyboardShortcuts />
                </HStack>
              </Box>
            </Show>

            <Show when={modality === 'mobile'}>
              <Box class={styles.mobileActionToolbar}>
                <HStack spacing={'2'} justifyContent={'flexEnd'}>
                  <ExportSettingsButton />
                  <ShareButton showLabel={false} />
                  <Button
                    size={'xs'}
                    theme={'secondary'}
                    leftIcon={<ColorSwatchIcon />}
                    onClick={() => dispatchRandomTheme()}
                  />
                  <Button
                    size={'xs'}
                    theme={'secondary'}
                    leftIcon={<SparklesIcon />}
                    onClick={() => getActiveEditorStore().format()}
                  />
                  <ExportButton canvasRef={frameRef()} />
                </HStack>
              </Box>
            </Show>

            <FrameHandler onScaleChange={frameStore.setScale}>
              <Suspense fallback={<FrameSkeleton />}>
                <ManagedFrame />
              </Suspense>
            </FrameHandler>

            <PreviewFrame ref={setFrameRef} />

            <Show when={modality === 'full'} keyed={false}>
              <FrameToolbar frameRef={frameRef()} />
            </Show>
          </SuspenseEditorItem>
        </Canvas>

        <Show
          when={modality === 'full'}
          fallback={<BottomBar portalHostRef={portalHostRef()} />}
        >
          <Sidebar>
            <ThemeSwitcher orientation={'vertical'} />
          </Sidebar>
        </Show>
      </div>
    </Box>
  );
}

export default App;
