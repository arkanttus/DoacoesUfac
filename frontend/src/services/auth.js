export const TOKEN_KEY = "@altF4-Token";

export const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser  = () => JSON.parse(localStorage.getItem('USER'))
export const setUser  = (dataUser) => localStorage.setItem('USER', JSON.stringify(dataUser));
export const getInstitution  = () => JSON.parse(localStorage.getItem('INSTITUTION'))
export const setInstitution  = (dataInstitution) => localStorage.setItem('INSTITUTION', JSON.stringify(dataInstitution));

export const login = data1 => {
    const data = {
        user: {
            email: "user@email.com",
            name: "User 1",
            isActive: true,
            typeUser: "Donator",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }
    }
    localStorage.setItem(TOKEN_KEY, data['token']);
    setUser(data)

    if(data['user'].typeUser === 'Receptor')
        setInstitution(data['institution']);
    
};

export const logout = (props) => {
    localStorage.clear()
}