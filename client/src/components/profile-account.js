import React, { Component } from 'react'
import '../dist/styles/css/profile-sub-parts.css'
import axios from 'axios'
import { UserContext } from './master/context/user'

export default class ProfileAccount extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props)
        this.state = {
            UpdateAddress: false
        }
        this.componentDidMount = () => {
            const { UserData } = this.context
            document.getElementById('name').value = UserData.name
            document.getElementById('email').value = UserData.email
            document.getElementById('contact').value = UserData.contact === undefined ? "" : UserData.contact
        }
    }
    UpdatePersonalDetails() {
        document.getElementById('UpdatePersonalDetail').innerText = "Updating..."
        const { UserData, UpdateUserData } = this.context
        UserData.name = document.getElementById('name').value
        UserData.email = document.getElementById('email').value
        UserData.contact = document.getElementById('contact').value
        axios.post('http://3.87.22.103:2024/user/update', {
            id: UserData._id,
            name: UserData.name,
            email: UserData.email,
            contact: UserData.contact,
        })
            .then(response => {
                document.getElementById('UpdatePersonalDetail').innerHTML = "Update"
                UpdateUserData(UserData)
            })
    }
    UpdatePassword() {
        document.getElementById('UpdatePassBtn').innerText = "Updating..."
        const { UserData } = this.context
        if (document.getElementById('new-pass').value === document.getElementById('new-pass-confirm').value) {
            axios.post('http://3.87.22.103:2024/user/update-password', {
                id: UserData._id,
                oldpass: document.getElementById('old-pass').value,
                newpass: document.getElementById('new-pass').value
            })
                .then(response => {
                    if (response.data.message === "Wrong Old Password") {
                        document.getElementById('UpdatePassBtn').innerText = "Wrong Password"
                        setTimeout(() => {
                            document.getElementById('UpdatePassBtn').innerText = "Update"
                        }, 2000)
                    } else {
                        document.getElementById('UpdatePassBtn').innerText = "Update"
                    }
                })
        } else {
            document.getElementById('UpdatePassBtn').innerText = "Fields Didn't Match!"
            setTimeout(() => {
                document.getElementById('UpdatePassBtn').innerText = "Update"
            }, 2000)
        }
    }
    UpdateAddress() {
        this.setState({
            UpdateAddress: true
        })
        document.getElementById('UpdateAddressBtn').innerText = "Updating..."
    }
    SaveAddress() {
        const { UserData, UpdateUserData } = this.context
        var NewUserObject = UserData
        if (document.getElementById('name1').value !== "" || document.getElementById('email1').value !== "" || document.getElementById('contact1').value !== "" || document.getElementById('city').value !== "" || document.getElementById('state').value !== "" || document.getElementById('street').value !== "" || document.getElementById('pincode').value !== "") {
            console.log(UserData)
            NewUserObject.address = [
                {
                    default: {
                        address: {
                            name: document.getElementById('name1').value,
                            email: document.getElementById('email1').value,
                            contact: document.getElementById('contact1').value,
                            city: document.getElementById('city').value,
                            state: document.getElementById('state').value,
                            street: document.getElementById('street').value,
                            pincode: document.getElementById('pincode').value,
                        }
                    }
                }
            ]
            axios.post('http://3.87.22.103:2024/user/update-address', {
                id: UserData._id,
                address: NewUserObject.address
            })
                .then(response => {
                    if (response.data.message === "Updated") {
                        this.setState({
                            UpdateAddress: false
                        }, () => {
                            UpdateUserData(NewUserObject)
                        })
                        document.getElementById('UpdateAddressBtn').innerText = "Update"
                    }
                })
        } else {
            alert("Please Fill All The Fields!")
        }
    }
    render() {
        const { UserData } = this.context
        return (
            <div className="Profile-Sub-Parts-Root">
                <div className="input-catagory">
                    General
                    <div className="hr"></div>
                </div>
                <input type="text" id="name" placeholder="Full Name"></input>
                <input type="email" id="email" placeholder="Email"></input>
                <input type="number" id="contact" placeholder="Contact"></input>
                <button className="UpdateBtn" id="UpdatePersonalDetail" onClick={() => this.UpdatePersonalDetails()}>Update</button>
                <div className="input-catagory">
                    Password
                    <div className="hr"></div>
                </div>
                <input type="Password" id="old-pass" placeholder="Old Password"></input>
                <input type="Password" id="new-pass" placeholder="New Password"></input>
                <input type="Password" id="new-pass-confirm" placeholder="New Password Again"></input>
                <button className="UpdateBtn" id="UpdatePassBtn" onClick={() => this.UpdatePassword()}>Update</button>
                {
                    this.state.UpdateAddress ?
                        <div className="Profile-Sub-Parts-Root Update-Address-Container">
                            <div className="input-catagory">
                                Update
                    <div className="hr"></div>
                            </div>
                            <input type="text" id="name1" placeholder="Full Name"></input>
                            <input type="email" id="email1" placeholder="Email"></input>
                            <input type="number" id="contact1" placeholder="Contact"></input>
                            <input type="text" id="city" placeholder="City"></input>
                            <input type="text" id="state" placeholder="State"></input>
                            <input type="text" id="street" placeholder="Street"></input>
                            <input type="number" id="pincode" placeholder="Postal Code"></input>
                            <button className="Save-Address-Btn" onClick={() => this.SaveAddress()}>Save Address</button>
                        </div>
                        :
                        <div>
                            <div className="input-catagory">
                                Address
                    <div className="hr"></div>
                            </div>
                            <div className="Address-Root">
                                <div className="default-address">
                                    <ul style={{ opacity: 0.8 }}>
                                        <li>
                                            Name
                            </li>
                                        <li>
                                            Email
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
                                    {
                                        UserData.address === undefined ?
                                            <ul>
                                                <li>
                                                    Name
                                </li>
                                                <li>
                                                    Email
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
                                            :
                                            <ul>
                                                <li>{UserData.address[0].default.address.name}</li>
                                                <li>{UserData.address[0].default.address.email}</li>
                                                <li>{UserData.address[0].default.address.contact}</li>
                                                <li>{UserData.address[0].default.address.city}</li>
                                                <li>{UserData.address[0].default.address.state}</li>
                                                <li>{UserData.address[0].default.address.street}</li>
                                                <li>{UserData.address[0].default.address.pincode}</li>
                                            </ul>
                                    }

                                </div>
                            </div>
                        </div>
                }
                <button className="UpdateBtn" id="UpdateAddressBtn" onClick={() => this.UpdateAddress()}>Update</button>
            </div>
        )
    }
}
