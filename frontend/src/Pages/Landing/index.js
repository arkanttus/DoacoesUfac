import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonCustom from '../../Component/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './styles.css';


export default class Landing extends Component {

    render() {
        return(
            <Grid container className="container">
                <Grid item xs={12}>
                    <nav className="navbar">
                        <ul>
                            <li>
                                <img src="images/Logo.svg" alt="logo" className="logo" />
                            </li>
                            <li>Doações</li>
                            <li>COMO AJUDAR?</li>
                            <li>INSTITUIÇÕES</li>
                        </ul>
                    </nav>
                </Grid>
                
                <Grid item xs={12} sm={5} style={{ fontSize: 30, padding: 15, textAlign: 'center' }}>
                    Gostaria de contribuir para a sustentação de alguma instituição?
                    Diversas instituições carecem de recursos básicos e que você pode doar.
                    <Grid xs={12} style={{ paddingTop: 20 }}>
                        <Grid container>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                                <ButtonCustom variant="blue">
                                    VER INSTRUÇÕES
                                </ButtonCustom>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', paddingLeft: 10 }}>
                                <ButtonCustom variant="yellow">
                                    <FavoriteIcon style={{ paddingRight: 5, width: 20 }} /> QUERO SER DOADOR
                                </ButtonCustom>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    
                </Grid>

                <Grid item xs={2}></Grid>

                <Grid item xs={12} sm={5} style={{ fontSize: 30, padding: 15, paddingTop: 35, textAlign: 'center' }}>
                    Você é responsável por alguma instituição e está necessitando de recursos? Junte-se a nós!
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
                        <ButtonCustom variant="blueDark">
                            CADASTRAR INSTITUIÇÃO
                        </ButtonCustom>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ButtonCustom variant="green">
                        ACESSAR MINHA CONTA
                    </ButtonCustom>
                </Grid>

                <Grid item xs={12}>
                    <Grid container className="footer">
                        <Grid item xs={12} sm={2}>
                            SOBRE A EQUIPE
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            CRÉDITOS
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <img src="images/Logo_ufac.svg" style={{ paddingRight: 5 }} alt="Logo Ufac" /> Universidade Federal do Acre
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            &copy; 2020. Desenvolvido por universitários
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        );
    }

}
