import React, { Component } from 'react'
import '../dist/styles/css/profile-account.css'

export default class ProfileAccount extends Component {
    render() {
        return (
            <div className="Profile-Account-Root">
                <div className="input-catagory">
                    General
                    <div className="hr"></div>
                </div>
                <input type="text" placeholder="Full Name"></input>
                <input type="email" placeholder="Email"></input>
                <input type="number" placeholder="Contact"></input>
                <div className="input-catagory">
                    Password
                    <div className="hr"></div>
                </div>
                <input type="Password" placeholder="Old Password"></input>
                <input type="Password" placeholder="New Password"></input>
                <input type="Password" placeholder="New Password"></input>
                <div className="input-catagory">
                    Address
                    <div className="hr"></div>
                </div>
                <div className="Address-Root">
                    <div className="default-address">
                        <ul style={{opacity:0.8}}>
                            <li>
                                Name
                            </li>
                            <li>
                                Contact
                            </li>
                            <li>
                                City
                            </li>
                            <li>
                                State
                            </li>
                            <li>
                                Street
                            </li>
                            <li>
                                Postal Code
                            </li>
                        </ul>
                        <ul>
                            <li>
                                Name
                            </li>
                            <li>
                                Contact
                            </li>
                            <li>
                                City
                            </li>
                            <li>
                                State
                            </li>
                            <li>
                                Street
                            </li>
                            <li>
                                Postal Codesdfsdfsdfsfsfsdfsfsf
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
