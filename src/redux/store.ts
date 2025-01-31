import { combineReducers, legacy_createStore as createStore } from 'redux';
import authReducer from './authReducers';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = createStore(rootReducer, composeWithDevTools());

export default store;
