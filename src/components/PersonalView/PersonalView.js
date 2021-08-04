import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function PersonalView() {
    return(
        <div>
            <p>Add Car</p>
            <p>Personal Cars</p>
        </div>
        
    )
}

export default connect(mapStoreToProps)(PersonalView);
