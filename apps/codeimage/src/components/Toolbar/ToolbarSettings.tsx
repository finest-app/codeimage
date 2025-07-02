import {IconButton} from '@codeui/kit';
import {createControlledDialog} from '@core/hooks/createControlledDialog';
import {SettingIcon} from '../Icons/DotVertical';
import {SettingsDialog} from './SettingsDialog';

export function ToolbarSettingsButton() {
  const openDialog = createControlledDialog();

  return (
    <IconButton
      pill={true}
      size="xs"
      theme="secondary"
      aria-label="Setting"
      onClick={() => openDialog(SettingsDialog, () => ({}))}
    >
      <SettingIcon size={'sm'} />
    </IconButton>
  );
}
