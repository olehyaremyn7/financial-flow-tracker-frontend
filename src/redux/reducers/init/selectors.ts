import { RootState } from '../../interface';
import { InitState } from './interface';

export const initSelector = ({ init }: RootState): InitState => init;

export const isInitializedSelector = ({ init: { initialized } }: RootState): boolean => initialized;
