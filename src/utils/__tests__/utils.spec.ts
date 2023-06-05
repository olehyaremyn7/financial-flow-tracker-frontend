import { applyLocalStorageMock } from 'src/tests/mocks';

import { afterEach, beforeEach, describe, it } from '../../tests/utils';
import { createUID, isEnvVariableTrue, isJSON, storage } from '../index';

describe('Utils', (): void => {
  describe('createUID()', (): void => {
    it('Should return id', (): void => {
      expect(createUID()).toBeTruthy();
      expect(typeof createUID()).toBe('string');
    });

    it('Should return unique id', (): void => {
      const idOne = createUID();
      const idTwo = createUID();

      expect(idOne).not.toEqual(idTwo);
    });
  });

  describe('isEnvVariableTrue()', (): void => {
    it('Should return true if env variable equals "true"', (): void => {
      expect(isEnvVariableTrue('true')).toBeTruthy();
      expect(typeof isEnvVariableTrue('true')).toBe('boolean');
    });

    it('Should return false if env variable equals "false"', (): void => {
      expect(isEnvVariableTrue('false')).toBeFalsy();
      expect(typeof isEnvVariableTrue('false')).toBe('boolean');
    });
  });

  describe('isJSON()', (): void => {
    it('Should return true if passed prop is object', (): void => {
      const stringifiedString = JSON.stringify('test');

      expect(isJSON(stringifiedString)).toBeTruthy();
      expect(typeof isJSON(stringifiedString)).toBe('boolean');
    });

    it('Should return false if passed prop is string', (): void => {
      const str = 'test';

      expect(isJSON(str)).toBeFalsy();
      expect(typeof isJSON(str)).toBe('boolean');
    });
  });

  describe('storage()', (): void => {
    const STORAGE_KEY = 'test';
    const str = 'string value';
    const obj = {
      str,
    };

    const setToMockStorage = (id: string, data: string | object): void => {
      window.localStorage.setItem(id, data as string);
    };

    const getFromMockStorage = (id: string): string | null => {
      return window.localStorage.getItem(id);
    };

    beforeEach((): void => {
      applyLocalStorageMock();
    });

    afterEach((): void => {
      window.localStorage.clear();
    });

    it('Should set string to LocalStorage', (): void => {
      storage(STORAGE_KEY, str);

      expect(getFromMockStorage(STORAGE_KEY)).toEqual(str);
    });

    it('Should set object to LocalStorage and use JSON.stringify', (): void => {
      storage(STORAGE_KEY, obj);

      expect(getFromMockStorage(STORAGE_KEY)).toEqual(JSON.stringify(obj));
    });

    it('Should get string from LocalStorage', (): void => {
      setToMockStorage(STORAGE_KEY, str);

      expect(storage(STORAGE_KEY)).toEqual(str);
    });

    it('Should get object from LocalStorage and use JSON.parse', (): void => {
      setToMockStorage(STORAGE_KEY, obj);

      expect(storage(STORAGE_KEY)).toEqual(obj);
    });
  });
});
