import { createAction } from '@reduxjs/toolkit';

import InitTypes from './actionTypes';

// TODO: should be removed when the number of actions increases
// eslint-disable-next-line import/prefer-default-export
export const initialize = createAction<void, InitTypes>(InitTypes.INITIALIZE);
