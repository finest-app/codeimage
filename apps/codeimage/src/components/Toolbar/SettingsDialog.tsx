import {useI18n} from '@codeimage/locale';
import {getUiStore} from '@codeimage/store/ui';
import {
  Box,
  FieldLabel,
  FlexField,
  Group,
  HStack,
  RadioBlock,
  SvgIcon,
  Text,
  themeVars,
  VStack,
} from '@codeimage/ui';
import {
  Button,
  Dialog,
  DialogPanelContent,
  DialogPanelFooter,
  RadioList,
  RadioListItem,
} from '@codeui/kit';
import {appEnvironment} from '@core/configuration';
import {ControlledDialogProps} from '@core/hooks/createControlledDialog';
import {useModality} from '@core/hooks/isMobile';
import {createSignal, For, Match, Switch} from 'solid-js';
import {AppLocaleEntries} from '../../i18n';
import * as styles from './SettingsDialog.css';

type SettingsDialogProps = ControlledDialogProps;

export function SettingsDialog(props: SettingsDialogProps) {
  const [page] = createSignal<'general' | 'account'>('general');
  const ui = getUiStore();
  const {locales} = appEnvironment;
  const modality = useModality();

  const [t] = useI18n<AppLocaleEntries>();

  return (
    <Dialog
      size={'lg'}
      {...props}
      title={'设置'}
      open={props.isOpen}
      onOpenChange={props.onOpenChange}
    >
      <DialogPanelContent>
        <Box display={'flex'}>
          <div class={styles.dialogContent}>
            <Switch>
              <Match when={page() === 'general'}>
                <VStack spacing={'8'} flexGrow={1}>
                  <FlexField>
                    <FieldLabel size={'sm'} for={'theme'}>
                      主题
                    </FieldLabel>
                    <Group
                      orientation={
                        modality === 'full' ? 'horizontal' : 'vertical'
                      }
                    >
                      <RadioBlock
                        value={'dark'}
                        selected={ui.get.themeMode === 'dark'}
                        onSelect={ui.setThemeMode}
                      >
                        <Box
                          display={'flex'}
                          padding={4}
                          alignItems={'center'}
                          justifyContent={'spaceBetween'}
                        >
                          <Text>暗色模式</Text>
                          <div>
                            <SvgIcon
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill={themeVars.backgroundColor.blue['700']}
                            >
                              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </SvgIcon>
                          </div>
                        </Box>
                      </RadioBlock>
                      <RadioBlock
                        value={'light'}
                        selected={ui.get.themeMode === 'light'}
                        onSelect={ui.setThemeMode}
                      >
                        <Box
                          display={'flex'}
                          padding={4}
                          alignItems={'center'}
                          justifyContent={'spaceBetween'}
                        >
                          <Text>亮色模式</Text>
                          <div>
                            <SvgIcon
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill={themeVars.backgroundColor.yellow['400']}
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clip-rule="evenodd"
                              />
                            </SvgIcon>
                          </div>
                        </Box>
                      </RadioBlock>
                      <RadioBlock
                        value={'system'}
                        selected={ui.get.themeMode === 'system'}
                        onSelect={ui.setThemeMode}
                      >
                        <Box
                          display={'flex'}
                          padding={4}
                          alignItems={'center'}
                          justifyContent={'spaceBetween'}
                        >
                          <Text>系统</Text>
                          <div>
                            <SvgIcon viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fill-rule="evenodd"
                                d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
                                clip-rule="evenodd"
                              />
                            </SvgIcon>
                          </div>
                        </Box>
                      </RadioBlock>
                    </Group>
                  </FlexField>
                </VStack>
              </Match>
            </Switch>
          </div>
        </Box>
      </DialogPanelContent>
      <DialogPanelFooter>
        <HStack spacing={'2'} justifyContent={'flexEnd'}>
          <Button
            size={'md'}
            type="button"
            theme={'secondary'}
            onClick={() => props.onOpenChange(false)}
          >
            {t('common.close')}
          </Button>
        </HStack>
      </DialogPanelFooter>
    </Dialog>
  );
}
