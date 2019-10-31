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
            axios.post('http://3.87.22.103:2024/user/get-cart', {
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
        this.RemoveFromCart = (Product) => {
            // console.log(this.state.CartItems.filter(x=>x.ProductID !== Product.ProductID))
            axios.post('http://3.87.22.103:2024/user/remove-from-cart',{id:Product.ProductID})
            .then(response=> {
                console.log(response)
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
                    axios.post('http://3.87.22.103:2024/user/add-to-cart', {
                        id: UserData._id,
                        cart: this.state.CartItems,
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
                    const { UserData } = this.context
                    this.state.CartItems.push(Product)
                    this.setState({
                        CartItems: this.state.CartItems
                    }, () => {
                        console.log(UserData)
                        console.log(this.state.CartItems)
                        console.log(Product)
                        axios.post('http://3.87.22.103:2024/user/add-to-cart', {
                            id: UserData._id,
                            cart: this.state.CartItems,
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
            <CartContext.Provider value={{ ...this.state, UpdateCart: this.UpdateCart, RemoveFromCart:this.RemoveFromCart }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}
