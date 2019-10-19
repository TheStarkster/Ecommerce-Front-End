import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FourOFour from '../404'
import Login from '../auth/login/login'
import Register from '../auth/register/register'
class Paths extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/SignIn" component={Login} />
                    <Route path="/Register" component={Register} />
                    <Route path="/SignUp" component={Register} />
                    <Route path="*" component={FourOFour} />
                </Switch>
            </div>
        )
    }
}
export default Paths