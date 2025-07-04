import {getRootEditorStore} from '@codeimage/store/editor';
import {getTerminalState} from '@codeimage/store/editor/terminal';
import {Box, RadioBlock} from '@codeimage/ui';
import {Checkbox} from '@codeui/kit';
import {TERMINAL_SHADOWS} from '@core/configuration/shadow';
import {AVAILABLE_TERMINAL_THEMES} from '@core/configuration/terminal-themes';
import {createSignal, For, JSXElement, Suspense} from 'solid-js';
import {Dynamic} from 'solid-js/web';
import {SettingsIcon} from '../../../Icons/SettingsIcon';
import {SidebarPopover} from '../../SidebarPopover/SidebarPopover';
import {SidebarPopoverTitle} from '../../SidebarPopover/SidebarPopoverTitle';
import * as styles from './TerminalControlField.css';
import {TerminalControlSkeleton} from './TerminalControlFieldSkeleton';

interface TerminalControlFieldProps {
  selectedTerminal: string;
  showAccent: boolean;
  onTerminalChange: (type: string) => void;
  onShowAccentChange: (accent: boolean) => void;
}

export function TerminalControlField(
  props: TerminalControlFieldProps,
): JSXElement {
  const [open, setOpen] = createSignal(false);
  const terminalThemes = AVAILABLE_TERMINAL_THEMES;
  const terminalState = getTerminalState();
  const {state: editorState} = getRootEditorStore();

  return (
    <SidebarPopover
      modalOnDesktop
      open={open()}
      input={triggerProps => (
        <div class={styles.input} {...triggerProps}>
          <Box paddingTop={1} paddingBottom={1} width={'100%'}>
            <Suspense fallback={<TerminalControlSkeleton />}>
              <Dynamic
                lite
                preview={true}
                shadow={TERMINAL_SHADOWS.md}
                showTab={true}
                component={
                  terminalThemes.entries[
                    (props.selectedTerminal as keyof typeof terminalThemes.entries) ??
                      'macOs'
                  ]?.component ?? terminalThemes.entries['macOs'].component
                }
                textColor={terminalState.state.textColor}
                background={terminalState.state.background}
                accentVisible={props.showAccent}
                showHeader={true}
                showWatermark={false}
                alternativeTheme={false}
                opacity={100}
                themeId={editorState.options.themeId}
                showGlassReflection={false}
                borderType={null}
              />
            </Suspense>
          </Box>
          <SettingsIcon class={styles.inputIcon} />
        </div>
      )}
      onOpenChange={setOpen}
    >
      <SidebarPopoverTitle onClose={() => setOpen(false)}>
        窗口样式
      </SidebarPopoverTitle>
      <For each={Object.values(terminalThemes.entries)}>
        {terminal => (
          <RadioBlock
            selected={terminal.name === props.selectedTerminal}
            value={terminal.name}
            onSelect={props.onTerminalChange}
          >
            <Box padding={2} width={'100%'}>
              <Suspense fallback={<TerminalControlSkeleton />}>
                <Dynamic
                  preview={true}
                  showTab={true}
                  shadow={TERMINAL_SHADOWS['3d']}
                  component={terminal.component}
                  textColor={terminalState.state.textColor}
                  background={terminalState.state.background}
                  accentVisible={props.showAccent}
                  showHeader={true}
                  showWatermark={false}
                  alternativeTheme={false}
                  opacity={100}
                  themeId={editorState.options.themeId}
                  showGlassReflection={terminalState.state.showGlassReflection}
                  borderType={null}
                />
              </Suspense>
            </Box>
          </RadioBlock>
        )}
      </For>

      <Box marginTop={5}>
        <Checkbox
          size={'md'}
          checked={props.showAccent}
          onChange={value => props.onShowAccentChange(value)}
          label={'显示标签页高亮'}
        />
      </Box>
    </SidebarPopover>
  );
}
