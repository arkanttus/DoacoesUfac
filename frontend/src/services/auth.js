export const TOKEN_KEY = "@airbnb-Token";

export const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser  = () => JSON.parse(localStorage.getItem('USER'))
export const setUser  = (dataUser) => localStorage.setItem('USER', JSON.stringify(dataUser));
export const getInstitution  = () => JSON.parse(localStorage.getItem('INSTITUTION'))
export const setInstitution  = (dataInstitution) => localStorage.setItem('INSTITUTION', JSON.stringify(dataInstitution));

export const login = data => {
    localStorage.setItem(TOKEN_KEY, data['token']);
    setUser(data['user'])

    if(data['user'].typeUser === 'Receptor')
        setInstitution(data['institution']);
    
};

export const logout = (props) => {
    localStorage.clear()
}