export const setAuthen = (data: any): void => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const checkIsAuthen = (): boolean => {
  const value = localStorage.getItem("userData");
  if (!value) return false;
  return true;
};

export const getUserData = (): {
  token: string;
  user: { email: string; id: string; role: string };
} | null => {
  const value = localStorage.getItem("userData");
  if (!value) return null;
  return JSON.parse(value);
};

export const getJwtToken = () => {
  const userData = getUserData();
  return userData?.token;
};

export const getRole = () => {
  const userData = getUserData();
  return userData?.user.role;
};

export const clearUserData = () => {
  localStorage.removeItem("userData");
};
