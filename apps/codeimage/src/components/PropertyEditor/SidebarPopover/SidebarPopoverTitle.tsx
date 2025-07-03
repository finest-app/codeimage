import {Box, Text} from '@codeimage/ui';
import {IconButton} from '@codeui/kit';
import {FlowProps} from 'solid-js';
import {CloseIcon} from '../../Icons/CloseIcon';

interface SidebarPopoverTitleProps {
  onClose: () => void;

  experimental?: boolean;
  featureName?: string;
}
export function SidebarPopoverTitle(
  props: FlowProps<SidebarPopoverTitleProps>,
) {
  return (
    <Box
      display={'flex'}
      justifyContent={'spaceBetween'}
      alignItems={'center'}
      marginBottom={4}
    >
      <Text weight={'semibold'}>{props.children}</Text>

      <IconButton
        size={'xs'}
        aria-label={'Close'}
        theme={'secondary'}
        onClick={() => props.onClose()}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
