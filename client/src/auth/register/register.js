import React, { Component } from 'react';
import PasswordInput from './password-input/index'
import axios from 'axios'
import { UserContext } from '../../components/master/context/user'

class Register extends Component {
    static contextType = UserContext
    constructor() {
        super()
        this.state = {
            password: '',
            email: '',
            name: ''
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

        this.handleEmailChange = (event) => {
            this.setState({
                email: event.target.value
            })
        }
        this.handleNameChange = (event) => {
            this.setState({
                name: event.target.value
            })
        }
        this.handleSubmit = (event) => {
            axios.post('http://3.87.22.103:2024/signup', {
                email: this.state.email,
                pass: this.state.password,
                name: this.state.name
            })
                .then(response => {
                    if (response.data.message === "200: Registered") {
                        const { UpdateUserData } = this.context
                        UpdateUserData({
                            name: this.state.name,
                            email: this.state.email,
                            _id: response.data.UserID,
                            address: []
                        })
                        this.props.history.push('/')
                    }
                })
        }
    }

    handlePasswordChange(event, attr) {
        const newState = { ...this.state }
        newState[attr] = event.target.value
        this.setState(newState)
    }


    render() {
        return (
            <div className="Master-Panel">
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
                    <button className="submit-input" onClick={() => this.handleSubmit()}>Sign Up</button>
                    <button className="Redirect-input" onClick={() => this.props.history.push('/login')}>Sign In</button>
                </div>
            </div>
        );
    }
}

export default Register;