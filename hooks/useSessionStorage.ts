import { useCallback } from "react";

export function useSessionStorage() {
  const setSessionItem = useCallback((key: string, value: unknown) => {
    try {
      const serialized =
        typeof value === "object" ? JSON.stringify(value) : String(value);
      sessionStorage.setItem(key, serialized);
    } catch (error) {
      console.error("Error setting sessionStorage:", error);
    }
  }, []);

  const getSessionItem = useCallback((key: string): string | null  => {
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting sessionStorage:", error);
      return null;
    }
  }, []);

  const removeSessionItem = useCallback((key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing sessionStorage key:", error);
    }
  }, []);

  const clearSession = useCallback(() => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  }, []);

  return { setSessionItem, getSessionItem, removeSessionItem, clearSession };
}
