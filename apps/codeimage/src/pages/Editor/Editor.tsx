import {lazy} from 'solid-js';

const App = lazy(() => import('./App'));

export default function Editor() {
  return <App />;
}
