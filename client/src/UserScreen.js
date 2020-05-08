import React, { Component } from 'react';
import './App.css';
/*
Screen:LoginScreen
Loginscreen is the main screen which the user is shown on first visit to page and after
hitting logout
*/
import LoginScreen from './Loginscreen';
/*
Module:Material-UI
Material-UI is used for designing ui of the app
*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import axios from 'axios';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

var apiBaseUrl = "http://localhost:4000";
/*
Module:Dropzone
Dropzone is used for local file selection
*/
import Dropzone from 'react-dropzone';
/*
Module:superagent
superagent is used to handle post/get requests to server
*/
var request = require('superagent');

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'user',
      tickets: []
    }
  }
  componentWillMount() {
    // console.log("prop values",this.props.role);
    var self = this;

    if (this.state.usuario_id) {
      // tomar usuario id del state
      axios.get(apiBaseUrl + '/tickets?userId=' + this.state.usuario_id)
        .then(function (response) {
          console.log(response);
          if (response.data.code == 200) {
            console.log("Tickets ok: ", response);

            self.props.appContext.setState({ tickets: response });
          }
          else {
            console.log("No hay tickets");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  /*
    Function:handleClick
    Parameters: event
    Usage:This fxn is handler of submit button which is responsibel fo rhandling file uploads
    to backend
  */
  handleClick(event) {
    // console.log("handleClick",event);
    // this.setState({ printingmessage: "Please wait until your files are being printed", printButtonDisabled: true })
    var self = this;

    // asignar ticket a si mismo


    // if (this.state.filesToBeSent.length > 0) {
    //   var filesArray = this.state.filesToBeSent;
    //   var req = request.post(apiBaseUrl + 'fileprint');
    //   for (var i in filesArray) {
    //     // console.log("files",filesArray[i][0]);
    //     req.attach(filesArray[i][0].name, filesArray[i][0])
    //   }
    //   req.end(function (err, res) {
    //     if (err) {
    //       console.log("error ocurred");
    //     }
    //     console.log("res", res);
    //     self.setState({ printingmessage: '', printButtonDisabled: false, filesToBeSent: [], filesPreview: [] });
    //     alert("File printing completed")
    //     // self.props.indexthis.switchPage();
    //   });
    // }
    // else {
    //   alert("Please upload some files first");
    // }
  }
  /*
    Function:toggleDrawer
    Parameters: event
    Usage:This fxn is used to toggle drawer state
    */
  toggleDrawer(event) {
    // console.log("drawer click");
    this.setState({ draweropen: !this.state.draweropen })
  }
  /*
    Function:toggleDrawer
    Parameters: event
    Usage:This fxn is used to close the drawer when user clicks anywhere on the 
    main div
    */
  handleDivClick(event) {
    // console.log("event",event);
    if (this.state.draweropen) {
      this.setState({ draweropen: false })
    }
  }
  /*
    Function:handleLogout
    Parameters: event
    Usage:This fxn is used to end user session and redirect the user back to login page
    */
  handleLogout(event) {
    // console.log("logout event fired",this.props);
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this.props.appContext} />);
    this.props.appContext.setState({ loginPage: loginPage, uploadScreen: [] })
  }
  render() {
    return (
      <div className="App">
        <div onClick={(event) => this.handleDivClick(event)}>
          {/* <center>
            <div>
              You can print upto {this.state.printcount} files at a time since you are {this.state.role}
            </div>

            <Dropzone onDrop={(files) => this.onDrop(files)}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            <div>
              Files to be printed are:
          {this.state.filesPreview}
            </div>
          </center>
          <div>
            {this.state.printingmessage}
          </div> */}
          <MuiThemeProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Usuario ID</TableHeaderColumn>
                  <TableHeaderColumn>Usuario</TableHeaderColumn>
                  <TableHeaderColumn>Descripcion Ticket</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.tickets && this.state.tickets.length > 0 ? this.state.tickets.map((item, key) =>
                  <TableRow>
                    <TableRowColumn>{item}</TableRowColumn>
                    <TableRowColumn>{item}</TableRowColumn>
                    <TableRowColumn>{item}</TableRowColumn>
                    <TableRowColumn>{item}</TableRowColumn>
                  </TableRow>
                ) : ''}
              </TableBody>
            </Table>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <RaisedButton disabled={this.state.printButtonDisabled} label="Asignar ticket" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default UploadScreen;