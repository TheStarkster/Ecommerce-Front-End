import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FourOFour from '../404'
import Login from '../auth/login/login'
import Register from '../auth/register/register'
import Home from '../components/home'
import Profile from '../components/master/profile'
class Paths extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/SignIn" component={Login} />
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/SignUp" component={Register} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="*" component={FourOFour} />
                </Switch>
            </div>
        )
    }
}
export default Paths