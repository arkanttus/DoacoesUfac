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
        paddingTop: '12vh',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '8vh',
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: '90vh'
        }
    },
    videoContainer: {
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '50.25%',
        marginBottom: '-5%',
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
                marginBottom: '-3%',
                top: 0,
                left: 0,
                width: '98%',
                height: '100%'
            }
        }
    },
    title: {
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '8%'
        }
    },
    fixFooter: {
        [theme.breakpoints.down('sm')]: {
            height: '5vh'
        }
    }
}));

export default function Help() {
    const classes = useStyles();
    return(
        <Grid container className={classes.container}>
            <h2 className={classes.title}>Introdução ao projeto</h2>
            <div className={classes.videoContainer}>
                <iframe src='https://www.youtube.com/embed/nGOQ94bRcvI'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                />
            </div>
            <h2 className={classes.title}>Como cadastrar a instituição</h2>
            <div className={classes.videoContainer}>
                <iframe src='https://www.youtube.com/embed/Nq6VYOTRX8M'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                />
            </div>
            <h2 className={classes.title}>Cadastrando-se como doador</h2>
            <div className={classes.videoContainer}>
                <iframe src='https://www.youtube.com/embed/uZcDQ1ZLOJQ'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                />
            </div>
            <h2 className={classes.title}>Como doar</h2>
            <div className={classes.videoContainer}>
                <iframe src='https://www.youtube.com/embed/toxC0kbiK2w'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                />
            </div>
            <div className={classes.fixFooter}></div>
        </Grid>
    );

}