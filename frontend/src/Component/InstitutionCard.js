import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: '#e5e5e5'
        }
    },
    title: {
        color: "#247BA0"
    }
}));

export default function InstitutionCard(props) {
    const classes = useStyles();
    return(
        <Card>
            <CardActionArea>
                <CardMedia component="img" height="190" image={props.photo}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.title}>
                        {props.title}
                    </Typography>

                    { props.text ? (
                        <Typography variant="body2" color="textSecondary" component="p">{props.text}</Typography>
                    ) : (
                        <></>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );

}
