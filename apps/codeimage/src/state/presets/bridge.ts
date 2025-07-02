import {getRootEditorStore} from '@codeimage/store/editor';
import {getFrameState} from '@codeimage/store/editor/frame';
import {getTerminalState} from '@codeimage/store/editor/terminal';
import {generateUid} from '@codeimage/store/plugins/unique-id';
import {appEnvironment} from '@core/configuration';
import {createEffect, on} from 'solid-js';
import {unwrap} from 'solid-js/store';
import {makePlugin} from 'statebuilder';
import {useIdb} from '../../hooks/use-indexed-db';
import {Preset, PresetData, PresetsArray} from './types';

export const userLimit = import.meta.env.VITE_PRESET_LIMIT;
export const guestLimit = import.meta.env.VITE_PRESET_LIMIT_GUEST;

export const withPresetBridge = (idbKey: string) =>
  makePlugin(
    store => {
      const idb = useIdb();

      function persistToIdb(data: PresetsArray) {
        return idb.set(idbKey, unwrap(data)).then();
      }

      createEffect(
        on(
          store,
          resource => {
            persistToIdb(resource ?? []);
          },
          {defer: true},
        ),
      );
      const getPresetDataFromState = () => {
        const frameState = getFrameState().stateToPersist();
        const terminalState = getTerminalState().stateToPersist();
        const editorState = getRootEditorStore().stateToPersist();
        const presetData: PresetData = {
          appVersion: appEnvironment.version,
          frame: {
            background: frameState.background!,
            opacity: frameState.opacity,
            padding: frameState.padding,
            visible: frameState.visible,
            radius: frameState.radius,
          },
          terminal: {
            opacity: terminalState.opacity,
            background: terminalState.background,
            accentVisible: terminalState.accentVisible,
            alternativeTheme: terminalState.alternativeTheme,
            shadow: terminalState.shadow,
            showGlassReflection: terminalState.showGlassReflection,
            type: terminalState.type,
            showHeader: terminalState.showHeader,
            showWatermark: terminalState.showWatermark,
            textColor: terminalState.textColor,
            borderType: terminalState.borderType,
          },
          editor: {
            fontId: editorState.options.fontId,
            fontWeight: editorState.options.fontWeight,
            showLineNumbers: editorState.options.showLineNumbers,
            themeId: editorState.options.themeId,
            enableLigatures: editorState.options.enableLigatures,
          },
        };
        return presetData;
      };

      const bridge = {
        persistToIdb,
        getPresetDataFromState,
        isLocalPreset(preset: Preset) {
          return preset.id === preset.data.localSyncId;
        },
        canSyncPreset(preset: Preset) {
          return true;
        },
        addNewPreset(name: string, data?: PresetData): Promise<Preset> {
          const presetData: PresetData = data ?? getPresetDataFromState();

          const id = generateUid();

          presetData.localSyncId = id;

          return Promise.resolve({
            id,
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1,
            data: presetData,
          });
        },
        async deletePreset(preset: Preset): Promise<Preset> {
          return preset;
        },
        async updatePreset(
          preset: Preset,
          name: string,
          data: PresetData,
        ): Promise<Preset> {
          return {...preset, name, data};
        },
        reachPresetLimit() {
          const limitPreset = () => guestLimit;
          return store()?.length >= limitPreset();
        },
      };
      return {bridge} as const;
    },
    {name: 'withPresetBridge'},
  );
