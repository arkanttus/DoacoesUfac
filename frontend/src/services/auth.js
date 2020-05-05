export const TOKEN_KEY = "@airbnb-Token";

export const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser  = () => JSON.parse(localStorage.getItem('USER'))
export const getInstitution  = () => JSON.parse(localStorage.getItem('INSTITUTION'))
export const setUser  = (data) => localStorage.setItem('USER', JSON.stringify(data));

export const login = data => {
    localStorage.setItem(TOKEN_KEY, data['token']);
    localStorage.setItem('USER', JSON.stringify(data['user']));
    if(data['user'].typeUser === 'Receptor')
        localStorage.setItem('INSTITUTION', JSON.stringify(data['institution']));
    
};

export const logout = (props) => {
    localStorage.clear()
}