import {ToolbarSettingsButton} from '../../../../components/Toolbar/ToolbarSettings';
import * as styles from './DashboardHeader.css';

export function DashboardHeader() {
  return (
    <div class={styles.header}>
      <div class={styles.headerContent}>
        <ToolbarSettingsButton />
      </div>
    </div>
  );
}
