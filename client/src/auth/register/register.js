import React, { Component } from 'react';
import PasswordInput from './password-input/index'

class Register extends Component {

    constructor() {
        super()
        this.state = {
            password: ''
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handlePasswordChange(event, attr) {
        const newState = { ...this.state }
        newState[attr] = event.target.value
        this.setState(newState)
    }
    handleEmailChange(event) {

    }

    render() {
        return (
            <div className="Register-Root">
                <div className="Logo">
                    <div className="panel-Dental">Dental</div>
                    <div className="panel-Stall">Stall</div>
                </div>
                <h2>Please Enter Details</h2>
                <h5>To Register</h5>
                <div className="form-field">
                    <input type="text"
                        className="name-input"
                        placeholder="Full Name"
                        onChange={this.handleNameChange} />
                </div>
                <div className="form-field">
                    <input type="email"
                        className="email-input"
                        placeholder="Email"
                        onChange={this.handleEmailChange} />
                </div>
                <PasswordInput
                    value={this.state.password}
                    placeholder="Your secure password"
                    handleChange={(e) => this.handlePasswordChange(e, 'password')}
                />
                <button className="submit-input">Sign Up</button>
                <button className="Redirect-input">Sign Up</button>
            </div>
        );
    }
}

export default Register;