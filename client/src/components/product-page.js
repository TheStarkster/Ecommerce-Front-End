import React, { Component } from 'react'
import Recommended from './Recommeded'
import axios from 'axios'
import { CartContext } from './master/context/cart'
import { UserContext } from './master/context/user'
import '../dist/styles/css/product-page.css'
import { addClass, removeClass } from '../functions/functions'
import Footer from '../components/master/footer'
import Product from '../components/master/partials/product'

export default class ProductPage extends Component {
    static contextType = CartContext
    constructor(props) {
        super(props)
        this.state = {
            SimilarProducts: [],
            qty: 1,
            EditQty: 1,
            EditProduct: {},
            EditQtyConatainer: false
        }
        this.componentWillMount = () => {
            axios.post('http://3.87.22.103:2024/similar-product', {
                tags: this.props.location.state.data.ProductTags
            })
                .then(response => {
                    var i, Temp_SimilarProducts = []
                    for (i = 0; i < response.data.length; i++) {
                        if (response.data[i]._id !== this.props.location.state.data.ProductID) {
                            Temp_SimilarProducts.push(response.data[i])
                        }
                    }
                    this.setState({
                        SimilarProducts: Temp_SimilarProducts,
                    })
                })
        }
    }

    render() {
        return (
            <UserContext.Consumer>{(userContext) => (
                <CartContext.Consumer>{(cartContext) => {
                    const { RemoveFromCart, UpdateCart, CartItems, UpdateQty } = cartContext
                    const { UserData, UpdateUserData } = userContext

                    this.RenderPrimaryFeatures = () => {
                        this.PrimaryFeatureArray = []
                        this.props.location.state.data.ProductPrimaryFeatures.forEach(element => {
                            this.PrimaryFeatureArray.push(
                                <li>
                                    {element}
                                </li>
                            )
                        })
                        return this.PrimaryFeatureArray
                    }
                    this.RedirectTo = (to) => {
                        localStorage.setItem('to-buy', this.props.location.state.data.ProductID)
                        this.props.history.push(to)
                    }
                    this.Update_Cart = () => {
                        UpdateCart({
                            ProductID: this.props.location.state.data.ProductID,
                            ProductName: this.props.location.state.data.ProductName,
                            ProductImage: this.props.location.state.data.ProductImage,
                            ProductPrice: this.props.location.state.data.ProductPrice,
                            ProductQty: this.state.qty
                        })
                    }
                    this.RenderKeyFeatures = () => {
                        this.ProductKeyFeatureArray = []
                        this.props.location.state.data.ProductKeyFeatures.forEach(element => {
                            this.ProductKeyFeatureArray.push(
                                <li>
                                    {element}
                                </li>
                            )
                        })
                        return this.ProductKeyFeatureArray
                    }
                    this.CalculateSubtotal = (CartitemsParam) => {
                        var total = 0;
                        if (CartitemsParam !== undefined) {
                            CartitemsParam.forEach(element => {
                                total = total + (parseFloat(element.ProductPrice) * parseFloat(element.ProductQty))
                            });
                        }
                        return total
                    }
                    this.RenderCartItems = () => {
                        this.CartItemsLocal = []
                        if (CartItems !== undefined) {
                            CartItems.forEach(element => {
                                this.CartItemsLocal.push(
                                    <li>
                                        <div className="cart-item">
                                            <img src={element.ProductImage} alt="Cart-Product" className="cart-product-image" />
                                            <div className="cart-item-details">
                                                <h6>{element.ProductName}</h6>
                                                <h6>Rs.{element.ProductPrice}</h6>
                                                <div className="Cart-Qty"></div>
                                                <div className="Qty-div"><h6>Qty {element.ProductQty}</h6><h6 onClick={() => this.setState({ EditQtyConatainer: true, EditProduct: element })}>Edit</h6></div>
                                                <h6 className="Remove-Cart-Item" onClick={() => {
                                                    document.getElementById('Cart-Loader').style.opacity = 1
                                                    RemoveFromCart(element)
                                                }} style={{ color: 'red' }}>Remove Item</h6>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        return this.CartItemsLocal
                    }
                    this.UpdateWishlist = () => {
                        var user = UserData
                        if (user.wishlist === undefined) {
                            user.wishlist = []
                        }
                        if (user.wishlist !== undefined && user.wishlist.some(x => x.ProductID === this.props.location.state.data.ProductID)) {
                            alert("already in wishlist")
                        } else {
                            user.wishlist.push({
                                ProductID: this.props.location.state.data.ProductID,
                                ProductName: this.props.location.state.data.ProductName,
                                ProductImage: this.props.location.state.data.ProductImage,
                                ProductPrice: this.props.location.state.data.ProductPrice,
                                ProductQty: this.state.qty
                            })
                            axios.post('http://localhost:2024/update-wishlist', { id: user._id, wishlist: user.wishlist })
                                .then(u => {
                                    UpdateUserData(user)
                                    alert("Product Added To Wishlist")
                                })
                        }

                    }
                    this.BuyNow = () => {
                        this.props.history.push({
                            pathname: '/checkout',
                            state: {
                                data: {
                                    ProductName: this.props.location.state.data.ProductName,
                                    ProductImage: this.props.location.state.data.ProductImage,
                                    ProductPrice: this.props.location.state.data.ProductPrice,
                                    ProductQty: this.state.qty
                                }
                            }
                        })
                    }
                    this.UpdateCartItemQty = () => {
                        this.state.EditProduct.ProductQty = this.state.EditQty
                        UpdateQty(this.state.EditProduct)
                        this.setState({
                            EditQtyConatainer: false,
                            EditQty: 1,
                            EditProduct: {}
                        })
                    }
                    return (
                        <div>
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
                                <div className="Qty-Container-Root">
                                    <div onClick={() => this.setState({ qty: this.state.qty === 1 ? 1 : parseFloat(this.state.qty) - 1 })}>-</div>
                                    {this.state.qty}
                                    <div onClick={() => this.setState({ qty: parseFloat(this.state.qty) + 1 })}>+</div>
                                </div>
                                <button onClick={() => {
                                    this.props.location.state.data.UserLoggedIn ?
                                        this.BuyNow()
                                        :
                                        this.RedirectTo('/login')
                                }}>Buy Now</button>
                                <button onClick={() => {
                                    this.props.location.state.data.UserLoggedIn ?
                                        this.Update_Cart() :
                                        this.RedirectTo('/login')
                                }}>Add To Cart</button>
                                <button onClick={() => {
                                    this.props.location.state.data.UserLoggedIn ?
                                        this.UpdateWishlist()
                                        :
                                        this.RedirectTo('/login')
                                }}>Add To Wishlist</button>
                                <div className="Primary-Features">
                                    <div className="h4">Primary Features</div>
                                    <div className="Feature-Root">
                                        <ul>{this.RenderPrimaryFeatures()}</ul>
                                    </div>
                                </div>
                                <div className="Primary-Features">
                                    <div className="h4">Key Features</div>
                                    <div className="Feature-Root">
                                        <ul>{this.RenderKeyFeatures()}</ul>
                                    </div>
                                </div>
                                <h3>Recommended For You</h3>
                                <div className="recommended-product-container">
                                    <Recommended Products={this.state.SimilarProducts} NumberOfCard={2}></Recommended>
                                </div>
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
                            {/* <Product message="Product Added to Cart!"></Product> */}
                            <Footer />
                        </div>
                    )
                }}</CartContext.Consumer>
            )}</UserContext.Consumer>
        )
    }
}
