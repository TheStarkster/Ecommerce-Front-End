import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import FourOFour from '../404'
import Login from '../auth/login/login'
import Register from '../auth/register/register'
import Home from '../components/home'
import Profile from '../components/master/profile'
import Cart from '../components/master/context/cart'
import User from '../components/master/context/user'
import ProductPage from '../components/product-page'
import Checkout from '../components/checkout'
class Paths extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/SignIn" component={Login} />
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/SignUp" component={Register} />
                </Switch>
                <Switch>
                    <User>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Cart>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/product" component={ProductPage} />
                            <Route exact path="/checkout" component={Checkout} />
                        </Cart>
                    </User>
                </Switch>
            </div>
        )
    }
}
export default Paths