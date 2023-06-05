import { createReducer } from '@reduxjs/toolkit';

import { initialize } from './actionCreators';
import initialState from './initialState';

const initReducer = createReducer(initialState, (builder) => {
  builder.addCase(initialize, (state) => {
    state.initialized = true;
  });
});

export default initReducer;
