import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return initialState;
    }
  });

  const deleteLocalStorage = () => {
    localStorage.removeItem(key);
  };

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue, deleteLocalStorage];
};
