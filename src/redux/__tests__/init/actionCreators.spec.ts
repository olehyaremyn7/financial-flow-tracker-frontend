import { PayloadAction } from '@reduxjs/toolkit';

import { describe, it } from '../../../tests/utils';
import { initialize } from '../../reducers/init/actionCreators';
import InitTypes from '../../reducers/init/actionTypes';

describe('Init action creators', (): void => {
  describe('initialize action creators', (): void => {
    it('initialize() should return correct action object', (): void => {
      const action: PayloadAction<void, InitTypes> = {
        type: InitTypes.INITIALIZE,
        payload: undefined,
      };

      expect(initialize()).toEqual(action);
    });
  });
});
