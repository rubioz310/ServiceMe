import React, { useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-ui imports
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';

function prettyDate(unformattedDate) {
    const dateString = new Date(unformattedDate);

    const year = dateString.getFullYear();
    let month = (1 + dateString.getMonth()).toString() ;
    let day = dateString.getDate().toString();

    month = month.length === 1 ? '0' + month : month;
    day = day.length === 1 ? '0' + day : day;

    return month + '-' + day + '-' + year;
}

function PersonalCarDetails () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const carDetails = useSelector(store => store.car.carDetails);

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

    return(
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
                        <p>Last Service: {prettyDate(carDetails.last_service)}</p>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={handleUpdate}>Update</button>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default connect(mapStoreToProps)(PersonalCarDetails);
