import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

function PersonalView() {
    const history = useHistory();

    const handleAddCar = () => {
        history.push('/addCar')
    }

    return(
        <div>
            <p onClick={handleAddCar}>Add Car</p>
            <p>Personal Cars</p>
        </div>
        
    )
}

export default connect(mapStoreToProps)(PersonalView);
