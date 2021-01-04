import React from 'react';
import ReactLoading from 'react-loading';
import Grid from '@material-ui/core/Grid';

export default function WaitLoading(props) {

    if(props.isLoading === true && props.useGrid)
        return (
            <Grid container item xs={12} alignItems="center" justify="center" direction="column" style={{ marginTop: '15%' }}>
                <ReactLoading type={props.type} color="#247BA0"/>
            </Grid>
        )
    else if(props.isLoading === true)
        return (
            <ReactLoading type={props.type} color="#247BA0" style={props.style}/>
        );
    else
        return props.children

}
