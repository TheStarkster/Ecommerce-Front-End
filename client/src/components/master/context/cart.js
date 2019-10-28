import React, { Component, createContext } from 'react'
import axios from 'axios'

export const CartContext = createContext()
export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CartItems: []
        }
        this.UpdateCartCount = () => {
            document.getElementById('mobile-cart-noti').innerText = this.state.CartItems.length
        }
        this.componentWillMount = () => {
            axios.post('http://localhost:2024/user/get-cart', {
                id: '5da1171317addb2490371c6a'
            })
                .then(response => {
                    this.setState({
                        CartItems: response.data.cart
                    }, () => {
                        localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                    })
                })
        }
        this.UpdateCart = (Product) => {
            if (this.state.CartItems.length === 0) {
                this.state.CartItems.push(Product)
                this.setState({
                    CartItems: this.state.CartItems
                }, () => {
                    axios.post('http://localhost:2024/user/add-to-cart', {
                        id: '5da1171317addb2490371c6a',
                        cart: this.state.CartItems,
                        cartTotal: '10'
                    })
                        .then(() => {
                            localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                        })
                })
            } else {
                if (!this.state.CartItems.some(x => x.ProductID === Product.ProductID)) {
                    this.state.CartItems.push(Product)
                    this.setState({
                        CartItems: this.state.CartItems
                    }, () => {
                        axios.post('http://localhost:2024/user/add-to-cart', {
                            id: '5da1171317addb2490371c6a',
                            cart: this.state.CartItems,
                            cartTotal: '10'
                        })
                            .then(() => {
                                localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                            })
                    })
                }
            }
        }
    }

    render() {
        return (
            <CartContext.Provider value={{ ...this.state, UpdateCart: this.UpdateCart ,UpdateCartCount:this.UpdateCartCount}}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}
