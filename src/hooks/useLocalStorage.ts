import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    console.log(storedValue);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  console.log("use local storage");
  const deleteLocalStorage = () => {
    console.log("key", key);
    localStorage.removeItem(key);
  };

  useEffect(() => {
    console.log("localstorage effect");
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue, deleteLocalStorage];
};
