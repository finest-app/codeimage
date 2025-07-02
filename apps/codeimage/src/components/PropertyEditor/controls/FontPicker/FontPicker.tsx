import {EditorConfigStore} from '@codeimage/store/editor/config.store';
import {FlexField, VStack} from '@codeimage/ui';
import {icons, Listbox} from '@codeui/kit';
import {DynamicSizedContainer} from '@ui/DynamicSizedContainer/DynamicSizedContainer';
import {SegmentedField} from '@ui/SegmentedField/SegmentedField';
import {createSignal, Match, Switch} from 'solid-js';
import {provideState} from 'statebuilder';
import {SidebarPopover} from '../../SidebarPopover/SidebarPopover';
import {SidebarPopoverTitle} from '../../SidebarPopover/SidebarPopoverTitle';
import * as styles from './FontPicker.css';
import {createFontPickerListboxProps} from './FontPickerListbox';
import {FontSystemPicker} from './FontSystemPicker';

interface FontPickerProps {
  value: string;
  onChange: (value: string) => void;
}

type FontPickerModality = 'default' | 'system';

/**
 * @experimental
 */
export function FontPicker(props: FontPickerProps) {
  const [open, setOpen] = createSignal(false);
  const [mode, setMode] = createSignal<FontPickerModality>('default');
  const configState = provideState(EditorConfigStore);

  const webListboxItems = () =>
    configState.get.fonts
      .filter(font => font.type === 'web')
      .map(font => ({
        label: font.name,
        value: font.id,
      }));

  const webListboxProps = createFontPickerListboxProps({
    onEsc: () => setOpen(false),
    onChange: props.onChange,
    get value() {
      return props.value;
    },
    get items() {
      return webListboxItems();
    },
  });

  const selectedFont = () =>
    [...configState.get.fonts, ...configState.get.systemFonts].find(
      font => font.id === props.value,
    );

  return (
    <SidebarPopover
      open={open()}
      onOpenChange={setOpen}
      contentClass={styles.fontPickerPopover}
      input={triggerProps => (
        <div class={styles.input} {...triggerProps}>
          <span class={styles.inputValue}>
            {selectedFont()?.name ?? '未选择字体'}
          </span>
          <icons.SelectorIcon class={styles.inputIcon} />
        </div>
      )}
    >
      <SidebarPopoverTitle
        featureName={'字体系统访问 API'}
        onClose={() => setOpen(false)}
      >
        字体
      </SidebarPopoverTitle>

      <DynamicSizedContainer>
        <Listbox bordered {...webListboxProps} />
      </DynamicSizedContainer>
    </SidebarPopover>
  );
}
