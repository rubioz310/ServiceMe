import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Material-ui components
import { TextField } from '@material-ui/core';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form  onSubmit={this.login}>
        {this.props.store.errors.loginMessage && (
        <Snackbar open="true" autoHideDuration={6000} >
          <MuiAlert elevation={6} variant="filled" severity="warning">
            {this.props.store.errors.loginMessage}
          </MuiAlert>
        </Snackbar>
        )}
        <div className="loginInputContainer">
          <TextField
            className="loginInput"
            fullWidth="true"
            label="Email"
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
            label="Password"
            size="small"
            type="password"
            variant="outlined"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
        </div>
        <div className="formButtonContainer">
          <input className="btn" type="submit" name="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
