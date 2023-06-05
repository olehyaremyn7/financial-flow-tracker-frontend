import { useLayoutEffect } from 'react';

const useTitle = (title: string): void => {
  useLayoutEffect((): void => {
    if (title.trim().length > 0) {
      document.title = `${import.meta.env.VITE_APP_NAME} - ${title.trim()}`;
    }
  }, [title]);
};

export default useTitle;
