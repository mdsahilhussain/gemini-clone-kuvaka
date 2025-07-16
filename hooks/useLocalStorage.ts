import { useCallback } from "react";

export function useLocalStorage() {
  const setItem = useCallback(
    (key: string, value: string | number | boolean | object) => {
      try {
        const serialized =
          typeof value === "object" ? JSON.stringify(value) : String(value);
        localStorage.setItem(key, serialized);
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    },
    []
  );

  const getItem = useCallback((key: string): string | null  => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting localStorage:", error);
      return null;
    }
  }, []);

  const removeItem = useCallback((key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage key:", error);
    }
  }, []);

  const clear = useCallback(() => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }, []);

  return { setItem, getItem, removeItem, clear };
}
