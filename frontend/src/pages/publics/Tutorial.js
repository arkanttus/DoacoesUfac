import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '95vh',
        maxWidth: '960px',
        margin: 'auto',
        flexWrap: 'initial',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8%',
        [theme.breakpoints.down('xs')]: {
            minHeight: '90vh',
            marginTop: '-15%'
        }
    },
    videoContainer: {
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
        marginBottom: '-3%',
        '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '80%',
            height: '80%',
            display: 'block',
            margin: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            '& iframe': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }
        }
    }
}));

export default function Tutorial() {
    const classes = useStyles();
    return(
        <Grid container className={classes.container}>
            <h2 style={{ textAlign: 'center' }}>Como cadastrar uma instituição?</h2>
            <h2 style={{ textAlign: 'center' }}>Como me cadastrar como doador?</h2>
            <h2 style={{ textAlign: 'center' }}>Por que usar para fazer doação?</h2>
            <h2 style={{ textAlign: 'center' }}>Quem somos nós?</h2>
            {/*<div className={classes.videoContainer}>
                <iframe src='https://www.youtube.com/embed/iMRsKw7s_cY'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                />
            </div>*/}
        </Grid>
    );

}
