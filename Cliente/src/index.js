import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route , Switch } from "react-router-dom";
import PrivateRoute from './_Helpers/PrivateRoute';
import Home from './Pages/HomePage/HomePage'
import Login from './Pages/LoginPage/LoginPage';
import Register from './Pages/RegisterPage/RegisterPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import RecoveryPage from './Pages/RecoveryPage/RecoveryPage';
import _404 from './Pages/_404/_404';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
           <Route path="/" exact component={ Login }/>
           <Route path="/SignIn" exact component={ Login }/>
           <Route path="/SignUp" exact component={ Register }/>
           <PrivateRoute component={Home} path="/home" exact />
           <PrivateRoute component={ ProfilePage } path="/profile/:id" exact/>
           <Route path="/recovery/:id" component={ RecoveryPage }/>
           <Route path="/recovery" component={ RecoveryPage }/>
           <Route component={_404} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))