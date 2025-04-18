// hooks/useDebouncedEffect.ts
import { useEffect, useRef } from "react";

export function useDebouncedEffect(
  callback: () => void,
  delay: number,
  dependencies: any[] = []
) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const handler = setTimeout(callback, delay);
    return () => clearTimeout(handler);
  }, [...dependencies, delay]); // Include delay in dependencies
}
