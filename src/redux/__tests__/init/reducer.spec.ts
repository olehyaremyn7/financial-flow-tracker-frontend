import { PayloadAction } from '@reduxjs/toolkit';

import { describe, it } from '../../../tests/utils';
import InitTypes from '../../reducers/init/actionTypes';
import initialState from '../../reducers/init/initialState';
import { InitState } from '../../reducers/init/interface';
import initReducer from '../../reducers/init/reducer';

describe('Init reducer', (): void => {
  describe('initialize action', (): void => {
    it('INITIALIZE action type should return correct state', (): void => {
      const action: PayloadAction<void, InitTypes> = {
        type: InitTypes.INITIALIZE,
        payload: undefined,
      };

      expect(initReducer(initialState, action)).toEqual(<InitState>{
        ...initialState,
        initialized: true,
      });
    });
  });
});
