import {getExportCanvasStore} from '@codeimage/store/canvas';
import {dispatchCopyToClipboard} from '@codeimage/store/effects/onCopyToClipboard';
import {Link} from '@codeimage/ui';
import {Button, Tooltip} from '@codeui/kit';
import {Component} from 'solid-js';
import {ExportExtension} from '../../hooks/use-export-image';

interface ExportButtonProps {
  canvasRef: HTMLElement | undefined;
}

export const CopyToClipboardButton: Component<ExportButtonProps> = props => {
  const label = () => '复制到剪贴板';

  function copyToClipboard() {
    if (props.canvasRef) {
      return dispatchCopyToClipboard({ref: props.canvasRef});
    }
    return Promise.resolve(true);
  }

  function isSupported() {
    return (
      !!navigator &&
      !!navigator.clipboard &&
      !!navigator.clipboard &&
      !!navigator.clipboard.write &&
      [ExportExtension.png, ExportExtension.svg].includes(
        getExportCanvasStore().get.extension,
      )
    );
  }

  return (
    <Tooltip
      content={
        <>
          您的浏览器可能不支持当前导出格式的{' '}
          <Link
            underline
            href={
              'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write'
            }
          >
            剪贴板 API
          </Link>
        </>
      }
      disabled={isSupported()}
    >
      <Button
        theme={'secondary'}
        disabled={!isSupported()}
        loading={dispatchCopyToClipboard.loading()}
        onClick={copyToClipboard}
        size={'xs'}
      >
        {label()}
      </Button>
    </Tooltip>
  );
};
