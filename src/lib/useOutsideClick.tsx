import { useEffect, useRef } from 'react';

type RefObject<T> = {
  readonly current: null | T;
};

const useOutsideClick = <T extends HTMLElement>(
  callback: () => void,
  shouldCHeck: boolean,
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (shouldCHeck) {
      const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          callback();
        }
      };

      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [callback, shouldCHeck]);

  return ref;
};

export default useOutsideClick;
