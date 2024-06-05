const AUTH_TOKEN_KEY = "token";
const AUTH_TOKEN_EXPIRATION_KEY = "token_expiration";
const REFRESH_TOKEN_KEY = "refresh_token";

const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const saveAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    const expiration = new Date().getTime() + 60 * 120 * 1000;
    saveAuthTokenExpiration(expiration);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_EXPIRATION_KEY);
  }
};

const getAuthTokenExpiration = (): number | null => {
  const expiration = localStorage.getItem(AUTH_TOKEN_EXPIRATION_KEY);
  return expiration ? parseInt(expiration, 10) : null;
};

const saveAuthTokenExpiration = (expiration: number | null) => {
  if (expiration) {
    localStorage.setItem(AUTH_TOKEN_EXPIRATION_KEY, expiration.toString());
  } else {
    localStorage.removeItem(AUTH_TOKEN_EXPIRATION_KEY);
  }
};

const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

const saveRefreshToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export {
  getAuthToken,
  saveAuthToken,
  getAuthTokenExpiration,
  saveAuthTokenExpiration,
  getRefreshToken,
  saveRefreshToken,
};
