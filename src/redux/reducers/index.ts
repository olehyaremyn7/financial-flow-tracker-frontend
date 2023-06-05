import { combineReducers } from '@reduxjs/toolkit';

import initReducer from './init/reducer';

const rootReducer = combineReducers({
  init: initReducer,
});

export default rootReducer;
