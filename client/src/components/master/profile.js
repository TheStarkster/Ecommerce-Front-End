import React, { Component } from 'react'
import '../../dist/styles/css/profile.css'
import Navbar from '../navbar'

class Profile extends Component {
    render() {
        return (
            <div className="Profile-Root">
                <Navbar history={this.props.history}></Navbar>
                <div className="Avatar">
                    <img src={require('../../dist/assets/icons/user-dp.jpg')} alt="User" />
                    UserName
                </div>
                <div className="Credits-Root">
                    Rs.0
                </div>
                <div className="Sub-Details">
                    <div>
                        <img src={require('../../dist/assets/icons/icons8-important-mail-96.png')} alt="Email" />
                        sample@sample.com
                    </div>
                    <div>
                        <img src={require('../../dist/assets/icons/icons8-user-location-90.png')} alt="Location" />
                        New Delhi, India
                    </div>
                    <div>
                        <img src={require('../../dist/assets/icons/icons8-phone-96.png')} alt="Contact" />
                        +91 9953XXXXX
                    </div>
                </div>
                <div className="Profile-Option-Card">
                    <div className="Option-Card">
                        <img src={require('../../dist/assets/icons/icons8-user-64.png')} alt="Option" />
                        Personal Settings
                    </div>
                    <div className="Option-Card">
                        <img src={require('../../dist/assets/icons/icons8-purchase-order-96.png')} alt="Option" />
                        Your Orders
                    </div>
                    <div className="Option-Card">
                        <img src={require('../../dist/assets/icons/icons8-wallet-96.png')} alt="Option" />
                        Payments
                    </div>
                    <div className="Option-Card">
                        <img src={require('../../dist/assets/icons/icons8-wish-list-96.png')} alt="Option" />
                        Wishlist
                    </div>
                    <div className="Option-Card">
                        <img src={require('../../dist/assets/icons/icons8-notification-96.png')} alt="Option" />
                        Notifications
                    </div>
                    <div className="Option-Card">
                        <img src={require('../../dist/assets/icons/icons8-settings-96.png')} alt="Option" />
                        Settings
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile