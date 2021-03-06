import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <div className="fullLogoContainer">
          <img src="images/full_white_logo.png"/>
        </div>
        <div className="formPanel">
          <RegisterForm />
          <center>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                this.props.history.push('/login');
              }}
            >
              Login
            </button>
          </center>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
