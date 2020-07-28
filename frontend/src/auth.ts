export const setAuthen = (data: any): void => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const checkIsAuthen = (): boolean => {
  const value = localStorage.getItem("userData");
  if (!value) return false;
  return true;
};

export const getUserData = (): { userName: string; userId: number } | null => {
  const value = localStorage.getItem("userData");
  if (!value) return null;
  return JSON.parse(value);
};

export const logout = () => {
  localStorage.removeItem("userData");
};
