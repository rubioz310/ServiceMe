import React, { useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-ui imports
import { Paper } from '@material-ui/core';



function PersonalCarDetails () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const carDetails = useSelector(store => store.car.car);

    useEffect(()=> {
        dispatch({
            type: 'FETCH_CAR_DETAILS',
            payload: id
        })
      },[]);

    return(
        <Paper>
            <img src={carDetails.photo_url}/>
            <p>{carDetails.make}</p>
            <p>{carDetails.model}</p>
            <p>{carDetails.year}</p>
            <p>{carDetails.last_service}</p>
        </Paper>
    )
}

export default connect(mapStoreToProps)(PersonalCarDetails);
