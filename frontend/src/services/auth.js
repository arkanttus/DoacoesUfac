export const TOKEN_KEY = "@altF4-Token";

export const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser  = () => JSON.parse(localStorage.getItem('USER'))
export const setUser  = (dataUser) => localStorage.setItem('USER', JSON.stringify(dataUser));
export const getInstitution  = () => JSON.parse(localStorage.getItem('INSTITUTION'))
export const setInstitution  = (dataInstitution) => localStorage.setItem('INSTITUTION', JSON.stringify(dataInstitution));

export const login = (email, password) => {
    const data = {
        user: {
            email: email,
            password: password,
            name: "Macilon Araujo Costa Neto",
            isActive: true,
            cpf: '673.681.530-41',
            phoneNumber:'68999999999',
            uf: 'Acre',
            city: 'Rio Branco',
            emailConfirm:true,
            shareEmail:false,
            sharePhone:false,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        },
    }
    data['user'].typeUser = email.includes("doador") ? 'Doador' : 'Receptor'

    localStorage.setItem(TOKEN_KEY, data['token']);
    setUser(data['user'])

    if(data['user'].typeUser === 'Receptor') {
        data['institution'] = {
            id:1,
            name:'Centro Dom Bosco',
            owner: data['user'],
            typeInstitution: 'Centro de Ensino',
            image: 'https://doacao.ufac.br/media/institution/46b63e52-a072-4727-8133-95a21acef985_Cara_louco.png',
            description: 'O Núcleo de Apoio Pedagógico Dom Bosco é uma referência na Assistência de Educação Inclusiva para crianças e adultos com deficiência',
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
        setInstitution(data['institution']);
    }
    
};

export const logout = (props) => {
    localStorage.clear()
}