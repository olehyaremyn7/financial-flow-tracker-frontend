import { Init, Nullable } from '../interfaces';
import { Mock } from './utils';

export const mockHttpData: Init[] = [
  {
    postId: 1,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
  },
  {
    postId: 1,
    id: 2,
    name: 'quo vero reiciendis velit similique earum',
    email: 'Jayne_Kuhic@sydney.com',
    body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
  },
];

export const mockHttpErrorMessage = 'Error message';

export const applyMatchMediaMock = (matches: Nullable<boolean> = false, mock: Nullable<Mock> = null): void => {
  const matchMediaMock = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  Object.defineProperty(window, 'matchMedia', {
    value: mock ?? matchMediaMock,
  });
};

export const applyLocalStorageMock = (mock: Nullable<Mock> = null): void => {
  const localStorageMock = (() => {
    let store: {
      [key: string]: string;
    } = {};

    return {
      getItem<T>(key: string): T | void {
        const storedData = store[key];

        if (storedData) {
          return JSON.parse(storedData) as T;
        }
      },

      setItem<T = string>(key: string, value: T): void {
        store[key] = JSON.stringify(value);
      },

      clear(): void {
        store = {};
      },

      removeItem(key: string): void {
        delete store[key];
      },

      getAll(): typeof store {
        return store;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: mock ?? localStorageMock,
  });
};
