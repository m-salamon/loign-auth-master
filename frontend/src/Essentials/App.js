import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';
import ForgotPassword from '../screens/ForgotPassword';
import Verify from '../components/Verify';
import Profile from '../screens/Profile';
import ErrorPage from './ErrorPage';
import PrivateRoute from './PrivateRoute';
import LogOut from './LogOut';


class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await this.props.authenticate()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div>
              <Link to={'/login'}><button className="btn">Login</button> </Link>
              <Link to={'/logout'}><button className="btn">LogOut</button> </Link>
              <Link to={'/signup'}><button className="btn">Signup</button> </Link>
              <Link to={'/resetPassword'}><button className="btn">Reset Password</button> </Link>
              <Link to={'/forgotPassword'}><button className="btn">Forgot Password</button> </Link>
              <Link to={'/profile'}><button className="btn">Profile</button> </Link>
            </div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/resetPassword/:tempToken" component={ResetPassword} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/verify/:token" component={Verify} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />
              <Route exact path="/logout" component={LogOut} />

              <PrivateRoute exact path="/profile" component={Profile} authed={this.props.authenticated} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ authenticated }) {
  return { authenticated: authenticated }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (state) => dispatch(actions.authenticate(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);