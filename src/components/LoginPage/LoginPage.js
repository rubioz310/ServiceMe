import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <div className="fullLogoContainer">
          <img src="images/full_white_logo.png"/>
        </div>
        <div className="formPanel">
          <LoginForm />
          <center>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                this.props.history.push('/registration');
              }}
            >
              Register
            </button>
          </center>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
