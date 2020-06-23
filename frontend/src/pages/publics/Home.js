import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//Components
import InitialNavBar from '../../components/InitialNavbar';
import Button from '../../components/Button';
import Footer from '../../components/InitialFooter';

//Fotos
import DaricelioImg from '../../assets/team/member10.jpg';
import AldirImg from '../../assets/team/member3.jpeg';
import BarbaraImg from '../../assets/team/member2.jpeg';
import LeoImg from '../../assets/team/member1.jpeg';
import LucasImg from '../../assets/team/member4.jpeg';
import AndrielleImg from '../../assets/team/member9.jpeg';
import BrunoImg from '../../assets/team/member5.jpeg';
import JhonatanImg from '../../assets/team/member7.jpg';
import ItaloImg from '../../assets/team/member8.jpeg';
import ThalissonImg from '../../assets/team/member6.jpg';
import InstagramLogo from '../../assets/instagram-logo.png';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '95vh',
        flexWrap: 'initial',
        flexDirection: 'column',
        paddingTop: '10vh',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '8vh',
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: '90vh',
        }
    },
    containerWhite: {
        margin: '1.5rem 3rem',
        [theme.breakpoints.down('xs')]: {
            margin: '0 .5rem'
        }
    },
    containerBlue: {
        backgroundColor: '#2365A3',
        margin: '1rem 3rem',
        borderRadius: 50,
        [theme.breakpoints.down('xs')]: {
            margin: '1rem 0',
            borderRadius: 0,
        }
    },
    titulo: {
        textAlign: 'center',
        fontSize: '3rem',
        margin: '.5em 0',
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.3rem'
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '2.5rem'
        }
    },
    paragrafo: {
        fontSize: '1.3rem',
        margin: '2%',
        [theme.breakpoints.down('xs')]: {
            margin: '1em 0em',
            textAlign: 'center'
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '2rem',
        }
    },
    paragrafo2: {
        fontSize: '1.6rem',
        margin: '2rem 2rem',
        [theme.breakpoints.down('xs')]: {
            margin: '1em 0em',
            textAlign: 'center'
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.7rem',
            margin: '2rem 2rem'
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '2rem',
            margin: '5rem 3rem'
        }
    },
    paragrafo3: {
        fontSize: '1.6rem',
        textAlign: 'center',
        margin: '1rem 4rem',
        [theme.breakpoints.down('xs')]: {
            margin: '1rem 1rem'
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.7rem',
            margin: '2rem 10rem'
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '2rem',
            margin: '2rem 25rem',
        }
    },
    paragrafo4: {
        fontSize: '2.2rem',
        textAlign: 'center',
        margin: "2rem 1rem 1.5em 1rem",
        [theme.breakpoints.up('md')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.7rem',
            margin: "2rem 2rem 4rem 2rem"
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '2rem',
            margin: "4rem 2rem 4rem 2rem",
        }
    },
    videoContainer: {
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }
    },
    button: {
        fontSize: '1.4rem',
        [theme.breakpoints.up('xl')]: {
            fontSize: '1.8rem'
        }
        
    },
    imgMember: {
        borderRadius: '50%',
        width: 100,
        height: 100,
        display: 'block',
        margin: 'auto',
    },
    nameMember: {
        fontSize: 18,
        textAlign: 'center',
        margin: 5,
        wordSpacing: '9999rem', //Uma palavra por linha
        color: '#000'
    },
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        paddingTop: 35,
        '&:hover': {
            color: '#e5e5e5'
        }
    },
    instagramLogo: {
        maxWidth: '20%'
    },
    image1: {
        width: '100%',
        height: '100%',
        borderRadius: '45px 150px 150px 45px',
        [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
            width: '97%',
            display: 'block',
            margin: '1rem auto 0 auto'
        },
        [theme.breakpoints.up('xl')]: {
            width: '70%',
        }
    }

}));

