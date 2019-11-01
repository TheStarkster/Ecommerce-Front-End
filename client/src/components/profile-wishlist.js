import React, { Component } from 'react'
import { UserContext } from './master/context/user'

export default class ProfileWishlist extends Component {
    static contextType = UserContext
    renderitems(){
        const { UserData } = this.context
        this.items = []
        UserData.wishlist.forEach(element => {
            this.items.push(
                <div className="whishlist-item">
                    <img src={element.ProductImage} alt="Product"></img>
                    <div>
                        <h6>{element.ProductName}</h6>
                        <h6>Rs. {element.ProductPrice}</h6>
                    </div>
                </div>
            )
        })
        return this.items
    }
    render() {
        const { UserData } = this.context
        return (
            <div className="Profile-Sub-Parts-Root">
                {
                    UserData.wishlist === undefined ?
                        <div className="Error-Msg">
                            <h2>
                                You've Added No Products Yet!
                            </h2>
                        </div>
                        :
                        this.renderitems()
                }

            </div>
        )
    }
}
