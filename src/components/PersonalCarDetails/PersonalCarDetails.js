import React, { useEffect, useState} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import dayjs from 'dayjs';

//Material-ui imports
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function PersonalCarDetails () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const carDetails = useSelector(store => store.car.carDetails);
    const [open, setOpen] = useState(false);

    useEffect(()=> {
        dispatch({
            type: 'FETCH_CAR_DETAILS',
            payload: id
        })
      },[]);

    const handleDelete = () =>{
        dispatch({
            type: 'DELETE_CAR',
            payload: id
        })
        history.push('/personal')
    }
    const handleUpdate = () =>{
        history.push(`/updateCar/${id}`)
    }
    //This two are for opening and closing dialog alert
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Paper className="carDetails">
                <Grid container justifyContent="center" alignItems="center" spacing={6}>
                    <Grid container item xs={12} md={6} justifyContent="center" alignItems="center" >
                        <img src={carDetails.photo_url} className="carDetailsPreview"/>
                    </Grid>
                    <Grid container item xs={12} md={6} justifyContent="center" alignItems="center">
                        <div>
                            <p>Make: {carDetails.make}</p>
                            <p>Model: {carDetails.model}</p>
                            <p>Year: {carDetails.year}</p>
                            <p>Last Service: {dayjs(carDetails.last_service).format('MM/DD/YYYY')}</p>
                            <p>Next Service: {dayjs(carDetails.last_service).add(6,'M').format('MM/DD/YYYY')}</p>
                            <button onClick={handleClickOpen}>Delete</button>
                            <button onClick={handleUpdate}>Update</button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
            
            {/* Dialog alert when deleting feedback */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete car</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Once deleted you would not be able to recover it
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default connect(mapStoreToProps)(PersonalCarDetails);
