import {useI18n} from '@codeimage/locale';
import {FlexField, VStack} from '@codeimage/ui';
import {TextField} from '@codeui/kit';
import {
  SegmentedFieldItem,
  SegmentedField,
} from '@ui/SegmentedField/SegmentedField';
import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  For,
  on,
  onMount,
  Show,
  VoidProps,
} from 'solid-js';
import {ColorPickerPresetItem} from './ColorPickerPresetItem';
import * as styles from './CustomColorPicker.css';

const enum ColorPickerSelectionMode {
  gradient = 'gradient',
  color = 'color',
  background = 'background',
}

export interface ColorPickerPopoverProps {
  value?: string | null;
  onChange: (value: string) => void;
  gradientColors?: string[];
  colors?: string[];
}

export function ColorPickerPopover(props: VoidProps<ColorPickerPopoverProps>) {
  const [internalColor, setInternalColor] = createSignal<string>();
  const [mode, setMode] = createSignal(ColorPickerSelectionMode.gradient);
  const [, {tUnsafe}] = useI18n();
  createEffect(on(() => props.value ?? '', setInternalColor));

  const modalities: Accessor<SegmentedFieldItem<ColorPickerSelectionMode>[]> =
    createMemo(() => [
      {
        label: tUnsafe('colorPicker.gradient'),
        value: ColorPickerSelectionMode.gradient,
      },
      {
        label: tUnsafe('colorPicker.color'),
        value: ColorPickerSelectionMode.color,
      },
    ]);

  onMount(() => {
    if (props.colors?.includes(props.value ?? '')) {
      setMode(ColorPickerSelectionMode.color);
    } else {
      setMode(ColorPickerSelectionMode.gradient);
    }
  });

  return (
    <VStack spacing={4}>
      <FlexField size={'md'}>
        <SegmentedField
          size={'sm'}
          value={mode()}
          onChange={setMode}
          items={modalities()}
        />
      </FlexField>

      <Show when={mode() === ColorPickerSelectionMode.color}>
        <FlexField size={'xs'}>
          <TextField
            size={'sm'}
            value={internalColor()}
            onChange={value => props.onChange(value)}
          />
        </FlexField>
        <div class={styles.colorGrid}>
          <For each={props.colors}>
            {item => (
              <ColorPickerPresetItem
                color={item}
                title={item}
                active={props.value === item}
                onClick={() => {
                  props.onChange(item);
                }}
              />
            )}
          </For>
        </div>
      </Show>
      <Show when={mode() === ColorPickerSelectionMode.gradient}>
        <FlexField size={'xs'}>
          <TextField
            size={'sm'}
            value={internalColor()}
            onChange={value => props.onChange(value)}
          />
        </FlexField>
        <div class={styles.colorGrid}>
          <For each={props.gradientColors}>
            {item => (
              <ColorPickerPresetItem
                color={item}
                title={item}
                active={props.value === item}
                onClick={() => props.onChange(item)}
              />
            )}
          </For>
        </div>
      </Show>
    </VStack>
  );
}
