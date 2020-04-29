export const TOKEN_KEY = "@airbnb-Token";

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser  = () => JSON.parse(localStorage.getItem('USER'))
export const setUser  = (data) => localStorage.setItem('USER', JSON.stringify(data));

export const login = data => {
  localStorage.setItem(TOKEN_KEY, data['token']);
  localStorage.setItem('USER', JSON.stringify(data['user']));
};

export const logout = (props) => {
  localStorage.clear()
}