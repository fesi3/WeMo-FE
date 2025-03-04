import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from '@/shared/lib/redux/store';

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
