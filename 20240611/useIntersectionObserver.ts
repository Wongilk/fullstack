import { useEffect, useRef } from "react";

type Callback = (entries: IntersectionObserverEntry[]) => void;

interface Options {
  root?: Element | null;
  rootMargin?: string;
  threshhold?: number | number[];
}

export const useIntersectionObserver = (
  callback: Callback,
  options?: Options
) => {
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (target.current) observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  });

  return target;
};
