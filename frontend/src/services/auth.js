export const TOKEN_KEY = "@altF4-Token";

export const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser  = () => JSON.parse(localStorage.getItem('USER'))
export const setUser  = (dataUser) => localStorage.setItem('USER', JSON.stringify(dataUser));
export const getInstitution  = () => JSON.parse(localStorage.getItem('INSTITUTION'))
export const setInstitution  = (dataInstitution) => localStorage.setItem('INSTITUTION', JSON.stringify(dataInstitution));

export const login = email => {
    const data = {
        user: {
            email: "user@email.com",
            name: "User 1",
            isActive: true,
            uf: 'Acre',
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        },
        institution: {
            id:1,
            name:'Cara louco',
            owner:{
                id:1,
                email: 'ropgeroin@gmail.com',
                cpf: '673.681.530-41',
                name: 'rogerin',
                isActive:true,
                dateJoined:true,
                emailConfirm:true,
                shareEmail:false,
                sharePhone:false,
                phoneNumber:'68999999999',
                typeUser: 'Receptor',
                uf: 'Acre',
                city: 'Rio Branco',
                totalDonations:0,
                image:null
            },
            typeInstitution: 'L�der de Bairro',
            image: 'https://doacao.ufac.br/media/institution/46b63e52-a072-4727-8133-95a21acef985_Cara_louco.png',
            description: 'RIO BRANCO',
            latitude: -9.980230909669002,
            longitude: -67.82715289467892,
            linkTwitter: null,
            linkInstagram: null,
            linkFacebook: null,
            uf: 'Acre',
            city: 'Rio Branco',
            needDonates:[
                {
                    id:1,
                    description: '',
                    typeDonate:{
                        id:1,
                        name: 'Material de higiene pessoal'
                    },
                },
                {
                    id:2,
                    description: '',
                    typeDonate:{
                        id:2,
                        name: 'Dinheiro'
                    },
                }
            ],
            otherType:null,
            countDonates:0
        }
    }
    data['user'].typeUser = email.includes("doador") ? 'Doador' : 'Receptor'

    localStorage.setItem(TOKEN_KEY, data['token']);
    setUser(data['user'])

    if(data['user'].typeUser === 'Receptor')
        setInstitution(data['institution']);
    
};

export const logout = (props) => {
    localStorage.clear()
}