import React, { Component } from 'react'
import Navbar from './master/navbar'
import { CartContext } from './master/context/cart'
import '../dist/styles/css/checkout.css'
import { addClass, removeClass } from '../functions/functions'

export default class Checkout extends Component {
    static contextType = CartContext
    CalculateSubtotal(CartItems) {
        var total = 0;
        CartItems.forEach(element => {
            total = total + parseFloat(element.ProductPrice)
        });
        return total
    }
    RenderCartItems = () => {
        this.CartItem = []
        const { CartItems } = this.context
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
    render() {
        return (
            <div>
                <div className="Add-Address-Root">
                    <div className="Option-Expand-Root">
                        <h2>Add Address</h2>
                        <img src={require('../dist/assets/icons/icons8-delete-50.png')} style={{ filter: 'brightness(0) invert(1)', padding: '16px', width: '40px' }} onClick={() => {removeClass(document.getElementsByClassName('Add-Address-Root')[0],'show-add-address')}} alt="close" />
                        <div className="Profile-Sub-Parts-Root">
                            <div className="input-catagory">
                                Add New
                                <div className="hr"></div>
                            </div>
                            <input type="text" placeholder="Full Name"></input>
                            <input type="email" placeholder="Email"></input>
                            <input type="number" placeholder="Contact"></input>
                            <input type="text" placeholder="City"></input>
                            <input type="text" placeholder="State"></input>
                            <input type="text" placeholder="Street"></input>
                            <input type="number" placeholder="Postal Code"></input>
                            <button className="Save-Address-Btn">Save Address</button>
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
                        <button className="Add-Address-Btn" onClick={() => {addClass(document.getElementsByClassName('Add-Address-Root')[0],'show-add-address')}}>Add Address +</button>
                    </div>
                </div>
            </div>
        )
    }
}
