import React, { Component } from 'react';
import '../styles.css'
import axios from 'axios'
import { UserContext } from '../../components/master/context/user'

class Login extends Component {
    static contextType = UserContext
    constructor() {
        super()
        this.state = {
            password: '',
            email: '',
            Loading: 'none',
            BlurValue: "0px"
        }
        this.handlePasswordChange = (event) => {
            this.setState({
                password: event.target.value
            })
        }
        this.handleEmailChange = (event) => {
            this.setState({
                email: event.target.value
            })
        }
        this.SubmitHandler = () => {
            this.setState({
                Loading: 'block',
                BlurValue: "4px"
            })
            axios.post('http://3.87.22.103:2024/signin', {
                email: this.state.email,
                pass: this.state.password
            })
                .then(response => {
                    if (response.data.message === "200: User Authenticated") {
                        const { UpdateUserData } = this.context
                        UpdateUserData(response.data)
                        this.props.history.push('/')
                    }
                })
        }
    }

    render() {
        return (
            <div>
                <div className="Loading-Root" style={{
                    display: this.state.Loading,
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    backgroundColor: "#00000021",
                    zIndex: '99',
                }}>
                    <img src={require('../Preloader.gif')} alt="Loading" style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        borderRadius: '100px'
                    }}></img>
                </div>
                <div className="Register-Root"
                    style={{
                        filter: 'blur(' + this.state.BlurValue + ')'
                    }}>
                    <div className="Logo">
                        <div className="panel-Dental">Dental</div>
                        <div className="panel-Stall">Stall</div>
                    </div>
                    <h2>Please Enter Credentials</h2>
                    <h5>To Sign In</h5>
                    <div className="form-field">
                        <input type="email"
                            className="email-input"
                            placeholder="Email"
                            onChange={this.handleEmailChange} />
                    </div>
                    <div className="form-field">
                        <input type="password"
                            className="password-input"
                            placeholder="Password"
                            onChange={this.handlePasswordChange} />
                    </div>
                    <button className="submit-input" onClick={this.SubmitHandler}>Sign In</button>
                    <button className="Redirect-input">Sign Up</button>
                </div>
            </div>
        );
    }
}

export default Login;