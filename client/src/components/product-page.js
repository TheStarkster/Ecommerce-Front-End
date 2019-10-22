import React, { Component } from 'react'
import Navbar from './navbar'
import '../dist/styles/css/product-page.css'

export default class ProductPage extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history}></Navbar>
                <div className="Product-Page-Root">
                    <img src="https://media.dentalkart.com/catalog/product/m/i/micro_mega_one_flare_1.jpg" alt="Product" className="product-image"></img>
                    <div className="Product-Detail">
                        <h3>Micro Mega One Flare is Product Name</h3>
                        <h5>Description</h5>
                        <h4>Price</h4>
                    </div>
                    <span className="Stock-Status-Span">Stock Status</span>
                    <button>Buy Now</button>
                    <button>Add To Cart</button>
                    <button>Add To Wishlist</button>
                    <div className="Primary-Features">
                        <div className="h4">Primary Features</div>
                        <div className="Feature-Root">
                            <ul>
                                <li>Feature One</li>
                                <li>Feature Two</li>
                                <li>Feature Three</li>
                            </ul>
                        </div>
                    </div>
                    <div className="Primary-Features">
                        <div className="h4">Key Features</div>
                        <div className="Feature-Root">
                            <ul>
                                <li>Feature One</li>
                                <li>Feature Two</li>
                                <li>Feature Three</li>
                            </ul>
                        </div>
                    </div>
                    <p>This is Sample Brief Text
                    his is Sample Brief Text
                    his is Sample Brief Text
                    </p>
                </div>
                <div className="mobile-cart">
                    <img src={require('../dist/assets/icons/icons8-shopping-cart-48.png')} alt="cart"></img>
                    <div className="mobile-cart-noti">0</div>
                </div>
            </div>
        )
    }
}
