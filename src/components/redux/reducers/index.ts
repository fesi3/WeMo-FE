import { combineReducers } from 'redux';
import emailReducer from './emailReducer';

const rootReducer = combineReducers({
  email: emailReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
