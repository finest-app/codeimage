import {Box, HStack} from '@codeimage/ui';
import {useModality} from '@core/hooks/isMobile';
import {Show, VoidProps} from 'solid-js';
import {ExportButton} from './ExportButton';
import {ShareButton} from './ShareButton';
import * as styles from './Toolbar.css';
import {ToolbarSettingsButton} from './ToolbarSettings';

interface ToolbarProps {
  canvasRef: HTMLElement | undefined;
}

export function Toolbar(props: VoidProps<ToolbarProps>) {
  const modality = useModality();

  return (
    <div class={styles.toolbar}>
      <div class={styles.wrapper}>
        <ToolbarSettingsButton />

        <Box class={styles.actionBox} flexGrow={1}>
          <HStack marginLeft={'auto'} spacing={'2'}>
            <Show when={modality === 'full'} keyed={false}>
              <ShareButton showLabel={false} />

              <ExportButton canvasRef={props.canvasRef} />
            </Show>
          </HStack>
        </Box>
      </div>
    </div>
  );
}
