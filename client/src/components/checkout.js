import React, { Component } from 'react'
import Navbar from './master/navbar'
import { CartContext } from './master/context/cart'
import { UserContext } from './master/context/user'
import '../dist/styles/css/checkout.css'
import { addClass, removeClass } from '../functions/functions'
import Axios from 'axios'
export default class Checkout extends Component {
    render() {
        return (
            <UserContext.Consumer>{(userContext) => (
                <CartContext.Consumer>{(cartContext) => {
                    const { CartItems } = cartContext
                    const { UserData, UpdateUserData } = userContext
                    console.log(UserData.data)
                    this.CalculateSubtotal = (CartItems) => {
                        var total = 0;
                        CartItems.forEach(element => {
                            total = total + parseFloat(element.ProductPrice)
                        });
                        return total
                    }
                    this.RequestOrder = () => {
                        Axios.post('http://3.87.22.103:2024/api/razorpay/create-order', { amount: 50 * 100, receipt: "gurkaran_order_54654" })
                            .then(response => {
                                this.setState({
                                    orderID: response.data.id
                                })
                                var options = {
                                    "key_id": "rzp_test_hcBEyLK2rKpWkS",
                                    "key_secret": "AilD2hmREnc2HEDIuIBYzu6O",
                                    "amount": 50 * 100,
                                    "currency": "INR",
                                    "name": "DentalStall",
                                    "description": UserData.data.name,
                                    "order_id": this.state.orderID,
                                    handler: function (response) {
                                        alert(response.razorpay_payment_id);
                                    },
                                    "prefill": {
                                        "name": UserData.data.name,
                                        "email": UserData.data.email,
                                    },
                                    "notes": {
                                        "address": "note value",
                                    },
                                    "theme": {
                                        "color": "#18c0c9"
                                    }
                                };
                                var rzp1 = new window.Razorpay(options)
                                rzp1.open();
                            })
                    }
                    this.RenderCartItems = () => {
                        this.CartItem = []
                        CartItems.forEach(element => {
                            this.CartItem.push(
                                <li>
                                    <div className="cart-item">
                                        <img src={element.ProductImage} alt="Cart-Product" className="cart-product-image" />
                                        <div className="cart-item-details">
                                            <h6>{element.ProductName}</h6>
                                            <h6>Rs.{element.ProductPrice}</h6>
                                            <h6 className="Remove-Cart-Item">Remove Item</h6>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                        return this.CartItem
                    }
                    this.SaveAddress = () => {
                        var NewUserObject = UserData
                        NewUserObject.data.address = [
                            {
                                default: {
                                    address: {
                                        name: document.getElementById('name').value,
                                        email: document.getElementById('email').value,
                                        contact: document.getElementById('contact').value,
                                        city: document.getElementById('city').value,
                                        state: document.getElementById('state').value,
                                        street: document.getElementById('street').value,
                                        pincode: document.getElementById('pincode').value,
                                    }
                                }
                            }
                        ]
                        Axios.post('http://3.87.22.103:2024/user/save-address', {
                            address: NewUserObject.data.address[0].default,
                            id: '5da1171317addb2490371c6a'
                        })
                            .then(() => {
                                UpdateUserData(NewUserObject)
                                removeClass(document.getElementsByClassName('Add-Address-Root')[0], 'show-add-address')
                            })
                    }
                    return (
                        <div>
                            <div className="Add-Address-Root">
                                <div className="Option-Expand-Root">
                                    <h2>Add Address</h2>
                                    <img src={require('../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} onClick={() => { removeClass(document.getElementsByClassName('Add-Address-Root')[0], 'show-add-address') }} alt="close" />
                                    <div className="Profile-Sub-Parts-Root">
                                        <div className="input-catagory">
                                            Add New
                                            <div className="hr"></div>
                                        </div>
                                        <input type="text" id="name" placeholder="Full Name"></input>
                                        <input type="email" id="email" placeholder="Email"></input>
                                        <input type="number" id="contact" placeholder="Contact"></input>
                                        <input type="text" id="city" placeholder="City"></input>
                                        <input type="text" id="state" placeholder="State"></input>
                                        <input type="text" id="street" placeholder="Street"></input>
                                        <input type="number" id="pincode" placeholder="Postal Code"></input>
                                        <button className="Save-Address-Btn" onClick={() => { this.SaveAddress() }}>Save Address</button>
                                    </div>
                                </div>
                            </div>
                            <Navbar history={this.props.history} />
                            <div className="Checkout-Root">
                                <h2>Checkout</h2>
                                <div className="Order-Detail-Root">
                                    <h4>YOUR ORDER</h4>
                                    <div className="hr dark"></div>
                                    <ul>
                                        {this.RenderCartItems()}
                                    </ul>
                                </div>
                                <div className="Order-Shipping-Root">
                                    <h4>SHIPPING DETAILS</h4>
                                    <div className="hr dark"></div>
                                    {UserData.data === undefined ?
                                        <h6>Loading...</h6>
                                        :
                                        UserData.data.address === undefined ?
                                            <button className="Add-Address-Btn" onClick={() => { addClass(document.getElementsByClassName('Add-Address-Root')[0], 'show-add-address') }}>Add Address +</button>
                                            :
                                            UserData.data.address.length > 0 ?
                                                <div>
                                                    <ul className="Address-Details">
                                                        <li>{UserData.data.address[0].default.address.name}</li>
                                                        <li>{UserData.data.address[0].default.address.email}</li>
                                                        <li>{UserData.data.address[0].default.address.contact}</li>
                                                        <li>{UserData.data.address[0].default.address.city}</li>
                                                        <li>{UserData.data.address[0].default.address.state}</li>
                                                        <li>{UserData.data.address[0].default.address.street}</li>
                                                        <li>{UserData.data.address[0].default.address.pincode}</li>
                                                    </ul>
                                                </div>
                                                :
                                                <button className="Add-Address-Btn" onClick={() => { addClass(document.getElementsByClassName('Add-Address-Root')[0], 'show-add-address') }}>Add Address +</button>
                                    }
                                </div>
                                <div className="Order-Payment-Root">
                                    <h4>PAYMENTS</h4>
                                    <div className="hr dark"></div>
                                    <button className="Payment-Btn" onClick={() => {this.RequestOrder()}}>Pay Now</button>
                                </div>
                            </div>
                        </div>
                    )
                }}</CartContext.Consumer>
            )}</UserContext.Consumer>

        )
    }
}