export default function Home(props) {
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>
            <InitialNavBar />
            <Grid container  id="inicio" style={{ height: 'fit-content' }}>
                <Grid container style={{ backgroundImage: `url(${"/images/BG.png"})`, display: 'flex', alignItens: 'center', color: '#FFF', flexDirection: 'column', padding: '4rem 0rem', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                    <p className={classes.titulo} style={{ fontWeight: 'bold' }}>Diversas instituições carecem de<br/>recursos básicos que você pode doar.</p>
                    <p className={classes.titulo} style={{ color: '#DAE1E7' }}>Gostaria de contribuir para a sustentação<br/>de alguma instituição?</p>
                    <Button variant="green" className={classes.button} onClick={() => props.history.push('/doador')} style={{ width: 'fit-content', display: 'block', margin: '1em auto' }}>Quero ser doador</Button>
                </Grid>
                {/*Como posso doar?*/}
                <Grid container id="como-doar" className={classes.containerWhite}>
                    <Grid item xs={12} md={6} lg={7} style={{ display: 'flex', flexDirection: 'column',alignItems: 'center' }}>
                        <p className={classes.titulo}>Como posso doar?</p>
                        <p className={classes.paragrafo}>
                            Para fazer uma doação, basta fornecer alguns dados, selecionar uma instituição e entrar em contato com um responsável.
                            <p>O cadastro é importante para recomendarmos de maneira justa as instituições que receberam poucas doações.</p>
                        </p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={5} style={{ width: '100%', height: '100%', paddingTop: 10 }}>
                        <div className={classes.videoContainer}>
                        <iframe src='https://youtube.com/embed/toxC0kbiK2w'
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            title='video'
                            width="560"
                            height="349"
                        />
                        </div>
                    </Grid>
                </Grid>
                {/*Conheça as instituições*/}
                <Grid container id="instituicoes" className={classes.containerBlue}>
                    <Grid item xs={12} md={5} lg={6}>
                        <img alt="imagem" className={classes.image1} src="/images/mapa_bg.png" />
                    </Grid>
                    <Grid item xs={12} md={7} lg={6} style={{ color: 'white' }}>
                        <p className={classes.titulo} style={{ fontWeight: "bold" , marginTop: '3.5rem'}}>Conheça as instituições</p>
                        <p className={classes.paragrafo4}>Veja quais instituições estão<br/>próximas à sua localização para facilitar o processo.</p>
                        <Button variant="yellow"  className={classes.button} onClick={() => props.history.push('/instituicao')} style={{ width: 'fit-content', display: 'block', margin: '0 auto 1em auto' }}>Quero conhecer</Button>
                    </Grid>
                </Grid>
                {/*Como podemos receber doações?*/}
                <Grid container className={classes.containerWhite}>
                    <Grid item xs={12} md={7}>
                        <p className={classes.titulo}>Como podemos receber doações?</p>
                        <p className={classes.paragrafo2}>Para receber uma doação, basta cadastrar a instituição, esperar a confirmação das informações e aguardar as doações.</p>
                        <Button variant="green" className={classes.button} onClick={() => props.history.push('/dashboard')} style={{ width: 'fit-content', display: 'block', margin: '0 auto 1em auto' }}>Junte-se a nós!</Button>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <div className={classes.videoContainer}>
                            <iframe src='https://www.youtube.com/embed/Nq6VYOTRX8M'
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title='video'
                                width="560"
                                height="349"
                            />
                        </div>
                    </Grid>
                </Grid>
                {/*Sobre o projeto*/}
                <Grid container id="sobre" className={classes.containerBlue} style={{ color: 'white' }}>
                    <Grid item xs={12}>
                        <p className={classes.titulo}>Sobre o projeto</p>
                        <p className={classes.paragrafo3}>
                        O doAÇÃO é um projeto que nasceu na associação entre acadêmicos do Curso de Medicina e 
                        Sistemas de Informação da Universidade Federal do Acre - UFAC. Diante da situação mundial 
                        em que vivemos, têm-se a necessidade de demonstrar que ainda há esperança no mundo, que juntos 
                        podemos fazer a diferença. Dessa forma, doAÇÃO visa facilitar o encontro de quem deseja fazer o 
                        bem e de quem precisa de ajuda. Tanto instituições que necessitem de doações como potenciais 
                        doadores poderão se cadastrar na plataforma e, assim, se conectarem. O mesmo irá funcionar a 
                        nível nacional, então se você ai do outro lado da tela conhece alguma instituição que necessite 
                        de auxílio, sendo ele alimentos, produtos de higiene ou financeiro, compartilhe o link do site.
                        </p>
                        <p style={{ textAlign: 'center', fontSize: '1.5rem', margin: '1.5rem 1rem', fontStyle: 'italic' }}>“Seja a mudança que você quer ver no mundo.”<br/>Mahatma Gandhi</p>
                        <Grid item xs={6} md={2} style={{ display: 'flex', margin: '1.5rem auto' }}>
                            <a href="https://www.instagram.com/doacao.ufac/" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 0 }}>
                                <img alt="" src={InstagramLogo} className={classes.instagramLogo} />
                                <label style={{ fontStyle: 'italic', fontSize: '130%', paddingLeft: 10, cursor: 'pointer' }}>doAção</label>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
                {/*Equipe*/}
                <Grid container className={classes.containerWhite}>
                    <p className={classes.titulo} style={{ display: 'block', margin: 'auto' }}>Equipe</p>
                    <p className={classes.paragrafo3}>Este é um projeto de causa social desenvolvido por discentes e docentes da Universidade Federal do Acre dos cursos de Medicina e Sistemas de Informação.</p>
                    <Grid item xs={6} md={2} style={{ display: 'block', margin: 'auto'}}>
                        <a href="https://daricelio.github.io/" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                            <img src={DaricelioImg} alt="" className={classes.imgMember} />
                            <h5 className={classes.nameMember}>Daricélio Soares</h5>
                        </a>
                    </Grid>
                    <Grid container style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://www.instagram.com/aldirfi/?igshid=tszcqdq74t60" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={AldirImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Aldir Filho</h5>
                            </a>
                        </Grid>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://instagram.com/babiolivv?igshid=85nxdi50a6fm" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={BarbaraImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Bárbara Oliveira</h5>
                            </a>
                        </Grid>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://www.instagram.com/leonardmes/?igshid=1ut8f6914afvv" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={LeoImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Leonardo Medeiros</h5>
                            </a>
                        </Grid>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://www.instagram.com/llucas_r_a/?igshid=4lmdgza2hyfp" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={LucasImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Lucas Angst</h5>
                            </a>
                        </Grid>
                    </Grid>
                    <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://github.com/andriellelima" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={AndrielleImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Andrielle Lima</h5>
                            </a>
                        </Grid>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://github.com/bruunotrindade" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={BrunoImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Bruno Trindade</h5>
                            </a>
                        </Grid>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://github.com/arkanttus" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={ItaloImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Ítalo Oliveira</h5>
                            </a>
                        </Grid>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://github.com/JhonatanPatrocinio" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={JhonatanImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Jhonatan Patrocínio</h5>
                            </a>
                        </Grid>
                        <Grid item xs={6} sm={2} lg={2} xl={1}>
                            <a href="https://github.com/Tony-Starkus" target="_blank" rel="noopener noreferrer" className={classes.noLinkStyle}>
                                <img src={ThalissonImg} alt="" className={classes.imgMember} />
                                <h5 className={classes.nameMember}>Thalisson Bandeira</h5>
                            </a>
                        </Grid>
                    </Grid>
                    
                </Grid>

            </Grid>
            <Footer style={{ backgroundColor: '#27496D', color: '#FFF', marginTop: '1rem' }} />
        </Grid>
    );
}
