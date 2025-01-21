import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;
