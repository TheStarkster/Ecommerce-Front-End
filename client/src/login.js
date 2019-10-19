import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="Login-Root">
                <input type="text" placeholder="Full Name" id="name"></input>
                <input type="email" placeholder="Email" id="email"></input>
                <input type="password" placeholder="Password" id="password"></input>
            </div>
        )
    }
}
