import React, { Component, createContext } from 'react'
// import axios from 'axios'

export const UserContext = createContext()
export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserData: {}
        }
        this.UpdateUserData = (UserData) => {
            this.setState({
                UserData: UserData
            }, () => {
                localStorage.removeItem('user')
                console.log(UserData)
                localStorage.setItem('user', JSON.stringify(this.state.UserData))
            })
        }
        this.componentWillMount = () => {
            console.log(this.state)
            if (localStorage.getItem('user')) {
                this.setState({
                    UserData: JSON.parse(localStorage.getItem('user'))
                })
            }
        }
    }
    render() {
        return (
            <UserContext.Provider value={{ ...this.state, UpdateUserData: this.UpdateUserData }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
