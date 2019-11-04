import React, { Component } from 'react'
import '../../dist/styles/css/profile.css'
import ProfileAccount from '../profile-account'
import ProfileOrders from '../profile-orders'
import ProfileNotification from '../profile-notification'
import ProfileSettings from '../profile-settings'
import ProfileWishlist from '../profile-wishlist'
import ProfilePayments from '../profile-payments'
import { UserContext } from './context/user'

class Profile extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props)
        this.state = {
            ExpandOptionIcon: '',
            OptionExpanded: ''
        }
        this.ExpandOption = (event) => {
            if (event.target.id !== '') {
                this.setState({
                    OptionExpanded: event.target.id
                })
            }
        }
        this.ColapseOption = (event) => {
            this.setState({
                OptionExpanded: ''
            })
        }
    }
    RenderOption = () => {
        switch (this.state.OptionExpanded) {
            case 'Personal': return (
                <div className="Option-Expand-Root">
                    <h2>Profile</h2>
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileAccount></ProfileAccount>
                </div>
            )
            case 'Orders': return (
                <div className="Option-Expand-Root">
                    <h2>Orders</h2>
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileOrders></ProfileOrders>
                </div>
            )
            case 'Payments': return (
                <div className="Option-Expand-Root">
                    <h2>Payments</h2>
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfilePayments></ProfilePayments>
                </div>
            )
            case 'Wishlist': return (
                <div className="Option-Expand-Root">
                    <h2>Wishlist</h2>
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileWishlist></ProfileWishlist>
                </div>
            )
            case 'Notification': return (
                <div className="Option-Expand-Root">
                    <h2>Notifications</h2>
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileNotification></ProfileNotification>
                </div>
            )
            case 'Settings': return (
                <div className="Option-Expand-Root">
                    <h2>Settings</h2>
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileSettings></ProfileSettings>
                </div>
            )
            default: return null
        }
    }
    render() {
        const { UserData } = this.context
        return (
            <div className="Profile-Root">
                {
                    this.RenderOption()
                }
                <div className="Avatar">
                    <img src={require('../../dist/assets/icons/user-dp.jpg')} alt="User" />
                    {UserData.name}
                </div>
                <div className="Credits-Root">
                    Rs.0
                </div>
                <div className="Sub-Details">
                    <div>
                        <img src={require('../../dist/assets/icons/icons8-important-mail-96.png')} alt="Email" />
                        {UserData.email}
                    </div>
                    <div>
                        <img src={require('../../dist/assets/icons/icons8-user-location-90.png')} alt="Location" />
                        {UserData.region}
                    </div>
                    <div>
                        <img src={require('../../dist/assets/icons/icons8-phone-96.png')} alt="Contact" />
                        {UserData.contact === undefined ? "Not Provided" : UserData.contact}
                    </div>
                </div>
                <div className="Profile-Option-Card">
                    <div className="Option-Card" id="Personal" onClick={this.ExpandOption} style={{ backgroundImage: 'url(' + require('../../dist/assets/icons/icons8-user-64.png') + ')' }}>
                        Personal Settings
                    </div>
                    <div className="Option-Card" id="Orders" onClick={this.ExpandOption} style={{ backgroundImage: 'url(' + require('../../dist/assets/icons/icons8-purchase-order-96.png') + ')' }}>
                        Your Orders
                    </div>
                    <div className="Option-Card" id="Payments" onClick={this.ExpandOption} style={{ backgroundImage: 'url(' + require('../../dist/assets/icons/icons8-wallet-96.png') + ')' }}>
                        Payments
                    </div>
                    <div className="Option-Card" id="Wishlist" onClick={this.ExpandOption} style={{ backgroundImage: 'url(' + require('../../dist/assets/icons/icons8-wish-list-96.png') + ')' }}>
                        Wishlist
                    </div>
                    <div className="Option-Card" id="Notification" onClick={this.ExpandOption} style={{ backgroundImage: 'url(' + require('../../dist/assets/icons/icons8-notification-96.png') + ')' }}>
                        Notifications
                    </div>
                    <div className="Option-Card" id="Settings" onClick={this.ExpandOption} style={{ backgroundImage: 'url(' + require('../../dist/assets/icons/icons8-settings-96.png') + ')' }}>
                        Settings
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile