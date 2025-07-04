import {DEFAULT_ASPECT_RATIOS} from '@codeimage/config';
import {Box, Text} from '@codeimage/ui';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {createSignal, For, Show} from 'solid-js';
import {SidebarPopover} from '../../SidebarPopover/SidebarPopover';
import {SidebarPopoverTitle} from '../../SidebarPopover/SidebarPopoverTitle';
import * as styles from './AspetRatioPicker.css';

interface AspectRatioPickerProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

/**
 * @experimental
 */
export function AspectRatioPicker(props: AspectRatioPickerProps) {
  const [open, setOpen] = createSignal(false);

  return (
    <SidebarPopover
      contentClass={styles.aspectRatioPopover}
      input={triggerProps => (
        <div class={styles.input} {...triggerProps}>
          <Show when={props.value}>
            {aspectRatio => (
              <div
                class={styles.aspectRatioPreviewBox}
                style={assignInlineVars({
                  [styles.aspectRatio]: aspectRatio(),
                })}
              />
            )}
          </Show>

          <Text weight={'semibold'}>{props.value ?? '自动'}</Text>
        </div>
      )}
      open={open()}
      onOpenChange={setOpen}
    >
      <SidebarPopoverTitle
        featureName={'纵横比'}
        onClose={() => setOpen(false)}
      >
        纵横比
      </SidebarPopoverTitle>

      <div class={styles.aspectRatioCardList}>
        <div
          data-selected={!props.value ? '' : null}
          class={styles.aspectRatioCardFull}
          onClick={() => props.onChange(null)}
        >
          <div
            style={assignInlineVars({
              [styles.aspectRatio]: 'auto',
            })}
            class={styles.aspectRadioCardPreview}
          >
            <Box marginY={3}>自动</Box>
          </div>
        </div>

        <For each={DEFAULT_ASPECT_RATIOS}>
          {ratio => (
            <div
              data-selected={props.value === ratio.ratio ? '' : null}
              class={styles.aspectRatioCard}
              onClick={() => props.onChange(ratio.ratio)}
            >
              <div class={styles.aspectRatioCardPreviewWrapper}>
                <div
                  style={assignInlineVars({
                    [styles.aspectRatio]: ratio.ratio,
                  })}
                  class={styles.aspectRadioCardPreview}
                >
                  {ratio.name}
                </div>
              </div>
              <span class={styles.aspectRatioCardDetails}>
                {ratio.resolution.join('x')}
              </span>
            </div>
          )}
        </For>
      </div>
    </SidebarPopover>
  );
}
