import React, { Component, createContext } from 'react'
import axios from 'axios'
import { removeClass, addClass } from '../../../functions/functions'
import { UserContext } from './user'

export const CartContext = createContext()
export default class Cart extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props)
        this.state = {
            CartItems: []
        }
        this.componentWillMount = () => {
            const { UserData } = this.context
            if (Object.keys(UserData).length !== 0) {
                axios.post('http://3.19.58.80:2024/user/get-cart', {
                    id: UserData._id
                })
                    .then(response => {
                        this.setState({
                            CartItems: response.data.cart
                        }, () => {
                            localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                        })
                    })
            }
        }
        this.componentDidUpdate = () => {
            if (localStorage.getItem('cart') === null) {
                const { UserData } = this.context
                this.setState({
                    CartItems: UserData.cart
                }, () => {
                    localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                })
            }
        }
        this.RemoveFromCart = (Product) => {
            const { UserData } = this.context
            axios.post('http://3.19.58.80:2024/user/remove-from-cart', {
                id: UserData._id,
                cart: this.state.CartItems.filter(x => x.ProductID !== Product.ProductID)
            })
                .then(response => {
                    this.setState({
                        CartItems: this.state.CartItems.filter(x => x.ProductID !== Product.ProductID)
                    }, () => {
                        document.getElementById('Cart-Loader').style.opacity = 0
                        localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                    })
                })
        }
        this.UpdateCart = (Product) => {
            const { UserData } = this.context
            if (this.state.CartItems === undefined) {
                this.state.CartItems = []
                this.state.CartItems.push(Product)
                this.setState({
                    CartItems: this.state.CartItems
                }, () => {
                    axios.post('http://3.19.58.80:2024/user/add-to-cart', {
                        id: UserData._id,
                        cart: this.state.CartItems,
                    })
                        .then(() => {
                            localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                            // var PartialProductRoot = document.getElementsByClassName('Partial-Product-Root')[0]
                            // addClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                            // setTimeout((params) => {
                            //     removeClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                            // }, 2000)
                            alert("Product Added To Cart!")
                        })
                })
            } else {
                if (!this.state.CartItems.some(x => x.ProductID === Product.ProductID)) {
                    const { UserData } = this.context
                    this.state.CartItems.push(Product)
                    this.setState({
                        CartItems: this.state.CartItems
                    }, () => {
                        console.log(UserData)
                        console.log(this.state.CartItems)
                        console.log(Product)
                        axios.post('http://3.19.58.80:2024/user/add-to-cart', {
                            id: UserData._id,
                            cart: this.state.CartItems,
                        })
                            .then(() => {
                                localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                                // var PartialProductRoot = document.getElementsByClassName('Partial-Product-Root')[0]
                                // addClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                                // setTimeout((params) => {
                                //     removeClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                                // }, 2000)
                                alert("Product Added To Cart!")
                            })
                    })
                } else {
                    alert("Already in Cart!")
                }
            }
        }
        this.UpdateQty = (Modified) => {
            const { UserData } = this.context
            this.state.CartItems.filter(x => x.ProductID === Modified.ProductID).ProductQty = Modified.ProductQty
            this.setState({
                CartItems: this.state.CartItems
            }, () => {
                console.log(this.state)
                axios.post('http://3.19.58.80:2024/user/add-to-cart', {
                    id: UserData._id,
                    cart: this.state.CartItems,
                })
                    .then(() => {
                        localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                        // var PartialProductRoot = document.getElementsByClassName('Partial-Product-Root')[0]
                        // addClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                        // setTimeout((params) => {
                        //     removeClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                        // }, 2000)
                    })
            })
        }
    }

    render() {
        return (
            <CartContext.Provider value={{ ...this.state, UpdateCart: this.UpdateCart, RemoveFromCart: this.RemoveFromCart, UpdateQty: this.UpdateQty, SetCart: this.SetCart }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}
