import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FourOFour from '../404'
import Login from '../auth/login/login'
import Register from '../auth/register/register'
import Home from '../components/home'
import Profile from '../components/master/profile'
import Cart from '../components/master/context/cart'
import ProductPage from '../components/product-page'
class Paths extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/SignIn" component={Login} />
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/SignUp" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
                <Switch>
                    <Cart>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/product" component={ProductPage} />
                    </Cart>
                </Switch>
            </div>
        )
    }
}
export default Paths