import { Nullable } from '../interfaces';

export const createUID = (): string => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);

  return head + tail;
};

export const isEnvVariableTrue = (booleanEnvVar: string): boolean => /true/.test(booleanEnvVar);

export const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }

  return true;
};

export const storage = <T>(key: string, data: Nullable<T> = null): T | void => {
  if (!data) {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      return isJSON(storedData) ? JSON.parse(storedData) : storedData;
    }
  }

  localStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
};
