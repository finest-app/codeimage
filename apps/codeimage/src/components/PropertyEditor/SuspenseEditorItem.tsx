import {JSX, ParentProps, Suspense} from 'solid-js';

export function SuspenseEditorItem(
  props: ParentProps<{fallback: JSX.Element}>,
) {
  return <Suspense fallback={props.fallback}>{props.children}</Suspense>;
}
