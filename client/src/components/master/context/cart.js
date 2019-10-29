import React, { Component, createContext } from 'react'
import axios from 'axios'
import { removeClass, addClass } from '../../../functions/functions'

export const CartContext = createContext()
export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CartItems: []
        }
        this.componentWillMount = () => {
            axios.post('http://3.87.22.103:2024/user/get-cart', {
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
            if (this.state.CartItems === undefined) {
                this.state.CartItems = []
                this.state.CartItems.push(Product)
                this.setState({
                    CartItems: this.state.CartItems
                }, () => {
                    axios.post('http://3.87.22.103:2024/user/add-to-cart', {
                        id: '5da1171317addb2490371c6a',
                        cart: this.state.CartItems,
                        cartTotal: '10'
                    })
                        .then(() => {
                            localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                            var PartialProductRoot = document.getElementsByClassName('Partial-Product-Root')[0]
                            addClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                            setTimeout((params) => {
                                removeClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                            }, 2000)
                        })
                })
            } else {
                if (!this.state.CartItems.some(x => x.ProductID === Product.ProductID)) {
                    this.state.CartItems.push(Product)
                    this.setState({
                        CartItems: this.state.CartItems
                    }, () => {
                        axios.post('http://3.87.22.103:2024/user/add-to-cart', {
                            id: '5da1171317addb2490371c6a',
                            cart: this.state.CartItems,
                            cartTotal: '10'
                        })
                            .then(() => {
                                localStorage.setItem('cart', JSON.stringify(this.state.CartItems))
                                var PartialProductRoot = document.getElementsByClassName('Partial-Product-Root')[0]
                                addClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                                setTimeout((params) => {
                                    removeClass(PartialProductRoot, 'Show-Partial-Product-Root-Success')
                                }, 2000)
                            })
                    })
                }
            }
        }
    }

    render() {
        return (
            <CartContext.Provider value={{ ...this.state, UpdateCart: this.UpdateCart }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}
