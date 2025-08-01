const KEY = 'eleven_api_key';

export const getKey = (): string | null => {
  return localStorage.getItem(KEY);
};

export const setKey = (key: string) => {
  localStorage.setItem(KEY, key);
};

export const hasKey = (): boolean => {
  return !!getKey();
};
