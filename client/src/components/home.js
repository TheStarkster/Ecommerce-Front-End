import React, { Component } from 'react'
import Card from './card'
import BrandStrip from './brandstrip'
import SearchBar from './searchbar'
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
            ProductsArray: [],
            EditQty: 1,
            EditProduct: {},
            EditQtyConatainer: false,
            SearchResult:[]
        }
        this.componentWillMount = () => {
            if (localStorage.getItem('to-buy') !== null) {
                axios.post('http://3.87.22.103:2024/get-product', { id: localStorage.getItem('to-buy') })
                    .then(response => {
                        localStorage.removeItem('to-buy')
                        this.props.history.push({
                            pathname: '/product',
                            state: {
                                data: {
                                    ProductBrand: response.data[0].brand,
                                    ProductDescription: response.data[0].disc,
                                    ProductImage: response.data[0].image,
                                    ProductKeyFeatures: response.data[0].KeyFeatures,
                                    ProductMrp: response.data[0].mrp,
                                    ProductName: response.data[0].name,
                                    ProductPrice: response.data[0].price,
                                    ProductPrimaryFeatures: response.data[0].PrimaryFeatures,
                                    ProductRDL: response.data[0].rdl,
                                    ProductTags: response.data[0].tags,
                                    ProductID: response.data[0]._id,
                                    UserLoggedIn: true
                                }
                            }
                        })
                    })

            } else {
                axios.get('http://3.87.22.103:2024/User-fetch-products')
                    .then(response => {
                        this.setState({
                            ProductsArray: [...response.data.products]
                        })
                    })
            }
        }
    }
    SetSearchResults = (result) => {
        this.setState({
            ProductsArray: result
        })
    }
    UpdateCartItemQty = () => {
        const { UpdateQty } = this.context
        this.state.EditProduct.ProductQty = this.state.EditQty
        UpdateQty(this.state.EditProduct)
        this.setState({
            EditQtyConatainer: false,
            EditQty: 1,
            EditProduct: {}
        })
    }
    CalculateSubtotal(CartItems) {
        var total = 0;
        if (CartItems !== undefined) {
            CartItems.forEach(element => {
                total = total + parseFloat(element.ProductPrice)
                total = total * parseFloat(element.ProductQty)
            });
        }
        return total
    }
    RenderCartItems = () => {
        this.CartItems = []
        this.key = 1
        const { CartItems, RemoveFromCart } = this.context
        if (CartItems !== undefined) {
            CartItems.forEach(element => {
                this.CartItems.push(
                    <li key={this.key}>
                        <div className="cart-item">
                            <img src={element.ProductImage} alt="Cart-Product" className="cart-product-image" />
                            <div className="cart-item-details">
                                <h6>{element.ProductName}</h6>
                                <h6>Rs.{element.ProductPrice}</h6>
                                <div className="Qty-div"><h6>Qty {element.ProductQty}</h6><h6 onClick={() => this.setState({ EditQtyConatainer: true, EditProduct: element })}>Edit</h6></div>
                                <h6 className="Remove-Cart-Item" onClick={() => {
                                    document.getElementById('Cart-Loader').style.opacity = 1
                                    RemoveFromCart(element)
                                }} style={{ color: 'red' }}>Remove Item</h6>
                            </div>
                        </div>
                    </li>
                )
                this.key += 1
            })
        }
        return this.CartItems
    }

    RenderProductCards = () => {
        this.ProductCard = []
        this.key = 1
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
                    key={this.key}
                >
                </Card>
            )
            this.key += 1
        })
        return this.ProductCard
    }
    render() {
        const { CartItems } = this.context
        return (
            <div>
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
                <SearchBar trigger={this.SetSearchResults}></SearchBar>
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
                    {
                        this.state.EditQtyConatainer ?
                            <div className="Edit-Qty-Root">
                                <div>
                                    <div className="cart-qty-minus" onClick={() => this.setState({ EditQty: this.state.EditQty === 1 ? 1 : parseFloat(this.state.EditQty) - 1 })}>-</div>
                                    {this.state.EditQty}
                                    <div className="cart-qty-plus" onClick={() => this.setState({ EditQty: this.state.EditQty + 1 })}>+</div>
                                </div>
                                <button onClick={() => this.UpdateCartItemQty()}>Save</button>
                            </div>
                            :
                            null
                    }
                    <img src={require('../dist/assets/icons/icons8-delete-50.png')} className="Mobile-Cart-Close" alt="close" onClick={() => removeClass(document.getElementsByClassName('mobile-cart-expanded')[0], 'show')} />
                    <h2 className="cart-heading">
                        Cart Items
                        <div className="Loader" id="Cart-Loader">
                            <img src={require('../dist/assets/animation/cartspinner.gif')} alt="spinner"></img>
                        </div>
                    </h2>
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
