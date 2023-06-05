import { describe, it } from '../../../tests/utils';
import { RootState } from '../../interface';
import initialState from '../../reducers/init/initialState';
import { InitState } from '../../reducers/init/interface';
import { initSelector, isInitializedSelector } from '../../reducers/init/selectors';

describe('Init selectors', (): void => {
  const rootState: RootState = {
    init: {
      ...initialState,
      initialized: false,
    },
  };

  it('initSelector() should return init state', (): void => {
    expect(initSelector(rootState)).toEqual(<InitState>{ ...initialState, ...rootState.init });
  });

  it('isInitializedSelector() should return initialized value', (): void => {
    expect(isInitializedSelector(rootState)).toBeFalsy();
  });
});
