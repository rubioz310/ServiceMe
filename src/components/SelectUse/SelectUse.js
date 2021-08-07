import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//material-ui imports
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router';



function SelectUse() {
    const history = useHistory();
    const handlePersonal = () => {
        history.push("/personal")
    }
    const handleCompany = () => {
        
    }

  return (
    <div lassName="centerDiv">
        <Grid container spacing={3} justifyContent="flex-end" >
            <Grid item xs={12}>
                <Paper elevation={4} className="selectOption" onClick={handlePersonal}>Personal Use</Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={4} className="selectOption" onClick={handleCompany}>Company Use</Paper>
            </Grid>
        </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(SelectUse);
