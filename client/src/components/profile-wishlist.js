import React, { Component } from 'react'
import { UserContext } from './master/context/user'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class ProfileWishlist extends Component {
    static contextType = UserContext
    removeitem(item) {
        const { UserData, UpdateUserData } = this.context
        var user = UserData
        user.wishlist = UserData.wishlist.filter(x => x.ProductID !== item.ProductID)
        axios.post('http://localhost:2024/update-wishlist', { id: UserData._id, wishlist: user.wishlist })
            .then(u => {
                UpdateUserData(user)
                console.log("wishlist updated")
            })
    }
    redirect(id){
        axios.post('http://3.87.22.103:2024/get-product', { id: id })
        .then(response => {
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
    }
    renderitems() {
        const { UserData } = this.context
        this.items = []
        UserData.wishlist.forEach(element => {
            this.items.push(
                <div className="whishlist-item">
                    <img src={element.ProductImage} alt="Product" onClick={() => this.redirect(element.ProductID)}></img>
                    <div>
                        <h6 onClick={() => this.redirect(element.ProductID)}>{element.ProductName}</h6>
                        <h6 onClick={() => this.redirect(element.ProductID)}>Rs. {element.ProductPrice}</h6>
                        <h6 style={{ color: 'red' }} onClick={() => this.removeitem(element)}>Remove Item</h6>
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

export default withRouter(ProfileWishlist)