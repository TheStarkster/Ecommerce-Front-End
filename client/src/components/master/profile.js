import React, { Component } from 'react'
import '../../dist/styles/css/profile.css'
import ProfileAccount from '../profile-account'
import Navbar from '../navbar'

class Profile extends Component {
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
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileAccount></ProfileAccount>
                </div>
            )
            case 'Orders': return (
                <div className="Option-Expand-Root">
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileAccount></ProfileAccount>
                </div>
            )
            case 'Payments': return (
                <div className="Option-Expand-Root">
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileAccount></ProfileAccount>
                </div>
            )
            case 'Wishlist': return (
                <div className="Option-Expand-Root">
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileAccount></ProfileAccount>
                </div>
            )
            case 'Notification': return (
                <div className="Option-Expand-Root">
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileAccount></ProfileAccount>
                </div>
            )
            case 'Settings': return (
                <div className="Option-Expand-Root">
                    <img src={require('../../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} alt="close" onClick={() => this.ColapseOption()} />
                    <ProfileAccount></ProfileAccount>
                </div>
            )
            default: return null
        }
    }
    render() {
        return (
            <div className="Profile-Root">
                <Navbar history={this.props.history}></Navbar>
                {
                    this.RenderOption()
                }
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
                    <div className="Option-Card" id="Personal" onClick={this.ExpandOption}>
                        <img src={require('../../dist/assets/icons/icons8-user-64.png')} alt="Option" />
                        Personal Settings
                    </div>
                    <div className="Option-Card" id="Orders">
                        <img src={require('../../dist/assets/icons/icons8-purchase-order-96.png')} alt="Option" />
                        Your Orders
                    </div>
                    <div className="Option-Card" id="Payments">
                        <img src={require('../../dist/assets/icons/icons8-wallet-96.png')} alt="Option" />
                        Payments
                    </div>
                    <div className="Option-Card" id="Whislist">
                        <img src={require('../../dist/assets/icons/icons8-wish-list-96.png')} alt="Option" />
                        Wishlist
                    </div>
                    <div className="Option-Card" id="Notification">
                        <img src={require('../../dist/assets/icons/icons8-notification-96.png')} alt="Option" />
                        Notifications
                    </div>
                    <div className="Option-Card" id="Settings">
                        <img src={require('../../dist/assets/icons/icons8-settings-96.png')} alt="Option" />
                        Settings
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile