import React, { Component } from 'react'
import { CartContext } from './master/context/cart'
import { UserContext } from './master/context/user'
import '../dist/styles/css/checkout.css'
import Footer from '../components/master/footer'
import { addClass, removeClass } from '../functions/functions'
import Axios from 'axios'
export default class Checkout extends Component {
    render() {
        return (
            <UserContext.Consumer>{(userContext) => (
                <CartContext.Consumer>{(cartContext) => {
                    const { CartItems } = cartContext
                    const { UserData, UpdateUserData } = userContext
                    var NewOrders = UserData.orders !== undefined ? UserData.orders : []
                    this.CalculateSubtotal = (CartItems) => {
                        var total = 0;
                        CartItems.forEach(element => {
                            total = total + parseFloat(element.ProductPrice)
                            total = total * parseFloat(element.ProductQty)
                        });
                        return total
                    }
                    this.RequestOrder = () => {
                        let amount
                        if (this.props.location.state === undefined) {
                            amount = parseFloat(this.CalculateSubtotal(CartItems)) * 100
                        } else {
                            amount = parseFloat(this.props.location.state.data.ProductPrice) * parseFloat(this.props.location.state.data.ProductQty) * 100
                        }
                        Axios.post('http://3.87.22.103:2024/api/razorpay/create-order', { amount: amount, receipt: "gurkaran_order_54654" })
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
                                    "order_id": this.state.orderID,
                                    handler: function (response) {
                                        NewOrders.push(CartItems)
                                        var NewUserObject = UserData
                                        if (NewUserObject.orders === undefined) {
                                            NewUserObject.orders = []
                                            NewUserObject.orders.push(NewOrders)
                                        } else {
                                            NewUserObject.orders.push(NewOrders)
                                        }
                                        UpdateUserData(NewUserObject)

                                        Axios.post('http://3.87.22.103:2024/api/razorpay/check-payment', {
                                            paymentId: response.razorpay_payment_id,
                                            text: {
                                                CartItems: CartItems,
                                            },
                                            userID: UserData._id,
                                            orders: NewOrders
                                        })
                                            .then(u => {
                                                console.log(u)
                                            })
                                    },
                                    "prefill": {
                                        "name": UserData.name,
                                        "email": UserData.email,
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
                                            <h6>Qty {element.ProductQty}</h6>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                        return this.CartItem
                    }
                    this.SaveOrders = () => {

                    }
                    this.SaveAddress = () => {
                        var NewUserObject = UserData
                        console.log(UserData)
                        NewUserObject.address = [
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
                            address: NewUserObject.address[0].default,
                            id: UserData._id
                        })
                            .then(() => {
                                UpdateUserData(NewUserObject)
                                removeClass(document.getElementsByClassName('Add-Address-Root')[0], 'show-add-address')
                            })
                    }
                    this.RenderBuyNowItem = () => {
                        return (
                            <li>
                                <div className="cart-item">
                                    <img src={this.props.location.state.data.ProductImage} alt="Cart-Product" className="cart-product-image" />
                                    <div className="cart-item-details">
                                        <h6>{this.props.location.state.data.ProductName}</h6>
                                        <h6>Rs.{this.props.location.state.data.ProductPrice}</h6>
                                        <h6>Qty {this.props.location.state.data.ProductQty}</h6>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                    return (
                        <div className="Checkout-Root-Main">
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
                            <div className="Checkout-Root">
                                <h2>Checkout</h2>
                                <div className="Order-Detail-Root">
                                    <h4>YOUR ORDER</h4>
                                    <div className="hr dark"></div>
                                    <ul>
                                        {
                                            this.props.location.state === undefined ?
                                                this.RenderCartItems() :
                                                this.RenderBuyNowItem()
                                        }
                                    </ul>
                                </div>
                                <div className="cart-total-container promocode">
                                    <input type="text" placeholder="Apply Promocode" id="txtPromocode"></input>
                                    <button>Apply</button>
                                </div>
                                <div className="cart-total-container bg-green">
                                    <div className="row">
                                        <h6>Sub-Total</h6>
                                        <h4>Rs. {
                                            this.props.location.state === undefined ?
                                                this.CalculateSubtotal(CartItems)
                                                :
                                                parseFloat(this.props.location.state.data.ProductPrice) * parseFloat(this.props.location.state.data.ProductQty)
                                        }</h4>
                                    </div>
                                    <div className="row">
                                        <h6>Taxes</h6>
                                        <h4>Rs.0</h4>
                                    </div>
                                    <div className="row">
                                        <h6>Grand-Total</h6>
                                        <h4>Rs. {
                                            this.props.location.state === undefined ?
                                                this.CalculateSubtotal(CartItems)
                                                :
                                                parseFloat(this.props.location.state.data.ProductPrice) * parseFloat(this.props.location.state.data.ProductQty)
                                        }</h4>
                                    </div>
                                </div>
                                <div className="Order-Shipping-Root">
                                    <h4>SHIPPING DETAILS</h4>
                                    <div className="hr dark"></div>
                                    {UserData === undefined ?
                                        <button className="Add-Address-Btn" onClick={() => { addClass(document.getElementsByClassName('Add-Address-Root')[0], 'show-add-address') }}>Add Address +</button>
                                        :
                                        UserData.address === undefined ?
                                            <button className="Add-Address-Btn" onClick={() => { addClass(document.getElementsByClassName('Add-Address-Root')[0], 'show-add-address') }}>Add Address +</button>
                                            :
                                            UserData.address.length > 0 ?
                                                <div>
                                                    <ul className="Address-Details">
                                                        <div className="column low">
                                                            <li>Name</li>
                                                            <li>Email</li>
                                                            <li>Contact</li>
                                                            <li>City</li>
                                                            <li>State</li>
                                                            <li>Street</li>
                                                            <li>Pincode</li>
                                                        </div>
                                                        <div className="column">
                                                            <li>{UserData.address[0].default.address.name}</li>
                                                            <li>{UserData.address[0].default.address.email}</li>
                                                            <li>{UserData.address[0].default.address.contact}</li>
                                                            <li>{UserData.address[0].default.address.city}</li>
                                                            <li>{UserData.address[0].default.address.state}</li>
                                                            <li>{UserData.address[0].default.address.street}</li>
                                                            <li>{UserData.address[0].default.address.pincode}</li>
                                                        </div>
                                                    </ul>
                                                </div>
                                                :
                                                <button className="Add-Address-Btn" onClick={() => { addClass(document.getElementsByClassName('Add-Address-Root')[0], 'show-add-address') }}>Add Address +</button>
                                    }
                                </div>
                                <div className="Order-Payment-Root">
                                    <h4>PAYMENTS</h4>
                                    <div className="hr dark"></div>
                                    {
                                        UserData.address === undefined ?
                                            <button className="Payment-Btn" disabled>Pay Now</button>
                                            :
                                            UserData.address.length === 0 ?
                                                <button className="Payment-Btn" disabled>Pay Now</button>
                                                :
                                                <button className="Payment-Btn" onClick={() => { this.RequestOrder() }}>Pay Now</button>
                                    }
                                </div>
                            </div>
                            <Footer></Footer>
                        </div>
                    )
                }}</CartContext.Consumer>
            )}</UserContext.Consumer>

        )
    }
}
