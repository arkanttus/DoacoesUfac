import React from 'react';
import ReactLoading from 'react-loading';
import Grid from '@material-ui/core/Grid';

export default function WaitLoading(props) {

    console.log(props.isLoading)
    return (
        <>
            {props.isLoading === true ? (
                <Grid container item xs={12} alignItems="center" justify="center" direction="column" style={{ marginTop: '15%' }}>
                    <ReactLoading type={props.type} color="#247BA0"/>
                </Grid>
            ): (
                props.children
            )}
        </>
    );

}
