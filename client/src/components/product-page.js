import React, { Component } from 'react'
import Navbar from './master/navbar'
import '../dist/styles/css/product-page.css'

export default class ProductPage extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.location)
    }
    render() {
        return (
            <div>
                <Navbar history={this.props.history}></Navbar>
                <div className="Product-Page-Root">
                    <img src={this.props.location.state.data.ProductImage} alt="Product" className="product-image"></img>
                    By {this.props.location.state.data.ProductBrand}
                    <div className="Product-Detail">
                        <h3>{this.props.location.state.data.ProductName}</h3>
                        <h5>{this.props.location.state.data.ProductDescription}</h5>
                        <div className="small-container">
                            <h4>Rs.{this.props.location.state.data.ProductPrice}</h4>
                            <span className="Stock-Status-Span-Product">In Stock</span>
                        </div>
                        <div className="mrp-container">
                            <s>MRP: Rs.{this.props.location.state.data.ProductMrp}</s>
                        </div>
                    </div>
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
                </div>
                <div className="mobile-cart">
                    <img src={require('../dist/assets/icons/icons8-shopping-cart-48.png')} alt="cart"></img>
                    <div className="mobile-cart-noti">0</div>
                </div>
            </div>
        )
    }
}
