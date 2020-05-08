import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      email: '',
      password: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }
  handleClick(event, role) {
    var apiBaseUrl = "http://localhost:4000/";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if (this.state.first_name.length > 0 && this.state.email.length > 0 && this.state.password.length > 0) {
      var payload = {
        "nombre": this.state.first_name,
        "mail": this.state.email,
        "tipo_usuario_id": role === 'user' ? 1 : 2, 
        "pass": this.state.password
      }
      axios.post(apiBaseUrl + 'user', payload)
        .then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            var loginscreen = [];
            loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role} />);
            var loginmessage = "Iniciar sesion";
            self.props.parentContext.setState({
              loginscreen: loginscreen,
              loginmessage: loginmessage,
              buttonLabel: "Iniciar sesion",
              isLogin: true
            });
          }
          else {
            console.log("error: ", response.data.code);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      alert("Hay campos incompletos");
    }

  }
  render() {
    // console.log("props",this.props);
    var userhintText, userLabel;
    userhintText = "Email";
    userLabel = "Email";

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Registro"
            />
            <TextField
              hintText="Nombre"
              floatingLabelText="Nombre"
              onChange={(event, newValue) => this.setState({ first_name: newValue })}
            />
            <br />
            <TextField
              hintText={userhintText}
              floatingLabelText={userLabel}
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Contraseña"
              floatingLabelText="Contraseña"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event, this.props.role)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
