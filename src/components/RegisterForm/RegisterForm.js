import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'

// Material-ui components
import { TextField } from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.firstName && this.state.lastName && this.state.phoneNumber) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.registerUser}>
        {this.props.store.errors.registrationMessage && (
        <Snackbar open="true" autoHideDuration={6000} >
          <MuiAlert elevation={6} variant="filled" severity="warning">
            {this.props.store.errors.registrationMessage}
          </MuiAlert>
        </Snackbar>
        )}
        <div className="loginInputContainer">
          <TextField
            className="loginInput"
            fullWidth="true"
            label="New email"
            variant="outlined"
            size="small"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
        </div>
        <div className="loginInputContainer">
          <TextField
            className="loginInput"
            fullWidth="true"
            label="New Password"
            size="small"
            type="password"
            variant="outlined"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
        </div>
        <div className="loginInputContainer">
          <TextField
            className="loginInput"
            fullWidth="true"
            label="First Name"
            variant="outlined"
            size="small"
            value={this.state.firstName}
            onChange={this.handleInputChangeFor('firstName')}
          />
        </div>
        <div className="loginInputContainer">
          <TextField
            className="loginInput"
            fullWidth="true"
            label="Last Name"
            variant="outlined"
            size="small"
            value={this.state.lastName}
            onChange={this.handleInputChangeFor('lastName')}
          />
        </div>
        <div className="loginInputContainer">
          <TextField
            className="loginInput"
            fullWidth="true"
            label="Phone Number"
            variant="outlined"
            size="small"
            value={this.state.phoneNumber}
            onChange={this.handleInputChangeFor('phoneNumber')}
          />
        </div>
        <div className="formButtonContainer">
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
