import React, { Component } from 'react'
import Card from './card'
import BrandStrip from './brandstrip'
import SearchBar from './searchbar'
import Navbar from './master/navbar'
import '../dist/styles/css/home.css'
import { CartContext } from './master/context/cart'
import axios from 'axios'
import Footer from '../components/master/footer'
import { addClass, removeClass } from '../functions/functions'

export default class Home extends Component {
    static contextType = CartContext
    constructor(props) {
        super(props)
        this.state = {
            ProductsArray: []
        }
        this.componentWillMount = () => {
            axios.get('http://3.87.22.103:2024/User-fetch-products')
                .then(response => {
                    this.setState({
                        ProductsArray: [...response.data.products]
                    })
                })
        }
    }
    CalculateSubtotal(CartItems) {
        var total = 0;
        if (CartItems !== undefined) {
            CartItems.forEach(element => {
                total = total + parseFloat(element.ProductPrice)
            });
        }
        return total
    }
    RenderCartItems = () => {
        this.CartItems = []
        const { CartItems } = this.context
        if (CartItems !== undefined) {
            CartItems.forEach(element => {
                this.CartItems.push(
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
        }
        return this.CartItems
    }
    RenderProductCards = () => {
        this.ProductCard = []
        this.state.ProductsArray.forEach(element => {
            this.ProductCard.push(
                <Card ProductName={element.name}
                    ProductPrice={element.price}
                    ProductBrand={element.brand}
                    ProductKeyFeatures={element.KeyFeatures}
                    ProductPrimaryFeatures={element.PrimaryFeatures}
                    ProductDescription={element.disc}
                    ProductImage={element.image}
                    ProductMrp={element.mrp}
                    ProductRDL={element.rdl}
                    ProductTags={element.tags}
                    history={this.props.history}
                    ProductID={element._id}
                >
                </Card>
            )
        });
        return this.ProductCard
    }
    render() {
        const { CartItems } = this.context
        return (
            <div>
                <Navbar history={this.props.history}></Navbar>
                <div className="Poster">
                    <h1 style={{
                        backgroundColor: '#18c0c961',
                        fontFamily: 'Quicksand-Regular'
                    }}>
                        Welcome To <br /><i>DentalStall</i><br />
                        Your Solgan Goes Here!<br />
                    </h1>
                </div>
                <BrandStrip></BrandStrip>
                <SearchBar></SearchBar>
                <h2 style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%,0%)',
                    fontFamily: 'Quicksand-Regular',
                    color: '#868686',
                }}>Top Products</h2>
                <div className="Home-Root">
                    {this.RenderProductCards()}
                </div>
                <div className="mobile-cart-expanded">
                    <img src={require('../dist/assets/icons/icons8-delete-50.png')} className="Mobile-Cart-Close" alt="close" onClick={() => removeClass(document.getElementsByClassName('mobile-cart-expanded')[0], 'show')} />
                    <h2>Cart Items</h2>
                    <div className="ul-container">
                        <ul>
                            {this.RenderCartItems()}
                        </ul>
                    </div>
                    <div className="cart-total-container">
                        <div className="row">
                            <h6>Sub-Total</h6>
                            <h4>Rs.{this.CalculateSubtotal(CartItems)}</h4>
                        </div>
                        <div className="row">
                            <h6>Taxes</h6>
                            <h4>Rs.0</h4>
                        </div>
                        <div className="row">
                            <h6>Grand-Total</h6>
                            <h4>Rs.{this.CalculateSubtotal(CartItems)}</h4>
                        </div>
                        <div className="CheckoutBtn-Container">
                            <button onClick={() => { this.props.history.push('/checkout') }}>Checkout</button>
                        </div>
                    </div>
                </div>
                <div className="mobile-cart" onClick={() => { addClass(document.getElementsByClassName('mobile-cart-expanded')[0], 'show') }
                }>
                    <img src={require('../dist/assets/icons/icons8-shopping-cart-48.png')} alt="cart"></img>
                    <div className="mobile-cart-noti" id="mobile-cart-noti">{CartItems !== undefined ? CartItems.length : 0}</div>
                </div>
                <Footer />
            </div>
        )
    }
}
