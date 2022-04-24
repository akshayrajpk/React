import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Dashboard from './components/dashboard'
import Editprofile from './components/editprofile'
import AddUser from './components/addUser'
import DisplayUser from './components/displayUser'
import EditUser from './components/editUser'
import PasswordUpdate from './components/passwordUpdate'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}


  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/editprofile" component={Editprofile} />
      <Route exact path="/adduser" component={AddUser} />
      <Route exact path="/displayuser" component={DisplayUser} />
      <Route exact path="/edituser" component={EditUser} />
      <Route exact path="/updatepassword" component={PasswordUpdate} />
    </Switch>
  </Router>

  </React.StrictMode>,
  document.getElementById('root')
);



reportWebVitals();
