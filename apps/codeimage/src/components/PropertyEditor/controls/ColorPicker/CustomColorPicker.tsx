import {AVAILABLE_COLORS, AVAILABLE_GRADIENTS} from '@codeimage/config';
import {getAssetsStore} from '@codeimage/store/assets/assets';
import {backgroundColorVar, Box, Text} from '@codeimage/ui';
import {IconButton} from '@codeui/kit';
import {DynamicSizedContainer} from '@ui/DynamicSizedContainer/DynamicSizedContainer';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {createSignal} from 'solid-js';
import {CloseIcon} from '../../../Icons/CloseIcon';
import {SidebarPopover} from '../../SidebarPopover/SidebarPopover';
import {ColorPickerPopover, ColorPickerPopoverProps} from './ColorPicker';
import * as styles from './CustomColorPicker.css';

export type CustomColorPickerProps = ColorPickerPopoverProps & {
  value: string | undefined;
  onChange: (value: string) => void;
};

export function CustomColorPicker(props: CustomColorPickerProps) {
  const [open, setOpen] = createSignal(false);
  const assetsStore = getAssetsStore();
  return (
    <SidebarPopover
      open={open()}
      onOpenChange={setOpen}
      contentClass={styles.popover}
      input={triggerProps => (
        <div class={styles.input} {...triggerProps}>
          <div
            class={styles.inputColor}
            style={assignInlineVars({
              [backgroundColorVar]: assetsStore.isAssetUrl(props.value)
                ? assetsStore.getAssetImageBrowserUrl(props.value)() ?? '#000'
                : props.value ?? '#000000',
            })}
          />
        </div>
      )}
    >
      <DynamicSizedContainer>
        <Box
          display={'flex'}
          justifyContent={'spaceBetween'}
          alignItems={'center'}
          marginBottom={4}
        >
          <Text weight={'semibold'}>颜色</Text>
          <IconButton
            size={'xs'}
            aria-label={'关闭'}
            theme={'secondary'}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <ColorPickerPopover
          value={props.value}
          onChange={props.onChange}
          colors={AVAILABLE_COLORS}
          gradientColors={AVAILABLE_GRADIENTS}
        />
      </DynamicSizedContainer>
    </SidebarPopover>
  );
}
