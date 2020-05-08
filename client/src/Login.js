import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
var apiBaseUrl = "http://localhost:4000/";
import axios from 'axios';
import UploadPage from './UploadPage';
class Login extends Component {
  constructor(props) {
    super(props);
    var localloginComponent = [];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Contraseña"
            floatingLabelText="Contraseña"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
        </div>
      </MuiThemeProvider>
    )
    this.state = {
      username: '',
      password: '',
      menuValue: 1,
      loginComponent: localloginComponent,
      loginRole: 'user'
    }
  }
  componentWillMount() {
    if (this.props.role != undefined) {
      if (this.props.role == 'user') {
        console.log("componentWillMount de user");
        var localloginComponent = [];
        localloginComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Contraseña"
                floatingLabelText="Contraseña"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({ menuValue: 1, loginComponent: localloginComponent, loginRole: 'user' })
      }
      else if (this.props.role == 'admin') {
        console.log("componentWillMount de admin");
        var localloginComponent = [];
        localloginComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Contraseña"
                floatingLabelText="Contraseña"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({ menuValue: 2, loginComponent: localloginComponent, loginRole: 'admin' })
      }
    }
  }
  handleClick(event) {
    var self = this;
    var payload = {
      "mail": this.state.username,
      "pass": this.state.password
    }
    axios.post(apiBaseUrl + 'login', payload)
      .then(function (response) {
        console.log(response);
        if (response.data.code == 200) {
          console.log("Login ok: ", response);
          var uploadScreen = [];
          uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole} />)
          self.props.appContext.setState({ loginPage: [], 
            uploadScreen: uploadScreen, userId: response.data && response.data.length > 0 ? response.data[0].id : null })
        }
        else if (response.data.code == 204) {
          console.log("User o password no coinciden");
          alert(response.data.success)
        }
        else {
          console.log("User no existe");
          alert("User no existe");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleMenuChange(value) {
    console.log("menuvalue", value);
    var loginRole;
    if (value === 1) {
      var localloginComponent = [];
      loginRole = 'user';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Contraseña"
              floatingLabelText="Contraseña"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    else if (value === 2) {
      var localloginComponent = [];
      loginRole = 'admin';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Contraseña"
              floatingLabelText="Contraseña"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    this.setState({
      menuValue: value,
      loginComponent: localloginComponent,
      loginRole: loginRole
    })
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Login"
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div>
            <p>Login como:</p>
            <DropDownMenu value={this.state.menuValue} onChange={(event, index, value) => this.handleMenuChange(value)}>
              <MenuItem value={1} primaryText="Usuario" />
              <MenuItem value={2} primaryText="Admin" />
            </DropDownMenu>
          </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
