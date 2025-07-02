import {effect} from '@codeimage/atomic-state';
import {useI18n} from '@codeimage/locale';
import {getExportCanvasStore} from '@codeimage/store/canvas';
import {getUiStore} from '@codeimage/store/ui';
import {toast} from '@codeimage/ui';
import {catchError, EMPTY, exhaustMap, from, pipe, switchMap, tap} from 'rxjs';
import {getOwner, runWithOwner} from 'solid-js';
import {exportSnippet} from '../../hooks/export-snippet';
import {ExportMode, ExportOptions} from '../../hooks/use-export-image';
import {AppLocaleEntries} from '../../i18n';

interface CopyToClipboardEvent {
  ref: HTMLElement;
}

const owner = getOwner()!;

export const dispatchCopyToClipboard = effect<CopyToClipboardEvent>(
  pipe(
    exhaustMap(({ref}) => {
      const exportSettings = getExportCanvasStore();
      const options: ExportOptions = {
        mode: ExportMode.getBlob,
        quality: exportSettings.get.jpegQuality,
        pixelRatio: Math.floor(exportSettings.get.devicePixelRatio),
        extension: exportSettings.get.extension,
      };
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return from(
        runWithOwner(owner, () => exportSnippet({ref, options}))!,
      ).pipe(
        switchMap(data => {
          if (!(data instanceof Blob)) return EMPTY;

          return from(
            window.utools
              ? Promise.resolve(
                  (async () => {
                    const unit8Array = new Uint8Array(await data.arrayBuffer());

                    window.utools.copyImage(unit8Array);
                  })(),
                )
              : navigator.clipboard.write([
                  new ClipboardItem(
                    {
                      [data.type]: data,
                    },
                    {presentationStyle: 'attachment'},
                  ),
                ]),
          ).pipe(
            tap(() => runWithOwner(owner, openSnackbar)),
            catchError(() => EMPTY),
          );
        }),
      );
    }),
  ),
);

function openSnackbar(): void {
  toast.success(
    () => {
      const [t] = useI18n<AppLocaleEntries>();
      return t('canvas.copiedToClipboard');
    },
    {
      position: 'bottom-center',
      theme: getUiStore().invertedThemeMode(),
    },
  );
}
